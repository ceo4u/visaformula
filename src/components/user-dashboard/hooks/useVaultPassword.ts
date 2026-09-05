import { useState } from "react";

export function useVaultPassword(email?: string) {
  const [isVaultUnlocked, setIsVaultUnlocked] = useState(false);
  const [hasVaultPassword, setHasVaultPassword] = useState<boolean | null>(null);
  const [vaultPasswordInput, setVaultPasswordInput] = useState("");
  const [vaultPasswordConfirm, setVaultPasswordConfirm] = useState("");
  const [vaultOldPasswordInput, setVaultOldPasswordInput] = useState("");
  const [vaultAccountPasswordInput, setVaultAccountPasswordInput] = useState("");
  const [vaultError, setVaultError] = useState<string | null>(null);
  const [vaultSuccess, setVaultSuccess] = useState<string | null>(null);
  const [showVaultPassword, setShowVaultPassword] = useState(false);
  const [showVaultOldPassword, setShowVaultOldPassword] = useState(false);
  const [isVaultSubmitting, setIsVaultSubmitting] = useState(false);
  const [showChangeVaultPasswordModal, setShowChangeVaultPasswordModal] = useState(false);
  const [showResetVaultPasswordModal, setShowResetVaultPasswordModal] = useState(false);

  // Profile account password states
  const [currentPwd, setCurrentPwd] = useState("");
  const [newPwd, setNewPwd] = useState("");
  const [confirmNewPwd, setConfirmNewPwd] = useState("");
  const [showCurrentPwd, setShowCurrentPwd] = useState(false);
  const [showNewPwd, setShowNewPwd] = useState(false);
  const [isChangingPwd, setIsChangingPwd] = useState(false);
  const [changePwdSuccess, setChangePwdSuccess] = useState(false);
  const [changePwdError, setChangePwdError] = useState("");
  const [isSendingEmailReset, setIsSendingEmailReset] = useState(false);
  const [emailResetMsg, setEmailResetMsg] = useState("");
  const [emailResetError, setEmailResetError] = useState("");

  const checkVaultPasswordStatus = async () => {
    const targetEmail = email || (typeof window !== 'undefined' ? localStorage.getItem('seeker_email') || '' : '');
    if (!targetEmail) {
      const localPass = typeof window !== 'undefined' ? localStorage.getItem('travltik_vault_pass_guest') : null;
      setHasVaultPassword(Boolean(localPass));
      return;
    }

    try {
      const res = await fetch('/api/user/vault-password', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ action: 'get_status', email: targetEmail })
      });
      const data = await res.json();
      const localPass = typeof window !== 'undefined' ? localStorage.getItem(`travltik_vault_pass_${targetEmail}`) : null;
      if (data.success) {
        setHasVaultPassword(data.hasPassword || Boolean(localPass));
      } else {
        setHasVaultPassword(Boolean(localPass));
      }
    } catch {
      const localPass = typeof window !== 'undefined' ? localStorage.getItem(`travltik_vault_pass_${targetEmail}`) : null;
      setHasVaultPassword(Boolean(localPass));
    }
  };

  const handleUnlockVault = async (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    setVaultError(null);
    if (!vaultPasswordInput.trim()) {
      setVaultError("Please enter your secret vault password.");
      return;
    }

    setIsVaultSubmitting(true);
    const targetEmail = email || (typeof window !== 'undefined' ? localStorage.getItem('seeker_email') || '' : '');

    try {
      const res = await fetch('/api/user/vault-password', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          action: 'verify',
          email: targetEmail || 'guest@travltik.com',
          password: vaultPasswordInput.trim()
        })
      });
      const data = await res.json();
      const localPass = typeof window !== 'undefined' ? localStorage.getItem(`travltik_vault_pass_${targetEmail}`) : null;

      if (data.success || (localPass && localPass === vaultPasswordInput.trim())) {
        setIsVaultUnlocked(true);
        setVaultPasswordInput("");
        setVaultError(null);
      } else {
        setVaultError(data.message || "Incorrect secret vault password. Please try again.");
      }
    } catch {
      const localPass = typeof window !== 'undefined' ? localStorage.getItem(`travltik_vault_pass_${targetEmail}`) : null;
      if (localPass && localPass === vaultPasswordInput.trim()) {
        setIsVaultUnlocked(true);
        setVaultPasswordInput("");
        setVaultError(null);
      } else {
        setVaultError("Incorrect secret vault password. Please try again.");
      }
    } finally {
      setIsVaultSubmitting(false);
    }
  };

  const handleSetInitialVaultPassword = async (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    setVaultError(null);

    if (!vaultPasswordInput || vaultPasswordInput.length < 4) {
      setVaultError("Vault password must be at least 4 characters.");
      return;
    }

    if (vaultPasswordInput !== vaultPasswordConfirm) {
      setVaultError("Passwords do not match. Please verify.");
      return;
    }

    setIsVaultSubmitting(true);
    const targetEmail = email || (typeof window !== 'undefined' ? localStorage.getItem('seeker_email') || '' : '') || 'seeker@travltik.com';

    try {
      await fetch('/api/user/vault-password', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          action: 'set',
          email: targetEmail,
          password: vaultPasswordInput.trim()
        })
      });
      if (typeof window !== 'undefined') {
        localStorage.setItem(`travltik_vault_pass_${targetEmail}`, vaultPasswordInput.trim());
      }
      setHasVaultPassword(true);
      setIsVaultUnlocked(true);
      setVaultPasswordInput("");
      setVaultPasswordConfirm("");
      setVaultSuccess("Secret vault password created! Your Document Vault is now secured.");
      setTimeout(() => setVaultSuccess(null), 4000);
    } catch {
      if (typeof window !== 'undefined') {
        localStorage.setItem(`travltik_vault_pass_${targetEmail}`, vaultPasswordInput.trim());
      }
      setHasVaultPassword(true);
      setIsVaultUnlocked(true);
      setVaultPasswordInput("");
      setVaultPasswordConfirm("");
      setVaultSuccess("Secret vault password created! Your Document Vault is now secured.");
      setTimeout(() => setVaultSuccess(null), 4000);
    } finally {
      setIsVaultSubmitting(false);
    }
  };

  const handleLockVault = () => {
    setIsVaultUnlocked(false);
    setVaultPasswordInput("");
    setVaultError(null);
  };

  const handleChangeVaultPassword = async (e: React.FormEvent) => {
    e.preventDefault();
    setVaultError(null);
    if (!vaultOldPasswordInput) {
      setVaultError("Please enter your current vault password.");
      return;
    }
    if (!vaultPasswordInput || vaultPasswordInput.length < 4) {
      setVaultError("New password must be at least 4 characters.");
      return;
    }
    if (vaultPasswordInput !== vaultPasswordConfirm) {
      setVaultError("New passwords do not match.");
      return;
    }

    setIsVaultSubmitting(true);
    const targetEmail = email || (typeof window !== 'undefined' ? localStorage.getItem('seeker_email') || '' : '');

    try {
      const res = await fetch('/api/user/vault-password', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          action: 'change',
          email: targetEmail,
          currentPassword: vaultOldPasswordInput.trim(),
          newPassword: vaultPasswordInput.trim()
        })
      });
      const data = await res.json();
      if (data.success) {
        if (typeof window !== 'undefined') {
          localStorage.setItem(`travltik_vault_pass_${targetEmail}`, vaultPasswordInput.trim());
        }
        setShowChangeVaultPasswordModal(false);
        setVaultOldPasswordInput("");
        setVaultPasswordInput("");
        setVaultPasswordConfirm("");
        setVaultSuccess("Vault secret password successfully updated!");
        setTimeout(() => setVaultSuccess(null), 4000);
      } else {
        setVaultError(data.message || "Failed to update vault password.");
      }
    } catch {
      setVaultError("Network error. Please try again.");
    } finally {
      setIsVaultSubmitting(false);
    }
  };

  const handleResetVaultPassword = async (e: React.FormEvent) => {
    e.preventDefault();
    setVaultError(null);
    if (!vaultAccountPasswordInput) {
      setVaultError("Please enter your account login password.");
      return;
    }
    if (!vaultPasswordInput || vaultPasswordInput.length < 4) {
      setVaultError("New vault password must be at least 4 characters.");
      return;
    }
    if (vaultPasswordInput !== vaultPasswordConfirm) {
      setVaultError("New vault passwords do not match.");
      return;
    }

    setIsVaultSubmitting(true);
    const targetEmail = email || (typeof window !== 'undefined' ? localStorage.getItem('seeker_email') || '' : '');

    try {
      const res = await fetch('/api/user/vault-password', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          action: 'reset',
          email: targetEmail,
          accountPassword: vaultAccountPasswordInput.trim(),
          newPassword: vaultPasswordInput.trim()
        })
      });
      const data = await res.json();
      if (data.success) {
        if (typeof window !== 'undefined') {
          localStorage.setItem(`travltik_vault_pass_${targetEmail}`, vaultPasswordInput.trim());
        }
        setShowResetVaultPasswordModal(false);
        setVaultAccountPasswordInput("");
        setVaultPasswordInput("");
        setVaultPasswordConfirm("");
        setIsVaultUnlocked(true);
        setVaultSuccess("Vault password has been reset with your account verification!");
        setTimeout(() => setVaultSuccess(null), 4000);
      } else {
        setVaultError(data.message || "Account verification failed. Incorrect password.");
      }
    } catch {
      setVaultError("Network error. Please try again.");
    } finally {
      setIsVaultSubmitting(false);
    }
  };

  const handleDirectPasswordChange = async (e: React.FormEvent) => {
    e.preventDefault();
    setChangePwdError("");
    setChangePwdSuccess(false);

    if (newPwd.length < 8) {
      setChangePwdError("New password must be at least 8 characters long.");
      return;
    }

    if (newPwd !== confirmNewPwd) {
      setChangePwdError("New passwords do not match.");
      return;
    }

    setIsChangingPwd(true);
    try {
      const res = await fetch('/api/auth/change-password', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          email,
          currentPassword: currentPwd,
          newPassword: newPwd
        })
      });
      const data = await res.json();
      if (res.ok && data.success) {
        setChangePwdSuccess(true);
        setCurrentPwd("");
        setNewPwd("");
        setConfirmNewPwd("");
        setTimeout(() => setChangePwdSuccess(false), 5000);
      } else {
        setChangePwdError(data.message || "Failed to update password.");
      }
    } catch (err: any) {
      setChangePwdError("Server connection error. Please try again.");
    } finally {
      setIsChangingPwd(false);
    }
  };

  const handleSendEmailReset = async () => {
    setEmailResetError("");
    setEmailResetMsg("");

    const targetEmail = email || (typeof window !== 'undefined' ? localStorage.getItem("seeker_email") || "" : "");
    if (!targetEmail) {
      setEmailResetError("No registered email found in your profile.");
      return;
    }

    setIsSendingEmailReset(true);
    try {
      const res = await fetch('/api/auth/forgot-password', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email: targetEmail })
      });
      const data = await res.json();
      if (res.ok && (data.status === 'success' || data.success)) {
        setEmailResetMsg("A 6-digit verification code has been dispatched to your email address!");
      } else {
        setEmailResetError(data.message || "Failed to send reset code. Please try again.");
      }
    } catch (err: any) {
      setEmailResetError("Connection error. Please try again.");
    } finally {
      setIsSendingEmailReset(false);
    }
  };

  return {
    isVaultUnlocked,
    setIsVaultUnlocked,
    hasVaultPassword,
    setHasVaultPassword,
    vaultPasswordInput,
    setVaultPasswordInput,
    vaultPasswordConfirm,
    setVaultPasswordConfirm,
    vaultOldPasswordInput,
    setVaultOldPasswordInput,
    vaultAccountPasswordInput,
    setVaultAccountPasswordInput,
    vaultError,
    setVaultError,
    vaultSuccess,
    setVaultSuccess,
    showVaultPassword,
    setShowVaultPassword,
    showVaultOldPassword,
    setShowVaultOldPassword,
    isVaultSubmitting,
    setIsVaultSubmitting,
    showChangeVaultPasswordModal,
    setShowChangeVaultPasswordModal,
    showResetVaultPasswordModal,
    setShowResetVaultPasswordModal,
    checkVaultPasswordStatus,
    handleUnlockVault,
    handleSetInitialVaultPassword,
    handleLockVault,
    handleChangeVaultPassword,
    handleResetVaultPassword,
    // Profile password states & handlers
    currentPwd,
    setCurrentPwd,
    newPwd,
    setNewPwd,
    confirmNewPwd,
    setConfirmNewPwd,
    showCurrentPwd,
    setShowCurrentPwd,
    showNewPwd,
    setShowNewPwd,
    isChangingPwd,
    changePwdSuccess,
    changePwdError,
    isSendingEmailReset,
    emailResetMsg,
    emailResetError,
    handleDirectPasswordChange,
    handleSendEmailReset
  };
}
