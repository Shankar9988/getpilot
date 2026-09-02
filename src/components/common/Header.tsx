'use client';

import React, { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import {
  ChevronDown,
  ChevronUp,
  MapPin,
  User as UserIcon,
  Crown,
  Heart,
  LayoutDashboard,
  LogOut,
  Menu,
  X,
  Building2,
  Home,
  CheckCircle2,
  Sparkles,
  Phone,
  HelpCircle,
  Calculator
} from 'lucide-react';
import { useAuth } from '@/context/AuthContext';
import { useFavorites } from '@/context/FavoritesContext';

export default function Header() {
  const pathname = usePathname();
  const router = useRouter();
  const { user, logout } = useAuth();
  const { favoriteIds } = useFavorites();

  const [selectedCity, setSelectedCity] = useState('Jaipur');
  const [cityDropdownOpen, setCityDropdownOpen] = useState(false);
  const [primeDropdownOpen, setPrimeDropdownOpen] = useState(false);
  const [loginDropdownOpen, setLoginDropdownOpen] = useState(false);

  // Active Menu Dropdown State
  const [activeMenu, setActiveMenu] = useState<string | null>(null);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const cityRef = useRef<HTMLDivElement>(null);
  const primeRef = useRef<HTMLDivElement>(null);
  const loginRef = useRef<HTMLDivElement>(null);
  const menuRef = useRef<HTMLDivElement>(null);

  const popularCities = [
    { name: 'Jaipur', slug: 'jaipur' },
    { name: 'Mumbai', slug: 'mumbai' },
    { name: 'Delhi NCR', slug: 'delhi-ncr' },
    { name: 'Bengaluru', slug: 'bengaluru' },
    { name: 'Pune', slug: 'pune' },
    { name: 'Hyderabad', slug: 'hyderabad' },
  ];

  // Close dropdowns on outside click
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (cityRef.current && !cityRef.current.contains(e.target as Node)) {
        setCityDropdownOpen(false);
      }
      if (primeRef.current && !primeRef.current.contains(e.target as Node)) {
        setPrimeDropdownOpen(false);
      }
      if (loginRef.current && !loginRef.current.contains(e.target as Node)) {
        setLoginDropdownOpen(false);
      }
      if (menuRef.current && !menuRef.current.contains(e.target as Node)) {
        setActiveMenu(null);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // Close mobile menu on page change
  useEffect(() => {
    setMobileMenuOpen(false);
    setActiveMenu(null);
    setCityDropdownOpen(false);
    setPrimeDropdownOpen(false);
    setLoginDropdownOpen(false);
  }, [pathname]);

  const handleCitySelect = (cityName: string, citySlug: string) => {
    setSelectedCity(cityName);
    setCityDropdownOpen(false);
    router.push(`/buy?city=${citySlug}`);
  };

  return (
    <header className="w-full sticky top-0 z-50 shadow-md">
      {/* 🟣 TOP BAR - PURPLE TO PINK GRADIENT */}
      <div className="bg-gradient-to-r from-[#7c3aed] via-[#a855f7] to-[#c026d3] text-white py-2.5 px-4 sm:px-6 lg:px-8 shadow-sm">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          {/* LEFT: Logo + City Selector */}
          <div className="flex items-center gap-3 sm:gap-6">
            {/* GetPlot Logo */}
            <Link href="/" className="flex items-center gap-2 shrink-0 group">
              <img
                src="/getplot_logo.png"
                alt="GetPlot"
                className="h-8 sm:h-9 w-auto object-contain bg-white/95 px-2.5 py-1 rounded-xl shadow-xs transition-transform group-hover:scale-105"
              />
            </Link>

            {/* City Selector Dropdown */}
            <div ref={cityRef} className="relative">
              <button
                type="button"
                onClick={() => setCityDropdownOpen(!cityDropdownOpen)}
                className="flex items-center gap-1 text-xs sm:text-sm font-bold text-white hover:text-amber-200 transition-colors bg-white/10 hover:bg-white/20 px-3 py-1.5 rounded-xl border border-white/20"
              >
                <MapPin className="w-3.5 h-3.5 text-amber-300" />
                <span>{selectedCity}</span>
                <ChevronDown className={`w-3.5 h-3.5 transition-transform ${cityDropdownOpen ? 'rotate-180' : ''}`} />
              </button>

              {cityDropdownOpen && (
                <div className="absolute top-full left-0 mt-2 w-48 bg-white rounded-2xl shadow-2xl border border-slate-100 p-2 z-50 text-slate-900 animate-in fade-in slide-in-from-top-2 duration-200">
                  <div className="text-[10px] font-extrabold text-slate-400 uppercase px-3 py-1 tracking-wider">
                    Popular Cities
                  </div>
                  {popularCities.map((c) => (
                    <button
                      key={c.slug}
                      type="button"
                      onClick={() => handleCitySelect(c.name, c.slug)}
                      className={`w-full text-left px-3 py-2 rounded-xl text-xs font-bold transition-all flex items-center justify-between ${
                        selectedCity === c.name
                          ? 'bg-red-50 text-[#d8232a]'
                          : 'hover:bg-slate-50 text-slate-700'
                      }`}
                    >
                      <span>{c.name}</span>
                      {selectedCity === c.name && <CheckCircle2 className="w-3.5 h-3.5 text-[#d8232a]" />}
                    </button>
                  ))}
                </div>
              )}
            </div>
          </div>

          {/* RIGHT: Prime + Login + Post Property FREE */}
          <div className="hidden md:flex items-center gap-4 text-xs font-bold">
            {/* GetPlot Prime */}
            <div ref={primeRef} className="relative">
              <Link
                href="/prime"
                className="flex items-center gap-1.5 text-white hover:text-amber-300 transition-colors py-1 bg-amber-400/20 px-2.5 rounded-lg border border-amber-300/30"
              >
                <Crown className="w-3.5 h-3.5 text-amber-300 fill-amber-300" />
                <span>GetPlot Prime</span>
              </Link>
            </div>

            {/* Login / User Dropdown */}
            <div ref={loginRef} className="relative">
              <button
                type="button"
                onClick={() => setLoginDropdownOpen(!loginDropdownOpen)}
                className="flex items-center gap-1.5 text-white hover:text-amber-200 transition-colors py-1"
              >
                <UserIcon className="w-4 h-4" />
                <span className="flex items-center gap-1">
                  {user ? user.name.split(' ')[0] : 'Login'}
                  {(user?.is_prime || user?.prime_plan) && (
                    <span title={`GetPlot Prime (${user.prime_plan || 'Active'})`}>
                      <Crown className="w-3.5 h-3.5 text-amber-300 fill-amber-300" />
                    </span>
                  )}
                </span>
                <ChevronDown className="w-3 h-3 text-white/80" />
              </button>

              {loginDropdownOpen && (
                <div className="absolute top-full right-0 mt-2 w-56 bg-white rounded-2xl shadow-2xl border border-slate-100 p-2 z-50 text-slate-900 animate-in fade-in duration-200">
                  {user ? (
                    <>
                      <div className="px-3 py-2 border-b border-slate-100 mb-1">
                        <div className="flex items-center gap-1.5">
                          <span className="text-xs font-black text-slate-900">{user.name}</span>
                          {(user?.is_prime || user?.prime_plan) && (
                            <span title="Prime Member">
                              <Crown className="w-3.5 h-3.5 text-amber-500 fill-amber-400" />
                            </span>
                          )}
                        </div>
                        <div className="flex items-center justify-between">
                          <span className="block text-[10px] font-bold text-slate-400 uppercase">{user.role}</span>
                          {(user?.is_prime || user?.prime_plan) && (
                            <span className="text-[10px] font-extrabold text-amber-600 bg-amber-50 px-1.5 py-0.5 rounded border border-amber-200">
                              {user.prime_plan || 'Pro'} Prime
                            </span>
                          )}
                        </div>
                      </div>

                      {user.role === 'admin' && (
                        <Link
                          href="/admin"
                          className="flex items-center gap-2.5 px-3 py-2 rounded-xl text-xs font-bold text-slate-700 hover:text-[#d8232a] hover:bg-red-50"
                        >
                          <LayoutDashboard className="w-4 h-4 text-[#d8232a]" />
                          <span>Admin Portal</span>
                        </Link>
                      )}

                      <Link
                        href="/dashboard"
                        className="flex items-center gap-2.5 px-3 py-2 rounded-xl text-xs font-bold text-slate-700 hover:text-[#d8232a] hover:bg-red-50"
                      >
                        <Home className="w-4 h-4 text-slate-500" />
                        <span>My Dashboard</span>
                      </Link>

                      <Link
                        href="/dashboard/favorites"
                        className="flex items-center gap-2.5 px-3 py-2 rounded-xl text-xs font-bold text-slate-700 hover:text-[#d8232a] hover:bg-red-50"
                      >
                        <Heart className="w-4 h-4 text-rose-500" />
                        <span>Shortlisted Properties ({favoriteIds.length})</span>
                      </Link>

                      <button
                        onClick={logout}
                        className="w-full flex items-center gap-2.5 px-3 py-2 rounded-xl text-xs font-bold text-rose-600 hover:bg-rose-50 mt-1 border-t border-slate-100"
                      >
                        <LogOut className="w-4 h-4" />
                        <span>Logout</span>
                      </button>
                    </>
                  ) : (
                    <>
                      <div className="p-3 bg-slate-50 rounded-xl mb-2 text-center">
                        <span className="block text-xs font-extrabold text-slate-900 mb-2">Welcome to GetPlot</span>
                        <Link
                          href="/login"
                          className="block w-full py-2 bg-[#d8232a] hover:bg-red-700 text-white font-bold rounded-xl text-xs shadow-sm transition-colors"
                        >
                          Login / Register
                        </Link>
                      </div>
                      <Link
                        href="/login"
                        className="flex items-center justify-between px-3 py-2 rounded-xl text-xs font-bold text-slate-700 hover:bg-slate-50"
                      >
                        <span>Shortlisted Properties</span>
                        <Heart className="w-3.5 h-3.5 text-rose-500" />
                      </Link>
                    </>
                  )}
                </div>
              )}
            </div>

            {/* Post Property FREE Button */}
            <Link
              href="/post-property"
              className="bg-white hover:bg-slate-100 text-[#d8232a] font-extrabold px-4 py-1.5 rounded-full text-xs shadow-md transition-all flex items-center gap-1.5 active:scale-95"
            >
              <span>Post Property</span>
              <span className="px-1.5 py-0.5 rounded-full bg-amber-400 text-slate-950 text-[10px] font-black tracking-tight uppercase">
                FREE
              </span>
            </Link>
          </div>

          {/* Mobile Hamburger Toggle */}
          <div className="flex items-center gap-2 md:hidden">
            <Link
              href="/post-property"
              className="bg-white text-[#d8232a] font-black px-3 py-1 rounded-full text-[11px] flex items-center gap-1 shadow-xs"
            >
              <span>Post</span>
              <span className="px-1 rounded bg-amber-400 text-slate-950 text-[9px]">FREE</span>
            </Link>
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-1.5 text-white hover:bg-white/10 rounded-lg"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* ⚪ BOTTOM SUB-HEADER MENU BAR (WHITE BACKGROUND) */}
      <div ref={menuRef} className="bg-white border-b border-slate-200 text-slate-800 hidden md:block">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <ul className="flex items-center gap-1 sm:gap-2 text-xs sm:text-sm font-bold">
            {/* BUY DROPDOWN */}
            <li className="relative" onMouseEnter={() => setActiveMenu('buy')} onMouseLeave={() => setActiveMenu(null)}>
              <button
                type="button"
                className={`py-3 px-3 flex items-center gap-1 transition-colors ${
                  activeMenu === 'buy' || pathname === '/buy' ? 'text-[#d8232a] font-extrabold' : 'hover:text-[#d8232a]'
                }`}
              >
                <span>Buy</span>
                <ChevronDown className="w-3.5 h-3.5 opacity-70" />
              </button>

              {activeMenu === 'buy' && (
                <div className="absolute top-full left-0 w-[580px] bg-white rounded-b-2xl shadow-2xl border border-slate-100 p-5 z-50 grid grid-cols-3 gap-6 animate-in fade-in duration-200">
                  <div>
                    <div className="text-xs font-black text-slate-900 uppercase tracking-wider mb-2 border-b pb-1">Popular Choices</div>
                    <ul className="space-y-2 text-xs font-medium text-slate-600">
                      <li><Link href="/buy" className="hover:text-[#d8232a]">Ready to Move</Link></li>
                      <li><Link href="/buy?featured=true" className="hover:text-[#d8232a]">Direct Owner Properties</Link></li>
                      <li><Link href="/buy?sort=relevance" className="hover:text-[#d8232a]">Budget Homes</Link></li>
                      <li><Link href="/buy?sort=newest" className="hover:text-[#d8232a]">Premium Luxury Estates</Link></li>
                    </ul>
                  </div>
                  <div>
                    <div className="text-xs font-black text-slate-900 uppercase tracking-wider mb-2 border-b pb-1">Property Types</div>
                    <ul className="space-y-2 text-xs font-medium text-slate-600">
                      <li><Link href="/buy?type=apartment" className="hover:text-[#d8232a]">Flats / Apartments</Link></li>
                      <li><Link href="/buy?type=independent-house" className="hover:text-[#d8232a]">Independent House</Link></li>
                      <li><Link href="/buy?type=villa" className="hover:text-[#d8232a]">Luxury Villa</Link></li>
                      <li><Link href="/buy?type=residential-plot" className="hover:text-[#d8232a]">Plots & Land</Link></li>
                    </ul>
                  </div>
                  <div>
                    <div className="text-xs font-black text-slate-900 uppercase tracking-wider mb-2 border-b pb-1">Budget Filter</div>
                    <ul className="space-y-2 text-xs font-medium text-slate-600">
                      <li><Link href="/buy" className="hover:text-[#d8232a]">Under ₹ 50 Lac</Link></li>
                      <li><Link href="/buy" className="hover:text-[#d8232a]">₹ 50 Lac - ₹ 1 Cr</Link></li>
                      <li><Link href="/buy" className="hover:text-[#d8232a]">₹ 1 Cr - ₹ 1.5 Cr</Link></li>
                      <li><Link href="/buy" className="hover:text-[#d8232a]">Above ₹ 1.5 Cr</Link></li>
                    </ul>
                  </div>
                </div>
              )}
            </li>

            {/* RENT DROPDOWN */}
            <li className="relative" onMouseEnter={() => setActiveMenu('rent')} onMouseLeave={() => setActiveMenu(null)}>
              <button
                type="button"
                className={`py-3 px-3 flex items-center gap-1 transition-colors ${
                  activeMenu === 'rent' || pathname === '/rent' ? 'text-[#d8232a] font-extrabold' : 'hover:text-[#d8232a]'
                }`}
              >
                <span>Rent</span>
                <ChevronDown className="w-3.5 h-3.5 opacity-70" />
              </button>

              {activeMenu === 'rent' && (
                <div className="absolute top-full left-0 w-[420px] bg-white rounded-b-2xl shadow-2xl border border-slate-100 p-5 z-50 grid grid-cols-2 gap-6 animate-in fade-in duration-200">
                  <div>
                    <div className="text-xs font-black text-slate-900 uppercase tracking-wider mb-2 border-b pb-1">Popular Choices</div>
                    <ul className="space-y-2 text-xs font-medium text-slate-600">
                      <li><Link href="/rent" className="hover:text-[#d8232a]">100% Verified Properties</Link></li>
                      <li><Link href="/rent" className="hover:text-[#d8232a]">Furnished Residences</Link></li>
                      <li><Link href="/rent" className="hover:text-[#d8232a]">Bachelor Friendly Homes</Link></li>
                      <li><Link href="/rent" className="hover:text-[#d8232a]">Immediately Available</Link></li>
                    </ul>
                  </div>
                  <div>
                    <div className="text-xs font-black text-slate-900 uppercase tracking-wider mb-2 border-b pb-1">Property Types</div>
                    <ul className="space-y-2 text-xs font-medium text-slate-600">
                      <li><Link href="/rent?type=apartment" className="hover:text-[#d8232a]">Flats for Rent</Link></li>
                      <li><Link href="/rent?type=independent-house" className="hover:text-[#d8232a]">House for Rent</Link></li>
                      <li><Link href="/rent?type=villa" className="hover:text-[#d8232a]">Villa for Rent</Link></li>
                      <li><Link href="/rent" className="hover:text-[#d8232a]">PG & Hostels</Link></li>
                    </ul>
                  </div>
                </div>
              )}
            </li>

            {/* SELL DROPDOWN */}
            <li className="relative" onMouseEnter={() => setActiveMenu('sell')} onMouseLeave={() => setActiveMenu(null)}>
              <button
                type="button"
                className={`py-3 px-3 flex items-center gap-1 transition-colors ${
                  activeMenu === 'sell' ? 'text-[#d8232a] font-extrabold' : 'hover:text-[#d8232a]'
                }`}
              >
                <span>Sell</span>
                <ChevronDown className="w-3.5 h-3.5 opacity-70" />
              </button>

              {activeMenu === 'sell' && (
                <div className="absolute top-full left-0 w-56 bg-white rounded-b-2xl shadow-2xl border border-slate-100 p-3 z-50 animate-in fade-in duration-200 space-y-1">
                  <Link href="/post-property" className="block px-3 py-2 rounded-xl text-xs font-bold text-slate-700 hover:text-[#d8232a] hover:bg-red-50">
                    Post Property FREE
                  </Link>
                  <Link href="/dashboard" className="block px-3 py-2 rounded-xl text-xs font-bold text-slate-700 hover:text-[#d8232a] hover:bg-red-50">
                    Seller Dashboard
                  </Link>
                  <Link href="/" className="block px-3 py-2 rounded-xl text-xs font-bold text-slate-700 hover:text-[#d8232a] hover:bg-red-50">
                    PropWorth AI Valuation
                  </Link>
                </div>
              )}
            </li>

            {/* HOME LOANS */}
            <li className="relative" onMouseEnter={() => setActiveMenu('loans')} onMouseLeave={() => setActiveMenu(null)}>
              <button
                type="button"
                className={`py-3 px-3 flex items-center gap-1 transition-colors ${
                  activeMenu === 'loans' ? 'text-[#d8232a] font-extrabold' : 'hover:text-[#d8232a]'
                }`}
              >
                <span>Home Loans</span>
                <ChevronDown className="w-3.5 h-3.5 opacity-70" />
              </button>

              {activeMenu === 'loans' && (
                <div className="absolute top-full left-0 w-60 bg-white rounded-b-2xl shadow-2xl border border-slate-100 p-3 z-50 animate-in fade-in duration-200 space-y-1">
                  <div className="px-3 py-1.5 bg-emerald-50 text-emerald-800 rounded-lg text-[11px] font-bold mb-2">
                    Home Loans Starting at 8.35% p.a.
                  </div>
                  <Link href="/about" className="block px-3 py-2 rounded-xl text-xs font-bold text-slate-700 hover:text-[#d8232a] hover:bg-red-50">
                    EMI Calculator
                  </Link>
                  <Link href="/about" className="block px-3 py-2 rounded-xl text-xs font-bold text-slate-700 hover:text-[#d8232a] hover:bg-red-50">
                    Check Loan Eligibility
                  </Link>
                </div>
              )}
            </li>

            {/* HOME INTERIORS */}
            <li>
              <Link
                href="/commercial"
                className="py-3 px-3 flex items-center gap-1 hover:text-[#d8232a] transition-colors"
              >
                <span>Commercial</span>
              </Link>
            </li>

            {/* GETPLOT ADVICE (WITH NEW BADGE) */}
            <li className="relative" onMouseEnter={() => setActiveMenu('advice')} onMouseLeave={() => setActiveMenu(null)}>
              <button
                type="button"
                className={`py-3 px-3 flex items-center gap-1.5 transition-colors ${
                  activeMenu === 'advice' ? 'text-[#d8232a] font-extrabold' : 'hover:text-[#d8232a]'
                }`}
              >
                <span>GetPlot Advice</span>
                <span className="px-1 py-0.2 rounded bg-amber-400 text-slate-950 text-[9px] font-black uppercase">
                  NEW
                </span>
                <ChevronDown className="w-3.5 h-3.5 opacity-70" />
              </button>

              {activeMenu === 'advice' && (
                <div className="absolute top-full left-0 w-56 bg-white rounded-b-2xl shadow-2xl border border-slate-100 p-3 z-50 animate-in fade-in duration-200 space-y-1">
                  <Link href="/blog" className="block px-3 py-2 rounded-xl text-xs font-bold text-slate-700 hover:text-[#d8232a] hover:bg-red-50">
                    Rates & Market Trends
                  </Link>
                  <Link href="/blog" className="block px-3 py-2 rounded-xl text-xs font-bold text-slate-700 hover:text-[#d8232a] hover:bg-red-50">
                    Property Buying Guide
                  </Link>
                  <Link href="/faq" className="block px-3 py-2 rounded-xl text-xs font-bold text-slate-700 hover:text-[#d8232a] hover:bg-red-50">
                    Land Area Converter
                  </Link>
                </div>
              )}
            </li>

            {/* HELP */}
            <li className="relative" onMouseEnter={() => setActiveMenu('help')} onMouseLeave={() => setActiveMenu(null)}>
              <button
                type="button"
                className={`py-3 px-3 flex items-center gap-1 transition-colors ${
                  activeMenu === 'help' ? 'text-[#d8232a] font-extrabold' : 'hover:text-[#d8232a]'
                }`}
              >
                <span>Help</span>
                <ChevronDown className="w-3.5 h-3.5 opacity-70" />
              </button>

              {activeMenu === 'help' && (
                <div className="absolute top-full left-0 w-52 bg-white rounded-b-2xl shadow-2xl border border-slate-100 p-3 z-50 animate-in fade-in duration-200 space-y-1">
                  <Link href="/contact" className="block px-3 py-2 rounded-xl text-xs font-bold text-slate-700 hover:text-[#d8232a] hover:bg-red-50">
                    Contact Us
                  </Link>
                  <Link href="/faq" className="block px-3 py-2 rounded-xl text-xs font-bold text-slate-700 hover:text-[#d8232a] hover:bg-red-50">
                    FAQs & Support
                  </Link>
                  <Link href="/terms" className="block px-3 py-2 rounded-xl text-xs font-bold text-slate-700 hover:text-[#d8232a] hover:bg-red-50">
                    Terms & Conditions
                  </Link>
                  <Link href="/privacy-policy" className="block px-3 py-2 rounded-xl text-xs font-bold text-slate-700 hover:text-[#d8232a] hover:bg-red-50">
                    Privacy Policy
                  </Link>
                </div>
              )}
            </li>
          </ul>
        </div>
      </div>

      {/* 📱 MOBILE NAVIGATION DRAWER */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-white border-b border-slate-200 p-4 space-y-3 animate-in slide-in-from-top duration-200 text-slate-900">
          <div className="flex items-center justify-between pb-3 border-b border-slate-100">
            <div className="flex items-center gap-2">
              <MapPin className="w-4 h-4 text-[#d8232a]" />
              <select
                value={selectedCity}
                onChange={(e) => setSelectedCity(e.target.value)}
                className="font-bold text-xs bg-slate-100 px-2 py-1 rounded-lg border-none"
              >
                {popularCities.map((c) => (
                  <option key={c.slug} value={c.name}>{c.name}</option>
                ))}
              </select>
            </div>
            {user ? (
              <span className="text-xs font-extrabold text-[#d8232a]">Hi, {user.name.split(' ')[0]}</span>
            ) : (
              <Link href="/login" className="text-xs font-bold text-[#d8232a] underline">Login / Sign Up</Link>
            )}
          </div>

          <div className="grid grid-cols-2 gap-2 text-xs font-bold pt-1">
            <Link href="/buy" className="p-3 bg-slate-50 rounded-xl text-slate-800 hover:bg-red-50 hover:text-[#d8232a] text-center">
              Buy Properties
            </Link>
            <Link href="/rent" className="p-3 bg-slate-50 rounded-xl text-slate-800 hover:bg-red-50 hover:text-[#d8232a] text-center">
              Rent Properties
            </Link>
            <Link href="/commercial" className="p-3 bg-slate-50 rounded-xl text-slate-800 hover:bg-red-50 hover:text-[#d8232a] text-center">
              Commercial
            </Link>
            <Link href="/post-property" className="p-3 bg-red-50 text-[#d8232a] rounded-xl text-center font-extrabold">
              Post Property FREE
            </Link>
          </div>
        </div>
      )}
    </header>
  );
}
