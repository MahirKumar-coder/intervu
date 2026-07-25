import { Component, type ErrorInfo, type ReactNode } from "react";

interface Props {
  children: ReactNode;
}

interface State {
  hasError: boolean;
  error: Error | null;
}

export default class ErrorBoundary extends Component<Props, State> {
  public state: State = {
    hasError: false,
    error: null
  };

  public static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error };
  }

  public componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error("Uncaught error inside ErrorBoundary:", error, errorInfo);
  }

  public render() {
    if (this.state.hasError) {
      return (
        <div className="relative flex min-h-screen flex-col items-center justify-center bg-zinc-950 text-white p-6 overflow-hidden">
          {/* Glowing background blob */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-red-600/5 rounded-full blur-[130px] pointer-events-none" />

          <div className="relative z-10 max-w-md w-full rounded-2xl border border-red-500/10 bg-zinc-900/30 p-8 text-center backdrop-blur-md shadow-2xl space-y-6">
            <div className="mx-auto w-14 h-14 rounded-full bg-red-500/10 border border-red-500/20 flex items-center justify-center text-2xl">
              ⚠️
            </div>
            
            <div className="space-y-2">
              <h2 className="text-xl font-bold text-zinc-100">Something went wrong</h2>
              <p className="text-zinc-400 text-sm">
                The application encountered an unexpected rendering error. Don't worry, your interview progress is safe.
              </p>
              {this.state.error && (
                <p className="text-[11px] font-mono bg-zinc-950/80 p-3 rounded-lg border border-zinc-800 text-red-400/90 text-left max-h-24 overflow-y-auto mt-2">
                  {this.state.error.toString()}
                </p>
              )}
            </div>

            <div className="flex flex-col sm:flex-row gap-3">
              <button
                onClick={() => window.location.href = "/dashboard"}
                className="flex-1 px-4 py-2 bg-blue-600 hover:bg-blue-500 text-white font-semibold text-sm rounded-lg transition-all shadow-lg cursor-pointer"
              >
                Go to Dashboard
              </button>
              <button
                onClick={() => this.setState({ hasError: false, error: null })}
                className="flex-1 px-4 py-2 bg-zinc-800 hover:bg-zinc-700 text-zinc-300 font-semibold text-sm rounded-lg border border-zinc-700 transition-all cursor-pointer"
              >
                Try Again
              </button>
            </div>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}
