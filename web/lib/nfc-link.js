export const DEFAULT_NAME = '방문자';
export const APP_SCHEME = 'nfcdemo';

function safeDecode(value) {
  try {
    return decodeURIComponent(value);
  } catch {
    return value;
  }
}

function firstValue(value) {
  return Array.isArray(value) ? value[0] : value;
}

export function normalizeName(value) {
  const name = String(value ?? '').trim();
  return name || DEFAULT_NAME;
}

export function buildAppLink(name) {
  return `${APP_SCHEME}://app?name=${encodeURIComponent(normalizeName(name))}`;
}

export function getNameFromRequest({ slug = [], searchParams = {} }) {
  const queryHasName =
    Object.prototype.hasOwnProperty.call(searchParams, 'name') ||
    Object.prototype.hasOwnProperty.call(searchParams, 'api') ||
    Object.prototype.hasOwnProperty.call(searchParams, '');

  if (queryHasName) {
    return normalizeName(
      firstValue(searchParams.name ?? searchParams.api ?? searchParams['']),
    );
  }

  const segments = Array.isArray(slug) ? slug : [];
  const firstSegment = segments[0] ?? '';
  const decodedFirstSegment = safeDecode(firstSegment);

  if (decodedFirstSegment.startsWith('api=')) {
    return normalizeName(decodedFirstSegment.slice('api='.length));
  }

  if (decodedFirstSegment.startsWith('name=')) {
    return normalizeName(decodedFirstSegment.slice('name='.length));
  }

  if (firstSegment === 'api' && segments[1]) {
    return normalizeName(safeDecode(segments[1]));
  }

  if (firstSegment === 'name' && segments[1]) {
    return normalizeName(safeDecode(segments[1]));
  }

  return DEFAULT_NAME;
}
