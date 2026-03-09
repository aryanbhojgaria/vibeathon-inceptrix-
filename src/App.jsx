import React, { useState, useEffect, useRef } from 'react';
import {
  Zap, BarChart3, Shield, ArrowRight, Copy, Check, Trash2, ExternalLink,
  Menu, X, LogIn, LogOut, User, Plus, AlertCircle, Quote
} from 'lucide-react';
import { clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

/** Utility for Tailwind class merging */
function cn(...inputs) {
  return twMerge(clsx(inputs));
}

// --- Components ---

const Button = React.forwardRef(({ className, variant = 'primary', shimmer = false, ...props }, ref) => {
  return (
    <button
      ref={ref}
      className={cn(
        'relative overflow-hidden font-heading uppercase tracking-wider transition-all duration-300 active:scale-95 disabled:opacity-50 disabled:pointer-events-none',
        variant === 'primary' && 'bg-cyan-glow text-dark hover:shadow-[0_0_20px_rgba(0,245,196,0.4)] px-8 py-3',
        variant === 'outline' && 'border border-cyan-glow/30 text-cyan-glow hover:bg-cyan-glow/10 px-8 py-3',
        variant === 'ghost' && 'text-white/70 hover:text-cyan-glow px-4 py-2',
        shimmer && 'btn-shimmer',
        className
      )}
      {...props}
    />
  );
});

const Card = ({ children, className, glow = false }) => (
  <div className={cn(
    'glass p-8 transition-all duration-500',
    glow && 'hover:border-cyan-glow/30 hover:shadow-[0_0_30px_rgba(0,245,196,0.1)]',
    className
  )}>
    {children}
  </div>
);

const Navbar = ({ user, onLogout, onNavigate, currentPage }) => (
  <nav className="fixed top-0 left-0 w-full z-50 border-b border-white/5 backdrop-blur-lg bg-dark/80">
    <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
      <div
        className="flex items-center gap-2 cursor-pointer group"
        onClick={() => onNavigate('landing')}
      >
        <div className="w-10 h-10 bg-cyan-glow flex items-center justify-center rounded-sm rotate-45 group-hover:rotate-90 transition-transform duration-500">
          <Zap className="text-dark -rotate-45 group-hover:-rotate-90 transition-transform duration-500" size={20} />
        </div>
        <span className="font-heading text-2xl tracking-tighter text-white">LinkSwift</span>
      </div>

      <div className="hidden md:flex items-center gap-8">
        {user ? (
          <>
            <button
              onClick={() => onNavigate('dashboard')}
              className={cn("text-sm font-heading tracking-widest transition-colors", currentPage === 'dashboard' ? "text-cyan-glow" : "text-white/60 hover:text-white")}
            >
              DASHBOARD
            </button>
            <div className="flex items-center gap-4 pl-8 border-l border-white/10">
              <div className="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center border border-white/20">
                <User size={16} className="text-cyan-glow" />
              </div>
              <button onClick={onLogout} className="text-white/40 hover:text-red-400 transition-colors">
                <LogOut size={18} />
              </button>
            </div>
          </>
        ) : (
          <Button variant="ghost" className="text-xs tracking-[0.2em]" onClick={() => onNavigate('login')}>
            LOGIN
          </Button>
        )}
      </div>
    </div>
  </nav>
);

// --- Sections ---

const Hero = ({ onStart }) => {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    let animationFrameId;

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };

    window.addEventListener('resize', resize);
    resize();

    const particles = Array.from({ length: 50 }, () => ({
      x: Math.random() * canvas.width,
      y: Math.random() * canvas.height,
      size: Math.random() * 2 + 0.5,
      speedX: (Math.random() - 0.5) * 0.5,
      speedY: (Math.random() - 0.5) * 0.5,
      opacity: Math.random() * 0.5 + 0.2
    }));

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      particles.forEach(p => {
        p.x += p.speedX;
        p.y += p.speedY;

        if (p.x < 0) p.x = canvas.width;
        if (p.x > canvas.width) p.x = 0;
        if (p.y < 0) p.y = canvas.height;
        if (p.y > canvas.height) p.y = 0;

        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(0, 245, 196, ${p.opacity})`;
        ctx.fill();
      });
      animationFrameId = requestAnimationFrame(animate);
    };

    animate();
    return () => {
      window.removeEventListener('resize', resize);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden pt-20">
      <canvas ref={canvasRef} className="absolute inset-0 z-0 pointer-events-none" />
      <div className="relative z-10 max-w-4xl mx-auto px-6 text-center">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/5 border border-white/10 text-cyan-glow text-[10px] tracking-[0.2em] uppercase mb-8 animate-fade-in">
          <span className="w-1.5 h-1.5 rounded-full bg-cyan-glow animate-pulse" />
          The future of link management
        </div>
        <h1 className="text-6xl md:text-8xl mb-8 leading-tight">
          Make Every <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-glow to-blue-500 animate-pulse">Link</span> Count
        </h1>
        <p className="text-white/60 text-lg md:text-xl mb-12 max-w-2xl mx-auto leading-relaxed">
          Premium link shortening for those who value speed, security, and sophisticated analytics. Join the elite network.
        </p>
        <div className="flex flex-col sm:flex-row items-center justify-center gap-6">
          <Button shimmer onClick={onStart}>Get Started Free</Button>
          <Button variant="outline" onClick={() => document.getElementById('features')?.scrollIntoView({ behavior: 'smooth' })}>
            Learn More
          </Button>
        </div>

        {/* Mockup Card */}
        <div className="mt-20 relative animate-float">
          <div className="absolute inset-0 bg-cyan-glow/20 blur-[100px] rounded-full scale-75" />
          <div className="glass p-4 rounded-xl border border-white/20 relative">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-3 h-3 rounded-full bg-red-500/50" />
              <div className="w-3 h-3 rounded-full bg-yellow-500/50" />
              <div className="w-3 h-3 rounded-full bg-green-500/50" />
            </div>
            <div className="bg-dark/50 p-6 rounded-lg border border-white/5 flex items-center justify-between">
              <div>
                <div className="text-[10px] text-white/40 uppercase tracking-widest mb-1">Generated Link</div>
                <div className="font-mono text-cyan-glow">shrtnr.io/luxury-link</div>
              </div>
              <div className="flex gap-2">
                <div className="w-8 h-8 rounded bg-white/5 flex items-center justify-center"><BarChart3 size={14} /></div>
                <div className="w-8 h-8 rounded bg-white/5 flex items-center justify-center"><Copy size={14} /></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

const Features = () => {
  const containerRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('active');
        }
      });
    }, { threshold: 0.1 });

    const elements = containerRef.current?.querySelectorAll('.reveal');
    elements?.forEach(el => observer.observe(el));

    return () => observer.disconnect();
  }, []);

  const data = [
    { icon: Zap, title: "Instant Shortening", desc: "Paste a URL and get a optimized short link in milliseconds, ready for sharing." },
    { icon: BarChart3, title: "Click Analytics", desc: "Track every click with real-time counters and geographical insights." },
    { icon: Shield, title: "Secure & Reliable", desc: "Enterprise-grade encryption ensures your links are always safe and accessible." }
  ];

  return (
    <section id="features" ref={containerRef} className="py-32 px-6">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-20 reveal">
          <h2 className="text-4xl md:text-5xl mb-4">Powerful Features</h2>
          <p className="text-white/40 max-w-xl mx-auto">Everything you need to manage your links at scale with precision architecture.</p>
        </div>
        <div className="grid md:grid-cols-3 gap-8">
          {data.map((f, i) => (
            <Card key={i} className={`reveal delay-[${i * 200}ms]`} glow>
              <div className="w-14 h-14 bg-cyan-glow/10 border border-cyan-glow/20 flex items-center justify-center mb-8">
                <f.icon className="text-cyan-glow" size={24} />
              </div>
              <h3 className="text-xl mb-4 italic font-heading tracking-widest">{f.title}</h3>
              <p className="text-white/50 leading-relaxed text-sm">{f.desc}</p>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

const HowItWorks = () => {
  const steps = [
    { num: '01', title: 'Paste URL', desc: 'Securely input your long destination address.' },
    { num: '02', title: 'Get Link', desc: 'Our algorithm generates a unique identifiers.' },
    { num: '03', title: 'Share & Track', desc: 'Monitor engagement patterns in real-time.' }
  ];

  return (
    <section className="py-32 px-6 bg-white/[0.02]">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row gap-12 items-center">
          {steps.map((step, i) => (
            <React.Fragment key={i}>
              <div className="flex-1 text-center md:text-left reveal">
                <div className="text-5xl font-heading text-white/5 mb-4">{step.num}</div>
                <h3 className="text-2xl mb-2">{step.title}</h3>
                <p className="text-white/40 text-sm leading-relaxed">{step.desc}</p>
              </div>
              {i < steps.length - 1 && (
                <div className="hidden md:block flex-[0.5] h-px bg-gradient-to-r from-cyan-glow/50 to-transparent" />
              )}
            </React.Fragment>
          ))}
        </div>
      </div>
    </section>
  );
};

const Stats = () => {
  const counterRef = useRef(null);
  const [counts, setCounts] = useState({ links: 0, clicks: 0, uptime: 0 });

  useEffect(() => {
    const observer = new IntersectionObserver((entries) => {
      if (entries[0].isIntersecting) {
        let start = null;
        const duration = 2000;

        const animate = (timestamp) => {
          if (!start) start = timestamp;
          const progress = Math.min((timestamp - start) / duration, 1);

          setCounts({
            links: Math.floor(progress * 10542),
            clicks: Math.floor(progress * 524108),
            uptime: (progress * 99.9).toFixed(1)
          });

          if (progress < 1) requestAnimationFrame(animate);
        };
        requestAnimationFrame(animate);
        observer.disconnect();
      }
    }, { threshold: 0.5 });

    if (counterRef.current) observer.observe(counterRef.current);
    return () => observer.disconnect();
  }, []);

  return (
    <section ref={counterRef} className="py-20 border-y border-white/5 overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 grid grid-cols-2 md:grid-cols-3 gap-12">
        <div className="text-center">
          <div className="text-4xl md:text-6xl text-cyan-glow mb-2">{counts.links.toLocaleString()}+</div>
          <div className="text-[10px] tracking-widest text-white/30 uppercase italic">Links Created</div>
        </div>
        <div className="text-center">
          <div className="text-4xl md:text-6xl text-cyan-glow mb-2">{counts.clicks.toLocaleString()}+</div>
          <div className="text-[10px] tracking-widest text-white/30 uppercase italic">Clicks Tracked</div>
        </div>
        <div className="text-center col-span-2 md:col-span-1 border-t md:border-t-0 md:border-l border-white/5 pt-12 md:pt-0">
          <div className="text-4xl md:text-6xl text-cyan-glow mb-2">{counts.uptime}%</div>
          <div className="text-[10px] tracking-widest text-white/30 uppercase italic">Network Uptime</div>
        </div>
      </div>
    </section>
  );
};

// --- Page 2: Auth ---

const AuthPage = ({ onAuthSuccess }) => {
  const [isLogin, setIsLogin] = useState(true);
  const [loading, setLoading] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      onAuthSuccess({ email: 'demo@linkswift.io' });
    }, 1500);
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-6 relative">
      <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-cyan-glow/10 rounded-full blur-[120px] -z-10 animate-pulse" />
      <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-blue-500/10 rounded-full blur-[120px] -z-10 animate-pulse delay-1000" />

      <div className="w-full max-w-md page-transition-enter-active">
        <Card className="relative overflow-hidden">
          <div className="text-center mb-10">
            <div className="inline-flex p-3 bg-cyan-glow/10 rounded-lg mb-6">
              <Zap className="text-cyan-glow" />
            </div>
            <h2 className="text-3xl mb-2">{isLogin ? 'Welcome Back' : 'Create Account'}</h2>
            <p className="text-white/40 text-sm">Experience the premium URL accelerator.</p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            {!isLogin && (
              <div>
                <label className="block text-[10px] uppercase tracking-widest text-white/40 mb-2">Full Name</label>
                <input type="text" className="w-full bg-white/5 border border-white/10 px-4 py-3 focus:outline-none focus:border-cyan-glow/50 transition-colors font-mono text-sm" placeholder="John Doe" required />
              </div>
            )}
            <div>
              <label className="block text-[10px] uppercase tracking-widest text-white/40 mb-2">Email Address</label>
              <input type="email" className="w-full bg-white/5 border border-white/10 px-4 py-3 focus:outline-none focus:border-cyan-glow/50 transition-colors font-mono text-sm" placeholder="contact@domain.io" required />
            </div>
            <div>
              <label className="block text-[10px] uppercase tracking-widest text-white/40 mb-2">Password</label>
              <input type="password" className="w-full bg-white/5 border border-white/10 px-4 py-3 focus:outline-none focus:border-cyan-glow/50 transition-colors font-mono text-sm" required />
            </div>
            <Button type="submit" className="w-full" disabled={loading} shimmer>
              {loading ? <div className="w-5 h-5 border-2 border-dark/30 border-t-dark rounded-full animate-spin mx-auto" /> : (isLogin ? 'Login Access' : 'Initialize Account')}
            </Button>
          </form>

          <div className="mt-8 text-center">
            <button onClick={() => setIsLogin(!isLogin)} className="text-xs text-white/40 hover:text-cyan-glow transition-colors">
              {isLogin ? "DON'T HAVE AN ACCOUNT? INITIALIZE ONE" : "ALREADY HAVE ACCESS? LOG IN"}
            </button>
          </div>

          <div className="mt-8 p-3 bg-white/5 rounded border border-white/5 text-[10px] text-white/30 text-center uppercase tracking-wider">
            <AlertCircle size={10} className="inline mr-1 -mt-0.5" />
            Demo mode: access with any credentials
          </div>
        </Card>
      </div>
    </div>
  );
};

// --- Page 3: Dashboard ---

const Dashboard = ({ user, links, onAddLink, onDeleteLink, onVisitLink }) => {
  const [url, setUrl] = useState('');
  const [alias, setAlias] = useState('');
  const [error, setError] = useState('');
  const [toast, setToast] = useState('');
  const [copiedId, setCopiedId] = useState(null);

  const handleShorten = (e) => {
    e.preventDefault();
    if (!url.startsWith('http://') && !url.startsWith('https://')) {
      setError('Invalid protocol. Must start with http:// or https://');
      return;
    }
    setError('');

    const newLink = {
      id: Math.random().toString(36).substr(2, 9),
      originalUrl: url,
      shortCode: alias || Math.random().toString(36).substr(2, 6),
      clicks: 0,
      createdAt: new Date().toISOString().split('T')[0]
    };

    onAddLink(newLink);
    setUrl('');
    setAlias('');
    setToast('✅ Short link created!');
    setTimeout(() => setToast(''), 3000);
  };

  const handleCopy = (id, code) => {
    const shortUrl = `${window.location.origin}/${code}`;
    navigator.clipboard.writeText(shortUrl);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  const totalClicks = links.reduce((sum, l) => sum + l.clicks, 0);
  const mostClicked = links.length > 0 ? [...links].sort((a, b) => b.clicks - a.clicks)[0] : null;

  return (
    <div className="pt-32 pb-20 px-6 max-w-7xl mx-auto page-transition-enter-active">
      {/* Toast */}
      {toast && (
        <div className="fixed top-24 right-6 glass px-6 py-4 border-cyan-glow/30 flex items-center gap-3 z-50 animate-fade-in">
          <Check className="text-cyan-glow" size={20} />
          <span className="text-sm">{toast}</span>
        </div>
      )}

      {/* Analytics Bar */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-12">
        <div className="glass p-6 text-center">
          <div className="text-3xl text-cyan-glow mb-1">{links.length}</div>
          <div className="text-[10px] text-white/30 uppercase tracking-widest">Total Links</div>
        </div>
        <div className="glass p-6 text-center">
          <div className="text-3xl text-cyan-glow mb-1">{totalClicks}</div>
          <div className="text-[10px] text-white/30 uppercase tracking-widest">Total Clicks</div>
        </div>
        <div className="glass p-6 text-center md:col-span-2 relative overflow-hidden group">
          {mostClicked && mostClicked.clicks > 0 ? (
            <>
              <div className="absolute top-2 right-2 px-2 py-0.5 bg-yellow-500/10 text-yellow-500 text-[8px] border border-yellow-500/20 rounded-full flex items-center gap-1">
                <Zap size={8} fill="currentColor" /> MOST POPULAR
              </div>
              <div className="text-3xl text-cyan-glow mb-1">{mostClicked.shortCode}</div>
              <div className="text-[10px] text-white/30 uppercase tracking-widest">
                {mostClicked.clicks} CLICKS RECORDED
              </div>
            </>
          ) : (
            <div className="h-full flex items-center justify-center text-white/20 text-xs italic">No data yet</div>
          )}
        </div>
      </div>

      {/* Input Panel */}
      <Card className="mb-12 border-cyan-glow/10">
        <h4 className="text-sm mb-6 flex items-center gap-2">
          <Plus size={16} className="text-cyan-glow" /> Optimize New URL
        </h4>
        <form onSubmit={handleShorten} className="grid md:grid-cols-12 gap-6">
          <div className="md:col-span-6">
            <input
              value={url}
              onChange={(e) => setUrl(e.target.value)}
              className="w-full bg-white/5 border border-white/10 px-4 py-3 focus:outline-none focus:border-cyan-glow/30 transition-colors font-mono text-sm"
              placeholder="Paste your long URL here (https://...)"
              required
            />
            {error && <div className="text-[10px] text-red-500 mt-1 uppercase tracking-widest">{error}</div>}
          </div>
          <div className="md:col-span-3 relative">
            <span className="absolute left-4 top-1/2 -translate-y-1/2 text-white/20 text-sm font-mono">io/</span>
            <input
              value={alias}
              onChange={(e) => setAlias(e.target.value)}
              className="w-full bg-white/5 border border-white/10 pl-10 pr-4 py-3 focus:outline-none focus:border-cyan-glow/30 transition-colors font-mono text-sm"
              placeholder="alias"
            />
          </div>
          <div className="md:col-span-3">
            <Button type="submit" className="w-full h-full" shimmer>Shorten It</Button>
          </div>
        </form>
      </Card>

      {/* List */}
      <div className="space-y-4">
        {links.length === 0 ? (
          <div className="text-center py-20 bg-white/[0.02] border border-dashed border-white/10 rounded-xl animate-pulse">
            <div className="w-16 h-16 bg-white/5 rounded-full flex items-center justify-center mx-auto mb-6">
              <ExternalLink className="text-white/20" size={24} />
            </div>
            <p className="text-white/30 text-sm font-heading tracking-[0.2em] italic">No active links in your network</p>
          </div>
        ) : (
          links.map((link) => (
            <div key={link.id} className="glass p-6 flex flex-col md:flex-row md:items-center justify-between gap-6 hover:bg-white/[0.03] transition-colors group relative overflow-hidden">
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 mb-1">
                  <span className="text-cyan-glow font-mono text-lg">{window.location.origin}/{link.shortCode}</span>
                  <button onClick={() => handleCopy(link.id, link.shortCode)} className="p-1 hover:text-cyan-glow transition-colors text-white/30">
                    {copiedId === link.id ? <Check size={14} className="text-cyan-glow" /> : <Copy size={14} />}
                  </button>
                </div>
                <div className="text-[10px] text-white/30 font-mono truncate max-w-sm md:max-w-md" title={link.originalUrl}>
                  {link.originalUrl}
                </div>
              </div>

              <div className="flex items-center gap-12">
                <div className="text-center min-w-[60px]">
                  <div className="text-2xl text-white/80 animate-count-up">{link.clicks}</div>
                  <div className="text-[8px] text-white/20 uppercase tracking-widest">Clicks</div>
                </div>
                <div className="flex items-center gap-4">
                  <button
                    onClick={() => {
                      onVisitLink(link.id);
                      window.open(link.originalUrl, '_blank');
                    }}
                    className="p-3 bg-white/5 rounded hover:bg-cyan-glow/20 hover:text-cyan-glow transition-all"
                  >
                    <ExternalLink size={16} />
                  </button>
                  <button
                    onClick={() => onDeleteLink(link.id)}
                    className="p-3 bg-white/5 rounded hover:bg-red-500/20 hover:text-red-500 transition-all"
                  >
                    <Trash2 size={16} />
                  </button>
                </div>
              </div>
              {copiedId === link.id && (
                <div className="absolute top-0 right-0 px-2 py-0.5 bg-cyan-glow text-dark text-[8px] font-heading">COPIED ✓</div>
              )}
            </div>
          ))
        )}
      </div>
    </div>
  );
};

// --- Main App ---

export default function App() {
  const [currentPage, setCurrentPage] = useState('landing');
  const [user, setUser] = useState(() => {
    try { return JSON.parse(localStorage.getItem('linkswift_user')) || null; } catch { return null; }
  });
  const [links, setLinks] = useState(() => {
    try { return JSON.parse(localStorage.getItem('linkswift_links')) || []; } catch { return []; }
  });
  const [isTransitioning, setIsTransitioning] = useState(false);

  // Handle short-link redirects: e.g. localhost:5174/abc123
  useEffect(() => {
    const path = window.location.pathname.replace(/^\//, '').trim();
    if (path) {
      const stored = JSON.parse(localStorage.getItem('linkswift_links') || '[]');
      const match = stored.find(l => l.shortCode === path);
      if (match) {
        // Increment click count in storage
        const updated = stored.map(l => l.shortCode === path ? { ...l, clicks: l.clicks + 1 } : l);
        localStorage.setItem('linkswift_links', JSON.stringify(updated));
        window.location.replace(match.originalUrl);
      }
    }
  }, []);

  // Persist links whenever they change
  useEffect(() => {
    localStorage.setItem('linkswift_links', JSON.stringify(links));
  }, [links]);

  // Persist user session
  useEffect(() => {
    if (user) {
      localStorage.setItem('linkswift_user', JSON.stringify(user));
      if (currentPage === 'landing') setCurrentPage('dashboard');
    } else {
      localStorage.removeItem('linkswift_user');
    }
  }, [user]);

  const navigate = (page) => {
    setIsTransitioning(true);
    setTimeout(() => {
      setCurrentPage(page);
      setIsTransitioning(false);
      window.scrollTo(0, 0);
    }, 400);
  };

  const addLink = (link) => setLinks(prev => [link, ...prev]);
  const deleteLink = (id) => setLinks(prev => prev.filter(l => l.id !== id));
  const visitLink = (id) => {
    setLinks(prev => prev.map(l => l.id === id ? { ...l, clicks: l.clicks + 1 } : l));
  };

  return (
    <div className={`noise-container ${isTransitioning ? 'opacity-0 scale-95' : 'opacity-100 scale-100'} transition-all duration-500`}>
      <div className="noise" />
      <Navbar
        user={user}
        currentPage={currentPage}
        onLogout={() => { setUser(null); navigate('landing'); }}
        onNavigate={navigate}
      />

      <main>
        {currentPage === 'landing' && (
          <>
            <Hero onStart={() => navigate(user ? 'dashboard' : 'login')} />
            <Features />
            <HowItWorks />
            <Stats />
            <footer className="py-20 px-6 border-t border-white/5 text-center">
              <div className="flex items-center justify-center gap-2 mb-8">
                <Zap className="text-cyan-glow" size={20} />
                <span className="font-heading text-xl tracking-tighter">LinkSwift</span>
              </div>
              <div className="flex justify-center gap-8 mb-12 text-[10px] tracking-[0.2em] text-white/40 uppercase">
                <a href="#" className="hover:text-cyan-glow">Terms</a>
                <a href="#" className="hover:text-cyan-glow">Security</a>
                <a href="#" className="hover:text-cyan-glow">Network Status</a>
              </div>
              <p className="text-[10px] text-white/20 uppercase tracking-[0.3em]">
                © 2026 INCEPTRIX TECHNOLOGIES. ALL RIGHTS RESERVED.
              </p>
            </footer>
          </>
        )}

        {currentPage === 'login' && (
          <AuthPage onAuthSuccess={(u) => { setUser(u); navigate('dashboard'); }} />
        )}

        {currentPage === 'dashboard' && (
          <Dashboard
            user={user}
            links={links}
            onAddLink={addLink}
            onDeleteLink={deleteLink}
            onVisitLink={visitLink}
          />
        )}
      </main>
    </div>
  );
}
