import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X, Terminal, User, Code, Briefcase, Mail, Sun, Moon } from 'lucide-react';
import ASCIIText from './ASCIIText';
import { useTheme } from './ThemeContext';

type Language = 'de' | 'en';

type NavigationProps = {
    language: Language;
    onLanguageChange: (language: Language) => void;
};

const navItems = {
    de: [
        { name: 'Start', href: '#hero', icon: Terminal },
        { name: 'Über mich', href: '#evolution', icon: User },
        { name: 'Projekte', href: '#projects', icon: Briefcase },
        { name: 'Skills', href: '#skill-monitor', icon: Code },
        { name: 'Kontakt', href: '#contact-shell', icon: Mail },
    ],
    en: [
        { name: 'Home', href: '#hero', icon: Terminal },
        { name: 'About', href: '#evolution', icon: User },
        { name: 'Projects', href: '#projects', icon: Briefcase },
        { name: 'Skills', href: '#skill-monitor', icon: Code },
        { name: 'Contact', href: '#contact-shell', icon: Mail },
    ],
};

const Navigation: React.FC<NavigationProps> = ({ language, onLanguageChange }) => {
    const [isOpen, setIsOpen] = useState(false);
    const [scrolled, setScrolled] = useState(false);
    const { theme, toggleTheme } = useTheme();

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
                className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${scrolled ? 'bg-[#1b1b1b]/75 backdrop-blur-lg shadow-[0_20px_40px_rgba(0,0,0,0.5)] border-b border-[#424754]/25 py-3.5' : 'bg-transparent py-5'
                    } hidden lg:block`}
            >
                <div className="max-w-6xl mx-auto px-6 flex justify-between items-center font-headline">
                    <div
                        className="font-bold text-xl tracking-tighter cursor-pointer text-[#e2e2e2] hover:text-[#adc6ff] transition-colors duration-300"
                        onClick={() => scrollToSection('#hero')}
                    >
                        <ASCIIText text="graphiks" className="lowercase" />
                        <span className="text-[#adc6ff]">.de</span>
                    </div>

                    <ul className="flex space-x-8">
                        {navItems[language].map((item) => (
                            <li key={item.name}>
                                <button
                                    onClick={() => scrollToSection(item.href)}
                                    className="text-xs font-semibold text-[#e2e2e2] hover:text-[#adc6ff] transition-all duration-300 uppercase tracking-widest flex items-center gap-2 relative group py-1"
                                >
                                    {item.name}
                                    <span className="absolute -bottom-0.5 left-0 w-0 h-0.5 bg-[#adc6ff] transition-all duration-300 group-hover:w-full"></span>
                                </button>
                            </li>
                        ))}
                    </ul>

                    <div className="flex items-center gap-4">
                        <button
                            onClick={() => onLanguageChange(language === 'de' ? 'en' : 'de')}
                            className="px-3.5 py-1.5 bg-[#2a2a2a]/60 backdrop-blur-sm border border-[#424754]/40 hover:border-[#adc6ff] text-[#e2e2e2] hover:text-[#adc6ff] rounded font-label text-[10px] font-bold uppercase tracking-wider transition-all"
                        >
                            {language === 'de' ? 'EN' : 'DE'}
                        </button>

                        <a
                            href="Maximilian_Unverricht_Resume.html"
                            className="bg-gradient-to-r from-[#adc6ff] to-[#4d8eff] text-[#002e6a] hover:shadow-[0_0_20px_rgba(173,198,255,0.4)] px-5 py-2 rounded font-label text-[10px] font-bold uppercase tracking-wider transition-all scale-95 hover:scale-100"
                        >
                            {language === 'de' ? 'Lebenslauf' : 'Resume'} <span className="align-middle">↓</span>
                        </a>
                    </div>
                </div>
            </motion.nav>

            {/* Mobile Menu Button */}
            <div className="fixed top-4 right-4 z-50 lg:hidden">
                <button
                    onClick={() => setIsOpen(!isOpen)}
                    className="p-2 bg-neutral-900 border border-neutral-800 rounded text-neutral-200"
                    aria-label={language === 'de' ? 'Menü umschalten' : 'Toggle menu'}
                >
                    {isOpen ? <X /> : <Menu />}
                </button>
            </div>

            {/* Mobile Theme Toggle */}
            <div className="fixed top-4 left-4 z-50 lg:hidden">
                <button
                    onClick={toggleTheme}
                    className="p-2 rounded-full bg-neutral-900 border border-neutral-700 text-neutral-300 hover:text-blue-500 transition-colors"
                    aria-label={`Zu ${theme === 'light' ? 'dunklem' : 'hellem'} Modus wechseln`}
                >
                    {theme === 'light' ? <Moon className="w-4 h-4" /> : <Sun className="w-4 h-4" />}
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
                        className="fixed inset-0 z-40 bg-[#050505] lg:hidden flex flex-col justify-center items-center space-y-8"
                    >
                        <button
                            onClick={() => onLanguageChange(language === 'de' ? 'en' : 'de')}
                            className="text-sm font-bold uppercase tracking-widest text-blue-400"
                        >
                            {language === 'de' ? 'Switch to EN' : 'Wechsel zu DE'}
                        </button>

                        {navItems[language].map((item) => (
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
                            {language === 'de' ? 'Lebenslauf herunterladen' : 'Download resume'}
                        </a>
                    </motion.div>
                )}
            </AnimatePresence>
        </>
    );
};

export default Navigation;
