import { useState, useEffect, useCallback } from 'react';
import { getAllSessions, deleteSession, clearAllSessions } from '@services/historyService';

/**
 * useHistory — hook for reading and managing session history from IndexedDB.
 *
 * Returns:
 *   sessions         — array of session records (newest first)
 *   loading          — true while the initial fetch is in progress
 *   error            — Error object if loading failed, otherwise null
 *   actionError      — Error object if delete/clear failed, otherwise null
 *   refresh          — manually re-fetch sessions
 *   remove           — delete a session by ID (returns boolean)
 *   clear            — wipe all sessions (returns boolean)
 *   clearActionError — reset actionError
 */
export default function useHistory() {
  const [sessions,    setSessions]    = useState([]);
  const [loading,     setLoading]     = useState(true);
  const [error,       setError]       = useState(null);
  const [actionError, setActionError] = useState(null);

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
    setActionError(null);
    try {
      await deleteSession(sessionId);
      setSessions(prev => prev.filter(s => (s.sessionId ?? s.id) !== sessionId));
      return true;
    } catch (err) {
      console.error('[useHistory] Failed to delete session:', err);
      setActionError(err);
      return false;
    }
  }, []);

  const clear = useCallback(async () => {
    setActionError(null);
    try {
      await clearAllSessions();
      setSessions([]);
      return true;
    } catch (err) {
      console.error('[useHistory] Failed to clear sessions:', err);
      setActionError(err);
      return false;
    }
  }, []);

  const clearActionError = useCallback(() => {
    setActionError(null);
  }, []);

  return {
    sessions,
    loading,
    error,
    actionError,
    refresh: fetch,
    remove,
    clear,
    clearActionError,
  };
}
