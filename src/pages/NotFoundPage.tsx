import React from 'react'
import { Link } from 'react-router-dom'
import { Compass, FileText, FolderGit2, Home } from 'lucide-react'
import { MetaTags } from '../components/MetaTags'

export const NotFoundPage: React.FC = () => {
  return (
    <div className="min-h-[75vh] flex items-center justify-center py-20 px-4 sm:px-6">
      <MetaTags
        title="404 - Page Not Found | Akshay Pakade"
        description="The requested page could not be found. Return to Akshay Pakade's portfolio."
        canonicalPath="/404"
        noindex={true}
      />
      <div className="max-w-md w-full text-center space-y-6">
        <div className="w-16 h-16 mx-auto rounded-[3px] border border-[var(--border-crystal)] bg-[var(--bg-card)] flex items-center justify-center text-[var(--accent)]">
          <Compass className="w-8 h-8" />
        </div>

        <div className="space-y-2">
          <div className="text-xs font-mono text-[var(--accent)] tracking-wider">ERROR 404</div>
          <h1 className="fluid-h2 font-bold tracking-tight text-[var(--text-primary)]">
            Node Not Found
          </h1>
          <p className="text-sm text-[var(--text-secondary)] font-mono">
            The requested route does not exist. Explore key sections:
          </p>
        </div>

        {/* Structured 404 Suggestions */}
        <div className="pt-2 grid grid-cols-1 gap-2.5 text-xs font-mono">
          <Link
            to="/"
            className="p-3 rounded-[3px] border border-[var(--border-crystal)] bg-[var(--bg-surface)] hover:border-[var(--accent)] text-[var(--text-primary)] flex items-center justify-center gap-2 transition-all"
          >
            <Home className="w-3.5 h-3.5 text-[var(--accent)]" />
            <span>Return to Portfolio Home</span>
          </Link>

          <a
            href="/#projects"
            className="p-3 rounded-[3px] border border-[var(--border-crystal)] bg-[var(--bg-surface)] hover:border-[var(--accent)] text-[var(--text-primary)] flex items-center justify-center gap-2 transition-all"
          >
            <FolderGit2 className="w-3.5 h-3.5 text-[var(--accent)]" />
            <span>View Featured Projects</span>
          </a>

          <Link
            to="/resume"
            className="p-3 rounded-[3px] border border-[var(--border-crystal)] bg-[var(--bg-surface)] hover:border-[var(--accent)] text-[var(--text-primary)] flex items-center justify-center gap-2 transition-all"
          >
            <FileText className="w-3.5 h-3.5 text-[var(--accent)]" />
            <span>View ATS Resume Page</span>
          </Link>
        </div>
      </div>
    </div>
  )
}
