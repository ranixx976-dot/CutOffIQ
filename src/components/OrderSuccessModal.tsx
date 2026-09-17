import React from 'react';
import { CompletedOrder } from '../types';
import { formatINR } from '../utils/formatters';
import { CheckCircle2, Truck, Package, Copy, ArrowRight, ShieldCheck, Download } from 'lucide-react';

interface OrderSuccessModalProps {
  order: CompletedOrder | null;
  onClose: () => void;
  onContinueShopping: () => void;
}

export const OrderSuccessModal: React.FC<OrderSuccessModalProps> = ({
  order,
  onClose,
  onContinueShopping
}) => {
  if (!order) return null;

  const handleCopyTracking = () => {
    navigator.clipboard.writeText(order.trackingCode);
    alert(`Tracking code ${order.trackingCode} copied to clipboard!`);
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto flex items-center justify-center p-4 sm:p-6">
      <div className="fixed inset-0 bg-black/70 backdrop-blur-xs" onClick={onClose} />

      <div className="relative bg-[#fbf9f5] w-full max-w-2xl rounded-xl shadow-2xl border border-[#e6e2d8] overflow-hidden">
        {/* Top Header Banner */}
        <div className="bg-[#1a1715] text-[#fbf9f5] p-6 text-center">
          <div className="w-12 h-12 rounded-full bg-[#c07a46] text-white flex items-center justify-center mx-auto mb-3 shadow-lg">
            <CheckCircle2 className="w-7 h-7 stroke-[2.5]" />
          </div>
          <h2 className="font-serif text-2xl font-bold tracking-tight">
            Order Confirmed &amp; In Queue
          </h2>
          <p className="text-xs text-stone-300 mt-1">
            Order <strong className="font-mono text-white">{order.orderId}</strong> • Confirmation &amp; GST invoice sent to {order.customer.email}
          </p>
        </div>

        <div className="p-6 space-y-5 max-h-[75vh] overflow-y-auto">
          {/* Tracking Card */}
          <div className="bg-white p-4 rounded-lg border border-[#e6e2d8] shadow-xs flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
            <div className="flex items-center space-x-3">
              <div className="p-2.5 rounded-full bg-[#c07a46]/10 text-[#c07a46]">
                <Truck className="w-5 h-5" />
              </div>
              <div>
                <span className="text-xs text-stone-500 font-medium">BlueDart Air Express AWB</span>
                <p className="text-xs font-mono font-bold text-[#1a1715] flex items-center space-x-1.5">
                  <span>{order.trackingCode}</span>
                </p>
              </div>
            </div>
            <div className="text-right sm:text-right">
              <span className="text-[11px] text-stone-500 block">Estimated Doorstep Arrival</span>
              <span className="text-xs font-bold text-emerald-800 bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200">
                {order.estimatedDelivery}
              </span>
            </div>
          </div>

          {/* Delivery & Billing Address */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
            <div className="bg-white p-3.5 rounded-lg border border-[#e6e2d8]">
              <h4 className="font-semibold text-stone-900 mb-1">Delivering To</h4>
              <p className="text-stone-700 font-medium">{order.customer.name}</p>
              <p className="text-stone-500">{order.customer.address}</p>
              <p className="text-stone-500">{order.customer.city}, {order.customer.state} - {order.customer.pincode}</p>
              <p className="text-stone-500 mt-1">Phone: {order.customer.phone}</p>
            </div>

            <div className="bg-white p-3.5 rounded-lg border border-[#e6e2d8]">
              <h4 className="font-semibold text-stone-900 mb-1">Payment Method</h4>
              <p className="text-stone-700 font-medium">{order.paymentMethod}</p>
              <div className="flex items-center space-x-1 text-emerald-700 text-[11px] mt-1 font-medium">
                <ShieldCheck className="w-3.5 h-3.5" />
                <span>Payment Authorized &bull; Verified</span>
              </div>
              <p className="text-stone-400 text-[10px] mt-2">
                All hardware backed by Veylora Lifetime Repair Guarantee.
              </p>
            </div>
          </div>

          {/* Items Summary */}
          <div className="bg-white p-4 rounded-lg border border-[#e6e2d8] space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-stone-700 border-b border-stone-100 pb-2">
              Reserved Workshop Pieces ({order.items.length})
            </h4>
            <div className="divide-y divide-stone-100">
              {order.items.map((item) => (
                <div key={item.id} className="py-2.5 flex items-center justify-between text-xs">
                  <div className="flex items-center space-x-3">
                    <img
                      src={item.product.images[0]}
                      alt={item.product.name}
                      referrerPolicy="no-referrer"
                      className="w-12 h-12 object-cover rounded border border-stone-200"
                    />
                    <div>
                      <span className="font-semibold text-[#1a1715]">{item.product.name}</span>
                      <p className="text-stone-500 text-[11px]">
                        Leather: {item.color} • Qty: {item.quantity}
                      </p>
                      {item.monogram && (
                        <p className="text-[#c07a46] font-medium text-[10px]">
                          Debossed Initials: &ldquo;{item.monogram}&rdquo;
                        </p>
                      )}
                    </div>
                  </div>
                  <span className="font-bold text-[#1a1715]">
                    {formatINR(item.product.price * item.quantity)}
                  </span>
                </div>
              ))}
            </div>

            <div className="border-t border-stone-200 pt-2 text-xs space-y-1 text-stone-600">
              <div className="flex justify-between">
                <span>Subtotal</span>
                <span>{formatINR(order.subtotal)}</span>
              </div>
              {order.discount > 0 && (
                <div className="flex justify-between text-emerald-700">
                  <span>Special Promotion Applied</span>
                  <span>-{formatINR(order.discount)}</span>
                </div>
              )}
              <div className="flex justify-between">
                <span>Express Pan-India Shipping</span>
                <span className="text-emerald-700 font-semibold">
                  {order.shippingFee === 0 ? 'FREE' : formatINR(order.shippingFee)}
                </span>
              </div>
              <div className="flex justify-between text-sm font-bold text-[#1a1715] pt-2 border-t border-stone-200">
                <span>Total Paid</span>
                <span>{formatINR(order.total)}</span>
              </div>
            </div>
          </div>
        </div>

        {/* Modal Actions */}
        <div className="p-4 bg-stone-100 border-t border-[#e6e2d8] flex flex-col sm:flex-row items-center justify-between gap-3">
          <button
            onClick={handleCopyTracking}
            className="w-full sm:w-auto px-4 py-2 border border-stone-300 rounded text-xs font-semibold text-stone-700 bg-white hover:bg-stone-50 flex items-center justify-center space-x-1.5"
          >
            <Copy className="w-3.5 h-3.5" />
            <span>Copy Tracking Code</span>
          </button>
          
          <button
            onClick={() => {
              onClose();
              onContinueShopping();
            }}
            className="w-full sm:w-auto px-6 py-2.5 bg-[#c07a46] text-white rounded text-xs font-semibold uppercase tracking-wider hover:bg-[#aa6533] transition-colors flex items-center justify-center space-x-2"
          >
            <span>Continue Shopping</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>
    </div>
  );
};
