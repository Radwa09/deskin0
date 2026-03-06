import { motion } from 'framer-motion';
import { Activity, Clock, ShieldCheck, Droplet } from 'lucide-react';

const itemVariants = {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0, transition: { duration: 0.5 } }
};

export function DashboardOverview({ onNavigate }: { onNavigate: (page: string) => void }) {
    return (
        <motion.div
            initial="initial"
            animate="animate"
            exit={{ opacity: 0, y: -20 }}
            className="space-y-8"
        >
            <div className="mb-10">
                <h2 className="text-4xl font-serif text-[#3B302B] dark:text-stone-100 mb-2">Clinical <span className="text-[#8C7A6E] italic">Overview</span></h2>
                <p className="text-stone-500 font-light">Your dermal biometrics and clinical history at a glance.</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <motion.div variants={itemVariants} className="p-8 rounded-[2rem] bg-stone-50 dark:bg-stone-800/50 border border-stone-200 dark:border-stone-800">
                    <div className="w-12 h-12 bg-white dark:bg-stone-800 rounded-2xl flex items-center justify-center text-[#4A3C31] dark:text-stone-300 mb-6 shadow-sm">
                        <Activity className="w-6 h-6" />
                    </div>
                    <div className="text-sm font-bold text-stone-400 uppercase tracking-widest mb-1">Latest Scan</div>
                    <div className="text-2xl font-serif text-[#3B302B] dark:text-stone-100">Optimal</div>
                </motion.div>

                <motion.div variants={itemVariants} className="p-8 rounded-[2rem] bg-stone-50 dark:bg-stone-800/50 border border-stone-200 dark:border-stone-800">
                    <div className="w-12 h-12 bg-white dark:bg-stone-800 rounded-2xl flex items-center justify-center text-[#4A3C31] dark:text-stone-300 mb-6 shadow-sm">
                        <Droplet className="w-6 h-6" />
                    </div>
                    <div className="text-sm font-bold text-stone-400 uppercase tracking-widest mb-1">Hydration Index</div>
                    <div className="text-2xl font-serif text-[#3B302B] dark:text-stone-100">78%</div>
                </motion.div>

                <motion.div variants={itemVariants} className="p-8 rounded-[2rem] bg-stone-50 dark:bg-stone-800/50 border border-stone-200 dark:border-stone-800">
                    <div className="w-12 h-12 bg-white dark:bg-stone-800 rounded-2xl flex items-center justify-center text-[#4A3C31] dark:text-stone-300 mb-6 shadow-sm">
                        <Clock className="w-6 h-6" />
                    </div>
                    <div className="text-sm font-bold text-stone-400 uppercase tracking-widest mb-1">Next Protocol</div>
                    <div className="text-2xl font-serif text-[#3B302B] dark:text-stone-100">PM Routine</div>
                </motion.div>
            </div>

            <motion.div variants={itemVariants} className="p-10 rounded-[2.5rem] bg-[#4A3C31] text-white shadow-2xl shadow-stone-900/20 mt-8 relative overflow-hidden">
                <div className="relative z-10 flex flex-col md:flex-row justify-between items-center gap-8">
                    <div>
                        <h3 className="text-xs font-bold tracking-[0.3em] uppercase text-stone-100/40 mb-2">Priority Action</h3>
                        <div className="text-2xl font-serif text-stone-50 mb-2">Initiate New Scan</div>
                        <p className="text-sm text-stone-300 font-light max-w-sm">It's been 14 days since your last dermal analysis. Keep your protocol updated.</p>
                    </div>
                    <button
                        onClick={() => onNavigate('dashboard/analysis')}
                        className="px-8 py-4 bg-white text-[#4A3C31] rounded-2xl font-bold text-sm hover:scale-105 active:scale-95 transition-all shadow-xl"
                    >
                        Start Analysis
                    </button>
                </div>
                <div className="absolute top-0 right-0 w-64 h-64 bg-stone-100/10 rounded-full blur-[80px] -mr-32 -mt-32 pointer-events-none" />
            </motion.div>

            <motion.div variants={itemVariants} className="p-8 rounded-[2.5rem] bg-white dark:bg-stone-900 border border-stone-100 dark:border-stone-800 shadow-sm mt-8">
                <div className="flex items-center gap-4 mb-6">
                    <div className="w-10 h-10 rounded-xl bg-stone-50 dark:bg-stone-800 flex items-center justify-center border border-stone-100 dark:border-stone-700">
                        <ShieldCheck className="w-5 h-5 text-[#8C7A6E]" />
                    </div>
                    <h3 className="font-bold text-[#3B302B] dark:text-stone-200">Recent Activity</h3>
                </div>
                <div className="space-y-4">
                    {[
                        { action: "Completed PM Routine", time: "10 hours ago" },
                        { action: "Updated Profile Protocol", time: "2 days ago" },
                        { action: "Purchased Hydration Serum", time: "1 week ago" }
                    ].map((activity, i) => (
                        <div key={i} className="flex justify-between items-center py-4 border-b border-stone-100 dark:border-stone-800 last:border-0 last:pb-0">
                            <span className="text-sm text-stone-600 dark:text-stone-300 font-medium">{activity.action}</span>
                            <span className="text-xs text-stone-400 font-bold uppercase tracking-wider">{activity.time}</span>
                        </div>
                    ))}
                </div>
            </motion.div>
        </motion.div>
    );
}
