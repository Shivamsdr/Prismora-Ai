/**
 * Login — UI-only login demonstration.
 *
 * No real authentication. No credential storage.
 * Full design to be implemented in Phase 2.
 */
export default function Login() {
  return (
    <PageShell
      label="Auth"
      title="Sign In"
      description="UI-only demonstration. Authentication not implemented in this phase."
      route="/login"
    />
  );
}

function PageShell({ label, title, description, route }) {
  return (
    <div className="min-h-screen bg-neutral-50 flex flex-col items-center justify-center gap-4 px-6">
      <span className="label-caps">{route}</span>
      <h1 className="text-4xl font-bold tracking-tighter text-neutral-900">{title}</h1>
      {description && (
        <p className="text-sm text-neutral-500 max-w-sm text-center">{description}</p>
      )}
      <div className="badge badge-secondary mt-2">{label}</div>
      <p className="text-xs text-neutral-400 mt-6">
        This page will be fully designed in a subsequent phase.
      </p>
      <a href="/" className="text-xs text-teal-600 hover:text-teal-700 transition-base mt-2">
        ← Return home
      </a>
    </div>
  );
}
