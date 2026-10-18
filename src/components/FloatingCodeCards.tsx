import React from 'react'

export const FloatingCodeCards: React.FC = () => {
  return (
    <>
      {/* Code Card 1: main.tf (Terraform) overlapping top-left of portrait */}
      <div
        className="hidden md:block absolute -top-8 -left-10 lg:-left-16 z-20 w-64 p-3 rounded-[4px] bg-[#141416]/90 border border-white/10 backdrop-blur-md shadow-2xl pointer-events-none select-none text-[11px] font-mono leading-tight animate-float-slow"
      >
        <div className="flex items-center justify-between pb-1.5 mb-1.5 border-b border-white/10 text-[9px] text-[var(--color-sky)]">
          <span className="flex items-center gap-1.5">
            <span className="w-1.5 h-1.5 rounded-full bg-[var(--color-sky)]" />
            main.tf
          </span>
          <span className="text-white/40">HCL</span>
        </div>
        <div className="space-y-0.5 text-white/80">
          <div>
            <span className="text-[var(--color-coral)]">resource</span>{' '}
            <span className="text-[var(--color-amber)]">"azurerm_kubernetes_cluster"</span>{' '}
            <span className="text-white/60">"aks"</span> {'{'}
          </div>
          <div className="pl-3">
            <span className="text-white/70">name</span> ={' '}
            <span className="text-[var(--color-teal)]">"prod-aks-cluster"</span>
          </div>
          <div className="pl-3">
            <span className="text-white/70">location</span> ={' '}
            <span className="text-[var(--color-teal)]">var.location</span>
          </div>
          <div className="pl-3">
            <span className="text-white/70">dns_prefix</span> ={' '}
            <span className="text-[var(--color-teal)]">"prod-cluster"</span>
          </div>
          <div>{'}'}</div>
        </div>
      </div>

      {/* Code Card 2: agent.py (Agentic Loop) overlapping bottom-right of portrait */}
      <div
        className="hidden md:block absolute -bottom-6 -right-6 lg:-right-12 z-20 w-72 p-3.5 rounded-[4px] bg-[#141416]/90 border border-white/10 backdrop-blur-md shadow-2xl pointer-events-none select-none text-[11px] font-mono leading-tight animate-float-reverse"
      >
        <div className="flex items-center justify-between pb-1.5 mb-1.5 border-b border-white/10 text-[9px] text-[var(--color-teal)]">
          <span className="flex items-center gap-1.5">
            <span className="w-1.5 h-1.5 rounded-full bg-[var(--color-teal)]" />
            agent.py
          </span>
          <span className="text-white/40">OODA LOOP</span>
        </div>
        <div className="space-y-0.5 text-white/80">
          <div>
            <span className="text-[var(--color-coral)]">state</span> ={' '}
            <span className="text-[var(--color-sky)]">await</span>{' '}
            <span className="text-[var(--color-teal)]">observe_cluster</span>()
          </div>
          <div>
            <span className="text-[var(--color-coral)]">plan</span> ={' '}
            <span className="text-[var(--color-teal)]">orient_and_decide</span>(state)
          </div>
          <div>
            <span className="text-[var(--color-coral)]">if</span> plan.requires_destructive_action:
          </div>
          <div className="pl-3 text-[var(--color-amber)]">
            <span className="text-[var(--color-sky)]">await</span> human_approval_gate(plan)
          </div>
          <div>
            <span className="text-[var(--color-sky)]">return await</span>{' '}
            <span className="text-[var(--color-teal)]">mcp.act</span>(plan)
          </div>
        </div>
      </div>
    </>
  )
}
