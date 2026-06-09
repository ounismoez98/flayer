"use client";

import React, { useState, useRef } from 'react';
import { motion } from 'framer-motion';
import { 
  Briefcase, GraduationCap, 
  ShieldAlert, FolderGit, Sparkles, 
  FileSignature, UserCog, Lock, Zap, Cpu,
  ChevronRight, ChevronLeft, Terminal, Banknote, PenTool
} from 'lucide-react';

const fadeIn = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6 } }
};

const featuresData = [
  {
    title: "Intelligent Hiring",
    icon: <Briefcase className="w-6 h-6" />,
    borderHover: "hover:border-cyan-500/50",
    bgGradient: "from-cyan-500/5 to-blue-500/5",
    iconBg: "bg-cyan-500/10",
    iconColor: "text-cyan-400",
    description: "AI Job Matching and Smart CV Parsing & Scoring to find the perfect fit instantly."
  },
  {
    title: "Smart Learning",
    icon: <GraduationCap className="w-6 h-6" />,
    borderHover: "hover:border-emerald-500/50",
    bgGradient: "from-emerald-500/5 to-green-500/5",
    iconBg: "bg-emerald-500/10",
    iconColor: "text-emerald-400",
    description: "In-Lesson AI Code Tutor (Groq) and Personalized Final Exams generated dynamically (Ollama)."
  },
  {
    title: "Safe Communication",
    icon: <ShieldAlert className="w-6 h-6" />,
    borderHover: "hover:border-pink-500/50",
    bgGradient: "from-pink-500/5 to-rose-500/5",
    iconBg: "bg-pink-500/10",
    iconColor: "text-pink-400",
    description: "AI Badword Detection & Moderation ensuring a safe, inclusive, and professional environment."
  },
  {
    title: "Next-Gen Portfolios",
    icon: <FolderGit className="w-6 h-6" />,
    borderHover: "hover:border-purple-500/50",
    bgGradient: "from-purple-500/5 to-indigo-500/5",
    iconBg: "bg-purple-500/10",
    iconColor: "text-purple-400",
    description: "Stand out with intelligent portfolio summaries and content enhancements driven by Claude."
  },
  {
    title: "Frictionless Contracts",
    icon: <FileSignature className="w-6 h-6" />,
    borderHover: "hover:border-orange-500/50",
    bgGradient: "from-orange-500/5 to-amber-500/5",
    iconBg: "bg-orange-500/10",
    iconColor: "text-orange-400",
    description: "AI-Drafted Contracts (Groq) and Collaborative Task Planning powered by Qwen2.5."
  },
  {
    title: "Intelligent Profiles",
    icon: <UserCog className="w-6 h-6" />,
    borderHover: "hover:border-blue-500/50",
    bgGradient: "from-blue-500/5 to-cyan-500/5",
    iconBg: "bg-blue-500/10",
    iconColor: "text-blue-400",
    description: "Smart onboarding and profile generation assistance to present your best professional self."
  },
  {
    title: "Study Financing",
    icon: <Banknote className="w-6 h-6" />,
    borderHover: "hover:border-green-500/50",
    bgGradient: "from-green-500/5 to-emerald-500/5",
    iconBg: "bg-green-500/10",
    iconColor: "text-green-400",
    description: "Discover AI-matched scholarships and flexible work opportunities to help pay for your studies."
  },
  {
    title: "Content & Blog",
    icon: <PenTool className="w-6 h-6" />,
    borderHover: "hover:border-rose-500/50",
    bgGradient: "from-rose-500/5 to-pink-500/5",
    iconBg: "bg-rose-500/10",
    iconColor: "text-rose-400",
    description: "A dedicated space for content creation, sharing insights, and building your personal brand."
  }
];

export default function Home() {
  const [demoState, setDemoState] = useState<'idle' | 'loading' | 'success'>('idle');
  const [demoOutput, setDemoOutput] = useState<string[]>([]);
  const scrollRef = useRef<HTMLDivElement>(null);

  const runDemo = () => {
    setDemoState('loading');
    setDemoOutput(['[AI Agent] Connecting to Llama 3.1...', '[System] Analyzing CV Data...']);
    
    setTimeout(() => {
      setDemoOutput(prev => [...prev, '[Model] Extracting key skills: React, Next.js, AI Integration...']);
    }, 800);

    setTimeout(() => {
      setDemoOutput(prev => [...prev, '[Scoring] Match Score: 98% - Perfect Fit!']);
      setDemoState('success');
    }, 1800);
  };

  const resetDemo = () => {
    setDemoState('idle');
    setDemoOutput([]);
  };

  const scroll = (direction: 'left' | 'right') => {
    if (scrollRef.current) {
      const { current } = scrollRef;
      const scrollAmount = direction === 'left' ? -340 : 340;
      current.scrollBy({ left: scrollAmount, behavior: 'smooth' });
    }
  };

  return (
    <main className="min-h-screen relative text-slate-50 selection:bg-cyan-500/30 font-sans overflow-hidden">
      {/* Background Image and Overlay */}
      <div className="absolute inset-0 z-0 bg-cover bg-center bg-fixed" style={{ backgroundImage: "url('/3565.webp')" }} />
      <div className="absolute inset-0 z-0 bg-slate-950/80 backdrop-blur-[2px]" />
      
      {/* Background ambient light */}
      <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] rounded-full bg-cyan-900/40 blur-[120px] pointer-events-none z-0" />
      <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] rounded-full bg-purple-900/40 blur-[120px] pointer-events-none z-0" />

      {/* HERO SECTION */}
      <section className="relative pt-24 pb-20 px-6 max-w-7xl mx-auto flex flex-col items-center text-center z-10">
        <motion.div
          initial="hidden"
          animate="visible"
          variants={fadeIn}
          className="flex flex-col items-center w-full"
        >
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-slate-800/50 border border-slate-700/50 mb-8 backdrop-blur-sm">
            <Sparkles className="w-4 h-4 text-emerald-400" />
            <span className="text-sm font-medium text-slate-300">Powered by Llama 3.1 • Claude • Qwen2.5</span>
          </div>
          
          <img src="/logo_dark.png" alt="BTU Hub Logo" className="h-40 md:h-60 w-auto mb-6 drop-shadow-[0_0_35px_rgba(6,182,212,0.6)] object-contain" />
          
          <h1 className="text-5xl md:text-7xl font-extrabold tracking-tight mb-6 glow-text-cyan">
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-cyan-400 via-blue-500 to-purple-600">
              BTU Hub
            </span>
          </h1>
          
          <p className="text-xl md:text-2xl text-slate-300 max-w-3xl mb-10 font-light drop-shadow-md">
            The Future of Collaborative Ecosystems, Powered by AI.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 w-full sm:w-auto">
            <motion.button 
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => document.getElementById('features')?.scrollIntoView({ behavior: 'smooth' })}
              className="px-8 py-4 rounded-xl font-semibold bg-slate-800/80 backdrop-blur-md text-slate-200 border border-slate-600 hover:bg-slate-700 transition-colors"
            >
              Explore Ecosystem
            </motion.button>
            <motion.button 
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="px-8 py-4 rounded-xl font-semibold bg-gradient-to-r from-cyan-500 to-blue-600 text-white shadow-[0_0_20px_rgba(6,182,212,0.4)] hover:shadow-[0_0_30px_rgba(6,182,212,0.6)] transition-shadow relative overflow-hidden group"
            >
              <div className="absolute inset-0 bg-white/20 group-hover:translate-x-full transition-transform duration-500 -translate-x-full skew-x-12" />
              Join the Revolution
            </motion.button>
          </div>
        </motion.div>
      </section>

      {/* FEATURES SECTION (Dynamic Carousel) */}
      <section id="features" className="py-24 max-w-7xl mx-auto relative z-10 overflow-hidden">
        <div className="text-center mb-16 px-6">
          <h2 className="text-3xl md:text-5xl font-bold mb-4 glow-text-purple text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-600">
            Intelligent Microservices
          </h2>
          <p className="text-slate-300 max-w-2xl mx-auto drop-shadow-sm">
            Our modular architecture seamlessly integrates state-of-the-art AI into every workflow.
          </p>
        </div>

        <div className="relative group/carousel">
          <button 
            onClick={() => scroll('left')} 
            className="absolute left-2 md:left-6 top-1/2 -translate-y-1/2 z-20 p-4 rounded-full bg-slate-900/80 border border-slate-700 hover:bg-slate-800 hover:border-cyan-500 backdrop-blur-md text-slate-300 transition-all shadow-[0_0_15px_rgba(0,0,0,0.5)] hover:text-cyan-400 opacity-0 group-hover/carousel:opacity-100 disabled:opacity-0"
          >
            <ChevronLeft className="w-6 h-6" />
          </button>
          
          <button 
            onClick={() => scroll('right')} 
            className="absolute right-2 md:right-6 top-1/2 -translate-y-1/2 z-20 p-4 rounded-full bg-slate-900/80 border border-slate-700 hover:bg-slate-800 hover:border-cyan-500 backdrop-blur-md text-slate-300 transition-all shadow-[0_0_15px_rgba(0,0,0,0.5)] hover:text-cyan-400 opacity-0 group-hover/carousel:opacity-100"
          >
            <ChevronRight className="w-6 h-6" />
          </button>
          
          <div 
            ref={scrollRef}
            className="flex overflow-x-auto gap-6 snap-x snap-mandatory px-6 md:px-12 pb-8 pt-4 scrollbar-hide"
            style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
          >
            {featuresData.map((feature, idx) => (
              <motion.div 
                key={idx}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ delay: idx * 0.1 }}
                className={`group p-8 rounded-2xl bg-slate-900/70 border border-slate-800 ${feature.borderHover} transition-all duration-300 backdrop-blur-xl relative overflow-hidden min-w-[300px] max-w-[340px] snap-center flex-shrink-0 shadow-xl`}
              >
                <div className={`absolute inset-0 bg-gradient-to-br ${feature.bgGradient} opacity-0 group-hover:opacity-100 transition-opacity duration-500`} />
                <div className="flex items-center gap-4 mb-6 relative z-10">
                  <div className={`p-3 rounded-xl ${feature.iconBg} ${feature.iconColor} shadow-inner`}>
                    {feature.icon}
                  </div>
                  <h3 className="text-xl font-bold text-slate-100">{feature.title}</h3>
                </div>
                <p className="text-slate-300 text-sm leading-relaxed relative z-10 font-medium">
                  {feature.description}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* VALUE PROP SECTION */}
      <section className="py-24 px-6 bg-slate-950/60 border-y border-slate-800/50 relative z-10 backdrop-blur-sm">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12 text-center">
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="flex flex-col items-center"
            >
              <div className="p-4 rounded-full bg-slate-800/80 mb-6 shadow-lg border border-slate-700/50">
                <Lock className="w-8 h-8 text-emerald-400 drop-shadow-md" />
              </div>
              <h3 className="text-xl font-bold mb-3 text-slate-100">Privacy-First Local AI</h3>
              <p className="text-slate-300 text-sm font-medium">Sensitive data stays completely secure within our self-hosted Ollama models.</p>
            </motion.div>

            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className="flex flex-col items-center"
            >
              <div className="p-4 rounded-full bg-slate-800/80 mb-6 shadow-lg border border-slate-700/50">
                <Zap className="w-8 h-8 text-cyan-400 drop-shadow-md" />
              </div>
              <h3 className="text-xl font-bold mb-3 text-slate-100">Lightning-Fast Responses</h3>
              <p className="text-slate-300 text-sm font-medium">Ultra-low latency interactions using Groq for real-time tutoring and contract generation.</p>
            </motion.div>

            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
              className="flex flex-col items-center"
            >
              <div className="p-4 rounded-full bg-slate-800/80 mb-6 shadow-lg border border-slate-700/50">
                <Cpu className="w-8 h-8 text-purple-400 drop-shadow-md" />
              </div>
              <h3 className="text-xl font-bold mb-3 text-slate-100">Seamless Microservices</h3>
              <p className="text-slate-300 text-sm font-medium">A fast, resilient, and always-evolving architecture designed for modern demands.</p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* INTERACTIVE DEMO */}
      <section className="py-24 px-6 max-w-4xl mx-auto relative z-10">
        <motion.div 
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          className="rounded-2xl border border-slate-700 bg-slate-900/80 overflow-hidden shadow-[0_20px_50px_rgba(0,0,0,0.5)] backdrop-blur-xl"
        >
          <div className="px-4 py-3 border-b border-slate-700 flex items-center justify-between bg-slate-800/50">
            <div className="flex gap-2">
              <div className="w-3 h-3 rounded-full bg-rose-500 shadow-sm" />
              <div className="w-3 h-3 rounded-full bg-amber-500 shadow-sm" />
              <div className="w-3 h-3 rounded-full bg-emerald-500 shadow-sm" />
            </div>
            <div className="text-xs text-slate-400 font-mono flex items-center gap-2">
              <Terminal className="w-3 h-3" />
              btu-hub-ai-simulator
            </div>
            <div className="w-12" />
          </div>
          
          <div className="p-6 md:p-8 flex flex-col min-h-[300px]">
            <div className="flex-1 font-mono text-sm space-y-3 mb-8">
              <div className="text-slate-400">$ Welcome to the BTU Hub AI Simulator.</div>
              {demoOutput.map((line, idx) => (
                <motion.div 
                  key={idx} 
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  className={line.includes('Success') || line.includes('Perfect') ? 'text-emerald-400 font-semibold' : 'text-slate-200'}
                >
                  {line}
                </motion.div>
              ))}
              {demoState === 'loading' && (
                <motion.div 
                  animate={{ opacity: [1, 0.5, 1] }} 
                  transition={{ repeat: Infinity, duration: 1 }}
                  className="text-cyan-400"
                >
                  █
                </motion.div>
              )}
            </div>

            <div className="mt-auto flex justify-center gap-4">
              {demoState === 'idle' && (
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={runDemo}
                  className="px-6 py-3 rounded-lg bg-cyan-500/10 text-cyan-400 border border-cyan-500/30 hover:bg-cyan-500/20 font-medium flex items-center gap-2 shadow-lg"
                >
                  <Sparkles className="w-4 h-4" />
                  Simulate AI CV Scan
                </motion.button>
              )}
              {demoState === 'success' && (
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={resetDemo}
                  className="px-6 py-3 rounded-lg bg-slate-800 text-slate-300 hover:bg-slate-700 font-medium shadow-lg"
                >
                  Reset Demo
                </motion.button>
              )}
            </div>
          </div>
        </motion.div>
      </section>

      {/* FOOTER */}
      <footer className="py-8 border-t border-slate-800/80 text-center relative z-10 bg-slate-950/90 backdrop-blur-md">
        <div className="flex flex-col items-center justify-center gap-4">
          <h2 className="text-xl font-bold text-slate-300 tracking-wide">BTU Hub</h2>
          <p className="text-slate-400 text-sm">Created for the University Booth Competition</p>
          <div className="flex gap-4 text-sm text-cyan-500/70">
            <a href="#" className="hover:text-cyan-400 transition-colors">Platform</a>
            <span>•</span>
            <a href="#" className="hover:text-cyan-400 transition-colors">GitHub</a>
            <span>•</span>
            <a href="#" className="hover:text-cyan-400 transition-colors">Documentation</a>
          </div>
          <p className="text-slate-600 text-xs mt-4">© 2026 BTU Hub. All rights reserved.</p>
        </div>
      </footer>
      
      {/* Hide scrollbar globally for the carousel */}
      <style dangerouslySetInnerHTML={{__html: `
        .scrollbar-hide::-webkit-scrollbar {
            display: none;
        }
      `}} />
    </main>
  );
}
