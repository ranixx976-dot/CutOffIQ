import React from 'react';
import { ShieldCheck, Truck, RotateCcw, Hammer } from 'lucide-react';

export const TrustStrip: React.FC = () => {
  const trustItems = [
    {
      icon: Hammer,
      title: 'Full-Grain Certified',
      description: 'LWG Gold-rated vegetable-tanned bovine hide that patinas gracefully.'
    },
    {
      icon: Truck,
      title: 'Fast Dispatch',
      description: 'Orders placed before 2 PM IST dispatch same day via BlueDart Air.'
    },
    {
      icon: RotateCcw,
      title: '7-Day Easy Returns',
      description: 'Doorstep exchange pickup service with zero interrogation.'
    },
    {
      icon: ShieldCheck,
      title: 'Lifetime Guarantee',
      description: 'Free lifetime repair on all solid brass rivets, snaps & YKK zips.'
    }
  ];

  return (
    <section className="bg-white border-b border-[#e6e2d8] py-8 sm:py-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8">
          {trustItems.map((item, idx) => (
            <div key={idx} className="flex items-start space-x-3.5">
              <div className="p-2.5 rounded-lg bg-[#fbf9f5] border border-[#e6e2d8] text-[#c07a46] shrink-0">
                <item.icon className="w-5 h-5 stroke-[1.75]" />
              </div>
              <div>
                <h4 className="text-xs font-bold uppercase tracking-wider text-[#1a1715]">
                  {item.title}
                </h4>
                <p className="text-xs text-stone-500 mt-0.5 leading-relaxed">
                  {item.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
