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

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm<LoginFormData>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: '',
      password: '',
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
    if (role === 'admin') {
      setValue('email', 'admin@estatify.com');
      setValue('password', 'password123');
    } else if (role === 'agent') {
      setValue('email', 'agent@estatify.com');
      setValue('password', 'password123');
    } else {
      setValue('email', 'buyer@estatify.com');
      setValue('password', 'password123');
    }
  };

  return (
    <div className="w-full max-w-md bg-white rounded-3xl p-8 border border-slate-200/80 shadow-xl space-y-6">
      {/* Header */}
      <div className="text-center space-y-2">
        <div className="w-12 h-12 rounded-2xl bg-slate-900 text-white flex items-center justify-center mx-auto shadow-md">
          <Building2 className="w-6 h-6 text-emerald-400" />
        </div>
        <h1 className="text-2xl font-extrabold text-slate-900 tracking-tight">
          Welcome to Estatify
        </h1>
        <p className="text-xs text-slate-500">
          Sign in to manage your properties, saved listings, and inquiries.
        </p>
      </div>

      {/* Demo Fast Login Buttons */}
      <div className="p-3 rounded-2xl bg-slate-50 border border-slate-200/80 space-y-2">
        <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400 block text-center">
          Quick Fill Demo Accounts
        </span>
        <div className="grid grid-cols-3 gap-1.5 text-xs font-bold">
          <button
            type="button"
            onClick={() => fillDemoAccount('buyer')}
            className="py-1.5 px-2 rounded-xl bg-white border border-slate-200 hover:border-emerald-500 text-slate-800 text-[11px] transition-colors"
          >
            Buyer User
          </button>
          <button
            type="button"
            onClick={() => fillDemoAccount('agent')}
            className="py-1.5 px-2 rounded-xl bg-white border border-slate-200 hover:border-emerald-500 text-slate-800 text-[11px] transition-colors"
          >
            RERA Agent
          </button>
          <button
            type="button"
            onClick={() => fillDemoAccount('admin')}
            className="py-1.5 px-2 rounded-xl bg-emerald-50 border border-emerald-300 text-emerald-900 text-[11px] transition-colors"
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
              className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-slate-200 text-sm text-slate-900 focus:border-emerald-600 focus:ring-1 focus:ring-emerald-600 outline-none"
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
              className="text-[11px] font-semibold text-emerald-700 hover:underline"
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
              className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-slate-200 text-sm text-slate-900 focus:border-emerald-600 focus:ring-1 focus:ring-emerald-600 outline-none"
            />
          </div>
          {errors.password && (
            <p className="text-[11px] text-rose-600 mt-1">{errors.password.message}</p>
          )}
        </div>

        <button
          type="submit"
          disabled={loading}
          className="w-full flex items-center justify-center gap-2 py-3 px-6 rounded-xl bg-slate-900 hover:bg-emerald-600 text-white font-bold text-sm shadow-md transition-all active:scale-[0.99] disabled:opacity-50"
        >
          <LogIn className="w-4 h-4" />
          <span>{loading ? 'Signing in...' : 'Sign In'}</span>
        </button>
      </form>

      {/* Register CTA */}
      <div className="text-center pt-2 text-xs text-slate-500">
        Don&apos;t have an account yet?{' '}
        <Link href="/register" className="font-bold text-emerald-700 hover:underline">
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
