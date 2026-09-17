import React, { useState } from 'react';
import { ArrowRight, CheckCircle2, Mail } from 'lucide-react';

interface NewsletterSectionProps {
  onSubscribed?: (email: string) => void;
}

export const NewsletterSection: React.FC<NewsletterSectionProps> = ({ onSubscribed }) => {
  const [email, setEmail] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (email.trim()) {
      setSubmitted(true);
      if (onSubscribed) onSubscribed(email);
    }
  };

  return (
    <section className="py-20 bg-[#1a1715] text-[#fbf9f5]">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <div className="inline-flex p-3 rounded-full bg-stone-800 text-[#c07a46] mb-4">
          <Mail className="w-6 h-6 stroke-[1.5]" />
        </div>

        <h2 className="font-serif text-3xl sm:text-4xl font-bold tracking-tight text-white mb-2">
          Join the Inner Circle
        </h2>

        {/* Exactly one offer line */}
        <p className="text-xs sm:text-sm text-stone-300 max-w-md mx-auto mb-8 leading-relaxed">
          Get ₹500 off your inaugural order and preview small-batch seasonal releases before public drop.
        </p>

        {submitted ? (
          <div className="bg-stone-800/80 border border-stone-700 p-4 rounded-lg inline-flex items-center space-x-3 text-sm text-white">
            <CheckCircle2 className="w-5 h-5 text-[#c07a46]" />
            <span>
              Welcome! Use code <strong className="font-mono text-[#c07a46]">FIRST500</strong> at checkout for ₹500 off.
            </span>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="max-w-md mx-auto flex flex-col sm:flex-row gap-2">
            <input
              type="email"
              required
              placeholder="Enter your email address"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="flex-1 px-4 py-3 bg-stone-900 border border-stone-700 rounded text-xs text-white placeholder-stone-400 focus:outline-none focus:border-[#c07a46]"
            />
            <button
              type="submit"
              className="px-6 py-3 bg-[#c07a46] hover:bg-[#aa6533] text-white text-xs font-semibold uppercase tracking-wider rounded transition-colors flex items-center justify-center space-x-1.5"
            >
              <span>Subscribe</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </form>
        )}

        <p className="text-[11px] text-stone-500 mt-4">
          No spam. Only handcrafted releases, dispatch updates, and leather care notes twice a month.
        </p>
      </div>
    </section>
  );
};
