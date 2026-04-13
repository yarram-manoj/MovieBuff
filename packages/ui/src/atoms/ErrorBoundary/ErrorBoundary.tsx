import React from 'react';

export interface ErrorBoundaryProps {
  children: React.ReactNode;
  fallback?: React.ReactNode;
  onError?: (error: Error, errorInfo: React.ErrorInfo) => void;
}

interface ErrorBoundaryState {
  hasError: boolean;
  error: Error | null;
}

/**
 * Error Boundary component that catches errors in child components
 * Displays a fallback UI when an error occurs
 *
 * @example
 * ```tsx
 * <ErrorBoundary>
 *   <YourComponent />
 * </ErrorBoundary>
 * ```
 */
export class ErrorBoundary extends React.Component<
  ErrorBoundaryProps,
  ErrorBoundaryState
> {
  constructor(props: ErrorBoundaryProps) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error: Error): ErrorBoundaryState {
    return { hasError: true, error };
  }

  componentDidCatch(error: Error, errorInfo: React.ErrorInfo): void {
    // Log error for debugging
    console.error('[ErrorBoundary]', error, errorInfo);

    // Call optional error handler prop
    this.props.onError?.(error, errorInfo);
  }

  render(): React.ReactNode {
    if (this.state.hasError) {
      return (
        this.props.fallback || (
          <RawErrorFallback error={this.state.error} />
        )
      );
    }

    return this.props.children;
  }
}

/**
 * Default fallback UI when error occurs
 */
function RawErrorFallback({ error }: { error: Error | null }): React.ReactNode {
  return (
    <div role="alert" style={errorStyles.container}>
      <h2 style={errorStyles.title}>💥 Something went wrong</h2>
      <details style={errorStyles.details}>
        <summary style={errorStyles.summary}>Error details</summary>
        <pre style={errorStyles.pre}>
          {error?.message || 'Unknown error occurred'}
        </pre>
      </details>
      <p style={errorStyles.hint}>
        Please refresh the page or contact support if the problem persists.
      </p>
    </div>
  );
}

const errorStyles: Record<string, React.CSSProperties> = {
  container: {
    padding: '20px',
    margin: '20px',
    backgroundColor: '#fef2f2',
    border: '1px solid #fee2e2',
    borderRadius: '8px',
    fontFamily: 'system-ui, -apple-system, sans-serif',
  },
  title: {
    color: '#991b1b',
    marginTop: 0,
    marginBottom: '12px',
    fontSize: '18px',
  },
  details: {
    marginBottom: '12px',
  },
  summary: {
    cursor: 'pointer',
    color: '#7f1d1d',
    fontWeight: 600,
  },
  pre: {
    backgroundColor: '#fecaca',
    padding: '12px',
    borderRadius: '4px',
    overflow: 'auto',
    fontSize: '12px',
    lineHeight: '1.4',
  },
  hint: {
    color: '#991b1b',
    marginBottom: 0,
    fontSize: '14px',
  },
};
