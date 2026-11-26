import HistoryItem from './HistoryItem';

/**
 * HistoryList — Structured table/list of locally saved analysis records.
 */
export default function HistoryList({ sessions, onDelete }) {
  return (
    <div>
      {/* Desktop Table Header */}
      <div
        className="hidden md:grid gap-4 px-5 py-2.5 border-b border-neutral-200 bg-neutral-100/70"
        style={{ gridTemplateColumns: '1.2fr 1.4fr 0.9fr 1fr 1.1fr auto' }}
      >
        {['Modality', 'Prediction', 'Confidence', 'Model', 'Date & Time', 'Actions'].map((col) => (
          <span
            key={col}
            className="font-mono text-2xs uppercase tracking-wider text-neutral-500"
          >
            {col}
          </span>
        ))}
      </div>

      {/* Rows */}
      <div>
        {sessions.map((record, index) => (
          <HistoryItem
            key={record.sessionId ?? record.id}
            record={record}
            onDelete={onDelete}
            isLast={index === sessions.length - 1}
          />
        ))}
      </div>
    </div>
  );
}
