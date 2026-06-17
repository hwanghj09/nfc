export const DEFAULT_NAME = 'hi';
export const WEB_ORIGIN = 'https://nfc.zstrit.com';
export const APP_SCHEME = 'nfcdemo';

function safeDecode(value) {
  try {
    return decodeURIComponent(value);
  } catch {
    return value;
  }
}

export function normalizeName(value) {
  const name = String(value ?? '').trim();
  return name || DEFAULT_NAME;
}

export function getNameFromPathname(pathname) {
  const apiEquals = pathname.match(/^\/?api=(.+)$/);
  if (apiEquals) {
    return normalizeName(safeDecode(apiEquals[1]));
  }

  const apiPath = pathname.match(/^\/api\/([^/]+)$/);
  if (apiPath) {
    return normalizeName(safeDecode(apiPath[1]));
  }

  return DEFAULT_NAME;
}

export function getNameFromUrl(url) {
  if (!url) {
    return DEFAULT_NAME;
  }

  try {
    const parsedUrl = new URL(url);
    const queryName =
      parsedUrl.searchParams.get('name') ??
      parsedUrl.searchParams.get('api') ??
      parsedUrl.searchParams.get('');

    if (queryName || parsedUrl.search) {
      return normalizeName(queryName);
    }

    return getNameFromPathname(parsedUrl.pathname);
  } catch {
    const [, query = ''] = String(url).split('?');
    const params = new URLSearchParams(query);
    return normalizeName(params.get('name') ?? params.get('api') ?? params.get(''));
  }
}

export function buildAppLink(name) {
  return `${APP_SCHEME}://app?name=${encodeURIComponent(normalizeName(name))}`;
}

export function buildWebNfcUrl(name) {
  return `${WEB_ORIGIN}/api=${encodeURIComponent(normalizeName(name))}`;
}
