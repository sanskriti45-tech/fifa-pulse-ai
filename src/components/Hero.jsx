import { useEffect, useRef, useState, Suspense } from "react";
import { Component } from "react";
import { getDashboardData } from "../api";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { useGLTF } from "@react-three/drei";
import * as THREE from "three";

/* ─────────────────────────────────────────────────────────────────────────────
   Error boundary – hides the football canvas entirely on any Three.js error
───────────────────────────────────────────────────────────────────────────── */
class FootballErrorBoundary extends Component {
  constructor(props) { super(props); this.state = { error: false }; }
  static getDerivedStateFromError() { return { error: true }; }
  render() { return this.state.error ? null : this.props.children; }
}

/* ─────────────────────────────────────────────────────────────────────────────
   Scene setup – force transparent WebGL clear so the canvas has no background
───────────────────────────────────────────────────────────────────────────── */
function SceneSetup() {
  const { gl, scene } = useThree();
  useEffect(() => {
    scene.background = null;
    gl.setClearColor(0x000000, 0);   // fully transparent clear
  }, [gl, scene]);
  return null;
}

/* ─────────────────────────────────────────────────────────────────────────────
   Football – loads the embedded-texture GLB and spins it.
   The model uses alphaMode BLEND so we patch its material to render correctly.
───────────────────────────────────────────────────────────────────────────── */
function FootballModel() {
  const { scene: ballScene } = useGLTF('/models/football.glb');
  const ref = useRef();

  // Patch material so BLEND + embedded alpha works on a transparent canvas
  useEffect(() => {
    ballScene.traverse((obj) => {
      if (obj.isMesh && obj.material) {
        obj.material.transparent    = false;   // treat as opaque on our canvas
        obj.material.alphaTest      = 0.05;
        obj.material.side           = THREE.FrontSide;
        obj.material.depthWrite     = true;
        obj.material.needsUpdate    = true;
      }
    });
  }, [ballScene]);

  useFrame(() => {
    if (ref.current) {
      ref.current.rotation.y += 0.010;
      ref.current.rotation.x += 0.005;
    }
  });

  return (
    <primitive
      ref={ref}
      object={ballScene}
      // GLB node has scale [13.5,13.5,13.5] baked in.
      // 0.14 was the original; 0.40 ≈ 285% of that (250-300% increase requested)
      scale={0.40}
      position={[0, -0.05, 0]}
    />
  );
}

useGLTF.preload('/models/football.glb');

/* ─────────────────────────────────────────────────────────────────────────────
   Hero Section
───────────────────────────────────────────────────────────────────────────── */
export default function Hero() {
  const [stats, setStats] = useState(null);
  const parallaxRef = useRef(null);          // receives rAF JS transform
  const playerImgRef = useRef(null);         // for measuring foot position
  const ballWrapRef = useRef(null);          // football canvas container
  const mouse = useRef({ x: 0, y: 0 });
  const raf = useRef(null);

  /* Live stats */
  useEffect(() => {
    const load = () =>
      getDashboardData().then(d => setStats(d.aggregate));
    load();
    const id = setInterval(load, 4000);
    return () => clearInterval(id);
  }, []);

  /* Mouse parallax via rAF – operates on its own div, never fights CSS float */
  useEffect(() => {
    const onMove = (e) => {
      mouse.current = {
        x: (e.clientX / window.innerWidth  - 0.5) * 2,
        y: (e.clientY / window.innerHeight - 0.5) * 2,
      };
    };
    const tick = () => {
      if (parallaxRef.current) {
        parallaxRef.current.style.transform =
          `translate(${mouse.current.x * -12}px, ${mouse.current.y * -8}px)`;
      }
      raf.current = requestAnimationFrame(tick);
    };
    window.addEventListener('mousemove', onMove);
    raf.current = requestAnimationFrame(tick);
    return () => {
      window.removeEventListener('mousemove', onMove);
      cancelAnimationFrame(raf.current);
    };
  }, []);

  /* Compute football canvas position from the player image's actual DOM rect */
  useEffect(() => {
    const place = () => {
      const img = playerImgRef.current;
      const ball = ballWrapRef.current;
      const section = document.getElementById('hero');
      if (!img || !ball || !section) return;

      const imgRect     = img.getBoundingClientRect();
      const sectionRect = section.getBoundingClientRect();

      // kicking foot ≈ 32% across, 52% down the image
      // (32% keeps the ball near the foot without covering headline/cards)
      const footX = imgRect.left + imgRect.width  * 0.32;
      const footY = imgRect.top  + imgRect.height * 0.52;

      // convert to section-relative (section has position:relative)
      const left   = footX - sectionRect.left - ball.offsetWidth  / 2;
      const top    = footY - sectionRect.top  - ball.offsetHeight / 2;

      ball.style.left = `${left}px`;
      ball.style.top  = `${top}px`;
    };

    // Run after first render & on resize
    // Use a short timeout so the image has painted and has a real rect
    const t = setTimeout(place, 100);
    window.addEventListener('resize', place);
    return () => {
      clearTimeout(t);
      window.removeEventListener('resize', place);
    };
  }, []);

  return (
    <section
      className="min-h-[90vh] flex flex-col justify-center px-margin-desktop relative overflow-hidden"
      id="hero"
    >
      {/* CSS keyframes – player float + ball float */}
      <style>{`
        @keyframes heroFloat {
          0%, 100% { transform: translateY(0px);   }
          50%       { transform: translateY(-18px); }
        }
        .player-float {
          animation: heroFloat 4.8s ease-in-out infinite;
          will-change: transform;
        }
        @keyframes ballFloat {
          0%, 100% { transform: translateY(0px);  }
          50%       { transform: translateY(-9px); }
        }
        .ball-float {
          animation: ballFloat 3.6s ease-in-out infinite;
          will-change: transform;
        }
      `}</style>

      {/* ── 1. Background image – cinematic full-colour night stadium ─── */}
      <div className="absolute inset-0 z-0 scale-105 pointer-events-none" style={{ opacity: 0.72 }}>
        <img
          alt="Hero background"
          className="w-full h-full object-cover"
          style={{ filter: 'brightness(0.62) contrast(1.05) saturate(1.1)' }}
          src="/images/hero.png"
        />
      </div>

      {/* ── 2. Player (PNG, CSS only) ────────────────────────────────── */}
      {/*
           Three nested divs keep the effects independent:
           · positioning anchor  → absolute, right-aligned
           · .player-float       → CSS keyframe (translateY only)
           · parallaxRef         → rAF JS translate (never conflicts with float)
           · <img>               → player.png with soft shadow + faint green rim
      */}
      <div
        className="absolute pointer-events-none select-none"
        style={{
          right: '-1%',
          bottom: 0,
          top: 0,
          width: '54%',
          zIndex: 1,
          display: 'flex',
          alignItems: 'flex-end',
          justifyContent: 'center',
        }}
      >
        <div className="player-float" style={{ position: 'relative', width: '100%' }}>
          <div
            ref={parallaxRef}
            style={{ position: 'relative', transition: 'transform 0.15s linear' }}
          >
            <img
              ref={playerImgRef}
              src="/assets/player.png"
              alt="Player"
              style={{
                display: 'block',
                height: '88vh',
                width: 'auto',
                maxWidth: '100%',
                objectFit: 'contain',
                marginLeft: 'auto',
                // Deep shadow only – no coloured glow; subtle rim comes from scene lighting
                filter: 'drop-shadow(0 28px 40px rgba(0,0,0,0.92)) drop-shadow(0 0 10px rgba(162,255,0,0.12))',
              }}
            />
          </div>
        </div>
      </div>

      {/* ── 3. Football R3F canvas – right-aligned at kicking foot ───── */}
      <div
        ref={ballWrapRef}
        className="pointer-events-none ball-float"
        style={{
          position: 'absolute',
          width:  '190px',
          height: '190px',
          zIndex: 2,
          /* fallback: bottom-right area; JS overrides after measuring image */
          right: '8%',
          bottom: '12%',
        }}
      >
        {/* Soft elliptical shadow beneath the ball */}
        <div style={{
          position: 'absolute',
          bottom: '4px',
          left: '50%',
          transform: 'translateX(-50%)',
          width: '58%',
          height: '22px',
          background: 'radial-gradient(ellipse, rgba(0,0,0,0.55) 0%, transparent 75%)',
          filter: 'blur(6px)',
          zIndex: 0,
        }} />

        <FootballErrorBoundary>
          <Canvas
            camera={{ position: [0, 0, 1.6], fov: 52 }}
            gl={{ alpha: true, antialias: true, preserveDrawingBuffer: false }}
            style={{ background: 'transparent', position: 'relative', zIndex: 1 }}
          >
            <SceneSetup />
            {/* Key light from top-right */}
            <directionalLight position={[3,  5, 4]} intensity={2.8} />
            {/* Fill light from left */}
            <directionalLight position={[-4, 1, 2]} intensity={1.0} />
            {/* Ambient so shadow side isn't pure black */}
            <ambientLight intensity={0.9} />
            {/* Subtle neon underlight */}
            <pointLight position={[0, -2, 2]} intensity={0.4} color="#a2ff00" />
            <Suspense fallback={null}>
              <FootballModel />
            </Suspense>
          </Canvas>
        </FootballErrorBoundary>
      </div>

      {/* ── 4. Existing hero UI (text, stats, buttons) – fully unchanged ── */}
      <div
        className="max-w-4xl reveal active"
        style={{ position: 'relative', zIndex: 3 }}
      >
        <div className="inline-flex items-center gap-2 px-3 py-1 glass-panel rounded-full mb-6">
          <span className="w-2 h-2 rounded-full bg-neon-green pulse-border"></span>
          <span className="text-data-label font-data-label text-neon-green">
            SYSTEM LIVE: TOURNAMENT READY
          </span>
        </div>

        <h1 className="font-display-lg text-display-lg mb-4 text-white leading-none">
          OPERATIONAL CONTROL
          <br />
          <span className="text-primary-fixed">WORLD CUP 2026</span>
        </h1>

        <p className="text-body-lg font-body-lg text-on-surface-variant max-w-2xl">
          Gemini-powered AI command center coordinating stadium security,
          crowd movement, emergency response and broadcast intelligence
          in real-time.
        </p>

        <div className="mt-10 grid grid-cols-3 gap-4 max-w-xl">
          <div className="glass-panel p-4 rounded-xl">
            <p className="text-xs opacity-50">STADIUMS</p>
            <p className="text-3xl text-neon-green font-bold">
              {stats?.stadiumCount || "--"}
            </p>
          </div>
          <div className="glass-panel p-4 rounded-xl">
            <p className="text-xs opacity-50">LIVE CROWD</p>
            <p className="text-3xl text-neon-green font-bold">
              {stats?.avgCrowdDensityPercent || "--"}%
            </p>
          </div>
          <div className="glass-panel p-4 rounded-xl">
            <p className="text-xs opacity-50">TICKETS</p>
            <p className="text-3xl text-neon-green font-bold">
              {stats?.totalTicketsScanned || "--"}
            </p>
          </div>
        </div>

        <div className="mt-12 flex gap-4">
          <button className="bg-neon-green text-surface px-8 py-4 font-black uppercase tracking-widest hover:brightness-110 transition-all">
            INITIALIZE COMMAND
            <span className="material-symbols-outlined ml-2">terminal</span>
          </button>
          <button
            onClick={() =>
              document.getElementById("broadcast")
                ?.scrollIntoView({ behavior: "smooth" })
            }
            className="border border-white/20 glass-panel text-white px-8 py-4 font-bold hover:bg-white/10 transition-all"
          >
            VIEW LIVE FEED
          </button>
        </div>
      </div>

    </section>
  );
}