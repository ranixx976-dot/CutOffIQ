import React, { useState } from 'react';
import { ChevronDown, ChevronUp, Search, Sparkles } from 'lucide-react';

export const FaqView: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const faqs = [
    {
      q: 'What is vegetable tanning, and how does it differ from chrome-tanned leather?',
      a: 'Vegetable tanning is an ancient, 30-day artisanal process utilizing natural plant tannins (crushed mimosa bark, chestnut oils, and tara pods) rather than toxic heavy-metal chemicals. Over 90% of global leather goods are chrome-tanned in 24 hours using chromium salts that emit harsh fumes and cannot patina. Vegetable-tanned leather is non-toxic, hypoallergenic, smells rich and earthy, and develops a lustrous deep caramel patina as you carry it.'
    },
    {
      q: 'What happens if my leather piece gets wet in the rain?',
      a: 'Light raindrops will darken the leather temporarily. Do NOT use artificial heat (blow dryers or radiators), which will dry out the natural oils. Simply gently pat dry with a soft microfiber cloth and allow it to air-dry naturally at room temperature. Once dry, any water marks will blend smoothly into the leather’s natural patina within a few days of normal handling.'
    },
    {
      q: 'How do I treat surface scuffs or fingernail marks?',
      a: 'Authentic full-grain leather is rich in natural fats. Minor surface scuffs can frequently be erased simply by rubbing firmly with the warm pad of your clean thumb in circular motions; your skin heat redistributes the interior waxes. For deeper scuffs, apply a dime-sized amount of natural beeswax or petroleum-free leather balm with a cotton rag once every six months.'
    },
    {
      q: 'Will the complimentary monogram rub off over time?',
      a: 'No. We do not use cheap metallic foil paint or screen transfers that peel away. Our monogramming uses heated brass typefaces pressed under 200°C directly into the full-grain surface, creating a permanent, indelible blind deboss that remains crisp for generations.'
    },
    {
      q: 'What does the Veylora Lifetime Hardware Guarantee cover?',
      a: 'Our guarantee covers every mechanical metal fastener on your piece: solid antiqued brass press snaps, Chicago screws, rivets, key rings, and YKK Excella® zipper sliders. If a fastener ever breaks or detaches, our Jaipur workshop will repair or replace it free of charge for life.'
    },
    {
      q: 'Can I order custom corporate gifts for our leadership team or clients?',
      a: 'Yes. We curate bespoke corporate gift suites (minimum batch of 20 pieces) with personalized founder debossing, custom presentation boxes, and handwritten client greeting cards. Please reach out directly to concierge@veylora.com for corporate lookbooks and turnaround schedules.'
    }
  ];

  const filteredFaqs = faqs.filter(
    (f) =>
      f.q.toLowerCase().includes(searchTerm.toLowerCase()) ||
      f.a.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="py-12 bg-[#fbf9f5] min-h-screen">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
        
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto space-y-3">
          <span className="text-xs font-semibold uppercase tracking-[0.2em] text-[#c07a46]">
            Expert Care &amp; Knowledge
          </span>
          <h1 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold text-[#1a1715]">
            Frequently Asked Questions
          </h1>
          <p className="text-xs sm:text-sm text-stone-500">
            Everything you need to know about certified full-grain hide, everyday care rituals, and our lifetime guarantee.
          </p>

          {/* Search Box */}
          <div className="relative pt-4 max-w-md mx-auto">
            <Search className="w-4 h-4 text-stone-400 absolute left-3.5 top-7" />
            <input
              type="text"
              placeholder="Search by keyword (e.g. rain, scuff, monogram, warranty)..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2.5 bg-white border border-stone-300 rounded-lg text-xs text-[#1a1715] shadow-xs focus:outline-none focus:border-[#c07a46]"
            />
          </div>
        </div>

        {/* FAQs List */}
        <div className="bg-white rounded-xl border border-[#e6e2d8] shadow-xs divide-y divide-[#e6e2d8] overflow-hidden">
          {filteredFaqs.map((faq, idx) => (
            <div key={idx} className="p-6 transition-colors">
              <button
                onClick={() => setOpenIndex(openIndex === idx ? null : idx)}
                className="w-full flex items-center justify-between text-left font-serif text-base font-bold text-[#1a1715] hover:text-[#c07a46] transition-colors"
              >
                <span className="pr-4">{faq.q}</span>
                {openIndex === idx ? (
                  <ChevronUp className="w-4 h-4 text-[#c07a46] shrink-0" />
                ) : (
                  <ChevronDown className="w-4 h-4 text-stone-400 shrink-0" />
                )}
              </button>
              {openIndex === idx && (
                <div className="mt-3 text-xs text-stone-600 leading-relaxed pt-2 border-t border-stone-100">
                  {faq.a}
                </div>
              )}
            </div>
          ))}
        </div>

        {/* Assistance Prompt */}
        <div className="p-6 rounded-xl bg-amber-50/60 border border-amber-200/60 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs">
          <div className="flex items-center space-x-3">
            <Sparkles className="w-5 h-5 text-[#c07a46] shrink-0" />
            <div>
              <span className="font-bold text-amber-900 block">Have a specific care query?</span>
              <p className="text-amber-800">
                Our workshop leather specialists are available via WhatsApp or email for guidance.
              </p>
            </div>
          </div>
          <a
            href="mailto:concierge@veylora.com"
            className="px-4 py-2 bg-[#1a1715] text-white rounded text-xs font-semibold whitespace-nowrap hover:bg-[#c07a46] transition-colors"
          >
            Email Concierge
          </a>
        </div>

      </div>
    </div>
  );
};
