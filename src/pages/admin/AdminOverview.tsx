import { motion } from 'framer-motion';
import { Users, FileImage, Activity } from 'lucide-react';

const itemVariants = {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0, transition: { duration: 0.5 } }
};

export function AdminOverview() {
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
                        <div className="text-4xl font-serif text-[#3B302B] dark:text-stone-100">12,408</div>
                        <div className="text-xs font-bold text-emerald-500 mt-4">+12% from last month</div>
                    </div>
                </motion.div>

                <motion.div variants={itemVariants} className="p-8 rounded-[2rem] bg-white dark:bg-stone-900 border border-stone-200 dark:border-stone-800 shadow-sm relative overflow-hidden">
                    <div className="relative z-10">
                        <div className="w-12 h-12 bg-stone-50 dark:bg-stone-800 rounded-2xl flex items-center justify-center text-emerald-500 mb-6 border border-stone-100 dark:border-stone-700">
                            <Activity className="w-6 h-6" />
                        </div>
                        <div className="text-sm font-bold text-stone-400 uppercase tracking-widest mb-1">Clinical Analyses Run</div>
                        <div className="text-4xl font-serif text-[#3B302B] dark:text-stone-100">845,920</div>
                        <div className="text-xs font-bold text-emerald-500 mt-4">+4% from last week</div>
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
                        <span className="text-sm font-bold text-[#3B302B] dark:text-stone-300">Hydration Mapping Engine</span>
                        <div className="flex items-center gap-3">
                            <div className="w-32 h-2 bg-stone-200 dark:bg-stone-800 rounded-full overflow-hidden">
                                <div className="h-full bg-blue-500 w-[40%]"></div>
                            </div>
                            <span className="text-xs text-stone-500 font-bold">40% Load</span>
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
        </motion.div>
    );
}
