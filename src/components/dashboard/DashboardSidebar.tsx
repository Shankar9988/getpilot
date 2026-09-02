'use client';

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import {
  LayoutDashboard,
  Home,
  PlusCircle,
  Heart,
  MessageSquareText,
  Bell,
  User,
  Settings,
  LogOut,
  ShieldCheck
} from 'lucide-react';
import { useAuth } from '@/context/AuthContext';

export default function DashboardSidebar() {
  const pathname = usePathname();
  const { user, logout } = useAuth();

  const links = [
    { label: 'Overview', href: '/dashboard', icon: LayoutDashboard },
    { label: 'My Properties', href: '/dashboard/properties', icon: Home },
    { label: 'Post New Property', href: '/dashboard/properties/create', icon: PlusCircle, highlight: true },
    { label: 'Saved Favorites', href: '/dashboard/favorites', icon: Heart },
    { label: 'Leads & Inquiries', href: '/dashboard/inquiries', icon: MessageSquareText },
    { label: 'Notifications', href: '/dashboard/notifications', icon: Bell },
    { label: 'Profile Settings', href: '/dashboard/profile', icon: User },
  ];

  return (
    <aside className="w-full lg:w-64 bg-white rounded-3xl border border-slate-200/80 p-5 shadow-xs flex flex-col justify-between shrink-0 space-y-6">
      <div className="space-y-6">
        {/* User Card */}
        <div className="flex items-center gap-3 p-3 rounded-2xl bg-purple-50/70 border border-purple-100">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-r from-[#7c3aed] via-[#a855f7] to-[#c026d3] text-white font-bold flex items-center justify-center text-sm shadow-md shrink-0 overflow-hidden">
            {user?.avatar ? (
              <img src={user.avatar} alt={user.name} className="w-full h-full object-cover" />
            ) : (
              user?.name?.charAt(0).toUpperCase() || 'U'
            )}
          </div>
          <div className="truncate">
            <div className="text-xs font-bold text-slate-900 truncate">{user?.name}</div>
            <div className="text-[10px] font-semibold text-[#9333ea] uppercase tracking-wider flex items-center gap-1">
              <ShieldCheck className="w-3.5 h-3.5 text-[#9333ea]" />
              <span>{user?.role} Account</span>
            </div>
          </div>
        </div>

        {/* Navigation Links */}
        <nav className="space-y-1">
          {links.map((link) => {
            const Icon = link.icon;
            const active = pathname === link.href;

            if (link.highlight) {
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  className="flex items-center gap-3 px-3.5 py-2.5 rounded-xl bg-gradient-to-r from-[#7c3aed] via-[#a855f7] to-[#c026d3] hover:opacity-95 text-white text-xs font-bold shadow-md transition-all my-2"
                >
                  <Icon className="w-4 h-4 text-white" />
                  <span>{link.label}</span>
                </Link>
              );
            }

            return (
              <Link
                key={link.href}
                href={link.href}
                className={`flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-xs font-bold transition-all ${
                  active
                    ? 'bg-purple-50 text-purple-900 border border-purple-100 shadow-xs'
                    : 'text-slate-600 hover:bg-slate-50 hover:text-slate-900'
                }`}
              >
                <Icon className={`w-4 h-4 ${active ? 'text-[#9333ea]' : 'text-slate-400'}`} />
                <span>{link.label}</span>
              </Link>
            );
          })}
        </nav>
      </div>

      {/* Logout */}
      <div className="pt-4 border-t border-slate-100">
        <button
          onClick={logout}
          className="w-full flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-xs font-semibold text-rose-600 hover:bg-rose-50 transition-colors text-left"
        >
          <LogOut className="w-4 h-4 text-rose-500" />
          <span>Sign Out</span>
        </button>
      </div>
    </aside>
  );
}
