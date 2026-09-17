import React, { useState } from 'react';
import { Mail, Phone, MapPin, Clock, MessageSquare, CheckCircle2, ArrowRight } from 'lucide-react';

export const ContactView: React.FC = () => {
  const [submitted, setSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    subject: 'General Inquiries',
    orderId: '',
    message: ''
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <div className="py-12 bg-[#fbf9f5] min-h-screen">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        
        {/* Header */}
        <div className="max-w-2xl space-y-3">
          <span className="text-xs font-semibold uppercase tracking-[0.2em] text-[#c07a46]">
            Direct Concierge Access
          </span>
          <h1 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold text-[#1a1715]">
            Speak with the Workshop
          </h1>
          <p className="text-xs sm:text-sm text-stone-500">
            Have a question about leather provenance, bespoke monogramming, corporate orders, or warranty service? We respond within 4 business hours.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
          
          {/* Contact Details & Workshops (Col 5) */}
          <div className="lg:col-span-5 space-y-6">
            
            {/* Primary Details Card */}
            <div className="bg-white p-6 rounded-xl border border-[#e6e2d8] shadow-xs space-y-4 text-xs">
              <h3 className="font-serif text-lg font-bold text-[#1a1715]">
                Client Support Channels
              </h3>
              
              <div className="space-y-3 text-stone-600">
                <div className="flex items-start space-x-3">
                  <Mail className="w-4 h-4 text-[#c07a46] shrink-0 mt-0.5" />
                  <div>
                    <strong className="text-stone-900 block">Email Inquiries</strong>
                    <span>concierge@veylora.com</span>
                  </div>
                </div>

                <div className="flex items-start space-x-3">
                  <Phone className="w-4 h-4 text-[#c07a46] shrink-0 mt-0.5" />
                  <div>
                    <strong className="text-stone-900 block">Phone &amp; WhatsApp Helpline</strong>
                    <span>+91 80 4920 8400 (Direct studio line)</span>
                  </div>
                </div>

                <div className="flex items-start space-x-3">
                  <Clock className="w-4 h-4 text-[#c07a46] shrink-0 mt-0.5" />
                  <div>
                    <strong className="text-stone-900 block">Operating Hours</strong>
                    <span>Monday to Saturday, 10:00 AM – 7:00 PM IST</span>
                  </div>
                </div>
              </div>

              {/* Instant WhatsApp Action */}
              <div className="pt-2">
                <a
                  href="https://wa.me/918049208400?text=Hi%20Veylora%2C%20I%20have%20an%20inquiry%20regarding%20my%20leather%20order"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full py-2.5 bg-emerald-700 hover:bg-emerald-800 text-white rounded font-semibold text-xs flex items-center justify-center space-x-2 transition-colors"
                >
                  <MessageSquare className="w-4 h-4" />
                  <span>Start WhatsApp Conversation</span>
                </a>
              </div>
            </div>

            {/* Atelier Locations */}
            <div className="bg-white p-6 rounded-xl border border-[#e6e2d8] shadow-xs space-y-4 text-xs">
              <h3 className="font-serif text-lg font-bold text-[#1a1715]">
                Our Workshops
              </h3>

              <div className="space-y-4 text-stone-600">
                <div className="border-b border-stone-100 pb-3">
                  <div className="flex items-center space-x-1 text-stone-900 font-bold mb-1">
                    <MapPin className="w-3.5 h-3.5 text-[#c07a46]" />
                    <span>Jaipur Tannery &amp; Bench Workshop</span>
                  </div>
                  <p className="text-[11px] text-stone-500">
                    Plot 48, Sitapura Phase III Industrial Area, Jaipur, Rajasthan 302022
                  </p>
                </div>

                <div>
                  <div className="flex items-center space-x-1 text-stone-900 font-bold mb-1">
                    <MapPin className="w-3.5 h-3.5 text-[#c07a46]" />
                    <span>Bengaluru Design Studio</span>
                  </div>
                  <p className="text-[11px] text-stone-500">
                    402, 100ft Road, HAL 2nd Stage, Indiranagar, Bengaluru, Karnataka 560038
                  </p>
                </div>
              </div>
            </div>

          </div>

          {/* Contact Form (Col 7) */}
          <div className="lg:col-span-7 bg-white p-8 rounded-xl border border-[#e6e2d8] shadow-xs">
            {submitted ? (
              <div className="py-12 text-center space-y-3">
                <div className="w-12 h-12 rounded-full bg-emerald-100 text-emerald-700 flex items-center justify-center mx-auto">
                  <CheckCircle2 className="w-7 h-7" />
                </div>
                <h3 className="font-serif text-2xl font-bold text-[#1a1715]">
                  Message Received
                </h3>
                <p className="text-xs text-stone-500 max-w-sm mx-auto">
                  Thank you, {formData.name}. One of our senior leather specialists will review your note and respond via {formData.email} within 4 hours.
                </p>
                <button
                  onClick={() => {
                    setSubmitted(false);
                    setFormData({
                      name: '',
                      email: '',
                      phone: '',
                      subject: 'General Inquiries',
                      orderId: '',
                      message: ''
                    });
                  }}
                  className="px-4 py-2 bg-stone-100 text-stone-700 rounded text-xs font-semibold hover:bg-stone-200"
                >
                  Send Another Inquiry
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                <h3 className="font-serif text-xl font-bold text-[#1a1715] mb-2">
                  Send a Direct Message
                </h3>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-semibold text-stone-700 mb-1">
                      Full Name *
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. Kabir Mehta"
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      className="w-full px-3 py-2 border border-stone-300 rounded text-xs focus:outline-none focus:border-[#c07a46]"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-stone-700 mb-1">
                      Email Address *
                    </label>
                    <input
                      type="email"
                      required
                      placeholder="you@company.com"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      className="w-full px-3 py-2 border border-stone-300 rounded text-xs focus:outline-none focus:border-[#c07a46]"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-semibold text-stone-700 mb-1">
                      Topic of Inquiry *
                    </label>
                    <select
                      value={formData.subject}
                      onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                      className="w-full px-3 py-2 border border-stone-300 rounded text-xs bg-white focus:outline-none focus:border-[#c07a46]"
                    >
                      <option value="General Inquiries">General Inquiries</option>
                      <option value="Corporate Gifting">Corporate Gifting &amp; Bulk Orders</option>
                      <option value="Lifetime Warranty Claim">Lifetime Warranty &amp; Hardware Repair</option>
                      <option value="Custom Monogram Inquiry">Custom Monogram Inquiry</option>
                      <option value="Order Tracking">Order Tracking &amp; Delivery Query</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-stone-700 mb-1">
                      Order ID (If Applicable)
                    </label>
                    <input
                      type="text"
                      placeholder="e.g. VY-829104"
                      value={formData.orderId}
                      onChange={(e) => setFormData({ ...formData, orderId: e.target.value })}
                      className="w-full px-3 py-2 border border-stone-300 rounded text-xs font-mono uppercase focus:outline-none focus:border-[#c07a46]"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-stone-700 mb-1">
                    Your Message *
                  </label>
                  <textarea
                    required
                    rows={4}
                    placeholder="How can our workshop assist you today?"
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    className="w-full px-3 py-2 border border-stone-300 rounded text-xs focus:outline-none focus:border-[#c07a46]"
                  />
                </div>

                <button
                  type="submit"
                  className="w-full py-3 bg-[#c07a46] hover:bg-[#aa6533] text-white rounded text-xs font-bold uppercase tracking-wider transition-colors shadow-md flex items-center justify-center space-x-2"
                >
                  <span>Dispatch Message to Atelier</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </form>
            )}
          </div>

        </div>

      </div>
    </div>
  );
};
