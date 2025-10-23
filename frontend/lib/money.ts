// lib/money.ts
export function formatPrice(amount: number, currency: string) {
  const locale = currency === 'ZAR' ? 'en-ZA' : 'en-US';
  try {
    return new Intl.NumberFormat(locale, {
      style: 'currency',
      currency,
      maximumFractionDigits: 0,
    }).format(amount);
  } catch {
    return `${currency === 'ZAR' ? 'R' : currency} ${amount.toLocaleString('en-ZA')}`;
  }
}
