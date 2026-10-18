import React from 'react'

export const ProjectDiagram: React.FC<{ projectId: string }> = ({ projectId }) => {
  switch (projectId) {
    case 'k8s-self-healing':
      return (
        <div className="pt-3 pb-1">
          <div className="p-3 rounded-[3px] bg-[var(--bg-primary)] border border-[var(--border-crystal)] overflow-x-auto">
            <div className="min-w-[620px] text-[10px] font-mono text-[var(--text-secondary)]">
              <div className="flex items-center justify-between gap-1 mb-2">
                <span className="text-[11px] font-semibold text-[var(--color-teal)]">
                  ARCHITECTURE: OODA REASONING & MCP KUBERNETES REMEDIATION
                </span>
                <span className="text-[9px] text-[var(--text-muted)]">Read-only API vs Destructive Gate</span>
              </div>
              <svg viewBox="0 0 680 120" className="w-full h-auto" fill="none" xmlns="http://www.w3.org/2000/svg">
                <rect x="10" y="35" width="85" height="48" rx="2" fill="var(--bg-card)" stroke="var(--border-crystal)" strokeWidth="1" />
                <text x="52" y="58" textAnchor="middle" fill="var(--text-primary)" fontSize="10" fontWeight="600">Chainlit UI</text>
                <text x="52" y="72" textAnchor="middle" fill="var(--text-muted)" fontSize="8">Engineer</text>

                <path d="M95 59 L125 59" stroke="var(--border-crystal-highlight)" strokeWidth="1.5" />

                <rect x="125" y="35" width="95" height="48" rx="2" fill="var(--bg-card)" stroke="var(--border-crystal)" strokeWidth="1" />
                <text x="172" y="58" textAnchor="middle" fill="var(--text-primary)" fontSize="10" fontWeight="600">FastAPI</text>
                <text x="172" y="72" textAnchor="middle" fill="var(--text-muted)" fontSize="8">Auth & Async</text>

                <path d="M220 59 L250 59" stroke="var(--border-crystal-highlight)" strokeWidth="1.5" />

                <rect x="250" y="25" width="130" height="68" rx="2" fill="var(--bg-card)" stroke="var(--color-teal)" strokeWidth="1.5" />
                <text x="315" y="46" textAnchor="middle" fill="var(--color-teal)" fontSize="10" fontWeight="700">LangChain ReAct</text>
                <text x="315" y="60" textAnchor="middle" fill="var(--text-primary)" fontSize="8">Observe Orient</text>
                <text x="315" y="74" textAnchor="middle" fill="var(--text-muted)" fontSize="8">Decide Act Loop</text>

                <path d="M380 59 L410 59" stroke="var(--border-crystal-highlight)" strokeWidth="1.5" />

                <rect x="410" y="35" width="95" height="48" rx="2" fill="var(--bg-card)" stroke="var(--color-sky)" strokeWidth="1" />
                <text x="457" y="58" textAnchor="middle" fill="var(--text-primary)" fontSize="10" fontWeight="600">MCP Server</text>
                <text x="457" y="72" textAnchor="middle" fill="var(--text-muted)" fontSize="8">Tool Protocol</text>

                {/* Human Approval Gate */}
                <path d="M457 35 L457 14 L550 14" stroke="var(--color-amber)" strokeWidth="1.5" strokeDasharray="3 3" />
                <rect x="525" y="5" width="115" height="20" rx="2" fill="var(--bg-surface)" stroke="var(--color-amber)" strokeWidth="1" />
                <text x="582" y="19" textAnchor="middle" fill="var(--color-amber)" fontSize="8" fontWeight="600">Human Approval Gate</text>

                <path d="M505 59 L545 59" stroke="var(--border-crystal-highlight)" strokeWidth="1.5" />

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
        <div className="pt-3 pb-1">
          <div className="p-3 rounded-[3px] bg-[var(--bg-primary)] border border-[var(--border-crystal)] overflow-x-auto">
            <div className="min-w-[620px] text-[10px] font-mono text-[var(--text-secondary)]">
              <div className="flex items-center justify-between gap-1 mb-2">
                <span className="text-[11px] font-semibold text-[var(--color-teal)]">
                  ARCHITECTURE: EVENT-DRIVEN AGENTIC PLATFORM
                </span>
                <span className="text-[9px] text-[var(--text-muted)]">Async & Cloud-Native</span>
              </div>
              <svg viewBox="0 0 680 120" className="w-full h-auto" fill="none" xmlns="http://www.w3.org/2000/svg">
                <rect x="10" y="35" width="85" height="48" rx="2" fill="var(--bg-card)" stroke="var(--border-crystal)" strokeWidth="1" />
                <text x="52" y="58" textAnchor="middle" fill="var(--text-primary)" fontSize="10" fontWeight="600">Client / API</text>
                <text x="52" y="72" textAnchor="middle" fill="var(--text-muted)" fontSize="8">Copilot Intake</text>

                <path d="M95 59 L125 59" stroke="var(--border-crystal-highlight)" strokeWidth="1.5" />

                <rect x="125" y="35" width="95" height="48" rx="2" fill="var(--bg-card)" stroke="var(--border-crystal)" strokeWidth="1" />
                <text x="172" y="58" textAnchor="middle" fill="var(--text-primary)" fontSize="10" fontWeight="600">FastAPI</text>
                <text x="172" y="72" textAnchor="middle" fill="var(--text-muted)" fontSize="8">Microservices</text>

                <path d="M220 59 L250 59" stroke="var(--border-crystal-highlight)" strokeWidth="1.5" />

                <rect x="250" y="35" width="95" height="48" rx="2" fill="var(--bg-card)" stroke="var(--color-amber)" strokeWidth="1" />
                <text x="297" y="58" textAnchor="middle" fill="var(--text-primary)" fontSize="10" fontWeight="600">Kafka</text>
                <text x="297" y="72" textAnchor="middle" fill="var(--text-muted)" fontSize="8">Event Streaming</text>

                <path d="M345 59 L375 59" stroke="var(--border-crystal-highlight)" strokeWidth="1.5" />

                <rect x="375" y="25" width="125" height="68" rx="2" fill="var(--bg-card)" stroke="var(--color-teal)" strokeWidth="1.5" />
                <text x="437" y="48" textAnchor="middle" fill="var(--color-teal)" fontSize="10" fontWeight="700">LangGraph & MCP</text>
                <text x="437" y="62" textAnchor="middle" fill="var(--text-primary)" fontSize="8">LLMs & Agents</text>
                <text x="437" y="76" textAnchor="middle" fill="var(--text-muted)" fontSize="8">Vector Databases</text>

                <path d="M500 59 L530 59" stroke="var(--border-crystal-highlight)" strokeWidth="1.5" />

                <rect x="530" y="35" width="140" height="48" rx="2" fill="var(--bg-card)" stroke="var(--border-crystal)" strokeWidth="1" />
                <text x="600" y="56" textAnchor="middle" fill="var(--text-primary)" fontSize="10" fontWeight="600">Kubernetes</text>
                <text x="600" y="70" textAnchor="middle" fill="var(--text-muted)" fontSize="8">GitOps & Delivery</text>
              </svg>
            </div>
          </div>
        </div>
      )

    case 'airport-lost-found':
      return (
        <div className="pt-3 pb-1">
          <div className="p-3 rounded-[3px] bg-[var(--bg-primary)] border border-[var(--border-crystal)] overflow-x-auto">
            <div className="min-w-[620px] text-[10px] font-mono text-[var(--text-secondary)]">
              <div className="flex items-center justify-between gap-1 mb-2">
                <span className="text-[11px] font-semibold text-[var(--color-amber)]">
                  ARCHITECTURE: EVENT-DRIVEN LOST-AND-FOUND TRIAGE
                </span>
                <span className="text-[9px] text-[var(--text-muted)]">Async Matching Worker</span>
              </div>
              <svg viewBox="0 0 680 120" className="w-full h-auto" fill="none" xmlns="http://www.w3.org/2000/svg">
                <rect x="10" y="35" width="95" height="48" rx="2" fill="var(--bg-card)" stroke="var(--border-crystal)" strokeWidth="1" />
                <text x="57" y="58" textAnchor="middle" fill="var(--text-primary)" fontSize="10" fontWeight="600">Streamlit UI</text>
                <text x="57" y="72" textAnchor="middle" fill="var(--text-muted)" fontSize="8">Passenger Report</text>

                <path d="M105 59 L135 59" stroke="var(--border-crystal-highlight)" strokeWidth="1.5" />

                <rect x="135" y="35" width="95" height="48" rx="2" fill="var(--bg-card)" stroke="var(--border-crystal)" strokeWidth="1" />
                <text x="182" y="58" textAnchor="middle" fill="var(--text-primary)" fontSize="10" fontWeight="600">FastAPI</text>
                <text x="182" y="72" textAnchor="middle" fill="var(--text-muted)" fontSize="8">Async Intake</text>

                <path d="M230 59 L260 59" stroke="var(--border-crystal-highlight)" strokeWidth="1.5" />

                <rect x="260" y="35" width="105" height="48" rx="2" fill="var(--bg-card)" stroke="var(--color-amber)" strokeWidth="1" />
                <text x="312" y="58" textAnchor="middle" fill="var(--text-primary)" fontSize="10" fontWeight="600">Apache Kafka</text>
                <text x="312" y="72" textAnchor="middle" fill="var(--text-muted)" fontSize="8">Event Streaming</text>

                <path d="M365 59 L395 59" stroke="var(--border-crystal-highlight)" strokeWidth="1.5" />

                <rect x="395" y="25" width="135" height="68" rx="2" fill="var(--bg-card)" stroke="var(--color-coral)" strokeWidth="1.5" />
                <text x="462" y="48" textAnchor="middle" fill="var(--color-coral)" fontSize="10" fontWeight="700">Python Workers</text>
                <text x="462" y="62" textAnchor="middle" fill="var(--text-primary)" fontSize="8">LLM Item Extraction</text>
                <text x="462" y="76" textAnchor="middle" fill="var(--text-muted)" fontSize="8">Attribute Matching</text>

                <path d="M530 59 L560 59" stroke="var(--border-crystal-highlight)" strokeWidth="1.5" />

                <rect x="560" y="35" width="110" height="48" rx="2" fill="var(--bg-card)" stroke="var(--border-crystal)" strokeWidth="1" />
                <text x="615" y="56" textAnchor="middle" fill="var(--text-primary)" fontSize="10" fontWeight="600">PostgreSQL</text>
                <text x="615" y="70" textAnchor="middle" fill="var(--text-muted)" fontSize="8">Status Persistence</text>
              </svg>
            </div>
          </div>
        </div>
      )

    case 'rag-platform':
      return (
        <div className="pt-3 pb-1">
          <div className="p-3 rounded-[3px] bg-[var(--bg-primary)] border border-[var(--border-crystal)] overflow-x-auto">
            <div className="min-w-[620px] text-[10px] font-mono text-[var(--text-secondary)]">
              <div className="flex items-center justify-between gap-1 mb-2">
                <span className="text-[11px] font-semibold text-[var(--color-sky)]">
                  ARCHITECTURE: PRODUCTION RAG PLATFORM
                </span>
                <span className="text-[9px] text-[var(--text-muted)]">Qdrant Vector Retrieval</span>
              </div>
              <svg viewBox="0 0 680 120" className="w-full h-auto" fill="none" xmlns="http://www.w3.org/2000/svg">
                <rect x="10" y="35" width="85" height="48" rx="2" fill="var(--bg-card)" stroke="var(--border-crystal)" strokeWidth="1" />
                <text x="52" y="58" textAnchor="middle" fill="var(--text-primary)" fontSize="10" fontWeight="600">Chat Client</text>
                <text x="52" y="72" textAnchor="middle" fill="var(--text-muted)" fontSize="8">User Prompt</text>

                <path d="M95 59 L125 59" stroke="var(--border-crystal-highlight)" strokeWidth="1.5" />

                <rect x="125" y="35" width="110" height="48" rx="2" fill="var(--bg-card)" stroke="var(--border-crystal)" strokeWidth="1" />
                <text x="180" y="56" textAnchor="middle" fill="var(--text-primary)" fontSize="10" fontWeight="600">FastAPI</text>
                <text x="180" y="70" textAnchor="middle" fill="var(--text-muted)" fontSize="8">Auth & Tenant Guard</text>

                <path d="M235 59 L265 59" stroke="var(--border-crystal-highlight)" strokeWidth="1.5" />

                <rect x="265" y="35" width="115" height="48" rx="2" fill="var(--bg-card)" stroke="var(--border-crystal)" strokeWidth="1" />
                <text x="322" y="56" textAnchor="middle" fill="var(--text-primary)" fontSize="10" fontWeight="600">Celery Workers</text>
                <text x="322" y="70" textAnchor="middle" fill="var(--text-muted)" fontSize="8">Async Embeddings</text>

                <path d="M380 59 L410 59" stroke="var(--border-crystal-highlight)" strokeWidth="1.5" />

                <rect x="410" y="25" width="125" height="68" rx="2" fill="var(--bg-card)" stroke="var(--color-sky)" strokeWidth="1.5" />
                <text x="472" y="48" textAnchor="middle" fill="var(--color-sky)" fontSize="10" fontWeight="700">Qdrant Vector DB</text>
                <text x="472" y="62" textAnchor="middle" fill="var(--text-primary)" fontSize="8">Semantic Search</text>
                <text x="472" y="76" textAnchor="middle" fill="var(--text-muted)" fontSize="8">Tenant Isolation</text>

                <path d="M535 59 L565 59" stroke="var(--border-crystal-highlight)" strokeWidth="1.5" />

                <rect x="565" y="35" width="105" height="48" rx="2" fill="var(--bg-card)" stroke="var(--border-crystal)" strokeWidth="1" />
                <text x="617" y="56" textAnchor="middle" fill="var(--text-primary)" fontSize="10" fontWeight="600">OpenAI API</text>
                <text x="617" y="70" textAnchor="middle" fill="var(--text-muted)" fontSize="8">Grounded Response</text>
              </svg>
            </div>
          </div>
        </div>
      )

    case 'terraform-modules-tfsec':
      return (
        <div className="pt-3 pb-1">
          <div className="p-3 rounded-[3px] bg-[var(--bg-primary)] border border-[var(--border-crystal)] overflow-x-auto">
            <div className="min-w-[620px] text-[10px] font-mono text-[var(--text-secondary)]">
              <div className="flex items-center justify-between gap-1 mb-2">
                <span className="text-[11px] font-semibold text-[var(--color-sky)]">
                  ARCHITECTURE: TERRAFORM MODULES & TFSEC SCANNING
                </span>
                <span className="text-[9px] text-[var(--text-muted)]">Azure Repos to Azure Provisioning</span>
              </div>
              <svg viewBox="0 0 680 120" className="w-full h-auto" fill="none" xmlns="http://www.w3.org/2000/svg">
                <rect x="10" y="35" width="110" height="48" rx="2" fill="var(--bg-card)" stroke="var(--border-crystal)" strokeWidth="1" />
                <text x="65" y="58" textAnchor="middle" fill="var(--text-primary)" fontSize="10" fontWeight="600">Azure Repos</text>
                <text x="65" y="72" textAnchor="middle" fill="var(--text-muted)" fontSize="8">Structured Git Branch</text>

                <path d="M120 59 L165 59" stroke="var(--border-crystal-highlight)" strokeWidth="1.5" />

                <rect x="165" y="25" width="140" height="68" rx="2" fill="var(--bg-card)" stroke="var(--color-sky)" strokeWidth="1.5" />
                <text x="235" y="48" textAnchor="middle" fill="var(--color-sky)" fontSize="10" fontWeight="700">Terraform Modules</text>
                <text x="235" y="62" textAnchor="middle" fill="var(--text-primary)" fontSize="8">Reusable IaC</text>
                <text x="235" y="76" textAnchor="middle" fill="var(--text-muted)" fontSize="8">Versioned Code</text>

                <path d="M305 59 L350 59" stroke="var(--border-crystal-highlight)" strokeWidth="1.5" />

                <rect x="350" y="25" width="140" height="68" rx="2" fill="var(--bg-card)" stroke="var(--color-teal)" strokeWidth="1.5" />
                <text x="420" y="48" textAnchor="middle" fill="var(--color-teal)" fontSize="10" fontWeight="700">TFSec Scanning</text>
                <text x="420" y="62" textAnchor="middle" fill="var(--text-primary)" fontSize="8">Security Scan</text>
                <text x="420" y="76" textAnchor="middle" fill="var(--text-muted)" fontSize="8">Proactive Gate</text>

                <path d="M490 59 L535 59" stroke="var(--border-crystal-highlight)" strokeWidth="1.5" />

                <rect x="535" y="35" width="135" height="48" rx="2" fill="var(--bg-card)" stroke="var(--border-crystal)" strokeWidth="1" />
                <text x="602" y="56" textAnchor="middle" fill="var(--text-primary)" fontSize="10" fontWeight="600">Microsoft Azure</text>
                <text x="602" y="70" textAnchor="middle" fill="var(--text-muted)" fontSize="8">Provisioned Resources</text>
              </svg>
            </div>
          </div>
        </div>
      )

    case 'azure-devops-cicd-pipelines':
      return (
        <div className="pt-3 pb-1">
          <div className="p-3 rounded-[3px] bg-[var(--bg-primary)] border border-[var(--border-crystal)] overflow-x-auto">
            <div className="min-w-[620px] text-[10px] font-mono text-[var(--text-secondary)]">
              <div className="flex items-center justify-between gap-1 mb-2">
                <span className="text-[11px] font-semibold text-[var(--color-amber)]">
                  ARCHITECTURE: AZURE DEVOPS CI/CD WORKFLOW
                </span>
                <span className="text-[9px] text-[var(--text-muted)]">Commit to Pipeline Stages to Deploy</span>
              </div>
              <svg viewBox="0 0 680 120" className="w-full h-auto" fill="none" xmlns="http://www.w3.org/2000/svg">
                <rect x="10" y="35" width="95" height="48" rx="2" fill="var(--bg-card)" stroke="var(--border-crystal)" strokeWidth="1" />
                <text x="57" y="58" textAnchor="middle" fill="var(--text-primary)" fontSize="10" fontWeight="600">Git Commit</text>
                <text x="57" y="72" textAnchor="middle" fill="var(--text-muted)" fontSize="8">Trigger</text>

                <path d="M105 59 L145 59" stroke="var(--border-crystal-highlight)" strokeWidth="1.5" />

                <rect x="145" y="25" width="150" height="68" rx="2" fill="var(--bg-card)" stroke="var(--color-amber)" strokeWidth="1.5" />
                <text x="220" y="48" textAnchor="middle" fill="var(--color-amber)" fontSize="10" fontWeight="700">Azure YAML Pipeline</text>
                <text x="220" y="62" textAnchor="middle" fill="var(--text-primary)" fontSize="8">Build & Scripting</text>
                <text x="220" y="76" textAnchor="middle" fill="var(--text-muted)" fontSize="8">CI Pipeline Stages</text>

                <path d="M295 59 L335 59" stroke="var(--border-crystal-highlight)" strokeWidth="1.5" />

                <rect x="335" y="25" width="150" height="68" rx="2" fill="var(--bg-card)" stroke="var(--color-coral)" strokeWidth="1.5" />
                <text x="410" y="48" textAnchor="middle" fill="var(--color-coral)" fontSize="10" fontWeight="700">Docker & Helm</text>
                <text x="410" y="62" textAnchor="middle" fill="var(--text-primary)" fontSize="8">Container Packaging</text>
                <text x="410" y="76" textAnchor="middle" fill="var(--text-muted)" fontSize="8">Release Artifacts</text>

                <path d="M485 59 L525 59" stroke="var(--border-crystal-highlight)" strokeWidth="1.5" />

                <rect x="525" y="35" width="145" height="48" rx="2" fill="var(--bg-card)" stroke="var(--border-crystal)" strokeWidth="1" />
                <text x="597" y="56" textAnchor="middle" fill="var(--text-primary)" fontSize="10" fontWeight="600">Deployment Targets</text>
                <text x="597" y="70" textAnchor="middle" fill="var(--text-muted)" fontSize="8">Kubernetes & Cloud</text>
              </svg>
            </div>
          </div>
        </div>
      )

    case 'aks-gitops-observability':
      return (
        <div className="pt-3 pb-1">
          <div className="p-3 rounded-[3px] bg-[var(--bg-primary)] border border-[var(--border-crystal)] overflow-x-auto">
            <div className="min-w-[620px] text-[10px] font-mono text-[var(--text-secondary)]">
              <div className="flex items-center justify-between gap-1 mb-2">
                <span className="text-[11px] font-semibold text-[var(--color-coral)]">
                  ARCHITECTURE: AKS GITOPS & OBSERVABILITY
                </span>
                <span className="text-[9px] text-[var(--text-muted)]">Git to Argo CD to AKS to Prometheus/Grafana</span>
              </div>
              <svg viewBox="0 0 680 120" className="w-full h-auto" fill="none" xmlns="http://www.w3.org/2000/svg">
                <rect x="10" y="35" width="85" height="48" rx="2" fill="var(--bg-card)" stroke="var(--border-crystal)" strokeWidth="1" />
                <text x="52" y="58" textAnchor="middle" fill="var(--text-primary)" fontSize="10" fontWeight="600">Git Repo</text>
                <text x="52" y="72" textAnchor="middle" fill="var(--text-muted)" fontSize="8">Manifests & Helm</text>

                <path d="M95 59 L130 59" stroke="var(--border-crystal-highlight)" strokeWidth="1.5" />

                <rect x="130" y="25" width="130" height="68" rx="2" fill="var(--bg-card)" stroke="var(--color-teal)" strokeWidth="1.5" />
                <text x="195" y="48" textAnchor="middle" fill="var(--color-teal)" fontSize="10" fontWeight="700">Argo CD GitOps</text>
                <text x="195" y="62" textAnchor="middle" fill="var(--text-primary)" fontSize="8">Automated Sync</text>
                <text x="195" y="76" textAnchor="middle" fill="var(--text-muted)" fontSize="8">GitHub Actions</text>

                <path d="M260 59 L295 59" stroke="var(--border-crystal-highlight)" strokeWidth="1.5" />

                <rect x="295" y="25" width="135" height="68" rx="2" fill="var(--bg-card)" stroke="var(--color-coral)" strokeWidth="1.5" />
                <text x="362" y="48" textAnchor="middle" fill="var(--color-coral)" fontSize="10" fontWeight="700">AKS Cluster</text>
                <text x="362" y="62" textAnchor="middle" fill="var(--text-primary)" fontSize="8">Kubernetes Pods</text>
                <text x="362" y="76" textAnchor="middle" fill="var(--text-muted)" fontSize="8">Helm Releases</text>

                <path d="M430 59 L465 59" stroke="var(--border-crystal-highlight)" strokeWidth="1.5" />

                <rect x="465" y="25" width="205" height="68" rx="2" fill="var(--bg-card)" stroke="var(--color-teal)" strokeWidth="1.5" />
                <text x="567" y="48" textAnchor="middle" fill="var(--color-teal)" fontSize="10" fontWeight="700">Prometheus & Grafana</text>
                <text x="567" y="62" textAnchor="middle" fill="var(--text-primary)" fontSize="8">Metrics, Telemetry & Alerts</text>
                <text x="567" y="76" textAnchor="middle" fill="var(--text-muted)" fontSize="8">Azure Monitor & Log Analytics</text>
              </svg>
            </div>
          </div>
        </div>
      )

    default:
      return null
  }
}
