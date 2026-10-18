import React from 'react'

export const ProjectDiagram: React.FC<{ projectId: string }> = ({ projectId }) => {
  switch (projectId) {
    case 'k8s-self-healing':
      return (
        <div className="pt-3 pb-1 border-t border-[var(--border-line)]">
          <div className="p-3 rounded-[3px] bg-[var(--bg-primary)] border border-[var(--border-crystal)] overflow-x-auto">
            <div className="min-w-[620px] text-[10px] font-mono text-[var(--text-secondary)]">
              <div className="flex items-center justify-between gap-1 mb-2">
                <span className="text-[11px] font-semibold text-[var(--accent)]">
                  FLOW DIAGRAM: OODA REASONING & MCP KUBERNETES REMEDIATION
                </span>
                <span className="text-[9px] text-[var(--text-muted)]">Read-only API vs Destructive Gate</span>
              </div>
              <svg viewBox="0 0 680 120" className="w-full h-auto" fill="none" xmlns="http://www.w3.org/2000/svg">
                {/* 1. Chat UI */}
                <rect x="10" y="35" width="85" height="48" rx="2" fill="var(--bg-card)" stroke="var(--border-crystal)" strokeWidth="1" />
                <text x="52" y="58" textAnchor="middle" fill="var(--text-primary)" fontSize="10" fontWeight="600">Chainlit UI</text>
                <text x="52" y="72" textAnchor="middle" fill="var(--text-muted)" fontSize="8">Engineer</text>

                {/* Arrow 1 */}
                <path d="M95 59 L125 59" stroke="var(--border-crystal-highlight)" strokeWidth="1.5" markerEnd="url(#arrow)" />

                {/* 2. FastAPI Gateway */}
                <rect x="125" y="35" width="95" height="48" rx="2" fill="var(--bg-card)" stroke="var(--border-crystal)" strokeWidth="1" />
                <text x="172" y="58" textAnchor="middle" fill="var(--text-primary)" fontSize="10" fontWeight="600">FastAPI</text>
                <text x="172" y="72" textAnchor="middle" fill="var(--text-muted)" fontSize="8">Auth & Async</text>

                {/* Arrow 2 */}
                <path d="M220 59 L250 59" stroke="var(--border-crystal-highlight)" strokeWidth="1.5" />

                {/* 3. LangChain ReAct OODA */}
                <rect x="250" y="25" width="130" height="68" rx="2" fill="var(--bg-card)" stroke="var(--accent)" strokeWidth="1" />
                <text x="315" y="46" textAnchor="middle" fill="var(--accent)" fontSize="10" fontWeight="700">LangChain ReAct</text>
                <text x="315" y="60" textAnchor="middle" fill="var(--text-primary)" fontSize="8">Observe Orient</text>
                <text x="315" y="74" textAnchor="middle" fill="var(--text-muted)" fontSize="8">Decide Act Loop</text>

                {/* Arrow 3 */}
                <path d="M380 59 L410 59" stroke="var(--border-crystal-highlight)" strokeWidth="1.5" />

                {/* 4. MCP Server */}
                <rect x="410" y="35" width="95" height="48" rx="2" fill="var(--bg-card)" stroke="var(--border-crystal)" strokeWidth="1" />
                <text x="457" y="58" textAnchor="middle" fill="var(--text-primary)" fontSize="10" fontWeight="600">MCP Server</text>
                <text x="457" y="72" textAnchor="middle" fill="var(--text-muted)" fontSize="8">Tool Protocol</text>

                {/* Branch: Human Approval */}
                <path d="M457 35 L457 14 L550 14" stroke="var(--accent)" strokeWidth="1" strokeDasharray="3 3" />
                <rect x="525" y="5" width="115" height="20" rx="2" fill="var(--bg-surface)" stroke="var(--accent)" strokeWidth="1" />
                <text x="582" y="19" textAnchor="middle" fill="var(--accent)" fontSize="8" fontWeight="600">Human Approval Gate</text>

                {/* Arrow to K8s */}
                <path d="M505 59 L545 59" stroke="var(--border-crystal-highlight)" strokeWidth="1.5" />

                {/* 5. Kubernetes API & kubectl */}
                <rect x="545" y="35" width="125" height="48" rx="2" fill="var(--bg-card)" stroke="var(--border-crystal)" strokeWidth="1" />
                <text x="607" y="56" textAnchor="middle" fill="var(--text-primary)" fontSize="10" fontWeight="600">Kubernetes API</text>
                <text x="607" y="70" textAnchor="middle" fill="var(--text-muted)" fontSize="8">kubectl Remediation</text>
              </svg>
            </div>
          </div>
        </div>
      )

    case 'agentic-ai-platform':
      return (
        <div className="pt-3 pb-1 border-t border-[var(--border-line)]">
          <div className="p-3 rounded-[3px] bg-[var(--bg-primary)] border border-[var(--border-crystal)] overflow-x-auto">
            <div className="min-w-[620px] text-[10px] font-mono text-[var(--text-secondary)]">
              <div className="flex items-center justify-between gap-1 mb-2">
                <span className="text-[11px] font-semibold text-[var(--accent)]">
                  FLOW DIAGRAM: EVENT-DRIVEN AGENTIC PLATFORM ARCHITECTURE
                </span>
                <span className="text-[9px] text-[var(--text-muted)]">Async & Cloud-Native</span>
              </div>
              <svg viewBox="0 0 680 120" className="w-full h-auto" fill="none" xmlns="http://www.w3.org/2000/svg">
                {/* 1. Client / Copilot */}
                <rect x="10" y="35" width="85" height="48" rx="2" fill="var(--bg-card)" stroke="var(--border-crystal)" strokeWidth="1" />
                <text x="52" y="58" textAnchor="middle" fill="var(--text-primary)" fontSize="10" fontWeight="600">Client / API</text>
                <text x="52" y="72" textAnchor="middle" fill="var(--text-muted)" fontSize="8">Copilot Intake</text>

                <path d="M95 59 L125 59" stroke="var(--border-crystal-highlight)" strokeWidth="1.5" />

                {/* 2. FastAPI Services */}
                <rect x="125" y="35" width="95" height="48" rx="2" fill="var(--bg-card)" stroke="var(--border-crystal)" strokeWidth="1" />
                <text x="172" y="58" textAnchor="middle" fill="var(--text-primary)" fontSize="10" fontWeight="600">FastAPI</text>
                <text x="172" y="72" textAnchor="middle" fill="var(--text-muted)" fontSize="8">Microservices</text>

                <path d="M220 59 L250 59" stroke="var(--border-crystal-highlight)" strokeWidth="1.5" />

                {/* 3. Kafka Streaming */}
                <rect x="250" y="35" width="95" height="48" rx="2" fill="var(--bg-card)" stroke="var(--border-crystal)" strokeWidth="1" />
                <text x="297" y="58" textAnchor="middle" fill="var(--text-primary)" fontSize="10" fontWeight="600">Kafka</text>
                <text x="297" y="72" textAnchor="middle" fill="var(--text-muted)" fontSize="8">Event Streaming</text>

                <path d="M345 59 L375 59" stroke="var(--border-crystal-highlight)" strokeWidth="1.5" />

                {/* 4. LangGraph & MCP */}
                <rect x="375" y="25" width="125" height="68" rx="2" fill="var(--bg-card)" stroke="var(--accent)" strokeWidth="1" />
                <text x="437" y="48" textAnchor="middle" fill="var(--accent)" fontSize="10" fontWeight="700">LangGraph & MCP</text>
                <text x="437" y="62" textAnchor="middle" fill="var(--text-primary)" fontSize="8">LLMs & Agents</text>
                <text x="437" y="76" textAnchor="middle" fill="var(--text-muted)" fontSize="8">Vector Databases</text>

                <path d="M500 59 L530 59" stroke="var(--border-crystal-highlight)" strokeWidth="1.5" />

                {/* 5. Kubernetes & GitOps */}
                <rect x="530" y="35" width="140" height="48" rx="2" fill="var(--bg-card)" stroke="var(--border-crystal)" strokeWidth="1" />
                <text x="600" y="56" textAnchor="middle" fill="var(--text-primary)" fontSize="10" fontWeight="600">Kubernetes</text>
                <text x="600" y="70" textAnchor="middle" fill="var(--text-muted)" fontSize="8">GitOps & Observability</text>
              </svg>
            </div>
          </div>
        </div>
      )

    case 'airport-lost-found':
      return (
        <div className="pt-3 pb-1 border-t border-[var(--border-line)]">
          <div className="p-3 rounded-[3px] bg-[var(--bg-primary)] border border-[var(--border-crystal)] overflow-x-auto">
            <div className="min-w-[620px] text-[10px] font-mono text-[var(--text-secondary)]">
              <div className="flex items-center justify-between gap-1 mb-2">
                <span className="text-[11px] font-semibold text-[var(--accent)]">
                  FLOW DIAGRAM: LOST-AND-FOUND EVENT-DRIVEN AI TRIAGE
                </span>
                <span className="text-[9px] text-[var(--text-muted)]">Async Worker Pipeline</span>
              </div>
              <svg viewBox="0 0 680 120" className="w-full h-auto" fill="none" xmlns="http://www.w3.org/2000/svg">
                {/* 1. Streamlit */}
                <rect x="10" y="35" width="95" height="48" rx="2" fill="var(--bg-card)" stroke="var(--border-crystal)" strokeWidth="1" />
                <text x="57" y="58" textAnchor="middle" fill="var(--text-primary)" fontSize="10" fontWeight="600">Streamlit UI</text>
                <text x="57" y="72" textAnchor="middle" fill="var(--text-muted)" fontSize="8">Passenger Report</text>

                <path d="M105 59 L135 59" stroke="var(--border-crystal-highlight)" strokeWidth="1.5" />

                {/* 2. FastAPI Gateway */}
                <rect x="135" y="35" width="95" height="48" rx="2" fill="var(--bg-card)" stroke="var(--border-crystal)" strokeWidth="1" />
                <text x="182" y="58" textAnchor="middle" fill="var(--text-primary)" fontSize="10" fontWeight="600">FastAPI</text>
                <text x="182" y="72" textAnchor="middle" fill="var(--text-muted)" fontSize="8">Async Intake</text>

                <path d="M230 59 L260 59" stroke="var(--border-crystal-highlight)" strokeWidth="1.5" />

                {/* 3. Kafka Stream */}
                <rect x="260" y="35" width="105" height="48" rx="2" fill="var(--bg-card)" stroke="var(--border-crystal)" strokeWidth="1" />
                <text x="312" y="58" textAnchor="middle" fill="var(--text-primary)" fontSize="10" fontWeight="600">Apache Kafka</text>
                <text x="312" y="72" textAnchor="middle" fill="var(--text-muted)" fontSize="8">Event Streaming</text>

                <path d="M365 59 L395 59" stroke="var(--border-crystal-highlight)" strokeWidth="1.5" />

                {/* 4. Python Workers & LLM */}
                <rect x="395" y="25" width="135" height="68" rx="2" fill="var(--bg-card)" stroke="var(--accent)" strokeWidth="1" />
                <text x="462" y="48" textAnchor="middle" fill="var(--accent)" fontSize="10" fontWeight="700">Python Workers</text>
                <text x="462" y="62" textAnchor="middle" fill="var(--text-primary)" fontSize="8">LLM Item Extraction</text>
                <text x="462" y="76" textAnchor="middle" fill="var(--text-muted)" fontSize="8">Attribute Matching</text>

                <path d="M530 59 L560 59" stroke="var(--border-crystal-highlight)" strokeWidth="1.5" />

                {/* 5. PostgreSQL */}
                <rect x="560" y="35" width="110" height="48" rx="2" fill="var(--bg-card)" stroke="var(--border-crystal)" strokeWidth="1" />
                <text x="615" y="56" textAnchor="middle" fill="var(--text-primary)" fontSize="10" fontWeight="600">PostgreSQL</text>
                <text x="615" y="70" textAnchor="middle" fill="var(--text-muted)" fontSize="8">Async Status Updates</text>
              </svg>
            </div>
          </div>
        </div>
      )

    case 'rag-platform':
      return (
        <div className="pt-3 pb-1 border-t border-[var(--border-line)]">
          <div className="p-3 rounded-[3px] bg-[var(--bg-primary)] border border-[var(--border-crystal)] overflow-x-auto">
            <div className="min-w-[620px] text-[10px] font-mono text-[var(--text-secondary)]">
              <div className="flex items-center justify-between gap-1 mb-2">
                <span className="text-[11px] font-semibold text-[var(--accent)]">
                  FLOW DIAGRAM: PRODUCTION RAG RETRIEVAL & ISOLATION
                </span>
                <span className="text-[9px] text-[var(--text-muted)]">Qdrant Vector DB</span>
              </div>
              <svg viewBox="0 0 680 120" className="w-full h-auto" fill="none" xmlns="http://www.w3.org/2000/svg">
                {/* 1. Client */}
                <rect x="10" y="35" width="85" height="48" rx="2" fill="var(--bg-card)" stroke="var(--border-crystal)" strokeWidth="1" />
                <text x="52" y="58" textAnchor="middle" fill="var(--text-primary)" fontSize="10" fontWeight="600">Chat Client</text>
                <text x="52" y="72" textAnchor="middle" fill="var(--text-muted)" fontSize="8">User Prompt</text>

                <path d="M95 59 L125 59" stroke="var(--border-crystal-highlight)" strokeWidth="1.5" />

                {/* 2. FastAPI Gateway */}
                <rect x="125" y="35" width="110" height="48" rx="2" fill="var(--bg-card)" stroke="var(--border-crystal)" strokeWidth="1" />
                <text x="180" y="56" textAnchor="middle" fill="var(--text-primary)" fontSize="10" fontWeight="600">FastAPI</text>
                <text x="180" y="70" textAnchor="middle" fill="var(--text-muted)" fontSize="8">Auth & Tenant Guard</text>

                <path d="M235 59 L265 59" stroke="var(--border-crystal-highlight)" strokeWidth="1.5" />

                {/* 3. Ingestion & Celery */}
                <rect x="265" y="35" width="115" height="48" rx="2" fill="var(--bg-card)" stroke="var(--border-crystal)" strokeWidth="1" />
                <text x="322" y="56" textAnchor="middle" fill="var(--text-primary)" fontSize="10" fontWeight="600">Celery Workers</text>
                <text x="322" y="70" textAnchor="middle" fill="var(--text-muted)" fontSize="8">Async Embeddings</text>

                <path d="M380 59 L410 59" stroke="var(--border-crystal-highlight)" strokeWidth="1.5" />

                {/* 4. Qdrant Vector Retrieval */}
                <rect x="410" y="25" width="125" height="68" rx="2" fill="var(--bg-card)" stroke="var(--accent)" strokeWidth="1" />
                <text x="472" y="48" textAnchor="middle" fill="var(--accent)" fontSize="10" fontWeight="700">Qdrant Vector DB</text>
                <text x="472" y="62" textAnchor="middle" fill="var(--text-primary)" fontSize="8">Semantic Search</text>
                <text x="472" y="76" textAnchor="middle" fill="var(--text-muted)" fontSize="8">Tenant Isolation</text>

                <path d="M535 59 L565 59" stroke="var(--border-crystal-highlight)" strokeWidth="1.5" />

                {/* 5. OpenAI API & PostgreSQL */}
                <rect x="565" y="35" width="105" height="48" rx="2" fill="var(--bg-card)" stroke="var(--border-crystal)" strokeWidth="1" />
                <text x="617" y="56" textAnchor="middle" fill="var(--text-primary)" fontSize="10" fontWeight="600">OpenAI API</text>
                <text x="617" y="70" textAnchor="middle" fill="var(--text-muted)" fontSize="8">Grounded Response</text>
              </svg>
            </div>
          </div>
        </div>
      )

    default:
      return null
  }
}
