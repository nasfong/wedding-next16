'use client';

import { useState } from 'react';
import Link from 'next/link';

export default function GenerateLinkPage() {
  const [clientName, setClientName] = useState('');
  const [generatedLink, setGeneratedLink] = useState('');
  const [copied, setCopied] = useState(false);

  const generateLink = () => {
    if (clientName.trim()) {
      const baseUrl = typeof window !== 'undefined' ? window.location.origin : '';
      const cleanName = clientName.trim().replace(/\s+/g, '-').toLowerCase();
      const link = `${baseUrl}/home/${encodeURIComponent(cleanName)}`;
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
    <div className="min-h-screen bg-gradient-to-br from-rose-50 via-pink-50 to-rose-100">
      {/* Decorative background */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 -left-40 h-80 w-80 rounded-full bg-rose-200/30 blur-3xl"></div>
        <div className="absolute -bottom-40 -right-40 h-80 w-80 rounded-full bg-pink-200/30 blur-3xl"></div>
      </div>

      <div className="relative z-10 flex min-h-screen items-center justify-center px-6 py-20">
        <div className="w-full max-w-2xl">
          {/* Header */}
          <div className="mb-8 text-center">
            <h1 className="khmer-title mb-4 text-4xl text-rose-900 md:text-5xl">
              បង្កើតតំណភ្ជាប់
            </h1>
            <p className="khmer-body text-xl text-rose-800">Generate Invitation Link</p>
            <p className="khmer-body mt-2 text-base text-rose-600">
              បញ្ចូលឈ្មោះភ្ញៀវ ហើយចែករំលែកតំណភ្ជាប់ទៅគេ
            </p>
          </div>

          {/* Main Card */}
          <div className="rounded-2xl bg-white p-8 shadow-2xl md:p-10">
            {/* Input Section */}
            <div className="mb-8">
              <label htmlFor="clientName" className="khmer-body mb-3 block text-lg font-medium text-rose-900">
                ឈ្មោះភ្ញៀវ / Guest Name
              </label>
              <input
                id="clientName"
                type="text"
                value={clientName}
                onChange={(e) => setClientName(e.target.value)}
                onKeyPress={handleKeyPress}
                placeholder="បញ្ចូលឈ្មោះភ្ញៀវ... (e.g., លោក សុខ សំណាង)"
                className="khmer-body w-full rounded-lg border-2 border-rose-200 px-4 py-3 text-lg text-rose-900 placeholder-rose-300 transition-all focus:border-rose-500 focus:outline-none focus:ring-2 focus:ring-rose-200"
              />
            </div>

            {/* Generate Button */}
            <button
              onClick={generateLink}
              disabled={!clientName.trim()}
              className="khmer-body w-full rounded-full bg-gradient-to-r from-rose-500 to-pink-500 px-8 py-4 text-lg font-medium text-white shadow-lg transition-all hover:scale-105 hover:shadow-xl disabled:cursor-not-allowed disabled:opacity-50 disabled:hover:scale-100"
            >
              🔗 បង្កើតតំណភ្ជាប់ / Generate Link
            </button>

            {/* Generated Link Display */}
            {generatedLink && (
              <div className="mt-8 animate-fade-in">
                <label className="khmer-body mb-3 block text-lg font-medium text-rose-900">
                  តំណភ្ជាប់របស់អ្នក / Your Link
                </label>
                <div className="flex flex-col gap-3 sm:flex-row">
                  <input
                    type="text"
                    value={generatedLink}
                    readOnly
                    className="flex-1 rounded-lg border-2 border-rose-200 bg-rose-50 px-4 py-3 text-sm text-rose-900 focus:outline-none sm:text-base"
                    onClick={(e) => e.currentTarget.select()}
                  />
                  <button
                    onClick={copyToClipboard}
                    className="khmer-body rounded-lg bg-rose-600 px-6 py-3 text-white transition-all hover:bg-rose-700"
                  >
                    {copied ? '✓ ចម្លង! / Copied!' : '📋 ចម្លង / Copy'}
                  </button>
                </div>

                {/* Preview Link */}
                <div className="mt-4">
                  <a
                    href={generatedLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="khmer-body inline-flex items-center gap-2 text-rose-600 transition-colors hover:text-rose-800"
                  >
                    👁️ មើលមុន / Preview Link →
                  </a>
                </div>
              </div>
            )}

            {/* Success Message */}
            {copied && (
              <div className="mt-6 animate-fade-in rounded-lg bg-green-50 p-4 text-center">
                <p className="khmer-body text-green-800">
                  ✓ តំណភ្ជាប់ត្រូវបានចម្លងទៅក្ដារតម្បៀតខ្ទាស់!
                  <br />
                  Link copied to clipboard successfully!
                </p>
              </div>
            )}
          </div>

          {/* Instructions */}
          <div className="mt-8 rounded-xl bg-white/80 p-6 shadow-lg backdrop-blur-sm">
            <h3 className="khmer-elegant mb-4 text-xl font-semibold text-rose-900">
              របៀបប្រើប្រាស់ / How to Use
            </h3>
            <ol className="khmer-body space-y-2 text-rose-800">
              <li>1. បញ្ចូលឈ្មោះភ្ញៀវរបស់អ្នក / Enter your guest's name</li>
              <li>2. ចុចប៊ូតុង "បង្កើតតំណភ្ជាប់" / Click "Generate Link"</li>
              <li>3. ចម្លងតំណភ្ជាប់ / Copy the generated link</li>
              <li>4. ចែករំលែកតំណភ្ជាប់ទៅភ្ញៀវរបស់អ្នក / Share the link with your guest</li>
            </ol>
          </div>

          {/* Example Links */}
          <div className="mt-6 rounded-xl bg-white/80 p-6 shadow-lg backdrop-blur-sm">
            <h3 className="khmer-elegant mb-4 text-xl font-semibold text-rose-900">
              ឧទាហរណ៍ / Examples
            </h3>
            <div className="khmer-body space-y-3 text-sm text-rose-700">
              <div className="rounded-lg bg-rose-50 p-3">
                <strong>ឈ្មោះ / Name:</strong> លោក សុខ សំណាង<br />
                <strong>Link:</strong> <code className="text-xs">/home/លោក-សុខ-សំណាង</code>
              </div>
              <div className="rounded-lg bg-rose-50 p-3">
                <strong>ឈ្មោះ / Name:</strong> Ms. Meey Lii & Honey<br />
                <strong>Link:</strong> <code className="text-xs">/home/ms-meey-lii-&-honey</code>
              </div>
            </div>
          </div>

          {/* Navigation */}
          <div className="mt-8 flex justify-center gap-4">
            <Link
              href="/"
              className="khmer-body rounded-full border-2 border-rose-500 px-6 py-3 text-rose-500 transition-all hover:bg-rose-50"
            >
              ← ទៅទំព័រដើម / Home
            </Link>
            <Link
              href="/invitation"
              className="khmer-body rounded-full bg-rose-500 px-6 py-3 text-white transition-all hover:bg-rose-600"
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
