import React, { useState, useEffect, useRef, useMemo } from 'react';
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
  Volume2
} from 'lucide-react';

const CUSTOM_STYLES = `
@import url('https://fonts.googleapis.com/css2?family=Cabinet+Grotesk:wght@800;900&family=Plus+Jakarta+Sans:ital,wght@0,300;0,400;0,500;0,600;0,700;0,800;1,400&display=swap');

:root {
  --electric-cyan: #00f0ff;
  --electric-violet: #8a2be2;
  --neon-orange: #ff7a00;
  --dark-bg: #06070a;
}

body {
  font-family: 'Plus Jakarta Sans', sans-serif;
  background-color: #06070a;
  color: #ffffff;
  overflow-x: hidden;
  margin: 0;
}

.font-display {
  font-family: 'Cabinet Grotesk', 'Plus Jakarta Sans', sans-serif;
  letter-spacing: -0.04em;
}

/* Custom glow effects */
.glow-cyan {
  box-shadow: 0 0 45px -5px rgba(0, 240, 255, 0.35);
}

.glow-text-cyan {
  text-shadow: 0 0 25px rgba(0, 240, 255, 0.6);
}

.glow-orange {
  box-shadow: 0 0 45px -5px rgba(255, 122, 0, 0.4);
}

/* Glassmorphism primitives */
.glass-panel {
  background: rgba(18, 20, 29, 0.65);
  backdrop-filter: blur(16px);
  -webkit-backdrop-filter: blur(16px);
  border: 1px solid rgba(255, 255, 255, 0.08);
}

.glass-panel-hover {
  transition: all 0.4s cubic-bezier(0.16, 1, 0.3, 1);
}

.glass-panel-hover:hover {
  background: rgba(25, 28, 42, 0.8);
  border-color: rgba(0, 240, 255, 0.35);
  transform: translateY(-4px);
}

/* Animations */
@keyframes pulseGlow {
  0%, 100% { opacity: 0.4; transform: scale(1); }
  50% { opacity: 0.8; transform: scale(1.08); }
}

.animate-pulse-glow {
  animation: pulseGlow 6s ease-in-out infinite;
}

@keyframes floatGentle {
  0%, 100% { transform: translateY(0px) rotate(0deg); }
  50% { transform: translateY(-10px) rotate(1deg); }
}

.animate-float {
  animation: floatGentle 5s ease-in-out infinite;
}
`;

const ASSETS = {
  projects: [
    {
      id: 'proj-1',
      title: 'Business Flyer Design',
      category: 'Brand Identity Project',
      description: 'Clean and bold identity systems designed to build strong visual recognition.',
      image: 'https://dicksongrafiks-nigeria.netlify.app/images/Premium%20Nail%20Flyer-01.png',
      tag: 'Vector & Print',
      accent: '#ff7a00',
    },
    {
      id: 'proj-2',
      title: 'Marketing Flyer Design',
      category: 'Marketing Design',
      description: 'High-performing visuals designed to grab attention instantly and increase engagement.',
      image: 'https://dicksongrafiks-nigeria.netlify.app/images/Plumbing%20Design.png',
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
      name: 'X',
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

    const script = document.createElement('script');
    script.src = 'https://cdnjs.cloudflare.com/ajax/libs/three.js/r128/three.min.js';
    script.async = true;
    script.onload = () => setLoaded(true);
    document.body.appendChild(script);

    return () => {
      // Keep loaded
    };
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
    const width = container.clientWidth;
    const height = container.clientHeight;

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(45, width / height, 0.1, 1000);
    camera.position.z = 24;

    const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    container.innerHTML = '';
    container.appendChild(renderer.domElement);

    const mainGroup = new THREE.Group();
    scene.add(mainGroup);

    // 1. Floating 3D Graphic Design Panels (Artboards)
    const artboards: any[] = [];
    const artboardGeom = new THREE.BoxGeometry(4.2, 5.8, 0.12);

    const materials = [
      new THREE.MeshPhysicalMaterial({
        color: 0x0f172a,
        roughness: 0.15,
        metalness: 0.75,
        clearcoat: 1.0,
        clearcoatRoughness: 0.1,
        transparent: true,
        opacity: 0.85,
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
        opacity: 0.85,
      }),
    ];

    const positions = [
      { x: -5.5, y: 1.5, z: 2, rx: 0.2, ry: 0.5 },
      { x: 5.2, y: -0.8, z: -1.5, rx: -0.15, ry: -0.4 },
      { x: 0, y: -2.8, z: 4, rx: 0.4, ry: 0.05 },
    ];

    positions.forEach((pos, i) => {
      const mesh = new THREE.Mesh(artboardGeom, materials[i % materials.length]);
      mesh.position.set(pos.x, pos.y, pos.z);
      mesh.rotation.set(pos.rx, pos.ry, 0);

      const edges = new THREE.EdgesGeometry(artboardGeom);
      const lineMat = new THREE.LineBasicMaterial({
        color: i === 1 ? 0x00f0ff : i === 2 ? 0x8a2be2 : 0xff7a00,
        linewidth: 2,
      });
      const wireframe = new THREE.LineSegments(edges, lineMat);
      mesh.add(wireframe);

      mainGroup.add(mesh);
      artboards.push({ mesh, basePos: pos, speed: 0.6 + i * 0.3 });
    });

    // 2. Abstract Geometry: Torus & Icosahedron Prism
    const torusGeom = new THREE.TorusGeometry(2.8, 0.25, 16, 100);
    const torusMat = new THREE.MeshStandardMaterial({
      color: 0x00f0ff,
      roughness: 0.2,
      metalness: 0.9,
      wireframe: true,
    });
    const torus = new THREE.Mesh(torusGeom, torusMat);
    torus.position.set(4.5, 4.2, -4);
    mainGroup.add(torus);

    const prismGeom = new THREE.IcosahedronGeometry(2, 0);
    const prismMat = new THREE.MeshPhysicalMaterial({
      color: 0xffffff,
      transmission: 0.9,
      opacity: 1,
      transparent: true,
      roughness: 0,
      ior: 1.5,
      thickness: 0.5,
    });
    const prism = new THREE.Mesh(prismGeom, prismMat);
    prism.position.set(-6, -3.5, 0);
    mainGroup.add(prism);

    // 3. Glowing Particles
    const particleCount = 180;
    const particleGeom = new THREE.BufferGeometry();
    const particlePositions = new Float32Array(particleCount * 3);
    for (let i = 0; i < particleCount * 3; i += 3) {
      particlePositions[i] = (Math.random() - 0.5) * 35;
      particlePositions[i + 1] = (Math.random() - 0.5) * 30;
      particlePositions[i + 2] = (Math.random() - 0.5) * 20;
    }
    particleGeom.setAttribute('position', new THREE.BufferAttribute(particlePositions, 3));
    const particleMat = new THREE.PointsMaterial({
      size: 0.12,
      color: 0x00f0ff,
      transparent: true,
      opacity: 0.6,
    });
    const particleSystem = new THREE.Points(particleGeom, particleMat);
    scene.add(particleSystem);

    // 4. Lighting Rig
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.7);
    scene.add(ambientLight);

    const pointCyan = new THREE.PointLight(0x00f0ff, 3.5, 50);
    pointCyan.position.set(10, 8, 10);
    scene.add(pointCyan);

    const pointViolet = new THREE.PointLight(0x8a2be2, 3.5, 50);
    pointViolet.position.set(-10, -8, 8);
    scene.add(pointViolet);

    const pointOrange = new THREE.PointLight(0xff7a00, 2, 40);
    pointOrange.position.set(0, 10, -5);
    scene.add(pointOrange);

    let frameId: number;
    const clock = new THREE.Clock();

    const renderScene = () => {
      const elapsedTime = clock.getElapsedTime();
      const targetX = mousePos.x * 2.5;
      const targetY = -(mousePos.y * 2.5);
      camera.position.x += (targetX - camera.position.x) * 0.04;
      camera.position.y += (targetY - camera.position.y) * 0.04;
      camera.lookAt(0, 0, 0);

      artboards.forEach((item, idx) => {
        item.mesh.position.y = item.basePos.y + Math.sin(elapsedTime * item.speed) * 0.4;
        item.mesh.rotation.y = item.basePos.ry + Math.cos(elapsedTime * 0.5 + idx) * 0.15;
        item.mesh.rotation.x = item.basePos.rx + Math.sin(elapsedTime * 0.4 + idx) * 0.1;
      });

      torus.rotation.x += 0.008;
      torus.rotation.y += 0.012;
      prism.rotation.y += 0.01;
      prism.rotation.x += 0.007;
      particleSystem.rotation.y = elapsedTime * 0.02;

      renderer.render(scene, camera);
      frameId = requestAnimationFrame(renderScene);
    };

    renderScene();

    const handleResize = () => {
      if (!container) return;
      const newWidth = container.clientWidth;
      const newHeight = container.clientHeight;
      camera.aspect = newWidth / newHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(newWidth, newHeight);
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

  useEffect(() => {
    if (!isThreeLoaded || !containerRef.current) return;

    const THREE = (window as any).THREE;
    const container = containerRef.current;
    const width = container.clientWidth;
    const height = container.clientHeight;

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(40, width / height, 0.1, 1000);
    camera.position.z = 18;

    const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    container.innerHTML = '';
    container.appendChild(renderer.domElement);

    const globeGroup = new THREE.Group();
    scene.add(globeGroup);

    const sphereRadius = 6;
    const sphereGeom = new THREE.SphereGeometry(sphereRadius, 36, 36);
    const sphereMat = new THREE.MeshBasicMaterial({
      color: 0x00f0ff,
      wireframe: true,
      transparent: true,
      opacity: 0.12,
    });
    const globeMesh = new THREE.Mesh(sphereGeom, sphereMat);
    globeGroup.add(globeMesh);

    const innerGeom = new THREE.SphereGeometry(sphereRadius - 0.05, 32, 32);
    const innerMat = new THREE.MeshBasicMaterial({
      color: 0x040810,
      transparent: true,
      opacity: 0.85,
    });
    const innerSphere = new THREE.Mesh(innerGeom, innerMat);
    globeGroup.add(innerSphere);

    const ringMat = new THREE.LineBasicMaterial({ color: 0x00f0ff, transparent: true, opacity: 0.3 });
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

      const ringGeom = new THREE.RingGeometry(0.2, 0.35, 16);
      const ringMaterial = new THREE.MeshBasicMaterial({
        color: loc.color,
        side: THREE.DoubleSide,
        transparent: true,
        opacity: 0.8,
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

    let isDragging = false;
    let previousMousePosition = { x: 0, y: 0 };

    const handleMouseDown = (e: MouseEvent) => {
      isDragging = true;
      previousMousePosition = { x: e.clientX, y: e.clientY };
    };

    const handleMouseMove = (e: MouseEvent) => {
      if (!isDragging) return;
      const deltaX = e.clientX - previousMousePosition.x;
      const deltaY = e.clientY - previousMousePosition.y;
      globeGroup.rotation.y += deltaX * 0.005;
      globeGroup.rotation.x += deltaY * 0.005;
      previousMousePosition = { x: e.clientX, y: e.clientY };
    };

    const handleMouseUp = () => {
      isDragging = false;
    };

    container.addEventListener('mousedown', handleMouseDown);
    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('mouseup', handleMouseUp);

    const handleTouchStart = (e: TouchEvent) => {
      if (e.touches.length > 0) {
        isDragging = true;
        previousMousePosition = { x: e.touches[0].clientX, y: e.touches[0].clientY };
      }
    };

    const handleTouchMove = (e: TouchEvent) => {
      if (!isDragging || e.touches.length === 0) return;
      const deltaX = e.touches[0].clientX - previousMousePosition.x;
      const deltaY = e.touches[0].clientY - previousMousePosition.y;
      globeGroup.rotation.y += deltaX * 0.005;
      globeGroup.rotation.x += deltaY * 0.005;
      previousMousePosition = { x: e.touches[0].clientX, y: e.touches[0].clientY };
    };

    container.addEventListener('touchstart', handleTouchStart);
    window.addEventListener('touchmove', handleTouchMove);
    window.addEventListener('touchend', handleMouseUp);

    globeGroup.rotation.y = -1.2;
    globeGroup.rotation.x = 0.2;

    let frameId: number;
    const animate = () => {
      if (!isDragging) {
        globeGroup.rotation.y += 0.002;
      }
      renderer.render(scene, camera);
      frameId = requestAnimationFrame(animate);
    };

    animate();

    const handleResize = () => {
      if (!container) return;
      const newWidth = container.clientWidth;
      const newHeight = container.clientHeight;
      camera.aspect = newWidth / newHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(newWidth, newHeight);
    };

    window.addEventListener('resize', handleResize);

    return () => {
      cancelAnimationFrame(frameId);
      container.removeEventListener('mousedown', handleMouseDown);
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseup', handleMouseUp);
      container.removeEventListener('touchstart', handleTouchStart);
      window.removeEventListener('touchmove', handleTouchMove);
      window.removeEventListener('touchend', handleMouseUp);
      window.removeEventListener('resize', handleResize);
      renderer.dispose();
      if (container.contains(renderer.domElement)) {
        container.removeChild(renderer.domElement);
      }
    };
  }, [isThreeLoaded]);

  return (
    <div className="relative w-full h-[360px] md:h-[480px] flex items-center justify-center cursor-grab active:cursor-grabbing">
      <div ref={containerRef} className="w-full h-full" />
      <div className="absolute bottom-3 left-1/2 -translate-x-1/2 px-4 py-1.5 rounded-full bg-white/5 border border-white/10 text-[11px] text-white/60 pointer-events-none backdrop-blur-md flex items-center gap-2">
        <Compass size={12} className="text-[#00f0ff] animate-spin" style={{ animationDuration: '8s' }} />
        <span>Drag to rotate the 3D studio network</span>
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

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;

    const tiltX = ((y - centerY) / centerY) * -10;
    const tiltY = ((x - centerX) / centerX) * 10;

    setTilt({ x: tiltX, y: tiltY });
    setGlow({
      x: (x / rect.width) * 100,
      y: (y / rect.height) * 100,
      opacity: 1,
    });
  };

  const handleMouseLeave = () => {
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
        transform: `perspective(1000px) rotateX(${tilt.x}deg) rotateY(${tilt.y}deg)`,
      }}
    >
      <div
        className="pointer-events-none absolute -inset-px rounded-3xl opacity-0 transition-opacity duration-300 z-20"
        style={{
          opacity: glow.opacity,
          background: `radial-gradient(400px circle at ${glow.x}% ${glow.y}%, rgba(0, 240, 255, 0.15), transparent 60%)`,
        }}
      />
      {children}
    </div>
  );
};

const StatsSection: React.FC = () => {
  const stats = [
    {
      value: '0',
      label: 'Projects Completed',
      subtext: 'Current official ledger index',
      accent: 'text-[#00f0ff]',
    },
    {
      value: '0',
      label: 'Countries Reached',
      subtext: 'Baseline international registry',
      accent: 'text-[#8a2be2]',
    },
    {
      value: '0',
      label: 'Client Satisfaction',
      subtext: 'Uncompromised standard zero-loss metric',
      accent: 'text-[#ff7a00]',
    },
  ];

  return (
    <section className="relative z-30 py-16 sm:py-24 border-y border-white/10 bg-[#06070a]/90 backdrop-blur-2xl">
      <div className="max-w-7xl mx-auto px-6 sm:px-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8">
          {stats.map((stat, idx) => (
            <TiltCard key={idx} className="h-full">
              <div className="h-full p-8 sm:p-10 rounded-3xl glass-panel border border-white/10 hover:border-white/20 transition-all duration-300 relative overflow-hidden group">
                <div className="absolute top-0 right-0 w-32 h-32 bg-white/[0.02] rounded-bl-full pointer-events-none group-hover:scale-110 transition-transform duration-500" />
                <div className="relative z-10 flex flex-col justify-between h-full">
                  <div className="flex items-center justify-between mb-4">
                    <span className="text-xs font-semibold tracking-wider uppercase text-white/50">
                      Studio Metric 0{idx + 1}
                    </span>
                    <span className="w-2 h-2 rounded-full bg-white/30 group-hover:bg-[#00f0ff] transition-colors" />
                  </div>
                  <div className="my-3">
                    <div className={`font-display text-6xl sm:text-7xl font-extrabold tracking-tight ${stat.accent}`}>
                      {stat.value}
                    </div>
                    <div className="text-lg sm:text-xl font-semibold text-white mt-2">
                      {stat.label}
                    </div>
                  </div>
                  <div className="text-xs text-white/50 pt-4 border-t border-white/10 flex items-center justify-between">
                    <span>{stat.subtext}</span>
                    <ArrowUpRight size={14} className="opacity-0 group-hover:opacity-100 transition-opacity text-white/80" />
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
  if (!video) return null;

  return (
    <div className="fixed inset-0 z-[200] flex items-center justify-center p-4 bg-black/85 backdrop-blur-xl animate-in fade-in duration-300">
      <div className="relative w-full max-w-4xl bg-[#0e1017] border border-white/15 rounded-3xl overflow-hidden shadow-2xl">
        <div className="flex items-center justify-between p-5 border-b border-white/10 bg-white/5">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-full bg-[#00f0ff]/20 text-[#00f0ff] flex items-center justify-center">
              <Film size={16} />
            </div>
            <div>
              <h4 className="text-sm font-semibold text-white">{video.title}</h4>
              <p className="text-xs text-white/50">{video.tag}</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-2 text-white/60 hover:text-white rounded-full bg-white/10 hover:bg-white/20 transition-colors"
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

        <div className="p-5 bg-[#0a0c12] flex items-center justify-between">
          <span className="text-xs text-white/60">Produced by DicksonGrafiks Video Unit</span>
          <a
            href={video.youtubeUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 text-xs font-semibold text-[#00f0ff] hover:underline"
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
  if (!item) return null;

  return (
    <div className="fixed inset-0 z-[200] flex items-center justify-center p-4 bg-black/90 backdrop-blur-2xl animate-in fade-in duration-300">
      <div className="relative w-full max-w-3xl bg-[#0e1017] border border-white/20 rounded-3xl overflow-hidden shadow-2xl">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 z-30 p-2.5 rounded-full bg-black/60 backdrop-blur-md text-white/80 hover:text-white border border-white/20 hover:bg-white/20 transition-colors"
        >
          <X size={18} />
        </button>

        <div className="max-h-[70vh] overflow-hidden flex items-center justify-center bg-[#07090e]">
          {item.image ? (
            <img
              src={item.image}
              alt={item.title}
              className="max-h-[70vh] w-auto object-contain mx-auto"
              onError={(e) => {
                (e.target as HTMLImageElement).src =
                  'https://placehold.co/1080x1080/10141e/00f0ff?text=DicksonGrafiks+Artwork';
              }}
            />
          ) : (
            <div className="w-full h-[400px] flex flex-col items-center justify-center p-10 bg-gradient-to-br from-[#121526] via-[#090b14] to-[#1a0f28] text-center">
              <div className="w-16 h-16 rounded-2xl bg-white/10 flex items-center justify-center mb-4 text-[#00f0ff]">
                <Sparkles size={32} />
              </div>
              <h3 className="font-display text-2xl font-bold text-white mb-2">{item.title}</h3>
              <p className="text-sm text-white/60 max-w-md">{item.description}</p>
            </div>
          )}
        </div>

        <div className="p-6 bg-[#0a0c12] border-t border-white/10 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <span className="text-xs uppercase tracking-wider font-semibold text-[#00f0ff]">
              {item.category || 'High-Fidelity Portfolio'}
            </span>
            <h3 className="text-lg font-bold text-white mt-0.5">{item.title}</h3>
            <p className="text-xs text-white/60 mt-1 max-w-xl">{item.description}</p>
          </div>
          <button
            onClick={onClose}
            className="px-6 py-2.5 rounded-full bg-white/10 hover:bg-white/20 text-white text-xs font-semibold transition-colors shrink-0"
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

  const filteredPhotoEdits = useMemo(() => {
    if (photoFilter === 'All') return ASSETS.photoEdits;
    return ASSETS.photoEdits.filter((item) => item.filterGroup === photoFilter);
  }, [photoFilter]);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePos({
        x: (e.clientX / window.innerWidth) * 2 - 1,
        y: (e.clientY / window.innerHeight) * 2 - 1,
      });
      setCursorPos({ x: e.clientX, y: e.clientY });
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  const scrollToSection = (id: string) => {
    setMobileMenuOpen(false);
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="relative min-h-screen bg-[#06070a] text-white selection:bg-[#00f0ff] selection:text-black overflow-x-hidden">
      <style>{CUSTOM_STYLES}</style>

      {/* Desktop Ambient Custom Cursor Glow */}
      <div
        className="hidden lg:block fixed w-8 h-8 pointer-events-none rounded-full border border-[#00f0ff]/60 -translate-x-1/2 -translate-y-1/2 z-[9999] transition-transform duration-75"
        style={{
          left: `${cursorPos.x}px`,
          top: `${cursorPos.y}px`,
          transform: `translate(-50%, -50%) scale(${cursorHovered ? 1.8 : 1})`,
          backgroundColor: cursorHovered ? 'rgba(0, 240, 255, 0.15)' : 'transparent',
          boxShadow: '0 0 20px rgba(0, 240, 255, 0.4)',
        }}
      />
      <div
        className="hidden lg:block fixed w-1.5 h-1.5 pointer-events-none rounded-full bg-[#00f0ff] -translate-x-1/2 -translate-y-1/2 z-[9999]"
        style={{ left: `${cursorPos.x}px`, top: `${cursorPos.y}px` }}
      />

      {/* STICKY / FLOATING NAVIGATION */}
      <header className="fixed top-0 left-0 right-0 z-[100] px-4 sm:px-8 py-4 sm:py-5 transition-all">
        <nav className="max-w-7xl mx-auto flex items-center justify-between px-5 sm:px-6 py-3.5 rounded-full glass-panel border border-white/10 shadow-2xl backdrop-blur-2xl">
          {/* Brand Wordmark */}
          <div
            onClick={() => scrollToSection('hero')}
            className="flex items-center cursor-pointer group"
            onMouseEnter={() => setCursorHovered(true)}
            onMouseLeave={() => setCursorHovered(false)}
          >
            <span className="font-display font-extrabold text-xl tracking-tight text-white group-hover:text-[#00f0ff] transition-colors">
              DicksonGrafiks
            </span>
          </div>

          {/* Center Links (Desktop) */}
          <div className="hidden md:flex items-center gap-8 text-sm font-medium text-white/75">
            {['Work', 'About', 'Services', 'Contact'].map((item) => (
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

          {/* Right Action Button (Desktop) */}
          <div className="hidden md:block">
            <button
              onClick={() => scrollToSection('contact')}
              onMouseEnter={() => setCursorHovered(true)}
              onMouseLeave={() => setCursorHovered(false)}
              className="px-5 py-2 rounded-full bg-white text-black font-semibold text-xs tracking-wide uppercase hover:bg-[#00f0ff] hover:text-black transition-all duration-300 shadow-md hover:shadow-[#00f0ff]/30 active:scale-95 flex items-center gap-1.5"
            >
              <span>Start a Project</span>
              <ArrowUpRight size={14} />
            </button>
          </div>

          {/* Mobile Hamburger Button */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden p-2 rounded-full bg-white/10 text-white hover:bg-white/20 transition-colors"
            aria-label="Toggle Navigation"
          >
            {mobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </nav>

        {/* Mobile Navigation Drawer */}
        {mobileMenuOpen && (
          <div className="md:hidden mt-3 max-w-7xl mx-auto rounded-3xl glass-panel p-6 border border-white/15 animate-in slide-in-from-top-4 duration-300 shadow-2xl flex flex-col gap-4">
            <div className="text-xs uppercase tracking-widest text-white/40 font-semibold px-2">
              Navigation Menu
            </div>
            {['Work', 'About', 'Services', 'Contact'].map((item) => (
              <button
                key={item}
                onClick={() => scrollToSection(item.toLowerCase())}
                className="flex items-center justify-between text-left py-3 px-3 rounded-xl hover:bg-white/10 text-lg font-medium text-white transition-colors"
              >
                <span>{item}</span>
                <ChevronRight size={18} className="text-white/40" />
              </button>
            ))}
            <button
              onClick={() => scrollToSection('contact')}
              className="mt-2 w-full py-3.5 rounded-full bg-gradient-to-r from-[#00f0ff] to-[#8a2be2] text-black font-bold text-sm shadow-lg text-center"
            >
              Start a Project
            </button>
          </div>
        )}
      </header>

      {/* SECTION 1: HERO SECTION */}
      <section
        id="hero"
        className="relative min-h-screen flex flex-col justify-center items-center px-6 sm:px-8 pt-28 pb-16 overflow-hidden"
      >
        {/* Ambient Radial Background Glows */}
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-[#00f0ff]/10 rounded-full blur-[140px] pointer-events-none animate-pulse-glow" />
        <div className="absolute bottom-10 right-10 w-[450px] h-[450px] bg-[#8a2be2]/15 rounded-full blur-[120px] pointer-events-none" />

        {/* 3D WebGL Interactive Artboard Canvas Scene */}
        <Hero3DScene mousePos={mousePos} />

        {/* Foreground Content */}
        <div className="relative z-20 max-w-5xl mx-auto text-center flex flex-col items-center">
          {/* Supporting Headline */}
          <div className="inline-flex items-center gap-2.5 px-4 py-1.5 rounded-full bg-white/5 border border-white/15 text-xs font-semibold uppercase tracking-widest text-[#00f0ff] mb-6 backdrop-blur-md">
            <Sparkles size={13} className="text-[#00f0ff]" />
            <span>Premium Visual Design</span>
          </div>

          {/* Main Tagline */}
          <h1 className="font-display font-black text-5xl sm:text-7xl md:text-8xl lg:text-9xl tracking-tight text-white leading-[0.95] mb-6">
            VISUALS THAT{' '}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#00f0ff] via-white to-[#ff7a00] glow-text-cyan">
              SPEAKS
            </span>
          </h1>

          {/* Main Description */}
          <p className="max-w-2xl text-base sm:text-lg md:text-xl text-white/80 leading-relaxed font-normal mb-10">
            “Bold visuals, premium edits and modern creative solutions for brands, businesses and
            individuals looking to make a lasting impact.”
          </p>

          {/* Prominent CTA */}
          <div className="flex flex-col sm:flex-row items-center gap-4">
            <button
              onClick={() => scrollToSection('contact')}
              onMouseEnter={() => setCursorHovered(true)}
              onMouseLeave={() => setCursorHovered(false)}
              className="px-9 py-4 rounded-full bg-gradient-to-r from-[#00f0ff] via-white to-[#00f0ff] text-black font-extrabold text-sm uppercase tracking-wider shadow-2xl hover:shadow-[0_0_35px_rgba(0,240,255,0.6)] hover:scale-105 active:scale-95 transition-all duration-300 flex items-center gap-2"
            >
              <span>Start a Project</span>
              <ArrowUpRight size={16} />
            </button>
            <button
              onClick={() => scrollToSection('work')}
              className="px-8 py-4 rounded-full glass-panel hover:bg-white/10 text-white font-semibold text-sm transition-colors flex items-center gap-2"
            >
              <span>Explore Selected Work</span>
              <ChevronDown size={16} />
            </button>
          </div>
        </div>

        {/* Scroll Indicator */}
        <div
          onClick={() => scrollToSection('work')}
          className="absolute bottom-8 left-1/2 -translate-x-1/2 z-20 flex flex-col items-center gap-2 cursor-pointer text-white/50 hover:text-white transition-colors"
        >
          <span className="text-[10px] uppercase tracking-widest font-semibold">Scroll to explore</span>
          <div className="w-5 h-8 rounded-full border border-white/30 flex items-start justify-center p-1">
            <div className="w-1 h-2 bg-[#00f0ff] rounded-full animate-bounce" />
          </div>
        </div>
      </section>

      {/* SECTION 2: STATS SECTION */}
      <StatsSection />

      {/* SECTION 3: SELECTED WORK */}
      <section id="work" className="relative z-20 py-24 sm:py-32 px-6 sm:px-8 max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6">
          <div>
            <div className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-[#00f0ff] mb-3">
              <Layers size={14} />
              <span>Signature Execution</span>
            </div>
            <h2 className="font-display font-black text-4xl sm:text-5xl md:text-6xl text-white tracking-tight">
              Selected Work
            </h2>
          </div>
          <p className="text-white/70 max-w-md text-sm sm:text-base leading-relaxed">
            “A curated selection of our best visual projects and premium creative executions.”
          </p>
        </div>

        {/* Project Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8">
          {ASSETS.projects.map((project, idx) => (
            <TiltCard
              key={project.id}
              onClick={() => setSelectedImage(project)}
              className="cursor-pointer group h-full"
            >
              <div className="h-full rounded-3xl glass-panel border border-white/10 hover:border-[#00f0ff]/40 overflow-hidden flex flex-col justify-between transition-all duration-300 shadow-xl">
                {/* Visual Thumbnail */}
                <div className="relative w-full aspect-[4/5] bg-[#090b12] overflow-hidden">
                  <img
                    src={project.image}
                    alt={project.title}
                    loading="lazy"
                    className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-700 ease-out"
                    onError={(e) => {
                      (e.target as HTMLImageElement).src =
                        'https://placehold.co/600x800/10141e/00f0ff?text=' +
                        encodeURIComponent(project.title);
                    }}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#06070a] via-transparent to-black/20 opacity-80" />
                  <div className="absolute top-3 left-3 z-10">
                    <span className="px-3 py-1 rounded-full bg-black/60 backdrop-blur-md border border-white/15 text-[10px] font-semibold text-white/90">
                      {project.category}
                    </span>
                  </div>
                  <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-black/40 backdrop-blur-[2px]">
                    <div className="w-12 h-12 rounded-full bg-white/20 backdrop-blur-md border border-white/30 flex items-center justify-center text-white scale-90 group-hover:scale-100 transition-transform">
                      <Eye size={20} className="text-[#00f0ff]" />
                    </div>
                  </div>
                </div>

                {/* Meta details */}
                <div className="p-5 flex flex-col justify-between flex-grow">
                  <div>
                    <h3 className="font-display font-bold text-lg text-white group-hover:text-[#00f0ff] transition-colors mb-1.5">
                      {project.title}
                    </h3>
                    <p className="text-xs text-white/60 leading-relaxed line-clamp-2">
                      {project.description}
                    </p>
                  </div>
                  <div className="mt-4 pt-3 border-t border-white/10 flex items-center justify-between text-[11px] text-white/40">
                    <span>Project 0{idx + 1}</span>
                    <span className="text-white group-hover:text-[#00f0ff] group-hover:translate-x-1 transition-all inline-flex items-center gap-1 font-medium">
                      Inspect <ChevronRight size={12} />
                    </span>
                  </div>
                </div>
              </div>
            </TiltCard>
          ))}
        </div>
      </section>

      {/* SECTION 4: MOTION & VIDEO EDITS */}
      <section id="motion" className="relative z-20 py-24 sm:py-32 bg-[#040508] border-t border-white/10">
        <div className="max-w-7xl mx-auto px-6 sm:px-8">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6">
            <div>
              <div className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-[#00f0ff] mb-3">
                <Video size={14} />
                <span>Cinematic Pacing</span>
              </div>
              <h2 className="font-display font-black text-4xl sm:text-5xl md:text-6xl text-white tracking-tight">
                Motion & Video Edits
              </h2>
            </div>
            <p className="text-white/70 max-w-md text-sm sm:text-base leading-relaxed">
              “High-energy video editing, motion graphics, and engaging short-form content designed to
              capture attention instantly.”
            </p>
          </div>

          {/* 4 Large Video Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {ASSETS.videos.map((vid) => (
              <TiltCard key={vid.id} className="h-full">
                <div className="h-full rounded-3xl glass-panel border border-white/10 hover:border-white/25 overflow-hidden flex flex-col justify-between group">
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
                      <div className="w-12 h-12 rounded-full bg-white/20 backdrop-blur-md border border-white/30 flex items-center justify-center group-hover:scale-110 transition-transform">
                        <Play size={18} className="text-white fill-white ml-0.5" />
                      </div>
                    </div>
                    <div className="absolute bottom-2.5 right-2.5 px-2.5 py-1 rounded bg-black/70 backdrop-blur-sm text-[10px] font-semibold text-white/80">
                      {vid.duration}
                    </div>
                  </div>

                  <div className="p-5 flex flex-col justify-between flex-grow">
                    <div>
                      <span className="text-[10px] uppercase font-bold text-[#00f0ff] tracking-wider">
                        {vid.tag}
                      </span>
                      <h3 className="font-display font-bold text-lg text-white mt-1 mb-4 group-hover:text-[#00f0ff] transition-colors">
                        {vid.title}
                      </h3>
                    </div>

                    <div className="pt-3 border-t border-white/10 flex items-center justify-between">
                      <button
                        onClick={() => setSelectedVideo(vid)}
                        className="text-xs font-semibold text-white/80 hover:text-white flex items-center gap-1.5"
                      >
                        <Play size={12} className="text-[#00f0ff]" />
                        <span>Watch Preview</span>
                      </button>
                      <a
                        href={vid.youtubeUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-xs text-white/40 hover:text-[#00f0ff] flex items-center gap-1 transition-colors"
                      >
                        <span>Watch on YouTube</span>
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

      {/* SECTION 5: PHOTO EDIT GALLERY */}
      <section className="relative z-20 py-24 sm:py-32 px-6 sm:px-8 max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6">
          <div>
            <div className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-[#00f0ff] mb-3">
              <Aperture size={14} />
              <span>Color & Detail Precision</span>
            </div>
            <h2 className="font-display font-black text-4xl sm:text-5xl md:text-6xl text-white tracking-tight">
              Photo Edit
            </h2>
          </div>
          <p className="text-white/70 max-w-md text-sm sm:text-base leading-relaxed">
            “Explore more premium visuals and creative edits from our portfolio collection.”
          </p>
        </div>

        {/* Interactive Category Filter Pills */}
        <div className="flex flex-wrap items-center gap-2 sm:gap-3 mb-12">
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
                className={`px-4 sm:px-5 py-2 rounded-full text-xs font-semibold tracking-wide transition-all duration-300 flex items-center gap-2 ${
                  isActive
                    ? 'bg-[#00f0ff] text-black shadow-lg shadow-[#00f0ff]/30 scale-105'
                    : 'glass-panel border border-white/10 text-white/70 hover:bg-white/10 hover:text-white'
                }`}
              >
                <span>{cat}</span>
                <span
                  className={`text-[10px] px-1.5 py-0.5 rounded-full ${
                    isActive ? 'bg-black/20 text-black font-bold' : 'bg-white/10 text-white/60'
                  }`}
                >
                  {count}
                </span>
              </button>
            );
          })}
        </div>

        {/* Expanded 16-Card Showcase Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 lg:gap-8">
          {filteredPhotoEdits.map((item, idx) => (
            <TiltCard
              key={item.id}
              onClick={() => setSelectedImage(item)}
              className="cursor-pointer group h-full"
            >
              <div className="h-full rounded-3xl glass-panel border border-white/10 hover:border-[#00f0ff]/40 overflow-hidden flex flex-col justify-between transition-all duration-300 shadow-xl">
                <div className="relative w-full aspect-[4/5] bg-[#090b12] overflow-hidden">
                  <img
                    src={item.image}
                    alt={item.title}
                    loading="lazy"
                    className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-700 ease-out"
                    onError={(e) => {
                      (e.target as HTMLImageElement).src =
                        'https://placehold.co/600x800/10141e/00f0ff?text=' +
                        encodeURIComponent(item.title);
                    }}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#06070a] via-transparent to-black/20 opacity-80" />
                  <div className="absolute top-3 left-3 z-10">
                    <span className="px-3 py-1 rounded-full bg-black/60 backdrop-blur-md border border-white/15 text-[10px] font-semibold text-white/90">
                      {item.category}
                    </span>
                  </div>
                  <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-black/40 backdrop-blur-[2px]">
                    <div className="w-12 h-12 rounded-full bg-white/20 backdrop-blur-md border border-white/30 flex items-center justify-center text-white scale-90 group-hover:scale-100 transition-transform">
                      <Eye size={20} className="text-[#00f0ff]" />
                    </div>
                  </div>
                </div>

                <div className="p-5 flex flex-col justify-between flex-grow">
                  <div>
                    <h3 className="font-display font-bold text-lg text-white group-hover:text-[#00f0ff] transition-colors mb-1.5">
                      {item.title}
                    </h3>
                    <p className="text-xs text-white/60 leading-relaxed line-clamp-2">
                      {item.description}
                    </p>
                  </div>
                  <div className="mt-4 pt-3 border-t border-white/10 flex items-center justify-between text-[11px] text-white/40">
                    <span>Edit {String(idx + 1).padStart(2, '0')}</span>
                    <span className="text-white group-hover:text-[#00f0ff] group-hover:translate-x-1 transition-all inline-flex items-center gap-1 font-medium">
                      Inspect <ChevronRight size={12} />
                    </span>
                  </div>
                </div>
              </div>
            </TiltCard>
          ))}
        </div>
      </section>

      {/* SECTION 6: ABOUT & EXPERTISE */}
      <section id="services" className="relative z-20 py-24 sm:py-32 bg-[#040508] border-t border-white/10">
        <div className="max-w-7xl mx-auto px-6 sm:px-8">
          <div className="max-w-3xl mb-16">
            <div className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-[#00f0ff] mb-3">
              <Compass size={14} />
              <span>Studio Capabilities</span>
            </div>
            <h2 className="font-display font-black text-4xl sm:text-5xl md:text-6xl text-white tracking-tight mb-6">
              About & Expertise
            </h2>
            <p className="text-base sm:text-lg text-white/80 leading-relaxed">
              “DicksonGrafiks, founded by Goodness N. Dickson, is a premium visual design brand focused
              on creating bold, modern and impactful creative visuals that stand out and communicate
              effectively across all platforms.”
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
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
                  <div className="h-full p-8 rounded-3xl glass-panel border border-white/10 hover:border-white/25 transition-all duration-300 flex flex-col justify-between group">
                    <div>
                      <div
                        className="w-12 h-12 rounded-2xl flex items-center justify-center mb-6 transition-transform group-hover:scale-110"
                        style={{
                          backgroundColor: `${exp.accent}15`,
                          color: exp.accent,
                          border: `1px solid ${exp.accent}30`,
                        }}
                      >
                        <Icon size={24} />
                      </div>
                      <h3 className="font-display font-bold text-xl sm:text-2xl text-white mb-3">
                        {exp.title}
                      </h3>
                      <p className="text-sm text-white/65 leading-relaxed">
                        {exp.desc}
                      </p>
                    </div>

                    <div className="pt-6 mt-6 border-t border-white/10 flex items-center justify-between text-xs text-white/40 group-hover:text-white/80 transition-colors">
                      <span>Discipline 0{idx + 1}</span>
                      <ArrowUpRight size={14} />
                    </div>
                  </div>
                </TiltCard>
              );
            })}
          </div>
        </div>
      </section>

      {/* SECTION 7: MEET THE CREATIVE MIND */}
      <section id="about" className="relative z-20 py-24 sm:py-32 px-6 sm:px-8 max-w-7xl mx-auto">
        <div className="flex flex-col lg:flex-row items-center gap-12 lg:gap-16">
          <div className="w-full lg:w-1/2 flex justify-center">
            <TiltCard className="w-full max-w-md">
              <div className="relative p-3 rounded-[36px] bg-gradient-to-tr from-[#00f0ff]/30 via-white/10 to-[#ff7a00]/30 border border-white/20 shadow-2xl">
                <div className="absolute -top-5 -left-5 z-30 px-4 py-2 rounded-2xl glass-panel border border-white/20 shadow-xl flex items-center gap-2 animate-float">
                  <Award size={16} className="text-[#00f0ff]" />
                  <span className="text-xs font-bold text-white">Lead Creative</span>
                </div>

                <div className="absolute -bottom-5 -right-5 z-30 px-4 py-2.5 rounded-2xl glass-panel border border-white/20 shadow-xl flex items-center gap-2 animate-float" style={{ animationDelay: '2s' }}>
                  <div className="w-2.5 h-2.5 rounded-full bg-[#00f0ff] animate-ping" />
                  <span className="text-xs font-semibold text-white">Available Worldwide</span>
                </div>

                <div className="relative rounded-[30px] overflow-hidden aspect-[4/5] bg-[#0c0f18]">
                  <img
                    src={ASSETS.founder.image}
                    alt={ASSETS.founder.name}
                    className="w-full h-full object-cover object-center"
                    onError={(e) => {
                      (e.target as HTMLImageElement).src =
                        'https://placehold.co/800x1000/10141e/ffffff?text=Goodness+N.+Dickson';
                    }}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />
                  <div className="absolute bottom-6 left-6 right-6">
                    <span className="text-xs uppercase tracking-widest font-semibold text-[#00f0ff]">
                      Founder & Visionary
                    </span>
                    <h4 className="font-display text-2xl font-black text-white">
                      {ASSETS.founder.name}
                    </h4>
                  </div>
                </div>
              </div>
            </TiltCard>
          </div>

          <div className="w-full lg:w-1/2 flex flex-col items-start">
            <div className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-[#00f0ff] mb-3">
              <Sparkle size={14} />
              <span>The Architect Behind the Visuals</span>
            </div>
            <h2 className="font-display font-black text-4xl sm:text-5xl text-white tracking-tight mb-2">
              Meet the Creative Mind
            </h2>
            <div className="text-sm uppercase font-bold tracking-widest text-[#ff7a00] mb-6">
              {ASSETS.founder.name} — <span className="text-white/70">{ASSETS.founder.role}</span>
            </div>

            <div className="space-y-4 text-white/80 leading-relaxed text-sm sm:text-base mb-8">
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

            <div className="grid grid-cols-2 gap-4 w-full mb-8">
              <div className="p-4 rounded-2xl glass-panel border border-white/10">
                <span className="text-xs text-white/50 block">Design Philosophy</span>
                <span className="text-sm font-bold text-white mt-1 block">Bold & Impact-Driven</span>
              </div>
              <div className="p-4 rounded-2xl glass-panel border border-white/10">
                <span className="text-xs text-white/50 block">Core Standard</span>
                <span className="text-sm font-bold text-[#00f0ff] mt-1 block">Zero Visual Compromise</span>
              </div>
            </div>

            <button
              onClick={() => scrollToSection('contact')}
              className="px-8 py-3.5 rounded-full bg-white text-black font-bold text-xs uppercase tracking-wider hover:bg-[#00f0ff] transition-colors"
            >
              Collaborate with Goodness
            </button>
          </div>
        </div>
      </section>

      {/* SECTION 8: GLOBAL REACH */}
      <section className="relative z-20 py-24 sm:py-32 bg-[#040508] border-t border-white/10 overflow-hidden">
        <div className="max-w-7xl mx-auto px-6 sm:px-8">
          <div className="text-center max-w-2xl mx-auto mb-12">
            <div className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-[#00f0ff] mb-3">
              <Globe2 size={14} />
              <span>Worldwide Footprint</span>
            </div>
            <h2 className="font-display font-black text-4xl sm:text-5xl md:text-6xl text-white tracking-tight mb-4">
              Global Reach
            </h2>
            <p className="text-white/70 text-sm sm:text-base leading-relaxed">
              “Our creative reach spans across multiple countries and international collaborations.”
            </p>
          </div>

          <div className="my-8">
            <GlobalReach3DGlobe
              activeCountry={activeGlobeCountry}
              onSelectCountry={setActiveGlobeCountry}
            />
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mt-8">
            {ASSETS.countries.map((country) => {
              const isSelected = activeGlobeCountry === country.name;
              return (
                <div
                  key={country.name}
                  onClick={() => setActiveGlobeCountry(country.name)}
                  className={`p-5 rounded-2xl transition-all duration-300 cursor-pointer text-center ${
                    isSelected
                      ? 'bg-white/10 border border-[#00f0ff] shadow-lg shadow-[#00f0ff]/20'
                      : 'glass-panel border border-white/10 hover:border-white/20'
                  }`}
                >
                  <span className="text-3xl block mb-2">{country.flag}</span>
                  <h4 className="font-display font-bold text-lg text-white">{country.name}</h4>
                  <span className="text-[11px] text-white/50 block mt-1">{country.role}</span>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* SECTION 9: CONTACT & CTA */}
      <section id="contact" className="relative z-20 py-24 sm:py-36 px-6 sm:px-8 max-w-7xl mx-auto">
        <div className="relative rounded-[40px] glass-panel border border-white/20 p-8 sm:p-14 lg:p-20 overflow-hidden text-center shadow-2xl">
          <div className="absolute -top-24 -left-24 w-96 h-96 bg-[#00f0ff]/20 rounded-full blur-3xl pointer-events-none" />
          <div className="absolute -bottom-24 -right-24 w-96 h-96 bg-[#8a2be2]/20 rounded-full blur-3xl pointer-events-none" />

          <div className="relative z-10 max-w-3xl mx-auto flex flex-col items-center">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/5 border border-white/15 text-xs font-semibold uppercase tracking-widest text-[#00f0ff] mb-6">
              <MessageSquare size={13} />
              <span>Let's Talk Design</span>
            </div>

            <h2 className="font-display font-black text-4xl sm:text-6xl md:text-7xl text-white tracking-tight leading-[1.02] mb-6">
              Let’s Create Something{' '}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#00f0ff] via-white to-[#ff7a00]">
                Powerful
              </span>
            </h2>

            <p className="text-base sm:text-lg text-white/80 font-normal leading-relaxed mb-10 max-w-xl">
              “Want to learn Graphic Design or start a project? Message us today.”
            </p>

            <TiltCard className="mb-12">
              <button
                onClick={() => {
                  window.open(
                    'https://wa.me/?text=Hello%20DicksonGrafiks,%20I%20would%20like%20to%20start%20a%20creative%20project%20or%20inquire%20about%20graphic%20design.',
                    '_blank'
                  );
                }}
                className="px-10 py-5 rounded-full bg-gradient-to-r from-[#00f0ff] via-white to-[#00f0ff] text-black font-black text-base sm:text-lg uppercase tracking-wider shadow-2xl hover:shadow-[0_0_50px_rgba(0,240,255,0.7)] hover:scale-105 active:scale-95 transition-all duration-300 flex items-center gap-3 cursor-pointer"
              >
                <span>Start Now</span>
                <Send size={18} />
              </button>
            </TiltCard>

            {/* Social Links Bar */}
            <div className="w-full pt-10 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between gap-6">
              <span className="text-xs uppercase tracking-widest text-white/50 font-semibold">
                Connect Directly on Official Channels
              </span>

              <div className="flex items-center gap-4">
                {ASSETS.socials.map((social) => {
                  const Icon = social.icon;
                  return (
                    <a
                      key={social.name}
                      href={social.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="px-4 py-2.5 rounded-full bg-white/5 hover:bg-white/15 border border-white/10 hover:border-[#00f0ff]/50 text-white transition-all duration-300 hover:scale-105 flex items-center gap-2 text-xs font-semibold group"
                    >
                      <Icon size={14} className="text-[#00f0ff] group-hover:rotate-12 transition-transform" />
                      <span>{social.name}</span>
                    </a>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="relative z-20 py-10 border-t border-white/10 bg-[#040508]">
        <div className="max-w-7xl mx-auto px-6 sm:px-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-white/60">
          <div>
            © 2026 DicksonGrafiks — Visuals That Speaks | Goodness N. Dickson
          </div>
          <div className="flex items-center gap-6">
            <span className="hover:text-white transition-colors cursor-pointer" onClick={() => scrollToSection('hero')}>
              Back to Top
            </span>
            <span className="text-white/30">•</span>
            <span className="text-[#00f0ff]">Crafted for Global Impact</span>
          </div>
        </div>
      </footer>

      {/* MODALS */}
      <VideoModal video={selectedVideo} onClose={() => setSelectedVideo(null)} />
      <ImageModal item={selectedImage} onClose={() => setSelectedImage(null)} />
    </div>
  );
}