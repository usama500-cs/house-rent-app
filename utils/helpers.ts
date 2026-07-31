export function safe(v: any): string {
  return String(v ?? '').trim();
}

export function money(n: number | string): string {
  return '$' + Number(n || 0).toLocaleString();
}

export function splitList(s: string): string[] {
  return safe(s).split(/[,|]/).map(x => x.trim()).filter(Boolean);
}
