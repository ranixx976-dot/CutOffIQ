export function formatINR(amount: number): string {
  return new Intl.NumberFormat('en-IN', {
    style: 'currency',
    currency: 'INR',
    maximumFractionDigits: 0
  }).format(amount);
}

export function calculateEstimatedDelivery(pincode?: string): string {
  const date = new Date();
  // Standard dispatch + 3 days for metro, 4 for other
  const daysToAdd = pincode && (pincode.startsWith('11') || pincode.startsWith('40') || pincode.startsWith('56') || pincode.startsWith('60') || pincode.startsWith('50')) ? 3 : 4;
  date.setDate(date.getDate() + daysToAdd);
  
  return date.toLocaleDateString('en-IN', {
    weekday: 'long',
    day: 'numeric',
    month: 'short'
  });
}
