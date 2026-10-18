import React from 'react'
import { Link } from 'react-router-dom'
import { ArrowLeft, Compass } from 'lucide-react'

export const NotFoundPage: React.FC = () => {
  return (
    <div className="min-h-[70vh] flex items-center justify-center py-20 px-4 sm:px-6">
      <div className="max-w-md w-full text-center space-y-6">
        <div className="w-16 h-16 mx-auto rounded-[3px] border border-[var(--border-crystal)] bg-[var(--bg-card)] flex items-center justify-center text-[var(--accent)]">
          <Compass className="w-8 h-8 animate-pulse" />
        </div>

        <div className="space-y-2">
          <div className="text-xs font-mono text-[var(--accent)] tracking-wider">ERROR 404</div>
          <h1 className="text-3xl font-bold tracking-tight text-[var(--text-primary)]">
            Node Not Found
          </h1>
          <p className="text-sm text-[var(--text-secondary)] font-mono">
            The requested route or resource does not exist in this cluster.
          </p>
        </div>

        <div>
          <Link to="/" className="btn-primary text-xs font-mono">
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>Return to Portfolio</span>
          </Link>
        </div>
      </div>
    </div>
  )
}
