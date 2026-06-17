export const defaultName = '\uD14C\uC2A4\uD2B8';
export const productionOrigin = 'https://nfc.zstrit.com';

export function getNameFromSearch(search: string) {
  const params = new URLSearchParams(search);
  return params.get('name') ?? params.get('') ?? defaultName;
}

export function getNameFromUrl(url: string | null) {
  if (!url) {
    return defaultName;
  }

  try {
    return getNameFromSearch(new URL(url).search);
  } catch {
    return defaultName;
  }
}

export function buildAppLink(name: string) {
  return `nfcdemo://app?name=${encodeURIComponent(name)}`;
}
