'use client';

import React, { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import {
  Building2,
  Heart,
  User as UserIcon,
  Menu,
  X,
  ChevronDown,
  ChevronUp,
  LayoutDashboard,
  Home,
  MessageSquareText,
  ShieldCheck,
  LogOut,
  ArrowRight
} from 'lucide-react';
import { useAuth } from '@/context/AuthContext';
import { useFavorites } from '@/context/FavoritesContext';

export default function Header() {
  const pathname = usePathname();
  const { user, logout } = useAuth();
  const { favoriteIds } = useFavorites();

  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [userDropdownOpen, setUserDropdownOpen] = useState(false);

  // Dropdown states for Desktop
  const [propertiesOpen, setPropertiesOpen] = useState(false);
  const [pagesOpen, setPagesOpen] = useState(false);

  // Accordion states for Mobile
  const [mobilePropertiesOpen, setMobilePropertiesOpen] = useState(false);
  const [mobilePagesOpen, setMobilePagesOpen] = useState(false);

  const propertiesRef = useRef<HTMLDivElement>(null);
  const pagesRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 15) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    setMobileMenuOpen(false);
    setUserDropdownOpen(false);
    setPropertiesOpen(false);
    setPagesOpen(false);
  }, [pathname]);

  // Click outside to close dropdowns
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (propertiesRef.current && !propertiesRef.current.contains(e.target as Node)) {
        setPropertiesOpen(false);
      }
      if (pagesRef.current && !pagesRef.current.contains(e.target as Node)) {
        setPagesOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const propertyDropdownItems = [
    { label: 'All Properties', href: '/buy' },
    { label: 'Featured Properties', href: '/buy?featured=true' },
    { label: 'Most Viewed Properties', href: '/buy?sort=relevance' },
    { label: 'Most Favourite Properties', href: '/buy?sort=newest' },
    { label: 'Properties Nearby City', href: '/buy?city=jaipur' },
  ];

  const pageDropdownItems = [
    { label: 'Subscription Plan', href: '/about' },
    { label: 'Articles', href: '/blog' },
    { label: 'FAQs', href: '/faq' },
    { label: 'Area Converter', href: '/post-property' },
    { label: 'Terms & Conditions', href: '/terms' },
    { label: 'Privacy Policy', href: '/privacy-policy' },
  ];

  const isActive = (href: string) => {
    if (href === '/') return pathname === '/';
    return pathname.startsWith(href);
  };

  return (
    <>
      <header
        className={`sticky top-0 z-50 w-full transition-all duration-300 ${
          isScrolled
            ? 'bg-white/95 backdrop-blur-md border-b border-slate-100 shadow-sm'
            : 'bg-white/90 backdrop-blur-sm border-b border-slate-100/60'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-20">
            {/* LEFT: Brand Logo */}
            <Link href="/" className="flex items-center gap-3 group shrink-0">
              <img
                src="/getplot_logo.png"
                alt="GetPlot - Find Compare Own"
                className="h-10 sm:h-12 w-auto object-contain transition-transform duration-300 group-hover:scale-105"
              />
            </Link>

            {/* CENTER: Navigation Links (Only Home, Properties dropdown, Pages dropdown, About Us) */}
            <nav className="hidden lg:flex items-center gap-1 xl:gap-2">
              {/* Home Link */}
              <Link
                href="/"
                className={`relative px-3.5 py-2 rounded-xl text-xs xl:text-sm font-bold transition-all ${
                  isActive('/')
                    ? 'text-indigo-600 font-extrabold'
                    : 'text-slate-600 hover:text-slate-900 hover:bg-slate-50'
                }`}
              >
                <span>Home</span>
                {isActive('/') && (
                  <span className="absolute bottom-0 inset-x-3.5 h-0.5 bg-indigo-600 rounded-full" />
                )}
              </Link>

              {/* 1. PROPERTIES DROPDOWN */}
              <div
                ref={propertiesRef}
                className="relative"
                onMouseEnter={() => setPropertiesOpen(true)}
                onMouseLeave={() => setPropertiesOpen(false)}
              >
                <button
                  type="button"
                  onClick={() => setPropertiesOpen(!propertiesOpen)}
                  className={`px-3.5 py-2 rounded-xl text-xs xl:text-sm font-bold flex items-center gap-1 transition-all ${
                    propertiesOpen || pathname.startsWith('/buy')
                      ? 'text-indigo-600 font-extrabold bg-indigo-50/50'
                      : 'text-slate-600 hover:text-slate-900 hover:bg-slate-50'
                  }`}
                >
                  <span>Properties</span>
                  {propertiesOpen ? (
                    <ChevronUp className="w-3.5 h-3.5 text-indigo-600 transition-transform" />
                  ) : (
                    <ChevronDown className="w-3.5 h-3.5 text-slate-400 transition-transform" />
                  )}
                </button>

                {/* Dropdown Menu Container */}
                {propertiesOpen && (
                  <div className="absolute top-full left-0 mt-1.5 w-64 rounded-2xl bg-white text-slate-900 shadow-2xl border border-slate-100 p-2 z-50 animate-in fade-in slide-in-from-top-2 duration-200">
                    <div className="space-y-1">
                      {propertyDropdownItems.map((item) => (
                        <Link
                          key={item.label}
                          href={item.href}
                          onClick={() => setPropertiesOpen(false)}
                          className="flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-xs font-bold text-slate-700 hover:text-indigo-600 hover:bg-indigo-50/60 transition-all group"
                        >
                          {/* Small light-gray circular bullet icon */}
                          <span className="w-1.5 h-1.5 rounded-full bg-slate-300 group-hover:bg-indigo-600 transition-colors shrink-0" />
                          <span>{item.label}</span>
                        </Link>
                      ))}
                    </div>
                  </div>
                )}
              </div>

              {/* 2. PAGES DROPDOWN */}
              <div
                ref={pagesRef}
                className="relative"
                onMouseEnter={() => setPagesOpen(true)}
                onMouseLeave={() => setPagesOpen(false)}
              >
                <button
                  type="button"
                  onClick={() => setPagesOpen(!pagesOpen)}
                  className={`px-3.5 py-2 rounded-xl text-xs xl:text-sm font-bold flex items-center gap-1 transition-all ${
                    pagesOpen
                      ? 'text-indigo-600 font-extrabold bg-indigo-50/50'
                      : 'text-slate-600 hover:text-slate-900 hover:bg-slate-50'
                  }`}
                >
                  <span>Pages</span>
                  {pagesOpen ? (
                    <ChevronUp className="w-3.5 h-3.5 text-indigo-600 transition-transform" />
                  ) : (
                    <ChevronDown className="w-3.5 h-3.5 text-slate-400 transition-transform" />
                  )}
                </button>

                {/* Dropdown Menu Container */}
                {pagesOpen && (
                  <div className="absolute top-full left-0 mt-1.5 w-60 rounded-2xl bg-white text-slate-900 shadow-2xl border border-slate-100 p-2 z-50 animate-in fade-in slide-in-from-top-2 duration-200">
                    <div className="space-y-1">
                      {pageDropdownItems.map((item) => (
                        <Link
                          key={item.label}
                          href={item.href}
                          onClick={() => setPagesOpen(false)}
                          className="flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-xs font-bold text-slate-700 hover:text-indigo-600 hover:bg-indigo-50/60 transition-all group"
                        >
                          {/* Small light-gray circular bullet icon */}
                          <span className="w-1.5 h-1.5 rounded-full bg-slate-300 group-hover:bg-indigo-600 transition-colors shrink-0" />
                          <span>{item.label}</span>
                        </Link>
                      ))}
                    </div>
                  </div>
                )}
              </div>

              {/* About Us Link */}
              <Link
                href="/about"
                className={`relative px-3.5 py-2 rounded-xl text-xs xl:text-sm font-bold transition-all ${
                  isActive('/about')
                    ? 'text-indigo-600 font-extrabold'
                    : 'text-slate-600 hover:text-slate-900 hover:bg-slate-50'
                }`}
              >
                <span>About Us</span>
                {isActive('/about') && (
                  <span className="absolute bottom-0 inset-x-3.5 h-0.5 bg-indigo-600 rounded-full" />
                )}
              </Link>

              {/* Contact Us Link */}
              <Link
                href="/contact"
                className={`relative px-3.5 py-2 rounded-xl text-xs xl:text-sm font-bold transition-all ${
                  isActive('/contact')
                    ? 'text-indigo-600 font-extrabold'
                    : 'text-slate-600 hover:text-slate-900 hover:bg-slate-50'
                }`}
              >
                <span>Contact Us</span>
                {isActive('/contact') && (
                  <span className="absolute bottom-0 inset-x-3.5 h-0.5 bg-indigo-600 rounded-full" />
                )}
              </Link>
            </nav>

            {/* RIGHT: Favorites Heart, Login Button, and Post Property CTA */}
            <div className="hidden sm:flex items-center gap-3">
              {/* Favorites Heart Icon */}
              <Link
                href={user ? '/dashboard/favorites' : '/login'}
                className="relative w-10 h-10 rounded-full border border-slate-200 hover:border-indigo-300 text-slate-600 hover:text-indigo-600 hover:bg-indigo-50/50 flex items-center justify-center transition-all"
                title="Saved Favorites"
              >
                <Heart className="w-4 h-4" />
                {favoriteIds.length > 0 && (
                  <span className="absolute -top-1 -right-1 w-4 h-4 rounded-full bg-indigo-600 text-white text-[9px] font-black flex items-center justify-center shadow-xs">
                    {favoriteIds.length}
                  </span>
                )}
              </Link>

              {/* Login Button (when not logged in) */}
              {!user && (
                <Link
                  href="/login"
                  className="px-4 py-2.5 rounded-xl text-xs sm:text-sm font-extrabold text-slate-700 hover:text-indigo-600 hover:bg-slate-50 transition-all flex items-center gap-1.5 border border-transparent hover:border-slate-200"
                >
                  <UserIcon className="w-4 h-4 text-slate-400" />
                  <span>Login</span>
                </Link>
              )}

              {/* User Dropdown if Authenticated */}
              {user ? (
                <div className="relative">
                  <button
                    type="button"
                    onClick={() => setUserDropdownOpen(!userDropdownOpen)}
                    onBlur={() => setTimeout(() => setUserDropdownOpen(false), 200)}
                    className="flex items-center gap-2 p-1.5 pr-3 rounded-full border border-slate-200 bg-white hover:bg-slate-50 text-slate-800 transition-all"
                  >
                    <div className="w-7 h-7 rounded-full bg-indigo-600 text-white font-bold flex items-center justify-center text-xs shadow-xs">
                      {user.name.charAt(0).toUpperCase()}
                    </div>
                    <span className="text-xs font-bold truncate max-w-[90px]">{user.name.split(' ')[0]}</span>
                    <ChevronDown className="w-3.5 h-3.5 opacity-60" />
                  </button>

                  {userDropdownOpen && (
                    <div className="absolute right-0 top-full mt-2 w-60 rounded-2xl bg-white text-slate-900 shadow-2xl border border-slate-100 p-2 z-50 animate-in fade-in slide-in-from-top-2 duration-200">
                      <div className="px-3.5 py-2.5 border-b border-slate-100 mb-1">
                        <p className="text-xs font-bold text-slate-900">{user.name}</p>
                        <p className="text-[11px] text-slate-400 truncate">{user.email}</p>
                      </div>

                      <Link
                        href="/dashboard"
                        className="flex items-center gap-2.5 px-3 py-2 rounded-xl text-xs font-bold text-slate-700 hover:text-indigo-600 hover:bg-indigo-50 transition-colors"
                      >
                        <LayoutDashboard className="w-4 h-4 text-indigo-600" />
                        <span>Dashboard</span>
                      </Link>

                      <Link
                        href="/dashboard/properties"
                        className="flex items-center gap-2.5 px-3 py-2 rounded-xl text-xs font-bold text-slate-700 hover:text-indigo-600 hover:bg-indigo-50 transition-colors"
                      >
                        <Home className="w-4 h-4 text-slate-400" />
                        <span>My Properties</span>
                      </Link>

                      <Link
                        href="/dashboard/inquiries"
                        className="flex items-center gap-2.5 px-3 py-2 rounded-xl text-xs font-bold text-slate-700 hover:text-indigo-600 hover:bg-indigo-50 transition-colors"
                      >
                        <MessageSquareText className="w-4 h-4 text-slate-400" />
                        <span>Leads & Inquiries</span>
                      </Link>

                      {user.role === 'admin' && (
                        <Link
                          href="/admin"
                          className="flex items-center gap-2.5 px-3 py-2 rounded-xl text-xs font-bold text-indigo-700 bg-indigo-50 hover:bg-indigo-100 transition-colors mt-1"
                        >
                          <ShieldCheck className="w-4 h-4 text-indigo-600" />
                          <span>Admin Portal</span>
                        </Link>
                      )}

                      <button
                        type="button"
                        onClick={logout}
                        className="w-full flex items-center gap-2.5 px-3 py-2 rounded-xl text-xs font-bold text-rose-600 hover:bg-rose-50 transition-colors mt-1"
                      >
                        <LogOut className="w-4 h-4" />
                        <span>Logout</span>
                      </button>
                    </div>
                  )}
                </div>
              ) : null}

              {/* Reference Dark Navy "Get Started" / "Post Property" CTA */}
              <Link
                href="/post-property"
                className="btn-dark-navy px-6 py-2.5 rounded-xl text-xs sm:text-sm font-bold shadow-md active:scale-95 transition-all inline-flex items-center gap-2"
              >
                <span>Get Started</span>
              </Link>
            </div>

            {/* Mobile Header Trigger */}
            <div className="flex lg:hidden items-center gap-2">
              <Link
                href={user ? '/dashboard/favorites' : '/login'}
                className="p-2 rounded-xl text-slate-700 hover:bg-slate-100"
              >
                <Heart className="w-5 h-5" />
              </Link>

              <button
                type="button"
                onClick={() => setMobileMenuOpen(true)}
                className="p-2 rounded-xl text-slate-800 hover:bg-slate-100"
                aria-label="Open Navigation Menu"
              >
                <Menu className="w-6 h-6" />
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* MOBILE SLIDE-OUT DRAWER MENU */}
      {mobileMenuOpen && (
        <div className="fixed inset-0 z-50 lg:hidden flex">
          <div
            onClick={() => setMobileMenuOpen(false)}
            className="fixed inset-0 bg-slate-950/60 backdrop-blur-xs animate-in fade-in duration-200"
          />

          <div className="relative ml-auto w-full max-w-xs bg-white text-slate-900 h-full shadow-2xl flex flex-col justify-between p-6 z-10 animate-in slide-in-from-right duration-300 overflow-y-auto">
            <div className="space-y-6">
              <div className="flex items-center justify-between border-b border-slate-100 pb-4">
                <Link href="/" className="flex items-center gap-2.5">
                  <div className="w-8 h-8 rounded-xl bg-indigo-50 border border-indigo-100 text-indigo-600 flex items-center justify-center">
                    <Building2 className="w-4 h-4" />
                  </div>
                  <span className="text-lg font-black tracking-tight text-slate-900">
                    Nestoria<span className="text-indigo-600">.</span>
                  </span>
                </Link>
                <button
                  type="button"
                  onClick={() => setMobileMenuOpen(false)}
                  className="p-2 rounded-xl text-slate-400 hover:text-slate-700 hover:bg-slate-100"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* Mobile Navigation List */}
              <nav className="space-y-1">
                <Link
                  href="/"
                  className={`flex items-center justify-between px-4 py-3 rounded-xl text-sm font-bold transition-colors ${
                    isActive('/') ? 'bg-indigo-50 text-indigo-600' : 'text-slate-700 hover:bg-slate-50'
                  }`}
                >
                  <span>Home</span>
                  <ArrowRight className="w-4 h-4 opacity-40" />
                </Link>

                {/* Mobile Properties Accordion */}
                <div className="space-y-1">
                  <button
                    type="button"
                    onClick={() => setMobilePropertiesOpen(!mobilePropertiesOpen)}
                    className="w-full flex items-center justify-between px-4 py-3 rounded-xl text-sm font-bold text-slate-700 hover:bg-slate-50"
                  >
                    <span>Properties</span>
                    {mobilePropertiesOpen ? (
                      <ChevronUp className="w-4 h-4 text-indigo-600" />
                    ) : (
                      <ChevronDown className="w-4 h-4 text-slate-400" />
                    )}
                  </button>

                  {mobilePropertiesOpen && (
                    <div className="pl-4 pr-2 py-1 space-y-1 bg-slate-50/70 rounded-xl">
                      {propertyDropdownItems.map((item) => (
                        <Link
                          key={item.label}
                          href={item.href}
                          className="flex items-center gap-2.5 px-3 py-2 text-xs font-bold text-slate-600 hover:text-indigo-600"
                        >
                          <span className="w-1.5 h-1.5 rounded-full bg-slate-300" />
                          <span>{item.label}</span>
                        </Link>
                      ))}
                    </div>
                  )}
                </div>

                {/* Mobile Pages Accordion */}
                <div className="space-y-1">
                  <button
                    type="button"
                    onClick={() => setMobilePagesOpen(!mobilePagesOpen)}
                    className="w-full flex items-center justify-between px-4 py-3 rounded-xl text-sm font-bold text-slate-700 hover:bg-slate-50"
                  >
                    <span>Pages</span>
                    {mobilePagesOpen ? (
                      <ChevronUp className="w-4 h-4 text-indigo-600" />
                    ) : (
                      <ChevronDown className="w-4 h-4 text-slate-400" />
                    )}
                  </button>

                  {mobilePagesOpen && (
                    <div className="pl-4 pr-2 py-1 space-y-1 bg-slate-50/70 rounded-xl">
                      {pageDropdownItems.map((item) => (
                        <Link
                          key={item.label}
                          href={item.href}
                          className="flex items-center gap-2.5 px-3 py-2 text-xs font-bold text-slate-600 hover:text-indigo-600"
                        >
                          <span className="w-1.5 h-1.5 rounded-full bg-slate-300" />
                          <span>{item.label}</span>
                        </Link>
                      ))}
                    </div>
                  )}
                </div>

                <Link
                  href="/about"
                  className={`flex items-center justify-between px-4 py-3 rounded-xl text-sm font-bold transition-colors ${
                    isActive('/about') ? 'bg-indigo-50 text-indigo-600' : 'text-slate-700 hover:bg-slate-50'
                  }`}
                >
                  <span>About Us</span>
                  <ArrowRight className="w-4 h-4 opacity-40" />
                </Link>

                <Link
                  href="/contact"
                  className={`flex items-center justify-between px-4 py-3 rounded-xl text-sm font-bold transition-colors ${
                    isActive('/contact') ? 'bg-indigo-50 text-indigo-600' : 'text-slate-700 hover:bg-slate-50'
                  }`}
                >
                  <span>Contact Us</span>
                  <ArrowRight className="w-4 h-4 opacity-40" />
                </Link>
              </nav>
            </div>

            {/* Bottom Actions in Drawer */}
            <div className="space-y-3 pt-6 border-t border-slate-100">
              <Link
                href="/post-property"
                className="btn-dark-navy w-full flex items-center justify-center gap-2 py-3 rounded-xl text-xs font-bold text-center shadow-md"
              >
                <span>Get Started / Post Listing</span>
              </Link>

              {!user && (
                <Link
                  href="/login"
                  className="w-full flex items-center justify-center py-2.5 rounded-xl border border-slate-200 text-slate-800 text-xs font-bold hover:bg-slate-50"
                >
                  Login / Register
                </Link>
              )}
            </div>
          </div>
        </div>
      )}
    </>
  );
}
