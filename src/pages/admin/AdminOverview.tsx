import { motion } from 'framer-motion';
import { useAuth } from '../../context/AuthContext';
import { Users, FileImage, Activity } from 'lucide-react';

const itemVariants = {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0, transition: { duration: 0.5 } }
};

export function AdminOverview() {
    const { users, history } = useAuth();
    return (
        <motion.div
            initial="initial"
            animate="animate"
            exit={{ opacity: 0, y: -20 }}
            className="space-y-8"
        >
            <div className="mb-10">
                <h2 className="text-4xl font-serif text-[#3B302B] dark:text-stone-100 mb-2">Network <span className="text-[#8C7A6E] italic">Telemetry</span></h2>
                <p className="text-stone-500 font-light">Global overview of platform activity and clinical data points.</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <motion.div variants={itemVariants} className="p-8 rounded-[2rem] bg-white dark:bg-stone-900 border border-stone-200 dark:border-stone-800 shadow-sm relative overflow-hidden">
                    <div className="relative z-10">
                        <div className="w-12 h-12 bg-stone-50 dark:bg-stone-800 rounded-2xl flex items-center justify-center text-blue-500 mb-6 border border-stone-100 dark:border-stone-700">
                            <Users className="w-6 h-6" />
                        </div>
                        <div className="text-sm font-bold text-stone-400 uppercase tracking-widest mb-1">Total Network Users</div>
                        <div className="text-4xl font-serif text-[#3B302B] dark:text-stone-100">{users.length.toLocaleString()}</div>
                        <div className="text-xs font-bold text-emerald-500 mt-4">Active Nodes</div>
                    </div>
                </motion.div>

                <motion.div variants={itemVariants} className="p-8 rounded-[2rem] bg-white dark:bg-stone-900 border border-stone-200 dark:border-stone-800 shadow-sm relative overflow-hidden">
                    <div className="relative z-10">
                        <div className="w-12 h-12 bg-stone-50 dark:bg-stone-800 rounded-2xl flex items-center justify-center text-emerald-500 mb-6 border border-stone-100 dark:border-stone-700">
                            <Activity className="w-6 h-6" />
                        </div>
                        <div className="text-sm font-bold text-stone-400 uppercase tracking-widest mb-1">Clinical Analyses Run</div>
                        <div className="text-4xl font-serif text-[#3B302B] dark:text-stone-100">{history.length.toLocaleString()}</div>
                        <div className="text-xs font-bold text-emerald-500 mt-4">Analyses Today</div>
                    </div>
                </motion.div>

                <motion.div variants={itemVariants} className="p-8 rounded-[2rem] bg-white dark:bg-stone-900 border border-stone-200 dark:border-stone-800 shadow-sm relative overflow-hidden">
                    <div className="relative z-10">
                        <div className="w-12 h-12 bg-stone-50 dark:bg-stone-800 rounded-2xl flex items-center justify-center text-purple-500 mb-6 border border-stone-100 dark:border-stone-700">
                            <FileImage className="w-6 h-6" />
                        </div>
                        <div className="text-sm font-bold text-stone-400 uppercase tracking-widest mb-1">Uploaded Bio-plates</div>
                        <div className="text-4xl font-serif text-[#3B302B] dark:text-stone-100">1.2M</div>
                        <div className="text-xs font-bold text-stone-400 mt-4">Storage load nominal</div>
                    </div>
                </motion.div>
            </div>

            <motion.div variants={itemVariants} className="mt-8 p-10 rounded-[2.5rem] bg-stone-50 dark:bg-stone-900 border border-stone-200 dark:border-stone-800">
                <h3 className="text-xs font-bold tracking-[0.3em] uppercase text-stone-400 mb-8">System Status: Active Modules</h3>

                <div className="space-y-6">
                    <div className="flex items-center justify-between">
                        <span className="text-sm font-bold text-[#3B302B] dark:text-stone-300">Neural Network Core (Topography)</span>
                        <div className="flex items-center gap-3">
                            <div className="w-32 h-2 bg-stone-200 dark:bg-stone-800 rounded-full overflow-hidden">
                                <div className="h-full bg-emerald-500 w-[95%]"></div>
                            </div>
                            <span className="text-xs text-stone-500 font-bold">95% Load</span>
                        </div>
                    </div>
                    <div className="flex items-center justify-between">
                        <span className="text-sm font-bold text-[#3B302B] dark:text-stone-300">Diagnostic Accuracy Matrix</span>
                        <div className="flex items-center gap-3">
                            <div className="w-32 h-2 bg-stone-200 dark:bg-stone-800 rounded-full overflow-hidden">
                                <div className="h-full bg-blue-500 w-[98%]"></div>
                            </div>
                            <span className="text-xs text-stone-500 font-bold">98.4% Accuracy</span>
                        </div>
                    </div>
                    <div className="flex items-center justify-between">
                        <span className="text-sm font-bold text-[#3B302B] dark:text-stone-300">Biometric Sync APIs</span>
                        <div className="flex items-center gap-3">
                            <div className="w-32 h-2 bg-stone-200 dark:bg-stone-800 rounded-full overflow-hidden">
                                <div className="h-full bg-amber-500 w-[72%]"></div>
                            </div>
                            <span className="text-xs text-stone-500 font-bold">72% Load</span>
                        </div>
                    </div>
                </div>
            </motion.div>

            <motion.div variants={itemVariants} className="p-8 rounded-[2.5rem] bg-white dark:bg-stone-900 border border-stone-100 dark:border-stone-800 shadow-sm">
                <div className="flex items-center gap-4 mb-8">
                    <div className="w-10 h-10 rounded-xl bg-stone-50 dark:bg-stone-800 flex items-center justify-center border border-stone-100 dark:border-stone-700">
                        <Activity className="w-5 h-5 text-[#8C7A6E]" />
                    </div>
                    <h3 className="font-bold text-[#3B302B] dark:text-stone-200">System Activity Log</h3>
                </div>
                <div className="space-y-4">
                    {useAuth().activities.slice(0, 8).map((activity, i) => (
                        <div key={i} className="flex justify-between items-center py-4 border-b border-stone-100 dark:border-stone-800 last:border-0">
                            <div className="flex flex-col">
                                <span className="text-sm font-bold text-[#3B302B] dark:text-stone-200">{activity.title}</span>
                                <span className="text-xs text-stone-500">{activity.description}</span>
                            </div>
                            <span className="text-[10px] font-bold text-stone-400 uppercase tracking-widest">{activity.date}</span>
                        </div>
                    ))}
                </div>
            </motion.div>
        </motion.div>
    );
}
