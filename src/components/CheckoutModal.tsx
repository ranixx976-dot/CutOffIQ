import React, { useState } from 'react';
import { CartItem, CompletedOrder } from '../types';
import { formatINR, calculateEstimatedDelivery } from '../utils/formatters';
import { X, ShieldCheck, CheckCircle2, CreditCard, QrCode, Building, Banknote, Truck, ArrowRight, Loader2 } from 'lucide-react';

interface CheckoutModalProps {
  isOpen: boolean;
  onClose: () => void;
  items: CartItem[];
  discountAmount: number;
  promoCode: string | null;
  onOrderComplete: (order: CompletedOrder) => void;
}

export const CheckoutModal: React.FC<CheckoutModalProps> = ({
  isOpen,
  onClose,
  items,
  discountAmount,
  promoCode,
  onOrderComplete
}) => {
  const [step, setStep] = useState<'details' | 'payment' | 'processing'>('details');

  // Form inputs
  const [formData, setFormData] = useState({
    firstName: 'Dev',
    lastName: 'Sharma',
    email: 'dev.sharma@example.com',
    phone: '9876543210',
    address: 'Flat 402, Oakwood Residences, Indiranagar 100ft Road',
    city: 'Bengaluru',
    state: 'Karnataka',
    pincode: '560038',
    paymentMethod: 'upi' as 'upi' | 'card' | 'cod' | 'netbanking',
    upiId: 'devsharma@okhdfcbank',
    cardNumber: '4532 •••• •••• 8921',
    cardExpiry: '08/28',
    cardCvv: '•••'
  });

  if (!isOpen) return null;

  const subtotal = items.reduce((sum, item) => sum + item.product.price * item.quantity, 0);
  const isFreeShipping = subtotal >= 1999;
  const shippingFee = isFreeShipping ? 0 : 150;
  const total = Math.max(0, subtotal - discountAmount + shippingFee);
  const estimatedDate = calculateEstimatedDelivery(formData.pincode);

  const handleDetailsSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setStep('payment');
  };

  const handlePaymentSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setStep('processing');

    setTimeout(() => {
      const newOrder: CompletedOrder = {
        orderId: `VY-${Math.floor(100000 + Math.random() * 900000)}`,
        date: new Date().toLocaleDateString('en-IN', {
          day: 'numeric',
          month: 'short',
          year: 'numeric'
        }),
        items: [...items],
        subtotal,
        discount: discountAmount,
        shippingFee,
        total,
        customer: {
          name: `${formData.firstName} ${formData.lastName}`,
          email: formData.email,
          phone: formData.phone,
          address: formData.address,
          city: formData.city,
          state: formData.state,
          pincode: formData.pincode
        },
        paymentMethod:
          formData.paymentMethod === 'upi'
            ? `UPI Instant (${formData.upiId})`
            : formData.paymentMethod === 'card'
            ? 'Credit Card (HDFC Visa Platinum)'
            : formData.paymentMethod === 'cod'
            ? 'Cash on Delivery (Verified)'
            : 'NetBanking (HDFC Bank)',
        trackingCode: `BLUEDART-AIR-${Math.floor(100000000 + Math.random() * 900000000)}`,
        estimatedDelivery: estimatedDate
      };

      onOrderComplete(newOrder);
    }, 1800);
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto flex items-center justify-center p-4 sm:p-6">
      {/* Backdrop */}
      <div className="fixed inset-0 bg-black/70 backdrop-blur-xs transition-opacity" onClick={onClose} />

      <div className="relative bg-[#fbf9f5] w-full max-w-2xl rounded-xl shadow-2xl border border-[#e6e2d8] overflow-hidden">
        {/* Header */}
        <div className="px-6 py-4 border-b border-[#e6e2d8] bg-white flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <span className="font-serif text-lg font-bold text-[#1a1715]">Veylora Express Checkout</span>
            <div className="flex items-center space-x-1 text-xs text-stone-500 bg-stone-100 px-2 py-0.5 rounded">
              <ShieldCheck className="w-3.5 h-3.5 text-[#c07a46]" />
              <span>Razorpay 256-Bit SSL</span>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1 text-stone-400 hover:text-stone-700 rounded-full"
            aria-label="Close checkout"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Processing Spinner State */}
        {step === 'processing' && (
          <div className="p-12 text-center flex flex-col items-center justify-center space-y-4">
            <Loader2 className="w-12 h-12 text-[#c07a46] animate-spin" />
            <h3 className="font-serif text-xl font-bold text-[#1a1715]">
              Securing Your Order &amp; Allocation...
            </h3>
            <p className="text-xs text-stone-500 max-w-sm">
              Connecting with payment gateway, generating BlueDart express air waybill and reserving your workshop leather batch.
            </p>
          </div>
        )}

        {/* Details Form Step */}
        {step === 'details' && (
          <form onSubmit={handleDetailsSubmit} className="p-6 space-y-5">
            <div className="bg-amber-50/60 border border-amber-200/60 rounded-lg p-3 text-xs text-amber-900 flex items-center space-x-2">
              <Truck className="w-4 h-4 text-[#c07a46] shrink-0" />
              <span>
                Estimated Delivery to <strong>{formData.pincode}</strong>: <strong>{estimatedDate}</strong> via BlueDart Air Express
              </span>
            </div>

            <div className="space-y-4">
              <h4 className="text-xs uppercase tracking-wider font-bold text-stone-700">
                1. Shipping &amp; Contact Details
              </h4>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs text-stone-600 mb-1">First Name *</label>
                  <input
                    type="text"
                    required
                    value={formData.firstName}
                    onChange={(e) => setFormData({ ...formData, firstName: e.target.value })}
                    className="w-full px-3 py-2 border border-stone-300 rounded text-xs bg-white focus:outline-none focus:border-[#c07a46]"
                  />
                </div>
                <div>
                  <label className="block text-xs text-stone-600 mb-1">Last Name *</label>
                  <input
                    type="text"
                    required
                    value={formData.lastName}
                    onChange={(e) => setFormData({ ...formData, lastName: e.target.value })}
                    className="w-full px-3 py-2 border border-stone-300 rounded text-xs bg-white focus:outline-none focus:border-[#c07a46]"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs text-stone-600 mb-1">Email Address *</label>
                  <input
                    type="email"
                    required
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    className="w-full px-3 py-2 border border-stone-300 rounded text-xs bg-white focus:outline-none focus:border-[#c07a46]"
                  />
                </div>
                <div>
                  <label className="block text-xs text-stone-600 mb-1">Mobile (for SMS &amp; WhatsApp Tracking) *</label>
                  <input
                    type="tel"
                    required
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    className="w-full px-3 py-2 border border-stone-300 rounded text-xs bg-white focus:outline-none focus:border-[#c07a46]"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs text-stone-600 mb-1">Street Address, Apartment / Building *</label>
                <input
                  type="text"
                  required
                  value={formData.address}
                  onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                  className="w-full px-3 py-2 border border-stone-300 rounded text-xs bg-white focus:outline-none focus:border-[#c07a46]"
                />
              </div>

              <div className="grid grid-cols-3 gap-3">
                <div>
                  <label className="block text-xs text-stone-600 mb-1">City *</label>
                  <input
                    type="text"
                    required
                    value={formData.city}
                    onChange={(e) => setFormData({ ...formData, city: e.target.value })}
                    className="w-full px-3 py-2 border border-stone-300 rounded text-xs bg-white focus:outline-none focus:border-[#c07a46]"
                  />
                </div>
                <div>
                  <label className="block text-xs text-stone-600 mb-1">State *</label>
                  <input
                    type="text"
                    required
                    value={formData.state}
                    onChange={(e) => setFormData({ ...formData, state: e.target.value })}
                    className="w-full px-3 py-2 border border-stone-300 rounded text-xs bg-white focus:outline-none focus:border-[#c07a46]"
                  />
                </div>
                <div>
                  <label className="block text-xs text-stone-600 mb-1">Pincode *</label>
                  <input
                    type="text"
                    required
                    maxLength={6}
                    value={formData.pincode}
                    onChange={(e) => setFormData({ ...formData, pincode: e.target.value })}
                    className="w-full px-3 py-2 border border-stone-300 rounded text-xs bg-white focus:outline-none focus:border-[#c07a46]"
                  />
                </div>
              </div>
            </div>

            {/* Quick Order Breakdown */}
            <div className="bg-stone-100/80 p-4 rounded-lg border border-stone-200 text-xs space-y-1.5">
              <div className="flex justify-between font-medium text-stone-700">
                <span>Items ({items.reduce((s, i) => s + i.quantity, 0)})</span>
                <span>{formatINR(subtotal)}</span>
              </div>
              {discountAmount > 0 && (
                <div className="flex justify-between text-emerald-700">
                  <span>Coupon {promoCode}</span>
                  <span>-{formatINR(discountAmount)}</span>
                </div>
              )}
              <div className="flex justify-between text-stone-700">
                <span>Express Pan-India Shipping</span>
                <span>{isFreeShipping ? <strong className="text-emerald-700">FREE</strong> : formatINR(150)}</span>
              </div>
              <div className="flex justify-between text-sm font-bold text-[#1a1715] pt-2 border-t border-stone-300">
                <span>Total Payable</span>
                <span>{formatINR(total)}</span>
              </div>
            </div>

            <div className="flex justify-end space-x-3 pt-2">
              <button
                type="button"
                onClick={onClose}
                className="px-4 py-2 text-xs font-semibold text-stone-600 hover:text-stone-900"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="px-6 py-2.5 bg-[#c07a46] text-white rounded text-xs font-semibold uppercase tracking-wider hover:bg-[#aa6533] transition-colors flex items-center space-x-2"
              >
                <span>Continue to Payment</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </form>
        )}

        {/* Payment Method Step */}
        {step === 'payment' && (
          <form onSubmit={handlePaymentSubmit} className="p-6 space-y-5">
            <div className="flex items-center justify-between pb-3 border-b border-stone-200">
              <div>
                <span className="text-xs text-stone-500">Shipping to:</span>
                <p className="text-xs font-semibold text-[#1a1715]">
                  {formData.firstName} {formData.lastName}, {formData.city} ({formData.pincode})
                </p>
              </div>
              <button
                type="button"
                onClick={() => setStep('details')}
                className="text-xs text-[#c07a46] underline font-medium"
              >
                Edit
              </button>
            </div>

            <div>
              <h4 className="text-xs uppercase tracking-wider font-bold text-stone-700 mb-3">
                2. Select Preferred Payment Option
              </h4>

              <div className="space-y-2">
                {/* UPI Option */}
                <label
                  className={`flex items-start p-3 rounded-lg border cursor-pointer transition-colors ${
                    formData.paymentMethod === 'upi'
                      ? 'border-[#c07a46] bg-amber-50/40 ring-1 ring-[#c07a46]'
                      : 'border-stone-200 bg-white hover:bg-stone-50'
                  }`}
                >
                  <input
                    type="radio"
                    name="payment"
                    value="upi"
                    checked={formData.paymentMethod === 'upi'}
                    onChange={() => setFormData({ ...formData, paymentMethod: 'upi' })}
                    className="mt-1 text-[#c07a46] focus:ring-[#c07a46]"
                  />
                  <div className="ml-3 flex-1">
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-bold text-stone-900 flex items-center">
                        <QrCode className="w-4 h-4 mr-1.5 text-[#c07a46]" />
                        Instant UPI (GPay, PhonePe, Paytm, CRED)
                      </span>
                      <span className="text-[10px] bg-emerald-100 text-emerald-800 font-semibold px-2 py-0.5 rounded">
                        Fastest • Zero Surcharge
                      </span>
                    </div>
                    {formData.paymentMethod === 'upi' && (
                      <div className="mt-2 pt-2 border-t border-amber-200/60 flex items-center space-x-2">
                        <input
                          type="text"
                          value={formData.upiId}
                          onChange={(e) => setFormData({ ...formData, upiId: e.target.value })}
                          placeholder="yourname@upi"
                          className="px-2.5 py-1.5 border border-stone-300 rounded text-xs bg-white w-full max-w-xs focus:border-[#c07a46]"
                        />
                        <span className="text-[11px] text-stone-500">Collect request sent instantly</span>
                      </div>
                    )}
                  </div>
                </label>

                {/* Card Option */}
                <label
                  className={`flex items-start p-3 rounded-lg border cursor-pointer transition-colors ${
                    formData.paymentMethod === 'card'
                      ? 'border-[#c07a46] bg-amber-50/40 ring-1 ring-[#c07a46]'
                      : 'border-stone-200 bg-white hover:bg-stone-50'
                  }`}
                >
                  <input
                    type="radio"
                    name="payment"
                    value="card"
                    checked={formData.paymentMethod === 'card'}
                    onChange={() => setFormData({ ...formData, paymentMethod: 'card' })}
                    className="mt-1 text-[#c07a46] focus:ring-[#c07a46]"
                  />
                  <div className="ml-3 flex-1">
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-bold text-stone-900 flex items-center">
                        <CreditCard className="w-4 h-4 mr-1.5 text-[#c07a46]" />
                        Credit or Debit Card
                      </span>
                      <span className="text-[10px] text-stone-500">Visa, Mastercard, RuPay, Amex</span>
                    </div>
                    {formData.paymentMethod === 'card' && (
                      <div className="mt-2 pt-2 border-t border-amber-200/60 grid grid-cols-3 gap-2">
                        <input
                          type="text"
                          value={formData.cardNumber}
                          onChange={(e) => setFormData({ ...formData, cardNumber: e.target.value })}
                          className="col-span-2 px-2.5 py-1.5 border border-stone-300 rounded text-xs bg-white"
                          placeholder="Card Number"
                        />
                        <input
                          type="text"
                          value={formData.cardExpiry}
                          onChange={(e) => setFormData({ ...formData, cardExpiry: e.target.value })}
                          className="px-2.5 py-1.5 border border-stone-300 rounded text-xs bg-white"
                          placeholder="MM/YY"
                        />
                      </div>
                    )}
                  </div>
                </label>

                {/* COD Option */}
                <label
                  className={`flex items-start p-3 rounded-lg border cursor-pointer transition-colors ${
                    formData.paymentMethod === 'cod'
                      ? 'border-[#c07a46] bg-amber-50/40 ring-1 ring-[#c07a46]'
                      : 'border-stone-200 bg-white hover:bg-stone-50'
                  }`}
                >
                  <input
                    type="radio"
                    name="payment"
                    value="cod"
                    checked={formData.paymentMethod === 'cod'}
                    onChange={() => setFormData({ ...formData, paymentMethod: 'cod' })}
                    className="mt-1 text-[#c07a46] focus:ring-[#c07a46]"
                  />
                  <div className="ml-3 flex-1">
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-bold text-stone-900 flex items-center">
                        <Banknote className="w-4 h-4 mr-1.5 text-[#c07a46]" />
                        Cash on Delivery (Doorstep Verification)
                      </span>
                      <span className="text-[10px] text-stone-500">Available across all PIN codes</span>
                    </div>
                    <p className="text-[11px] text-stone-500 mt-1">
                      Pay via cash or UPI QR directly to the BlueDart courier partner at delivery.
                    </p>
                  </div>
                </label>
              </div>
            </div>

            {/* Total Due Notice */}
            <div className="p-4 bg-stone-100 rounded-lg flex items-center justify-between text-sm">
              <span className="font-medium text-stone-700">Total to Authorize:</span>
              <span className="font-bold text-[#1a1715] text-base">{formatINR(total)}</span>
            </div>

            <div className="flex justify-between items-center pt-2">
              <button
                type="button"
                onClick={() => setStep('details')}
                className="text-xs text-stone-600 hover:text-stone-900 font-semibold"
              >
                Back to Address
              </button>
              <button
                type="submit"
                id="complete-order-btn"
                className="px-6 py-3 bg-[#c07a46] text-white rounded text-xs font-semibold uppercase tracking-wider hover:bg-[#aa6533] transition-colors shadow-md flex items-center space-x-2"
              >
                <ShieldCheck className="w-4 h-4" />
                <span>Place Order &bull; {formatINR(total)}</span>
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
};
