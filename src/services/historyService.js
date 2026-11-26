/**
 * historyService.js — Analysis session history service.
 *
 * Manages local session metadata via IndexedDB.
 * Does NOT permanently store original medical images.
 *
 * Schema:
 *   DB:    prismora-research
 *   Store: sessions
 *   Key:   sessionId (string)
 *   Index: createdAt (for sorted queries)
 */

const DB_NAME    = 'prismora-research';
const DB_VERSION = 1;
const STORE      = 'sessions';

function assertIndexedDB() {
  if (typeof indexedDB === 'undefined') {
    throw new Error('IndexedDB is not available in this browser environment.');
  }
}

/* ── Open / initialise the database ───────────────────────── */
function openDB() {
  return new Promise((resolve, reject) => {
    try {
      assertIndexedDB();
      const req = indexedDB.open(DB_NAME, DB_VERSION);

      req.onupgradeneeded = (event) => {
        const db = event.target.result;
        if (!db.objectStoreNames.contains(STORE)) {
          const store = db.createObjectStore(STORE, { keyPath: 'sessionId' });
          store.createIndex('createdAt', 'createdAt', { unique: false });
        }
      };

      req.onsuccess = (event) => resolve(event.target.result);
      req.onerror   = (event) => reject(event.target.error ?? new Error('Failed to open IndexedDB.'));
    } catch (err) {
      reject(err);
    }
  });
}

/**
 * Normalize a stored session record so both `id` and `sessionId` are accessible.
 *
 * @param {object} record
 * @returns {object}
 */
function normalizeRecord(record) {
  if (!record || typeof record !== 'object') return record;
  const sessionId = record.sessionId ?? record.id;
  return {
    ...record,
    id: record.id ?? sessionId,
    sessionId,
  };
}

/**
 * Retrieve all stored sessions, sorted newest-first.
 *
 * @returns {Promise<Array>}
 */
export async function getAllSessions() {
  const db = await openDB();
  return new Promise((resolve, reject) => {
    const tx    = db.transaction(STORE, 'readonly');
    const store = tx.objectStore(STORE);
    const index = store.index('createdAt');
    const req   = index.getAll();

    req.onsuccess = () => {
      const records = (req.result ?? []).map(normalizeRecord);
      records.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
      resolve(records);
    };
    req.onerror = () => reject(req.error ?? new Error('Failed to read sessions.'));
    tx.onabort  = () => reject(tx.error ?? new Error('IndexedDB read transaction aborted.'));
  });
}

/**
 * Retrieve a single session by ID.
 *
 * @param {string} sessionId
 * @returns {Promise<object|null>}
 */
export async function getSession(sessionId) {
  if (!sessionId) return null;
  const db = await openDB();
  return new Promise((resolve, reject) => {
    const tx  = db.transaction(STORE, 'readonly');
    const req = tx.objectStore(STORE).get(sessionId);
    req.onsuccess = () => resolve(req.result ? normalizeRecord(req.result) : null);
    req.onerror   = () => reject(req.error ?? new Error('Failed to retrieve session.'));
    tx.onabort    = () => reject(tx.error ?? new Error('IndexedDB read transaction aborted.'));
  });
}

/**
 * Persist a completed analysis metadata record.
 * Does NOT store original medical image data.
 *
 * @param {object} session
 * @returns {Promise<void>}
 */
export async function saveSession(session) {
  if (!session || (!session.sessionId && !session.id)) {
    throw new Error('Cannot save session without a valid sessionId.');
  }

  const record = normalizeRecord(session);
  const db = await openDB();

  return new Promise((resolve, reject) => {
    const tx  = db.transaction(STORE, 'readwrite');
    const req = tx.objectStore(STORE).put(record);
    req.onsuccess = () => resolve();
    req.onerror   = () => reject(req.error ?? new Error('Failed to save session.'));
    tx.onabort    = () => reject(tx.error ?? new Error('IndexedDB write transaction aborted.'));
  });
}

/**
 * Remove a session record by ID.
 *
 * @param {string} sessionId
 * @returns {Promise<void>}
 */
export async function deleteSession(sessionId) {
  if (!sessionId) return;
  const db = await openDB();
  return new Promise((resolve, reject) => {
    const tx  = db.transaction(STORE, 'readwrite');
    const req = tx.objectStore(STORE).delete(sessionId);
    req.onsuccess = () => resolve();
    req.onerror   = () => reject(req.error ?? new Error('Failed to delete session.'));
    tx.onabort    = () => reject(tx.error ?? new Error('IndexedDB delete transaction aborted.'));
  });
}

/**
 * Wipe all stored sessions.
 *
 * @returns {Promise<void>}
 */
export async function clearAllSessions() {
  const db = await openDB();
  return new Promise((resolve, reject) => {
    const tx  = db.transaction(STORE, 'readwrite');
    const req = tx.objectStore(STORE).clear();
    req.onsuccess = () => resolve();
    req.onerror   = () => reject(req.error ?? new Error('Failed to clear session history.'));
    tx.onabort    = () => reject(tx.error ?? new Error('IndexedDB clear transaction aborted.'));
  });
}

const historyService = {
  getAllSessions,
  getSession,
  saveSession,
  deleteSession,
  clearAllSessions,
};

export default historyService;
