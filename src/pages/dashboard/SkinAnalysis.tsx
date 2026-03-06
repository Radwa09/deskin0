import { motion } from 'framer-motion';
import { Camera, Droplet, ShieldAlert } from 'lucide-react';
import { useState } from 'react';

const itemVariants = {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0, transition: { duration: 0.5 } }
};

export function DashboardSkinAnalysis() {
    const [isScanning, setIsScanning] = useState(false);
    const [result, setResult] = useState<any>(null);

    const startAnalysis = () => {
        setIsScanning(true);
        setResult(null);

        // Mock analysis delay
        setTimeout(() => {
            setIsScanning(false);
            setResult({
                type: 'Combination',
                confidence: '96.4%',
                recommendation: 'Targeted hydration on cheeks, salicylic acid on T-zone.'
            });
        }, 2000);
    };

    return (
        <motion.div
            initial="initial"
            animate="animate"
            exit={{ opacity: 0, y: -20 }}
            className="space-y-8 max-w-3xl"
        >
            <div className="mb-10">
                <h2 className="text-4xl font-serif text-[#3B302B] dark:text-stone-100 mb-2">New <span className="text-[#8C7A6E] italic">Analysis</span></h2>
                <p className="text-stone-500 font-light">Upload a facial image for instant clinical biomarker mapping.</p>
            </div>

            <motion.div variants={itemVariants} className="p-12 border-2 border-dashed border-stone-200 dark:border-stone-700 bg-stone-50/50 dark:bg-stone-800/30 rounded-[3rem] text-center flex flex-col items-center justify-center">
                {!isScanning && !result ? (
                    <>
                        <div className="w-20 h-20 bg-white dark:bg-stone-800 rounded-full flex items-center justify-center mb-6 shadow-sm">
                            <Camera className="w-8 h-8 text-[#4A3C31] dark:text-stone-300" />
                        </div>
                        <h3 className="text-lg font-bold text-[#3B302B] dark:text-stone-200 mb-2">Upload Image</h3>
                        <p className="text-sm text-stone-400 mb-8 max-w-sm">Ensure good lighting and front-facing angle for the highest accuracy.</p>
                        <button
                            onClick={startAnalysis}
                            className="px-8 py-4 bg-[#4A3C31] hover:bg-[#3B302B] text-white rounded-2xl font-bold text-sm shadow-xl shadow-[#4A3C31]/20 transition-all"
                        >
                            Simulate Upload & Analyze
                        </button>
                    </>
                ) : isScanning ? (
                    <div className="flex flex-col items-center py-10 space-y-6">
                        <div className="w-16 h-16 border-4 border-stone-200 border-t-[#4A3C31] rounded-full animate-spin"></div>
                        <div className="text-sm font-bold tracking-[0.3em] uppercase text-stone-400">Processing Layers</div>
                    </div>
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
                                className="text-xs font-bold text-[#4A3C31] dark:text-stone-300 hover:underline"
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
