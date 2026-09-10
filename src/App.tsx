import React, { useState, useEffect, useRef, useMemo } from 'react';
import {
  Sparkles, Play, ArrowUpRight, ChevronRight, ExternalLink, Layers, Palette,
  Video, Aperture, Globe2, Send, CheckCircle2, Compass, Monitor, Eye,
  Film, Award, Sparkle, Linkedin, Twitter, Facebook, Menu, X, MessageSquare, ChevronDown
} from 'lucide-react';

const ASSETS = {
  projects: [
    { id: 'proj-1', title: 'Business Flyer Design', category: 'Brand Identity Project', description: 'Clean and bold identity systems designed to build strong visual recognition.', image: 'https://dicksongrafiks-nigeria.netlify.app/images/Premium%20Nail%20Flyer-01.png', tag: 'Vector & Print', accent: '#ff7a00' },
    { id: 'proj-2', title: 'Marketing Flyer Design', category: 'Marketing Design', description: 'High-performing visuals designed to grab attention instantly and increase engagement.', image: 'https://dicksongrafiks-nigeria.netlify.app/images/Plumbing%20Design.png', tag: 'Commercial', accent: '#00f0ff' },
    { id: 'proj-3', title: 'Celebration Visuals', category: 'Event & Motion Brand', description: 'Elegant, vibrant, and eye-catching designs tailored to make your special day stand out.', image: 'https://i.ibb.co/tpVV0NK5/Birthday-Flyer-Design-1.png', tag: 'Luxury Celebrations', accent: '#8a2be2' },
    { id: 'proj-4', title: 'Brand Identity Logo', category: 'Brand Logo Design', description: 'Clean, memorable, and impactful logos engineered to give your brand a professional edge.', image: 'https://i.ibb.co/tTtVLzjg/LOGO-065406.png', tag: 'Identity & Guidelines', accent: '#00f0ff' },
    { id: 'proj-5', title: 'Social Media Design', category: 'Fintech & Neobank', description: 'Clean, high-impact digital graphics engineered for modern apps and social conversion.', image: 'https://i.ibb.co/Kj95L4KV/Bilt-Neobank-Design-101802.png', tag: 'Digital Marketing', accent: '#00f0ff' },
    { id: 'proj-6', title: 'Wedding Card Design', category: 'Luxury Stationery', description: 'Refined aesthetics, premium typography, and timeless elegance for memorable celebrations.', image: 'https://i.ibb.co/nq8tvmXk/WEDDING.png', tag: 'Print & Invitation', accent: '#ff7a00' },
    { id: 'proj-7', title: 'Crypto Design', category: 'Web3 & Fintech', description: 'Cutting-edge digital visuals tailored for crypto platforms, token launches, and DeFi.', image: 'https://i.ibb.co/rfM9RB61/DESIGN-0-NE.png', tag: 'Web3 Branding', accent: '#8a2be2' },
    { id: 'proj-8', title: 'Church Flyer Design', category: 'Conference & Ministry', description: 'Majestic, faith-inspired visual layouts crafted with bold hierarchy and spiritual atmosphere.', image: 'https://i.ibb.co/39f7PyGW/EDIFICE-CHURCH-FLYER-DESIGN.png', tag: 'Ministry & Event', accent: '#00f0ff' }
  ],
  videos: [
    { id: 'vid-1', title: 'Promotional Video', tag: 'Commercial Production', youtubeUrl: 'https://youtu.be/H8VCSFxVce4', embedId: 'H8VCSFxVce4', thumbnail: 'https://img.youtube.com/vi/H8VCSFxVce4/maxresdefault.jpg', duration: '4K Ultra HD' },
    { id: 'vid-2', title: 'Motion Graphics Edit', tag: 'Kinetic Typography', youtubeUrl: 'https://youtu.be/5eS61a1UlV0', embedId: '5eS61a1UlV0', thumbnail: 'https://img.youtube.com/vi/5eS61a1UlV0/maxresdefault.jpg', duration: '60 FPS Motion' },
    { id: 'vid-3', title: 'Short Form Edit', tag: 'Viral Storytelling', youtubeUrl: 'https://youtube.com/shorts/r-bnK_Sw5VY', embedId: 'r-bnK_Sw5VY', thumbnail: 'https://img.youtube.com/vi/r-bnK_Sw5VY/maxresdefault.jpg', duration: 'Vertical Format' },
    { id: 'vid-4', title: 'Social Media Reel', tag: 'High Retention', youtubeUrl: 'https://youtube.com/shorts/XZSpHhO7jI4', embedId: 'XZSpHhO7jI4', thumbnail: 'https://img.youtube.com/vi/XZSpHhO7jI4/maxresdefault.jpg', duration: 'Creative Pacing' }
  ],
  photoEdits: [
    { id: 'pe-1', title: 'High-End Beauty Retouch', image: 'https://i.ibb.co/KcQQwfSr/Air-Brush-20260607110024.jpg', description: 'Micro-dodge and burn with natural skin texture preservation and gentle tone balancing.', category: 'Skin Texture & Tone', filterGroup: 'Beauty & Skin' },
    { id: 'pe-2', title: 'Studio Portrait Grade', image: 'https://i.ibb.co/35VpTzMd/Air-Brush-20260608164935.jpg', description: 'Sculpted lighting contrast, eye catchlight definition, and refined studio depth grading.', category: 'Studio Lighting', filterGroup: 'Studio & Editorial' },
    { id: 'pe-3', title: 'Editorial Glamour Polish', image: 'https://i.ibb.co/5ptGXtG/Air-Brush-20260610101429.jpg', description: 'High-fashion skin smoothing, chromatic clarity, and rich velvet shadow balance.', category: 'Fashion Editorial', filterGroup: 'Studio & Editorial' },
    { id: 'pe-4', title: 'Cinematic Warm Tone', image: 'https://i.ibb.co/ynVWKXz0/Air-Brush-20260610105048.jpg', description: 'Golden-hour ambient glow enhancement with soft depth-of-field separation.', category: 'Atmospheric Lighting', filterGroup: 'Color & Lighting' },
    { id: 'pe-5', title: 'Frequency Separation', image: 'https://i.ibb.co/GQH0ZKgn/Air-Brush-20260616184843.jpg', description: 'Flawless blemish eradication while maintaining authentic pore detail and tone transitions.', category: 'Commercial Beauty', filterGroup: 'Beauty & Skin' },
    { id: 'pe-6', title: 'Creative Tone Sculpting', image: 'https://i.ibb.co/wZDgnjZb/Air-Brush-20260627222013.jpg', description: 'Vibrant and nuanced color curves designed to give portraiture striking magazine vibrancy.', category: 'Creative Color Grade', filterGroup: 'Color & Lighting' },
    { id: 'pe-7', title: 'Radiant Melanin Harmony', image: 'https://i.ibb.co/S8xfJ8N/Air-Brush-20260711114909.jpg', description: 'Warm, luminous undertone enhancement celebrating natural radiant complexion.', category: 'Complexion Grading', filterGroup: 'Beauty & Skin' },
    { id: 'pe-8', title: 'Editorial Contrast & Edge', image: 'https://i.ibb.co/HLzyv1rn/Air-Brush-20260714192848.jpg', description: 'Crisp micro-contrast, specular highlight recovery, and dramatic studio backdrop blend.', category: 'Editorial Styling', filterGroup: 'Studio & Editorial' },
    { id: 'pe-9', title: 'Velvet Soft Retouching', image: 'https://i.ibb.co/V0MpPYRP/Air-Brush-20260728150341.jpg', description: 'Subtle airbrush blending with contour reinforcement and soft-focus highlights.', category: 'Portraiture Precision', filterGroup: 'Beauty & Skin' },
    { id: 'pe-10', title: 'Natural Glow Restoration', image: 'https://i.ibb.co/9H9QX1S9/Air-Brush-20260730173130.jpg', description: 'Gentle luminescence balancing that keeps portraits looking completely effortless and authentic.', category: 'Natural Retouch', filterGroup: 'Beauty & Skin' },
    { id: 'pe-11', title: 'Modern Headshot Polish', image: 'https://i.ibb.co/ZpPz9fxp/Air-Brush-20260804223529.jpg', description: 'Professional clarity, attire sharpening, and clean background depth separation.', category: 'Executive Portrait', filterGroup: 'Studio & Editorial' },
    { id: 'pe-12', title: 'Luminous Highlight Sculpt', image: 'https://i.ibb.co/bjcq8hkY/Air-Brush-20260811110840.jpg', description: 'Dimensional cheekbone and nose bridge highlighting with seamless gradient blending.', category: 'Glamour Retouch', filterGroup: 'Beauty & Skin' },
    { id: 'pe-13', title: 'Ultra-Detail Eyes & Lips', image: 'https://i.ibb.co/W4ZHf5Z9/Air-Brush-20260815113142.jpg', description: 'Intense ocular clarity, iris brightening, and natural lip moisture enhancement.', category: 'Close-up Editorial', filterGroup: 'Studio & Editorial' },
    { id: 'pe-14', title: 'Vibrant Color Correction', image: 'https://i.ibb.co/MxCtJPMx/Air-Brush-20260818114938.jpg', description: 'Balancing color cast distortions and enriching midtones for a vivid, lifelike palette.', category: 'Cinematic Grade', filterGroup: 'Color & Lighting' },
    { id: 'pe-15', title: 'High-Fashion Mood Grade', image: 'https://i.ibb.co/hFrg92sf/Air-Brush-20260818115132.jpg', description: 'Sultry contrast curves, deep shadows, and luminous skin highlights for moody editorial work.', category: 'High Fashion', filterGroup: 'Studio & Editorial' },
    { id: 'pe-16', title: 'Masterclass Portrait Finish', image: 'https://i.ibb.co/NbqHQRP/Air-Brush-20260904104615.jpg', description: 'Comprehensive end-to-end retouching combining frequency separation and color harmonization.', category: 'Master Retouch', filterGroup: 'Beauty & Skin' }
  ],
  founder: {
    name: 'Goodness N. Dickson',
    role: 'Founder & Lead Designer',
    image: 'https://i.ibb.co/fz40jbTB/366042.jpg',
    bio: 'With a profound passion for visual storytelling, Goodness founded DicksonGrafiks to bridge the gap between brilliant ideas and impactful designs. Every project is approached with a commitment to excellence, ensuring that brands not only look premium but also communicate their message powerfully.\n\nWhether it is crafting a cohesive brand identity from scratch or engineering high-converting marketing visuals, Goodness brings years of expertise, a keen eye for aesthetic detail, and a relentless drive to help clients stand out in competitive digital landscapes.'
  },
  countries: [
    { name: 'Nigeria', flag: '🇳🇬', code: 'NG', lat: 9.082, lon: 8.6753, role: 'Primary Studio & HQ' },
    { name: 'Ghana', flag: '🇬🇭', code: 'GH', lat: 7.9465, lon: -1.0232, role: 'Creative Collaborations' },
    { name: 'United Kingdom', flag: '🇬🇧', code: 'GB', lat: 55.3781, lon: -3.436, role: 'International Clients' },
    { name: 'Malawi', flag: '🇲🇼', code: 'MW', lat: -13.2543, lon: 34.3015, role: 'Design Partnerships' }
  ]
};

// Full interactive App component code export
export default function App() {
  const [selectedImage, setSelectedImage] = useState(null);
  const [selectedVideo, setSelectedVideo] = useState(null);
  const [photoFilter, setPhotoFilter] = useState('All');

  const filteredEdits = useMemo(() => {
    if (photoFilter === 'All') return ASSETS.photoEdits;
    return ASSETS.photoEdits.filter(p => p.filterGroup === photoFilter);
  }, [photoFilter]);

  return (
    <div className='min-h-screen bg-[#06070a] text-white selection:bg-[#00f0ff] selection:text-black font-sans'>
      <header className='fixed top-0 inset-x-0 z-50 p-4'>
        <nav className='max-w-7xl mx-auto flex items-center justify-between px-6 py-3.5 rounded-full glass-panel border border-white/10'>
          <div className='font-display font-black text-xl text-white'>DicksonGrafiks</div>
          <div className='hidden md:flex items-center gap-8 text-sm text-white/70'>
            <a href='#work' className='hover:text-white transition'>Work</a>
            <a href='#motion' className='hover:text-white transition'>Motion</a>
            <a href='#edits' className='hover:text-white transition'>Edits</a>
            <a href='#about' className='hover:text-white transition'>About</a>
          </div>
          <a href='https://wa.me/?text=Hello%20DicksonGrafiks' target='_blank' className='px-5 py-2 rounded-full bg-[#00f0ff] text-black font-bold text-xs uppercase tracking-wider'>
            Start Project
          </a>
        </nav>
      </header>

      <section className='pt-36 pb-20 px-6 max-w-5xl mx-auto text-center flex flex-col items-center'>
        <div className='px-4 py-1.5 rounded-full bg-white/5 border border-white/15 text-xs text-[#00f0ff] font-bold uppercase tracking-widest mb-6'>
          Premium Visual Design
        </div>
        <h1 className='font-display font-black text-5xl md:text-8xl tracking-tight leading-none mb-6'>
          VISUALS THAT <span className='text-[#00f0ff]'>SPEAKS</span>
        </h1>
        <p className='max-w-2xl text-white/80 text-base md:text-xl leading-relaxed mb-10'>
          Bold visuals, premium edits and modern creative solutions for brands, businesses and individuals looking to make a lasting impact.
        </p>
        <div className='flex gap-4'>
          <a href='https://wa.me/?text=Hello%20DicksonGrafiks' target='_blank' className='px-8 py-4 rounded-full bg-[#00f0ff] text-black font-extrabold text-sm uppercase tracking-wider shadow-lg hover:scale-105 transition'>
            Start a Project
          </a>
          <a href='#work' className='px-8 py-4 rounded-full glass-panel hover:bg-white/10 text-white font-semibold text-sm transition'>
            Explore Work
          </a>
        </div>
      </section>

      {/* Selected Work Grid */}
      <section id='work' className='py-20 px-6 max-w-7xl mx-auto'>
        <h2 className='font-display font-black text-4xl text-white mb-10'>Selected Work</h2>
        <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6'>
          {ASSETS.projects.map((p) => (
            <div key={p.id} onClick={() => setSelectedImage(p)} className='cursor-pointer rounded-3xl glass-panel border border-white/10 overflow-hidden hover:border-[#00f0ff]/40 transition group'>
              <img src={p.image} alt={p.title} className='w-full aspect-[4/5] object-cover group-hover:scale-105 transition duration-500' />
              <div className='p-5'>
                <span className='text-[10px] text-[#00f0ff] font-bold uppercase'>{p.category}</span>
                <h3 className='font-bold text-lg text-white mt-1'>{p.title}</h3>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Motion & Video Edits */}
      <section id='motion' className='py-20 px-6 bg-[#040508] border-t border-white/10'>
        <div className='max-w-7xl mx-auto'>
          <h2 className='font-display font-black text-4xl text-white mb-10'>Motion & Video Edits</h2>
          <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6'>
            {ASSETS.videos.map((v) => (
              <div key={v.id} onClick={() => setSelectedVideo(v)} className='cursor-pointer rounded-3xl glass-panel border border-white/10 overflow-hidden group'>
                <div className='relative aspect-video'>
                  <img src={v.thumbnail} alt={v.title} className='w-full h-full object-cover' />
                  <div className='absolute inset-0 bg-black/40 flex items-center justify-center group-hover:bg-black/20 transition'>
                    <Play className='w-12 h-12 text-white fill-white' />
                  </div>
                </div>
                <div className='p-5'>
                  <span className='text-[10px] text-[#00f0ff] font-bold uppercase'>{v.tag}</span>
                  <h3 className='font-bold text-lg text-white mt-1'>{v.title}</h3>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 16 Photo Edits Showcase */}
      <section id='edits' className='py-20 px-6 max-w-7xl mx-auto'>
        <div className='flex flex-col md:flex-row md:items-end justify-between mb-8 gap-4'>
          <h2 className='font-display font-black text-4xl text-white'>Photo Edit Gallery</h2>
          <div className='flex flex-wrap gap-2'>
            {['All', 'Beauty & Skin', 'Studio & Editorial', 'Color & Lighting'].map((cat) => (
              <button key={cat} onClick={() => setPhotoFilter(cat)} className={'px-4 py-1.5 rounded-full text-xs font-semibold ' + (photoFilter === cat ? 'bg-[#00f0ff] text-black font-bold' : 'glass-panel text-white/70 hover:text-white')}>
                {cat}
              </button>
            ))}
          </div>
        </div>
        <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6'>
          {filteredEdits.map((item) => (
            <div key={item.id} onClick={() => setSelectedImage(item)} className='cursor-pointer rounded-3xl glass-panel border border-white/10 overflow-hidden hover:border-[#00f0ff]/40 transition group'>
              <img src={item.image} alt={item.title} className='w-full aspect-[4/5] object-cover group-hover:scale-105 transition duration-500' />
              <div className='p-5'>
                <span className='text-[10px] text-[#00f0ff] font-bold uppercase'>{item.category}</span>
                <h3 className='font-bold text-lg text-white mt-1'>{item.title}</h3>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Meet the Founder */}
      <section id='about' className='py-20 px-6 max-w-7xl mx-auto border-t border-white/10 flex flex-col md:flex-row items-center gap-12'>
        <div className='w-full md:w-1/2 flex justify-center'>
          <div className='w-full max-w-sm rounded-3xl overflow-hidden glass-panel border border-white/20 p-2'>
            <img src={ASSETS.founder.image} alt={ASSETS.founder.name} className='w-full rounded-2xl aspect-[4/5] object-cover' />
          </div>
        </div>
        <div className='w-full md:w-1/2'>
          <span className='text-xs font-bold uppercase text-[#00f0ff] tracking-widest'>The Creative Director</span>
          <h2 className='font-display font-black text-4xl text-white mt-2 mb-4'>{ASSETS.founder.name}</h2>
          <p className='text-white/80 leading-relaxed text-sm md:text-base whitespace-pre-line mb-8'>{ASSETS.founder.bio}</p>
          <a href='https://wa.me/?text=Hello%20Goodness' target='_blank' className='px-8 py-3.5 rounded-full bg-white text-black font-bold text-xs uppercase tracking-wider hover:bg-[#00f0ff] transition'>
            Collaborate with Goodness
          </a>
        </div>
      </section>

      <footer className='py-10 border-t border-white/10 text-center text-xs text-white/50'>
        © 2026 DicksonGrafiks — Visuals That Speaks | Goodness N. Dickson
      </footer>
    </div>
  );
}