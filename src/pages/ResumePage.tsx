import React from 'react'
import { profileData } from '../data/profile'
import { Printer, Download, ArrowLeft, Phone } from 'lucide-react'
import { LinkedInIcon } from '../components/LinkedInIcon'
import { Link } from 'react-router-dom'

export const ResumePage: React.FC = () => {
  const handlePrint = () => {
    window.print()
  }

  return (
    <div className="min-h-screen bg-neutral-100 py-8 px-4 sm:px-6 print:p-0 print:bg-white text-black font-sans">
      {/* Top Action Bar (Hidden in print) */}
      <div className="max-w-[210mm] mx-auto mb-6 flex flex-wrap items-center justify-between gap-4 no-print">
        <Link
          to="/"
          className="inline-flex items-center gap-1.5 text-xs font-mono font-medium text-neutral-700 hover:text-black transition-colors"
        >
          <ArrowLeft className="w-3.5 h-3.5" />
          <span>Back to Portfolio</span>
        </Link>

        <div className="flex items-center gap-3">
          <button
            onClick={handlePrint}
            className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-mono font-medium border border-neutral-300 rounded bg-white hover:bg-neutral-50 shadow-sm transition-all cursor-pointer"
            id="print-resume-btn"
          >
            <Printer className="w-3.5 h-3.5 text-neutral-600" />
            <span>Print / Save PDF (Ctrl+P)</span>
          </button>

          <a
            href="/Akshay_Pakade_Resume.pdf"
            download="Akshay_Pakade_Resume.pdf"
            className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-mono font-medium text-white bg-black rounded hover:bg-neutral-800 shadow-sm transition-all"
            id="download-resume-static-btn"
          >
            <Download className="w-3.5 h-3.5" />
            <span>Download PDF</span>
          </a>
        </div>
      </div>

      {/* A4 Paper Container: Strict 2 Page ATS Layout, No Photo, Black on White */}
      <div className="resume-container max-w-[210mm] mx-auto bg-white border border-neutral-200 shadow-xl p-8 sm:p-12 print:border-none print:shadow-none print:p-0 space-y-5 text-[#111827]">
        {/* HEADER */}
        <header className="border-b border-neutral-200 pb-4 space-y-1.5">
          <h1 className="text-2xl font-bold tracking-tight text-black">{profileData.name}</h1>
          <p className="text-xs font-mono text-neutral-700 font-medium">
            {profileData.titleLine}
          </p>
          <div className="flex flex-wrap items-center gap-x-4 gap-y-1 text-xs text-neutral-600 font-mono pt-1">
            <span>{profileData.location}</span>
            <span>•</span>
            <a
              href={`tel:${profileData.socialLinks.phone.replace(/\s+/g, '')}`}
              className="inline-flex items-center gap-1 text-neutral-800 hover:underline"
            >
              <Phone className="w-3 h-3 text-neutral-700" />
              <span>{profileData.socialLinks.phone}</span>
            </a>
            <span>•</span>
            <a
              href={profileData.socialLinks.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1 text-neutral-800 hover:underline"
            >
              <LinkedInIcon className="w-3 h-3 text-neutral-700" />
              <span>linkedin.com/in/akshay-pakade-8a34b0349</span>
            </a>
            {profileData.socialLinks.email && (
              <>
                <span>•</span>
                <a
                  href={`mailto:${profileData.socialLinks.email}`}
                  className="text-neutral-800 hover:underline"
                >
                  {profileData.socialLinks.email}
                </a>
              </>
            )}
          </div>
        </header>

        {/* SUMMARY */}
        <section className="space-y-1.5 page-break-inside-avoid">
          <h2 className="text-xs font-bold tracking-wider uppercase text-neutral-900 border-b border-neutral-200 pb-1">
            Professional Summary
          </h2>
          <p className="text-xs text-neutral-700 leading-relaxed text-justify">
            {profileData.about.intro.join(' ')}
          </p>
        </section>

        {/* WORK EXPERIENCE */}
        <section className="space-y-3.5">
          <h2 className="text-xs font-bold tracking-wider uppercase text-neutral-900 border-b border-neutral-200 pb-1">
            Professional Experience
          </h2>

          <div className="space-y-3.5">
            {profileData.experiences.map((exp) => (
              <div key={exp.id} className="space-y-1 page-break-inside-avoid">
                <div className="flex flex-col sm:flex-row sm:items-baseline justify-between gap-1">
                  <div>
                    <span className="font-bold text-xs text-black">{exp.role}</span>
                    <span className="text-xs text-neutral-700"> | {exp.company}</span>
                  </div>
                  <div className="text-[11px] font-mono text-neutral-600">
                    {exp.period} {exp.duration ? `(${exp.duration})` : ''} | {exp.location}
                  </div>
                </div>

                <p className="text-xs text-neutral-700 leading-relaxed text-justify">
                  {exp.description}
                </p>

                <div className="text-[11px] font-mono text-neutral-600">
                  <span className="font-semibold text-neutral-800">Stack: </span>
                  {exp.stack.join(', ')}
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* PROJECTS */}
        <section className="space-y-2 page-break-inside-avoid">
          <h2 className="text-xs font-bold tracking-wider uppercase text-neutral-900 border-b border-neutral-200 pb-1">
            Key Technical Initiatives & Projects
          </h2>

          <div className="space-y-2">
            {profileData.projects
              .filter((p) => !p.isInfrastructure)
              .map((proj) => (
                <div key={proj.id} className="space-y-0.5 page-break-inside-avoid">
                  <div className="flex flex-col sm:flex-row sm:items-baseline justify-between gap-1">
                    <span className="font-bold text-xs text-black">{proj.title}</span>
                    {proj.period && (
                      <span className="text-[10px] font-mono text-neutral-600">
                        {proj.period} {proj.association ? `(${proj.association})` : ''}
                      </span>
                    )}
                  </div>

                  <p className="text-[11px] text-neutral-700 italic">{proj.summary}</p>

                  <ul className="list-disc list-outside pl-4 space-y-0 text-[11px] text-neutral-700 leading-normal">
                    {proj.bullets.slice(0, 3).map((b, i) => (
                      <li key={i}>{b}</li>
                    ))}
                  </ul>

                  <div className="text-[10px] font-mono text-neutral-600">
                    <span className="font-semibold text-neutral-800">Stack: </span>
                    {proj.stack.join(', ')}
                  </div>
                </div>
              ))}
          </div>
        </section>

        {/* SKILLS */}
        <section className="space-y-1.5 page-break-inside-avoid">
          <h2 className="text-xs font-bold tracking-wider uppercase text-neutral-900 border-b border-neutral-200 pb-1">
            Technical Skills & Tools
          </h2>
          <div className="grid grid-cols-1 gap-1 text-xs">
            {profileData.skills.map((cat) => (
              <div key={cat.category} className="flex flex-wrap items-baseline gap-1">
                <span className="font-semibold text-neutral-900 w-44 shrink-0 font-mono text-[11px]">
                  {cat.category}:
                </span>
                <span className="text-neutral-700 flex-1">{cat.skills.join(', ')}</span>
              </div>
            ))}
          </div>
        </section>

        {/* EDUCATION & TRAINING */}
        <section className="space-y-1.5 page-break-inside-avoid">
          <h2 className="text-xs font-bold tracking-wider uppercase text-neutral-900 border-b border-neutral-200 pb-1">
            Education & Professional Training
          </h2>
          <div className="space-y-1 text-xs text-neutral-700">
            <div className="flex flex-col sm:flex-row sm:items-baseline justify-between gap-1">
              <span className="font-bold text-black">
                {profileData.education.degree}, {profileData.education.field}
              </span>
              <span className="text-[11px] font-mono text-neutral-600">
                {profileData.education.institution}
              </span>
            </div>
            <div className="text-[11px] font-mono text-neutral-700">
              <span className="font-semibold text-neutral-900">Training: </span>
              {profileData.education.certificationNote}
            </div>
          </div>
        </section>
      </div>
    </div>
  )
}
