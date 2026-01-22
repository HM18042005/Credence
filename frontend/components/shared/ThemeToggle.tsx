'use client';

import React, { useEffect, useState } from 'react';
import { useTheme } from 'next-themes';
import { Sun, Moon } from 'lucide-react';
import { motion } from 'framer-motion';

export default function ThemeToggle() {
    const [mounted, setMounted] = useState(false);
    const { theme, setTheme } = useTheme();

    useEffect(() => {
        setMounted(true);
    }, []);

    if (!mounted) {
        return <div className="w-10 h-10" />; // Prevent hydration mismatch
    }

    const isDark = theme === 'dark';

    return (
        <button
            onClick={() => setTheme(isDark ? 'light' : 'dark')}
            className="relative p-2.5 rounded-full hover:bg-surface-hover text-text-secondary hover:text-primary transition-all duration-200 group border border-transparent hover:border-border/50"
            aria-label="Toggle theme"
        >
            <div className="relative w-5 h-5 overflow-hidden">
                <motion.div
                    animate={{
                        y: isDark ? 30 : 0,
                        opacity: isDark ? 0 : 1,
                        rotate: isDark ? 90 : 0,
                    }}
                    transition={{ duration: 0.5, ease: "backOut" }}
                    className="absolute inset-0 flex items-center justify-center text-warning"
                >
                    <Sun size={20} className="fill-warning/20" />
                </motion.div>

                <motion.div
                    animate={{
                        y: isDark ? 0 : -30,
                        opacity: isDark ? 1 : 0,
                        rotate: isDark ? 0 : -90,
                    }}
                    transition={{ duration: 0.5, ease: "backOut" }}
                    className="absolute inset-0 flex items-center justify-center text-primary"
                >
                    <Moon size={20} className="fill-primary/20" />
                </motion.div>
            </div>
        </button>
    );
}
