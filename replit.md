# YOUNIVERSE Browser - Project Documentation

## Overview
YOUNIVERSE is a consciousness-aware web browser with an integrated premium developer studio. It combines traditional browser functionality with powerful "god-mode" development tools, enabling users to build, edit, and deploy websites directly from the browser while controlling the living architecture of the system itself. The project aims to provide a comprehensive, self-evolving platform for creative development and exploration, integrating advanced AI and consciousness-mapping functionalities.

## User Preferences
- NO harsh white, black, or blue colors
- LOVES themes and cosmic aesthetics
- Wants premium VS Code-like experience
- Cross-platform (desktop + mobile)
- Step-by-step development approach
- God-mode control over system evolution

## System Architecture

### UI/UX Decisions
The browser features a traditional UI (tabs, address bar, etc.) and a "Developer Studio" with a professional VS Code-like aesthetic. It includes 6 distinct cosmic themes (Cosmic Purple, Ocean Blue, Forest Green, Sunset Orange, Rose Pink, Cyber Cyan) characterized by dark cosmic backgrounds, vibrant accent colors, and glassmorphic panels with backdrop blur. The design avoids harsh white or pure black and uses purple-tinted soft foreground colors. The entire interface is mobile-responsive.

### Technical Implementations & Core Features
- **Browser Shell**: Standard browser functionalities like tabs, address bar, navigation, and a comprehensive menu (History, Downloads, Bookmarks, Settings).
- **Developer Studio (IDE)**:
    - **SYSTEM CONTROL (God-Mode Panel)**: Six control panels (Console, Modules, State, Performance, Agents, Security) for real-time monitoring and manipulation of the system's core.
    - **Development Tools**: Includes a full-featured IDE, 3D Platform, AI Agent Builder, Game Maker, Professional Templates, Git Integration, One-click Deployment (Netlify, Vercel, GitHub Pages), Bash Terminal, Multi-model AI Chat Assistant, LLM Trainer, and GAN Trainer.
- **Self-Building Modular Architecture**: A governance system where users can create personal modules or propose public modules. Public modules are unlocked through coherence-weighted voting, influencing their progression through stages (Concept, Preview, Development, Public, Resonance Cluster).
- **Intelligent Module Analysis System ("The Spot")**: An AI agent that analyzes uploaded modules (ZIP format) for compatibility and resonance based on "field weights" (zer, mind, body, heart, soul, spirit). It provides resonance scoring, compatibility checking, and persona feedback.
- **Human Design Chart Portal**: A consciousness-aware astrology calculator that performs natal chart calculations, planetary transits, and Human Design gate/line/color/tone/base calculations across Tropical, Sidereal, and Draconian zodiac systems. It also includes a Magic Square Solver.

### System Design Choices
- **Core Components**: `ResonanceEngine` for field coherence, `ConsciousnessFieldViz` for visualization, `EvolutionaryCore` for agent voting and learning, and `GeoNatalMatrix` for planetary data.
- **Archetype Agents**: `HeartSync`, `SoulKeeper`, and `MindWeaver` for emotional, spiritual, and mental coherence.
- **Technology Stack**: React + TypeScript for the frontend, Tailwind CSS + shadcn/ui for styling, Lucide React for icons, React hooks for state management, and in-memory storage (MemStorage) for transient data.

## External Dependencies
- **Deployment Platforms**: Netlify, Vercel, GitHub Pages for one-click deployment.
- **AI Models**: OpenAI, Claude, Ollama for the AI Chat Assistant and AI Agent Builder.
- **Version Control**: GitHub for Git Integration.
- **3D Graphics**: Three.js (implied by 3D Platform feature).
- **Astrology Calculations**: VSOP87 ephemeris data for planetary positions.