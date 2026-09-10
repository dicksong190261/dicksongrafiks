import React, { useState, useEffect, useRef, useMemo, useCallback } from 'react';
import {
  Sparkles,
  Play,
  ArrowUpRight,
  ChevronRight,
  ExternalLink,
  Layers,
  Palette,
  Video,
  Aperture,
  Globe2,
  Send,
  CheckCircle2,
  Compass,
  Monitor,
  Eye,
  Film,
  Award,
  Sparkle,
  Linkedin,
  Twitter,
  Facebook,
  Menu,
  X,
  MessageSquare,
  ChevronDown,
  RotateCcw
} from 'lucide-react';

// Safeguard against missing tailwind configuration in sandbox environments
if (typeof window !== 'undefined') {
  try {
    (window as any).tailwind = (window as any).tailwind || {
      config: {
        darkMode: 'class',
        theme: {
          extend: {
            screens: {
              xs: '375px',
            },
            colors: {
              cyan: '#00f0ff',
              violet: '#8a2be2',
              orange: '#ff7a00',
            },
          },
        },
      },
    };

    if (!document.getElementById('tailwind-cdn-loader')) {
      const twScript = document.createElement('script');
      twScript.id = 'tailwind-cdn-loader';
      twScript.src = 'https://cdn.tailwindcss.com';
      twScript.async = true;
      document.head.appendChild(twScript);
    }
  } catch (err) {
    // Ignore initialization variations
  }
}

const CUSTOM_STYLES = `
@import url('https://fonts.googleapis.com/css2?family=Cabinet+Grotesk:wght@800;900&family=Plus+Jakarta+Sans:ital,wght@0,300;0,400;0,500;0,600;0,700;0,800;1,400&display=swap');

:root {
  --electric-cyan: #00f0ff;
  --electric-violet: #8a2be2;
  --neon-orange: #ff7a00;
  --dark-bg: #06070a;
}

html, body {
  font-family: 'Plus Jakarta Sans', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
  background-color: #06070a;
  color: #ffffff;
  overflow-x: hidden;
  width: 100%;
  margin: 0;
  padding: 0;
  -webkit-tap-highlight-color: transparent;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}

/* Notch & Safe-area handling for mobile devices */
.safe-top {
  padding-top: max(1rem, env(safe-area-inset-top, 1rem));
}
.safe-bottom {
  padding-bottom: max(1.5rem, env(safe-area-inset-bottom, 1.5rem));
}

.font-display {
  font-family: 'Cabinet Grotesk', 'Plus Jakarta Sans', sans-serif;
  letter-spacing: -0.035em;
}

/* Fluid responsive text scaling helper */
.fluid-hero-title {
  font-size: clamp(2.35rem, 8.8vw, 7.8rem);
  line-height: 0.94;
}

/* Custom glow effects tuned for all brightness environments */
.glow-cyan {
  box-shadow: 0 0 35px -5px rgba(0, 240, 255, 0.35);
}

.glow-text-cyan {
  text-shadow: 0 0 20px rgba(0, 240, 255, 0.55);
}

.glow-orange {
  box-shadow: 0 0 35px -5px rgba(255, 122, 0, 0.4);
}

/* Glassmorphism primitives */
.glass-panel {
  background: rgba(18, 20, 29, 0.72);
  backdrop-filter: blur(16px);
  -webkit-backdrop-filter: blur(16px);
  border: 1px solid rgba(255, 255, 255, 0.09);
}

/* Touch & Hover behaviors */
@media (hover: hover) and (pointer: fine) {
  .glass-panel-hover {
    transition: all 0.35s cubic-bezier(0.16, 1, 0.3, 1);
  }
  .glass-panel-hover:hover {
    background: rgba(25, 28, 42, 0.85);
    border-color: rgba(0, 240, 255, 0.4);
    transform: translateY(-4px);
  }
}

/* Custom discreet scrollbars */
::-webkit-scrollbar {
  width: 6px;
  height: 6px;
}
::-webkit-scrollbar-track {
  background: #06070a;
}
::-webkit-scrollbar-thumb {
  background: rgba(255, 255, 255, 0.2);
  border-radius: 9999px;
}
::-webkit-scrollbar-thumb:hover {
  background: rgba(0, 240, 255, 0.5);
}

/* Keyframe animations */
@keyframes pulseGlow {
  0%, 100% { opacity: 0.35; transform: scale(1); }
  50% { opacity: 0.75; transform: scale(1.08); }
}

.animate-pulse-glow {
  animation: pulseGlow 6s ease-in-out infinite;
}

@keyframes floatGentle {
  0%, 100% { transform: translateY(0px); }
  50% { transform: translateY(-7px); }
}

.animate-float {
  animation: floatGentle 4.5s ease-in-out infinite;
}
`;

const ASSETS = {
  projects: [
    {
      id: 'proj-1',
      title: 'Business Flyer Design',
      category: 'Brand Identity Project',
      description: 'Clean and bold identity systems designed to build strong visual recognition.',
      image: 'https://i.ibb.co/4nycqNkS/Plumbing-Design-094323.png',
      tag: 'Vector & Print',
      accent: '#ff7a00',
    },
    {
      id: 'proj-2',
      title: 'Marketing Flyer Design',
      category: 'Marketing Design',
      description: 'High-performing visuals designed to grab attention instantly and increase engagement.',
      image: 'https://i.ibb.co/k27CKnZW/Premium-Nail-Flyer-090701.png',
      tag: 'Commercial',
      accent: '#00f0ff',
    },
    {
      id: 'proj-3',
      title: 'Celebration Visuals',
      category: 'Event & Motion Brand',
      description: 'Elegant, vibrant, and eye-catching designs tailored to make your special day stand out.',
      image: 'https://i.ibb.co/tpVV0NK5/Birthday-Flyer-Design-1.png',
      tag: 'Luxury Celebrations',
      accent: '#8a2be2',
    },
    {
      id: 'proj-4',
      title: 'Brand Identity Logo',
      category: 'Brand Logo Design',
      description: 'Clean, memorable, and impactful logos engineered to give your brand a professional edge.',
      image: 'https://i.ibb.co/tTtVLzjg/LOGO-065406.png',
      tag: 'Identity & Guidelines',
      accent: '#00f0ff',
    },
    {
      id: 'proj-5',
      title: 'Social Media Design',
      category: 'Fintech & Neobank',
      description: 'Clean, high-impact digital graphics engineered for modern apps and social conversion.',
      image: 'https://i.ibb.co/Kj95L4KV/Bilt-Neobank-Design-101802.png',
      tag: 'Digital Marketing',
      accent: '#00f0ff',
    },
    {
      id: 'proj-6',
      title: 'Wedding Card Design',
      category: 'Luxury Stationery',
      description: 'Refined aesthetics, premium typography, and timeless elegance for memorable celebrations.',
      image: 'https://i.ibb.co/nq8tvmXk/WEDDING.png',
      tag: 'Print & Invitation',
      accent: '#ff7a00',
    },
    {
      id: 'proj-7',
      title: 'Crypto Design',
      category: 'Web3 & Fintech',
      description: 'Cutting-edge digital visuals tailored for crypto platforms, token launches, and DeFi.',
      image: 'https://i.ibb.co/rfM9RB61/DESIGN-0-NE.png',
      tag: 'Web3 Branding',
      accent: '#8a2be2',
    },
    {
      id: 'proj-8',
      title: 'Church Flyer Design',
      category: 'Conference & Ministry',
      description: 'Majestic, faith-inspired visual layouts crafted with bold hierarchy and spiritual atmosphere.',
      image: 'https://i.ibb.co/39f7PyGW/EDIFICE-CHURCH-FLYER-DESIGN.png',
      tag: 'Ministry & Event',
      accent: '#00f0ff',
    },
  ],
  videos: [
    {
      id: 'vid-1',
      title: 'Promotional Video',
      tag: 'Commercial Production',
      youtubeUrl: 'https://youtu.be/H8VCSFxVce4',
      embedId: 'H8VCSFxVce4',
      thumbnail: 'https://img.youtube.com/vi/H8VCSFxVce4/maxresdefault.jpg',
      duration: '4K Ultra HD',
    },
    {
      id: 'vid-2',
      title: 'Motion Graphics Edit',
      tag: 'Kinetic Typography',
      youtubeUrl: 'https://youtu.be/5eS61a1UlV0',
      embedId: '5eS61a1UlV0',
      thumbnail: 'https://img.youtube.com/vi/5eS61a1UlV0/maxresdefault.jpg',
      duration: '60 FPS Motion',
    },
    {
      id: 'vid-3',
      title: 'Short Form Edit',
      tag: 'Viral Storytelling',
      youtubeUrl: 'https://youtube.com/shorts/r-bnK_Sw5VY',
      embedId: 'r-bnK_Sw5VY',
      thumbnail: 'https://img.youtube.com/vi/r-bnK_Sw5VY/maxresdefault.jpg',
      duration: 'Vertical Format',
    },
    {
      id: 'vid-4',
      title: 'Social Media Reel',
      tag: 'High Retention',
      youtubeUrl: 'https://youtube.com/shorts/XZSpHhO7jI4',
      embedId: 'XZSpHhO7jI4',
      thumbnail: 'https://img.youtube.com/vi/XZSpHhO7jI4/maxresdefault.jpg',
      duration: 'Creative Pacing',
    },
  ],
  photoEdits: [
    {
      id: 'pe-1',
      title: 'High-End Beauty Retouch',
      image: 'https://i.ibb.co/KcQQwfSr/Air-Brush-20260607110024.jpg',
      description: 'Micro-dodge and burn with natural skin texture preservation and gentle tone balancing.',
      category: 'Skin Texture & Tone',
      filterGroup: 'Beauty & Skin',
    },
    {
      id: 'pe-2',
      title: 'Studio Portrait Grade',
      image: 'https://i.ibb.co/35VpTzMd/Air-Brush-20260608164935.jpg',
      description: 'Sculpted lighting contrast, eye catchlight definition, and refined studio depth grading.',
      category: 'Studio Lighting',
      filterGroup: 'Studio & Editorial',
    },
    {
      id: 'pe-3',
      title: 'Editorial Glamour Polish',
      image: 'https://i.ibb.co/5ptGXtG/Air-Brush-20260610101429.jpg',
      description: 'High-fashion skin smoothing, chromatic clarity, and rich velvet shadow balance.',
      category: 'Fashion Editorial',
      filterGroup: 'Studio & Editorial',
    },
    {
      id: 'pe-4',
      title: 'Cinematic Warm Tone',
      image: 'https://i.ibb.co/ynVWKXz0/Air-Brush-20260610105048.jpg',
      description: 'Golden-hour ambient glow enhancement with soft depth-of-field separation.',
      category: 'Atmospheric Lighting',
      filterGroup: 'Color & Lighting',
    },
    {
      id: 'pe-5',
      title: 'Frequency Separation',
      image: 'https://i.ibb.co/GQH0ZKgn/Air-Brush-20260616184843.jpg',
      description: 'Flawless blemish eradication while maintaining authentic pore detail and tone transitions.',
      category: 'Commercial Beauty',
      filterGroup: 'Beauty & Skin',
    },
    {
      id: 'pe-6',
      title: 'Creative Tone Sculpting',
      image: 'https://i.ibb.co/wZDgnjZb/Air-Brush-20260627222013.jpg',
      description: 'Vibrant and nuanced color curves designed to give portraiture striking magazine vibrancy.',
      category: 'Creative Color Grade',
      filterGroup: 'Color & Lighting',
    },
    {
      id: 'pe-7',
      title: 'Radiant Melanin Harmony',
      image: 'https://i.ibb.co/S8xfJ8N/Air-Brush-20260711114909.jpg',
      description: 'Warm, luminous undertone enhancement celebrating natural radiant complexion.',
      category: 'Complexion Grading',
      filterGroup: 'Beauty & Skin',
    },
    {
      id: 'pe-8',
      title: 'Editorial Contrast & Edge',
      image: 'https://i.ibb.co/HLzyv1rn/Air-Brush-20260714192848.jpg',
      description: 'Crisp micro-contrast, specular highlight recovery, and dramatic studio backdrop blend.',
      category: 'Editorial Styling',
      filterGroup: 'Studio & Editorial',
    },
    {
      id: 'pe-9',
      title: 'Velvet Soft Retouching',
      image: 'https://i.ibb.co/V0MpPYRP/Air-Brush-20260728150341.jpg',
      description: 'Subtle airbrush blending with contour reinforcement and soft-focus highlights.',
      category: 'Portraiture Precision',
      filterGroup: 'Beauty & Skin',
    },
    {
      id: 'pe-10',
      title: 'Natural Glow Restoration',
      image: 'https://i.ibb.co/9H9QX1S9/Air-Brush-20260730173130.jpg',
      description: 'Gentle luminescence balancing that keeps portraits looking completely effortless and authentic.',
      category: 'Natural Retouch',
      filterGroup: 'Beauty & Skin',
    },
    {
      id: 'pe-11',
      title: 'Modern Headshot Polish',
      image: 'https://i.ibb.co/ZpPz9fxp/Air-Brush-20260804223529.jpg',
      description: 'Professional clarity, attire sharpening, and clean background depth separation.',
      category: 'Executive Portrait',
      filterGroup: 'Studio & Editorial',
    },
    {
      id: 'pe-12',
      title: 'Luminous Highlight Sculpt',
      image: 'https://i.ibb.co/bjcq8hkY/Air-Brush-20260811110840.jpg',
      description: 'Dimensional cheekbone and nose bridge highlighting with seamless gradient blending.',
      category: 'Glamour Retouch',
      filterGroup: 'Beauty & Skin',
    },
    {
      id: 'pe-13',
      title: 'Ultra-Detail Eyes & Lips',
      image: 'https://i.ibb.co/W4ZHf5Z9/Air-Brush-20260815113142.jpg',
      description: 'Intense ocular clarity, iris brightening, and natural lip moisture enhancement.',
      category: 'Close-up Editorial',
      filterGroup: 'Studio & Editorial',
    },
    {
      id: 'pe-14',
      title: 'Vibrant Color Correction',
      image: 'https://i.ibb.co/MxCtJPMx/Air-Brush-20260818114938.jpg',
      description: 'Balancing color cast distortions and enriching midtones for a vivid, lifelike palette.',
      category: 'Cinematic Grade',
      filterGroup: 'Color & Lighting',
    },
    {
      id: 'pe-15',
      title: 'High-Fashion Mood Grade',
      image: 'https://i.ibb.co/hFrg92sf/Air-Brush-20260818115132.jpg',
      description: 'Sultry contrast curves, deep shadows, and luminous skin highlights for moody editorial work.',
      category: 'High Fashion',
      filterGroup: 'Studio & Editorial',
    },
    {
      id: 'pe-16',
      title: 'Masterclass Portrait Finish',
      image: 'https://i.ibb.co/NbqHQRP/Air-Brush-20260904104615.jpg',
      description: 'Comprehensive end-to-end retouching combining frequency separation and color harmonization.',
      category: 'Master Retouch',
      filterGroup: 'Beauty & Skin',
    },
  ],
  founder: {
    name: 'Goodness N. Dickson',
    role: 'Founder & Lead Designer',
    image: 'https://i.ibb.co/fz40jbTB/366042.jpg',
    bio: `With a profound passion for visual storytelling, Goodness founded DicksonGrafiks to bridge the gap between brilliant ideas and impactful designs. Every project is approached with a commitment to excellence, ensuring that brands not only look premium but also communicate their message powerfully.

Whether it's crafting a cohesive brand identity from scratch or engineering high-converting marketing visuals, Goodness brings years of expertise, a keen eye for aesthetic detail, and a relentless drive to help clients stand out in competitive digital landscapes.`,
  },
  socials: [
    {
      name: 'LinkedIn',
      url: 'https://linkedin.com/in/goodness-dickson-ba1b333a8',
      icon: Linkedin,
      label: 'Goodness Dickson',
    },
    {
      name: 'X (Twitter)',
      url: 'https://x.com/DicksonGrafiks',
      icon: Twitter,
      label: '@DicksonGrafiks',
    },
    {
      name: 'Facebook',
      url: 'https://facebook.com/DicksonGrafiks',
      icon: Facebook,
      label: 'DicksonGrafiks Studio',
    },
  ],
  countries: [
    { name: 'Nigeria', flag: '🇳🇬', code: 'NG', lat: 9.082, lon: 8.6753, role: 'Primary Studio & HQ' },
    { name: 'Ghana', flag: '🇬🇭', code: 'GH', lat: 7.9465, lon: -1.0232, role: 'Creative Collaborations' },
    { name: 'United Kingdom', flag: '🇬🇧', code: 'GB', lat: 55.3781, lon: -3.436, role: 'International Clients' },
    { name: 'Malawi', flag: '🇲🇼', code: 'MW', lat: -13.2543, lon: 34.3015, role: 'Design Partnerships' },
  ],
};

function useThreeLoader() {
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    if ((window as any).THREE) {
      setLoaded(true);
      return;
    }

    const existingScript = document.getElementById('threejs-cdn-script');
    if (existingScript) {
      existingScript.addEventListener('load', () => setLoaded(true));
      return;
    }

    const script = document.createElement('script');
    script.id = 'threejs-cdn-script';
    script.src = 'https://cdnjs.cloudflare.com/ajax/libs/three.js/r128/three.min.js';
    script.async = true;
    script.onload = () => setLoaded(true);
    document.body.appendChild(script);

    return () => {};
  }, []);

  return loaded;
}

const Hero3DScene: React.FC<{ mousePos: { x: number; y: number } }> = ({ mousePos }) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const isThreeLoaded = useThreeLoader();

  useEffect(() => {
    if (!isThreeLoaded || !containerRef.current) return;

    const THREE = (window as any).THREE;
    const container = containerRef.current;
    let width = container.clientWidth;
    let height = container.clientHeight;

    const scene = new THREE.Scene();

    // Responsive aspect calculation: on mobile, zoom back to keep all elements in view
    const getCameraZ = (w: number, h: number) => {
      const aspect = w / h;
      if (aspect < 0.7) return 36; // Narrow phone portrait
      if (aspect < 1.0) return 30; // Tablet / small phone
      return 23; // Laptop and wide screens
    };

    const camera = new THREE.PerspectiveCamera(45, width / height, 0.1, 1000);
    camera.position.z = getCameraZ(width, height);

    const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true, powerPreference: 'high-performance' });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    container.innerHTML = '';
    container.appendChild(renderer.domElement);

    const mainGroup = new THREE.Group();
    scene.add(mainGroup);

    // Dynamic artboards
    const artboards: any[] = [];
    const artboardGeom = new THREE.BoxGeometry(3.8, 5.2, 0.1);

    const materials = [
      new THREE.MeshPhysicalMaterial({
        color: 0x0f172a,
        roughness: 0.15,
        metalness: 0.8,
        clearcoat: 1.0,
        transparent: true,
        opacity: 0.8,
      }),
      new THREE.MeshPhysicalMaterial({
        color: 0x050c18,
        emissive: 0x00f0ff,
        emissiveIntensity: 0.25,
        roughness: 0.2,
        metalness: 0.9,
        transparent: true,
        opacity: 0.75,
      }),
      new THREE.MeshPhysicalMaterial({
        color: 0x1a0928,
        emissive: 0x8a2be2,
        emissiveIntensity: 0.35,
        roughness: 0.1,
        metalness: 0.8,
        transparent: true,
        opacity: 0.8,
      }),
    ];

    const positions = [
      { x: -5.2, y: 1.4, z: 1.5, rx: 0.2, ry: 0.45 },
      { x: 5.0, y: -0.8, z: -1.2, rx: -0.15, ry: -0.38 },
      { x: 0, y: -2.8, z: 3.5, rx: 0.35, ry: 0.05 },
    ];

    positions.forEach((pos, i) => {
      const mesh = new THREE.Mesh(artboardGeom, materials[i % materials.length]);
      mesh.position.set(pos.x, pos.y, pos.z);
      mesh.rotation.set(pos.rx, pos.ry, 0);

      const edges = new THREE.EdgesGeometry(artboardGeom);
      const lineMat = new THREE.LineBasicMaterial({
        color: i === 1 ? 0x00f0ff : i === 2 ? 0x8a2be2 : 0xff7a00,
        linewidth: 1.5,
      });
      const wireframe = new THREE.LineSegments(edges, lineMat);
      mesh.add(wireframe);

      mainGroup.add(mesh);
      artboards.push({ mesh, basePos: pos, speed: 0.6 + i * 0.25 });
    });

    // Abstract Accents
    const torusGeom = new THREE.TorusGeometry(2.4, 0.2, 16, 80);
    const torusMat = new THREE.MeshStandardMaterial({
      color: 0x00f0ff,
      roughness: 0.2,
      metalness: 0.85,
      wireframe: true,
    });
    const torus = new THREE.Mesh(torusGeom, torusMat);
    torus.position.set(4.2, 3.8, -3.5);
    mainGroup.add(torus);

    const prismGeom = new THREE.IcosahedronGeometry(1.8, 0);
    const prismMat = new THREE.MeshPhysicalMaterial({
      color: 0xffffff,
      transmission: 0.85,
      opacity: 0.9,
      transparent: true,
      roughness: 0.05,
      ior: 1.5,
    });
    const prism = new THREE.Mesh(prismGeom, prismMat);
    prism.position.set(-5.5, -3.2, 0);
    mainGroup.add(prism);

    // Particle field
    const particleCount = 120;
    const particleGeom = new THREE.BufferGeometry();
    const particlePositions = new Float32Array(particleCount * 3);
    for (let i = 0; i < particleCount * 3; i += 3) {
      particlePositions[i] = (Math.random() - 0.5) * 35;
      particlePositions[i + 1] = (Math.random() - 0.5) * 30;
      particlePositions[i + 2] = (Math.random() - 0.5) * 20;
    }
    particleGeom.setAttribute('position', new THREE.BufferAttribute(particlePositions, 3));
    const particleMat = new THREE.PointsMaterial({
      size: 0.14,
      color: 0x00f0ff,
      transparent: true,
      opacity: 0.5,
    });
    const particleSystem = new THREE.Points(particleGeom, particleMat);
    scene.add(particleSystem);

    // Lighting
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.7);
    scene.add(ambientLight);

    const pointCyan = new THREE.PointLight(0x00f0ff, 3, 45);
    pointCyan.position.set(10, 8, 10);
    scene.add(pointCyan);

    const pointViolet = new THREE.PointLight(0x8a2be2, 3, 45);
    pointViolet.position.set(-10, -8, 8);
    scene.add(pointViolet);

    let frameId: number;
    const clock = new THREE.Clock();

    const renderScene = () => {
      const elapsedTime = clock.getElapsedTime();
      const targetX = mousePos.x * 2.0;
      const targetY = -(mousePos.y * 2.0);
      camera.position.x += (targetX - camera.position.x) * 0.04;
      camera.position.y += (targetY - camera.position.y) * 0.04;
      camera.lookAt(0, 0, 0);

      artboards.forEach((item, idx) => {
        item.mesh.position.y = item.basePos.y + Math.sin(elapsedTime * item.speed) * 0.35;
        item.mesh.rotation.y = item.basePos.ry + Math.cos(elapsedTime * 0.4 + idx) * 0.12;
      });

      torus.rotation.x += 0.007;
      torus.rotation.y += 0.01;
      prism.rotation.y += 0.008;
      particleSystem.rotation.y = elapsedTime * 0.018;

      renderer.render(scene, camera);
      frameId = requestAnimationFrame(renderScene);
    };

    renderScene();

    const handleResize = () => {
      if (!container) return;
      width = container.clientWidth;
      height = container.clientHeight;
      camera.aspect = width / height;
      camera.position.z = getCameraZ(width, height);
      camera.updateProjectionMatrix();
      renderer.setSize(width, height);
    };

    window.addEventListener('resize', handleResize);

    return () => {
      cancelAnimationFrame(frameId);
      window.removeEventListener('resize', handleResize);
      renderer.dispose();
      if (container.contains(renderer.domElement)) {
        container.removeChild(renderer.domElement);
      }
    };
  }, [isThreeLoaded, mousePos]);

  return (
    <div
      ref={containerRef}
      className="absolute inset-0 w-full h-full pointer-events-none z-10 overflow-hidden"
    />
  );
};

const GlobalReach3DGlobe: React.FC<{ activeCountry: string; onSelectCountry: (c: string) => void }> = ({
  activeCountry,
  onSelectCountry,
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const isThreeLoaded = useThreeLoader();
  const globeGroupRef = useRef<any>(null);

  useEffect(() => {
    if (!isThreeLoaded || !containerRef.current) return;

    const THREE = (window as any).THREE;
    const container = containerRef.current;
    let width = container.clientWidth;
    let height = container.clientHeight;

    const scene = new THREE.Scene();
    
    // Auto-adjust camera distance based on viewport width
    const getCamZ = (w: number) => (w < 480 ? 21 : w < 768 ? 19 : 17);
    const camera = new THREE.PerspectiveCamera(40, width / height, 0.1, 1000);
    camera.position.z = getCamZ(width);

    const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true, powerPreference: 'high-performance' });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    container.innerHTML = '';
    container.appendChild(renderer.domElement);

    const globeGroup = new THREE.Group();
    globeGroupRef.current = globeGroup;
    scene.add(globeGroup);

    const sphereRadius = 5.8;
    const sphereGeom = new THREE.SphereGeometry(sphereRadius, 32, 32);
    const sphereMat = new THREE.MeshBasicMaterial({
      color: 0x00f0ff,
      wireframe: true,
      transparent: true,
      opacity: 0.12,
    });
    const globeMesh = new THREE.Mesh(sphereGeom, sphereMat);
    globeGroup.add(globeMesh);

    const innerGeom = new THREE.SphereGeometry(sphereRadius - 0.06, 32, 32);
    const innerMat = new THREE.MeshBasicMaterial({
      color: 0x040810,
      transparent: true,
      opacity: 0.88,
    });
    const innerSphere = new THREE.Mesh(innerGeom, innerMat);
    globeGroup.add(innerSphere);

    const ringMat = new THREE.LineBasicMaterial({ color: 0x00f0ff, transparent: true, opacity: 0.35 });
    const equator = new THREE.LineLoop(
      new THREE.BufferGeometry().setFromPoints(
        new THREE.Path().absarc(0, 0, sphereRadius + 0.05, 0, Math.PI * 2, false).getPoints(64)
      ),
      ringMat
    );
    equator.rotation.x = Math.PI / 2;
    globeGroup.add(equator);

    const latLonToVector3 = (lat: number, lon: number, radius: number) => {
      const phi = (90 - lat) * (Math.PI / 180);
      const theta = (lon + 180) * (Math.PI / 180);
      const x = -(radius * Math.sin(phi) * Math.cos(theta));
      const z = radius * Math.sin(phi) * Math.sin(theta);
      const y = radius * Math.cos(phi);
      return new THREE.Vector3(x, y, z);
    };

    const pinGroup = new THREE.Group();
    globeGroup.add(pinGroup);

    const locations = [
      { name: 'Nigeria', lat: 9.082, lon: 8.6753, color: 0x00f0ff },
      { name: 'Ghana', lat: 7.9465, lon: -1.0232, color: 0x00f0ff },
      { name: 'United Kingdom', lat: 55.3781, lon: -3.436, color: 0xff7a00 },
      { name: 'Malawi', lat: -13.2543, lon: 34.3015, color: 0x8a2be2 },
    ];

    const pinVectors: { [key: string]: any } = {};

    locations.forEach((loc) => {
      const vec = latLonToVector3(loc.lat, loc.lon, sphereRadius);
      pinVectors[loc.name] = vec;

      const ringGeom = new THREE.RingGeometry(0.2, 0.38, 16);
      const ringMaterial = new THREE.MeshBasicMaterial({
        color: loc.color,
        side: THREE.DoubleSide,
        transparent: true,
        opacity: 0.85,
      });
      const ringMesh = new THREE.Mesh(ringGeom, ringMaterial);
      ringMesh.position.copy(vec);
      ringMesh.lookAt(0, 0, 0);
      pinGroup.add(ringMesh);

      const beaconGeom = new THREE.SphereGeometry(0.18, 12, 12);
      const beaconMat = new THREE.MeshBasicMaterial({ color: 0xffffff });
      const beacon = new THREE.Mesh(beaconGeom, beaconMat);
      beacon.position.copy(vec);
      pinGroup.add(beacon);
    });

    const createArc = (start: any, end: any, color: number) => {
      const distance = start.distanceTo(end);
      const mid = start.clone().lerp(end, 0.5);
      const midLength = mid.length();
      mid.normalize();
      mid.multiplyScalar(midLength + distance * 0.28);

      const curve = new THREE.QuadraticBezierCurve3(start, mid, end);
      const points = curve.getPoints(40);
      const geometry = new THREE.BufferGeometry().setFromPoints(points);
      const material = new THREE.LineBasicMaterial({
        color,
        linewidth: 2,
        transparent: true,
        opacity: 0.75,
      });
      return new THREE.Line(geometry, material);
    };

    if (pinVectors['Nigeria']) {
      const hq = pinVectors['Nigeria'];
      if (pinVectors['Ghana']) globeGroup.add(createArc(hq, pinVectors['Ghana'], 0x00f0ff));
      if (pinVectors['United Kingdom']) globeGroup.add(createArc(hq, pinVectors['United Kingdom'], 0xff7a00));
      if (pinVectors['Malawi']) globeGroup.add(createArc(hq, pinVectors['Malawi'], 0x8a2be2));
    }

    // Touch & Mouse Dragging logic with touch-scroll preservation
    let isDragging = false;
    let previousPos = { x: 0, y: 0 };

    const handleStart = (x: number, y: number) => {
      isDragging = true;
      previousPos = { x, y };
    };

    const handleMove = (x: number, y: number) => {
      if (!isDragging) return;
      const deltaX = x - previousPos.x;
      const deltaY = y - previousPos.y;
      globeGroup.rotation.y += deltaX * 0.006;
      globeGroup.rotation.x += deltaY * 0.006;
      previousPos = { x, y };
    };

    const handleEnd = () => {
      isDragging = false;
    };

    const onMouseDown = (e: MouseEvent) => handleStart(e.clientX, e.clientY);
    const onMouseMove = (e: MouseEvent) => handleMove(e.clientX, e.clientY);
    const onMouseUp = () => handleEnd();

    const onTouchStart = (e: TouchEvent) => {
      if (e.touches.length === 1) {
        handleStart(e.touches[0].clientX, e.touches[0].clientY);
      }
    };

    const onTouchMove = (e: TouchEvent) => {
      if (isDragging && e.touches.length === 1) {
        // Prevent accidental page jumping during horizontal rotation
        handleMove(e.touches[0].clientX, e.touches[0].clientY);
      }
    };

    const onTouchEnd = () => handleEnd();

    container.addEventListener('mousedown', onMouseDown);
    window.addEventListener('mousemove', onMouseMove);
    window.addEventListener('mouseup', onMouseUp);

    container.addEventListener('touchstart', onTouchStart, { passive: true });
    window.addEventListener('touchmove', onTouchMove, { passive: true });
    window.addEventListener('touchend', onTouchEnd);

    globeGroup.rotation.y = -1.2;
    globeGroup.rotation.x = 0.2;

    let frameId: number;
    const animate = () => {
      if (!isDragging) {
        globeGroup.rotation.y += 0.0018;
      }
      renderer.render(scene, camera);
      frameId = requestAnimationFrame(animate);
    };

    animate();

    const handleResize = () => {
      if (!container) return;
      width = container.clientWidth;
      height = container.clientHeight;
      camera.aspect = width / height;
      camera.position.z = getCamZ(width);
      camera.updateProjectionMatrix();
      renderer.setSize(width, height);
    };

    window.addEventListener('resize', handleResize);

    return () => {
      cancelAnimationFrame(frameId);
      container.removeEventListener('mousedown', onMouseDown);
      window.removeEventListener('mousemove', onMouseMove);
      window.removeEventListener('mouseup', onMouseUp);
      container.removeEventListener('touchstart', onTouchStart);
      window.removeEventListener('touchmove', onTouchMove);
      window.removeEventListener('touchend', onTouchEnd);
      window.removeEventListener('resize', handleResize);
      renderer.dispose();
      if (container.contains(renderer.domElement)) {
        container.removeChild(renderer.domElement);
      }
    };
  }, [isThreeLoaded]);

  return (
    <div className="relative w-full h-[290px] xs:h-[340px] sm:h-[420px] md:h-[480px] flex items-center justify-center cursor-grab active:cursor-grabbing select-none touch-none">
      <div ref={containerRef} className="w-full h-full" />
      <div className="absolute bottom-2 left-1/2 -translate-x-1/2 px-3 sm:px-4 py-1.5 rounded-full bg-black/60 border border-white/10 text-[10px] sm:text-xs text-white/70 pointer-events-none backdrop-blur-md flex items-center gap-2 max-w-[90%] text-center">
        <Compass size={12} className="text-[#00f0ff] shrink-0 animate-spin" style={{ animationDuration: '9s' }} />
        <span className="truncate">Drag / swipe to rotate global hubs</span>
      </div>
    </div>
  );
};

const TiltCard: React.FC<{
  children: React.ReactNode;
  className?: string;
  onClick?: () => void;
}> = ({ children, className = '', onClick }) => {
  const cardRef = useRef<HTMLDivElement>(null);
  const [tilt, setTilt] = useState({ x: 0, y: 0 });
  const [glow, setGlow] = useState({ x: 50, y: 50, opacity: 0 });
  const [isTouchDevice, setIsTouchDevice] = useState(false);

  useEffect(() => {
    // Detect touch-only screen to prevent awkward sticky tilts
    const isTouch = window.matchMedia('(pointer: coarse)').matches;
    setIsTouchDevice(isTouch);
  }, []);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (isTouchDevice || !cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;

    const tiltX = ((y - centerY) / centerY) * -6;
    const tiltY = ((x - centerX) / centerX) * 6;

    setTilt({ x: tiltX, y: tiltY });
    setGlow({
      x: (x / rect.width) * 100,
      y: (y / rect.height) * 100,
      opacity: 1,
    });
  };

  const handleMouseLeave = () => {
    if (isTouchDevice) return;
    setTilt({ x: 0, y: 0 });
    setGlow((prev) => ({ ...prev, opacity: 0 }));
  };

  return (
    <div
      ref={cardRef}
      onClick={onClick}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className={`relative transition-transform duration-200 ease-out will-change-transform ${className}`}
      style={{
        transform:
          !isTouchDevice && (tilt.x !== 0 || tilt.y !== 0)
            ? `perspective(1000px) rotateX(${tilt.x}deg) rotateY(${tilt.y}deg)`
            : 'none',
      }}
    >
      {!isTouchDevice && (
        <div
          className="pointer-events-none absolute -inset-px rounded-3xl opacity-0 transition-opacity duration-300 z-20"
          style={{
            opacity: glow.opacity,
            background: `radial-gradient(350px circle at ${glow.x}% ${glow.y}%, rgba(0, 240, 255, 0.15), transparent 60%)`,
          }}
        />
      )}
      {children}
    </div>
  );
};

const StatsSection: React.FC = () => {
  const stats = [
    {
      value: '150+',
      label: 'Projects Completed',
      subtext: 'Delivered for brands worldwide',
      accent: 'text-[#00f0ff]',
    },
    {
      value: '4+',
      label: 'Countries Reached',
      subtext: 'Cross-border creative network',
      accent: 'text-[#8a2be2]',
    },
    {
      value: '100%',
      label: 'Client Satisfaction',
      subtext: 'Uncompromised quality standard',
      accent: 'text-[#ff7a00]',
    },
  ];

  return (
    <section className="relative z-30 py-12 sm:py-16 md:py-20 border-y border-white/10 bg-[#06070a]/95 backdrop-blur-2xl">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 sm:gap-6 lg:gap-8">
          {stats.map((stat, idx) => (
            <TiltCard key={idx} className="h-full">
              <div className="h-full p-6 sm:p-8 rounded-2xl sm:rounded-3xl glass-panel border border-white/10 hover:border-white/20 transition-all duration-300 relative overflow-hidden group">
                <div className="absolute top-0 right-0 w-24 sm:w-32 h-24 sm:h-32 bg-white/[0.02] rounded-bl-full pointer-events-none group-hover:scale-110 transition-transform duration-500" />
                <div className="relative z-10 flex flex-col justify-between h-full">
                  <div className="flex items-center justify-between mb-3">
                    <span className="text-[10px] sm:text-xs font-bold tracking-widest uppercase text-white/50">
                      Metric 0{idx + 1}
                    </span>
                    <span className="w-2 h-2 rounded-full bg-white/30 group-hover:bg-[#00f0ff] transition-colors" />
                  </div>
                  <div className="my-2 sm:my-3">
                    <div className={`font-display text-4xl xs:text-5xl sm:text-6xl font-black tracking-tight ${stat.accent}`}>
                      {stat.value}
                    </div>
                    <div className="text-base sm:text-lg font-bold text-white mt-1.5">
                      {stat.label}
                    </div>
                  </div>
                  <div className="text-xs text-white/50 pt-3 border-t border-white/10 flex items-center justify-between">
                    <span className="truncate pr-2">{stat.subtext}</span>
                    <ArrowUpRight size={14} className="opacity-60 group-hover:opacity-100 transition-opacity text-white/90 shrink-0" />
                  </div>
                </div>
              </div>
            </TiltCard>
          ))}
        </div>
      </div>
    </section>
  );
};

const VideoModal: React.FC<{ video: any; onClose: () => void }> = ({ video, onClose }) => {
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [onClose]);

  if (!video) return null;

  return (
    <div
      className="fixed inset-0 z-[200] flex items-center justify-center p-3 sm:p-5 bg-black/90 backdrop-blur-xl animate-in fade-in duration-200 overflow-y-auto"
      onClick={onClose}
    >
      <div
        className="relative w-full max-w-4xl bg-[#0e1017] border border-white/15 rounded-2xl sm:rounded-3xl overflow-hidden shadow-2xl my-auto"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-center justify-between p-3.5 sm:p-5 border-b border-white/10 bg-white/5">
          <div className="flex items-center gap-2.5 sm:gap-3 min-w-0 pr-2">
            <div className="w-8 h-8 rounded-full bg-[#00f0ff]/20 text-[#00f0ff] flex items-center justify-center shrink-0">
              <Film size={16} />
            </div>
            <div className="truncate">
              <h4 className="text-sm sm:text-base font-bold text-white truncate">{video.title}</h4>
              <p className="text-[11px] text-white/50 truncate">{video.tag}</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-2 text-white/70 hover:text-white rounded-full bg-white/10 hover:bg-white/20 transition-colors shrink-0"
            aria-label="Close video player"
          >
            <X size={18} />
          </button>
        </div>

        <div className="relative w-full aspect-video bg-black">
          <iframe
            src={`https://www.youtube.com/embed/${video.embedId}?autoplay=1&rel=0`}
            title={video.title}
            className="w-full h-full border-0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
          />
        </div>

        <div className="p-3.5 sm:p-5 bg-[#0a0c12] flex flex-col xs:flex-row items-start xs:items-center justify-between gap-3 text-xs">
          <span className="text-white/60">DicksonGrafiks Production Unit</span>
          <a
            href={video.youtubeUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 font-bold text-[#00f0ff] hover:underline"
          >
            <span>Open in YouTube</span>
            <ExternalLink size={12} />
          </a>
        </div>
      </div>
    </div>
  );
};

const ImageModal: React.FC<{ item: any; onClose: () => void }> = ({ item, onClose }) => {
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [onClose]);

  if (!item) return null;

  return (
    <div
      className="fixed inset-0 z-[200] flex items-center justify-center p-3 sm:p-6 bg-black/92 backdrop-blur-2xl animate-in fade-in duration-200 overflow-y-auto"
      onClick={onClose}
    >
      <div
        className="relative w-full max-w-3xl bg-[#0e1017] border border-white/20 rounded-2xl sm:rounded-3xl overflow-hidden shadow-2xl my-auto"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          onClick={onClose}
          className="absolute top-3 right-3 sm:top-4 sm:right-4 z-30 p-2.5 rounded-full bg-black/70 backdrop-blur-md text-white/90 hover:text-white border border-white/20 hover:bg-white/20 transition-colors shadow-lg"
          aria-label="Close modal"
        >
          <X size={18} />
        </button>

        <div className="max-h-[58vh] sm:max-h-[68vh] overflow-hidden flex items-center justify-center bg-[#07090e] p-2">
          {item.image ? (
            <img
              src={item.image}
              alt={item.title}
              className="max-h-[56vh] sm:max-h-[66vh] w-auto max-w-full object-contain mx-auto rounded-lg"
              onError={(e) => {
                (e.target as HTMLImageElement).src =
                  'https://placehold.co/1080x1080/10141e/00f0ff?text=DicksonGrafiks+Artwork';
              }}
            />
          ) : (
            <div className="w-full h-[280px] sm:h-[380px] flex flex-col items-center justify-center p-6 text-center">
              <div className="w-14 h-14 rounded-2xl bg-white/10 flex items-center justify-center mb-3 text-[#00f0ff]">
                <Sparkles size={28} />
              </div>
              <h3 className="font-display text-xl sm:text-2xl font-bold text-white mb-2">{item.title}</h3>
              <p className="text-xs sm:text-sm text-white/60 max-w-md">{item.description}</p>
            </div>
          )}
        </div>

        <div className="p-4 sm:p-6 bg-[#0a0c12] border-t border-white/10 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="min-w-0">
            <span className="text-[10px] sm:text-xs uppercase tracking-wider font-bold text-[#00f0ff] block mb-0.5">
              {item.category || 'Portfolio Showcase'}
            </span>
            <h3 className="text-base sm:text-lg font-black text-white truncate">{item.title}</h3>
            <p className="text-xs text-white/60 mt-1 line-clamp-2 sm:line-clamp-none max-w-xl">{item.description}</p>
          </div>
          <button
            onClick={onClose}
            className="w-full sm:w-auto px-5 py-2.5 rounded-full bg-white/10 hover:bg-white/20 text-white text-xs font-semibold transition-colors shrink-0 text-center"
          >
            Close Viewer
          </button>
        </div>
      </div>
    </div>
  );
};

export default function App() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [selectedVideo, setSelectedVideo] = useState<any>(null);
  const [selectedImage, setSelectedImage] = useState<any>(null);
  const [activeGlobeCountry, setActiveGlobeCountry] = useState('Nigeria');
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const [cursorPos, setCursorPos] = useState({ x: -100, y: -100 });
  const [cursorHovered, setCursorHovered] = useState(false);
  const [photoFilter, setPhotoFilter] = useState('All');
  const [isTouchDevice, setIsTouchDevice] = useState(false);

  // Monitor touch device capability
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const touchCheck = () => {
        setIsTouchDevice('ontouchstart' in window || navigator.maxTouchPoints > 0);
      };
      touchCheck();
      window.addEventListener('resize', touchCheck);
      return () => window.removeEventListener('resize', touchCheck);
    }
  }, []);

  const filteredPhotoEdits = useMemo(() => {
    if (photoFilter === 'All') return ASSETS.photoEdits;
    return ASSETS.photoEdits.filter((item) => item.filterGroup === photoFilter);
  }, [photoFilter]);

  // Track mouse coordinates only on desktop
  useEffect(() => {
    if (isTouchDevice) return;

    const handleMouseMove = (e: MouseEvent) => {
      setMousePos({
        x: (e.clientX / window.innerWidth) * 2 - 1,
        y: (e.clientY / window.innerHeight) * 2 - 1,
      });
      setCursorPos({ x: e.clientX, y: e.clientY });
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, [isTouchDevice]);

  // Close mobile menu on resize to desktop
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 768 && mobileMenuOpen) {
        setMobileMenuOpen(false);
      }
    };
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, [mobileMenuOpen]);

  // Lock body scroll when mobile menu is open
  useEffect(() => {
    if (mobileMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [mobileMenuOpen]);

  const scrollToSection = useCallback((id: string) => {
    setMobileMenuOpen(false);
    const element = document.getElementById(id);
    if (element) {
      const navOffset = 80;
      const elementPosition = element.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - navOffset;

      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth',
      });
    }
  }, []);

  return (
    <div className="relative min-h-screen bg-[#06070a] text-white selection:bg-[#00f0ff] selection:text-black overflow-x-hidden w-full">
      <style>{CUSTOM_STYLES}</style>

      {/* Desktop-only Ambient Cursor */}
      {!isTouchDevice && (
        <>
          <div
            className="hidden lg:block fixed w-8 h-8 pointer-events-none rounded-full border border-[#00f0ff]/60 -translate-x-1/2 -translate-y-1/2 z-[9999] transition-transform duration-75"
            style={{
              left: `${cursorPos.x}px`,
              top: `${cursorPos.y}px`,
              transform: `translate(-50%, -50%) scale(${cursorHovered ? 1.7 : 1})`,
              backgroundColor: cursorHovered ? 'rgba(0, 240, 255, 0.15)' : 'transparent',
              boxShadow: '0 0 20px rgba(0, 240, 255, 0.4)',
            }}
          />
          <div
            className="hidden lg:block fixed w-1.5 h-1.5 pointer-events-none rounded-full bg-[#00f0ff] -translate-x-1/2 -translate-y-1/2 z-[9999]"
            style={{ left: `${cursorPos.x}px`, top: `${cursorPos.y}px` }}
          />
        </>
      )}

      {}
      <header className="fixed top-0 left-0 right-0 z-[100] px-3 sm:px-6 lg:px-8 pt-3 sm:pt-4 transition-all pointer-events-none">
        <nav className="pointer-events-auto max-w-7xl mx-auto flex items-center justify-between px-4 sm:px-6 py-3 rounded-full glass-panel border border-white/10 shadow-2xl backdrop-blur-2xl">
          {/* Brand Wordmark */}
          <div
            onClick={() => scrollToSection('hero')}
            className="flex items-center cursor-pointer group select-none"
            onMouseEnter={() => setCursorHovered(true)}
            onMouseLeave={() => setCursorHovered(false)}
          >
            <span className="font-display font-black text-lg xs:text-xl tracking-tight text-white group-hover:text-[#00f0ff] transition-colors">
              Dickson<span className="text-[#00f0ff]">Grafiks</span>
            </span>
          </div>

          {/* Desktop Nav Links */}
          <div className="hidden md:flex items-center gap-7 lg:gap-9 text-sm font-medium text-white/75">
            {['Work', 'Motion', 'Services', 'About', 'Global', 'Contact'].map((item) => (
              <button
                key={item}
                onClick={() => scrollToSection(item.toLowerCase())}
                onMouseEnter={() => setCursorHovered(true)}
                onMouseLeave={() => setCursorHovered(false)}
                className="hover:text-white transition-colors relative py-1 group"
              >
                {item}
                <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-[#00f0ff] transition-all duration-300 group-hover:w-full" />
              </button>
            ))}
          </div>

          {/* Action CTA (Desktop) */}
          <div className="hidden md:block">
            <button
              onClick={() => scrollToSection('contact')}
              onMouseEnter={() => setCursorHovered(true)}
              onMouseLeave={() => setCursorHovered(false)}
              className="px-5 py-2.5 rounded-full bg-white text-black font-extrabold text-xs tracking-wider uppercase hover:bg-[#00f0ff] hover:text-black transition-all duration-300 shadow-md hover:shadow-[#00f0ff]/30 active:scale-95 flex items-center gap-1.5"
            >
              <span>Start Project</span>
              <ArrowUpRight size={14} />
            </button>
          </div>

          {/* Mobile Hamburger Toggle Button */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden p-2 rounded-full bg-white/10 text-white hover:bg-white/20 active:scale-90 transition-all flex items-center justify-center"
            aria-label="Toggle Navigation Menu"
          >
            {mobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </nav>

        {/* Mobile Full-Bleed Navigation Overlay */}
        {mobileMenuOpen && (
          <div className="pointer-events-auto md:hidden mt-2 max-w-7xl mx-auto rounded-3xl glass-panel p-5 border border-white/15 animate-in slide-in-from-top-3 duration-300 shadow-2xl flex flex-col gap-2 max-h-[80vh] overflow-y-auto">
            <div className="text-[10px] uppercase tracking-widest text-[#00f0ff] font-bold px-3 pt-1">
              Studio Navigation
            </div>
            {['Work', 'Motion', 'Services', 'About', 'Global', 'Contact'].map((item) => (
              <button
                key={item}
                onClick={() => scrollToSection(item.toLowerCase())}
                className="flex items-center justify-between text-left py-3 px-3.5 rounded-xl hover:bg-white/10 active:bg-white/15 text-base font-semibold text-white transition-colors"
              >
                <span>{item}</span>
                <ChevronRight size={16} className="text-white/40" />
              </button>
            ))}
            <button
              onClick={() => scrollToSection('contact')}
              className="mt-3 w-full py-3.5 rounded-full bg-gradient-to-r from-[#00f0ff] via-white to-[#ff7a00] text-black font-black text-xs uppercase tracking-wider shadow-lg text-center active:scale-98 transition-transform"
            >
              Start a Project
            </button>
          </div>
        )}
      </header>

      {}
      <section
        id="hero"
        className="relative min-h-[92vh] sm:min-h-screen flex flex-col justify-center items-center px-4 sm:px-6 lg:px-8 pt-24 sm:pt-28 pb-12 overflow-hidden"
      >
        {/* Ambient background glows */}
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[300px] xs:w-[450px] md:w-[650px] h-[300px] xs:h-[450px] md:h-[650px] bg-[#00f0ff]/10 rounded-full blur-[100px] md:blur-[140px] pointer-events-none animate-pulse-glow" />
        <div className="absolute bottom-10 right-5 sm:right-10 w-[260px] md:w-[450px] h-[260px] md:h-[450px] bg-[#8a2be2]/12 rounded-full blur-[90px] md:blur-[120px] pointer-events-none" />

        {/* 3D WebGL Canvas Scene */}
        <Hero3DScene mousePos={mousePos} />

        {/* Hero Content */}
        <div className="relative z-20 max-w-5xl mx-auto text-center flex flex-col items-center w-full">
          <div className="inline-flex items-center gap-2 px-3.5 sm:px-4 py-1.5 rounded-full bg-white/5 border border-white/15 text-[11px] sm:text-xs font-bold uppercase tracking-widest text-[#00f0ff] mb-5 sm:mb-6 backdrop-blur-md">
            <Sparkles size={13} className="text-[#00f0ff] shrink-0" />
            <span>Premium Visual Design</span>
          </div>

          <h1 className="font-display font-black fluid-hero-title tracking-tight text-white mb-5 sm:mb-6 select-none">
            VISUALS THAT{' '}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#00f0ff] via-white to-[#ff7a00] glow-text-cyan block xs:inline">
              SPEAKS
            </span>
          </h1>

          <p className="max-w-2xl text-sm xs:text-base sm:text-lg md:text-xl text-white/80 leading-relaxed font-normal mb-8 sm:mb-10 px-2">
            “Bold visuals, premium edits and modern creative solutions for brands, businesses and
            individuals looking to make a lasting impact.”
          </p>

          <div className="flex flex-col xs:flex-row items-center justify-center gap-3.5 sm:gap-4 w-full max-w-md xs:max-w-none">
            <button
              onClick={() => scrollToSection('contact')}
              onMouseEnter={() => setCursorHovered(true)}
              onMouseLeave={() => setCursorHovered(false)}
              className="w-full xs:w-auto px-8 py-3.5 sm:py-4 rounded-full bg-gradient-to-r from-[#00f0ff] via-white to-[#00f0ff] text-black font-black text-xs sm:text-sm uppercase tracking-wider shadow-2xl hover:shadow-[0_0_35px_rgba(0,240,255,0.6)] hover:scale-105 active:scale-95 transition-all duration-300 flex items-center justify-center gap-2"
            >
              <span>Start a Project</span>
              <ArrowUpRight size={16} />
            </button>
            <button
              onClick={() => scrollToSection('work')}
              className="w-full xs:w-auto px-7 py-3.5 sm:py-4 rounded-full glass-panel hover:bg-white/10 active:bg-white/15 text-white font-semibold text-xs sm:text-sm transition-colors flex items-center justify-center gap-2"
            >
              <span>Explore Graphic Design</span>
              <ChevronDown size={15} />
            </button>
          </div>
        </div>

        {/* Downward indicator */}
        <div
          onClick={() => scrollToSection('work')}
          className="relative mt-12 sm:mt-16 z-20 flex flex-col items-center gap-1.5 cursor-pointer text-white/45 hover:text-white transition-colors select-none"
        >
          <span className="text-[9px] sm:text-[10px] uppercase tracking-widest font-bold">Scroll Down</span>
          <div className="w-4 h-7 rounded-full border border-white/25 flex items-start justify-center p-1">
            <div className="w-1 h-1.5 bg-[#00f0ff] rounded-full animate-bounce" />
          </div>
        </div>
      </section>

      {}
      <StatsSection />

      {}
      <section id="work" className="relative z-20 py-16 sm:py-24 lg:py-32 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-10 sm:mb-16 gap-4 sm:gap-6">
          <div>
            <div className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-[#00f0ff] mb-2.5">
              <Layers size={14} />
              <span>Signature Execution</span>
            </div>
            {}
            <h2 className="font-display font-black text-3xl xs:text-4xl sm:text-5xl md:text-6xl text-white tracking-tight">
              Graphic Design
            </h2>
          </div>
          <p className="text-white/70 max-w-md text-xs sm:text-sm md:text-base leading-relaxed">
            “A curated selection of our best visual projects and premium creative executions.”
          </p>
        </div>

        {/* Responsive Work Grid: 1 col on mobile, 2 on tablet, 4 on desktop */}
        <div className="grid grid-cols-1 xs:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 lg:gap-8">
          {ASSETS.projects.map((project, idx) => (
            <TiltCard
              key={project.id}
              onClick={() => setSelectedImage(project)}
              className="cursor-pointer group h-full"
            >
              <div className="h-full rounded-2xl sm:rounded-3xl glass-panel border border-white/10 hover:border-[#00f0ff]/40 overflow-hidden flex flex-col justify-between transition-all duration-300 shadow-xl">
                <div className="relative w-full aspect-[4/5] bg-[#090b12] overflow-hidden">
                  <img
                    src={project.image}
                    alt={project.title}
                    loading="lazy"
                    className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-500 ease-out"
                    onError={(e) => {
                      (e.target as HTMLImageElement).src =
                        'https://placehold.co/600x800/10141e/00f0ff?text=' +
                        encodeURIComponent(project.title);
                    }}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#06070a] via-transparent to-black/25 opacity-80" />
                  <div className="absolute top-2.5 left-2.5 z-10">
                    <span className="px-2.5 py-1 rounded-full bg-black/70 backdrop-blur-md border border-white/15 text-[9px] sm:text-[10px] font-bold text-white/90">
                      {project.category}
                    </span>
                  </div>
                  <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-black/40 backdrop-blur-[2px]">
                    <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-white/20 backdrop-blur-md border border-white/30 flex items-center justify-center text-white scale-90 group-hover:scale-100 transition-transform">
                      <Eye size={18} className="text-[#00f0ff]" />
                    </div>
                  </div>
                </div>

                <div className="p-4 sm:p-5 flex flex-col justify-between flex-grow">
                  <div>
                    <h3 className="font-display font-bold text-base sm:text-lg text-white group-hover:text-[#00f0ff] transition-colors mb-1 truncate">
                      {project.title}
                    </h3>
                    <p className="text-xs text-white/60 leading-relaxed line-clamp-2">
                      {project.description}
                    </p>
                  </div>
                  <div className="mt-3 pt-3 border-t border-white/10 flex items-center justify-between text-[11px] text-white/45">
                    <span>Project 0{idx + 1}</span>
                    <span className="text-white group-hover:text-[#00f0ff] inline-flex items-center gap-1 font-semibold">
                      Inspect <ChevronRight size={12} />
                    </span>
                  </div>
                </div>
              </div>
            </TiltCard>
          ))}
        </div>
      </section>

      {}
      <section id="motion" className="relative z-20 py-16 sm:py-24 lg:py-32 bg-[#040508] border-t border-white/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-10 sm:mb-16 gap-4 sm:gap-6">
            <div>
              <div className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-[#00f0ff] mb-2.5">
                <Video size={14} />
                <span>Cinematic Pacing</span>
              </div>
              <h2 className="font-display font-black text-3xl xs:text-4xl sm:text-5xl md:text-6xl text-white tracking-tight">
                Motion & Video Edits
              </h2>
            </div>
            <p className="text-white/70 max-w-md text-xs sm:text-sm md:text-base leading-relaxed">
              “High-energy video editing, motion graphics, and engaging short-form content designed to
              capture attention instantly.”
            </p>
          </div>

          <div className="grid grid-cols-1 xs:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
            {ASSETS.videos.map((vid) => (
              <TiltCard key={vid.id} className="h-full">
                <div className="h-full rounded-2xl sm:rounded-3xl glass-panel border border-white/10 hover:border-white/25 overflow-hidden flex flex-col justify-between group">
                  <div
                    onClick={() => setSelectedVideo(vid)}
                    className="relative w-full aspect-video bg-[#07090e] cursor-pointer overflow-hidden"
                  >
                    <img
                      src={vid.thumbnail}
                      alt={vid.title}
                      loading="lazy"
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                    <div className="absolute inset-0 bg-black/40 group-hover:bg-black/20 transition-colors flex items-center justify-center">
                      <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-white/25 backdrop-blur-md border border-white/30 flex items-center justify-center group-hover:scale-110 active:scale-95 transition-transform">
                        <Play size={16} className="text-white fill-white ml-0.5" />
                      </div>
                    </div>
                    <div className="absolute bottom-2 right-2 px-2 py-0.5 rounded bg-black/80 backdrop-blur-sm text-[9px] sm:text-[10px] font-bold text-white/90">
                      {vid.duration}
                    </div>
                  </div>

                  <div className="p-4 sm:p-5 flex flex-col justify-between flex-grow">
                    <div>
                      <span className="text-[10px] uppercase font-black text-[#00f0ff] tracking-wider">
                        {vid.tag}
                      </span>
                      <h3 className="font-display font-bold text-base sm:text-lg text-white mt-1 mb-3 group-hover:text-[#00f0ff] transition-colors line-clamp-1">
                        {vid.title}
                      </h3>
                    </div>

                    <div className="pt-3 border-t border-white/10 flex items-center justify-between text-xs">
                      <button
                        onClick={() => setSelectedVideo(vid)}
                        className="font-bold text-white/85 hover:text-white flex items-center gap-1"
                      >
                        <Play size={11} className="text-[#00f0ff]" />
                        <span>Watch Preview</span>
                      </button>
                      <a
                        href={vid.youtubeUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-white/45 hover:text-[#00f0ff] flex items-center gap-1 transition-colors"
                      >
                        <span>Link</span>
                        <ExternalLink size={11} />
                      </a>
                    </div>
                  </div>
                </div>
              </TiltCard>
            ))}
          </div>
        </div>
      </section>

      {}
      <section className="relative z-20 py-16 sm:py-24 lg:py-32 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-8 sm:mb-12 gap-4 sm:gap-6">
          <div>
            <div className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-[#00f0ff] mb-2.5">
              <Aperture size={14} />
              <span>Color & Detail Precision</span>
            </div>
            <h2 className="font-display font-black text-3xl xs:text-4xl sm:text-5xl md:text-6xl text-white tracking-tight">
              Photo Edit
            </h2>
          </div>
          <p className="text-white/70 max-w-md text-xs sm:text-sm md:text-base leading-relaxed">
            “Explore more premium visuals and creative edits from our portfolio collection.”
          </p>
        </div>

        {/* Category Pills: Horizontal scrollable on mobile */}
        <div className="flex items-center gap-2 overflow-x-auto pb-3 mb-8 sm:mb-12 scrollbar-none no-scrollbar">
          {['All', 'Beauty & Skin', 'Studio & Editorial', 'Color & Lighting'].map((cat) => {
            const isActive = photoFilter === cat;
            const count =
              cat === 'All'
                ? ASSETS.photoEdits.length
                : ASSETS.photoEdits.filter((p) => p.filterGroup === cat).length;
            return (
              <button
                key={cat}
                onClick={() => setPhotoFilter(cat)}
                className={`whitespace-nowrap px-3.5 sm:px-5 py-2 rounded-full text-xs font-bold tracking-wide transition-all duration-300 flex items-center gap-2 shrink-0 ${
                  isActive
                    ? 'bg-[#00f0ff] text-black shadow-lg shadow-[#00f0ff]/30 scale-102'
                    : 'glass-panel border border-white/10 text-white/70 hover:bg-white/10 hover:text-white'
                }`}
              >
                <span>{cat}</span>
                <span
                  className={`text-[9px] sm:text-[10px] px-1.5 py-0.5 rounded-full ${
                    isActive ? 'bg-black/20 text-black font-black' : 'bg-white/10 text-white/60'
                  }`}
                >
                  {count}
                </span>
              </button>
            );
          })}
        </div>

        {/* 16-Card Showcase Grid */}
        <div className="grid grid-cols-1 xs:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-6 lg:gap-8">
          {filteredPhotoEdits.map((item, idx) => (
            <TiltCard
              key={item.id}
              onClick={() => setSelectedImage(item)}
              className="cursor-pointer group h-full"
            >
              <div className="h-full rounded-2xl sm:rounded-3xl glass-panel border border-white/10 hover:border-[#00f0ff]/40 overflow-hidden flex flex-col justify-between transition-all duration-300 shadow-xl">
                <div className="relative w-full aspect-[4/5] bg-[#090b12] overflow-hidden">
                  <img
                    src={item.image}
                    alt={item.title}
                    loading="lazy"
                    className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-500 ease-out"
                    onError={(e) => {
                      (e.target as HTMLImageElement).src =
                        'https://placehold.co/600x800/10141e/00f0ff?text=' +
                        encodeURIComponent(item.title);
                    }}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#06070a] via-transparent to-black/25 opacity-80" />
                  <div className="absolute top-2.5 left-2.5 z-10">
                    <span className="px-2.5 py-1 rounded-full bg-black/70 backdrop-blur-md border border-white/15 text-[9px] sm:text-[10px] font-bold text-white/90">
                      {item.category}
                    </span>
                  </div>
                  <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-black/40 backdrop-blur-[2px]">
                    <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-white/20 backdrop-blur-md border border-white/30 flex items-center justify-center text-white scale-90 group-hover:scale-100 transition-transform">
                      <Eye size={18} className="text-[#00f0ff]" />
                    </div>
                  </div>
                </div>

                <div className="p-4 sm:p-5 flex flex-col justify-between flex-grow">
                  <div>
                    <h3 className="font-display font-bold text-base sm:text-lg text-white group-hover:text-[#00f0ff] transition-colors mb-1 truncate">
                      {item.title}
                    </h3>
                    <p className="text-xs text-white/60 leading-relaxed line-clamp-2">
                      {item.description}
                    </p>
                  </div>
                  <div className="mt-3 pt-3 border-t border-white/10 flex items-center justify-between text-[11px] text-white/45">
                    <span>Edit {String(idx + 1).padStart(2, '0')}</span>
                    <span className="text-white group-hover:text-[#00f0ff] inline-flex items-center gap-1 font-semibold">
                      Inspect <ChevronRight size={12} />
                    </span>
                  </div>
                </div>
              </div>
            </TiltCard>
          ))}
        </div>
      </section>

      {}
      <section id="services" className="relative z-20 py-16 sm:py-24 lg:py-32 bg-[#040508] border-t border-white/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mb-12 sm:mb-16">
            <div className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-[#00f0ff] mb-2.5">
              <Compass size={14} />
              <span>Studio Capabilities</span>
            </div>
            <h2 className="font-display font-black text-3xl xs:text-4xl sm:text-5xl md:text-6xl text-white tracking-tight mb-4 sm:mb-6">
              About & Expertise
            </h2>
            <p className="text-sm sm:text-base md:text-lg text-white/80 leading-relaxed">
              “DicksonGrafiks, founded by Goodness N. Dickson, is a premium visual design brand focused
              on creating bold, modern and impactful creative visuals that stand out and communicate
              effectively across all platforms.”
            </p>
          </div>

          <div className="grid grid-cols-1 xs:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
            {[
              {
                title: 'Brand & Identity Design',
                icon: Layers,
                desc: 'Comprehensive brand systems, guidelines, typography, and bespoke vector iconography.',
                accent: '#00f0ff',
              },
              {
                title: 'Social Media Design',
                icon: Monitor,
                desc: 'High-converting feeds, carousel slides, banners, and thumb-stopping visual templates.',
                accent: '#8a2be2',
              },
              {
                title: 'Photo Retouching',
                icon: Aperture,
                desc: 'Advanced skin texture restoration, background manipulation, and editorial color grades.',
                accent: '#ff7a00',
              },
              {
                title: 'Motion Graphics',
                icon: Sparkles,
                desc: 'Kinetic title sequences, animated logo reveals, and dynamic 3D promotional assets.',
                accent: '#00f0ff',
              },
              {
                title: 'Video Editing',
                icon: Video,
                desc: 'Cinematic pacing, sound design, multi-cam cuts, and viral high-retention reel edits.',
                accent: '#8a2be2',
              },
              {
                title: 'Web Visual Design',
                icon: Globe2,
                desc: 'Futuristic web artboards, immersive hero compositions, and high-impact landing visuals.',
                accent: '#ff7a00',
              },
            ].map((exp, idx) => {
              const Icon = exp.icon;
              return (
                <TiltCard key={idx} className="h-full">
                  <div className="h-full p-6 sm:p-8 rounded-2xl sm:rounded-3xl glass-panel border border-white/10 hover:border-white/25 transition-all duration-300 flex flex-col justify-between group">
                    <div>
                      <div
                        className="w-10 h-10 sm:w-12 sm:h-12 rounded-xl sm:rounded-2xl flex items-center justify-center mb-5 transition-transform group-hover:scale-110"
                        style={{
                          backgroundColor: `${exp.accent}15`,
                          color: exp.accent,
                          border: `1px solid ${exp.accent}30`,
                        }}
                      >
                        <Icon size={22} />
                      </div>
                      <h3 className="font-display font-bold text-lg sm:text-xl text-white mb-2.5">
                        {exp.title}
                      </h3>
                      <p className="text-xs sm:text-sm text-white/65 leading-relaxed">
                        {exp.desc}
                      </p>
                    </div>

                    <div className="pt-4 sm:pt-6 mt-4 sm:mt-6 border-t border-white/10 flex items-center justify-between text-xs text-white/40 group-hover:text-white/80 transition-colors">
                      <span>Capability 0{idx + 1}</span>
                      <ArrowUpRight size={14} />
                    </div>
                  </div>
                </TiltCard>
              );
            })}
          </div>
        </div>
      </section>

      {}
      <section id="about" className="relative z-20 py-16 sm:py-24 lg:py-32 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto overflow-hidden">
        <div className="flex flex-col lg:flex-row items-center gap-10 lg:gap-16">
          {/* Founder Image Card */}
          <div className="w-full lg:w-1/2 flex justify-center">
            <div className="relative w-full max-w-sm sm:max-w-md">
              {/* Overlapping Badges - positioned safely inside on mobile */}
              <div className="absolute -top-3 left-2 sm:-top-5 sm:-left-4 z-30 px-3 sm:px-4 py-1.5 sm:py-2 rounded-xl sm:rounded-2xl glass-panel border border-white/20 shadow-xl flex items-center gap-2 animate-float">
                <Award size={15} className="text-[#00f0ff]" />
                <span className="text-[11px] sm:text-xs font-bold text-white">Lead Creative</span>
              </div>

              <div
                className="absolute -bottom-3 right-2 sm:-bottom-5 sm:-right-4 z-30 px-3 sm:px-4 py-1.5 sm:py-2 rounded-xl sm:rounded-2xl glass-panel border border-white/20 shadow-xl flex items-center gap-2 animate-float"
                style={{ animationDelay: '2s' }}
              >
                <div className="w-2 h-2 rounded-full bg-[#00f0ff] animate-ping" />
                <span className="text-[11px] sm:text-xs font-semibold text-white">Available Worldwide</span>
              </div>

              <div className="p-2 sm:p-3 rounded-3xl sm:rounded-[36px] bg-gradient-to-tr from-[#00f0ff]/30 via-white/10 to-[#ff7a00]/30 border border-white/20 shadow-2xl">
                <div className="relative rounded-2xl sm:rounded-[28px] overflow-hidden aspect-[4/5] bg-[#0c0f18]">
                  <img
                    src={ASSETS.founder.image}
                    alt={ASSETS.founder.name}
                    loading="lazy"
                    className="w-full h-full object-cover object-center"
                    onError={(e) => {
                      (e.target as HTMLImageElement).src =
                        'https://placehold.co/800x1000/10141e/ffffff?text=Goodness+N.+Dickson';
                    }}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-transparent to-transparent" />
                  <div className="absolute bottom-4 sm:bottom-6 left-4 sm:left-6 right-4 sm:right-6">
                    <span className="text-[10px] sm:text-xs uppercase tracking-widest font-black text-[#00f0ff] block">
                      Founder & Visionary
                    </span>
                    <h4 className="font-display text-xl sm:text-2xl font-black text-white">
                      {ASSETS.founder.name}
                    </h4>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Founder Bio Text */}
          <div className="w-full lg:w-1/2 flex flex-col items-start text-left">
            <div className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-[#00f0ff] mb-2.5">
              <Sparkle size={14} />
              <span>The Architect Behind the Visuals</span>
            </div>
            <h2 className="font-display font-black text-3xl xs:text-4xl sm:text-5xl text-white tracking-tight mb-2">
              Meet the Creative Mind
            </h2>
            <div className="text-xs sm:text-sm uppercase font-extrabold tracking-wider text-[#ff7a00] mb-5">
              {ASSETS.founder.name} — <span className="text-white/70">{ASSETS.founder.role}</span>
            </div>

            <div className="space-y-3.5 text-white/80 leading-relaxed text-xs sm:text-sm md:text-base mb-6 sm:mb-8">
              <p>
                “With a profound passion for visual storytelling, Goodness founded DicksonGrafiks to bridge
                the gap between brilliant ideas and impactful designs. Every project is approached with a
                commitment to excellence, ensuring that brands not only look premium but also communicate
                their message powerfully.”
              </p>
              <p>
                “Whether it's crafting a cohesive brand identity from scratch or engineering
                high-converting marketing visuals, Goodness brings years of expertise, a keen eye for
                aesthetic detail, and a relentless drive to help clients stand out in competitive digital
                landscapes.”
              </p>
            </div>

            <div className="grid grid-cols-2 gap-3 sm:gap-4 w-full mb-6 sm:mb-8">
              <div className="p-3.5 sm:p-4 rounded-xl sm:rounded-2xl glass-panel border border-white/10">
                <span className="text-[10px] sm:text-xs text-white/50 block">Design Philosophy</span>
                <span className="text-xs sm:text-sm font-bold text-white mt-1 block">Bold & Impact-Driven</span>
              </div>
              <div className="p-3.5 sm:p-4 rounded-xl sm:rounded-2xl glass-panel border border-white/10">
                <span className="text-[10px] sm:text-xs text-white/50 block">Core Standard</span>
                <span className="text-xs sm:text-sm font-bold text-[#00f0ff] mt-1 block">Zero Compromise</span>
              </div>
            </div>

            <button
              onClick={() => scrollToSection('contact')}
              className="w-full sm:w-auto px-7 py-3 sm:py-3.5 rounded-full bg-white text-black font-extrabold text-xs uppercase tracking-wider hover:bg-[#00f0ff] transition-colors text-center"
            >
              Collaborate with Goodness
            </button>
          </div>
        </div>
      </section>

      {}
      <section id="global" className="relative z-20 py-16 sm:py-24 lg:py-32 bg-[#040508] border-t border-white/10 overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-8 sm:mb-12">
            <div className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-[#00f0ff] mb-2.5">
              <Globe2 size={14} />
              <span>Worldwide Footprint</span>
            </div>
            <h2 className="font-display font-black text-3xl xs:text-4xl sm:text-5xl md:text-6xl text-white tracking-tight mb-3">
              Global Reach
            </h2>
            <p className="text-white/70 text-xs sm:text-sm md:text-base leading-relaxed">
              “Our creative reach spans across multiple countries and international collaborations.”
            </p>
          </div>

          <div className="my-4 sm:my-6">
            <GlobalReach3DGlobe
              activeCountry={activeGlobeCountry}
              onSelectCountry={setActiveGlobeCountry}
            />
          </div>

          {/* Interactive Country Badges */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-4 mt-6 sm:mt-8">
            {ASSETS.countries.map((country) => {
              const isSelected = activeGlobeCountry === country.name;
              return (
                <div
                  key={country.name}
                  onClick={() => setActiveGlobeCountry(country.name)}
                  className={`p-3.5 sm:p-5 rounded-xl sm:rounded-2xl transition-all duration-300 cursor-pointer text-center select-none ${
                    isSelected
                      ? 'bg-white/10 border border-[#00f0ff] shadow-lg shadow-[#00f0ff]/20 scale-102'
                      : 'glass-panel border border-white/10 hover:border-white/20'
                  }`}
                >
                  <span className="text-2xl sm:text-3xl block mb-1 sm:mb-2">{country.flag}</span>
                  <h4 className="font-display font-bold text-sm sm:text-base text-white">{country.name}</h4>
                  <span className="text-[10px] sm:text-[11px] text-white/50 block mt-0.5 truncate">{country.role}</span>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {}
      <section id="contact" className="relative z-20 py-16 sm:py-24 lg:py-36 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <div className="relative rounded-3xl sm:rounded-[40px] glass-panel border border-white/20 p-6 sm:p-12 lg:p-20 overflow-hidden text-center shadow-2xl">
          <div className="absolute -top-20 -left-20 w-64 sm:w-96 h-64 sm:h-96 bg-[#00f0ff]/20 rounded-full blur-3xl pointer-events-none" />
          <div className="absolute -bottom-20 -right-20 w-64 sm:w-96 h-64 sm:h-96 bg-[#8a2be2]/20 rounded-full blur-3xl pointer-events-none" />

          <div className="relative z-10 max-w-3xl mx-auto flex flex-col items-center">
            <div className="inline-flex items-center gap-2 px-3.5 sm:px-4 py-1.5 rounded-full bg-white/5 border border-white/15 text-[11px] sm:text-xs font-bold uppercase tracking-widest text-[#00f0ff] mb-5 sm:mb-6">
              <MessageSquare size={13} />
              <span>Let's Talk Design</span>
            </div>

            <h2 className="font-display font-black text-3xl xs:text-4xl sm:text-6xl md:text-7xl text-white tracking-tight leading-tight mb-4 sm:mb-6">
              Let’s Create Something{' '}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#00f0ff] via-white to-[#ff7a00] block xs:inline">
                Powerful
              </span>
            </h2>

            <p className="text-sm sm:text-base md:text-lg text-white/80 font-normal leading-relaxed mb-8 sm:mb-10 max-w-xl">
              “Want to learn Graphic Design or start a project? Message us today.”
            </p>

            {/* Main Action Trigger */}
            <div className="w-full max-w-xs sm:max-w-sm mb-10 sm:mb-12">
              <button
                onClick={() => {
                  window.open(
                    'https://wa.me/?text=Hello%20DicksonGrafiks,%20I%20would%20like%20to%20start%20a%20creative%20project%20or%20inquire%20about%20graphic%20design.',
                    '_blank'
                  );
                }}
                className="w-full px-8 py-4 sm:py-5 rounded-full bg-gradient-to-r from-[#00f0ff] via-white to-[#00f0ff] text-black font-black text-sm sm:text-base uppercase tracking-wider shadow-2xl hover:shadow-[0_0_50px_rgba(0,240,255,0.7)] hover:scale-105 active:scale-95 transition-all duration-300 flex items-center justify-center gap-2.5 cursor-pointer"
              >
                <span>Start Now</span>
                <Send size={18} />
              </button>
            </div>

            {/* Social channels: fluid wrapped layout */}
            <div className="w-full pt-8 sm:pt-10 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between gap-5 text-center sm:text-left">
              <span className="text-[11px] sm:text-xs uppercase tracking-wider text-white/50 font-bold">
                Connect Directly on Official Channels
              </span>

              <div className="flex flex-wrap items-center justify-center gap-2.5 sm:gap-3">
                {ASSETS.socials.map((social) => {
                  const Icon = social.icon;
                  return (
                    <a
                      key={social.name}
                      href={social.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="px-3.5 sm:px-4 py-2 rounded-full bg-white/5 hover:bg-white/15 border border-white/10 hover:border-[#00f0ff]/50 text-white transition-all duration-300 hover:scale-105 flex items-center gap-2 text-xs font-semibold"
                    >
                      <Icon size={14} className="text-[#00f0ff]" />
                      <span>{social.name}</span>
                    </a>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      </section>

      {}
      <footer className="relative z-20 py-8 sm:py-10 border-t border-white/10 bg-[#040508] safe-bottom">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-white/60 text-center sm:text-left">
          <div>
            © 2026 DicksonGrafiks — Visuals That Speaks | Goodness N. Dickson
          </div>
          <div className="flex items-center gap-5">
            <span
              className="hover:text-white transition-colors cursor-pointer"
              onClick={() => scrollToSection('hero')}
            >
              Back to Top
            </span>
            <span className="text-white/30">•</span>
            <span className="text-[#00f0ff]">Crafted for Global Impact</span>
          </div>
        </div>
      </footer>

      {}
      <VideoModal video={selectedVideo} onClose={() => setSelectedVideo(null)} />
      <ImageModal item={selectedImage} onClose={() => setSelectedImage(null)} />
    </div>
  );
}