'use client';

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import {
  LayoutDashboard,
  ShieldCheck,
  Building,
  Users,
  MessageSquare,
  FileText,
  Settings,
  ArrowLeft,
  ShieldAlert,
  Sliders,
  Images
} from 'lucide-react';
import { useAuth } from '@/context/AuthContext';

export default function AdminSidebar() {
  const pathname = usePathname();
  const { user } = useAuth();

  const links = [
    { label: 'Admin Overview', href: '/admin', icon: LayoutDashboard },
    { label: 'Hero Slider CMS', href: '/admin/hero-sliders', icon: Images },
    { label: 'Property Approvals', href: '/admin/properties', icon: Building },
    { label: 'Verification Queue', href: '/admin/property-verification', icon: ShieldCheck },
    { label: 'User Directory', href: '/admin/users', icon: Users },
    { label: 'Inquiries Audit', href: '/admin/inquiries', icon: MessageSquare },
    { label: 'Blog & Articles CMS', href: '/admin/blog', icon: FileText },
  ];

  return (
    <aside className="w-full lg:w-64 bg-slate-900 text-slate-200 rounded-3xl p-5 shadow-xl flex flex-col justify-between shrink-0 space-y-6">
      <div className="space-y-6">
        {/* Header Badge */}
        <div className="flex items-center gap-3 p-3 rounded-2xl bg-slate-800/80 border border-slate-700">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-r from-[#7c3aed] via-[#a855f7] to-[#c026d3] text-white flex items-center justify-center font-bold shadow-md shadow-purple-950/40">
            <ShieldAlert className="w-5 h-5" />
          </div>
          <div>
            <div className="text-xs font-black text-white tracking-tight uppercase">Admin Console</div>
            <div className="text-[10px] text-purple-300 font-semibold">{user?.name || 'GetPlot Admin'}</div>
          </div>
        </div>

        {/* Links */}
        <nav className="space-y-1">
          {links.map((link) => {
            const Icon = link.icon;
            const active = pathname === link.href;

            return (
              <Link
                key={link.href}
                href={link.href}
                className={`flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-xs font-bold transition-all ${
                  active
                    ? 'bg-gradient-to-r from-[#7c3aed] via-[#a855f7] to-[#c026d3] text-white shadow-md shadow-purple-900/40'
                    : 'text-slate-400 hover:bg-slate-800 hover:text-white'
                }`}
              >
                <Icon className={`w-4 h-4 ${active ? 'text-white' : 'text-slate-400'}`} />
                <span>{link.label}</span>
              </Link>
            );
          })}
        </nav>
      </div>

      {/* Return to Public Site */}
      <div className="pt-4 border-t border-slate-800">
        <Link
          href="/"
          className="flex items-center gap-2 px-3.5 py-2.5 rounded-xl text-xs font-semibold text-slate-400 hover:text-white hover:bg-slate-800 transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Back to Marketplace</span>
        </Link>
      </div>
    </aside>
  );
}
