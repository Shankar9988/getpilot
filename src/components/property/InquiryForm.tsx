'use client';

import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { Send, CheckCircle2, Phone, Mail, User, ShieldCheck } from 'lucide-react';
import { inquiriesApi } from '@/lib/api/inquiries';
import { useAuth } from '@/context/AuthContext';
import { useToast } from '@/context/ToastContext';

const inquirySchema = z.object({
  name: z.string().min(2, 'Name is required'),
  email: z.string().email('Please enter a valid email address'),
  phone: z.string().min(10, 'Please enter a valid 10-digit phone number'),
  message: z.string().min(5, 'Message must be at least 5 characters'),
});

type InquiryFormData = z.infer<typeof inquirySchema>;

interface InquiryFormProps {
  propertyId: number;
  propertyTitle: string;
  sellerName?: string;
  sellerCompany?: string;
}

export default function InquiryForm({
  propertyId,
  propertyTitle,
  sellerName,
  sellerCompany,
}: InquiryFormProps) {
  const { user } = useAuth();
  const { success, error } = useToast();
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<InquiryFormData>({
    resolver: zodResolver(inquirySchema),
    defaultValues: {
      name: user?.name || '',
      email: user?.email || '',
      phone: user?.phone || '',
      message: 'Hello, I am interested in this property. Please connect with me regarding pricing and site visit schedules.',
    },
  });

  const onSubmit = async (data: InquiryFormData) => {
    setLoading(true);
    try {
      await inquiriesApi.create({
        property_id: propertyId,
        name: data.name,
        email: data.email,
        phone: data.phone,
        message: data.message,
      });

      setSubmitted(true);
      success('Inquiry sent successfully! The seller will contact you shortly.');
      reset();
    } catch (err: any) {
      error(err.message || 'Failed to send inquiry. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  if (submitted) {
    return (
      <div className="p-6 md:p-8 rounded-3xl bg-emerald-50 border border-emerald-200 text-center space-y-4">
        <div className="w-12 h-12 rounded-full bg-emerald-600 text-white flex items-center justify-center mx-auto shadow-md shadow-emerald-950/20">
          <CheckCircle2 className="w-6 h-6" />
        </div>
        <h3 className="text-lg font-bold text-emerald-950">Inquiry Sent Successfully</h3>
        <p className="text-xs text-emerald-800 leading-relaxed max-w-xs mx-auto">
          Your request has been forwarded directly to the property representative. You will receive a callback or message soon.
        </p>
        <button
          onClick={() => setSubmitted(false)}
          className="text-xs font-bold text-emerald-900 underline hover:text-emerald-700 pt-2"
        >
          Send another inquiry
        </button>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-3xl p-6 md:p-8 border border-slate-200/80 shadow-lg shadow-slate-200/50 space-y-5">
      <div>
        <div className="flex items-center justify-between gap-2 mb-1">
          <h3 className="text-lg font-extrabold text-slate-900 tracking-tight">
            Contact Seller
          </h3>
          <span className="inline-flex items-center gap-1 text-[11px] font-bold text-purple-900 bg-purple-50 px-2 py-0.5 rounded-full border border-purple-200">
            <ShieldCheck className="w-3 h-3 text-[#9333ea]" /> Direct Lead
          </span>
        </div>
        {sellerName && (
          <p className="text-xs text-slate-500">
            Listed by <span className="font-semibold text-slate-800">{sellerName}</span>
            {sellerCompany && ` (${sellerCompany})`}
          </p>
        )}
      </div>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        {/* Name */}
        <div>
          <label className="block text-xs font-bold text-slate-700 mb-1.5">
            Your Name <span className="text-rose-500">*</span>
          </label>
          <div className="relative">
            <User className="w-4 h-4 text-slate-400 absolute left-3.5 top-3" />
            <input
              type="text"
              placeholder="e.g. Rahul Sharma"
              {...register('name')}
              className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-slate-200 focus:border-[#9333ea] focus:ring-1 focus:ring-[#9333ea] text-sm text-slate-900 transition-colors"
            />
          </div>
          {errors.name && (
            <p className="text-[11px] text-rose-600 mt-1">{errors.name.message}</p>
          )}
        </div>

        {/* Email */}
        <div>
          <label className="block text-xs font-bold text-slate-700 mb-1.5">
            Email Address <span className="text-rose-500">*</span>
          </label>
          <div className="relative">
            <Mail className="w-4 h-4 text-slate-400 absolute left-3.5 top-3" />
            <input
              type="email"
              placeholder="e.g. rahul@example.com"
              {...register('email')}
              className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-slate-200 focus:border-[#9333ea] focus:ring-1 focus:ring-[#9333ea] text-sm text-slate-900 transition-colors"
            />
          </div>
          {errors.email && (
            <p className="text-[11px] text-rose-600 mt-1">{errors.email.message}</p>
          )}
        </div>

        {/* Phone */}
        <div>
          <label className="block text-xs font-bold text-slate-700 mb-1.5">
            Phone Number <span className="text-rose-500">*</span>
          </label>
          <div className="relative">
            <Phone className="w-4 h-4 text-slate-400 absolute left-3.5 top-3" />
            <input
              type="tel"
              placeholder="e.g. +91 98765 43210"
              {...register('phone')}
              className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-slate-200 focus:border-[#9333ea] focus:ring-1 focus:ring-[#9333ea] text-sm text-slate-900 transition-colors"
            />
          </div>
          {errors.phone && (
            <p className="text-[11px] text-rose-600 mt-1">{errors.phone.message}</p>
          )}
        </div>

        {/* Message */}
        <div>
          <label className="block text-xs font-bold text-slate-700 mb-1.5">
            Message
          </label>
          <textarea
            rows={3}
            placeholder="I would like more information on this property..."
            {...register('message')}
            className="w-full p-3 rounded-xl border border-slate-200 focus:border-[#9333ea] focus:ring-1 focus:ring-[#9333ea] text-sm text-slate-900 transition-colors resize-none"
          />
          {errors.message && (
            <p className="text-[11px] text-rose-600 mt-1">{errors.message.message}</p>
          )}
        </div>

        {/* Submit CTA */}
        <button
          type="submit"
          disabled={loading}
          className="w-full flex items-center justify-center gap-2 py-3.5 px-6 rounded-xl bg-gradient-to-r from-[#7c3aed] via-[#a855f7] to-[#c026d3] hover:opacity-95 text-white font-extrabold text-sm shadow-md shadow-purple-500/25 transition-all active:scale-[0.99] disabled:opacity-50 cursor-pointer"
        >
          <Send className="w-4 h-4" />
          <span>{loading ? 'Sending Inquiry...' : 'Send Direct Inquiry'}</span>
        </button>

        <p className="text-[10px] text-center text-slate-400">
          🔒 Your contact details are securely delivered to the verified owner/agent only. Zero spam guarantee.
        </p>
      </form>
    </div>
  );
}
