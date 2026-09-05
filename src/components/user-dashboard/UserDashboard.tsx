import React from "react";
import { useDashboardState } from "./hooks/useDashboardState";
import { DashboardHeader } from "./components/DashboardHeader";
import { SidebarNavigation } from "./components/SidebarNavigation";
import { ToastNotification } from "./components/ToastNotification";
import { ChangeVaultPasswordModal, ResetVaultPasswordModal } from "./components/VaultPasswordModal";
import { NewAppModal } from "./components/NewAppModal";

import { DashboardOverview } from "./sections/DashboardOverview";
import { VisaReadinessScore } from "./sections/VisaReadinessScore";
import { VisaApplications } from "./sections/VisaApplications";
import { PreDepartureLuggage } from "./sections/PreDepartureLuggage";
import { DocumentVault } from "./sections/DocumentVault";
import { ProfileSettings } from "./sections/ProfileSettings";
import { Consultations } from "./sections/Consultations";

export const UserDashboard: React.FC = () => {
    const state = useDashboardState();

    return (
        <div className="min-h-screen bg-[#f8fafc] text-slate-800 font-sans">
            {/* Top Navigation Bar */}
            <DashboardHeader
                dashboardSearch={state.dashboardSearch}
                setDashboardSearch={state.setDashboardSearch}
                fullName={state.fullName}
                userDisplayName={state.userDisplayName}
                profilePhoto={state.profilePhoto}
                setIsMobileSidebarOpen={state.setIsMobileSidebarOpen}
                setActiveTab={state.setActiveTab}
            />

            <div className="flex">
                {/* Left Collapsible Sidebar */}
                <SidebarNavigation
                    activeTab={state.activeTab}
                    setActiveTab={state.setActiveTab}
                    isSidebarCollapsed={state.isSidebarCollapsed}
                    setIsSidebarCollapsed={state.setIsSidebarCollapsed}
                    isMobileSidebarOpen={state.isMobileSidebarOpen}
                    setIsMobileSidebarOpen={state.setIsMobileSidebarOpen}
                    navSections={state.navSections}
                    applicationsCount={state.applications.visasProcessingState.length}
                    luggagePercent={state.luggage.luggageProgress.percent}
                    readinessScore={state.readiness.comprehensiveAuditMetrics.score}
                    handleLogout={state.handleLogout}
                />

                {/* Main Content Area */}
                <main className="flex-1 min-w-0 p-4 sm:p-6 lg:p-8 max-w-7xl mx-auto w-full space-y-6">
                    {/* 1. OVERVIEW DASHBOARD */}
                    {state.activeTab === "dashboard" && (
                        <DashboardOverview
                            userDisplayName={state.userDisplayName}
                            comprehensiveAuditMetrics={state.readiness.comprehensiveAuditMetrics}
                            visasProcessingState={state.applications.visasProcessingState}
                            luggageProgress={state.luggage.luggageProgress}
                            documents={state.documents.documents}
                            hasIeltsScore={state.readiness.hasIeltsScore}
                            overallBand={state.readiness.overallBand}
                            ieltsScore={state.readiness.ieltsScore}
                            handleUpdateIelts={state.readiness.handleUpdateIelts}
                            hasVaultPassword={state.vaultPassword.hasVaultPassword}
                            isVaultUnlocked={state.vaultPassword.isVaultUnlocked}
                            setActiveTab={state.setActiveTab}
                            setSelectedApplicationId={state.applications.setSelectedApplicationId}
                        />
                    )}

                    {/* 2. VISA READINESS SCORE */}
                    {state.activeTab === "visa-readiness" && (
                        <VisaReadinessScore
                            selectedDestination={state.selectedDestination}
                            selectedPassport={state.selectedPassport}
                            readiness={state.readiness}
                            vaultChecklistState={state.documents.vaultChecklistState}
                            toggleReadinessDoc={state.readiness.toggleReadinessDoc}
                            setActiveTab={state.setActiveTab}
                            handleVaultDocScan={state.documents.handleVaultDocScan}
                        />
                    )}

                    {/* 3. ACTIVE VISA CASES */}
                    {state.activeTab === "cases" && (
                        <VisaApplications
                            visasProcessingState={state.applications.visasProcessingState}
                            selectedApplicationId={state.applications.selectedApplicationId}
                            setSelectedApplicationId={state.applications.setSelectedApplicationId}
                            editingAppId={state.applications.editingAppId}
                            setEditingAppId={state.applications.setEditingAppId}
                            editingAppName={state.applications.editingAppName}
                            setEditingAppName={state.applications.setEditingAppName}
                            handleRenameApplication={state.applications.handleRenameApplication}
                            handleDeleteApplication={state.applications.handleDeleteApplication}
                            handleCopyTrackingId={state.applications.handleCopyTrackingId}
                            copiedTrackingId={state.applications.copiedTrackingId}
                            setShowNewAppModal={state.applications.setShowNewAppModal}
                            showToastMsg={state.showToastMsg}
                            fullName={state.fullName}
                            userDisplayName={state.userDisplayName}
                            setActiveTab={state.setActiveTab}
                            readinessScore={state.readiness.comprehensiveAuditMetrics.score}
                            documents={state.documents.documents}
                        />
                    )}

                    {/* 4. PRE-DEPARTURE & LUGGAGE CHECKLIST */}
                    {(state.activeTab === "predeparture" || state.activeTab === "pre-departure") && (
                        <PreDepartureLuggage
                            selectedDestination={state.selectedDestination}
                            selectedPurpose={state.selectedPurpose}
                            isFetchingPreDepartureAi={state.luggage.isFetchingPreDepartureAi}
                            fetchPreDepartureAi={state.luggage.fetchPreDepartureAi}
                            luggageProgress={state.luggage.luggageProgress}
                            luggageActiveSection={state.luggage.luggageActiveSection}
                            setLuggageActiveSection={state.luggage.setLuggageActiveSection}
                            defaultLuggageItems={state.luggage.defaultLuggageItems}
                            customLuggageItems={state.luggage.customLuggageItems}
                            luggageChecklist={state.luggage.luggageChecklist}
                            toggleLuggageItem={state.luggage.toggleLuggageItem}
                            newLuggageCategory={state.luggage.newLuggageCategory}
                            setNewLuggageCategory={state.luggage.setNewLuggageCategory}
                            newLuggageItemText={state.luggage.newLuggageItemText}
                            setNewLuggageItemText={state.luggage.setNewLuggageItemText}
                            handleAddCustomLuggageItem={state.luggage.handleAddCustomLuggageItem}
                        />
                    )}

                    {/* 5. TRAVELLER DOCUMENTS VAULT */}
                    {state.activeTab === "scanned-documents" && (
                        <DocumentVault
                            hasVaultPassword={state.vaultPassword.hasVaultPassword}
                            isVaultUnlocked={state.vaultPassword.isVaultUnlocked}
                            vaultPasswordInput={state.vaultPassword.vaultPasswordInput}
                            setVaultPasswordInput={state.vaultPassword.setVaultPasswordInput}
                            vaultPasswordConfirm={state.vaultPassword.vaultPasswordConfirm}
                            setVaultPasswordConfirm={state.vaultPassword.setVaultPasswordConfirm}
                            showVaultPassword={state.vaultPassword.showVaultPassword}
                            setShowVaultPassword={state.vaultPassword.setShowVaultPassword}
                            vaultError={state.vaultPassword.vaultError}
                            setVaultError={state.vaultPassword.setVaultError}
                            isVaultSubmitting={state.vaultPassword.isVaultSubmitting}
                            handleSetInitialVaultPassword={state.vaultPassword.handleSetInitialVaultPassword}
                            handleUnlockVault={state.vaultPassword.handleUnlockVault}
                            handleLockVault={state.vaultPassword.handleLockVault}
                            setShowResetVaultPasswordModal={state.vaultPassword.setShowResetVaultPasswordModal}
                            setShowChangeVaultPasswordModal={state.vaultPassword.setShowChangeVaultPasswordModal}

                            documents={state.documents.documents}
                            setDocuments={state.documents.setDocuments}
                            selectedDestination={state.selectedDestination}
                            selectedPassport={state.selectedPassport}
                            selectedPurpose={state.selectedPurpose}
                            fullName={state.fullName}
                            email={state.email}

                            isScanningVaultDoc={state.documents.isScanningVaultDoc}
                            vaultDocSearch={state.documents.vaultDocSearch}
                            setVaultDocSearch={state.documents.setVaultDocSearch}
                            vaultDocTypeFilter={state.documents.vaultDocTypeFilter}
                            setVaultDocTypeFilter={state.documents.setVaultDocTypeFilter}
                            vaultDocSort={state.documents.vaultDocSort}
                            setVaultDocSort={state.documents.setVaultDocSort}
                            selectedVaultDoc={state.documents.selectedVaultDoc}
                            setSelectedVaultDoc={state.documents.setSelectedVaultDoc}
                            isEditingOcr={state.documents.isEditingOcr}
                            setIsEditingOcr={state.documents.setIsEditingOcr}
                            editOcrForm={state.documents.editOcrForm}
                            setEditOcrForm={state.documents.setEditOcrForm}
                            vaultDocMenuId={state.documents.vaultDocMenuId}
                            setVaultDocMenuId={state.documents.setVaultDocMenuId}
                            replacingDocId={state.documents.replacingDocId}
                            setReplacingDocId={state.documents.setReplacingDocId}
                            vaultActionToast={state.documents.vaultActionToast}
                            setVaultActionToast={state.documents.setVaultActionToast}

                            vaultFileInputRef={state.documents.vaultFileInputRef}
                            replaceFileInputRef={state.documents.replaceFileInputRef}
                            vaultUploadTargetReq={state.documents.vaultUploadTargetReq}
                            setVaultUploadTargetReq={state.documents.setVaultUploadTargetReq}
                            vaultUploadTargetReqRef={state.documents.vaultUploadTargetReqRef}
                            stagedPassportFile={state.documents.stagedPassportFile}
                            setStagedPassportFile={state.documents.setStagedPassportFile}
                            stagedPassportPreview={state.documents.stagedPassportPreview}
                            setStagedPassportPreview={state.documents.setStagedPassportPreview}

                            handleUploadVaultDocument={state.documents.handleUploadVaultDocument}
                            handleDownloadDoc={state.documents.handleDownloadDoc}
                            handleDeleteDoc={state.documents.handleDeleteDoc}
                            handleStartEditOcr={state.documents.handleStartEditOcr}
                            handleSaveEditOcr={state.documents.handleSaveEditOcr}
                            handleTriggerUploadForReq={state.documents.handleTriggerUploadForReq}
                            handleSubmitStagedPassport={state.documents.handleSubmitStagedPassport}
                        />
                    )}

                    {/* 6. PROFILE & SETTINGS */}
                    {state.activeTab === "profile" && (
                        <ProfileSettings
                            modalFirstName={state.modalFirstName}
                            setModalFirstName={state.setModalFirstName}
                            modalLastName={state.modalLastName}
                            setModalLastName={state.setModalLastName}
                            modalPhone={state.modalPhone}
                            setModalPhone={state.setModalPhone}
                            modalPhoto={state.modalPhoto}
                            setModalPhoto={state.setModalPhoto}
                            modalPassportCountry={state.modalPassportCountry}
                            setModalPassportCountry={state.setModalPassportCountry}
                            modalResidentOf={state.modalResidentOf}
                            setModalResidentOf={state.setModalResidentOf}
                            modalDestinations={state.modalDestinations}
                            setModalDestinations={state.setModalDestinations}
                            handleSaveProfileModal={state.handleSaveProfileModal}
                            userDisplayName={state.userDisplayName}
                            email={state.email}
                            showProfileModal={state.showProfileModal}
                            setShowProfileModal={state.setShowProfileModal}
                        />
                    )}

                    {/* 7. CONSULTATIONS, ESCROW VAULT & OTHER TABS */}
                    {state.activeTab !== "dashboard" &&
                        state.activeTab !== "profile" &&
                        state.activeTab !== "cases" &&
                        state.activeTab !== "scanned-documents" &&
                        state.activeTab !== "predeparture" &&
                        state.activeTab !== "pre-departure" &&
                        state.activeTab !== "visa-readiness" && (
                            <Consultations activeTab={state.activeTab} />
                    )}
                </main>
            </div>

            {/* Modals */}
            <NewAppModal
                show={state.applications.showNewAppModal}
                onClose={() => state.applications.setShowNewAppModal(false)}
                onSubmit={state.applications.handleCreateNewApplication}
                newAppName={state.applications.newAppName}
                setNewAppName={state.applications.setNewAppName}
                newAppDest={state.applications.newAppDest}
                setNewAppDest={state.applications.setNewAppDest}
                newAppPass={state.applications.newAppPass}
                setNewAppPass={state.applications.setNewAppPass}
                newAppPurpose={state.applications.newAppPurpose}
                setNewAppPurpose={state.applications.setNewAppPurpose}
                selectedDestination={state.selectedDestination}
                selectedPassport={state.selectedPassport}
                selectedPurpose={state.selectedPurpose}
                visasProcessingCount={state.applications.visasProcessingState.length}
            />

            <ChangeVaultPasswordModal
                show={state.vaultPassword.showChangeVaultPasswordModal}
                onClose={() => state.vaultPassword.setShowChangeVaultPasswordModal(false)}
                onSubmit={state.vaultPassword.handleChangeVaultPassword}
                vaultOldPasswordInput={state.vaultPassword.vaultOldPasswordInput}
                setVaultOldPasswordInput={state.vaultPassword.setVaultOldPasswordInput}
                showVaultOldPassword={state.vaultPassword.showVaultOldPassword}
                setShowVaultOldPassword={state.vaultPassword.setShowVaultOldPassword}
                vaultPasswordInput={state.vaultPassword.vaultPasswordInput}
                setVaultPasswordInput={state.vaultPassword.setVaultPasswordInput}
                showVaultPassword={state.vaultPassword.showVaultPassword}
                setShowVaultPassword={state.vaultPassword.setShowVaultPassword}
                vaultPasswordConfirm={state.vaultPassword.vaultPasswordConfirm}
                setVaultPasswordConfirm={state.vaultPassword.setVaultPasswordConfirm}
                vaultError={state.vaultPassword.vaultError}
                isVaultSubmitting={state.vaultPassword.isVaultSubmitting}
            />

            <ResetVaultPasswordModal
                show={state.vaultPassword.showResetVaultPasswordModal}
                onClose={() => state.vaultPassword.setShowResetVaultPasswordModal(false)}
                onSubmit={state.vaultPassword.handleResetVaultPassword}
                vaultAccountPasswordInput={state.vaultPassword.vaultAccountPasswordInput}
                setVaultAccountPasswordInput={state.vaultPassword.setVaultAccountPasswordInput}
                vaultPasswordInput={state.vaultPassword.vaultPasswordInput}
                setVaultPasswordInput={state.vaultPassword.setVaultPasswordInput}
                showVaultPassword={state.vaultPassword.showVaultPassword}
                setShowVaultPassword={state.vaultPassword.setShowVaultPassword}
                vaultPasswordConfirm={state.vaultPassword.vaultPasswordConfirm}
                setVaultPasswordConfirm={state.vaultPassword.setVaultPasswordConfirm}
                vaultError={state.vaultPassword.vaultError}
                isVaultSubmitting={state.vaultPassword.isVaultSubmitting}
            />

            <ToastNotification
                message={state.dashboardToast || (state.profileUpdatedToast ? "Travel profile updated successfully!" : null)}
            />
        </div>
    );
};

export default UserDashboard;
