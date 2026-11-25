/**
 * WorkspaceLayout — shared shell for all application workspace pages.
 *
 * Renders the WorkspaceHeader above page content.
 * Applies consistent padding-top to clear the fixed header.
 */
import WorkspaceHeader from './WorkspaceHeader';

export default function WorkspaceLayout({ children }) {
  return (
    <div
      className="flex flex-col min-h-screen"
      style={{ background: 'var(--color-bg)' }}
    >
      <WorkspaceHeader />
      <main
        style={{
          flex: 1,
          paddingTop: 'var(--navbar-height)',
        }}
      >
        {children}
      </main>
    </div>
  );
}
