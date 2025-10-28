'use client';

import { useState } from 'react';
import Link from 'next/link';

export default function GenerateLinkPage() {
  const [clientName, setClientName] = useState('');
  const [generatedLink, setGeneratedLink] = useState('');
  const [copied, setCopied] = useState(false);
  
  // Get base URL directly, it will be empty during SSR and populated on client
  const baseUrl = typeof window !== 'undefined' ? window.location.origin : '';

  const generateLink = () => {
    if (clientName.trim()) {
      const link = `${baseUrl}/?name=${encodeURIComponent(clientName.trim())}`;
      setGeneratedLink(link);
      setCopied(false);
    }
  };

  const copyToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(generatedLink);
      setCopied(true);
      setTimeout(() => setCopied(false), 3000);
    } catch (err) {
      console.error('Failed to copy:', err);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      generateLink();
    }
  };

  return (
    <div className="min-h-screen bg-linear-to-br from-rose-50 via-pink-50 to-rose-100">
      {/* Decorative background */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-20 -left-20 h-40 w-40 rounded-full bg-rose-200/30 blur-3xl sm:-top-40 sm:-left-40 sm:h-80 sm:w-80"></div>
        <div className="absolute -bottom-20 -right-20 h-40 w-40 rounded-full bg-pink-200/30 blur-3xl sm:-bottom-40 sm:-right-40 sm:h-80 sm:w-80"></div>
      </div>

      <div className="relative z-10 flex min-h-screen items-center justify-center px-4 py-12 sm:px-6 sm:py-20">
        <div className="w-full max-w-2xl">
          {/* Header */}
          <div className="mb-6 text-center sm:mb-8">
            <h1 className="khmer-title mb-3 text-3xl text-rose-900 sm:mb-4 sm:text-4xl md:text-5xl lg:text-6xl">
              បង្កើតតំណភ្ជាប់
            </h1>
            <p className="khmer-body text-lg text-rose-800 sm:text-xl">Generate Invitation Link</p>
            <p className="khmer-body mt-2 text-sm text-rose-600 sm:text-base">
              បញ្ចូលឈ្មោះភ្ញៀវ ហើយចែករំលែកតំណភ្ជាប់ទៅគេ
            </p>
          </div>

          {/* Main Card */}
          <div className="rounded-xl bg-white p-5 shadow-2xl sm:rounded-2xl sm:p-8 md:p-10">
            {/* Input Section */}
            <div className="mb-6 sm:mb-8">
              <label htmlFor="clientName" className="khmer-body mb-2 block text-base font-medium text-rose-900 sm:mb-3 sm:text-lg">
                ឈ្មោះភ្ញៀវ / Guest Name
              </label>
              <input
                id="clientName"
                type="text"
                value={clientName}
                onChange={(e) => setClientName(e.target.value)}
                onKeyPress={handleKeyPress}
                placeholder="បញ្ចូលឈ្មោះភ្ញៀវ..."
                className="khmer-body w-full rounded-lg border-2 border-rose-200 px-3 py-2.5 text-base text-rose-900 placeholder-rose-300 transition-all focus:border-rose-500 focus:outline-none focus:ring-2 focus:ring-rose-200 sm:px-4 sm:py-3 sm:text-lg"
              />
            </div>

            {/* Generate Button */}
            <button
              onClick={generateLink}
              disabled={!clientName.trim()}
              className="khmer-body w-full rounded-full bg-gradient-to-r from-rose-500 to-pink-500 px-6 py-3 text-base font-medium text-white shadow-lg transition-all hover:scale-105 hover:shadow-xl disabled:cursor-not-allowed disabled:opacity-50 disabled:hover:scale-100 sm:px-8 sm:py-4 sm:text-lg"
            >
              🔗 បង្កើតតំណភ្ជាប់ / Generate Link
            </button>

            {/* Generated Link Display */}
            {generatedLink && (
              <div className="mt-6 animate-fade-in sm:mt-8">
                <label className="khmer-body mb-2 block text-base font-medium text-rose-900 sm:mb-3 sm:text-lg">
                  តំណភ្ជាប់របស់អ្នក / Your Link
                </label>
                <div className="flex flex-col gap-2.5 sm:flex-row sm:gap-3">
                  <input
                    type="text"
                    value={generatedLink}
                    readOnly
                    className="flex-1 rounded-lg border-2 border-rose-200 bg-rose-50 px-3 py-2.5 text-xs text-rose-900 focus:outline-none sm:px-4 sm:py-3 sm:text-sm md:text-base"
                    onClick={(e) => e.currentTarget.select()}
                  />
                  <button
                    onClick={copyToClipboard}
                    className="khmer-body whitespace-nowrap rounded-lg bg-rose-600 px-4 py-2.5 text-sm text-white transition-all hover:bg-rose-700 sm:px-6 sm:py-3 sm:text-base"
                  >
                    {copied ? '✓ ចម្លង!' : '📋 ចម្លង'}
                    <span className="hidden sm:inline"> / {copied ? 'Copied!' : 'Copy'}</span>
                  </button>
                </div>

                {/* Preview Link */}
                <div className="mt-3 sm:mt-4">
                  <a
                    href={generatedLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="khmer-body inline-flex items-center gap-1.5 text-sm text-rose-600 transition-colors hover:text-rose-800 sm:gap-2 sm:text-base"
                  >
                    👁️ មើលមុន / Preview →
                  </a>
                </div>
              </div>
            )}

            {/* Success Message */}
            {copied && (
              <div className="mt-4 animate-fade-in rounded-lg bg-green-50 p-3 text-center sm:mt-6 sm:p-4">
                <p className="khmer-body text-sm text-green-800 sm:text-base">
                  ✓ តំណភ្ជាប់ត្រូវបានចម្លង!
                  <br className="sm:hidden" />
                  <span className="hidden sm:inline"><br /></span>
                  Link copied successfully!
                </p>
              </div>
            )}
          </div>

          {/* Instructions */}
          <div className="mt-6 rounded-xl bg-white/80 p-4 shadow-lg backdrop-blur-sm sm:mt-8 sm:p-6">
            <h3 className="khmer-elegant mb-3 text-lg font-semibold text-rose-900 sm:mb-4 sm:text-xl">
              របៀបប្រើប្រាស់ / How to Use
            </h3>
            <ol className="khmer-body space-y-1.5 text-sm text-rose-800 sm:space-y-2 sm:text-base">
              <li>1. បញ្ចូលឈ្មោះភ្ញៀវរបស់អ្នក / Enter your guest&apos;s name</li>
              <li>2. ចុចប៊ូតុង &quot;បង្កើតតំណភ្ជាប់&quot; / Click &quot;Generate Link&quot;</li>
              <li>3. ចម្លងតំណភ្ជាប់ / Copy the generated link</li>
              <li>4. ចែករំលែកតំណភ្ជាប់ទៅភ្ញៀវរបស់អ្នក / Share the link with your guest</li>
            </ol>
          </div>

          {/* Example Links */}
          <div className="mt-4 rounded-xl bg-white/80 p-4 shadow-lg backdrop-blur-sm sm:mt-6 sm:p-6">
            <h3 className="khmer-elegant mb-3 text-lg font-semibold text-rose-900 sm:mb-4 sm:text-xl">
              ឧទាហរណ៍ / Examples
            </h3>
            <div className="khmer-body space-y-2.5 text-xs text-rose-700 sm:space-y-3 sm:text-sm">
              <div className="break-all rounded-lg bg-rose-50 p-2.5 sm:p-3">
                <strong className="block sm:inline">ឈ្មោះ / Name:</strong> លោក សុខ សំណាង<br className="sm:hidden" />
                <strong className="mt-1 block sm:mt-0 sm:inline">Link:</strong> <code className="text-[10px] sm:text-xs">{baseUrl}/?name=លោក សុខ សំណាង</code>
              </div>
              <div className="break-all rounded-lg bg-rose-50 p-2.5 sm:p-3">
                <strong className="block sm:inline">ឈ្មោះ / Name:</strong> Ms. Meey Lii & Honey<br className="sm:hidden" />
                <strong className="mt-1 block sm:mt-0 sm:inline">Link:</strong> <code className="text-[10px] sm:text-xs">{baseUrl}/?name=Ms. Meey Lii & Honey</code>
              </div>
            </div>
          </div>

          {/* Navigation */}
          <div className="mt-6 flex flex-col gap-3 sm:mt-8 sm:flex-row sm:justify-center sm:gap-4">
            <Link
              href="/"
              className="khmer-body rounded-full border-2 border-rose-500 px-5 py-2.5 text-center text-sm text-rose-500 transition-all hover:bg-rose-50 sm:px-6 sm:py-3 sm:text-base"
            >
              ← ទៅទំព័រដើម / Home
            </Link>
            <Link
              href="/invitation"
              className="khmer-body rounded-full bg-rose-500 px-5 py-2.5 text-center text-sm text-white transition-all hover:bg-rose-600 sm:px-6 sm:py-3 sm:text-base"
            >
              មើលធៀប / View Invitation →
            </Link>
          </div>
        </div>
      </div>

      {/* Additional CSS for animations */}
      <style jsx>{`
        @keyframes fade-in {
          from {
            opacity: 0;
            transform: translateY(-10px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        .animate-fade-in {
          animation: fade-in 0.3s ease-out;
        }
      `}</style>
    </div>
  );
}
