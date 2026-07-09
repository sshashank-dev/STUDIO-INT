import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export const FormModal = ({ isOpen, onClose, title, children }) => (
    <AnimatePresence>
        {isOpen && (
            <>
                <motion.div
                    initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
                    className="fixed inset-0 bg-white/90 z-[100]"
                    onClick={onClose}
                />
                <motion.div
                    initial={{ y: 50, opacity: 0 }} animate={{ y: 0, opacity: 1 }} exit={{ y: 50, opacity: 0 }}
                    className="fixed top-10 left-10 md:left-20 right-10 md:right-20 max-w-2xl bg-white p-10 z-[101] border border-black max-h-[80vh] overflow-y-auto"
                >
                    <div className="flex justify-between mb-8">
                        <h2 className="text-[20px] font-serif">{title}</h2>
                        <button onClick={onClose} className="font-bold hover:opacity-50">✕</button>
                    </div>
                    {children}
                </motion.div>
            </>
        )}
    </AnimatePresence>
);