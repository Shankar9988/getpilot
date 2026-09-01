'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { Building2, User, Mail, Phone, Lock, UserPlus, ShieldCheck } from 'lucide-react';
import { useAuth } from '@/context/AuthContext';

const registerSchema = z.object({
  name: z.string().min(2, 'Full Name is required'),
  email: z.string().email('Please enter a valid email address'),
  phone: z.string().min(10, 'Please enter a valid phone number'),
  role: z.enum(['user', 'agent']),
  company_name: z.string().optional(),
  license_number: z.string().optional(),
  password: z.string().min(8, 'Password must be at least 8 characters'),
  password_confirmation: z.string(),
}).refine((data) => data.password === data.password_confirmation, {
  message: 'Passwords do not match',
  path: ['password_confirmation'],
});

type RegisterFormData = z.infer<typeof registerSchema>;

export default function RegisterPage() {
  const router = useRouter();
  const { register: signup } = useAuth();
  const [loading, setLoading] = useState(false);

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<RegisterFormData>({
    resolver: zodResolver(registerSchema),
    defaultValues: {
      name: '',
      email: '',
      phone: '',
      role: 'user',
      company_name: '',
      license_number: '',
      password: '',
      password_confirmation: '',
    },
  });

  const selectedRole = watch('role');

  const onSubmit = async (data: RegisterFormData) => {
    setLoading(true);
    const ok = await signup(data);
    setLoading(false);
    if (ok) {
      router.push('/dashboard');
    }
  };

  return (
    <div className="min-h-[80vh] flex items-center justify-center px-4 py-12">
      <div className="w-full max-w-lg bg-white rounded-3xl p-8 border border-slate-200/80 shadow-xl space-y-6">
        {/* Header */}
        <div className="text-center space-y-2">
          <div className="w-12 h-12 rounded-2xl bg-gradient-to-r from-[#7c3aed] via-[#a855f7] to-[#c026d3] text-white flex items-center justify-center mx-auto shadow-md">
            <Building2 className="w-6 h-6 text-white" />
          </div>
          <h1 className="text-2xl font-black text-slate-900 tracking-tight">
            Create Your <span className="text-[#9333ea]">GetPlot</span> Account
          </h1>
          <p className="text-xs text-slate-500 font-medium">
            Join thousands of verified home buyers, owners, and registered RERA advisors.
          </p>
        </div>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          {/* Account Role Selector */}
          <div>
            <label className="block text-xs font-bold text-slate-700 mb-1.5">I want to register as</label>
            <div className="grid grid-cols-2 gap-2">
              <label
                className={`p-3 rounded-xl border text-center cursor-pointer text-xs font-extrabold transition-all ${
                  selectedRole === 'user'
                    ? 'border-[#9333ea] bg-purple-50 text-[#9333ea] shadow-xs'
                    : 'border-slate-200 bg-slate-50 text-slate-700'
                }`}
              >
                <input
                  type="radio"
                  value="user"
                  {...register('role')}
                  className="sr-only"
                />
                <span>Buyer / Property Owner</span>
              </label>

              <label
                className={`p-3 rounded-xl border text-center cursor-pointer text-xs font-extrabold transition-all ${
                  selectedRole === 'agent'
                    ? 'border-[#9333ea] bg-purple-50 text-[#9333ea] shadow-xs'
                    : 'border-slate-200 bg-slate-50 text-slate-700'
                }`}
              >
                <input
                  type="radio"
                  value="agent"
                  {...register('role')}
                  className="sr-only"
                />
                <span>RERA Real Estate Agent</span>
              </label>
            </div>
          </div>

          {/* Name */}
          <div>
            <label className="block text-xs font-bold text-slate-700 mb-1">Full Name *</label>
            <div className="relative">
              <User className="w-4 h-4 text-slate-400 absolute left-3.5 top-3" />
              <input
                type="text"
                placeholder="e.g. Vikram Sharma"
                {...register('name')}
                className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-slate-200 text-sm text-slate-900 focus:border-emerald-600 outline-none"
              />
            </div>
            {errors.name && <p className="text-[11px] text-rose-600 mt-1">{errors.name.message}</p>}
          </div>

          {/* Email & Phone */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">Email Address *</label>
              <div className="relative">
                <Mail className="w-4 h-4 text-slate-400 absolute left-3.5 top-3" />
                <input
                  type="email"
                  placeholder="vikram@example.com"
                  {...register('email')}
                  className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-slate-200 text-sm text-slate-900 focus:border-emerald-600 outline-none"
                />
              </div>
              {errors.email && <p className="text-[11px] text-rose-600 mt-1">{errors.email.message}</p>}
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">Phone Number *</label>
              <div className="relative">
                <Phone className="w-4 h-4 text-slate-400 absolute left-3.5 top-3" />
                <input
                  type="tel"
                  placeholder="+91 98765 43210"
                  {...register('phone')}
                  className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-slate-200 text-sm text-slate-900 focus:border-emerald-600 outline-none"
                />
              </div>
              {errors.phone && <p className="text-[11px] text-rose-600 mt-1">{errors.phone.message}</p>}
            </div>
          </div>

          {/* Agent Specific Fields */}
          {selectedRole === 'agent' && (
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 p-3 rounded-2xl bg-slate-50 border border-slate-200">
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">Agency / Company</label>
                <input
                  type="text"
                  placeholder="e.g. Apex Realty"
                  {...register('company_name')}
                  className="w-full p-2.5 rounded-xl border border-slate-200 text-xs text-slate-900 outline-none bg-white"
                />
              </div>
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">RERA License No.</label>
                <input
                  type="text"
                  placeholder="e.g. RERA-DL-2024-1122"
                  {...register('license_number')}
                  className="w-full p-2.5 rounded-xl border border-slate-200 text-xs text-slate-900 outline-none bg-white"
                />
              </div>
            </div>
          )}

          {/* Password & Confirm */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">Password *</label>
              <div className="relative">
                <Lock className="w-4 h-4 text-slate-400 absolute left-3.5 top-3" />
                <input
                  type="password"
                  placeholder="••••••••"
                  {...register('password')}
                  className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-slate-200 text-sm text-slate-900 focus:border-emerald-600 outline-none"
                />
              </div>
              {errors.password && <p className="text-[11px] text-rose-600 mt-1">{errors.password.message}</p>}
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">Confirm Password *</label>
              <div className="relative">
                <Lock className="w-4 h-4 text-slate-400 absolute left-3.5 top-3" />
                <input
                  type="password"
                  placeholder="••••••••"
                  {...register('password_confirmation')}
                  className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-slate-200 text-sm text-slate-900 focus:border-emerald-600 outline-none"
                />
              </div>
              {errors.password_confirmation && (
                <p className="text-[11px] text-rose-600 mt-1">{errors.password_confirmation.message}</p>
              )}
            </div>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full flex items-center justify-center gap-2 py-3.5 px-6 rounded-xl bg-gradient-to-r from-[#7c3aed] via-[#a855f7] to-[#c026d3] hover:opacity-95 text-white font-extrabold text-sm shadow-md shadow-purple-500/25 transition-all active:scale-[0.99] disabled:opacity-50 cursor-pointer"
          >
            <UserPlus className="w-4 h-4" />
            <span>{loading ? 'Creating Account...' : 'Complete Registration'}</span>
          </button>
        </form>

        <div className="text-center text-xs text-slate-500 font-medium">
          Already registered?{' '}
          <Link href="/login" className="font-bold text-[#9333ea] hover:underline">
            Log in here
          </Link>
        </div>
      </div>
    </div>
  );
}
