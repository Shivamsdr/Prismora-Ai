import AppRouter from '@/routes';

/**
 * App — Root component.
 *
 * Renders the application router. Global providers (context, theme, etc.)
 * will be layered here in subsequent phases.
 */
export default function App() {
  return <AppRouter />;
}
