import sharp from 'sharp'
import fs from 'fs'
import path from 'path'

const outputDir = path.resolve(process.cwd(), 'public/projects')

// 7 Cover art SVGs: 1600x1000, dark warm background (#0C0C0E), soft glass isometric shapes,
// subtle grain, light accents from palette (teal #3DD6C3, sky #5AB0FF, amber #F6B945, coral #FF7A66).
// Zero people, zero faces, zero text, zero brand logos.

const covers = [
  {
    id: 'k8s-self-healing',
    // Hexagonal node cluster with one highlighted node and a glowing loop around it, teal and sky
    svg: `
    <svg width="1600" height="1000" viewBox="0 0 1600 1000" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <radialGradient id="bgG1" cx="50%" cy="50%" r="70%">
          <stop offset="0%" stop-color="#161b24" />
          <stop offset="100%" stop-color="#0C0C0E" />
        </radialGradient>
        <linearGradient id="tealSky" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stop-color="#3DD6C3" />
          <stop offset="100%" stop-color="#5AB0FF" />
        </linearGradient>
        <radialGradient id="nodeGlow" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stop-color="#3DD6C3" stop-opacity="0.45" />
          <stop offset="100%" stop-color="#3DD6C3" stop-opacity="0" />
        </radialGradient>
        <filter id="blurFilter" x="-20%" y="-20%" width="140%" height="140%">
          <feGaussianBlur stdDeviation="30" />
        </filter>
      </defs>

      <rect width="1600" height="1000" fill="url(#bgG1)" />

      <!-- Ambient glow circles -->
      <circle cx="800" cy="500" r="380" fill="url(#nodeGlow)" filter="url(#blurFilter)" />
      <circle cx="1100" cy="350" r="240" fill="#5AB0FF" fill-opacity="0.12" filter="url(#blurFilter)" />

      <!-- Isometric grid background lines -->
      <g stroke="#ffffff" stroke-opacity="0.04" stroke-width="1.5">
        <line x1="200" y1="200" x2="1400" y2="800" />
        <line x1="200" y1="500" x2="1400" y2="500" />
        <line x1="200" y1="800" x2="1400" y2="200" />
        <line x1="500" y1="100" x2="500" y2="900" />
        <line x1="800" y1="100" x2="800" y2="900" />
        <line x1="1100" y1="100" x2="1100" y2="900" />
      </g>

      <!-- Outer Nodes (Translucent Glass Hexagons) -->
      <!-- Center top -->
      <polygon points="800,280 890,330 890,430 800,480 710,430 710,330" fill="#1b212c" fill-opacity="0.7" stroke="#5AB0FF" stroke-opacity="0.4" stroke-width="2" />
      <!-- Center bottom -->
      <polygon points="800,520 890,570 890,670 800,720 710,670 710,570" fill="#1b212c" fill-opacity="0.7" stroke="#3DD6C3" stroke-opacity="0.4" stroke-width="2" />
      <!-- Left middle -->
      <polygon points="580,400 670,450 670,550 580,600 490,550 490,450" fill="#181d26" fill-opacity="0.75" stroke="#ffffff" stroke-opacity="0.15" stroke-width="2" />
      <!-- Right middle -->
      <polygon points="1020,400 1110,450 1110,550 1020,600 930,550 930,450" fill="#181d26" fill-opacity="0.75" stroke="#ffffff" stroke-opacity="0.15" stroke-width="2" />

      <!-- Connectors between cluster nodes -->
      <path d="M580 500 L800 500 L1020 500" stroke="#5AB0FF" stroke-opacity="0.35" stroke-width="2" stroke-dasharray="6 6" />
      <path d="M800 380 L800 620" stroke="#3DD6C3" stroke-opacity="0.35" stroke-width="2" stroke-dasharray="6 6" />

      <!-- Center Highlighted Active Node with Inner Glowing Prism -->
      <polygon points="800,390 895,445 895,555 800,610 705,555 705,445" fill="#121a24" stroke="url(#tealSky)" stroke-width="3.5" />
      <polygon points="800,420 865,460 865,540 800,580 735,540 735,460" fill="url(#tealSky)" fill-opacity="0.18" stroke="#3DD6C3" stroke-width="1.5" />
      <circle cx="800" cy="500" r="18" fill="#3DD6C3" />
      <circle cx="800" cy="500" r="32" stroke="#5AB0FF" stroke-width="2" stroke-opacity="0.8" fill="none" />

      <!-- Remediation Glowing Orbital Loop -->
      <ellipse cx="800" cy="500" rx="260" ry="110" fill="none" stroke="url(#tealSky)" stroke-width="3" stroke-dasharray="14 10" transform="rotate(-15 800 500)" />
      <circle cx="980" cy="420" r="8" fill="#5AB0FF" />
      <circle cx="620" cy="580" r="8" fill="#3DD6C3" />
    </svg>`,
  },
  {
    id: 'agentic-ai-platform',
    // Layered platform stack with flowing streams of light, teal and amber
    svg: `
    <svg width="1600" height="1000" viewBox="0 0 1600 1000" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <radialGradient id="bgG2" cx="50%" cy="50%" r="70%">
          <stop offset="0%" stop-color="#181a20" />
          <stop offset="100%" stop-color="#0C0C0E" />
        </radialGradient>
        <linearGradient id="tealAmber" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stop-color="#3DD6C3" />
          <stop offset="100%" stop-color="#F6B945" />
        </linearGradient>
        <filter id="blur2" x="-20%" y="-20%" width="140%" height="140%">
          <feGaussianBlur stdDeviation="35" />
        </filter>
      </defs>

      <rect width="1600" height="1000" fill="url(#bgG2)" />
      <circle cx="800" cy="520" r="360" fill="#3DD6C3" fill-opacity="0.12" filter="url(#blur2)" />
      <circle cx="1050" cy="400" r="260" fill="#F6B945" fill-opacity="0.14" filter="url(#blur2)" />

      <!-- Isometric 3D Layer Stack -->
      <!-- Bottom Layer (Infrastructure & Data) -->
      <polygon points="800,620 1200,720 800,820 400,720" fill="#13171e" fill-opacity="0.85" stroke="#ffffff" stroke-opacity="0.12" stroke-width="2" />
      <polygon points="800,650 1200,750 800,850 400,750" fill="#0f1217" stroke="#3DD6C3" stroke-opacity="0.3" stroke-width="1.5" />

      <!-- Middle Layer (Services & Event Mesh) -->
      <polygon points="800,470 1200,570 800,670 400,570" fill="#171d26" fill-opacity="0.8" stroke="url(#tealAmber)" stroke-width="2" />
      <polygon points="800,500 1200,600 800,700 400,600" fill="#12161d" stroke="#F6B945" stroke-opacity="0.3" stroke-width="1.5" />

      <!-- Top Layer (Agent Orchestration & LLM) -->
      <polygon points="800,320 1200,420 800,520 400,420" fill="#1c2430" fill-opacity="0.9" stroke="url(#tealAmber)" stroke-width="2.5" />

      <!-- Glowing Light Stream Pillars connecting layers -->
      <line x1="600" y1="470" x2="600" y2="770" stroke="#3DD6C3" stroke-width="2.5" stroke-dasharray="8 6" stroke-opacity="0.7" />
      <line x1="800" y1="370" x2="800" y2="670" stroke="#F6B945" stroke-width="3" stroke-opacity="0.8" />
      <line x1="1000" y1="470" x2="1000" y2="770" stroke="#3DD6C3" stroke-width="2.5" stroke-dasharray="8 6" stroke-opacity="0.7" />

      <!-- Flowing light particles on top layer -->
      <circle cx="800" cy="420" r="14" fill="#F6B945" />
      <circle cx="700" cy="395" r="9" fill="#3DD6C3" />
      <circle cx="900" cy="395" r="9" fill="#3DD6C3" />
      <circle cx="800" cy="470" r="9" fill="#F6B945" />
      
      <!-- Energy streams drifting upwards -->
      <path d="M500 450 Q 800 250 1100 450" fill="none" stroke="url(#tealAmber)" stroke-width="2" stroke-opacity="0.6" stroke-dasharray="12 8" />
    </svg>`,
  },
  {
    id: 'airport-lost-found',
    // Abstract luggage-tag shapes matching with item shapes along a stream, amber and coral
    svg: `
    <svg width="1600" height="1000" viewBox="0 0 1600 1000" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <radialGradient id="bgG3" cx="50%" cy="50%" r="70%">
          <stop offset="0%" stop-color="#1d1716" />
          <stop offset="100%" stop-color="#0C0C0E" />
        </radialGradient>
        <linearGradient id="amberCoral" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stop-color="#F6B945" />
          <stop offset="100%" stop-color="#FF7A66" />
        </linearGradient>
        <filter id="blur3" x="-20%" y="-20%" width="140%" height="140%">
          <feGaussianBlur stdDeviation="35" />
        </filter>
      </defs>

      <rect width="1600" height="1000" fill="url(#bgG3)" />
      <circle cx="800" cy="500" r="350" fill="#FF7A66" fill-opacity="0.12" filter="url(#blur3)" />
      <circle cx="650" cy="450" r="280" fill="#F6B945" fill-opacity="0.14" filter="url(#blur3)" />

      <!-- S-curve Concurrency Stream / Kafka Stream -->
      <path d="M250 650 Q 550 800 800 500 T 1350 350" fill="none" stroke="url(#amberCoral)" stroke-width="4" stroke-opacity="0.8" />
      <path d="M250 670 Q 550 820 800 520 T 1350 370" fill="none" stroke="#F6B945" stroke-width="1.5" stroke-opacity="0.3" stroke-dasharray="8 6" />

      <!-- Abstract Luggage Tag shapes (Left/Intake) -->
      <g transform="translate(420, 520) rotate(-15)">
        <polygon points="0,30 30,0 120,0 120,160 0,160" fill="#201a18" stroke="#F6B945" stroke-width="2" fill-opacity="0.85" />
        <circle cx="25" cy="25" r="8" fill="#F6B945" />
        <line x1="30" y1="70" x2="90" y2="70" stroke="#ffffff" stroke-opacity="0.2" stroke-width="2" />
        <line x1="30" y1="100" x2="80" y2="100" stroke="#ffffff" stroke-opacity="0.2" stroke-width="2" />
      </g>

      <!-- Second Tag floating -->
      <g transform="translate(560, 360) rotate(12)">
        <polygon points="0,25 25,0 100,0 100,130 0,130" fill="#241b1a" stroke="url(#amberCoral)" stroke-width="2" fill-opacity="0.8" />
        <circle cx="20" cy="20" r="6" fill="#FF7A66" />
      </g>

      <!-- Center AI Matching Convergence Node -->
      <circle cx="800" cy="500" r="70" fill="#261b1b" stroke="url(#amberCoral)" stroke-width="3" />
      <circle cx="800" cy="500" r="45" fill="none" stroke="#F6B945" stroke-width="1.5" stroke-dasharray="6 4" />
      <circle cx="800" cy="500" r="16" fill="#FF7A66" />

      <!-- Abstract Item / Attribute shapes (Right/Matched) -->
      <g transform="translate(980, 380) rotate(20)">
        <rect x="0" y="0" width="110" height="110" rx="8" fill="#241c19" stroke="#FF7A66" stroke-width="2" fill-opacity="0.85" />
        <rect x="25" y="25" width="60" height="60" rx="4" fill="none" stroke="#F6B945" stroke-width="1.5" />
      </g>
      <g transform="translate(1120, 480) rotate(-10)">
        <polygon points="60,0 120,50 95,120 25,120 0,50" fill="#201716" stroke="url(#amberCoral)" stroke-width="2" fill-opacity="0.8" />
      </g>

      <!-- Match ray connection -->
      <line x1="540" y1="570" x2="740" y2="520" stroke="#F6B945" stroke-width="2" stroke-dasharray="4 4" />
      <line x1="860" y1="480" x2="1000" y2="440" stroke="#FF7A66" stroke-width="2" stroke-dasharray="4 4" />
    </svg>`,
  },
  {
    id: 'rag-platform',
    // Documents dissolving into a cluster of vector dots, mint and sky
    svg: `
    <svg width="1600" height="1000" viewBox="0 0 1600 1000" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <radialGradient id="bgG4" cx="50%" cy="50%" r="70%">
          <stop offset="0%" stop-color="#141a22" />
          <stop offset="100%" stop-color="#0C0C0E" />
        </radialGradient>
        <linearGradient id="mintSky" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stop-color="#3DD6C3" />
          <stop offset="100%" stop-color="#5AB0FF" />
        </linearGradient>
        <filter id="blur4" x="-20%" y="-20%" width="140%" height="140%">
          <feGaussianBlur stdDeviation="35" />
        </filter>
      </defs>

      <rect width="1600" height="1000" fill="url(#bgG4)" />
      <circle cx="800" cy="500" r="340" fill="#3DD6C3" fill-opacity="0.12" filter="url(#blur4)" />
      <circle cx="1000" cy="420" r="260" fill="#5AB0FF" fill-opacity="0.14" filter="url(#blur4)" />

      <!-- Isometric Document Stack on Left -->
      <g transform="translate(360, 360)">
        <polygon points="120,40 280,0 200,200 40,240" fill="#131924" stroke="#ffffff" stroke-opacity="0.1" stroke-width="1.5" />
        <polygon points="100,20 260,-20 180,180 20,220" fill="#16202e" stroke="#5AB0FF" stroke-opacity="0.4" stroke-width="1.5" />
        <polygon points="80,0 240,-40 160,160 0,200" fill="#1a2738" stroke="url(#mintSky)" stroke-width="2.5" />
        <!-- Document lines -->
        <line x1="40" y1="40" x2="160" y2="10" stroke="#ffffff" stroke-opacity="0.25" stroke-width="2" />
        <line x1="30" y1="70" x2="150" y2="40" stroke="#ffffff" stroke-opacity="0.25" stroke-width="2" />
        <line x1="20" y1="100" x2="120" y2="75" stroke="#ffffff" stroke-opacity="0.25" stroke-width="2" />
      </g>

      <!-- Dissolving stream of particles / embeddings -->
      <path d="M560 480 Q 720 380 880 500 T 1200 460" fill="none" stroke="url(#mintSky)" stroke-width="2" stroke-opacity="0.5" stroke-dasharray="6 6" />

      <!-- 3D Vector Point Cloud Space (Qdrant) -->
      <g stroke="#ffffff" stroke-opacity="0.06" stroke-width="1">
        <line x1="880" y1="280" x2="1240" y2="280" />
        <line x1="880" y1="460" x2="1240" y2="460" />
        <line x1="880" y1="640" x2="1240" y2="640" />
        <line x1="880" y1="280" x2="880" y2="640" />
        <line x1="1060" y1="280" x2="1060" y2="640" />
        <line x1="1240" y1="280" x2="1240" y2="640" />
      </g>

      <!-- Vector Dots with distance coordinates -->
      <circle cx="920" cy="340" r="7" fill="#3DD6C3" />
      <circle cx="1060" cy="380" r="10" fill="#5AB0FF" />
      <circle cx="1180" cy="320" r="6" fill="#3DD6C3" />
      <circle cx="1000" cy="490" r="14" fill="url(#mintSky)" />
      <circle cx="1120" cy="540" r="8" fill="#5AB0FF" />
      <circle cx="940" cy="580" r="7" fill="#3DD6C3" />
      <circle cx="1200" cy="460" r="9" fill="#3DD6C3" />

      <!-- Distance vectors between matched embeddings -->
      <line x1="1000" y1="490" x2="1060" y2="380" stroke="#3DD6C3" stroke-width="2" stroke-opacity="0.7" />
      <line x1="1000" y1="490" x2="1120" y2="540" stroke="#5AB0FF" stroke-width="2" stroke-opacity="0.7" />
      <line x1="1000" y1="490" x2="940" y2="580" stroke="#3DD6C3" stroke-width="1.5" stroke-dasharray="4 4" stroke-opacity="0.5" />
    </svg>`,
  },
  {
    id: 'terraform-modules-tfsec',
    // Modular blocks snapping together under a shield shape, sky and mint
    svg: `
    <svg width="1600" height="1000" viewBox="0 0 1600 1000" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <radialGradient id="bgG5" cx="50%" cy="50%" r="70%">
          <stop offset="0%" stop-color="#121a22" />
          <stop offset="100%" stop-color="#0C0C0E" />
        </radialGradient>
        <linearGradient id="skyMint" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stop-color="#5AB0FF" />
          <stop offset="100%" stop-color="#3DD6C3" />
        </linearGradient>
        <filter id="blur5" x="-20%" y="-20%" width="140%" height="140%">
          <feGaussianBlur stdDeviation="35" />
        </filter>
      </defs>

      <rect width="1600" height="1000" fill="url(#bgG5)" />
      <circle cx="800" cy="480" r="360" fill="#5AB0FF" fill-opacity="0.12" filter="url(#blur5)" />
      <circle cx="800" cy="380" r="260" fill="#3DD6C3" fill-opacity="0.14" filter="url(#blur5)" />

      <!-- Protective Security Shield Overhead (TFSec) -->
      <path d="M800 180 L1020 280 L1020 460 Q 1020 620 800 700 Q 580 620 580 460 L 580 280 Z" fill="none" stroke="url(#skyMint)" stroke-width="3" stroke-opacity="0.8" />
      <path d="M800 230 L970 310 L970 450 Q 970 580 800 645 Q 630 580 630 450 L 630 310 Z" fill="#141c26" fill-opacity="0.5" stroke="#3DD6C3" stroke-width="1.5" stroke-dasharray="8 6" />

      <!-- Modular Infrastructure Blocks Snapping Together (Terraform) -->
      <!-- Left Block -->
      <polygon points="680,480 770,530 770,620 680,670 590,620 590,530" fill="#182230" stroke="#5AB0FF" stroke-width="2" fill-opacity="0.85" />
      <!-- Right Block -->
      <polygon points="920,480 1010,530 1010,620 920,670 830,620 830,530" fill="#182230" stroke="#5AB0FF" stroke-width="2" fill-opacity="0.85" />
      <!-- Center Interlocking Module Block -->
      <polygon points="800,410 890,460 890,550 800,600 710,550 710,460" fill="#1f2c3d" stroke="url(#skyMint)" stroke-width="3" fill-opacity="0.9" />

      <!-- Alignment / Snapping Guidelines -->
      <line x1="710" y1="505" x2="680" y2="520" stroke="#3DD6C3" stroke-width="2" stroke-dasharray="4 4" />
      <line x1="890" y1="505" x2="920" y2="520" stroke="#3DD6C3" stroke-width="2" stroke-dasharray="4 4" />
      <circle cx="800" cy="505" r="14" fill="#3DD6C3" />
      <circle cx="800" cy="505" r="28" fill="none" stroke="#5AB0FF" stroke-width="1.5" />
    </svg>`,
  },
  {
    id: 'azure-devops-cicd-pipelines',
    // Connected pipeline stage blocks on a conveyor, amber and coral
    svg: `
    <svg width="1600" height="1000" viewBox="0 0 1600 1000" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <radialGradient id="bgG6" cx="50%" cy="50%" r="70%">
          <stop offset="0%" stop-color="#1b1716" />
          <stop offset="100%" stop-color="#0C0C0E" />
        </radialGradient>
        <linearGradient id="amberCoral2" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stop-color="#F6B945" />
          <stop offset="100%" stop-color="#FF7A66" />
        </linearGradient>
        <filter id="blur6" x="-20%" y="-20%" width="140%" height="140%">
          <feGaussianBlur stdDeviation="35" />
        </filter>
      </defs>

      <rect width="1600" height="1000" fill="url(#bgG6)" />
      <circle cx="800" cy="500" r="360" fill="#FF7A66" fill-opacity="0.12" filter="url(#blur6)" />
      <circle cx="550" cy="480" r="260" fill="#F6B945" fill-opacity="0.14" filter="url(#blur6)" />

      <!-- Isometric Conveyor / Pipeline Track -->
      <polygon points="200,680 1400,380 1400,430 200,730" fill="#161413" stroke="#ffffff" stroke-opacity="0.08" stroke-width="1.5" />
      <line x1="200" y1="680" x2="1400" y2="380" stroke="url(#amberCoral2)" stroke-width="3" stroke-opacity="0.7" />

      <!-- Stage 1 Block (Source / Build) -->
      <g transform="translate(380, 560)">
        <polygon points="0,40 100,10 100,110 0,140" fill="#241a18" stroke="#F6B945" stroke-width="2" />
        <polygon points="0,40 60,10 160,-20 100,10" fill="#2d211f" stroke="#F6B945" stroke-width="1.5" />
        <circle cx="50" cy="90" r="8" fill="#F6B945" />
      </g>

      <!-- Connecting Pipe 1 -->
      <line x1="540" y1="570" x2="680" y2="535" stroke="url(#amberCoral2)" stroke-width="3" stroke-dasharray="8 6" />

      <!-- Stage 2 Block (Test & Security Scan) -->
      <g transform="translate(680, 485)">
        <polygon points="0,40 100,10 100,110 0,140" fill="#291b1a" stroke="url(#amberCoral2)" stroke-width="2.5" />
        <polygon points="0,40 60,10 160,-20 100,10" fill="#352321" stroke="#FF7A66" stroke-width="1.5" />
        <circle cx="50" cy="90" r="10" fill="#FF7A66" />
      </g>

      <!-- Connecting Pipe 2 -->
      <line x1="840" y1="495" x2="980" y2="460" stroke="url(#amberCoral2)" stroke-width="3" stroke-dasharray="8 6" />

      <!-- Stage 3 Block (Artifact & Release) -->
      <g transform="translate(980, 410)">
        <polygon points="0,40 100,10 100,110 0,140" fill="#2e1a1b" stroke="#FF7A66" stroke-width="2" />
        <polygon points="0,40 60,10 160,-20 100,10" fill="#3b2022" stroke="#FF7A66" stroke-width="1.5" />
        <circle cx="50" cy="90" r="8" fill="#FF7A66" />
      </g>

      <!-- Stage 4 Block (Kubernetes / Cloud Deploy) -->
      <line x1="1140" y1="420" x2="1240" y2="395" stroke="#F6B945" stroke-width="3" stroke-dasharray="8 6" />
      <g transform="translate(1240, 345)">
        <polygon points="0,35 80,10 80,95 0,120" fill="#261b17" stroke="#F6B945" stroke-width="1.5" />
        <circle cx="40" cy="75" r="7" fill="#F6B945" />
      </g>
    </svg>`,
  },
  {
    id: 'aks-gitops-observability',
    // Node graph with a signal line, coral and teal
    svg: `
    <svg width="1600" height="1000" viewBox="0 0 1600 1000" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <radialGradient id="bgG7" cx="50%" cy="50%" r="70%">
          <stop offset="0%" stop-color="#151b1f" />
          <stop offset="100%" stop-color="#0C0C0E" />
        </radialGradient>
        <linearGradient id="coralTeal" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stop-color="#FF7A66" />
          <stop offset="100%" stop-color="#3DD6C3" />
        </linearGradient>
        <filter id="blur7" x="-20%" y="-20%" width="140%" height="140%">
          <feGaussianBlur stdDeviation="35" />
        </filter>
      </defs>

      <rect width="1600" height="1000" fill="url(#bgG7)" />
      <circle cx="800" cy="500" r="350" fill="#3DD6C3" fill-opacity="0.12" filter="url(#blur7)" />
      <circle cx="950" cy="420" r="270" fill="#FF7A66" fill-opacity="0.13" filter="url(#blur7)" />

      <!-- GitOps Synchronized Cluster Nodes (Graph) -->
      <!-- Center Controller / Argo CD Node -->
      <circle cx="800" cy="500" r="65" fill="#172228" stroke="url(#coralTeal)" stroke-width="3" />
      <circle cx="800" cy="500" r="35" fill="none" stroke="#3DD6C3" stroke-width="1.5" stroke-dasharray="6 4" />
      <circle cx="800" cy="500" r="14" fill="#3DD6C3" />

      <!-- Satellite Cluster Pods -->
      <g stroke="url(#coralTeal)" stroke-width="2" stroke-opacity="0.6">
        <line x1="800" y1="435" x2="800" y2="280" />
        <line x1="860" y1="470" x2="1100" y2="380" />
        <line x1="845" y1="545" x2="1050" y2="680" />
        <line x1="755" y1="545" x2="550" y2="680" />
        <line x1="740" y1="470" x2="500" y2="380" />
      </g>

      <circle cx="800" cy="280" r="28" fill="#1b2229" stroke="#3DD6C3" stroke-width="2" />
      <circle cx="1100" cy="380" r="36" fill="#241e21" stroke="#FF7A66" stroke-width="2.5" />
      <circle cx="1050" cy="680" r="32" fill="#1c2428" stroke="#3DD6C3" stroke-width="2" />
      <circle cx="550" cy="680" r="32" fill="#241e21" stroke="#FF7A66" stroke-width="2" />
      <circle cx="500" cy="380" r="36" fill="#1c2428" stroke="#3DD6C3" stroke-width="2" />

      <!-- Continuous Monitoring & Observability Telemetry Pulse Line (Prometheus / Grafana) -->
      <path d="M200 820 L450 820 L500 760 L540 880 L590 800 L630 840 L700 820 L900 820 L940 730 L980 910 L1020 780 L1060 840 L1150 820 L1400 820" fill="none" stroke="url(#coralTeal)" stroke-width="3" stroke-linecap="round" />
      <circle cx="980" cy="910" r="6" fill="#FF7A66" />
      <circle cx="540" cy="880" r="6" fill="#3DD6C3" />
    </svg>`,
  },
]

async function generateProjectCovers() {
  console.log('Generating 7 cover images in AVIF, WebP, and JPEG (1600 & 800 px)...')

  for (const c of covers) {
    const svgBuffer = Buffer.from(c.svg.trim())

    // 1600px
    await sharp(svgBuffer)
      .resize(1600, 1000)
      .avif({ quality: 85 })
      .toFile(path.join(outputDir, `${c.id}-1600.avif`))

    await sharp(svgBuffer)
      .resize(1600, 1000)
      .webp({ quality: 88 })
      .toFile(path.join(outputDir, `${c.id}-1600.webp`))

    await sharp(svgBuffer)
      .resize(1600, 1000)
      .jpeg({ quality: 90 })
      .toFile(path.join(outputDir, `${c.id}-1600.jpg`))

    // 800px
    await sharp(svgBuffer)
      .resize(800, 500)
      .avif({ quality: 85 })
      .toFile(path.join(outputDir, `${c.id}-800.avif`))

    await sharp(svgBuffer)
      .resize(800, 500)
      .webp({ quality: 88 })
      .toFile(path.join(outputDir, `${c.id}-800.webp`))

    await sharp(svgBuffer)
      .resize(800, 500)
      .jpeg({ quality: 90 })
      .toFile(path.join(outputDir, `${c.id}-800.jpg`))

    console.log(`✓ Generated cover assets for: ${c.id}`)
  }
}

generateProjectCovers().catch(console.error)
