"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import {
    Bell, Search, Calendar, FileText, CheckCircle, Clock,
    AlertCircle, Upload, Video, ChevronRight, Download,
    Star, MessageSquare, Settings, LogOut, User, Briefcase,
    CreditCard, Shield, Award, TrendingUp
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import Image from "next/image";
import Link from "next/link";

// Mock user data
const user = {
    name: "Alexander",
    email: "alexander@example.com",
    avatar: "https://lh3.googleusercontent.com/aida-public/AB6AXuDDZxmleQxRiDSZVjffvePEDs4y4voorzfZuSjxJkHHZwdEQVt-tUSw3Tn_DDkkQUA-v52HjraDZ8Y44RHi-tJBnHUhci1aS-6g-iwrvojPWdGPYFKTd0Y6XAH9VUtXumTcdVdf5O4ZpLGXsOBny6SX8CL6S-SCPGm1KihzJR4VfyEa_YBQHkUzCkvbJcZhMOa81r_dravL_oDj9c5jjXx4UH_s_KTOeGZK_r2bfUOV2Yghpoc90VqJ6Bsw0mg7ABA9zqpawiZY4zn2",
    memberSince: "2024",
    applications: 2,
};

const activeApplications = [
    {
        id: "#VH-99210",
        title: "UK Skilled Worker Visa",
        status: "Biometrics Pending",
        stage: "Biometrics",
        progress: 33,
        nextAction: "Biometric appointment: Oct 14, 09:30 AM",
        priority: true,
    },
    {
        id: "#VH-99211",
        title: "Canada Express Entry",
        status: "Document Review",
        stage: "Review",
        progress: 66,
        nextAction: "Waiting for police clearance certificate",
        priority: false,
    },
];

const documents = [
    { name: "Passport Scan", status: "verified", icon: Shield, color: "text-tertiary" },
    { name: "Financial Records", status: "processing", icon: TrendingUp, color: "text-secondary" },
    { name: "Educational Certificates", status: "missing", icon: Award, color: "text-destructive" },
    { name: "Medical Report", status: "uploaded", icon: FileText, color: "text-muted-foreground" },
];

const upcomingAppointments = [
    { lawyer: "Elena Rodriguez", type: "Senior Legal Counsel", time: "Today, 14:00 PM", duration: "30 min", image: "https://lh3.googleusercontent.com/aida-public/AB6AXuAG0Uz-SpYNnszLHcXwl5ZQIn_76-C4qptVsEfLoGXaSI9LsDIcdnSLUbnWZ3m-cbTgMsWHQSGFwOPtWgIbAQB65mrY6_bS2nH31s0CAj3X29xqe6EhwAcGJoid0oOGZF2kehISqs06jBHGelmdiDZt0472B1GXZet2VihjYfI7srDs1YGx-kTH5XJsnEHOJ0GSKcIUrdgLJ2cYTRkH5JqgPi2A1fWAAJxPJDHbCTaQrgVOJQoJjP9lYF-3j1TN7QrM1rWt3gSixFeK", status: "upcoming" },
];

const recentBookings = [
    { title: "Consultation with Marc S.", date: "Oct 10, 2024", status: "completed", amount: "$150" },
    { title: "Visa Processing Fee", date: "Oct 08, 2024", status: "paid", amount: "$450" },
];

export default function DashboardPage() {
    const [activeTab, setActiveTab] = useState("overview");

    return (
        <div className="pt-24 pb-20 px-6 max-w-7xl mx-auto">
            {/* Welcome Header */}
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="mb-8">
                <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                    <div>
                        <h1 className="text-3xl md:text-4xl font-bold tracking-tight">
                            Welcome back, <span className="text-primary">{user.name}</span>
                        </h1>
                        <p className="text-on-surface-variant mt-1">Member since {user.memberSince} • {user.applications} active applications</p>
                    </div>
                    <div className="flex items-center gap-3">
                        <Button variant="ghost" size="icon" className="relative">
                            <Bell className="w-5 h-5" />
                            <span className="absolute top-1 right-1 w-2 h-2 bg-destructive rounded-full" />
                        </Button>
                        <div className="flex items-center gap-3">
                            <div className="w-10 h-10 rounded-full bg-primary/10 overflow-hidden">
                                <img src={user.avatar} alt={user.name} className="object-cover w-full h-full" />
                            </div>
                            <div className="hidden md:block">
                                <p className="text-sm font-semibold">{user.name}</p>
                                <p className="text-xs text-on-surface-variant">{user.email}</p>
                            </div>
                        </div>
                    </div>
                </div>
            </motion.div>

            {/* Stats Cards */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
                {[
                    { label: "Active Applications", value: "2", icon: Briefcase, change: "+1 this month", color: "bg-blue-50 text-blue-600" },
                    { label: "Upcoming Consultations", value: "1", icon: Calendar, change: "Today at 2 PM", color: "bg-green-50 text-green-600" },
                    { label: "Documents Verified", value: "4/8", icon: Shield, change: "50% complete", color: "bg-purple-50 text-purple-600" },
                    { label: "Success Rate", value: "98%", icon: TrendingUp, change: "Top 5% of users", color: "bg-orange-50 text-orange-600" },
                ].map((stat, idx) => (
                    <motion.div key={stat.label} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: idx * 0.1 }}>
                        <Card className="border-none shadow-sm">
                            <CardContent className="p-5">
                                <div className="flex items-center justify-between">
                                    <div>
                                        <p className="text-sm text-on-surface-variant">{stat.label}</p>
                                        <p className="text-2xl font-bold mt-1">{stat.value}</p>
                                        <p className="text-xs text-tertiary mt-1">{stat.change}</p>
                                    </div>
                                    <div className={`w-10 h-10 rounded-full ${stat.color} flex items-center justify-center`}>
                                        <stat.icon className="w-5 h-5" />
                                    </div>
                                </div>
                            </CardContent>
                        </Card>
                    </motion.div>
                ))}
            </div>

            {/* Main Grid */}
            <div className="grid lg:grid-cols-3 gap-8">
                {/* Left Column - Applications */}
                <div className="lg:col-span-2 space-y-6">
                    {/* Active Trackers */}
                    <div>
                        <div className="flex justify-between items-center mb-4">
                            <h2 className="text-xl font-bold">Active Applications</h2>
                            <Button variant="ghost" className="text-primary text-sm gap-1">View All <ChevronRight className="w-4 h-4" /></Button>
                        </div>
                        <div className="space-y-4">
                            {activeApplications.map((app, idx) => (
                                <motion.div key={app.id} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: idx * 0.1 }}>
                                    <Card className="border-none shadow-[0_4px_20px_rgba(19,27,46,0.03)] focus-within:ring-2 focus-within:ring-primary/20">
                                        <CardContent className="p-6">
                                            <div className="flex justify-between items-start mb-4">
                                                <div>
                                                    <p className="text-xs text-on-surface-variant font-medium">Application ID: {app.id}</p>
                                                    <h3 className="text-lg font-bold mt-1">{app.title}</h3>
                                                </div>
                                                {app.priority && (
                                                    <div className="bg-tertiary/10 text-tertiary px-3 py-1.5 rounded-lg text-xs font-bold uppercase tracking-wide">Priority</div>
                                                )}
                                            </div>

                                            {/* Progress Tracker */}
                                            <div className="relative pt-2 pb-6">
                                                <div className="flex justify-between items-center mb-3">
                                                    {["Submitted", app.stage, "Review", "Decision"].map((stage, i) => (
                                                        <div key={`${stage}-${i}`} className="flex flex-col items-center z-10">
                                                            <div className={`w-8 h-8 rounded-full flex items-center justify-center ${i <= (app.stage === "Biometrics" ? 1 : app.stage === "Review" ? 2 : 1)
                                                                ? "bg-tertiary text-white"
                                                                : "bg-surface-container-high text-on-surface-variant"
                                                                }`}>
                                                                {i <= (app.stage === "Biometrics" ? 1 : app.stage === "Review" ? 2 : 1) ? (
                                                                    <CheckCircle className="w-4 h-4" />
                                                                ) : (
                                                                    <span className="text-xs font-bold">{i + 1}</span>
                                                                )}
                                                            </div>
                                                            <span className={`text-[10px] mt-2 font-bold uppercase ${i <= (app.stage === "Biometrics" ? 1 : app.stage === "Review" ? 2 : 1)
                                                                ? "text-tertiary"
                                                                : "text-on-surface-variant"
                                                                }`}>{stage}</span>
                                                        </div>
                                                    ))}
                                                </div>
                                                <div className="absolute top-4 left-6 right-6 h-1 bg-surface-container rounded-full -z-0">
                                                    <div className="h-full bg-tertiary rounded-full shadow-[0_0_10px_rgba(0,84,9,0.3)] transition-all duration-1000" style={{ width: `${app.progress}%` }} />
                                                </div>
                                            </div>

                                            <div className="mt-4 p-4 bg-surface-container-low rounded-xl flex items-center gap-3">
                                                <Calendar className="w-5 h-5 text-primary" />
                                                <p className="text-sm font-medium">{app.nextAction}</p>
                                            </div>
                                        </CardContent>
                                    </Card>
                                </motion.div>
                            ))}
                        </div>
                    </div>

                    {/* Document Vault */}
                    <div>
                        <div className="flex justify-between items-center mb-4 mt-8">
                            <h2 className="text-xl font-bold">Document Vault</h2>
                            <Button variant="ghost" className="text-primary text-sm gap-1">Upload New <Upload className="w-4 h-4" /></Button>
                        </div>
                        <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                            {documents.map((doc) => (
                                <Card key={doc.name} className="hover:shadow-md transition-all border-none shadow-[0_2px_10px_rgba(19,27,46,0.03)] cursor-pointer">
                                    <CardContent className="p-4 text-center">
                                        <div className={`w-10 h-10 rounded-full bg-muted flex items-center justify-center mx-auto mb-2 ${doc.color}`}>
                                            <doc.icon className="w-5 h-5" />
                                        </div>
                                        <p className="text-sm font-medium text-balance">{doc.name}</p>
                                        <p className={`text-[10px] font-bold uppercase mt-2 tracking-wider ${doc.status === "verified" ? "text-tertiary" :
                                            doc.status === "processing" ? "text-secondary" :
                                                doc.status === "missing" ? "text-destructive" : "text-on-surface-variant"
                                            }`}>
                                            {doc.status}
                                        </p>
                                    </CardContent>
                                </Card>
                            ))}
                        </div>
                    </div>
                </div>

                {/* Right Column - Appointments & Activity */}
                <div className="space-y-6">
                    {/* Upload Zone */}
                    <Card className="border-2 border-dashed border-primary/30 bg-primary/5 hover:bg-primary/10 transition-colors cursor-pointer">
                        <CardContent className="p-8 text-center">
                            <div className="w-16 h-16 rounded-full bg-white shadow-md flex items-center justify-center mx-auto mb-4">
                                <Upload className="w-7 h-7 text-primary" />
                            </div>
                            <h3 className="font-bold text-lg text-primary">Drop your files here</h3>
                            <p className="text-sm text-on-surface-variant mt-1">Drag and drop any legal documents</p>
                            <div className="flex items-center justify-center gap-2 mt-4">
                                <span className="bg-on-surface text-white text-[10px] font-bold px-2 py-0.5 rounded flex items-center gap-1">
                                    AI Verified
                                </span>
                                <span className="text-[10px] text-on-surface-variant font-medium">256-bit AES Encryption</span>
                            </div>
                        </CardContent>
                    </Card>

                    {/* Upcoming Appointments */}
                    <div>
                        <h2 className="text-xl font-bold mb-4">Upcoming Consultations</h2>
                        {upcomingAppointments.map((apt) => (
                            <Card key={apt.lawyer} className="border-none shadow-sm">
                                <CardContent className="p-5">
                                    <div className="flex gap-4">
                                        <div className="w-12 h-12 rounded-xl bg-muted overflow-hidden shrink-0">
                                            <img src={apt.image} alt={apt.lawyer} className="object-cover w-full h-full" />
                                        </div>
                                        <div className="flex-1">
                                            <h4 className="font-bold">{apt.lawyer}</h4>
                                            <p className="text-xs text-on-surface-variant mt-0.5">{apt.type}</p>
                                            <div className="mt-3 flex items-center gap-3 text-xs font-medium text-on-surface-variant bg-surface-container-low px-2 py-1.5 rounded-lg w-max">
                                                <div className="flex items-center gap-1.5"><Calendar className="w-3 h-3 text-primary" /> {apt.time}</div>
                                                <div className="flex items-center gap-1.5"><Clock className="w-3 h-3 text-primary" /> {apt.duration}</div>
                                            </div>
                                        </div>
                                    </div>
                                    <Button className="w-full mt-4 gap-2 bg-primary hover:bg-primary-container">
                                        <Video className="w-4 h-4" /> Join Meeting
                                    </Button>
                                </CardContent>
                            </Card>
                        ))}
                    </div>

                    {/* Recent Activity */}
                    <div>
                        <div className="flex justify-between items-center mb-4 mt-6">
                            <h2 className="text-xl font-bold">Recent Billing</h2>
                            <Button variant="ghost" className="text-primary text-sm">View All</Button>
                        </div>
                        <Card className="border-none shadow-sm">
                            <CardContent className="p-0 divide-y divide-border/50">
                                {recentBookings.map((booking, idx) => (
                                    <div key={idx} className="p-4 flex justify-between items-center hover:bg-surface-container-lowest transition-colors cursor-pointer">
                                        <div className="flex gap-3 items-center">
                                            <div className={`w-10 h-10 rounded-full flex items-center justify-center shadow-sm ${booking.status === "completed" ? "bg-tertiary/10 text-tertiary" : "bg-primary/10 text-primary"
                                                }`}>
                                                {booking.status === "completed" ? <CheckCircle className="w-5 h-5" /> : <CreditCard className="w-5 h-5" />}
                                            </div>
                                            <div>
                                                <p className="text-sm font-bold">{booking.title}</p>
                                                <p className="text-xs text-on-surface-variant mt-0.5">{booking.date}</p>
                                            </div>
                                        </div>
                                        <div className="text-right">
                                            <p className="text-sm font-bold">{booking.amount}</p>
                                            <p className={`text-[10px] mt-0.5 font-bold uppercase tracking-wider ${booking.status === "completed" ? "text-tertiary" : "text-primary"
                                                }`}>{booking.status}</p>
                                        </div>
                                    </div>
                                ))}
                            </CardContent>
                        </Card>
                    </div>

                </div>
            </div>
        </div>
    );
}
