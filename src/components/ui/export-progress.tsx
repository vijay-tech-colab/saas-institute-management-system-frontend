import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FileText, DownloadCloud, CheckCircle2, XCircle, AlertCircle, FileDown, X, Loader2 } from 'lucide-react';
import { createPortal } from 'react-dom';
import { Tooltip, TooltipTrigger, TooltipContent, TooltipProvider } from '@/components/ui/tooltip';

interface ExportProgressModalProps {
  isOpen: boolean;
  onClose: () => void;
  type?: 'export' | 'report' | string;
  format?: 'pdf' | 'excel' | 'csv' | string;
  title?: string;
  totalRows?: number;
}

export function ExportProgressModal({
  isOpen,
  onClose,
  type = 'export',
  format,
  title = type === 'export' ? 'Exporting Data' : 'Generating Report',
  totalRows = 100
}: ExportProgressModalProps) {
  const [progress, setProgress] = useState(0);
  const [status, setStatus] = useState<string>('Initializing...');
  const [isComplete, setIsComplete] = useState(false);
  const [isError, setIsError] = useState(false);
  const [mounted, setMounted] = useState(false);
  const [eta, setEta] = useState<number>(0);
  const [speed, setSpeed] = useState<number>(0);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (!isOpen) {
      setTimeout(() => {
        setProgress(0);
        setStatus('Initializing...');
        setIsComplete(false);
        setIsError(false);
      }, 300); // Reset after exit animation
      return;
    }

    let currentProgress = 0;
    const startTime = Date.now();

    // Realistic simulation timings
    const interval = setInterval(() => {
      // Simulate variable network/processing speed
      const jump = Math.random() * 8 + 2;
      currentProgress += jump;

      if (currentProgress > 100) {
        currentProgress = 100;
        clearInterval(interval);
        setIsComplete(true);
        setStatus('Ready for download');
        setEta(0);
        setSpeed(0);
      } else {
        // Update status text based on progress
        if (currentProgress < 20) setStatus('Gathering data...');
        else if (currentProgress < 50) setStatus('Processing rows...');
        else if (currentProgress < 80) {
          if (format === 'pdf' || type === 'report') setStatus('Rendering PDF layout...');
          else if (format === 'excel') setStatus('Generating Excel workbook...');
          else setStatus('Formatting CSV...');
        }
        else setStatus('Finalizing document...');

        // Calculate advanced metrics
        const elapsedSec = (Date.now() - startTime) / 1000;
        const progressRatio = currentProgress / 100;
        const totalEstimatedTime = elapsedSec / progressRatio;
        const remainingTime = Math.max(0, totalEstimatedTime - elapsedSec);

        setEta(Math.ceil(remainingTime));

        // Mock processing speed (rows per second)
        const rowsProcessed = Math.floor(progressRatio * totalRows);
        setSpeed(Math.floor(rowsProcessed / (elapsedSec || 1)));
      }

      setProgress(currentProgress);
    }, 500);

    return () => clearInterval(interval);
  }, [isOpen, type, format, totalRows]);

  const Icon = format === 'pdf' || type === 'report' ? FileText : DownloadCloud;
  const processedRows = Math.floor((progress / 100) * totalRows);

  if (!mounted) return null;

  return createPortal(
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Floating Advanced Widget */}
          <motion.div
            initial={{ opacity: 0, y: 50, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 50, scale: 0.95 }}
            transition={{ type: 'spring', damping: 25, stiffness: 300 }}
            className="fixed bottom-6 right-6 z-50 w-full max-w-[320px]"
          >
            <div className="bg-white rounded-lg shadow-[0_8px_30px_rgb(0,0,0,0.12)] border border-slate-200 overflow-hidden relative flex flex-col">
              
              <div className="p-3 flex items-center gap-3">
                {/* Icon */}
                <div className={`relative w-8 h-8 rounded-md flex items-center justify-center shrink-0 shadow-sm border ${
                  isError ? 'bg-rose-50 text-rose-600 border-rose-100' :
                  isComplete ? 'bg-emerald-50 text-emerald-600 border-emerald-100' :
                  'bg-indigo-50 text-indigo-600 border-indigo-100'
                }`}>
                  {isError ? <AlertCircle className="w-4 h-4" /> :
                   isComplete ? <CheckCircle2 className="w-4 h-4" /> :
                   <Icon className="w-4 h-4" />}
                </div>

                {/* Text Content */}
                <div className="flex-1 min-w-0">
                  <h3 className="text-sm font-bold text-slate-900 leading-tight truncate">
                    {isComplete ? 'Download Ready' : title}
                  </h3>
                  <div className="flex items-center justify-between text-[11px] text-slate-500 mt-0.5">
                    <span className="truncate pr-2">
                      {isError ? 'An error occurred' : isComplete ? 'Click icon to download' : status}
                    </span>
                    {!isComplete && !isError && (
                      <span className="font-semibold text-indigo-600 shrink-0">
                        {Math.round(progress)}%
                      </span>
                    )}
                  </div>
                </div>

                {/* Action Buttons */}
                <TooltipProvider delayDuration={200}>
                  <div className="shrink-0 flex items-center gap-1 ml-2">
                    {isComplete && (
                      <Tooltip>
                        <TooltipTrigger asChild>
                          <button
                            onClick={onClose}
                            className="p-1.5 bg-emerald-100 text-emerald-700 hover:bg-emerald-200 hover:text-emerald-800 rounded-md transition-colors"
                          >
                            <FileDown className="w-4 h-4" />
                          </button>
                        </TooltipTrigger>
                        <TooltipContent side="top">
                          <p>Download File</p>
                        </TooltipContent>
                      </Tooltip>
                    )}

                    <Tooltip>
                      <TooltipTrigger asChild>
                        <button
                          onClick={onClose}
                          className={`p-1.5 rounded-md transition-colors ${
                            isError ? 'bg-rose-100 text-rose-700 hover:bg-rose-200 hover:text-rose-800' :
                            'text-slate-400 hover:text-slate-600 hover:bg-slate-100'
                          }`}
                        >
                          <X className="w-4 h-4" />
                        </button>
                      </TooltipTrigger>
                      <TooltipContent side="top">
                        <p>{isComplete ? 'Close' : isError ? 'Dismiss' : 'Cancel'}</p>
                      </TooltipContent>
                    </Tooltip>
                  </div>
                </TooltipProvider>
              </div>

              {/* Ultra Thin Progress Line */}
              <div className="h-1 w-full bg-slate-100">
                <motion.div
                  className={`h-full ${
                    isError ? 'bg-rose-500' :
                    isComplete ? 'bg-emerald-500' :
                    'bg-indigo-500'
                  }`}
                  initial={{ width: 0 }}
                  animate={{ width: `${progress}%` }}
                  transition={{ ease: "linear", duration: 0.5 }}
                />
              </div>

            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>,
    document.body
  );
}
