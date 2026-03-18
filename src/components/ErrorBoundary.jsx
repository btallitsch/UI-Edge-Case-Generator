import React from 'react';

export class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, errorMessage: '' };
  }

  static getDerivedStateFromError(error) {
    // Update state so the next render shows the fallback UI.
    return { hasError: true, errorMessage: error.toString() };
  }

  componentDidCatch(error, errorInfo) {
    // You could log the error to an error reporting service here
    console.error("Caught by ErrorBoundary:", error, errorInfo);
  }

  // Reset the error state if the user tries a different edge case
  componentDidUpdate(prevProps) {
    if (prevProps.resetKey !== this.props.resetKey && this.state.hasError) {
      this.setState({ hasError: false, errorMessage: '' });
    }
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="w-80 h-80 border-2 border-red-500 rounded-xl p-6 bg-red-50 flex flex-col items-center justify-center text-center">
          <span className="text-4xl mb-4">💥</span>
          <h2 className="text-lg font-bold text-red-700 mb-2">Component Crashed!</h2>
          <p className="text-sm text-red-600 overflow-hidden text-ellipsis w-full">
            {this.state.errorMessage}
          </p>
        </div>
      );
    }

    return this.props.children; 
  }
}
