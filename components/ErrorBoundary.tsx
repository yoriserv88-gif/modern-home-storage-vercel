'use client'

import { Component, ReactNode } from 'react'
import { AlertTriangle, RefreshCw } from 'lucide-react'

interface Props {
  children: ReactNode
  fallback?: ReactNode
}

interface State {
  hasError: boolean
  error?: Error
}

export default class ErrorBoundary extends Component<Props, State> {
  constructor(props: Props) {
    super(props)
    this.state = { hasError: false }
  }

  static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error }
  }

  componentDidCatch(error: Error, errorInfo: any) {
    console.error('Error caught by ErrorBoundary:', error, errorInfo)
  }

  handleReset = () => {
    this.setState({ hasError: false, error: undefined })
  }

  render() {
    if (this.state.hasError) {
      if (this.props.fallback) {
        return this.props.fallback
      }

      return (
        <div className="min-h-[400px] flex flex-col items-center justify-center p-8">
          <div className="bg-red-50 border border-red-200 rounded-lg p-6 max-w-md w-full">
            <div className="flex items-center justify-center mb-4">
              <div className="bg-red-100 p-3 rounded-full">
                <AlertTriangle size={32} className="text-red-600" />
              </div>
            </div>
            
            <h2 className="text-xl font-bold text-gray-900 text-center mb-2">
              Something went wrong
            </h2>
            
            <p className="text-gray-600 text-center mb-4">
              {this.state.error?.message || 'An unexpected error occurred'}
            </p>
            
            <div className="flex justify-center space-x-3">
              <button
                onClick={this.handleReset}
                className="bg-black text-white px-4 py-2 rounded-md hover:bg-gray-800 transition-colors flex items-center gap-2"
              >
                <RefreshCw size={16} />
                Try again
              </button>
              
              <button
                onClick={() => window.location.reload()}
                className="bg-white border border-gray-300 text-gray-700 px-4 py-2 rounded-md hover:bg-gray-50 transition-colors"
              >
                Reload page
              </button>
            </div>
            
            <div className="mt-6 text-center">
              <p className="text-sm text-gray-500">
                If the problem persists, please contact support
              </p>
            </div>
          </div>
        </div>
      )
    }

    return this.props.children
  }
}