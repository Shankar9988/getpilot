'use client';

import React, { useState } from 'react';
import Link from 'next/link';

export default function Footer() {
  const [expandedAbout, setExpandedAbout] = useState(false);
  const [expandedDisclaimer, setExpandedDisclaimer] = useState(false);

  return (
    <footer className="w-full bg-[#f4f4f4] text-slate-700 text-xs font-sans border-t border-slate-300">
      {/* Top Main Section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-12">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12">
          {/* Left Column: About GetPlot */}
          <div className="lg:col-span-6 space-y-4">
            <h3 className="text-sm font-black text-slate-900 tracking-tight">
              About GetPlot
            </h3>
            <p className="text-slate-600 leading-relaxed font-normal">
              As the largest platform connecting property buyers and sellers, GetPlot boasts over 2 crore monthly visitors and 15 lakh active property listings. With extensive real estate experience, GetPlot has evolved into a comprehensive service provider, offering verified residential homes, plots, commercial workspaces, home loans, interiors, and expert advice.
            </p>
            <p className="text-slate-600 leading-relaxed font-normal">
              GetPlot also offers extensive research-based knowledge and insight-driven platforms along with proprietary tools providing home buyers with price trends, forecasts, and locality reviews.{' '}
              {!expandedAbout && (
                <button
                  type="button"
                  onClick={() => setExpandedAbout(true)}
                  className="text-slate-900 font-bold hover:underline cursor-pointer inline-block"
                >
                  Read more
                </button>
              )}
              {expandedAbout && (
                <span>
                  {' '}GetPlot Realty Services is dedicated to transparent transactions, 100% verified legal registries, direct buyer-owner communication, and end-to-end assistance.
                </span>
              )}
            </p>



            {/* Social Media Icons (Google Play & App Store buttons REMOVED per user request) */}
            <div className="pt-3 flex items-center gap-3">
              {/* Facebook */}
              <a
                href="#"
                aria-label="Facebook"
                className="w-8 h-8 rounded-full bg-[#3b5998] text-white flex items-center justify-center shadow-xs hover:opacity-90 transition-opacity"
              >
                <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                  <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
                </svg>
              </a>
              {/* X / Twitter */}
              <a
                href="#"
                aria-label="Twitter"
                className="w-8 h-8 rounded-full bg-black text-white flex items-center justify-center shadow-xs hover:opacity-90 transition-opacity"
              >
                <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                  <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
                </svg>
              </a>
              {/* LinkedIn */}
              <a
                href="#"
                aria-label="LinkedIn"
                className="w-8 h-8 rounded-full bg-[#0077b5] text-white flex items-center justify-center shadow-xs hover:opacity-90 transition-opacity"
              >
                <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                  <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.762-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" />
                </svg>
              </a>
              {/* YouTube */}
              <a
                href="#"
                aria-label="YouTube"
                className="w-8 h-8 rounded-full bg-[#ff0000] text-white flex items-center justify-center shadow-xs hover:opacity-90 transition-opacity"
              >
                <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                  <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
                </svg>
              </a>
              {/* Instagram */}
              <a
                href="#"
                aria-label="Instagram"
                className="w-8 h-8 rounded-full bg-gradient-to-tr from-amber-500 via-rose-500 to-purple-600 text-white flex items-center justify-center shadow-xs hover:opacity-90 transition-opacity"
              >
                <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                  <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
                </svg>
              </a>
            </div>
          </div>

          {/* Right Column: Links */}
          <div className="lg:col-span-6 space-y-6">
            {/* Properties in India */}
            <div className="space-y-2">
              <h4 className="text-xs font-black text-slate-900">
                Properties in India
              </h4>
              <p className="text-slate-600 leading-relaxed text-[11px] font-normal">
                <Link href="/buy?city=jaipur" className="hover:text-slate-900">Property in Jaipur</Link>{' '}
                <span className="text-slate-300 mx-1">|</span>{' '}
                <Link href="/buy?city=delhi-ncr" className="hover:text-slate-900">Property in New Delhi</Link>{' '}
                <span className="text-slate-300 mx-1">|</span>{' '}
                <Link href="/buy?city=mumbai" className="hover:text-slate-900">Property in Mumbai</Link>{' '}
                <span className="text-slate-300 mx-1">|</span>{' '}
                <Link href="/buy?city=pune" className="hover:text-slate-900">Property in Pune</Link>{' '}
                <span className="text-slate-300 mx-1">|</span>{' '}
                <Link href="/buy?city=bengaluru" className="hover:text-slate-900">Property in Bangalore</Link>{' '}
                <span className="text-slate-300 mx-1">|</span>{' '}
                <Link href="/buy?city=hyderabad" className="hover:text-slate-900">Property in Hyderabad</Link>{' '}
                <span className="text-slate-300 mx-1">|</span>{' '}
                <Link href="/buy?city=delhi-ncr" className="hover:text-slate-900">Property in Gurgaon</Link>{' '}
                <span className="text-slate-300 mx-1">|</span>{' '}
                <Link href="/buy?city=delhi-ncr" className="hover:text-slate-900">Property in Noida</Link>
              </p>
            </div>

            {/* New Projects in India */}
            <div className="space-y-2">
              <h4 className="text-xs font-black text-slate-900">
                New Projects in India
              </h4>
              <p className="text-slate-600 leading-relaxed text-[11px] font-normal">
                <Link href="/buy" className="hover:text-slate-900">New Projects in Jaipur</Link>{' '}
                <span className="text-slate-300 mx-1">|</span>{' '}
                <Link href="/buy" className="hover:text-slate-900">New Projects in New Delhi</Link>{' '}
                <span className="text-slate-300 mx-1">|</span>{' '}
                <Link href="/buy" className="hover:text-slate-900">New Projects in Mumbai</Link>{' '}
                <span className="text-slate-300 mx-1">|</span>{' '}
                <Link href="/buy" className="hover:text-slate-900">New Projects in Pune</Link>{' '}
                <span className="text-slate-300 mx-1">|</span>{' '}
                <Link href="/buy" className="hover:text-slate-900">New Projects in Bangalore</Link>{' '}
                <span className="text-slate-300 mx-1">|</span>{' '}
                <Link href="/buy" className="hover:text-slate-900">New Projects in Hyderabad</Link>{' '}
                <span className="text-slate-300 mx-1">|</span>{' '}
                <Link href="/buy" className="hover:text-slate-900">New Projects in Gurgaon</Link>
              </p>
            </div>

            {/* Property Services */}
            <div className="space-y-2">
              <h4 className="text-xs font-black text-slate-900">
                Property Services
              </h4>
              <p className="text-slate-600 leading-relaxed text-[11px] font-normal">
                <Link href="/contact" className="hover:text-slate-900">Home Loan</Link>{' '}
                <span className="text-slate-300 mx-1">|</span>{' '}
                <Link href="/contact" className="hover:text-slate-900">Home Interior</Link>{' '}
                <span className="text-slate-300 mx-1">|</span>{' '}
                <Link href="/contact" className="hover:text-slate-900">Legal Title Verification</Link>{' '}
                <span className="text-slate-300 mx-1">|</span>{' '}
                <Link href="/contact" className="hover:text-slate-900">Property Valuation</Link>
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Sub-Footer Quick Links Bar */}
      <div className="bg-[#e9e9e9] border-t border-slate-300 py-3.5 px-4 text-center text-slate-600 text-[11px] font-medium leading-loose">
        <div className="max-w-7xl mx-auto flex flex-wrap items-center justify-center gap-x-4 gap-y-1">
          <Link href="/sitemap.xml" className="hover:text-slate-900">Sitemap</Link>
          <span className="text-slate-400">•</span>
          <Link href="/terms" className="hover:text-slate-900">Terms &amp; Conditions</Link>
          <span className="text-slate-400">•</span>
          <Link href="/privacy-policy" className="hover:text-slate-900">Privacy Policy</Link>
          <span className="text-slate-400">•</span>
          <Link href="/cookie-policy" className="hover:text-slate-900">Whistle Blower Policy</Link>
          <span className="text-slate-400">•</span>
          <Link href="/blog" className="hover:text-slate-900">Blog</Link>
          <span className="text-slate-400">•</span>
          <Link href="/about" className="hover:text-slate-900">Careers</Link>
          <span className="text-slate-400">•</span>
          <Link href="/about" className="hover:text-slate-900">Testimonials</Link>
          <span className="text-slate-400">•</span>
          <Link href="/faq" className="hover:text-slate-900">Help Center</Link>
          <span className="text-slate-400">•</span>
          <Link href="/contact" className="hover:text-slate-900">Sales Enquiry</Link>
          <span className="text-slate-400">•</span>
          <Link href="/post-property" className="hover:text-slate-900">Buy Services</Link>
          <span className="text-slate-400">•</span>
          <Link href="/blog" className="hover:text-slate-900">News</Link>
        </div>
      </div>

      {/* Disclaimer Bar */}
      <div className="bg-[#e9e9e9] border-t border-slate-300/80 py-3 px-4 text-slate-500 text-[10px] leading-relaxed">
        <div className="max-w-7xl mx-auto">
          <p>
            Disclaimer: GetPlot Realty Services Limited is only an intermediary offering its platform to advertise properties of Seller for a Customer/Buyer/User coming on its Website and is not and cannot be a party to or privy to or control in any manner any transactions between the Seller and the Customer/Buyer/User. All the offers and discounts on this Website have been extended by buyers/sellers...{' '}
            {!expandedDisclaimer && (
              <button
                type="button"
                onClick={() => setExpandedDisclaimer(true)}
                className="text-slate-800 font-bold hover:underline cursor-pointer inline-block"
              >
                Read more
              </button>
            )}
            {expandedDisclaimer && (
              <span>
                {' '}GetPlot is not responsible for any delay, loss, or transaction disputes between buyers and sellers. All users are advised to independently verify registry titles.
              </span>
            )}
          </p>
        </div>
      </div>

      {/* Bottom Dark Copyright Bar */}
      <div className="bg-[#222222] py-4 px-4 text-slate-400 text-[11px] text-center font-medium border-t border-slate-800">
        <div className="max-w-7xl mx-auto">
          <p>
            All trademarks, logos and names are properties of their respective owners. All Rights Reserved. &copy; Copyright 2026 GetPlot Realty Services Limited.
          </p>
        </div>
      </div>
    </footer>
  );
}
