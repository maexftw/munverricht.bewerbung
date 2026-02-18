import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X, Terminal, User, Code, Briefcase, Mail } from 'lucide-react';
import ASCIIText from './ASCIIText';

const navItems = [
    { name: 'Start', href: '#hero', icon: Terminal },
    { name: 'About', href: '#evolution', icon: User },
    { name: 'Projects', href: '#projects', icon: Briefcase },
    { name: 'Skills', href: '#skill-monitor', icon: Code },
    { name: 'Contact', href: '#contact-shell', icon: Mail },
];

const Navigation: React.FC = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [scrolled, setScrolled] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            setScrolled(window.scrollY > 50);
        };
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    const scrollToSection = (href: string) => {
        setIsOpen(false);
        const element = document.querySelector(href);
        if (element) {
            element.scrollIntoView({ behavior: 'smooth' });
        }
    };

    return (
        <>
            {/* Desktop Navigation */}
            <motion.nav
                initial={{ y: -100 }}
                animate={{ y: 0 }}
                className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${scrolled ? 'bg-[#050505]/80 backdrop-blur-md border-b border-neutral-800 py-3' : 'bg-transparent py-6'
                    } hidden md:block`}
            >
                <div className="max-w-6xl mx-auto px-4 flex justify-between items-center">
                    <div
                        className="font-bold text-xl tracking-tighter cursor-pointer text-neutral-100"
                        onClick={() => scrollToSection('#hero')}
                    >
                        <ASCIIText text="munverricht" className="lowercase" />
                        <span className="text-blue-500">.org</span>
                    </div>

                    <ul className="flex space-x-8">
                        {navItems.map((item) => (
                            <li key={item.name}>
                                <button
                                    onClick={() => scrollToSection(item.href)}
                                    className="text-sm font-medium text-neutral-400 hover:text-blue-500 transition-colors uppercase tracking-widest flex items-center gap-2"
                                >
                                    <span className="opacity-0 group-hover:opacity-100 transition-opacity debug-icon">
                                        <item.icon className="w-3 h-3" />
                                    </span>
                                    {item.name}
                                </button>
                            </li>
                        ))}
                    </ul>

                    <a
                        href="Maximilian_Unverricht_Resume.html"
                        className="px-4 py-2 bg-neutral-900 border border-neutral-700 rounded text-xs font-bold uppercase tracking-wider hover:border-blue-500 hover:text-white transition-all"
                    >
                        CV <span className="text-blue-500">↓</span>
                    </a>
                </div>
            </motion.nav>

            {/* Mobile Menu Button */}
            <div className="fixed top-4 right-4 z-50 md:hidden">
                <button
                    onClick={() => setIsOpen(!isOpen)}
                    className="p-2 bg-neutral-900 border border-neutral-800 rounded text-neutral-200"
                    aria-label="Toggle Menu"
                >
                    {isOpen ? <X /> : <Menu />}
                </button>
            </div>

            {/* Mobile Navigation Overlay */}
            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        initial={{ opacity: 0, x: '100%' }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: '100%' }}
                        transition={{ type: "spring", damping: 25, stiffness: 200 }}
                        className="fixed inset-0 z-40 bg-[#050505] md:hidden flex flex-col justify-center items-center space-y-8"
                    >
                        {navItems.map((item) => (
                            <button
                                key={item.name}
                                onClick={() => scrollToSection(item.href)}
                                className="text-2xl font-bold uppercase tracking-widest text-white hover:text-blue-500 transition-colors flex items-center gap-4"
                            >
                                <item.icon className="w-6 h-6 text-blue-500" />
                                {item.name}
                            </button>
                        ))}
                        <a
                            href="Maximilian_Unverricht_Resume.html"
                            className="mt-8 px-8 py-4 bg-neutral-900 border border-neutral-700 rounded text-sm font-bold uppercase tracking-wider hover:border-blue-500 hover:text-white transition-all"
                        >
                            Download Resume
                        </a>
                    </motion.div>
                )}
            </AnimatePresence>
        </>
    );
};

export default Navigation;
