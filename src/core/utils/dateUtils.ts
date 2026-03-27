export function toStableDateISOString(date: Date): string {
  // Store date-only fields at UTC noon to prevent timezone day-shift issues.
  const stableUtcDate = new Date(Date.UTC(
    date.getFullYear(),
    date.getMonth(),
    date.getDate(),
    12,
    0,
    0,
    0
  ));
  return stableUtcDate.toISOString();
}

export function fromStableDateISOString(value: string): Date {
  const parsed = new Date(value);
  if (Number.isNaN(parsed.getTime())) {
    return new Date();
  }

  return new Date(
    parsed.getUTCFullYear(),
    parsed.getUTCMonth(),
    parsed.getUTCDate(),
    12,
    0,
    0,
    0
  );
}

export function toLocalStartOfDay(date: Date): Date {
  return new Date(date.getFullYear(), date.getMonth(), date.getDate());
}
