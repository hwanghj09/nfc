export const DEFAULT_NAME = '방문자';
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
  const decodedPathname = safeDecode(pathname);

  const apiEquals = decodedPathname.match(/^\/?api=(.+)$/);
  if (apiEquals) {
    return normalizeName(apiEquals[1]);
  }

  const nameEquals = decodedPathname.match(/^\/?name=(.+)$/);
  if (nameEquals) {
    return normalizeName(nameEquals[1]);
  }

  const apiPath = decodedPathname.match(/^\/api\/([^/]+)$/);
  if (apiPath) {
    return normalizeName(apiPath[1]);
  }

  const namePath = decodedPathname.match(/^\/name\/([^/]+)$/);
  if (namePath) {
    return normalizeName(namePath[1]);
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
  return `${WEB_ORIGIN}/name=${encodeURIComponent(normalizeName(name))}`;
}
