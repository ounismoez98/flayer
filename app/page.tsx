"use client";

import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Briefcase, GraduationCap, 
  ShieldAlert, FolderGit, Sparkles, 
  FileSignature, UserCog, Lock, Zap, Cpu,
  ChevronRight, ChevronLeft, Terminal, Banknote, PenTool,
  CheckCircle2, AlertTriangle, Play, RefreshCw, Layers,
  Code, MessageSquare, ArrowRight, Activity, Database, Server
} from 'lucide-react';

const fadeIn = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: "easeOut" } }
};

const staggerContainer = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1
    }
  }
};

const cardHover = {
  hover: {
    y: -8,
    scale: 1.02,
    boxShadow: "0 20px 40px rgba(6, 182, 212, 0.15)",
    transition: { duration: 0.3, ease: "easeInOut" }
  }
};

const microservices = [
  {
    title: "Intelligent Hiring",
    service: "Candidacy & Offer Services",
    icon: <Briefcase className="w-6 h-6" />,
    borderColor: "hover:border-cyan-500/50",
    glowColor: "group-hover:shadow-[0_0_30px_rgba(6,182,212,0.15)]",
    bgGradient: "from-cyan-500/10 to-blue-500/5",
    iconBg: "bg-cyan-500/10",
    iconColor: "text-cyan-400",
    aiModel: "Ollama (Custom Scoring Model)",
    status: "Active",
    description: "Matches candidates and job offers instantly using automated CV parsing, keyword extraction, and capability-based scoring algorithms."
  },
  {
    title: "Smart Learning",
    service: "Learning Service",
    icon: <GraduationCap className="w-6 h-6" />,
    borderColor: "hover:border-emerald-500/50",
    glowColor: "group-hover:shadow-[0_0_30px_rgba(16,185,129,0.15)]",
    bgGradient: "from-emerald-500/10 to-teal-500/5",
    iconBg: "bg-emerald-500/10",
    iconColor: "text-emerald-400",
    aiModel: "Groq (Llama 3.1 8B) & Ollama",
    status: "Active",
    description: "Features an interactive, in-lesson AI tutor for real-time coding guidance, and dynamically generates custom final exams per student."
  },
  {
    title: "Safe Communication",
    service: "Chat & Notification Services",
    icon: <ShieldAlert className="w-6 h-6" />,
    borderColor: "hover:border-rose-500/50",
    glowColor: "group-hover:shadow-[0_0_30px_rgba(244,63,94,0.15)]",
    bgGradient: "from-rose-500/10 to-pink-500/5",
    iconBg: "bg-rose-500/10",
    iconColor: "text-rose-400",
    aiModel: "Local Llama 3.2 1B (Moderator)",
    status: "Active",
    description: "Filters and moderates platform interactions in real-time, detecting inappropriate content or bad words to guarantee a professional environment."
  },
  {
    title: "Next-Gen Portfolios",
    service: "Portfolio Service",
    icon: <FolderGit className="w-6 h-6" />,
    borderColor: "hover:border-purple-500/50",
    glowColor: "group-hover:shadow-[0_0_30px_rgba(168,85,247,0.15)]",
    bgGradient: "from-purple-500/10 to-indigo-500/5",
    iconBg: "bg-purple-500/10",
    iconColor: "text-purple-400",
    aiModel: "Claude 3.5 Sonnet API",
    status: "Active",
    description: "Refines portfolio texts, generates rich summary bios, and optimizes candidates' professional profiles automatically for high recruiter engagement."
  },
  {
    title: "Frictionless Contracts",
    service: "Contract & Evaluation Services",
    icon: <FileSignature className="w-6 h-6" />,
    borderColor: "hover:border-amber-500/50",
    glowColor: "group-hover:shadow-[0_0_30px_rgba(245,158,11,0.15)]",
    bgGradient: "from-amber-500/10 to-orange-500/5",
    iconBg: "bg-amber-500/10",
    iconColor: "text-amber-400",
    aiModel: "Groq (Llama 3.1 70B) & Qwen2.5",
    status: "Active",
    description: "Generates custom contracts instantly. Once signed, an AI workspace agent drafts and formats tasks, milestones, and shared schedules."
  },
  {
    title: "Intelligent Profiles",
    service: "User Service",
    icon: <UserCog className="w-6 h-6" />,
    borderColor: "hover:border-blue-500/50",
    glowColor: "group-hover:shadow-[0_0_30px_rgba(59,130,246,0.15)]",
    bgGradient: "from-blue-500/10 to-cyan-500/5",
    iconBg: "bg-blue-500/10",
    iconColor: "text-blue-400",
    aiModel: "Built-in Qwen2.5 7B",
    status: "Active",
    description: "Guides onboarding by matching user credentials, auto-formatting experience timelines, and suggesting skills to expand profiles."
  }
];

export default function Home() {
  const [activeTab, setActiveTab] = useState<'hiring' | 'learning' | 'chat' | 'contract'>('hiring');
  
  // Hiring Simulation state
  const [candidateName, setCandidateName] = useState('Sarah Jenkins (Frontend)');
  const [hiringState, setHiringState] = useState<'idle' | 'scanning' | 'success'>('idle');
  const [hiringLogs, setHiringLogs] = useState<string[]>([]);
  const [matchScore, setMatchScore] = useState(0);

  // Learning Simulation state
  const [tutorTopic, setTutorTopic] = useState('Explain React useEffect');
  const [tutorState, setTutorState] = useState<'idle' | 'typing' | 'done'>('idle');
  const [tutorResponse, setTutorResponse] = useState('');

  // Chat Simulation state
  const [chatMessage, setChatMessage] = useState('This project is awesome! But the API is stupidly slow.');
  const [chatResult, setChatResult] = useState<{ original: string; moderated: string; score: number; violations: string[] } | null>(null);
  const [chatState, setChatState] = useState<'idle' | 'checking'>('idle');

  // Contract Simulation state
  const [contractType, setContractType] = useState('Freelated Developer Agreement');
  const [contractState, setContractState] = useState<'idle' | 'drafting' | 'completed'>('idle');
  const [contractContent, setContractContent] = useState('');

  const scrollRef = useRef<HTMLDivElement>(null);

  const scroll = (direction: 'left' | 'right') => {
    if (scrollRef.current) {
      const scrollAmount = direction === 'left' ? -360 : 360;
      scrollRef.current.scrollBy({ left: scrollAmount, behavior: 'smooth' });
    }
  };

  // Run Hiring Demo
  const triggerHiringDemo = () => {
    setHiringState('scanning');
    setHiringLogs(['[Hiring-Service] Fetching CV document...', '[AI Engine] Initializing CV Parser...']);
    setMatchScore(0);
    
    setTimeout(() => {
      setHiringLogs(prev => [...prev, '[Claude-API] Extracting credentials: React, TypeScript, Next.js, 3 yrs experience.']);
    }, 800);

    setTimeout(() => {
      setHiringLogs(prev => [...prev, '[Ollama-Local] Calculating matching weight against Frontend Engineer role requirements...']);
    }, 1800);

    setTimeout(() => {
      setHiringLogs(prev => [...prev, '[Hiring-Service] Completed scoring successfully.']);
      setMatchScore(94);
      setHiringState('success');
    }, 2800);
  };

  // Run Learning Demo
  const triggerLearningDemo = () => {
    setTutorState('typing');
    setTutorResponse('');
    
    const responsesMap: Record<string, string> = {
      'Explain React useEffect': `// Groq (Llama 3.1 8B) Response:
useEffect(() => {
  // 1. Code runs here after every render
  console.log("Component mounted or state updated");

  return () => {
    // 2. Cleanup function runs before unmounting/next runs
    console.log("Cleanup cycle");
  };
}, [dependencies]); // 3. Re-runs only when these change`,
      
      'Explain Docker Compose': `# Ollama (Qwen2.5) Response:
version: '3.8'
services:
  web:
    image: node:20-alpine
    ports:
      - "3000:3000"
    volumes:
      - .:/app
    environment:
      - NODE_ENV=development`,
      
      'How to resolve CORS?': `// Groq Response:
// Add Cors headers to your backend responses (e.g. Express/Spring Boot):
Access-Control-Allow-Origin: *
Access-Control-Allow-Methods: GET, POST, PUT, DELETE, OPTIONS
Access-Control-Allow-Headers: Content-Type, Authorization`
    };

    let idx = 0;
    const fullText = responsesMap[tutorTopic] || "Analyzing query...";
    
    const interval = setInterval(() => {
      if (idx < fullText.length) {
        setTutorResponse(prev => prev + fullText[idx]);
        idx++;
      }
      if (idx >= fullText.length) {
        clearInterval(interval);
        setTutorState('done');
      }
    }, 15);
  };

  // Run Chat Demo
  const triggerChatDemo = () => {
    setChatState('checking');
    setChatResult(null);

    setTimeout(() => {
      const hasViolation = chatMessage.toLowerCase().includes('stupid');
      setChatResult({
        original: chatMessage,
        moderated: chatMessage.replace(/stupidly/gi, '******'),
        score: hasViolation ? 0.82 : 0.04,
        violations: hasViolation ? ['Inappropriate language / insult'] : []
      });
      setChatState('idle');
    }, 1200);
  };

  // Run Contract Demo
  const triggerContractDemo = () => {
    setContractState('drafting');
    setContractContent('');

    const template = `CONTRACT OF SERVICES
----------------------------
PARTIES:
1. BTU HUB Ecosystem ("Client")
2. Collaborative Developer ("Provider")

SCOPE OF WORK:
The Provider agrees to architect, build, and deploy the AI-native microservices, specifically integrating LLM APIs (Claude, Groq, Ollama) securely within the designated workspace.

TERMS & INDEMNIFICATION:
- Local data processing prioritizes privacy-first Ollama pipelines.
- All code is delivered under MIT open-source license.
- Evaluation occurs via automated code-tutor reviews.`;

    let idx = 0;
    const interval = setInterval(() => {
      if (idx < template.length) {
        setContractContent(prev => prev + template[idx]);
        idx++;
      }
      if (idx >= template.length) {
        clearInterval(interval);
        setContractState('completed');
      }
    }, 8);
  };

  return (
    <main className="min-h-screen relative text-slate-50 selection:bg-cyan-500/30 font-sans overflow-hidden bg-[#020617]">
      
      {/* BACKGROUND COVER IMAGE */}
      <div className="absolute inset-0 z-0 bg-cover bg-center bg-fixed pointer-events-none opacity-55" style={{ backgroundImage: "url('/3565.webp')" }} />
      {/* Dark gradient overlay — lighter at top so cover shows, darker lower down */}
      <div className="absolute inset-0 z-0 pointer-events-none" style={{ background: 'linear-gradient(to bottom, rgba(2,6,23,0.45) 0%, rgba(2,6,23,0.70) 40%, rgba(2,6,23,0.92) 75%, #020617 100%)' }} />
      
      {/* GRID OVERLAY */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#0f172a_1px,transparent_1px),linear-gradient(to_bottom,#0f172a_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)] opacity-20 z-0 pointer-events-none" />

      {/* AMBIENT GLOW BLOBS */}
      <div className="absolute top-[-10%] left-[10%] w-[50%] h-[50%] rounded-full bg-cyan-500/10 blur-[150px] pointer-events-none z-0 animate-pulse" style={{ animationDuration: '8s' }} />
      <div className="absolute bottom-[20%] right-[-10%] w-[40%] h-[40%] rounded-full bg-purple-500/10 blur-[150px] pointer-events-none z-0 animate-pulse" style={{ animationDuration: '12s' }} />

      {/* FLOATING GLASSMOPRHIC NAVIGATION */}
      <header className="sticky top-0 w-full z-50 backdrop-blur-lg bg-slate-950/70 border-b border-slate-800/80 transition-all duration-300">
        <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="relative">
              <img
                src="/logo_dark.png"
                alt="BTU Hub Logo"
                className="h-14 w-auto object-contain drop-shadow-[0_0_18px_rgba(6,182,212,0.7)]"
              />
              <div className="absolute -bottom-1 -right-1 w-3.5 h-3.5 rounded-full bg-emerald-500 border-2 border-slate-950" />
            </div>
            <div className="flex flex-col">
              <span className="text-xl font-bold tracking-tight bg-gradient-to-r from-white via-slate-200 to-cyan-400 bg-clip-text text-transparent">BTU Hub</span>
              <span className="text-[10px] text-cyan-400 font-mono tracking-widest uppercase">AI Orchestrator</span>
            </div>
          </div>

          <nav className="hidden md:flex items-center gap-8 text-sm font-medium text-slate-300">
            <a href="#features" className="hover:text-cyan-400 transition-colors">Microservices</a>
            <a href="#architecture" className="hover:text-cyan-400 transition-colors">Architecture</a>
            <a href="#simulator" className="hover:text-cyan-400 transition-colors">AI Simulator</a>
            <a href="#value-prop" className="hover:text-cyan-400 transition-colors">Core Pillars</a>
          </nav>

          <div className="flex items-center gap-4">
            <motion.a 
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              href="#simulator"
              className="px-5 py-2.5 rounded-xl font-semibold text-xs bg-gradient-to-r from-cyan-500 to-blue-600 text-white shadow-[0_0_15px_rgba(6,182,212,0.3)] hover:shadow-[0_0_25px_rgba(6,182,212,0.5)] transition-all flex items-center gap-2"
            >
              <Sparkles className="w-3.5 h-3.5" />
              Launch Simulator
            </motion.a>
          </div>
        </div>
      </header>

      {/* HERO SECTION */}
      <section className="relative pt-20 pb-16 px-6 max-w-7xl mx-auto flex flex-col items-center text-center z-10">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={fadeIn}
          className="flex flex-col items-center w-full"
        >
          {/* Version/Release Badge */}
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-slate-900/80 border border-cyan-500/30 mb-8 backdrop-blur-md shadow-[0_0_15px_rgba(6,182,212,0.1)]">
            <span className="flex h-2 w-2 relative">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
            </span>
            <span className="text-xs font-semibold text-slate-300 tracking-wider">Introducing BTU Hub 2.0: Connected AI Architecture</span>
          </div>
          
          {/* Logo container */}
          <div className="relative mb-6 group">
            <div className="absolute inset-0 rounded-full bg-cyan-500/20 blur-3xl opacity-50 group-hover:opacity-75 transition-opacity duration-500" />
            <img 
              src="/logo_dark.png" 
              alt="BTU Hub Logo" 
              className="h-64 md:h-80 w-auto drop-shadow-[0_0_55px_rgba(6,182,212,0.65)] object-contain relative z-10 hover:scale-105 transition-transform duration-300"
            />
          </div>
          
          <h1 className="text-4xl md:text-7xl font-extrabold tracking-tight mb-6 leading-tight max-w-5xl">
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-white via-slate-100 to-slate-400">
              The Future of Collaborative Ecosystems, 
            </span>
            <br />
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-cyan-400 via-blue-500 to-purple-600 drop-shadow-[0_0_30px_rgba(6,182,212,0.2)]">
              Powered by AI.
            </span>
          </h1>
          
          <p className="text-lg md:text-xl text-slate-400 max-w-3xl mb-10 font-normal leading-relaxed">
            A distributed microservices network uniting <strong className="text-cyan-400 font-semibold">Llama 3.1</strong>, <strong className="text-purple-400 font-semibold">Claude</strong>, and <strong className="text-amber-400 font-semibold">Qwen2.5</strong>. Enabling secure hiring, personalized training, instant contracts, and safe messaging.
          </p>

          {/* Action buttons */}
          <div className="flex flex-col sm:flex-row gap-4 w-full sm:w-auto">
            <motion.button 
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => document.getElementById('features')?.scrollIntoView({ behavior: 'smooth' })}
              className="px-8 py-4 rounded-xl font-semibold bg-slate-900/80 backdrop-blur-md text-slate-200 border border-slate-700/80 hover:bg-slate-800 hover:border-slate-600 transition-colors shadow-lg flex items-center justify-center gap-2"
            >
              Explore Microservices
              <ArrowRight className="w-4 h-4" />
            </motion.button>
            <motion.button 
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => document.getElementById('simulator')?.scrollIntoView({ behavior: 'smooth' })}
              className="px-8 py-4 rounded-xl font-semibold bg-gradient-to-r from-cyan-500 to-blue-600 text-white shadow-[0_0_20px_rgba(6,182,212,0.4)] hover:shadow-[0_0_30px_rgba(6,182,212,0.6)] transition-all flex items-center justify-center gap-2"
            >
              <Sparkles className="w-5 h-5 text-cyan-200 animate-pulse" />
              Try Live AI Simulator
            </motion.button>
          </div>
        </motion.div>
      </section>

      {/* TECH STACK LOGOS & STATS */}
      <section className="py-8 px-6 max-w-7xl mx-auto relative z-10 border-y border-slate-900 bg-slate-950/40 backdrop-blur-sm">
        <div className="flex flex-wrap items-center justify-around gap-8 text-center md:text-left">
          <div className="flex flex-col gap-1 items-center md:items-start">
            <span className="text-xs text-slate-500 uppercase font-mono tracking-widest">Built With Industry Standards</span>
            <div className="flex flex-wrap items-center gap-4 text-sm font-bold text-slate-400 mt-1">
              <span className="px-2.5 py-1 rounded bg-slate-900 border border-slate-800 text-slate-300">Next.js 14</span>
              <span className="px-2.5 py-1 rounded bg-slate-900 border border-slate-800 text-slate-300">Tailwind CSS</span>
              <span className="px-2.5 py-1 rounded bg-slate-900 border border-slate-800 text-slate-300">Framer Motion</span>
              <span className="px-2.5 py-1 rounded bg-slate-900 border border-slate-800 text-slate-300">Spring Boot / Node</span>
            </div>
          </div>
          <div className="h-px w-full md:h-12 md:w-px bg-slate-800" />
          <div className="grid grid-cols-3 gap-8">
            <div>
              <div className="text-2xl md:text-3xl font-extrabold text-cyan-400">6+</div>
              <div className="text-xs text-slate-500 uppercase font-mono">Microservices</div>
            </div>
            <div>
              <div className="text-2xl md:text-3xl font-extrabold text-emerald-400">&lt;150ms</div>
              <div className="text-xs text-slate-500 uppercase font-mono">AI Latency</div>
            </div>
            <div>
              <div className="text-2xl md:text-3xl font-extrabold text-purple-400">100%</div>
              <div className="text-xs text-slate-500 uppercase font-mono">Privacy (Ollama)</div>
            </div>
          </div>
        </div>
      </section>

      {/* FEATURES SECTION (Carousel + Detail Grid) */}
      <section id="features" className="py-24 max-w-7xl mx-auto relative z-10">
        <div className="text-center mb-16 px-6">
          <h2 className="text-3xl md:text-5xl font-extrabold mb-4 text-transparent bg-clip-text bg-gradient-to-r from-white via-slate-100 to-cyan-400">
            Intelligent Microservices
          </h2>
          <p className="text-slate-400 max-w-2xl mx-auto text-base leading-relaxed">
            Our modular structure leverages dedicated containerized services linked together, each enhanced with specialized local or API-driven language models.
          </p>
        </div>

        {/* Carousel controls and frame */}
        <div className="relative group/carousel px-6 md:px-12">
          <button 
            onClick={() => scroll('left')} 
            className="absolute left-2 md:left-6 top-1/2 -translate-y-1/2 z-20 p-3.5 rounded-full bg-slate-900/95 border border-slate-800 hover:border-cyan-500/50 hover:text-cyan-400 text-slate-400 transition-all shadow-2xl backdrop-blur-md"
          >
            <ChevronLeft className="w-6 h-6" />
          </button>
          
          <button 
            onClick={() => scroll('right')} 
            className="absolute right-2 md:right-6 top-1/2 -translate-y-1/2 z-20 p-3.5 rounded-full bg-slate-900/95 border border-slate-800 hover:border-cyan-500/50 hover:text-cyan-400 text-slate-400 transition-all shadow-2xl backdrop-blur-md"
          >
            <ChevronRight className="w-6 h-6" />
          </button>
          
          <div 
            ref={scrollRef}
            className="flex overflow-x-auto gap-6 snap-x snap-mandatory pb-8 pt-4 scrollbar-hide"
            style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
          >
            {microservices.map((service, idx) => (
              <motion.div 
                key={idx}
                variants={cardHover}
                whileHover="hover"
                className={`group p-8 rounded-2xl bg-slate-950/60 border border-slate-800/80 ${service.borderColor} ${service.glowColor} transition-all duration-300 backdrop-blur-md relative overflow-hidden min-w-[320px] max-w-[360px] snap-center flex-shrink-0 shadow-xl flex flex-col justify-between`}
              >
                <div>
                  {/* Decorative background gradient */}
                  <div className={`absolute inset-0 bg-gradient-to-br ${service.bgGradient} opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none`} />
                  
                  {/* Card Header */}
                  <div className="flex items-center gap-4 mb-6 relative z-10">
                    <div className={`p-3 rounded-xl ${service.iconBg} ${service.iconColor} shadow-inner`}>
                      {service.icon}
                    </div>
                    <div>
                      <h3 className="text-xl font-bold text-slate-100 group-hover:text-white transition-colors">{service.title}</h3>
                      <span className="text-xs text-slate-500 font-mono tracking-tight">{service.service}</span>
                    </div>
                  </div>

                  {/* Card Body */}
                  <p className="text-slate-400 text-sm leading-relaxed mb-6 relative z-10 font-normal">
                    {service.description}
                  </p>
                </div>

                {/* Card Footer details */}
                <div className="border-t border-slate-900 pt-4 relative z-10 flex flex-col gap-2">
                  <div className="flex justify-between items-center text-xs">
                    <span className="text-slate-500 font-mono">AI Integration:</span>
                    <span className="text-slate-300 font-semibold font-mono">{service.aiModel}</span>
                  </div>
                  <div className="flex justify-between items-center text-xs">
                    <span className="text-slate-500 font-mono">Service Status:</span>
                    <span className="flex items-center gap-1.5 font-semibold text-emerald-400">
                      <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                      {service.status}
                    </span>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ARCHITECTURE FLOW DIAGRAM */}
      <section id="architecture" className="py-24 px-6 bg-slate-950/40 border-y border-slate-900 relative z-10 backdrop-blur-sm">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-5xl font-extrabold mb-4 text-transparent bg-clip-text bg-gradient-to-r from-white via-slate-100 to-purple-400">
              Ecosystem Architecture
            </h2>
            <p className="text-slate-400 max-w-2xl mx-auto">
              How the microservices connect dynamically to local and API-driven language engines using Spring Boot, Node, and a RabbitMQ event broker.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center bg-slate-900/20 p-8 rounded-3xl border border-slate-800/80 backdrop-blur-xl">
            {/* Left Column: UI / Clients */}
            <div className="lg:col-span-3 flex flex-col gap-4">
              <div className="p-5 rounded-2xl bg-slate-950/80 border border-slate-800 text-center relative">
                <div className="absolute -right-3 top-1/2 -translate-y-1/2 hidden lg:block text-slate-700">➔</div>
                <h4 className="text-slate-100 font-bold mb-1">Angular / Next.js Client</h4>
                <p className="text-slate-500 text-xs font-mono">Frontend Interface</p>
              </div>
              <div className="p-5 rounded-2xl bg-slate-950/80 border border-slate-800 text-center relative">
                <div className="absolute -right-3 top-1/2 -translate-y-1/2 hidden lg:block text-slate-700">➔</div>
                <h4 className="text-slate-100 font-bold mb-1">Keycloak Auth Server</h4>
                <p className="text-slate-500 text-xs font-mono">OIDC Single Sign-On</p>
              </div>
            </div>

            {/* Middle Column: API Gateway & Broker */}
            <div className="lg:col-span-6 flex flex-col gap-6 items-center">
              <div className="w-full p-6 rounded-2xl bg-[#0f172a]/80 border border-cyan-500/20 text-center shadow-lg relative">
                <div className="absolute top-1/2 left-3 -translate-y-1/2 hidden lg:block text-slate-700">➔</div>
                <div className="absolute top-1/2 right-3 -translate-y-1/2 hidden lg:block text-slate-700">➔</div>
                <div className="inline-flex p-2 rounded-lg bg-cyan-500/10 text-cyan-400 mb-2">
                  <Server className="w-5 h-5" />
                </div>
                <h3 className="text-slate-100 font-bold mb-1">Spring Cloud Gateway</h3>
                <p className="text-slate-400 text-xs max-w-sm mx-auto">Dynamic route resolution, rate limiting, and core load balancing across services.</p>
              </div>

              {/* Data Flow Line / Messaging */}
              <div className="flex items-center justify-between w-full border border-dashed border-slate-800 rounded-xl p-4 bg-slate-950/40 text-xs font-mono">
                <div className="flex items-center gap-2">
                  <span className="w-2.5 h-2.5 rounded-full bg-cyan-500 animate-pulse" />
                  <span className="text-slate-400">RabbitMQ Broker</span>
                </div>
                <div className="text-slate-500">Asynchronous Event Streaming</div>
                <div className="text-cyan-400">Direct Exchanges</div>
              </div>
            </div>

            {/* Right Column: AI / Local models */}
            <div className="lg:col-span-3 flex flex-col gap-4">
              <div className="p-5 rounded-2xl bg-slate-950/80 border border-purple-500/30 text-center relative">
                <div className="absolute -left-3 top-1/2 -translate-y-1/2 hidden lg:block text-slate-700">➔</div>
                <div className="inline-flex p-1.5 rounded bg-purple-500/10 text-purple-400 mb-2 font-bold font-mono text-[10px]">LOCAL ENGINE</div>
                <h4 className="text-slate-100 font-bold mb-1">Ollama / Qwen2.5</h4>
                <p className="text-slate-500 text-xs font-mono">Task Planning & Exams</p>
              </div>
              <div className="p-5 rounded-2xl bg-slate-950/80 border border-cyan-500/30 text-center relative">
                <div className="absolute -left-3 top-1/2 -translate-y-1/2 hidden lg:block text-slate-700">➔</div>
                <div className="inline-flex p-1.5 rounded bg-cyan-500/10 text-cyan-400 mb-2 font-bold font-mono text-[10px]">ULTRA LATENCY</div>
                <h4 className="text-slate-100 font-bold mb-1">Groq (Llama 3.1 8B)</h4>
                <p className="text-slate-500 text-xs font-mono">Coding Tutor & Contracts</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CORE VALUE PILLARS */}
      <section id="value-prop" className="py-24 px-6 relative z-10 max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="p-8 rounded-2xl bg-slate-950/60 border border-slate-800/80 backdrop-blur-md flex flex-col items-center text-center shadow-lg hover:border-slate-700 transition-colors"
          >
            <div className="p-4 rounded-xl bg-slate-900 border border-slate-800 text-emerald-400 mb-6 shadow-xl">
              <Lock className="w-8 h-8 drop-shadow-[0_0_10px_rgba(16,185,129,0.3)]" />
            </div>
            <h3 className="text-xl font-bold mb-3 text-slate-100">Privacy-First AI</h3>
            <p className="text-slate-400 text-sm leading-relaxed">
              We process critical candidate profiles, chats, and assessment data locally using Docker-mounted Ollama nodes. Your corporate code never leaves your server.
            </p>
          </motion.div>

          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.15 }}
            className="p-8 rounded-2xl bg-slate-950/60 border border-slate-800/80 backdrop-blur-md flex flex-col items-center text-center shadow-lg hover:border-slate-700 transition-colors"
          >
            <div className="p-4 rounded-xl bg-slate-900 border border-slate-800 text-cyan-400 mb-6 shadow-xl">
              <Zap className="w-8 h-8 drop-shadow-[0_0_10px_rgba(6,182,212,0.3)]" />
            </div>
            <h3 className="text-xl font-bold mb-3 text-slate-100">Groq Acceleration</h3>
            <p className="text-slate-400 text-sm leading-relaxed">
              Real-time coding reviews and contract drafting are supported by the Groq LPU pipeline, rendering structural responses in milliseconds for absolute productivity.
            </p>
          </motion.div>

          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.3 }}
            className="p-8 rounded-2xl bg-slate-950/60 border border-slate-800/80 backdrop-blur-md flex flex-col items-center text-center shadow-lg hover:border-slate-700 transition-colors"
          >
            <div className="p-4 rounded-xl bg-slate-900 border border-slate-800 text-purple-400 mb-6 shadow-xl">
              <Layers className="w-8 h-8 drop-shadow-[0_0_10px_rgba(168,85,247,0.3)]" />
            </div>
            <h3 className="text-xl font-bold mb-3 text-slate-100">Elastic Microservices</h3>
            <p className="text-slate-400 text-sm leading-relaxed">
              Every segment operates inside containerized Docker instances, interacting through secure API channels. Scale and redeploy components without system-wide downtime.
            </p>
          </motion.div>
        </div>
      </section>

      {/* INTERACTIVE SIMULATOR (ADVANCED DEMO) */}
      <section id="simulator" className="py-24 px-6 max-w-5xl mx-auto relative z-10">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-5xl font-extrabold mb-4 text-transparent bg-clip-text bg-gradient-to-r from-white via-slate-100 to-cyan-400">
            Interactive AI Sandbox
          </h2>
          <p className="text-slate-400 max-w-xl mx-auto">
            Test the underlying language models directly. Click the tabs below to simulate microservice tasks in real-time.
          </p>
        </div>

        <div className="rounded-3xl border border-slate-800 bg-slate-950/80 overflow-hidden shadow-[0_20px_50px_rgba(0,0,0,0.6)] backdrop-blur-2xl grid grid-cols-1 md:grid-cols-12 min-h-[460px]">
          
          {/* Left Column: Tab Selectors */}
          <div className="md:col-span-4 bg-slate-950 border-b md:border-b-0 md:border-r border-slate-800/80 p-6 flex flex-col gap-2">
            <h4 className="text-xs text-slate-500 uppercase tracking-widest font-mono mb-4">Choose Microservice</h4>
            
            <button 
              onClick={() => setActiveTab('hiring')}
              className={`flex items-center gap-3 p-4 rounded-xl text-left border transition-all ${activeTab === 'hiring' ? 'bg-cyan-500/10 border-cyan-500/30 text-cyan-400 shadow-md' : 'bg-slate-900/20 border-transparent text-slate-400 hover:text-slate-200 hover:bg-slate-900/50'}`}
            >
              <Briefcase className="w-5 h-5 flex-shrink-0" />
              <div>
                <div className="font-bold text-sm">CV Scoring</div>
                <div className="text-[10px] opacity-70 font-mono">Candidacy Service</div>
              </div>
            </button>

            <button 
              onClick={() => setActiveTab('learning')}
              className={`flex items-center gap-3 p-4 rounded-xl text-left border transition-all ${activeTab === 'learning' ? 'bg-emerald-500/10 border-emerald-500/30 text-emerald-400 shadow-md' : 'bg-slate-900/20 border-transparent text-slate-400 hover:text-slate-200 hover:bg-slate-900/50'}`}
            >
              <GraduationCap className="w-5 h-5 flex-shrink-0" />
              <div>
                <div className="font-bold text-sm">AI Coding Tutor</div>
                <div className="text-[10px] opacity-70 font-mono">Learning Service</div>
              </div>
            </button>

            <button 
              onClick={() => setActiveTab('chat')}
              className={`flex items-center gap-3 p-4 rounded-xl text-left border transition-all ${activeTab === 'chat' ? 'bg-rose-500/10 border-rose-500/30 text-rose-400 shadow-md' : 'bg-slate-900/20 border-transparent text-slate-400 hover:text-slate-200 hover:bg-slate-900/50'}`}
            >
              <ShieldAlert className="w-5 h-5 flex-shrink-0" />
              <div>
                <div className="font-bold text-sm">Chat Moderation</div>
                <div className="text-[10px] opacity-70 font-mono">Chat Service</div>
              </div>
            </button>

            <button 
              onClick={() => setActiveTab('contract')}
              className={`flex items-center gap-3 p-4 rounded-xl text-left border transition-all ${activeTab === 'contract' ? 'bg-amber-500/10 border-amber-500/30 text-amber-400 shadow-md' : 'bg-slate-900/20 border-transparent text-slate-400 hover:text-slate-200 hover:bg-slate-900/50'}`}
            >
              <FileSignature className="w-5 h-5 flex-shrink-0" />
              <div>
                <div className="font-bold text-sm">Contract Drafter</div>
                <div className="text-[10px] opacity-70 font-mono">Contract Service</div>
              </div>
            </button>
          </div>

          {/* Right Column: Interactive Console */}
          <div className="md:col-span-8 p-6 flex flex-col justify-between bg-slate-900/40 relative">
            <div className="absolute top-4 right-4 flex gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-rose-500" />
              <span className="w-2.5 h-2.5 rounded-full bg-amber-500" />
              <span className="w-2.5 h-2.5 rounded-full bg-emerald-500" />
            </div>

            {/* TAB CONTENT: HIRING / CV PARSE */}
            {activeTab === 'hiring' && (
              <div className="flex-1 flex flex-col">
                <div className="mb-4">
                  <label className="text-xs text-slate-400 font-mono block mb-2">Select CV Profile to Scan:</label>
                  <select 
                    value={candidateName} 
                    onChange={(e) => { setCandidateName(e.target.value); setHiringState('idle'); setHiringLogs([]); setMatchScore(0); }}
                    className="w-full px-4 py-2.5 rounded-xl bg-slate-950 border border-slate-800 text-slate-200 text-sm font-medium focus:border-cyan-500 focus:outline-none"
                  >
                    <option value="Sarah Jenkins (Frontend)">Sarah Jenkins (React, Next.js, TypeScript) — 3 yrs exp</option>
                    <option value="Michael Zhang (Backend)">Michael Zhang (Spring Boot, Java, MySQL, RabbitMQ) — 5 yrs exp</option>
                    <option value="David Miller (DevOps)">David Miller (Docker, Kubernetes, AWS Cloud) — 2 yrs exp</option>
                  </select>
                </div>

                <div className="flex-1 font-mono text-xs bg-slate-950/80 p-5 rounded-2xl border border-slate-800/80 space-y-2 mb-6 min-h-[160px] max-h-[200px] overflow-y-auto">
                  <div className="text-slate-500">&gt;_ AI Candidate Matchmaker ready.</div>
                  {hiringLogs.map((log, idx) => (
                    <div key={idx} className="text-slate-300">{log}</div>
                  ))}
                  {hiringState === 'scanning' && (
                    <div className="text-cyan-400 animate-pulse">▋ Scoring candidate credentials in background...</div>
                  )}
                  {hiringState === 'success' && (
                    <div className="text-emerald-400 font-bold flex items-center gap-2 mt-2">
                      <CheckCircle2 className="w-4 h-4" />
                      Success: Scoring calculations verified.
                    </div>
                  )}
                </div>

                {hiringState === 'success' && (
                  <motion.div 
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="p-4 rounded-2xl bg-cyan-500/5 border border-cyan-500/20 flex items-center justify-between mb-4"
                  >
                    <div>
                      <div className="text-xs text-slate-400 font-mono">Parsed Role compatibility:</div>
                      <div className="text-lg font-extrabold text-cyan-400 font-mono">Match Score: {matchScore}%</div>
                    </div>
                    <div className="h-10 w-10 rounded-full border-4 border-cyan-500/20 border-t-cyan-400 flex items-center justify-center text-xs font-bold font-mono">
                      {matchScore}%
                    </div>
                  </motion.div>
                )}

                <div className="mt-auto">
                  {hiringState === 'idle' && (
                    <button 
                      onClick={triggerHiringDemo}
                      className="w-full py-3 rounded-xl bg-cyan-500/10 hover:bg-cyan-500/20 text-cyan-400 border border-cyan-500/30 hover:border-cyan-500/50 font-bold text-sm transition-all flex items-center justify-center gap-2 shadow-lg"
                    >
                      <Play className="w-4 h-4" />
                      Scan CV & Calculate Match
                    </button>
                  )}
                  {hiringState === 'success' && (
                    <button 
                      onClick={() => { setHiringState('idle'); setHiringLogs([]); setMatchScore(0); }}
                      className="w-full py-3 rounded-xl bg-slate-900 hover:bg-slate-800 text-slate-300 border border-slate-850 font-semibold text-sm transition-all"
                    >
                      Reset Scanner
                    </button>
                  )}
                  {hiringState === 'scanning' && (
                    <button disabled className="w-full py-3 rounded-xl bg-slate-950 text-slate-600 border border-slate-900 cursor-not-allowed font-semibold text-sm flex items-center justify-center gap-2">
                      <RefreshCw className="w-4 h-4 animate-spin" />
                      Processing Engine...
                    </button>
                  )}
                </div>
              </div>
            )}

            {/* TAB CONTENT: LEARNING / TUTOR */}
            {activeTab === 'learning' && (
              <div className="flex-1 flex flex-col">
                <div className="mb-4">
                  <label className="text-xs text-slate-400 font-mono block mb-2">Ask Code Tutor (Groq / Llama 3.1):</label>
                  <select 
                    value={tutorTopic} 
                    onChange={(e) => { setTutorTopic(e.target.value); setTutorState('idle'); setTutorResponse(''); }}
                    className="w-full px-4 py-2.5 rounded-xl bg-slate-950 border border-slate-800 text-slate-200 text-sm font-medium focus:border-emerald-500 focus:outline-none"
                  >
                    <option value="Explain React useEffect">Explain React useEffect (Hook lifecycle)</option>
                    <option value="Explain Docker Compose">Explain Docker Compose (YAML config)</option>
                    <option value="How to resolve CORS?">How to resolve CORS? (Backend headers)</option>
                  </select>
                </div>

                <div className="flex-1 font-mono text-xs bg-slate-950/80 p-5 rounded-2xl border border-slate-800/80 min-h-[180px] max-h-[220px] overflow-y-auto mb-6 whitespace-pre-wrap text-emerald-300 leading-relaxed">
                  {tutorResponse || <span className="text-slate-500">// Select a topic and launch query simulation...</span>}
                  {tutorState === 'typing' && <span className="text-emerald-400 animate-pulse">▋</span>}
                </div>

                <div className="mt-auto">
                  {tutorState !== 'typing' ? (
                    <button 
                      onClick={triggerLearningDemo}
                      className="w-full py-3 rounded-xl bg-emerald-500/10 hover:bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 hover:border-emerald-500/50 font-bold text-sm transition-all flex items-center justify-center gap-2"
                    >
                      <Code className="w-4 h-4" />
                      Ask Llama 3.1
                    </button>
                  ) : (
                    <button disabled className="w-full py-3 rounded-xl bg-slate-950 text-slate-600 border border-slate-900 cursor-not-allowed font-semibold text-sm flex items-center justify-center gap-2">
                      <RefreshCw className="w-4 h-4 animate-spin" />
                      Streaming Response...
                    </button>
                  )}
                </div>
              </div>
            )}

            {/* TAB CONTENT: CHAT MODERATOR */}
            {activeTab === 'chat' && (
              <div className="flex-1 flex flex-col">
                <div className="mb-4">
                  <label className="text-xs text-slate-400 font-mono block mb-2">Type Chat Message to Moderated:</label>
                  <input 
                    type="text" 
                    value={chatMessage} 
                    onChange={(e) => { setChatMessage(e.target.value); setChatResult(null); }}
                    className="w-full px-4 py-2.5 rounded-xl bg-slate-950 border border-slate-800 text-slate-200 text-sm font-medium focus:border-rose-500 focus:outline-none"
                    placeholder="Enter message..." 
                  />
                </div>

                <div className="flex-1 font-mono text-xs bg-slate-950/80 p-5 rounded-2xl border border-slate-800/80 min-h-[140px] max-h-[180px] overflow-y-auto mb-6 space-y-3">
                  {chatResult ? (
                    <div className="space-y-3">
                      <div>
                        <span className="text-slate-500">Original Message:</span>
                        <div className="text-slate-300 pl-2 mt-0.5 font-sans">"{chatResult.original}"</div>
                      </div>
                      <div>
                        <span className="text-slate-500">AI Moderated Result:</span>
                        <div className="text-rose-400 pl-2 mt-0.5 font-semibold font-sans">"{chatResult.moderated}"</div>
                      </div>
                      <div className="flex items-center gap-4 text-[10px] border-t border-slate-900 pt-2.5">
                        <div className="flex items-center gap-1">
                          <span className="text-slate-500">Toxicity Score:</span>
                          <span className={`font-bold ${chatResult.score > 0.5 ? 'text-rose-400' : 'text-emerald-400'}`}>{chatResult.score * 100}%</span>
                        </div>
                        {chatResult.violations.length > 0 && (
                          <div className="flex items-center gap-1 text-rose-400 font-bold">
                            <AlertTriangle className="w-3.5 h-3.5" />
                            <span>{chatResult.violations[0]}</span>
                          </div>
                        )}
                      </div>
                    </div>
                  ) : (
                    <div className="text-slate-500">
                      {chatState === 'checking' ? (
                        <span className="text-rose-400 animate-pulse">Checking toxicity vectors using Llama 3.2...</span>
                      ) : (
                        '// Type a message containing sensitive keywords (e.g. "stupid") and test.'
                      )}
                    </div>
                  )}
                </div>

                <div className="mt-auto">
                  {chatState === 'idle' ? (
                    <button 
                      onClick={triggerChatDemo}
                      className="w-full py-3 rounded-xl bg-rose-500/10 hover:bg-rose-500/20 text-rose-400 border border-rose-500/30 hover:border-rose-500/50 font-bold text-sm transition-all flex items-center justify-center gap-2"
                    >
                      <MessageSquare className="w-4 h-4" />
                      Filter Content Safety
                    </button>
                  ) : (
                    <button disabled className="w-full py-3 rounded-xl bg-slate-950 text-slate-600 border border-slate-900 cursor-not-allowed font-semibold text-sm flex items-center justify-center gap-2">
                      <RefreshCw className="w-4 h-4 animate-spin" />
                      Running Moderation Engine...
                    </button>
                  )}
                </div>
              </div>
            )}

            {/* TAB CONTENT: CONTRACT DRAFTER */}
            {activeTab === 'contract' && (
              <div className="flex-1 flex flex-col">
                <div className="mb-4">
                  <label className="text-xs text-slate-400 font-mono block mb-2">Select Agreement Schema:</label>
                  <select 
                    value={contractType} 
                    onChange={(e) => { setContractType(e.target.value); setContractState('idle'); setContractContent(''); }}
                    className="w-full px-4 py-2.5 rounded-xl bg-slate-950 border border-slate-800 text-slate-200 text-sm font-medium focus:border-amber-500 focus:outline-none"
                  >
                    <option value="Freelated Developer Agreement">Freelance Developer Contract (NDA Included)</option>
                    <option value="Research & Development Partnership">Corporate Partnership Framework</option>
                  </select>
                </div>

                <div className="flex-1 font-mono text-xs bg-slate-950/80 p-5 rounded-2xl border border-slate-800/80 min-h-[160px] max-h-[200px] overflow-y-auto mb-6 text-amber-300 whitespace-pre-wrap leading-relaxed">
                  {contractContent || <span className="text-slate-500">// Select a layout and generate legal clauses...</span>}
                  {contractState === 'drafting' && <span className="text-amber-400 animate-pulse">▋</span>}
                </div>

                <div className="mt-auto">
                  {contractState !== 'drafting' ? (
                    <button 
                      onClick={triggerContractDemo}
                      className="w-full py-3 rounded-xl bg-amber-500/10 hover:bg-amber-500/20 text-amber-400 border border-amber-500/30 hover:border-amber-500/50 font-bold text-sm transition-all flex items-center justify-center gap-2"
                    >
                      <FileSignature className="w-4 h-4" />
                      Draft Contract (Groq)
                    </button>
                  ) : (
                    <button disabled className="w-full py-3 rounded-xl bg-slate-950 text-slate-600 border border-slate-900 cursor-not-allowed font-semibold text-sm flex items-center justify-center gap-2">
                      <RefreshCw className="w-4 h-4 animate-spin" />
                      Formulating Clauses...
                    </button>
                  )}
                </div>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="py-12 border-t border-slate-900 text-center relative z-10 bg-slate-950/80 backdrop-blur-md">
        <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-3">
            <img
              src="/logo_dark.png"
              alt="BTU Hub Logo"
              className="h-12 w-auto object-contain drop-shadow-[0_0_14px_rgba(6,182,212,0.65)]"
            />
            <span className="text-lg font-bold tracking-tight text-white">BTU Hub</span>
          </div>

          <div className="flex gap-6 text-sm text-slate-500">
            <a href="#" className="hover:text-cyan-400 transition-colors">Platform Status</a>
            <span>•</span>
            <a href="#" className="hover:text-cyan-400 transition-colors">GitHub Repository</a>
            <span>•</span>
            <a href="#" className="hover:text-cyan-400 transition-colors">Documentation</a>
          </div>

          <p className="text-slate-600 text-xs">© 2026 BTU Hub. University Booth Competition.</p>
        </div>
      </footer>

      {/* GLOBAL SCROLLBAR HIDE */}
      <style dangerouslySetInnerHTML={{__html: `
        .scrollbar-hide::-webkit-scrollbar {
            display: none;
        }
      `}} />
    </main>
  );
}
