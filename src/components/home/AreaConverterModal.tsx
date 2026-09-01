'use client';

import React, { useState } from 'react';
import { Calculator, ArrowRightLeft, X, CheckCircle2 } from 'lucide-react';

interface AreaConverterProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function AreaConverterModal({ isOpen, onClose }: AreaConverterProps) {
  const [inputValue, setInputValue] = useState<number | string>(1000);
  const [fromUnit, setFromUnit] = useState<string>('sqft');
  const [toUnit, setToUnit] = useState<string>('sqyd');

  if (!isOpen) return null;

  // Conversion rates relative to Sq.Ft
  const toSqFt: Record<string, number> = {
    sqft: 1,
    sqyd: 9,
    sqm: 10.7639,
    acre: 43560,
    bigha: 27225, // Standard Pucca Bigha
    marla: 272.25,
    guntha: 1089,
    hectare: 107639,
  };

  const numVal = parseFloat(inputValue.toString()) || 0;
  const valInSqFt = numVal * (toSqFt[fromUnit] || 1);
  const result = (valInSqFt / (toSqFt[toUnit] || 1)).toFixed(2);

  const unitLabels: Record<string, string> = {
    sqft: 'Square Feet (sq.ft)',
    sqyd: 'Square Yards (sq.yd)',
    sqm: 'Square Meters (sq.m)',
    acre: 'Acres',
    bigha: 'Bigha (India)',
    marla: 'Marla',
    guntha: 'Guntha',
    hectare: 'Hectares',
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/70 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="bg-white rounded-3xl max-w-lg w-full p-6 sm:p-8 shadow-2xl border border-slate-100 relative">
        <button
          onClick={onClose}
          className="absolute top-5 right-5 w-9 h-9 rounded-full bg-slate-100 text-slate-500 hover:bg-slate-200 hover:text-slate-800 flex items-center justify-center transition-all"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="flex items-center gap-3 mb-6">
          <div className="w-12 h-12 rounded-2xl bg-emerald-50 border border-emerald-100 text-emerald-600 flex items-center justify-center">
            <Calculator className="w-6 h-6" />
          </div>
          <div>
            <h3 className="text-xl font-black text-slate-900">Real Estate Area Converter</h3>
            <p className="text-xs font-semibold text-slate-500">Convert between Sq.Ft, Sq.Yd, Acres, Bigha & Hectares</p>
          </div>
        </div>

        <div className="space-y-4">
          <div>
            <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-2">
              Enter Area Value
            </label>
            <input
              type="number"
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              className="w-full px-4 py-3 rounded-2xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-emerald-500 text-slate-900 font-bold text-lg"
              placeholder="e.g. 1000"
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-2">
                From Unit
              </label>
              <select
                value={fromUnit}
                onChange={(e) => setFromUnit(e.target.value)}
                className="w-full px-4 py-3 rounded-2xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-emerald-500 text-slate-800 font-bold text-sm bg-white"
              >
                {Object.entries(unitLabels).map(([code, label]) => (
                  <option key={code} value={code}>
                    {label}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-2">
                To Unit
              </label>
              <select
                value={toUnit}
                onChange={(e) => setToUnit(e.target.value)}
                className="w-full px-4 py-3 rounded-2xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-emerald-500 text-slate-800 font-bold text-sm bg-white"
              >
                {Object.entries(unitLabels).map(([code, label]) => (
                  <option key={code} value={code}>
                    {label}
                  </option>
                ))}
              </select>
            </div>
          </div>

          <div className="bg-gradient-to-r from-emerald-900 to-teal-900 rounded-2xl p-5 text-white shadow-lg flex items-center justify-between mt-6">
            <div>
              <span className="text-xs text-emerald-300 font-bold uppercase tracking-wider block">Converted Result</span>
              <div className="text-2xl sm:text-3xl font-black mt-1">
                {result} <span className="text-sm font-semibold text-emerald-200">{toUnit.toUpperCase()}</span>
              </div>
            </div>
            <ArrowRightLeft className="w-8 h-8 text-emerald-400 opacity-80" />
          </div>

          <div className="flex items-center gap-2 text-xs font-semibold text-slate-500 pt-2">
            <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
            <span>Formula: 1 {unitLabels[fromUnit]} = {(toSqFt[fromUnit] / toSqFt[toUnit]).toFixed(4)} {unitLabels[toUnit]}</span>
          </div>
        </div>
      </div>
    </div>
  );
}
