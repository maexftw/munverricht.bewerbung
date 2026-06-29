import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Menu, Terminal, User, Code, Briefcase, Mail, Sun, Moon } from 'lucide-react';
import ASCIIText from './ASCIIText';
import { useTheme } from './ThemeContext';
import { Button } from '@/components/ui/button';
import {
    Sheet,
    SheetClose,
    SheetContent,
    SheetDescription,
    SheetHeader,
    SheetTitle,
    SheetTrigger,
} from '@/components/ui/sheet';

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
                className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${scrolled ? 'bg-[#050505]/80 backdrop-blur-md border-b border-neutral-800 py-3' : 'bg-transparent py-6'
                    } hidden lg:block`}
            >
                <div className="max-w-6xl mx-auto px-4 flex justify-between items-center">
                    <div
                        className="font-bold text-xl tracking-tighter cursor-pointer text-neutral-100"
                        onClick={() => scrollToSection('#hero')}
                    >
                        <ASCIIText text="graphiks" className="lowercase" />
                        <span className="text-blue-500">.de</span>
                    </div>

                    <ul className="flex space-x-8">
                        {navItems[language].map((item) => (
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

                    <Button
                        onClick={() => onLanguageChange(language === 'de' ? 'en' : 'de')}
                        variant="outline"
                        className="h-auto bg-neutral-900 border-neutral-700 px-3 py-2 mono text-xs font-bold uppercase tracking-wider text-neutral-200 hover:border-blue-500 hover:bg-neutral-900 hover:text-white"
                    >
                        {language === 'de' ? 'EN' : 'DE'}
                    </Button>

                    <Button
                        asChild
                        variant="outline"
                        className="h-auto bg-neutral-900 border-neutral-700 px-4 py-2 mono text-xs font-bold uppercase tracking-wider text-neutral-200 hover:border-blue-500 hover:bg-neutral-900 hover:text-white"
                    >
                        <a href="Maximilian_Unverricht_Resume.html">
                            {language === 'de' ? 'Lebenslauf' : 'Resume'} <span className="text-blue-500">↓</span>
                        </a>
                    </Button>
                </div>
            </motion.nav>

            {/* Mobile Menu Sheet */}
            <div className="fixed top-4 right-4 z-50 lg:hidden">
                <Sheet open={isOpen} onOpenChange={setIsOpen}>
                    <SheetTrigger asChild>
                        <Button
                            variant="outline"
                            size="icon-lg"
                            className="bg-neutral-900/90 border-neutral-800 text-neutral-200 shadow-[0_0_24px_rgba(59,130,246,0.12)] backdrop-blur hover:border-blue-500/70 hover:bg-neutral-900 hover:text-white"
                            aria-label={language === 'de' ? 'Menü öffnen' : 'Open menu'}
                        >
                            <Menu className="w-5 h-5" />
                        </Button>
                    </SheetTrigger>
                    <SheetContent
                        side="right"
                        className="z-[60] w-[min(92vw,24rem)] border-blue-500/20 bg-[#05070d]/98 px-6 py-10 text-white shadow-[0_0_40px_rgba(59,130,246,0.16)] backdrop-blur-xl"
                    >
                        <SheetHeader className="px-0 pb-6 pt-0 text-left">
                            <SheetTitle className="mono text-sm uppercase tracking-[0.24em] text-blue-400">
                                graphiks<span className="text-white">.de</span>
                            </SheetTitle>
                            <SheetDescription className="text-xs leading-relaxed text-neutral-400">
                                {language === 'de'
                                    ? 'Schneller Zugriff auf Profil, Projekte, Skills und Kontakt.'
                                    : 'Fast access to profile, projects, skills, and contact.'}
                            </SheetDescription>
                        </SheetHeader>

                        <div className="flex flex-col gap-3">
                            <Button
                                onClick={() => onLanguageChange(language === 'de' ? 'en' : 'de')}
                                variant="outline"
                                className="justify-start border-blue-500/20 bg-blue-500/10 mono text-xs uppercase tracking-widest text-blue-200 hover:border-blue-400/60 hover:bg-blue-500/15 hover:text-white"
                            >
                                {language === 'de' ? 'Switch to EN' : 'Wechsel zu DE'}
                            </Button>

                            {navItems[language].map((item) => (
                                <SheetClose asChild key={item.name}>
                                    <button
                                        onClick={() => scrollToSection(item.href)}
                                        className="flex items-center gap-4 rounded-xl border border-neutral-800 bg-neutral-950/80 px-4 py-4 text-left text-lg font-bold uppercase tracking-widest text-white transition-colors hover:border-blue-500/60 hover:text-blue-300"
                                    >
                                        <item.icon className="w-5 h-5 text-blue-500" />
                                        {item.name}
                                    </button>
                                </SheetClose>
                            ))}

                            <SheetClose asChild>
                                <a
                                    href="Maximilian_Unverricht_Resume.html"
                                    className="mt-4 inline-flex items-center justify-center rounded-xl border border-blue-500/30 bg-blue-500/10 px-5 py-4 mono text-sm font-bold uppercase tracking-wider text-blue-100 transition-colors hover:border-blue-400/70 hover:text-white"
                                >
                                    {language === 'de' ? 'Lebenslauf herunterladen' : 'Download resume'}
                                </a>
                            </SheetClose>
                        </div>
                    </SheetContent>
                </Sheet>
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

        </>
    );
};

export default Navigation;
