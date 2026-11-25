/**
 * historyService.js — Analysis session history service.
 *
 * Phase 3 upgrade: minimal IndexedDB implementation.
 * Reads and writes session metadata only — no image data stored.
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

/* ── Open / initialise the database ───────────────────────── */
function openDB() {
  return new Promise((resolve, reject) => {
    const req = indexedDB.open(DB_NAME, DB_VERSION);

    req.onupgradeneeded = (event) => {
      const db = event.target.result;
      if (!db.objectStoreNames.contains(STORE)) {
        const store = db.createObjectStore(STORE, { keyPath: 'sessionId' });
        store.createIndex('createdAt', 'createdAt', { unique: false });
      }
    };

    req.onsuccess = (event) => resolve(event.target.result);
    req.onerror   = (event) => reject(event.target.error);
  });
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
      const records = req.result ?? [];
      // Sort descending (newest first)
      records.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
      resolve(records);
    };
    req.onerror = () => reject(req.error);
  });
}

/**
 * Retrieve a single session by ID.
 *
 * @param {string} sessionId
 * @returns {Promise<object|null>}
 */
export async function getSession(sessionId) {
  const db = await openDB();
  return new Promise((resolve, reject) => {
    const tx  = db.transaction(STORE, 'readonly');
    const req = tx.objectStore(STORE).get(sessionId);
    req.onsuccess = () => resolve(req.result ?? null);
    req.onerror   = () => reject(req.error);
  });
}

/**
 * Persist a session metadata record.
 * Does NOT store image data.
 *
 * Expected shape:
 * {
 *   sessionId: string,       // unique ID
 *   modality:  'chest' | 'retina',
 *   filename:  string,       // original upload filename
 *   status:    string,       // 'pending' | 'complete' | 'error'
 *   createdAt: ISO string,
 * }
 *
 * @param {object} session
 * @returns {Promise<void>}
 */
export async function saveSession(session) {
  const db = await openDB();
  return new Promise((resolve, reject) => {
    const tx  = db.transaction(STORE, 'readwrite');
    const req = tx.objectStore(STORE).put(session);
    req.onsuccess = () => resolve();
    req.onerror   = () => reject(req.error);
  });
}

/**
 * Remove a session record by ID.
 *
 * @param {string} sessionId
 * @returns {Promise<void>}
 */
export async function deleteSession(sessionId) {
  const db = await openDB();
  return new Promise((resolve, reject) => {
    const tx  = db.transaction(STORE, 'readwrite');
    const req = tx.objectStore(STORE).delete(sessionId);
    req.onsuccess = () => resolve();
    req.onerror   = () => reject(req.error);
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
    req.onerror   = () => reject(req.error);
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
