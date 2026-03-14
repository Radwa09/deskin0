import { motion } from 'framer-motion';
import { ShieldAlert } from 'lucide-react';
import { useState } from 'react';
import { FaceCapture } from '../../components/FaceCapture';

const itemVariants = {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0, transition: { duration: 0.5 } }
};

export function DashboardSkinAnalysis() {
    const [result, setResult] = useState<any>(null);

    return (
        <motion.div
            initial="initial"
            animate="animate"
            exit={{ opacity: 0, y: -20 }}
            className="space-y-8 max-w-3xl"
        >
            <div className="mb-10">
                <h2 className="text-4xl font-serif text-[#3B302B] dark:text-stone-100 mb-2">New <span className="text-[#8C7A6E] italic">Analysis</span></h2>
                <p className="text-stone-500 font-light">Direct integration with your clinical training dataset.</p>
            </div>

            <motion.div variants={itemVariants} className="p-8 sm:p-12 border-2 border-dashed border-stone-200 dark:border-stone-700 bg-stone-50/50 dark:bg-stone-800/30 rounded-[3rem]">
                {!result ? (
                    <FaceCapture onComplete={setResult} />
                ) : (
                    <motion.div
                        initial={{ scale: 0.9, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        className="w-full text-left bg-white dark:bg-stone-900 p-8 rounded-[2rem] shadow-xl border border-stone-100 dark:border-stone-800"
                    >
                        <h3 className="text-xs font-bold tracking-[0.3em] uppercase text-stone-400 mb-6">Analysis Complete</h3>

                        <div className="grid md:grid-cols-2 gap-8 mb-8">
                            <div>
                                <div className="text-[10px] text-stone-400 font-bold uppercase tracking-widest mb-1">Detected Biotype</div>
                                <div className="text-3xl font-serif text-[#3B302B] dark:text-stone-100">{result.type}</div>
                            </div>
                            <div>
                                <div className="text-[10px] text-stone-400 font-bold uppercase tracking-widest mb-1">AI Confidence</div>
                                <div className="text-3xl font-serif text-emerald-600">{result.confidence}</div>
                            </div>
                        </div>

                        <div className="p-6 bg-stone-50 dark:bg-stone-800/50 rounded-2xl">
                            <div className="flex items-center gap-3 mb-2">
                                <ShieldAlert className="w-5 h-5 text-[#8C7A6E]" />
                                <span className="font-bold text-[#3B302B] dark:text-stone-200">Clinical Recommendation</span>
                            </div>
                            <p className="text-sm text-stone-600 dark:text-stone-400">
                                {result.recommendation}
                            </p>
                        </div>

                        <div className="mt-8 flex justify-end">
                            <button
                                onClick={() => setResult(null)}
                                className="text-xs font-bold text-[#4A3C31] dark:text-stone-300 hover:underline px-4 py-2 hover:bg-stone-50 dark:hover:bg-stone-800 rounded-lg transition-colors"
                            >
                                Perform New Analysis
                            </button>
                        </div>
                    </motion.div>
                )}
            </motion.div>
        </motion.div>
    );
}
