'use client';

import React, { useState } from 'react'
import { usePathname } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion'

export const NavBar = () => {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const pathname = usePathname();
    if (pathname?.startsWith('/admin')) return null;
    const links = [
        { name: 'Home', href: '/' },
        { name: 'About', href: '/about' },
        { name: 'Events', href: '/events' },
        { name: 'Giving', href: '/giving' },
        { name: 'Leadership', href: '/leadership' },
        { name: 'Contact', href: '/contact' },
    ];
    const activeIndex = links.findIndex(link => link.href === pathname);
    return (
        <motion.nav 
            className="bg-white shadow-md px-4 lg:px-24 py-6 flex items-center justify-between sticky top-0 z-50 w-full overflow-x-hidden"
            initial={{ opacity: 0, y: -50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
        >
            <motion.div 
                className="flex items-center"
                initial={{ opacity: 0, x: -30 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, delay: 0.2, ease: "easeOut" }}
            >
                <a href="/" className="flex items-center">
                    <img
                        src="/logo.png"
                        alt="Logo"
                        className="h-8 lg:h-10 mr-3 lg:mr-6"
                    />
                    <span className="text-navy font-bold text-lg lg:text-2xl">
                    ELCSA-CD
                </span>
                </a>
                
            </motion.div>

            {/* Desktop Navigation */}
            <motion.ul 
                className="hidden lg:flex gap-8 list-none m-0 p-0"
                initial={{ opacity: 0, x: 30 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, delay: 0.4, ease: "easeOut" }}
            >
                {links.map((link, idx) => (
                    <motion.li 
                        key={link.name}
                        initial={{ opacity: 0, y: -20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ 
                            duration: 0.4, 
                            delay: 0.6 + (idx * 0.1), 
                            ease: "easeOut" 
                        }}
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                    >
                        <a
                            href={link.href}
                            className={`text-navy font-semibold text-base px-2 py-1 rounded transition-transform duration-150 inline-block hover:scale-110 ${idx === activeIndex ? 'underline' : 'no-underline'}`}
                        >
                            {link.name}
                        </a>
                    </motion.li>
                ))}
            </motion.ul>

            {/* Desktop Stream Button */}
            <motion.div
                className="hidden lg:block"
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.6, delay: 1.0, ease: "easeOut" }}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
            >
                <a
                    href="/stream"
                    className="inline-flex items-center gap-2 bg-gradient-to-r from-navy to-gold hover:from-gold hover:to-navy text-white font-bold px-5 py-2 rounded-full shadow-lg transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-navy"
                >
                    <svg
                        className="w-5 h-5"
                        fill="currentColor"
                        viewBox="0 0 24 24"
                    >
                        <path d="M8 5v14l11-7z" />
                    </svg>
                    <span>Stream Live</span>
                </a>
            </motion.div>

            {/* Mobile Menu Toggle */}
            <motion.button
                className="lg:hidden p-2 rounded-lg bg-gray-100 hover:bg-gray-200 transition-colors"
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.6, delay: 0.8, ease: "easeOut" }}
                whileTap={{ scale: 0.95 }}
            >
                <svg 
                    className="w-6 h-6 text-navy" 
                    fill="none" 
                    stroke="currentColor" 
                    viewBox="0 0 24 24"
                >
                    {isMenuOpen ? (
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                    ) : (
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                    )}
                </svg>
            </motion.button>

            {/* Mobile Menu */}
            <AnimatePresence>
                {isMenuOpen && (
                    <motion.div
                        className="lg:hidden fixed top-[64px] left-0 right-0 bg-white shadow-lg border-t border-gray-200 z-50 w-full overflow-x-hidden"
                        style={{ maxHeight: 'calc(100vh - 64px)', overflowY: 'auto' }}
                        initial={{ opacity: 0, y: -20 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -20 }}
                        transition={{ duration: 0.3, ease: "easeOut" }}
                    >
                        <div className="px-4 py-2">
                            {links.map((link, idx) => (
                                <motion.a
                                    key={link.name}
                                    href={link.href}
                                    className={`block text-navy font-semibold text-base px-2 py-3 rounded transition-colors hover:bg-gray-100 ${idx === activeIndex ? 'border-l-4 border-navy bg-gray-50' : ''}`}
                                    onClick={() => {
                                        setIsMenuOpen(false);
                                    }}
                                    initial={{ opacity: 0, x: -20 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    transition={{ 
                                        duration: 0.3, 
                                        delay: idx * 0.05, 
                                        ease: "easeOut" 
                                    }}
                                    whileTap={{ scale: 0.98 }}
                                >
                                    {link.name}
                                </motion.a>
                            ))}
                            
                            {/* Mobile Stream Button */}
                            <motion.div
                                className="px-2 py-3 border-t border-gray-200 mt-2"
                                initial={{ opacity: 0, x: -20 }}
                                animate={{ opacity: 1, x: 0 }}
                                transition={{ 
                                    duration: 0.3, 
                                    delay: links.length * 0.05, 
                                    ease: "easeOut" 
                                }}
                            >
                                <button
                                    className="w-full bg-navy hover:bg-red-700 text-white font-semibold px-4 py-2 rounded-lg shadow-lg transition-all duration-200 flex items-center justify-center gap-2"
                                    onClick={() => {
                                        setIsMenuOpen(false);
                                        window.location.href = '/stream';
                                    }}
                                >
                                    <svg 
                                        className="w-4 h-4" 
                                        fill="currentColor" 
                                        viewBox="0 0 24 24"
                                    >
                                        <path d="M8 5v14l11-7z"/>
                                    </svg>
                                    Stream Live
                                </button>
                            </motion.div>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </motion.nav>
    )
}
