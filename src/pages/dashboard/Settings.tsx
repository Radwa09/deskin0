import { motion, AnimatePresence } from 'framer-motion';
import { Save, User, Shield, Bell, Eye, LogOut } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import { useState } from 'react';

const itemVariants = {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0, transition: { duration: 0.5 } }
};

export function DashboardSettings() {
    const { user, logout, updateProfile } = useAuth();
    const [activeSection, setActiveSection] = useState('profile');
    const [saved, setSaved] = useState(false);
    
    // Form states
    const [name, setName] = useState(user?.name || '');
    const [bio, setBio] = useState(user?.bio || '');

    const handleSave = (e: React.FormEvent) => {
        e.preventDefault();
        updateProfile({ name, bio }, 'Platform Configuration Synchronized');
        setSaved(true);
        setTimeout(() => setSaved(false), 3000);
    };

    const sections = [
        { id: 'profile', label: 'Profile', icon: <User className="w-4 h-4" /> },
        { id: 'account', label: 'Account Security', icon: <Shield className="w-4 h-4" /> },
        { id: 'notifications', label: 'Notifications', icon: <Bell className="w-4 h-4" /> },
        { id: 'privacy', label: 'Privacy', icon: <Eye className="w-4 h-4" /> },
    ];

    return (
        <motion.div
            initial="initial"
            animate="animate"
            exit={{ opacity: 0, y: -20 }}
            className="space-y-8"
        >
            <div className="mb-10">
                <h2 className="text-4xl font-serif text-[#3B302B] dark:text-stone-100 mb-2">System <span className="text-[#8C7A6E] italic">Settings</span></h2>
                <p className="text-stone-500 font-light">Configure your clinical environment and account preferences.</p>
            </div>

            <div className="flex flex-col md:flex-row gap-8">
                {/* Sidebar Navigation */}
                <div className="w-full md:w-64 space-y-2">
                    {sections.map((section) => (
                        <button
                            key={section.id}
                            onClick={() => setActiveSection(section.id)}
                            className={`w-full flex items-center gap-4 px-6 py-4 rounded-2xl text-sm font-bold transition-all ${
                                activeSection === section.id
                                    ? 'bg-[#4A3C31] text-white shadow-lg shadow-stone-900/10'
                                    : 'text-stone-500 hover:bg-stone-100 dark:hover:bg-stone-800'
                            }`}
                        >
                            {section.icon}
                            {section.label}
                        </button>
                    ))}
                    <div className="pt-4 mt-4 border-t border-stone-100 dark:border-stone-800">
                        <button 
                            onClick={logout}
                            className="w-full flex items-center gap-4 px-6 py-4 rounded-2xl text-sm font-bold text-rose-500 hover:bg-rose-50 dark:hover:bg-rose-900/20 transition-all"
                        >
                            <LogOut className="w-4 h-4" />
                            Terminate Session
                        </button>
                    </div>
                </div>

                <div className="flex-1">
                    <AnimatePresence mode="wait">
                        <motion.div
                            key={activeSection}
                            variants={itemVariants}
                            initial="initial"
                            animate="animate"
                            exit={{ opacity: 0, x: 20 }}
                            className="bg-white dark:bg-stone-900 border border-stone-200 dark:border-stone-800 rounded-[2.5rem] p-10 shadow-sm"
                        >
                        <form className="space-y-8" onSubmit={handleSave}>
                            {activeSection === 'profile' && (
                                <div className="space-y-8">
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                                        <div className="space-y-2">
                                            <label className="text-xs font-bold text-stone-400 uppercase tracking-widest pl-2">Display Name</label>
                                            <input type="text" value={name} onChange={(e) => setName(e.target.value)} className="w-full px-6 py-4 bg-stone-50 dark:bg-stone-800 border border-stone-200 dark:border-stone-700 rounded-2xl text-sm focus:outline-none dark:text-stone-200" />
                                        </div>
                                        <div className="space-y-2">
                                            <label className="text-xs font-bold text-stone-400 uppercase tracking-widest pl-2">Bio-Profile ID</label>
                                            <input type="text" readOnly value={`SKN-${user?.id || '7721'}`} className="w-full px-6 py-4 bg-stone-100 dark:bg-stone-800 border border-stone-200 dark:border-stone-700 rounded-2xl text-sm text-stone-400 cursor-not-allowed" />
                                        </div>
                                    </div>
                                    <div className="space-y-2">
                                        <label className="text-xs font-bold text-stone-400 uppercase tracking-widest pl-2">Clinical Bio</label>
                                        <textarea rows={4} value={bio} onChange={(e) => setBio(e.target.value)} className="w-full px-6 py-4 bg-stone-50 dark:bg-stone-800 border border-stone-200 dark:border-stone-700 rounded-2xl text-sm focus:outline-none dark:text-stone-200 resize-none" placeholder="Describe your skin history or concerns..." />
                                    </div>
                                </div>
                            )}

                            {activeSection === 'account' && (
                                <div className="space-y-8">
                                    <div className="space-y-2">
                                        <label className="text-xs font-bold text-stone-400 uppercase tracking-widest pl-2">Email Endpoint</label>
                                        <input type="email" defaultValue={user?.email} className="w-full px-6 py-4 bg-stone-50 dark:bg-stone-800 border border-stone-200 dark:border-stone-700 rounded-2xl text-sm focus:outline-none dark:text-stone-200 text-stone-400" />
                                    </div>
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                                        <div className="space-y-2">
                                            <label className="text-xs font-bold text-stone-400 uppercase tracking-widest pl-2">New Protocol Key</label>
                                            <input type="password" placeholder="••••••••" className="w-full px-6 py-4 bg-stone-50 dark:bg-stone-800 border border-stone-200 dark:border-stone-700 rounded-2xl text-sm focus:outline-none dark:text-stone-200" />
                                        </div>
                                        <div className="space-y-2">
                                            <label className="text-xs font-bold text-stone-400 uppercase tracking-widest pl-2">Confirm Key</label>
                                            <input type="password" placeholder="••••••••" className="w-full px-6 py-4 bg-stone-50 dark:bg-stone-800 border border-stone-200 dark:border-stone-700 rounded-2xl text-sm focus:outline-none dark:text-stone-200" />
                                        </div>
                                    </div>
                                    <div className="p-6 rounded-2xl bg-amber-50 dark:bg-amber-900/20 border border-amber-100 dark:border-amber-900/30 flex items-center gap-4 text-amber-700 dark:text-amber-400 text-sm">
                                        <Shield className="w-5 h-5 shrink-0" />
                                        <p>Two-factor authentication is recommended for clinical-grade data protection.</p>
                                    </div>
                                </div>
                            )}

                            {activeSection === 'notifications' && (
                                <div className="space-y-6">
                                    {[
                                        { id: 'scan_reminders', label: 'Dermal Scan Reminders', desc: 'Alerts for scheduled topography analysis.' },
                                        { id: 'routine_alerts', label: 'Protocol Notifications', desc: 'Reminders for AM/PM skincare routines.' },
                                        { id: 'marketing', label: 'Product Synthesis Updates', desc: 'New formula and product recommendations.' }
                                    ].map((pref) => (
                                        <div key={pref.id} className="flex items-center justify-between p-6 rounded-2xl bg-stone-50 dark:bg-stone-800/50 border border-stone-100 dark:border-stone-700">
                                            <div className="space-y-1">
                                                <div className="font-bold text-[#3B302B] dark:text-stone-200">{pref.label}</div>
                                                <div className="text-xs text-stone-400">{pref.desc}</div>
                                            </div>
                                            <div className="relative inline-block w-12 h-6 bg-emerald-500 rounded-full cursor-pointer">
                                                <div className="absolute right-1 top-1 w-4 h-4 bg-white rounded-full shadow-sm" />
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            )}

                            {activeSection === 'privacy' && (
                                <div className="space-y-8">
                                    <div className="p-8 rounded-[2rem] bg-stone-900 text-white space-y-6">
                                        <div className="flex items-center gap-4">
                                            <div className="w-12 h-12 bg-white/10 rounded-2xl flex items-center justify-center">
                                                <Eye className="w-6 h-6 text-emerald-400" />
                                            </div>
                                            <h4 className="text-xl font-serif">Anonymized Training</h4>
                                        </div>
                                        <p className="text-sm text-stone-400 leading-relaxed font-light">
                                            Contribute your anonymized dermal models to improve our global diagnostic accuracy. We never share personally identifiable information.
                                        </p>
                                        <button className="text-xs font-bold text-emerald-400 uppercase tracking-widest hover:text-emerald-300 transition-colors">Toggle Participation</button>
                                    </div>
                                    <div className="space-y-4">
                                        <button className="w-full px-6 py-4 border border-stone-200 dark:border-stone-800 rounded-2xl text-sm font-bold text-[#3B302B] dark:text-stone-300 hover:bg-stone-50 dark:hover:bg-stone-800 transition-all text-left">
                                            Download Data Archive (.json)
                                        </button>
                                        <button className="w-full px-6 py-4 border border-stone-200 dark:border-stone-800 rounded-2xl text-sm font-bold text-rose-500 hover:bg-rose-50 dark:hover:bg-rose-900/20 transition-all text-left">
                                            Request Account Termination
                                        </button>
                                    </div>
                                </div>
                            )}

                            <div className="pt-8 border-t border-stone-100 dark:border-stone-800 flex items-center justify-between">
                                {saved ? (
                                    <span className="text-sm font-bold text-emerald-600 block transition-all">Configuration synchronized.</span>
                                ) : (
                                    <span className="text-sm text-transparent select-none">Buffer</span>
                                )}

                                <button
                                    type="submit"
                                    className="px-10 py-4 bg-[#4A3C31] hover:bg-[#3B302B] text-white rounded-2xl font-bold text-sm shadow-xl shadow-stone-900/10 transition-all flex items-center gap-3"
                                >
                                    <Save className="w-4 h-4" /> Commit Changes
                                </button>
                            </div>
                        </form>
                    </motion.div>
                    </AnimatePresence>
                </div>
            </div>
        </motion.div>
    );
}
