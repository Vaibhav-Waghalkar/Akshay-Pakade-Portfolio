export interface ExperienceItem {
  id: string
  role: string
  company: string
  employmentType: string
  period: string
  duration?: string
  location: string
  workplaceType: 'Hybrid' | 'On-site' | 'Remote'
  description: string
  stack: string[]
}

export interface ProjectItem {
  id: string
  title: string
  period?: string
  association?: string
  summary: string
  bullets: string[]
  stack: string[]
  repoUrl?: string
  liveUrl?: string
}

export interface SkillCategory {
  category: string
  skills: string[]
}

export interface FocusBlock {
  id: string
  title: string
  description: string
}

export interface ProfileData {
  name: string
  titleLine: string
  location: string
  heroStatement: string
  heroTags: string[]
  socialLinks: {
    linkedin: string
    emailPlaceholder: string
    contactEndpoint?: string
  }
  about: {
    intro: string[]
    focusBlocks: FocusBlock[]
    quote: string
  }
  experiences: ExperienceItem[]
  projects: ProjectItem[]
  skills: SkillCategory[]
  education: {
    degree: string
    field: string
    institution: string
    certificationNote: string
  }
}

export const profileData: ProfileData = {
  name: 'Akshay Pakade',
  titleLine: 'Senior DevOps Engineer | Agentic AI | Forward Deployed Engineering',
  location: 'Pune District, Maharashtra, India',
  heroStatement:
    '6.5+ years in cloud engineering, DevOps and infrastructure automation, now building AI agents and LLM-powered systems for real business problems.',
  heroTags: ['Azure', 'Kubernetes', 'Terraform', 'LangChain', 'MCP', 'FastAPI'],
  socialLinks: {
    linkedin: 'https://www.linkedin.com/in/akshay-pakade-8a34b0349/',
    // Email field read from config/data, placeholder as requested - no invented addresses
    emailPlaceholder: 'akshay.pakade@example.com',
    // Configurable contact form endpoint (e.g., Formspree). Leave empty or configure your endpoint.
    contactEndpoint: '',
  },
  about: {
    intro: [
      'Technology professional with 6.5+ years of IT experience across Cloud Engineering, DevOps, Infrastructure Automation and cloud-native platforms.',
      'Expanding into Agentic AI, Generative AI, LLMOps and Forward Deployed Engineering to connect advanced technology with real-world business solutions.',
    ],
    focusBlocks: [
      {
        id: 'ai-engineering',
        title: 'AI Engineering and Agentic AI',
        description:
          'Agentic AI, AI agents, Generative AI, LLMs; LLMOps, RAG and vector search; multi-agent systems, tool calling, workflow orchestration; AI infrastructure, deployment and automation.',
      },
      {
        id: 'forward-deployed',
        title: 'Forward Deployed Engineering',
        description:
          'Translating business requirements into practical technical solutions; integrating AI systems with APIs, cloud services and enterprise workflows; prototyping, integration, troubleshooting; bridging business needs and engineering implementation.',
      },
      {
        id: 'cloud-platform',
        title: 'Cloud and Platform Engineering',
        description:
          'Microsoft Azure, AWS, Google Cloud; Kubernetes, Docker, Helm; Terraform and IaC; Azure DevOps, GitHub Actions, CI/CD, GitOps, Argo CD.',
      },
      {
        id: 'automation-reliability',
        title: 'Automation, Observability and Reliability',
        description:
          'Python, PowerShell, Bash; Prometheus, Grafana, Azure Monitor, Log Analytics; monitoring, incident troubleshooting, cloud security, production support; SRE, scalability, platform reliability.',
      },
    ],
    quote: 'Build intelligently. Automate relentlessly. Engineer for scale.',
  },
  experiences: [
    {
      id: 'wipro',
      role: 'Senior DevOps Engineer',
      company: 'Wipro',
      employmentType: 'Full-time',
      period: 'Nov 2025 - Present',
      location: 'Pune District, Maharashtra',
      workplaceType: 'Hybrid',
      description:
        'Cloud infrastructure provisioning, architecture and IaC automation using Azure and Terraform. Kubernetes/AKS orchestration, Helm deployments, GitOps with Argo CD. CI/CD pipeline engineering and release automation with Azure DevOps and GitHub Actions. Observability, monitoring, SRE practices, production reliability. Infrastructure automation, operational optimization, incident troubleshooting. Exploring Agentic AI and AI-driven automation for intelligent operational workflows.',
      stack: [
        'Azure',
        'Terraform',
        'Kubernetes',
        'Helm',
        'Argo CD',
        'Docker',
        'Azure DevOps',
        'GitHub Actions',
        'Prometheus',
        'Grafana',
        'AI Agents',
      ],
    },
    {
      id: 'reliance',
      role: 'Senior DevOps Engineer',
      company: 'Reliance Property Project Limited',
      employmentType: 'Full-time',
      period: 'Jan 2023 - Nov 2025',
      duration: '2 yrs 11 mos',
      location: 'Mumbai, Maharashtra',
      workplaceType: 'On-site',
      description:
        'Automated Azure infrastructure provisioning with Terraform and reusable IaC modules. Supported Kubernetes workloads, Docker containers and Helm deployments. Developed and maintained CI/CD pipelines using Azure DevOps. Streamlined infrastructure operations through scripting and deployment automation. Improved operational visibility through monitoring, troubleshooting and reliability practices. Explored AI-assisted automation opportunities for infrastructure and operations.',
      stack: [
        'Microsoft Azure',
        'Terraform',
        'Azure DevOps',
        'Kubernetes',
        'Helm',
        'Docker',
        'Git',
        'CI/CD',
        'Infrastructure Automation',
        'Monitoring',
      ],
    },
    {
      id: 'v5-global',
      role: 'DevOps Engineer',
      company: 'V5 Global',
      employmentType: 'Full-time',
      period: 'Sep 2022 - Jan 2023',
      duration: '5 mos',
      location: 'Pune District, Maharashtra',
      workplaceType: 'On-site',
      description:
        'Worked with Terraform, Git and Azure YAML pipelines. Supported Azure cloud engineering and infrastructure management. Maintained structured Git branching strategies in Azure Repos. Implemented TFSec for proactive security scanning of Terraform repositories. Improved provisioning workflows through Git-based version control and security scanning.',
      stack: [
        'Microsoft Azure',
        'Terraform',
        'Git',
        'Azure DevOps YAML',
        'Azure Repos',
        'TFSec',
        'IaC',
      ],
    },
    {
      id: 'quess-corp',
      role: 'Cloud Administrator',
      company: 'Quess Corp Limited',
      employmentType: 'Full-time',
      period: 'Apr 2020 - Aug 2022',
      duration: '2 yrs 5 mos',
      location: 'Nagpur, Maharashtra',
      workplaceType: 'Hybrid',
      description:
        'Managed cloud resources, subscriptions and configurations. Monitored performance and availability, troubleshooting to minimize downtime. Supported identity and access management using RBAC and security best practices. Configured monitoring, alerts and logging. Assisted with optimization, resource governance and cost management. Supported network configuration and security: virtual networks, subnets, NSGs, routing.',
      stack: [
        'Cloud Administration',
        'Microsoft Azure',
        'RBAC',
        'Azure Monitor',
        'Virtual Networks',
        'NSGs',
        'Cost Management',
        'Governance',
      ],
    },
  ],
  projects: [
    {
      id: 'k8s-self-healing',
      title: 'AI-Powered Self-Healing Kubernetes Infrastructure',
      period: 'Nov 2025 - Present',
      association: 'Associated with Wipro',
      summary:
        'AI-driven infrastructure assistant that helps engineers investigate Kubernetes issues, analyze cluster health and propose remediation through an agentic workflow.',
      bullets: [
        'Agentic reasoning with LangChain ReAct agents and an Observe-Orient-Decide-Act (OODA) loop.',
        'Secure Kubernetes API and kubectl integration through a dedicated Model Context Protocol (MCP) server.',
        'Human-in-the-loop approval before destructive cluster operations.',
        'FastAPI async orchestration with authenticated requests.',
        'Conversational interface and auditability for operational oversight.',
      ],
      stack: [
        'Python',
        'LangChain',
        'AI Agents',
        'MCP',
        'FastAPI',
        'Kubernetes',
        'kubectl',
        'Chainlit',
      ],
      // repoUrl: 'https://github.com/...', // Left undefined until official repository is public
      // liveUrl: 'https://...',
    },
    {
      id: 'agentic-ai-platform',
      title: 'Enterprise-Grade Agentic AI Platform',
      period: 'Dec 2025 - Aug 2026',
      association: 'Associated with Wipro',
      summary:
        'End-to-end architecture for production-oriented AI apps combining agents, APIs, microservices, streaming data and cloud-native deployment.',
      bullets: [
        'Integrate LLMs, LangGraph and MCP for AI copilots and task-oriented agents.',
        'FastAPI services and modular components for low latency execution.',
        'Event-driven processing with Kafka for decoupling ingestion pipelines.',
        'Vector databases and AI orchestration for reliable knowledge retrieval.',
        'Kubernetes and GitOps for scalable delivery, observability and operational automation.',
      ],
      stack: [
        'Python',
        'LangGraph',
        'MCP',
        'FastAPI',
        'Kafka',
        'Kubernetes',
        'GitOps',
        'Vector Databases',
      ],
      // repoUrl: '',
      // liveUrl: '',
    },
    {
      id: 'airport-lost-found',
      title: 'AI-Enabled Airport Lost-and-Found Triage System',
      summary:
        'Event-driven AI solution that automates baggage recovery by matching passenger-submitted lost-item reports with item descriptions.',
      bullets: [
        'Streamlit passenger report interface for fast incident submission.',
        'FastAPI gateway for handling async intake requests.',
        'Apache Kafka for event streaming and decoupled processing between intake and matching.',
        'Python background workers for item extraction and AI matching.',
        'LLM-based attribute parsing and matching algorithm.',
        'PostgreSQL persistence and async status updates across lifecycle.',
      ],
      stack: [
        'Python',
        'FastAPI',
        'Apache Kafka',
        'LLM Agents',
        'PostgreSQL',
        'Streamlit',
        'Event-Driven Architecture',
      ],
      // repoUrl: '',
      // liveUrl: '',
    },
    {
      id: 'rag-platform',
      title: 'Production-Ready RAG Platform',
      summary:
        'Scalable, secure AI chat platform that retrieves from private knowledge sources and generates context-grounded LLM responses.',
      bullets: [
        'FastAPI gateway for requests, authentication and API access control.',
        'Async ingestion and embedding workflows with Celery workers.',
        'Semantic search and vector retrieval using Qdrant vector database.',
        'PostgreSQL for application metadata, chat history and sessions.',
        'Tenant isolation for customer data and segregated retrieval contexts.',
      ],
      stack: [
        'Python',
        'FastAPI',
        'RAG',
        'OpenAI API',
        'Qdrant',
        'PostgreSQL',
        'Celery',
        'Embeddings',
      ],
      // repoUrl: '',
      // liveUrl: '',
    },
  ],
  skills: [
    {
      category: 'AI and LLM',
      skills: [
        'Agentic AI Development',
        'AI Agents',
        'LangChain',
        'LangGraph',
        'MCP (Model Context Protocol)',
        'RAG',
        'OpenAI API',
        'Qdrant',
        'Chainlit',
        'Generative AI',
        'LLMOps',
      ],
    },
    {
      category: 'Backend and Data',
      skills: ['Python', 'FastAPI', 'Celery', 'PostgreSQL', 'Apache Kafka'],
    },
    {
      category: 'Cloud',
      skills: [
        'Microsoft Azure',
        'AWS',
        'Google Cloud (GCP)',
        'AWS Certified Cloud Practitioner Training',
      ],
    },
    {
      category: 'Containers and Orchestration',
      skills: ['Docker', 'Kubernetes', 'AKS', 'Helm'],
    },
    {
      category: 'DevOps and IaC',
      skills: [
        'Terraform',
        'TFSec',
        'Azure DevOps Services',
        'Azure DevOps Server',
        'GitHub Actions',
        'Argo CD',
        'GitOps',
        'CI/CD',
        'Production Deployment',
      ],
    },
    {
      category: 'Observability',
      skills: [
        'Prometheus',
        'Grafana',
        'Azure Monitor',
        'Log Analytics',
      ],
    },
    {
      category: 'Systems and Scripting',
      skills: [
        'Linux System Administration',
        'Red Hat Linux',
        'Linux Server',
        'PowerShell',
        'Bash',
      ],
    },
  ],
  education: {
    degree: 'Bachelor of Engineering (BE)',
    field: 'Electrical Engineering',
    institution: 'Rashtrasant Tukadoji Maharaj Nagpur University (RTMNU)',
    certificationNote:
      'AWS Certified Cloud Practitioner Training (Completed comprehensive cloud architecture and security training)',
  },
}
