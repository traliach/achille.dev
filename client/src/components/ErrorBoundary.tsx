import { Component, type ErrorInfo, type ReactNode } from 'react'

interface ErrorBoundaryProps {
  children: ReactNode
}

interface ErrorBoundaryState {
  error: Error | null
}

export class ErrorBoundary extends Component<
  ErrorBoundaryProps,
  ErrorBoundaryState
> {
  state: ErrorBoundaryState = {
    error: null,
  }

  static getDerivedStateFromError(error: Error): ErrorBoundaryState {
    return { error }
  }

  componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error('[client] uncaught render error', error, errorInfo.componentStack)
  }

  render() {
    if (this.state.error) {
      return (
        <div className="app-shell">
          <section className="section">
            <div className="surface">
              <span className="eyebrow">Client error</span>
              <h2>Rendering failed</h2>
              <p className="section-intro">{this.state.error.message}</p>
              <p className="section-intro">
                Open the browser console to inspect the stack trace.
              </p>
            </div>
          </section>
        </div>
      )
    }

    return this.props.children
  }
}
