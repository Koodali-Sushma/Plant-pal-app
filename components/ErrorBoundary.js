import React from "react";
import Link from "next/link";

// Error Boundary catches unexpected runtime errors in child components
// and displays a fallback UI instead of crashing the entire application.

class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);

    /* Stores whether an error has occurred inside the boundary. */
    this.state = {
      hasError: false,
    };
  }

  /* Updates the state when a child component throws an error.
  This triggers the fallback UI to be rendered. */
  static getDerivedStateFromError() {
    return {
      hasError: true,
    };
  }

  /* Logs the error and additional information for debugging.
   In a production application, this could also be sent to an error monitoring service. */
  componentDidCatch(error, errorInfo) {
    console.error("Unhandled application error:", error, errorInfo);
  }

  /* Resets the error state so the user can try rendering the application again. */
  handleReset = () => {
    this.setState({
      hasError: false,
    });
  };

  render() {
    /* Display a user-friendly fallback page when an error has been caught. */
    if (this.state.hasError) {
      return (
        <main className="flex min-h-screen flex-col items-center justify-center px-6 text-center">
          <h1 className="font-heading text-4xl font-medium">
            Something went wrong.
          </h1>

          <p className="mt-4 max-w-md text-gray-600">
            An unexpected error occurred while loading the app. Please try
            again.
          </p>

          <button
            /* Allow the user to retry rendering the app. */
            onClick={this.handleReset}
            className="mt-6 rounded-md bg-green-600 px-6 py-3 text-white transition hover:bg-green-700"
          >
            Try again
          </button>
          <Link
        href="/"
        className="mt-6 rounded-md bg-green-600 px-6 py-3 text-white hover:bg-green-700"
      >
        Back to homepage
      </Link>
        </main>
      );
    }

    /* Render the app normally when no error has occurred. */
    return this.props.children;
  }
}

export default ErrorBoundary;
