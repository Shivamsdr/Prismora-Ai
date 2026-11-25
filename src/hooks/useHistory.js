import { useState, useEffect, useCallback } from 'react';
import { getAllSessions, deleteSession, clearAllSessions } from '@services/historyService';

/**
 * useHistory — hook for reading and managing session history from IndexedDB.
 *
 * Returns:
 *   sessions  — array of session records (newest first)
 *   loading   — true while the initial fetch is in progress
 *   error     — Error object if the fetch failed, otherwise null
 *   refresh   — manually re-fetch sessions
 *   remove    — delete a session by ID
 *   clear     — wipe all sessions
 */
export default function useHistory() {
  const [sessions, setSessions] = useState([]);
  const [loading,  setLoading]  = useState(true);
  const [error,    setError]    = useState(null);

  const fetch = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const records = await getAllSessions();
      setSessions(records);
    } catch (err) {
      console.error('[useHistory] Failed to load sessions:', err);
      setError(err);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => { fetch(); }, [fetch]);

  const remove = useCallback(async (sessionId) => {
    try {
      await deleteSession(sessionId);
      setSessions(prev => prev.filter(s => s.sessionId !== sessionId));
    } catch (err) {
      console.error('[useHistory] Failed to delete session:', err);
    }
  }, []);

  const clear = useCallback(async () => {
    try {
      await clearAllSessions();
      setSessions([]);
    } catch (err) {
      console.error('[useHistory] Failed to clear sessions:', err);
    }
  }, []);

  return { sessions, loading, error, refresh: fetch, remove, clear };
}
