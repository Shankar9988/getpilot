'use client';

import React, { useState, Suspense } from 'react';
import Link from 'next/link';
import { useRouter, useSearchParams } from 'next/navigation';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { Building2, Mail, Lock, LogIn, ShieldCheck } from 'lucide-react';
import { useAuth } from '@/context/AuthContext';

const loginSchema = z.object({
  email: z.string().email('Please enter a valid email address'),
  password: z.string().min(6, 'Password must be at least 6 characters'),
});

type LoginFormData = z.infer<typeof loginSchema>;

function LoginForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const redirect = searchParams.get('redirect') || '/dashboard';
  const { login } = useAuth();
  const [loading, setLoading] = useState(false);
  const [activeRole, setActiveRole] = useState<'admin' | 'agent' | 'buyer' | null>('admin');

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm<LoginFormData>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: 'demo.admin@estatify.com',
      password: 'DemoAdmin@2026',
    },
  });

  const onSubmit = async (data: LoginFormData) => {
    setLoading(true);
    const ok = await login(data);
    setLoading(false);
    if (ok) {
      router.push(redirect);
    }
  };

  const fillDemoAccount = (role: 'admin' | 'agent' | 'buyer') => {
    setActiveRole(role);
    if (role === 'admin') {
      setValue('email', 'demo.admin@estatify.com');
      setValue('password', 'DemoAdmin@2026');
    } else if (role === 'agent') {
      setValue('email', 'demo.user@estatify.com');
      setValue('password', 'DemoUser@2026');
    } else {
      setValue('email', 'demo.user@estatify.com');
      setValue('password', 'DemoUser@2026');
    }
  };

  return (
    <div className="w-full max-w-md bg-white rounded-3xl p-8 border border-slate-200/80 shadow-xl space-y-6">
      {/* Header */}
      <div className="text-center space-y-2">
        <div className="w-12 h-12 rounded-2xl bg-gradient-to-r from-[#7c3aed] via-[#a855f7] to-[#c026d3] text-white flex items-center justify-center mx-auto shadow-md">
          <Building2 className="w-6 h-6 text-white" />
        </div>
        <h1 className="text-2xl font-black text-slate-900 tracking-tight">
          Welcome to <span className="text-[#9333ea]">GetPlot</span>
        </h1>
        <p className="text-xs text-slate-500 font-medium">
          Sign in to manage your properties, saved listings, and inquiries.
        </p>
      </div>

      {/* Demo Fast Login Buttons with Active State Accent */}
      <div className="p-3 rounded-2xl bg-purple-50/60 border border-purple-100 space-y-2">
        <span className="text-[10px] font-extrabold uppercase tracking-wider text-purple-700 block text-center">
          QUICK FILL DEMO ACCOUNTS
        </span>
        <div className="grid grid-cols-3 gap-2 text-xs font-bold">
          <button
            type="button"
            onClick={() => fillDemoAccount('buyer')}
            className={`py-2 px-2.5 rounded-xl text-[11px] transition-all duration-300 font-extrabold ${
              activeRole === 'buyer'
                ? 'bg-gradient-to-r from-[#7c3aed] via-[#a855f7] to-[#c026d3] text-white shadow-md shadow-purple-500/25 scale-[1.02] border-transparent'
                : 'bg-white border border-slate-200 text-slate-700 hover:border-purple-300'
            }`}
          >
            Buyer User
          </button>

          <button
            type="button"
            onClick={() => fillDemoAccount('agent')}
            className={`py-2 px-2.5 rounded-xl text-[11px] transition-all duration-300 font-extrabold ${
              activeRole === 'agent'
                ? 'bg-gradient-to-r from-[#7c3aed] via-[#a855f7] to-[#c026d3] text-white shadow-md shadow-purple-500/25 scale-[1.02] border-transparent'
                : 'bg-white border border-slate-200 text-slate-700 hover:border-purple-300'
            }`}
          >
            RERA Agent
          </button>

          <button
            type="button"
            onClick={() => fillDemoAccount('admin')}
            className={`py-2 px-2.5 rounded-xl text-[11px] transition-all duration-300 font-extrabold ${
              activeRole === 'admin'
                ? 'bg-gradient-to-r from-[#7c3aed] via-[#a855f7] to-[#c026d3] text-white shadow-md shadow-purple-500/25 scale-[1.02] border-transparent'
                : 'bg-white border border-slate-200 text-slate-700 hover:border-purple-300'
            }`}
          >
            Admin
          </button>
        </div>
      </div>

      {/* Form */}
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <div>
          <label className="block text-xs font-bold text-slate-700 mb-1">Email Address</label>
          <div className="relative">
            <Mail className="w-4 h-4 text-slate-400 absolute left-3.5 top-3" />
            <input
              type="email"
              placeholder="name@example.com"
              {...register('email')}
              className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-slate-200 text-sm text-slate-900 focus:border-[#9333ea] focus:ring-1 focus:ring-[#9333ea] outline-none font-medium"
            />
          </div>
          {errors.email && (
            <p className="text-[11px] text-rose-600 mt-1">{errors.email.message}</p>
          )}
        </div>

        <div>
          <div className="flex items-center justify-between mb-1">
            <label className="text-xs font-bold text-slate-700">Password</label>
            <Link
              href="/forgot-password"
              className="text-[11px] font-bold text-[#9333ea] hover:underline"
            >
              Forgot Password?
            </Link>
          </div>
          <div className="relative">
            <Lock className="w-4 h-4 text-slate-400 absolute left-3.5 top-3" />
            <input
              type="password"
              placeholder="••••••••"
              {...register('password')}
              className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-slate-200 text-sm text-slate-900 focus:border-[#9333ea] focus:ring-1 focus:ring-[#9333ea] outline-none font-medium"
            />
          </div>
          {errors.password && (
            <p className="text-[11px] text-rose-600 mt-1">{errors.password.message}</p>
          )}
        </div>

        <button
          type="submit"
          disabled={loading}
          className="w-full flex items-center justify-center gap-2 py-3.5 px-6 rounded-xl bg-gradient-to-r from-[#7c3aed] via-[#a855f7] to-[#c026d3] hover:opacity-95 text-white font-extrabold text-sm shadow-md shadow-purple-500/25 transition-all active:scale-[0.99] disabled:opacity-50 cursor-pointer"
        >
          <LogIn className="w-4 h-4" />
          <span>{loading ? 'Signing in...' : 'Sign In'}</span>
        </button>
      </form>

      {/* Register CTA */}
      <div className="text-center pt-2 text-xs text-slate-500 font-medium">
        Don&apos;t have an account yet?{' '}
        <Link href="/register" className="font-bold text-[#9333ea] hover:underline">
          Create Account
        </Link>
      </div>
    </div>
  );
}

export default function LoginPage() {
  return (
    <div className="min-h-[80vh] flex items-center justify-center px-4 py-12">
      <Suspense fallback={<div className="p-8 text-center text-xs text-slate-400">Loading form...</div>}>
        <LoginForm />
      </Suspense>
    </div>
  );
}
