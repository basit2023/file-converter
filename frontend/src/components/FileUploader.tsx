'use client';

import React, { useState, useRef } from 'react';
import { Upload, File, CheckCircle2, AlertCircle, Loader2, Download, ArrowRight } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

import { CONVERSION_TYPES, CATEGORIES } from '@/constants/tools';

const ACCEPT_BY_TYPE: Record<string, string> = {
  'jpg-to-png': '.jpg,.jpeg,image/jpeg',
  'jpg-to-webp': '.jpg,.jpeg,image/jpeg',
  'jpg-to-gif': '.jpg,.jpeg,image/jpeg',
  'png-to-jpg': '.png,image/png',
  'png-to-webp': '.png,image/png',
  'png-to-gif': '.png,image/png',
  'gif-to-jpg': '.gif,image/gif',
  'gif-to-png': '.gif,image/gif',
  'webp-to-jpg': '.webp,image/webp',
  'webp-to-png': '.webp,image/webp',
  'image-resize': '.jpg,.jpeg,.png,.webp,image/jpeg,image/png,image/webp',
  'pdf-to-text': '.pdf,application/pdf',
  'pdf-to-word': '.pdf,application/pdf',
  'pdf-to-jpg': '.pdf,application/pdf',
  'pdf-to-png': '.pdf,application/pdf',
  'word-to-text': '.doc,.docx,application/msword,application/vnd.openxmlformats-officedocument.wordprocessingml.document',
  'word-to-html': '.doc,.docx,application/msword,application/vnd.openxmlformats-officedocument.wordprocessingml.document',
  'word-to-pdf': '.doc,.docx,application/msword,application/vnd.openxmlformats-officedocument.wordprocessingml.document',
};

const MAX_FILE_SIZE = 50 * 1024 * 1024;

export function FileUploader({ initialType }: { initialType?: string }) {
  const [file, setFile] = useState<File | null>(null);
  const [type, setType] = useState(initialType || 'pdf-to-text');
  const [resizeWidth, setResizeWidth] = useState('1200');
  const [resizeHeight, setResizeHeight] = useState('');
  const [resizeFit, setResizeFit] = useState('inside');
  const [resizeFormat, setResizeFormat] = useState('png');
  const [allowEnlarge, setAllowEnlarge] = useState(false);
  const [status, setStatus] = useState<'idle' | 'uploading' | 'processing' | 'success' | 'error'>('idle');
  const [error, setError] = useState<string | null>(null);
  const [downloadUrl, setDownloadUrl] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  React.useEffect(() => {
    if (initialType) {
      setType(initialType);
    }
  }, [initialType]);

  const resetForFile = (nextFile: File) => {
    if (nextFile.size > MAX_FILE_SIZE) {
      setStatus('error');
      setError('File is too large. Please upload a file smaller than 50MB.');
      return;
    }

    setFile(nextFile);
    setStatus('idle');
    setError(null);
    setDownloadUrl(null);
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      resetForFile(e.target.files[0]);
    }
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      resetForFile(e.dataTransfer.files[0]);
    }
  };

  const handleConvert = async () => {
    if (!file) return;

    setStatus('processing');
    setError(null);

    const formData = new FormData();
    formData.append('file', file);
    formData.append('type', type);

    if (type === 'image-resize') {
      formData.append('width', resizeWidth);
      formData.append('height', resizeHeight);
      formData.append('fit', resizeFit);
      formData.append('format', resizeFormat);
      formData.append('allowEnlarge', String(allowEnlarge));
    }

    try {
      const backendUrl = `${process.env.NEXT_PUBLIC_API_URL || '/api'}/convert`;
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
    } catch (err: unknown) {
      console.error(err);
      setError(err instanceof Error ? err.message : 'Something went wrong. Please try again.');
      setStatus('error');
    }
  };

  return (
    <div className="w-full max-w-2xl mx-auto space-y-6">
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="rounded-xl border border-zinc-200 bg-white p-5 shadow-xl shadow-zinc-200/60 dark:border-zinc-800 dark:bg-zinc-900 dark:shadow-black/20 md:p-6"
      >
        <div className="space-y-6">
          <div>
            <h2 className="text-xl font-bold text-zinc-950 dark:text-white">Start converting now</h2>
            <p className="mt-1 text-sm text-zinc-500 dark:text-zinc-400">Select a file and output type. No account needed.</p>
          </div>

          <div
            onDragOver={(e) => e.preventDefault()}
            onDrop={handleDrop}
            onClick={() => fileInputRef.current?.click()}
            className={`cursor-pointer group relative flex min-h-44 flex-col items-center justify-center rounded-lg border-2 border-dashed p-6 text-center transition-all ${
              file 
                ? 'border-indigo-400 bg-indigo-50 dark:bg-indigo-950/30' 
                : 'border-zinc-300 dark:border-zinc-700 hover:border-indigo-400 dark:hover:border-indigo-500'
            }`}
          >
            <input 
              type="file" 
              ref={fileInputRef} 
              onChange={handleFileChange} 
              accept={ACCEPT_BY_TYPE[type]}
              className="hidden" 
            />
            <div className="mb-4 rounded-full bg-indigo-600/10 p-4 transition-transform group-hover:scale-105 dark:bg-indigo-500/10">
              {file ? <File className="h-8 w-8 text-indigo-600 dark:text-indigo-400" /> : <Upload className="h-8 w-8 text-indigo-600 dark:text-indigo-400" />}
            </div>
            <p className="max-w-full break-words text-base font-semibold text-zinc-900 dark:text-zinc-100">
              {file ? file.name : 'Click or Drag & Drop File'}
            </p>
            <p className="text-sm text-zinc-500 mt-1">
              Supports PDF, Word, JPG, PNG, WebP and GIF up to 50MB
            </p>
          </div>

          <div className="space-y-4">
            <label className="text-sm font-semibold text-zinc-700 dark:text-zinc-300 block">Select conversion type</label>
            {CATEGORIES.map((category) => (
              <div key={category} className="space-y-2">
                <h3 className="text-xs font-semibold text-zinc-600 dark:text-zinc-400 uppercase tracking-wide">{category}</h3>
                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-2">
                  {CONVERSION_TYPES.filter(t => t.category === category).map((t) => (
                    <button
                      key={t.id}
                      onClick={() => setType(t.id)}
                      className={`min-h-20 rounded-lg p-3 text-center text-sm font-semibold transition-all ${
                        type === t.id
                          ? 'bg-indigo-600 text-white shadow-lg shadow-indigo-600/25'
                          : 'border border-zinc-200 bg-white text-zinc-900 hover:border-indigo-400 hover:bg-indigo-50 dark:border-zinc-700 dark:bg-zinc-800 dark:text-zinc-100 dark:hover:bg-zinc-700'
                      }`}
                    >
                      <div className={`mx-auto mb-1 flex h-7 min-w-10 items-center justify-center rounded px-1 text-[9px] font-black ${type === t.id ? 'bg-white/15 text-white' : 'bg-zinc-100 text-zinc-600 dark:bg-zinc-900 dark:text-zinc-300'}`}>{t.icon}</div>
                      <div>{t.label}</div>
                    </button>
                  ))}
                </div>
              </div>
            ))}
          </div>

          {type === 'image-resize' && (
            <div className="space-y-4 rounded-lg border border-zinc-200 bg-zinc-50 p-4 dark:border-zinc-800 dark:bg-zinc-950/40">
              <div className="grid gap-3 md:grid-cols-2">
                <label className="space-y-1">
                  <span className="block text-xs font-semibold text-zinc-600 dark:text-zinc-400">Width</span>
                  <input
                    type="number"
                    min="1"
                    inputMode="numeric"
                    value={resizeWidth}
                    onChange={(e) => setResizeWidth(e.target.value)}
                    className="w-full rounded-lg border border-zinc-300 bg-white px-3 py-2 text-sm text-zinc-950 outline-none transition focus:border-indigo-500 dark:border-zinc-700 dark:bg-zinc-900 dark:text-white"
                    placeholder="1200"
                  />
                </label>
                <label className="space-y-1">
                  <span className="block text-xs font-semibold text-zinc-600 dark:text-zinc-400">Height</span>
                  <input
                    type="number"
                    min="1"
                    inputMode="numeric"
                    value={resizeHeight}
                    onChange={(e) => setResizeHeight(e.target.value)}
                    className="w-full rounded-lg border border-zinc-300 bg-white px-3 py-2 text-sm text-zinc-950 outline-none transition focus:border-indigo-500 dark:border-zinc-700 dark:bg-zinc-900 dark:text-white"
                    placeholder="Auto"
                  />
                </label>
              </div>

              <div className="grid gap-3 md:grid-cols-2">
                <label className="space-y-1">
                  <span className="block text-xs font-semibold text-zinc-600 dark:text-zinc-400">Fit</span>
                  <select
                    value={resizeFit}
                    onChange={(e) => setResizeFit(e.target.value)}
                    className="w-full rounded-lg border border-zinc-300 bg-white px-3 py-2 text-sm text-zinc-950 outline-none transition focus:border-indigo-500 dark:border-zinc-700 dark:bg-zinc-900 dark:text-white"
                  >
                    <option value="inside">Keep aspect ratio</option>
                    <option value="cover">Crop to exact size</option>
                    <option value="contain">Pad to exact size</option>
                    <option value="fill">Stretch to exact size</option>
                  </select>
                </label>
                <label className="space-y-1">
                  <span className="block text-xs font-semibold text-zinc-600 dark:text-zinc-400">Format</span>
                  <select
                    value={resizeFormat}
                    onChange={(e) => setResizeFormat(e.target.value)}
                    className="w-full rounded-lg border border-zinc-300 bg-white px-3 py-2 text-sm text-zinc-950 outline-none transition focus:border-indigo-500 dark:border-zinc-700 dark:bg-zinc-900 dark:text-white"
                  >
                    <option value="png">PNG</option>
                    <option value="jpg">JPG</option>
                    <option value="webp">WebP</option>
                  </select>
                </label>
              </div>

              <label className="flex items-center gap-2 text-sm font-medium text-zinc-700 dark:text-zinc-300">
                <input
                  type="checkbox"
                  checked={allowEnlarge}
                  onChange={(e) => setAllowEnlarge(e.target.checked)}
                  className="h-4 w-4 rounded border-zinc-300 text-indigo-600 focus:ring-indigo-500"
                />
                Allow enlargement
              </label>
            </div>
          )}

          <div className="pt-4">
            <button
              onClick={handleConvert}
              disabled={!file || status === 'processing'}
              className="flex w-full items-center justify-center gap-2 rounded-lg bg-indigo-600 px-6 py-3 font-bold text-white shadow-lg shadow-indigo-600/20 transition-all hover:bg-indigo-700 active:scale-[0.98] disabled:cursor-not-allowed disabled:bg-zinc-400"
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
            className="flex flex-col items-center justify-between gap-4 rounded-lg border border-emerald-200 bg-emerald-50 p-6 dark:border-emerald-800/50 dark:bg-emerald-900/10 md:flex-row"
          >
            <div className="flex items-center gap-3">
              <CheckCircle2 className="h-8 w-8 text-emerald-600 dark:text-emerald-400" />
              <div>
                <h3 className="font-bold text-emerald-900 dark:text-emerald-100">Ready to download!</h3>
                <p className="text-sm text-emerald-700 dark:text-emerald-400">Your file has been converted successfully.</p>
              </div>
            </div>
            <a
              href={downloadUrl}
              download={`converted-file.${
                type.includes('to-word') ? 'docx' : 
                type.includes('to-text') ? 'txt' : 
                type === 'image-resize' ? (resizeFormat === 'jpeg' ? 'jpg' : resizeFormat) :
                type.split('-to-')[1]
              }`}
              className="flex w-full items-center justify-center gap-2 rounded-lg bg-emerald-600 px-8 py-3 font-bold text-white shadow-lg shadow-emerald-600/20 transition-all hover:bg-emerald-700 md:w-auto"
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
            className="flex items-center gap-4 rounded-lg border border-rose-200 bg-rose-50 p-6 dark:border-rose-800/50 dark:bg-rose-900/10"
          >
            <AlertCircle className="h-8 w-8 text-rose-600 dark:text-rose-400" />
            <div>
              <h3 className="font-bold text-rose-900 dark:text-rose-100">Error</h3>
              <p className="text-sm text-rose-700 dark:text-rose-400">{error}</p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
