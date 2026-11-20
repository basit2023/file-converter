'use client';

import React, { useState, useRef } from 'react';
import { Upload, File, CheckCircle2, AlertCircle, Loader2, Download, ArrowRight } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { upload } from '@vercel/blob/client';
import Link from 'next/link';

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
  'word-to-text': '.docx,application/vnd.openxmlformats-officedocument.wordprocessingml.document',
  'word-to-html': '.docx,application/vnd.openxmlformats-officedocument.wordprocessingml.document',
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
  const [resultBlobUrl, setResultBlobUrl] = useState<string | null>(null);
  const [downloadFilename, setDownloadFilename] = useState('converted-file');
  const [uploadProgress, setUploadProgress] = useState(0);
  const fileInputRef = useRef<HTMLInputElement>(null);

  React.useEffect(() => {
    if (initialType) {
      setType(initialType);
    }
  }, [initialType]);

  const resetForFile = (nextFile: File) => {
    if ((type === 'word-to-html' || type === 'word-to-text') && !nextFile.name.toLowerCase().endsWith('.docx')) {
      setStatus('error');
      setError('Please use a DOCX file. Open older DOC files in Word or LibreOffice and save a DOCX copy first.');
      return;
    }
    if (nextFile.size > MAX_FILE_SIZE) {
      setStatus('error');
      setError('File is too large. Please upload a file smaller than 50MB.');
      return;
    }

    setFile(nextFile);
    setStatus('idle');
    setError(null);
    setDownloadUrl(null);
    if (resultBlobUrl) {
      void fetch('/api/cleanup', {
        method: 'POST',
        headers: { 'content-type': 'application/json' },
        body: JSON.stringify({ url: resultBlobUrl }),
      });
      setResultBlobUrl(null);
    }
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

    setStatus('uploading');
    setError(null);
    setUploadProgress(0);

    try {
      const safeName = file.name.replace(/[^a-zA-Z0-9._-]/g, '-');
      const uploaded = await upload(`inputs/${crypto.randomUUID()}-${safeName}`, file, {
        access: 'public',
        handleUploadUrl: '/api/upload',
        multipart: file.size >= 5 * 1024 * 1024,
        contentType: file.type || undefined,
        onUploadProgress: ({ percentage }) => setUploadProgress(Math.round(percentage)),
      });

      setStatus('processing');
      const response = await fetch('/api/convert', {
        method: 'POST',
        headers: { 'content-type': 'application/json' },
        body: JSON.stringify({
          sourceUrl: uploaded.url,
          sourceName: file.name,
          type,
          width: resizeWidth,
          height: resizeHeight,
          fit: resizeFit,
          format: resizeFormat,
          allowEnlarge,
        }),
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

      const result = await response.json() as { downloadUrl: string; blobUrl: string; filename: string };
      setDownloadUrl(result.downloadUrl);
      setResultBlobUrl(result.blobUrl);
      setDownloadFilename(result.filename);
      setStatus('success');
    } catch (err: unknown) {
      console.error(err);
      setError(err instanceof Error ? err.message : 'Something went wrong. Please try again.');
      setStatus('error');
    }
  };

  return (
    <div className="mx-auto w-full max-w-2xl space-y-6">
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="rounded-3xl border border-zinc-200/80 bg-white/95 p-5 shadow-2xl shadow-indigo-950/10 backdrop-blur dark:border-zinc-800 dark:bg-zinc-900/95 dark:shadow-black/30 md:p-7"
      >
        <div className="space-y-6">
          <div>
            <div className="flex items-center gap-2">
              <span className="h-2.5 w-2.5 rounded-full bg-emerald-500 shadow-[0_0_0_4px_rgba(16,185,129,0.12)]" />
              <h2 className="text-xl font-extrabold tracking-tight text-zinc-950 dark:text-white">Start converting now</h2>
            </div>
            <p className="mt-1.5 text-sm text-zinc-500 dark:text-zinc-400">Upload one file, choose the result, and download. No account needed.</p>
          </div>

          <div
            role="button"
            tabIndex={0}
            aria-label="Choose a file to convert"
            onKeyDown={(event) => {
              if (event.key === 'Enter' || event.key === ' ') {
                event.preventDefault();
                fileInputRef.current?.click();
              }
            }}
            onDragOver={(e) => e.preventDefault()}
            onDrop={handleDrop}
            onClick={() => fileInputRef.current?.click()}
            className={`group relative flex min-h-48 cursor-pointer flex-col items-center justify-center rounded-2xl border-2 border-dashed p-6 text-center transition-all ${
              file 
                ? 'border-indigo-400 bg-indigo-50 dark:bg-indigo-950/30' 
                : 'border-zinc-300 bg-zinc-50/70 hover:border-indigo-400 hover:bg-indigo-50/50 dark:border-zinc-700 dark:bg-zinc-950/40 dark:hover:border-indigo-500 dark:hover:bg-indigo-950/20'
            }`}
          >
            <input 
              type="file" 
              ref={fileInputRef} 
              onChange={handleFileChange} 
              accept={ACCEPT_BY_TYPE[type]}
              className="hidden" 
            />
            <div className="mb-4 rounded-2xl bg-indigo-600/10 p-4 transition-transform group-hover:-translate-y-1 group-hover:scale-105 dark:bg-indigo-500/10">
              {file ? <File className="h-8 w-8 text-indigo-600 dark:text-indigo-400" /> : <Upload className="h-8 w-8 text-indigo-600 dark:text-indigo-400" />}
            </div>
            <p className="max-w-full break-words text-base font-semibold text-zinc-900 dark:text-zinc-100">
              {file ? file.name : 'Drop your file here'}
            </p>
            <p className="text-sm text-zinc-500 mt-1">
              or click to browse · PDF, Word and images up to 50MB
            </p>
          </div>

          {initialType ? (
            <div className="rounded-xl border border-indigo-100 bg-indigo-50 p-4 dark:border-indigo-900 dark:bg-indigo-950/30">
              <p className="font-semibold">Selected: {CONVERSION_TYPES.find(tool => tool.id === type)?.label}</p>
              <p className="mt-1 text-sm text-zinc-600 dark:text-zinc-300">
                {type === 'word-to-html' || type === 'word-to-text'
                  ? 'Upload a DOCX file up to 50MB. Older DOC files must be saved as DOCX first.'
                  : 'Your conversion is already selected. Choose a file to get started.'}
              </p>
              <Link href="/tools" className="mt-2 inline-block text-sm font-semibold text-indigo-700 underline dark:text-indigo-300">Choose another tool</Link>
            </div>
          ) : <div className="space-y-4">
            <label className="text-sm font-semibold text-zinc-700 dark:text-zinc-300 block">Select conversion type</label>
            {CATEGORIES.map((category) => (
              <div key={category} className="space-y-2">
                <h3 className="text-xs font-semibold text-zinc-600 dark:text-zinc-400 uppercase tracking-wide">{category}</h3>
                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-2">
                  {CONVERSION_TYPES.filter(t => t.category === category).map((t) => (
                    <button
                      key={t.id}
                      onClick={() => setType(t.id)}
                      className={`min-h-20 rounded-xl p-3 text-center text-sm font-semibold transition-all ${
                        type === t.id
                          ? 'bg-indigo-600 text-white shadow-lg shadow-indigo-600/25'
                          : 'border border-zinc-200 bg-white text-zinc-900 hover:-translate-y-0.5 hover:border-indigo-400 hover:bg-indigo-50 dark:border-zinc-700 dark:bg-zinc-800 dark:text-zinc-100 dark:hover:bg-zinc-700'
                      }`}
                    >
                      <div className={`mx-auto mb-1 flex h-7 min-w-10 items-center justify-center rounded px-1 text-[9px] font-black ${type === t.id ? 'bg-white/15 text-white' : 'bg-zinc-100 text-zinc-600 dark:bg-zinc-900 dark:text-zinc-300'}`}>{t.icon}</div>
                      <div>{t.label}</div>
                    </button>
                  ))}
                </div>
              </div>
            ))}
          </div>}

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
              disabled={!file || status === 'uploading' || status === 'processing'}
              className="flex w-full items-center justify-center gap-2 rounded-lg bg-indigo-600 px-6 py-3 font-bold text-white shadow-lg shadow-indigo-600/20 transition-all hover:bg-indigo-700 active:scale-[0.98] disabled:cursor-not-allowed disabled:bg-zinc-400"
            >
              {status === 'uploading' || status === 'processing' ? (
                <>
                  <Loader2 className="h-5 w-5 animate-spin" />
                  {status === 'uploading' ? `Uploading${uploadProgress ? ` ${uploadProgress}%` : '...'}` : 'Converting...'}
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
              download={downloadFilename}
              onClick={() => {
                if (!resultBlobUrl) return;
                const url = resultBlobUrl;
                window.setTimeout(() => {
                  void fetch('/api/cleanup', {
                    method: 'POST',
                    headers: { 'content-type': 'application/json' },
                    body: JSON.stringify({ url }),
                    keepalive: true,
                  });
                }, 60_000);
              }}
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
