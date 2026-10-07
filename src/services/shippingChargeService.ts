import { BASE } from "@/lib/api";

export interface ShippingCharge {
  Id: number;
  note: string | null;
  amount: string | number | null;
  date?: string | null;
}

// Minimum delivery charges; lower values coming from the backend are raised to these.
export const MIN_DHAKA_CHARGE = 80;
export const MIN_OUTSIDE_DHAKA_CHARGE = 130;

const toAmount = (value: ShippingCharge["amount"]): number | null => {
  const amount = Number(value);
  return Number.isFinite(amount) && amount >= 0 ? amount : null;
};

const hasInsideDhakaText = (note: string) =>
  /ঢাকার\s*ভিতরে|ঢাকা\s*ভিতরে|inside\s*dhaka|in\s*dhaka/i.test(note);

const hasOutsideDhakaText = (note: string) =>
  /ঢাকার\s*বাইরে|ঢাকা\s*বাইরে|outside\s*dhaka|out\s*of\s*dhaka/i.test(note);

export async function fetchDeliveryCharges(): Promise<ShippingCharge[]> {
  try {
    const res = await fetch(`${BASE}/charge-settings/public?chargeType=delivery`, {
      next: { revalidate: 300 },
      signal: AbortSignal.timeout(15_000),
    });
    if (!res.ok) return [];
    const json = await res.json();
    return Array.isArray(json.data) ? json.data : [];
  } catch {
    return [];
  }
}

export function getDeliveryChargeForDistrict(
  charges: ShippingCharge[],
  district: string,
): number {
  if (!district) return 0;

  const isDhaka = district.toLowerCase() === "dhaka";
  const minimum = isDhaka ? MIN_DHAKA_CHARGE : MIN_OUTSIDE_DHAKA_CHARGE;
  const matcher = isDhaka ? hasInsideDhakaText : hasOutsideDhakaText;
  const matched = charges.find((charge) => matcher(String(charge.note || "")));
  const matchedAmount = matched ? toAmount(matched.amount) : null;
  if (matchedAmount !== null) return Math.max(matchedAmount, minimum);

  const fallback = charges[isDhaka ? 0 : 1];
  const fallbackAmount = fallback ? toAmount(fallback.amount) : null;
  if (fallbackAmount !== null) return Math.max(fallbackAmount, minimum);

  return minimum;
}

export function getDeliveryChargeText(charge: ShippingCharge): string {
  const note = String(charge.note || "").trim();
  const amount = toAmount(charge.amount);
  const area = hasInsideDhakaText(note)
    ? { label: "ঢাকার ভিতরে", minimum: MIN_DHAKA_CHARGE }
    : hasOutsideDhakaText(note)
      ? { label: "ঢাকার বাইরে", minimum: MIN_OUTSIDE_DHAKA_CHARGE }
      : null;
  if (area && (amount === null || amount < area.minimum)) {
    return `${area.label} ${area.minimum.toLocaleString("bn-BD")} টাকা`;
  }
  const noteHasAmount = /[0-9০-৯]/.test(note);
  if (note && amount !== null && !noteHasAmount) {
    return `${note} - ৳${amount.toLocaleString("en-US")}`;
  }
  if (note) return note;
  return amount !== null ? `ডেলিভারি চার্জ ৳${amount.toLocaleString("en-US")}` : "";
}
