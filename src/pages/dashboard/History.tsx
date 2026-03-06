import { motion } from 'framer-motion';
import { Camera, Calendar, Activity } from 'lucide-react';

const itemVariants = {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0, transition: { duration: 0.5 } }
};

const mockHistory = [
    { id: 1, date: 'Mar 10, 2026', type: 'Combination', result: 'Optimal - Barrier Intact' },
    { id: 2, date: 'Feb 24, 2026', type: 'Combination', result: 'Moderate - Hydration Needed' },
    { id: 3, date: 'Jan 15, 2026', type: 'Oily', result: 'Sub-Optimal - High Sebum' },
    { id: 4, date: 'Dec 02, 2025', type: 'Oily', result: 'Sub-Optimal - Inflammation' }
];

export function DashboardHistory() {
    return (
        <motion.div
            initial="initial"
            animate="animate"
            exit={{ opacity: 0, y: -20 }}
            className="space-y-8"
        >
            <div className="mb-10">
                <h2 className="text-4xl font-serif text-[#3B302B] dark:text-stone-100 mb-2">Clinical <span className="text-[#8C7A6E] italic">History</span></h2>
                <p className="text-stone-500 font-light">Trace the evolution of your dermal profile.</p>
            </div>

            <motion.div variants={itemVariants} className="bg-white dark:bg-stone-900 border border-stone-200 dark:border-stone-800 rounded-[2.5rem] overflow-hidden shadow-sm">
                <div className="overflow-x-auto">
                    <table className="w-full text-left border-collapse">
                        <thead>
                            <tr className="bg-stone-50 dark:bg-stone-800/50 border-b border-stone-200 dark:border-stone-800">
                                <th className="p-6 text-xs font-bold text-stone-400 uppercase tracking-widest pl-10">Scan Preview</th>
                                <th className="p-6 text-xs font-bold text-stone-400 uppercase tracking-widest flex items-center gap-2"><Calendar className="w-4 h-4" /> Date</th>
                                <th className="p-6 text-xs font-bold text-stone-400 uppercase tracking-widest">Detected Biotype</th>
                                <th className="p-6 text-xs font-bold text-stone-400 uppercase tracking-widest">Clinical Result</th>
                            </tr>
                        </thead>
                        <tbody>
                            {mockHistory.map((entry, i) => (
                                <tr key={entry.id} className="border-b border-stone-100 dark:border-stone-800/50 hover:bg-stone-50/50 dark:hover:bg-stone-800/30 transition-colors">
                                    <td className="p-6 pl-10">
                                        <div className="w-16 h-16 bg-stone-100 dark:bg-stone-800 rounded-2xl flex items-center justify-center border border-stone-200 dark:border-stone-700">
                                            <Camera className="w-6 h-6 text-stone-400" />
                                        </div>
                                    </td>
                                    <td className="p-6 text-sm font-bold text-[#3B302B] dark:text-stone-300">
                                        {entry.date}
                                    </td>
                                    <td className="p-6 text-sm text-stone-600 dark:text-stone-400">
                                        <span className="px-3 py-1 bg-emerald-50 text-emerald-700 dark:bg-emerald-900/20 dark:text-emerald-400 rounded-full font-medium text-xs border border-emerald-100 dark:border-emerald-800/30">
                                            {entry.type}
                                        </span>
                                    </td>
                                    <td className="p-6 text-sm text-stone-600 dark:text-stone-400 flex items-center gap-2 h-full py-8">
                                        <Activity className={`w-4 h-4 ${entry.result.includes('Optimal') ? 'text-emerald-500' : 'text-amber-500'}`} />
                                        {entry.result}
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </motion.div>
        </motion.div>
    );
}
