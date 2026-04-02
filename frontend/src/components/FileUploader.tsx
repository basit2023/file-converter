'use client';

import React, { useState, useRef } from 'react';
import { Upload, File, CheckCircle2, AlertCircle, Loader2, Download, ArrowRight } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

import { CONVERSION_TYPES, CATEGORIES } from '@/constants/tools';

export function FileUploader({ initialType }: { initialType?: string }) {
  const [file, setFile] = useState<File | null>(null);
  const [type, setType] = useState(initialType || 'pdf-to-text');
  const [status, setStatus] = useState<'idle' | 'uploading' | 'processing' | 'success' | 'error'>('idle');
  const [error, setError] = useState<string | null>(null);
  const [downloadUrl, setDownloadUrl] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  React.useEffect(() => {
    if (initialType) {
      setType(initialType);
    }
  }, [initialType]);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    console.log('File changed:', e.target.files?.[0]?.name);
    if (e.target.files && e.target.files[0]) {
      setFile(e.target.files[0]);
      setStatus('idle');
      setError(null);
      setDownloadUrl(null);
    }
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      setFile(e.dataTransfer.files[0]);
      setStatus('idle');
      setError(null);
      setDownloadUrl(null);
    }
  };

  const handleConvert = async () => {
    console.log('Convert clicked, file:', file?.name, 'type:', type);
    if (!file) return;

    setStatus('processing');
    console.log('Status set to processing');
    setError(null);

    const formData = new FormData();
    formData.append('file', file);
    formData.append('type', type);

    try {
      const backendUrl = `${process.env.NEXT_PUBLIC_API_URL || `http://${window.location.hostname}:5000/api`}/convert`;
      const response = await fetch(backendUrl, {
        method: 'POST',
        body: formData,
      });

      if (!response.ok) {
        let errorMessage = 'Conversion failed';
        try {
          const contentType = response.headers.get('content-type');
          if (contentType && contentType.includes('application/json')) {
            const errorData = await response.json();
            errorMessage = errorData.error || errorMessage;
          } else {
            // Handle non-JSON errors (like Nginx 502/504)
            const textError = await response.text();
            if (textError.includes('Bad Gateway')) {
              errorMessage = 'Server is currently unavailable (502 Bad Gateway). Please try again in a few minutes.';
            } else if (textError.includes('Gateway Timeout')) {
              errorMessage = 'Server took too long to respond (504 Gateway Timeout).';
            } else {
              errorMessage = `Server error (${response.status}). Please try again later.`;
            }
          }
        } catch (e) {
          console.error('Error parsing error response:', e);
        }
        throw new Error(errorMessage);
      }

      const blob = await response.blob();
      const url = window.URL.createObjectURL(blob);
      setDownloadUrl(url);
      setStatus('success');
    } catch (err: any) {
      console.error(err);
      setError(err.message || 'Something went wrong. Please try again.');
      setStatus('error');
    }
  };

  return (
    <div className="w-full max-w-2xl mx-auto space-y-8">
      {/* Glassmorphism Card */}
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-white/40 dark:bg-zinc-900/40 backdrop-blur-2xl border border-white/20 dark:border-zinc-800/20 p-8 rounded-3xl shadow-2xl"
      >
        <div className="space-y-6">
          {/* Upload Area */}
          <div
            onDragOver={(e) => e.preventDefault()}
            onDrop={handleDrop}
            onClick={() => fileInputRef.current?.click()}
            className={`cursor-pointer group relative border-2 border-dashed rounded-2xl p-10 flex flex-col items-center justify-center transition-all ${
              file 
                ? 'border-indigo-400 bg-indigo-50/10 dark:bg-indigo-900/5' 
                : 'border-zinc-300 dark:border-zinc-700 hover:border-indigo-400 dark:hover:border-indigo-500'
            }`}
          >
            <input 
              type="file" 
              ref={fileInputRef} 
              onChange={handleFileChange} 
              className="hidden" 
            />
            <div className="bg-indigo-600/10 dark:bg-indigo-500/10 p-4 rounded-full mb-4 group-hover:scale-110 transition-transform">
              {file ? <File className="h-8 w-8 text-indigo-600 dark:text-indigo-400" /> : <Upload className="h-8 w-8 text-indigo-600 dark:text-indigo-400" />}
            </div>
            <p className="text-lg font-medium text-zinc-900 dark:text-zinc-100">
              {file ? file.name : 'Click or Drag & Drop File'}
            </p>
            <p className="text-sm text-zinc-500 mt-1">
              Supports PDF, Word, JPG, PNG (Max 10MB)
            </p>
          </div>

          {/* Conversion Options */}
          <div className="space-y-4">
            <label className="text-sm font-medium text-zinc-700 dark:text-zinc-300 block">Select Conversion Type:</label>
            {CATEGORIES.map((category) => (
              <div key={category} className="space-y-2">
                <h3 className="text-xs font-semibold text-zinc-600 dark:text-zinc-400 uppercase tracking-wide">{category}</h3>
                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-2">
                  {CONVERSION_TYPES.filter(t => t.category === category).map((t) => (
                    <button
                      key={t.id}
                      onClick={() => setType(t.id)}
                      className={`p-3 rounded-lg text-sm font-medium transition-all text-center ${
                        type === t.id
                          ? 'bg-indigo-600 text-white shadow-lg shadow-indigo-600/30'
                          : 'bg-white/50 dark:bg-zinc-800/50 text-zinc-900 dark:text-zinc-100 hover:bg-indigo-50 dark:hover:bg-zinc-700/50 border border-zinc-200 dark:border-zinc-700'
                      }`}
                    >
                      <div className="text-lg mb-1">{t.icon}</div>
                      <div>{t.label}</div>
                    </button>
                  ))}
                </div>
              </div>
            ))}
          </div>

          {/* Convert Button */}
          <div className="pt-4">
            <button
              onClick={handleConvert}
              disabled={!file || status === 'processing'}
              className="w-full bg-indigo-600 hover:bg-indigo-700 disabled:bg-indigo-400 text-white font-bold py-3 px-6 rounded-xl flex items-center justify-center gap-2 shadow-lg shadow-indigo-600/20 active:scale-[0.98] transition-all"
            >
              {status === 'processing' ? (
                <>
                  <Loader2 className="h-5 w-5 animate-spin" />
                  Processing...
                </>
              ) : (
                <>
                  Convert Now
                  <ArrowRight className="h-5 w-5" />
                </>
              )}
            </button>
          </div>
        </div>
      </motion.div>

      {/* Results Section */}
      <AnimatePresence>
        {status === 'success' && downloadUrl && (
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
            className="bg-emerald-50/50 dark:bg-emerald-900/10 border border-emerald-200 dark:border-emerald-800/50 p-6 rounded-2xl flex flex-col md:flex-row items-center justify-between gap-4"
          >
            <div className="flex items-center gap-3">
              <CheckCircle2 className="h-8 w-8 text-emerald-600 dark:text-emerald-400" />
              <div>
                <h3 className="font-bold text-emerald-900 dark:text-emerald-100">Ready to download!</h3>
                <p className="text-sm text-emerald-700 dark:text-emerald-400 italic">Your file has been converted successfully.</p>
              </div>
            </div>
            <a
              href={downloadUrl}
              download="converted-file"
              className="w-full md:w-auto bg-emerald-600 hover:bg-emerald-700 text-white font-bold py-3 px-8 rounded-xl flex items-center justify-center gap-2 shadow-lg shadow-emerald-600/20 transition-all"
            >
              <Download className="h-5 w-5" />
              Download
            </a>
          </motion.div>
        )}

        {status === 'error' && (
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
            className="bg-rose-50/50 dark:bg-rose-900/10 border border-rose-200 dark:border-rose-800/50 p-6 rounded-2xl flex items-center gap-4"
          >
            <AlertCircle className="h-8 w-8 text-rose-600 dark:text-rose-400" />
            <div>
              <h3 className="font-bold text-rose-900 dark:text-rose-100">Error</h3>
              <p className="text-sm text-rose-700 dark:text-rose-400 italic">{error}</p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
