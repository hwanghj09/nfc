import fs from 'node:fs';
import path from 'node:path';

const dataDir = path.join(process.cwd(), 'data');
const storeFile = path.join(dataDir, 'store.json');

const emptyStore = {
  devices: [],
  reports: [],
  events: [],
};

export function ensureStore() {
  fs.mkdirSync(dataDir, { recursive: true });

  if (!fs.existsSync(storeFile)) {
    fs.writeFileSync(storeFile, JSON.stringify(emptyStore, null, 2));
  }
}

export function readStore() {
  ensureStore();

  try {
    return {
      ...emptyStore,
      ...JSON.parse(fs.readFileSync(storeFile, 'utf8')),
    };
  } catch {
    fs.writeFileSync(storeFile, JSON.stringify(emptyStore, null, 2));
    return emptyStore;
  }
}

export function writeStore(store) {
  ensureStore();
  fs.writeFileSync(storeFile, JSON.stringify(store, null, 2));
}

export function appendRecord(collection, record) {
  const store = readStore();
  const nextRecord = {
    id: `${Date.now()}-${Math.random().toString(16).slice(2)}`,
    createdAt: new Date().toISOString(),
    ...record,
  };

  store[collection] = [nextRecord, ...(store[collection] ?? [])];
  writeStore(store);

  return nextRecord;
}
