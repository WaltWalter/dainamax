import { useState, useRef, ChangeEvent, FormEvent, DragEvent } from 'react';
import { 
  BookOpen, 
  Gift, 
  Menu, 
  X, 
  ArrowRight, 
  Heart, 
  Layers, 
  Eye, 
  Compass, 
  Sliders,
  Check,
  Upload,
  Trash2,
  Sparkles
} from 'lucide-react';

import coverImg from './assets/images/notebook_cover_1781435812496.jpg';
import openImg from './assets/images/notebook_open_1781435825893.jpg';
import lifestyleImg from './assets/images/notebook_lifestyle_1781435839847.jpg';
import dainamaxLogo from './assets/images/Dainamax_full_logo.svg';
import bannersImg from './assets/images/banners.png';
import mockup01Img from './assets/images/mockup_01.png';
import mockup02Img from './assets/images/mockup_02.png';
import mockup03Img from './assets/images/mockup_03.png';
import infoImg from './assets/images/info.png';

export default function App() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [formSubmitted, setFormSubmitted] = useState(false);
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });

  // Custom design and interactive mockup upload states with file validation
  const [uploadedDesign, setUploadedDesign] = useState<string | null>(null);
  const [uploadError, setUploadError] = useState<string | null>(null);
  const [isDragging, setIsDragging] = useState(false);
  const [isZoomed, setIsZoomed] = useState(false);
  const [ctaCoverText, setCtaCoverText] = useState('SPEKTRS');

  // Advanced Mockup Mapping Settings (Perspective Coordinates)
  const [selectedMockup, setSelectedMockup] = useState<'mockup1' | 'mockup2' | 'mockup3'>('mockup1');
  const [posX, setPosX] = useState<number>(29.7);
  const [posY, setPosY] = useState<number>(25.3);
  const [overlayW, setOverlayW] = useState<number>(48.9);
  const [rotAngle, setRotAngle] = useState<number>(0.0);

  const mapPresets = {
    mockup1: { x: 29.7, y: 25.3, w: 48.9, rot: 0.0 },
    mockup2: { x: 29.7, y: 24.0, w: 48.4, rot: -2.0 },
    mockup3: { x: 31.0, y: 37.2, w: 43.7, rot: -23.5 }
  };

  const selectMockupAndSetCoords = (mockup: 'mockup1' | 'mockup2' | 'mockup3') => {
    setSelectedMockup(mockup);
    setPosX(mapPresets[mockup].x);
    setPosY(mapPresets[mockup].y);
    setOverlayW(mapPresets[mockup].w);
    setRotAngle(mapPresets[mockup].rot);
  };

  const fileInputRef = useRef<HTMLInputElement>(null);

  const validateAndLoadFile = (file: File) => {
    setUploadError(null);
    const fileType = file.type;
    const fileName = file.name.toLowerCase();
    const isValidFormat = fileType === 'image/jpeg' || fileType === 'image/png' || fileName.endsWith('.jpg') || fileName.endsWith('.jpeg') || fileName.endsWith('.png');
    
    if (!isValidFormat) {
      setUploadError('Kļūda: Atļauti tikai JPG vai PNG formāta attēli.');
      return;
    }

    const reader = new FileReader();
    reader.onload = (event) => {
      if (event.target?.result) {
        const img = new Image();
        img.onload = () => {
          const isExact = img.width === 1748 && img.height === 2480;
          const ratio = img.height / img.width;
          const isCorrectRatio = Math.abs(ratio - 1.4142) < 0.055 || Math.abs(ratio - 1.41) < 0.055;

          if (!isExact && !isCorrectRatio) {
            setUploadError(`Brīdinājums: Attēla izmērs (${img.width}x${img.height}px) neatbilst precīzam A5 izmēram (1748 x 2480 px) vai proporcijai 1:1.41.`);
          }
          setUploadedDesign(event.target?.result as string);
        };
        img.src = event.target.result as string;
      }
    };
    reader.readAsDataURL(file);
  };

  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      validateAndLoadFile(file);
    }
  };

  const handleDragOver = (e: DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = () => {
    setIsDragging(false);
  };

  const handleDrop = (e: DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    const file = e.dataTransfer.files?.[0];
    if (file) {
      validateAndLoadFile(file);
    }
  };

  const triggerFileInput = () => {
    fileInputRef.current?.click();
  };

  const clearUploadedDesign = () => {
    setUploadedDesign(null);
    setUploadError(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  const handleInputChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (formData.name && formData.email) {
      setFormSubmitted(true);
      setTimeout(() => {
        setFormSubmitted(false);
        setFormData({ name: '', email: '', message: '' });
      }, 5000);
    }
  };

  return (
    <div className="min-h-screen bg-[#FAF9F8] text-[#0A0A0A] font-sans antialiased selection:bg-[#F5E4E2] selection:text-[#0A0A0A]">
      
      {/* Premium Sticky Header */}
      <header id="header" className="sticky top-0 z-50 bg-[#FAF9F8]/90 backdrop-blur-md border-b border-[#E2D3CA]/30 shadow-sm">
        <div className="max-w-[1200px] mx-auto px-6 h-20 flex items-center justify-between">
          
          {/* Logo */}
          <a href="#" className="flex items-center group h-12 w-48 relative">
            <img 
              src={dainamaxLogo} 
              alt="DAINAMAX" 
              className="h-full w-full object-contain object-left transition-transform duration-300 group-hover:scale-[1.02]" 
            />
          </a>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center space-x-10">
            <a href="#hero" className="text-xs font-semibold tracking-wider text-[#6B6B6B] hover:text-[#0A0A0A] transition-colors duration-300 uppercase">Sākums</a>
            <a href="#highlights" className="text-xs font-semibold tracking-wider text-[#6B6B6B] hover:text-[#0A0A0A] transition-colors duration-300 uppercase">Kāpēc mēs</a>
            <a href="#mockup" className="text-xs font-semibold tracking-wider text-[#6B6B6B] hover:text-[#0A0A0A] transition-colors duration-300 uppercase">Makets</a>
            <a href="#testimonials" className="text-xs font-semibold tracking-wider text-[#6B6B6B] hover:text-[#0A0A0A] transition-colors duration-300 uppercase">Atsauksmes</a>
          </nav>

          {/* Header CTA */}
          <div className="hidden lg:block">
            <a 
              href="https://dainamax.lv" 
              target="_blank"
              rel="noopener noreferrer"
              className="px-6 py-3 bg-[#D98286] hover:bg-[#C96F74] text-white btn-typography rounded-full tracking-[0.08em] transition-all duration-300"
              id="header_cta"
            >
              PASŪTĪT
            </a>
          </div>

          {/* Hamburgermenu mobile button */}
          <button 
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="lg:hidden p-2 text-[#0A0A0A] focus:outline-none"
            aria-label="Toggle menu"
            id="mobile_menu_toggle"
          >
            {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {/* Mobile Navigation Drawer with exactly 5 links */}
        {isMobileMenuOpen && (
          <div id="mobile_drawer" className="lg:hidden fixed inset-0 top-20 bg-[#FAF9F8] z-40 px-6 py-8 flex flex-col justify-between border-t border-[#F5E4E2]">
            <nav className="flex flex-col space-y-6">
              <a 
                href="#hero" 
                onClick={() => setIsMobileMenuOpen(false)}
                className="text-sm font-semibold tracking-wider text-[#6B6B6B] hover:text-[#0A0A0A] uppercase"
              >
                Sākums
              </a>
              <a 
                href="#highlights" 
                onClick={() => setIsMobileMenuOpen(false)}
                className="text-sm font-semibold tracking-wider text-[#6B6B6B] hover:text-[#0A0A0A] uppercase"
              >
                Kāpēc mēs
              </a>
              <a 
                href="#mockup" 
                onClick={() => setIsMobileMenuOpen(false)}
                className="text-sm font-semibold tracking-wider text-[#6B6B6B] hover:text-[#0A0A0A] uppercase"
              >
                Makets
              </a>
              <a 
                href="#testimonials" 
                onClick={() => setIsMobileMenuOpen(false)}
                className="text-sm font-semibold tracking-wider text-[#6B6B6B] hover:text-[#0A0A0A] uppercase"
              >
                Atsauksmes
              </a>
            </nav>

            <div className="pt-8 border-t border-[#F5E4E2]">
              <a 
                href="https://dainamax.lv" 
                target="_blank"
                rel="noopener noreferrer"
                className="w-full block py-4 bg-[#D98286] hover:bg-[#C96F74] text-white btn-typography rounded-full text-center tracking-[0.08em]"
                id="mobile_drawer_cta"
              >
                APSKATĪT VEIKALU
              </a>
            </div>
          </div>
        )}
      </header>

      {/* Hero Section - Banner image spans full width and height with content overlay */}
      <section id="hero" className="relative min-h-[550px] lg:min-h-[680px] border-b border-[#F5E4E2]/40 flex items-center overflow-hidden">
        
        {/* Background Image covering the entire section from left to right */}
        <div className="absolute inset-0 z-0">
          <img 
            src={bannersImg} 
            alt="Dainamax Premium Notebook Background Banner" 
            className="w-full h-full object-cover object-center"
            referrerPolicy="no-referrer"
          />
          {/* Split overlay for gorgeous contrast: ambient gradient masking restricted to the left side on wider screens, overall subtle tinting on mobile */}
          <div className="absolute inset-y-0 left-0 w-full md:w-[60%] lg:w-[50%] bg-gradient-to-r from-[#FAF9F8] via-[#FAF9F8]/95 to-transparent hidden md:block"></div>
          <div className="absolute inset-0 bg-[#FAF9F8]/90 md:hidden"></div>
        </div>

        {/* Hero Content Panel on top */}
        <div className="relative z-10 w-full max-w-[1200px] mx-auto px-6 sm:px-12 py-16 lg:py-24">
          <div className="max-w-[540px] flex flex-col space-y-8">
            <h1 className="text-h1 text-[#0A0A0A] leading-tight">
              Tavs dizains.<br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#0A0A0A] via-[#D98286] to-[#0A0A0A]">
                Tavs piezīmju stāsts.
              </span>
            </h1>
            <p className="text-body-lg text-[#6B6B6B] leading-relaxed">
              Radīts tiem, kuru rokās dzimst vizuālā pasaule. Personalizēta spirāles grāmatiņa ar premium punktotām lapām, radot ideālu un nesamākslotu telpu Tavām skicēm, zīmējumiem un plāniem.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 pt-4">
              <a 
                href="#mockup" 
                className="px-8 py-4 bg-[#D98286] hover:bg-[#C96F74] text-white btn-typography rounded-full tracking-[0.08em] transition-all duration-300 text-center hover:shadow-xl"
                id="hero_primary_cta"
              >
                RADI SAVU GRĀMATIŅU
              </a>
            </div>

            {/* Premium details indicator inline */}
            <div className="grid grid-cols-3 gap-4 pt-8 border-t border-[#F5E4E2] text-center sm:text-left">
              <div>
                <h4 className="font-montserrat font-bold text-[#0A0A0A] text-base">80g/m²</h4>
                <p className="text-[#6B6B6B] text-[11px] font-medium mt-1">Premium papīrs</p>
              </div>
              <div>
                <h4 className="font-montserrat font-bold text-[#0A0A0A] text-base">A5</h4>
                <p className="text-[#6B6B6B] text-[11px] font-medium mt-1">Ērts formāts</p>
              </div>
              <div>
                <h4 className="font-montserrat font-bold text-[#0A0A0A] text-base">Punktots režģis</h4>
                <p className="text-[#6B6B6B] text-[11px] font-medium mt-1">Izcils formāts</p>
              </div>
            </div>
          </div>
        </div>

      </section>

      {/* Highlights / Why Us Section (Gradient fill on ALL cards as requested) */}
      <section id="highlights" className="py-24 bg-white border-b border-[#F5E4E2]/25 relative">
        <div className="max-w-[1200px] mx-auto px-6">
          
          <div className="text-right max-w-2xl ml-auto mb-16 flex flex-col space-y-4 items-end">
            <h2 className="text-h2 text-[#0A0A0A] font-montserrat font-extrabold tracking-tight leading-tight">Kāpēc izvēlēties tieši šo?</h2>
            <p className="text-sm text-[#6B6B6B] max-w-xl leading-relaxed">
              Katrs elements ir rūpīgi pārdomāts un izstrādāts, lai sniegtu izcilu radošo brīvību un luksusa sajūtu katrā lapas šķautnē.
            </p>
            <div className="w-12 h-0.5 bg-[#D98286] mt-2"></div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8" id="highlights_wrapper">
            
            {/* Card 1 - Gradient style 135deg rose to blossom, background icon fitting height shifted 40% right */}
            <div className="bg-[linear-gradient(135deg,#D98286_0%,#F5E4E2_100%)] p-8 rounded-[11px] shadow-sm hover:shadow-xl transition-all duration-300 hover:-translate-y-1 text-left flex flex-col justify-between min-h-[220px] border border-[#E2D3CA]/20 relative overflow-hidden group">
              <div className="relative z-10 max-w-[85%] pr-2">
                <h3 className="text-h3 text-lg font-bold mb-3 text-[#0A0A0A]">Personalizēts dizains</h3>
                <p className="text-xs text-[#0A0A0A]/85 leading-relaxed font-medium">
                  Uzraksti savu vārdu, uzvārdu vai unikālu illustrāciju vai logo. Piezīmju grāmatiņa, kas stāsta par Tavu personību.
                </p>
              </div>
              <Sliders className="absolute right-0 translate-x-[40%] top-0 h-full w-auto text-[#FAF9F8] opacity-30 pointer-events-none stroke-[1.5]" />
            </div>

            {/* Card 2 - Gradient style 135deg rose to blossom, background icon fitting height shifted 40% right */}
            <div className="bg-[linear-gradient(135deg,#D98286_0%,#F5E4E2_100%)] p-8 rounded-[11px] shadow-sm hover:shadow-xl transition-all duration-300 hover:-translate-y-1 text-left flex flex-col justify-between min-h-[220px] border border-[#E2D3CA]/20 relative overflow-hidden group">
              <div className="relative z-10 max-w-[85%] pr-2">
                <h3 className="text-h3 text-lg font-bold mb-3 text-[#0A0A0A]">Punktotas lapas</h3>
                <p className="text-xs text-[#0A0A0A]/85 leading-relaxed font-medium">
                  Māksliniekiem ideāls 5mm pelēkais punktu režģis nodrošina izcilu proporciju asumu bez līnijas uzbāzības un ierobežojumiem.
                </p>
              </div>
              <BookOpen className="absolute right-0 translate-x-[40%] top-0 h-full w-auto text-[#FAF9F8] opacity-30 pointer-events-none stroke-[1.5]" />
            </div>

            {/* Card 3 - Gradient style 135deg rose to blossom, background icon fitting height shifted 40% right */}
            <div className="bg-[linear-gradient(135deg,#D98286_0%,#F5E4E2_100%)] p-8 rounded-[11px] shadow-sm hover:shadow-xl transition-all duration-300 hover:-translate-y-1 text-left flex flex-col justify-between min-h-[220px] border border-[#E2D3CA]/20 relative overflow-hidden group">
              <div className="relative z-10 max-w-[85%] pr-2">
                <h3 className="text-h3 text-lg font-bold mb-3 text-[#0A0A0A]">Premium papīrs</h3>
                <p className="text-xs text-[#0A0A0A]/85 leading-relaxed font-medium">
                  80g/m² biezs, izcilas kvalitātes gluds papīrs. Nodrošina maigu rakstīšanas virsmu un maksimāli novērš tintes caursūkšanos.
                </p>
              </div>
              <Sliders className="absolute right-0 translate-x-[40%] top-0 h-full w-auto text-[#FAF9F8] opacity-30 pointer-events-none stroke-[1.5]" />
            </div>

            {/* Card 4 - Gradient style 135deg rose to blossom, background icon fitting height shifted 40% right */}
            <div className="bg-[linear-gradient(135deg,#D98286_0%,#F5E4E2_100%)] p-8 rounded-[11px] shadow-sm hover:shadow-xl transition-all duration-300 hover:-translate-y-1 text-left flex flex-col justify-between min-h-[220px] border border-[#E2D3CA]/20 relative overflow-hidden group">
              <div className="relative z-10 max-w-[85%] pr-2">
                <h3 className="text-h3 text-lg font-bold mb-3 text-[#0A0A0A]">Ideāla dāvana</h3>
                <p className="text-xs text-[#0A0A0A]/85 leading-relaxed font-medium">
                  Iesaiņota smalkā zīdpapīrā un minimālistiskā paku kastītē. Gatava iedvesmot katru zīmētāju, dizaineru vai dzejnieku.
                </p>
              </div>
              <Gift className="absolute right-0 translate-x-[40%] top-0 h-full w-auto text-[#FAF9F8] opacity-30 pointer-events-none stroke-[1.5]" />
            </div>

          </div>
        </div>
      </section>

      {/* Interactive Mockup View Section */}
      <section id="mockup" className="py-24 bg-[#FAF9F8] border-b border-[#F5E4E2]/25 relative overflow-hidden">
        
        {/* Abstract background ambient aura elements */}
        <div className="absolute right-[-100px] top-[20%] w-[350px] h-[350px] rounded-full bg-[#D98286]/3 blur-3xl pointer-events-none"></div>
        <div className="absolute left-[-150px] bottom-[10%] w-[450px] h-[450px] rounded-full bg-[#E2D3CA]/15 blur-3xl pointer-events-none"></div>

        <div className="max-w-[1200px] mx-auto px-6 relative">
          
          <div className="text-center max-w-2xl mx-auto mb-16 flex flex-col space-y-4">
            <h2 className="text-h2 text-[#0A0A0A]">Makets</h2>
            <p className="text-body text-[#6B6B6B]">Augšupielādē savu A5 dizainu un aplūko to fotoreālistiskā spirāles piezīmju grāmatiņas maketa trīs dažādās dabīgās vidēs.</p>
            <div className="w-12 h-0.5 bg-[#D98286] mx-auto mt-2"></div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-stretch" id="mockup_workspace">
            
            {/* Left Column: Compact Action Panel (Packed to fit within the right preview height) */}
            <div className="lg:col-span-5 flex flex-col justify-between space-y-4">
              
              {/* Box 1: Compact Design Uploader */}
              <div className="p-4 bg-white border border-[#E2D3CA]/40 rounded-[12px] shadow-sm flex flex-col space-y-3">
                <div className="flex items-center justify-between">
                  <h3 className="font-montserrat font-bold text-[11px] tracking-wider uppercase text-[#0A0A0A] flex items-center gap-1.5">
                    1. Augšupielādē vāka dizainu (A5)
                  </h3>
                  {uploadedDesign && (
                    <button 
                      type="button" 
                      onClick={clearUploadedDesign}
                      className="text-[10px] font-bold text-red-500 hover:text-red-700 transition-colors uppercase tracking-wider flex items-center gap-1"
                    >
                      <Trash2 size={11} /> Dzēst
                    </button>
                  )}
                </div>

                <div 
                  className={`border rounded-[8px] p-3 text-center transition-all duration-300 flex items-center justify-center cursor-pointer ${
                    isDragging 
                      ? 'border-[#D98286] bg-[#D98286]/5' 
                      : 'border-[#E2D3CA]/50 hover:border-[#D98286] bg-[#FAF9F8]/50'
                  }`}
                  onDragOver={handleDragOver}
                  onDragLeave={handleDragLeave}
                  onDrop={handleDrop}
                  onClick={triggerFileInput}
                  style={{ minHeight: '64px' }}
                  id="design_uploader"
                >
                  <input 
                    type="file" 
                    ref={fileInputRef} 
                    onChange={handleFileChange} 
                    accept="image/png, image/jpeg, image/jpg" 
                    className="hidden" 
                  />
                  
                  {uploadedDesign ? (
                    <div className="flex items-center justify-between w-full px-2">
                      <div className="flex items-center space-x-2.5 overflow-hidden">
                        <div className="w-8 h-10 rounded overflow-hidden border border-stone-200 bg-stone-100 shrink-0 flex-shrink-0">
                          <img src={uploadedDesign} alt="Design preview" className="w-full h-full object-cover" />
                        </div>
                        <div className="text-left overflow-hidden">
                          <p className="text-[11px] font-bold text-[#0A0A0A] truncate max-w-[140px]">Mans_Dizains.png</p>
                          <p className="text-[9px] text-green-650 font-bold flex items-center gap-0.5 mt-0.5">
                            <Check size={10} className="stroke-[3]" /> Sagatavots
                          </p>
                        </div>
                      </div>
                      <span className="text-[10px] text-stone-400 font-semibold uppercase tracking-wider text-right shrink-0">Mainīt</span>
                    </div>
                  ) : (
                    <div className="flex items-center space-x-3 w-full justify-center">
                      <Upload size={15} className="text-[#D98286] shrink-0" />
                      <div className="text-left">
                        <p className="text-[11px] font-bold text-[#0A0A0A] uppercase tracking-wide">Pievieno JPG vai PNG</p>
                        <p className="text-[9px] text-[#6B6B6B] font-medium leading-none mt-1">Sagatavo A5 izmērā: 1748 x 2480 px</p>
                      </div>
                    </div>
                  )}
                </div>

                {uploadError && (
                  <div className="p-2.5 bg-red-50 text-red-650 text-[10px] font-semibold rounded-lg border border-red-100 text-left">
                    {uploadError}
                  </div>
                )}
              </div>

              {/* Box 2: Packed/Compact Thumbnails selector inside the left column */}
              <div className="p-4 bg-white border border-[#E2D3CA]/40 rounded-[12px] shadow-sm space-y-2.5">
                <span className="text-[11px] font-montserrat font-bold text-[#0A0A0A] uppercase tracking-wider flex items-center gap-1">
                  <span>2.</span> Izvēlies mockup šablonu
                </span>
                <div className="grid grid-cols-3 gap-3" id="mockup_selector_thumbnails">
                  
                  {/* Thumbnail 1: mockup_01.png */}
                  <button 
                    type="button"
                    onClick={() => selectMockupAndSetCoords('mockup1')}
                    className={`aspect-square rounded-[10px] border-2 overflow-hidden transition-all duration-300 relative group flex-shrink-0 bg-[#FAF9F8] ${
                      selectedMockup === 'mockup1' 
                        ? 'border-[#D98286] shadow-md ring-4 ring-[#D98286]/10 scale-[1.02]' 
                        : 'border-[#E2D3CA]/30 hover:border-[#D98286]/50 shadow-sm'
                    }`}
                  >
                    <img src={mockup01Img} alt="Mākslas Terrazzo" className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105" />
                    <div className="absolute bottom-0 inset-x-0 bg-stone-900/75 p-1 text-center pointer-events-none">
                      <p className="text-[8px] font-bold text-white uppercase tracking-wider truncate">Terrazzo</p>
                    </div>
                    {selectedMockup === 'mockup1' && (
                      <div className="absolute top-1 right-1 bg-[#D98286] text-white p-0.5 rounded-full shadow z-1">
                        <Check size={8} className="stroke-[3]" />
                      </div>
                    )}
                  </button>

                  {/* Thumbnail 2: mockup_02.png */}
                  <button 
                    type="button"
                    onClick={() => selectMockupAndSetCoords('mockup2')}
                    className={`aspect-square rounded-[10px] border-2 overflow-hidden transition-all duration-300 relative group flex-shrink-0 bg-[#FAF9F8] ${
                      selectedMockup === 'mockup2' 
                        ? 'border-[#D98286] shadow-md ring-4 ring-[#D98286]/10 scale-[1.02]' 
                        : 'border-[#E2D3CA]/30 hover:border-[#D98286]/50 shadow-sm'
                    }`}
                  >
                    <img src={mockup02Img} alt="Dizaina Ateljē" className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105" />
                    <div className="absolute bottom-0 inset-x-0 bg-stone-900/75 p-1 text-center pointer-events-none">
                      <p className="text-[8px] font-bold text-white uppercase tracking-wider truncate">Ozola galds</p>
                    </div>
                    {selectedMockup === 'mockup2' && (
                      <div className="absolute top-1 right-1 bg-[#D98286] text-white p-0.5 rounded-full shadow z-1">
                        <Check size={8} className="stroke-[3]" />
                      </div>
                    )}
                  </button>

                  {/* Thumbnail 3: mockup_03.png */}
                  <button 
                    type="button"
                    onClick={() => selectMockupAndSetCoords('mockup3')}
                    className={`aspect-square rounded-[10px] border-2 overflow-hidden transition-all duration-300 relative group flex-shrink-0 bg-[#FAF9F8] ${
                      selectedMockup === 'mockup3' 
                        ? 'border-[#D98286] shadow-md ring-4 ring-[#D98286]/10 scale-[1.02]' 
                        : 'border-[#E2D3CA]/30 hover:border-[#D98286]/50 shadow-sm'
                    }`}
                  >
                    <img src={mockup03Img} alt="Lina Rīts" className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105" />
                    <div className="absolute bottom-0 inset-x-0 bg-stone-900/75 p-1 text-center pointer-events-none">
                      <p className="text-[8px] font-bold text-white uppercase tracking-wider truncate">Lina audums</p>
                    </div>
                    {selectedMockup === 'mockup3' && (
                      <div className="absolute top-1 right-1 bg-[#D98286] text-white p-0.5 rounded-full shadow z-1">
                        <Check size={8} className="stroke-[3]" />
                      </div>
                    )}
                  </button>
                </div>
              </div>

              {/* Box 3: Compact Calibration Sliders */}
              <div className="p-4 bg-white border border-[#E2D3CA]/40 rounded-[12px] shadow-sm space-y-3">
                <div className="flex items-center justify-between">
                  <h3 className="font-montserrat font-bold text-[11px] tracking-wider uppercase text-[#0A0A0A] flex items-center gap-1">
                    3. Kalibrēt novietojumu
                  </h3>
                  <button
                    type="button"
                    onClick={() => {
                      const currentPreset = mapPresets[selectedMockup];
                      setPosX(currentPreset.x);
                      setPosY(currentPreset.y);
                      setOverlayW(currentPreset.w);
                      setRotAngle(currentPreset.rot);
                    }}
                    className="text-[10px] font-bold text-[#D98286] hover:text-[#C96F74] transition-colors uppercase tracking-wider"
                  >
                    Atiestatīt
                  </button>
                </div>

                <div className="grid grid-cols-2 gap-3 pt-0.5">
                  {/* Pos X Slider */}
                  <div className="bg-[#FAF9F8]/65 p-2 rounded-lg border border-stone-100">
                    <div className="flex justify-between text-[10px] font-bold text-[#0A0A0A] mb-1">
                      <span>Horiz. pos (X)</span>
                      <span className="font-mono text-[#D98286]">{posX.toFixed(1)}%</span>
                    </div>
                    <input
                      type="range"
                      min="0"
                      max="100"
                      step="0.1"
                      value={posX}
                      onChange={(e) => setPosX(parseFloat(e.target.value))}
                      className="w-full accent-[#D98286] h-1 bg-stone-200 rounded-lg appearance-none cursor-pointer"
                    />
                  </div>

                  {/* Pos Y Slider */}
                  <div className="bg-[#FAF9F8]/65 p-2 rounded-lg border border-stone-100">
                    <div className="flex justify-between text-[10px] font-bold text-[#0A0A0A] mb-1">
                      <span>Vert. pos (Y)</span>
                      <span className="font-mono text-[#D98286]">{posY.toFixed(1)}%</span>
                    </div>
                    <input
                      type="range"
                      min="0"
                      max="100"
                      step="0.1"
                      value={posY}
                      onChange={(e) => setPosY(parseFloat(e.target.value))}
                      className="w-full accent-[#D98286] h-1 bg-stone-200 rounded-lg appearance-none cursor-pointer"
                    />
                  </div>

                  {/* Width Scale Slider (Strictly maintains A5 proportion) */}
                  <div className="bg-[#FAF9F8]/65 p-2 rounded-lg border border-stone-100">
                    <div className="flex justify-between text-[10px] font-bold text-[#0A0A0A] mb-1">
                      <span>Mērogs (Platums)</span>
                      <span className="font-mono text-[#D98286]">{overlayW.toFixed(1)}%</span>
                    </div>
                    <input
                      type="range"
                      min="10"
                      max="90"
                      step="0.1"
                      value={overlayW}
                      onChange={(e) => setOverlayW(parseFloat(e.target.value))}
                      className="w-full accent-[#D98286] h-1 bg-stone-200 rounded-lg appearance-none cursor-pointer"
                    />
                  </div>

                  {/* Rotate Slider */}
                  <div className="bg-[#FAF9F8]/65 p-2 rounded-lg border border-stone-100">
                    <div className="flex justify-between text-[10px] font-bold text-[#0A0A0A] mb-1">
                      <span>Rotācija</span>
                      <span className="font-mono text-[#D98286]">{rotAngle > 0 ? `+${rotAngle.toFixed(1)}` : rotAngle.toFixed(1)}°</span>
                    </div>
                    <input
                      type="range"
                      min="-45"
                      max="45"
                      step="0.5"
                      value={rotAngle}
                      onChange={(e) => setRotAngle(parseFloat(e.target.value))}
                      className="w-full accent-[#D98286] h-1 bg-stone-200 rounded-lg appearance-none cursor-pointer"
                    />
                  </div>
                </div>
              </div>
            </div>

            {/* Right Column: Immersive Front-View Mockup Canvas with Precise Design Mapping */}
            <div className="lg:col-span-7 flex flex-col justify-start relative">
              
              {/* Main Ambient Container for the selected mockup (Strict 3:4 Aspect Ratio, Max Width to keep proportions perfect) */}
              <div 
                className="w-full max-w-[420px] mx-auto aspect-[3/4] rounded-[16px] shadow-2xl relative overflow-hidden bg-[#FAF9F8] border border-[#E2D3CA]/30 flex items-center justify-center transition-all duration-75 group/preview cursor-zoom-in"
                id="creative_environment_canvas"
                onClick={() => setIsZoomed(true)}
              >
                {/* Click to Zoom Overlay hint on hover */}
                <div className="absolute inset-0 bg-black/0 hover:bg-black/15 transition-colors duration-300 flex items-center justify-center z-20 group">
                  <div className="opacity-0 group-hover:opacity-100 bg-white/95 text-[#0A0A0A] font-montserrat font-bold text-[10px] uppercase tracking-widest py-2.5 px-4 rounded-full shadow-lg flex items-center gap-2 transform translate-y-2 group-hover:translate-y-0 transition-all duration-300 pointer-events-none">
                    <Eye size={12} className="text-[#D98286]" /> Tuvināt skatu
                  </div>
                </div>

                {/* Base Mockup Background Image */}
                <img 
                  src={
                    selectedMockup === 'mockup1' ? mockup01Img :
                    selectedMockup === 'mockup2' ? mockup02Img :
                    mockup03Img
                  } 
                  alt="Front-view mockup background template" 
                  className="absolute inset-0 w-full h-full object-cover select-none pointer-events-none transition-all duration-500"
                />

                {/* USER DESIGN AREA - MAPPED OUT AND FULLY CALIBRATED WITH POSITION, SCALE, ROTATE, BLEND & OPACITY */}
                <div 
                  style={{
                    left: `${posX}%`,
                    top: `${posY}%`,
                    width: `${overlayW}%`,
                    aspectRatio: '1748/2480',
                    transform: `rotate(${rotAngle}deg)`,
                    mixBlendMode: 'multiply',
                  }}
                  className="absolute overflow-hidden pointer-events-none transition-all duration-75 flex items-center justify-center rounded-[1%]"
                  id="mapped_design_overlay"
                >
                  {/* Boundary helper to visualize where the A5 area is when designing */}
                  <div className="absolute inset-0 rounded-[1%] pointer-events-none z-10 flex items-center justify-center">
                    {!uploadedDesign && (
                      <div className="p-2 text-center select-none opacity-50 max-w-[90%]">
                        <p className="text-[8px] font-bold text-[#D98286] tracking-wider uppercase leading-none">A5 APGABALS</p>
                      </div>
                    )}
                  </div>

                  {/* Cover Art Image */}
                  <img 
                    src={uploadedDesign || coverImg} 
                    alt="Piezīmju grāmatiņas vāka dizains" 
                    style={{
                      mixBlendMode: 'multiply',
                      opacity: 1.0,
                    }}
                    className="w-full h-full object-cover transition-all duration-300"
                    referrerPolicy="no-referrer"
                  />
                </div>
              </div>

            </div>

          </div>
        </div>
      </section>

      {/* Zoom Close-Up Lightbox Modal */}
      {isZoomed && (
        <div 
          className="fixed inset-0 z-[100] bg-stone-950/80 backdrop-blur-md flex items-center justify-center p-4 cursor-zoom-out animate-fade-in"
          onClick={() => setIsZoomed(false)}
        >
          {/* Modal Container */}
          <div 
            className="relative w-full max-w-[500px] aspect-[3/4] bg-white rounded-[20px] overflow-hidden shadow-2xl border border-white/10 cursor-default"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Base Mockup Background Image */}
            <img 
              src={
                selectedMockup === 'mockup1' ? mockup01Img :
                selectedMockup === 'mockup2' ? mockup02Img :
                mockup03Img
              } 
              alt="Zoomed detailed perspective view" 
              className="absolute inset-0 w-full h-full object-cover select-none pointer-events-none"
            />

            {/* Calibrated Design Image Overlay */}
            <div 
              style={{
                left: `${posX}%`,
                top: `${posY}%`,
                width: `${overlayW}%`,
                aspectRatio: '1748/2480',
                transform: `rotate(${rotAngle}deg)`,
                mixBlendMode: 'multiply',
              }}
              className="absolute overflow-hidden pointer-events-none transition-all duration-75 flex items-center justify-center rounded-[1%]"
            >
              <img 
                src={uploadedDesign || coverImg} 
                alt="Piezīmju grāmatiņas vāka dizains" 
                style={{
                  mixBlendMode: 'multiply',
                  opacity: 1.0,
                }}
                className="w-full h-full object-cover"
                referrerPolicy="no-referrer"
              />
            </div>

            {/* UI indicator on top */}
            <div className="absolute top-4 left-4 bg-black/60 backdrop-blur-md text-white text-[10px] font-bold uppercase tracking-wider py-1.5 px-3 rounded-full flex items-center gap-1.5 pointer-events-none">
              <Sparkles size={11} className="text-[#D98286]" /> Tuvplāna skats
            </div>

            {/* Transparent elegant close button */}
            <button 
              type="button"
              onClick={() => setIsZoomed(false)}
              className="absolute top-4 right-4 bg-black/65 hover:bg-black/80 backdrop-blur-md text-white p-2.5 rounded-full transition-all border border-white/10 flex items-center justify-center cursor-pointer shadow-lg"
              title="Aizvērt"
            >
              <X size={15} />
            </button>
          </div>
        </div>
      )}

      {/* Product Details Section - Replaced specifications with an elegant graphic Infogram of data */}
      <section 
        id="details" 
        className="py-24 relative overflow-hidden bg-cover bg-center border-y border-[#E2D3CA]/30"
        style={{ backgroundImage: `url(${infoImg})` }}
      >
        <div className="relative z-10 max-w-[1200px] mx-auto px-6">
          
          <div className="text-left max-w-[800px] mr-auto mb-16 flex flex-col space-y-4 items-start">
            <h2 className="text-h2 text-[#0A0A0A] font-montserrat font-extrabold tracking-tight leading-tight">
              Arhitekta tīrais audekls<br />
            </h2>
            <p className="text-sm text-[#6B6B6B] max-w-xl leading-relaxed">
              Tehniski pilnveidota un estētiska piezīmju grāmata ar augstākās klases materiālu savienojumu Tavai ikdienas izcilībai un jaunajiem mērķiem.
            </p>
            <div className="w-12 h-0.5 bg-[#D98286] mt-2"></div>
          </div>

          {/* Grid of UI cards matching Highlights / Why Us Section */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 text-left" id="details_infogram_minimal">
            
            {/* Card 1: Portable A5 Dimensions */}
            <div className="bg-[linear-gradient(135deg,#D98286_0%,#F5E4E2_100%)] p-8 rounded-[11px] shadow-sm hover:shadow-xl transition-all duration-300 hover:-translate-y-1 text-left flex flex-col justify-between min-h-[220px] border border-[#E2D3CA]/20 relative overflow-hidden group">
              <div className="relative z-10 max-w-[85%] pr-2">
                <h3 className="text-h3 text-lg font-bold mb-3 text-[#0A0A0A]">Kompakts A5 izmērs</h3>
                <p className="text-xs text-[#0A0A0A]/85 leading-relaxed font-medium">
                  148 x 210 mm formāts nodrošina nevainojamu līdzsvaru starp plašu radošo laukumu un ērti pārnēsājamu izmēru ikdienas gaitām.
                </p>
              </div>
              <BookOpen className="absolute right-0 translate-x-[40%] top-0 h-full w-auto text-[#FAF9F8] opacity-30 pointer-events-none stroke-[1.5]" />
            </div>

            {/* Card 2: Premium 80gr Paper */}
            <div className="bg-[linear-gradient(135deg,#D98286_0%,#F5E4E2_100%)] p-8 rounded-[11px] shadow-sm hover:shadow-xl transition-all duration-300 hover:-translate-y-1 text-left flex flex-col justify-between min-h-[220px] border border-[#E2D3CA]/20 relative overflow-hidden group">
              <div className="relative z-10 max-w-[85%] pr-2">
                <h3 className="text-h3 text-lg font-bold mb-3 text-[#0A0A0A]">Premium 80g/m² papīrs</h3>
                <p className="text-xs text-[#0A0A0A]/85 leading-relaxed font-medium">
                  Augstākās kvalitātes papīra materiāls ar gludu virsmu, kas būtiski samazina tintes caursūkšanos visiem populārajiem rakstāmrīkiem.
                </p>
              </div>
              <Layers className="absolute right-0 translate-x-[40%] top-0 h-full w-auto text-[#FAF9F8] opacity-30 pointer-events-none stroke-[1.5]" />
            </div>

            {/* Card 3: Durable Spiral Binding */}
            <div className="bg-[linear-gradient(135deg,#D98286_0%,#F5E4E2_100%)] p-8 rounded-[11px] shadow-sm hover:shadow-xl transition-all duration-300 hover:-translate-y-1 text-left flex flex-col justify-between min-h-[220px] border border-[#E2D3CA]/20 relative overflow-hidden group">
              <div className="relative z-10 max-w-[85%] pr-2">
                <h3 className="text-h3 text-lg font-bold mb-3 text-[#0A0A0A]">Izturīgs spirāles stiprinājums</h3>
                <p className="text-xs text-[#0A0A0A]/85 leading-relaxed font-medium">
                  Masīva un rūpīgi veidota metāla mugurkaula spirāle garantē konstrukcijas ilgmūžību un iespēju fiksēt un pārlocīt lapas pa 360 grādiem.
                </p>
              </div>
              <Sliders className="absolute right-0 translate-x-[40%] top-0 h-full w-auto text-[#FAF9F8] opacity-30 pointer-events-none stroke-[1.5]" />
            </div>

            {/* Card 4: Dot Grid Precision */}
            <div className="bg-[linear-gradient(135deg,#D98286_0%,#F5E4E2_100%)] p-8 rounded-[11px] shadow-sm hover:shadow-xl transition-all duration-300 hover:-translate-y-1 text-left flex flex-col justify-between min-h-[220px] border border-[#E2D3CA]/20 relative overflow-hidden group">
              <div className="relative z-10 max-w-[85%] pr-2">
                <h3 className="text-h3 text-lg font-bold mb-3 text-[#0A0A0A]">Precīzs punktu tīkls</h3>
                <p className="text-xs text-[#0A0A0A]/85 leading-relaxed font-medium">
                  Neuzkrītošs gaiši pelēks punktotais režģis (5 mm) sniedz skaidras vadlīnijas taisnām līnijām un skicēm, neapgrūtinot lapas tīrību.
                </p>
              </div>
              <Compass className="absolute right-0 translate-x-[40%] top-0 h-full w-auto text-[#FAF9F8] opacity-30 pointer-events-none stroke-[1.5]" />
            </div>

          </div>

        </div>
      </section>

      {/* Use Cases Section - Styled as beautiful micro-cards with Rose-to-Blossom gradients */}
      <section id="usecases" className="py-24 bg-[#FAF9F8] relative">
        <div className="max-w-[1200px] mx-auto px-6">
          
          <div className="text-center max-w-2xl mx-auto mb-16 flex flex-col space-y-4">
            <h2 className="text-h2 text-[#0A0A0A]">Viens rīks, bezgalīgas iespējas</h2>
            <div className="w-12 h-0.5 bg-[#D98286] mx-auto"></div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8" id="usecases_wrapper">
            
            {/* Use Case 1 */}
            <div className="bg-[linear-gradient(135deg,#D98286_0%,#F5E4E2_100%)] p-8 rounded-[11px] shadow-sm hover:shadow-xl transition-all duration-300 hover:-translate-y-1 text-left flex flex-col justify-between min-h-[220px] border border-[#E2D3CA]/20 relative overflow-hidden group">
              <div className="relative z-10 max-w-[85%] pr-2">
                <h3 className="text-h3 text-lg font-bold mb-3 text-[#0A0A0A]">Skicēšanai</h3>
                <p className="text-xs text-[#0A0A0A]/85 leading-relaxed font-medium">
                  Premium luksusa papīra virsma ideāli slīd zem zīmuļa, laineriem vai ogles. Izbaudi pilnīgu radīšanas brīvību bez tintes izplūšanas.
                </p>
              </div>
              <Sliders className="absolute right-0 translate-x-[40%] top-0 h-full w-auto text-[#FAF9F8] opacity-30 pointer-events-none stroke-[1.5]" />
            </div>

            {/* Use Case 2 */}
            <div className="bg-[linear-gradient(135deg,#D98286_0%,#F5E4E2_100%)] p-8 rounded-[11px] shadow-sm hover:shadow-xl transition-all duration-300 hover:-translate-y-1 text-left flex flex-col justify-between min-h-[220px] border border-[#E2D3CA]/20 relative overflow-hidden group">
              <div className="relative z-10 max-w-[85%] pr-2">
                <h3 className="text-h3 text-lg font-bold mb-3 text-[#0A0A0A]">Sarakstiem</h3>
                <p className="text-xs text-[#0A0A0A]/85 leading-relaxed font-medium">
                  Punktainas lapas palīdz viegli un perfekti zīmēt trackerus, mēneša plānus, logrīkus un kalendāru lapas.
                </p>
              </div>
              <BookOpen className="absolute right-0 translate-x-[40%] top-0 h-full w-auto text-[#FAF9F8] opacity-30 pointer-events-none stroke-[1.5]" />
            </div>

            {/* Use Case 3 */}
            <div className="bg-[linear-gradient(135deg,#D98286_0%,#F5E4E2_100%)] p-8 rounded-[11px] shadow-sm hover:shadow-xl transition-all duration-300 hover:-translate-y-1 text-left flex flex-col justify-between min-h-[220px] border border-[#E2D3CA]/20 relative overflow-hidden group">
              <div className="relative z-10 max-w-[85%] pr-2">
                <h3 className="text-h3 text-lg font-bold mb-3 text-[#0A0A0A]">Plānošanai</h3>
                <p className="text-xs text-[#0A0A0A]/85 leading-relaxed font-medium">
                  Atstāj aizmugurē datētus un nogurdinošus plānotājus. Strukturē savas dienas, projektus un biznesa piezīmes bez stīviem nosacījumiem.
                </p>
              </div>
              <Compass className="absolute right-0 translate-x-[40%] top-0 h-full w-auto text-[#FAF9F8] opacity-30 pointer-events-none stroke-[1.5]" />
            </div>

            {/* Use Case 4 */}
            <div className="bg-[linear-gradient(135deg,#D98286_0%,#F5E4E2_100%)] p-8 rounded-[11px] shadow-sm hover:shadow-xl transition-all duration-300 hover:-translate-y-1 text-left flex flex-col justify-between min-h-[220px] border border-[#E2D3CA]/20 relative overflow-hidden group">
              <div className="relative z-10 max-w-[85%] pr-2">
                <h3 className="text-h3 text-lg font-bold mb-3 text-[#0A0A0A]">Dāvināšanai</h3>
                <p className="text-xs text-[#0A0A0A]/85 leading-relaxed font-medium">
                  Personalizēts dāvanas pieskāriens ir neaizvietojams. Uzdāvini īpašu koptu piezīmju grāmatiņu mīļam draugam vai kolēģim.
                </p>
              </div>
              <Gift className="absolute right-0 translate-x-[40%] top-0 h-full w-auto text-[#FAF9F8] opacity-30 pointer-events-none stroke-[1.5]" />
            </div>

          </div>
        </div>
      </section>

      {/* Testimonials Section - cards styled with Rose-to-Blossom 135 deg gradient as requested */}
      <section id="testimonials" className="py-24 bg-white relative">
        <div className="max-w-[1200px] mx-auto px-6">
          
          <div className="text-right max-w-2xl ml-auto mb-16 flex flex-col space-y-4 items-end">
            <h2 className="text-h2 text-[#0A0A0A] font-montserrat font-extrabold tracking-tight leading-tight">Ko saka mūsu klienti</h2>
            <p className="text-sm text-[#6B6B6B] max-w-xl leading-relaxed">
              Mūsu lielākais lepnums ir redzēt klientu panākumus un iedvesmas pilnos mirkļus, ko pavada viņu unikālās piezīmes un skices.
            </p>
            <div className="w-12 h-0.5 bg-[#D98286] mt-2"></div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8" id="testimonials_wrapper">
            
            {/* Testimonial 1 */}
            <div className="bg-[linear-gradient(135deg,#D98286_0%,#F5E4E2_100%)] p-8 rounded-[11px] shadow-sm flex flex-col justify-between border border-[#D98286]/10 hover:shadow-xl transition-all duration-300">
              <div className="space-y-4">
                <div className="flex text-[#0A0A0A] space-x-1">
                  <span className="text-xs">★</span>
                  <span className="text-xs">★</span>
                  <span className="text-xs">★</span>
                  <span className="text-xs">★</span>
                  <span className="text-xs">★</span>
                </div>
                <p className="text-xs text-[#0A0A0A]/85 italic leading-relaxed font-medium">
                  "Beidzot papīrs, kas nebaidās no manām tintēm un zīmuļiem! Personalizācijas iespējas un blossom tonis vākam izskatās tik eleganti un grezni. Pasūtīšu noteikti vēl."
                </p>
              </div>
              <div className="pt-6 border-t border-[#0A0A0A]/10 mt-6 flex items-center space-x-3">
                <div className="w-9 h-9 rounded-full bg-white flex items-center justify-center font-bold text-[#D98286] text-xs shadow-sm shadow-[#D98286]/20">
                  PS
                </div>
                <div>
                  <h5 className="font-montserrat font-bold text-xs text-[#0A0A0A] tracking-wider uppercase">Paula S.</h5>
                </div>
              </div>
            </div>

            {/* Testimonial 2 */}
            <div className="bg-[linear-gradient(135deg,#D98286_0%,#F5E4E2_100%)] p-8 rounded-[11px] shadow-sm flex flex-col justify-between border border-[#D98286]/10 hover:shadow-xl transition-all duration-300">
              <div className="space-y-4">
                <div className="flex text-[#0A0A0A] space-x-1">
                  <span className="text-xs">★</span>
                  <span className="text-xs">★</span>
                  <span className="text-xs">★</span>
                  <span className="text-xs">★</span>
                  <span className="text-xs">★</span>
                </div>
                <p className="text-xs text-[#0A0A0A]/85 italic leading-relaxed font-medium">
                  "Izturīgā metāla spirāle un klātais punktotais režģis ir mans galvenais atbalsts ceļojot. Klade pilnībā atveras un paliek plakana. Kvalitāte jūtama ikkatrā rindiņā un pieskārienā."
                </p>
              </div>
              <div className="pt-6 border-t border-[#0A0A0A]/10 mt-6 flex items-center space-x-3">
                <div className="w-9 h-9 rounded-full bg-white flex items-center justify-center font-bold text-[#D98286] text-xs shadow-sm shadow-[#D98286]/20">
                  RK
                </div>
                <div>
                  <h5 className="font-montserrat font-bold text-xs text-[#0A0A0A] tracking-wider uppercase">Roberts K.</h5>
                </div>
              </div>
            </div>

            {/* Testimonial 3 */}
            <div className="bg-[linear-gradient(135deg,#D98286_0%,#F5E4E2_100%)] p-8 rounded-[11px] shadow-sm flex flex-col justify-between border border-[#D98286]/10 hover:shadow-xl transition-all duration-300">
              <div className="space-y-4">
                <div className="flex text-[#0A0A0A] space-x-1">
                  <span className="text-xs">★</span>
                  <span className="text-xs">★</span>
                  <span className="text-xs">★</span>
                  <span className="text-xs">★</span>
                  <span className="text-xs">★</span>
                </div>
                <p className="text-xs text-[#0A0A0A]/85 italic leading-relaxed font-medium">
                  "Sveicieni no manas studijas! Es regulāri dāvināju šīs klades saviem radošajiem draugiem. Iespēja uzrakstīt viņu vārdu elegantā rakstā padara to par neaizmirstamu dāvanu!"
                </p>
              </div>
              <div className="pt-6 border-t border-[#0A0A0A]/10 mt-6 flex items-center space-x-3">
                <div className="w-9 h-9 rounded-full bg-white flex items-center justify-center font-bold text-[#D98286] text-xs shadow-sm shadow-[#D98286]/20">
                  ML
                </div>
                <div>
                  <h5 className="font-montserrat font-bold text-xs text-[#0A0A0A] tracking-wider uppercase">Marta L.</h5>
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* Persuasive Call to Action Section */}
      <section className="py-24 bg-[#FAF9F8] relative border-t border-[#E2D3CA]/30 overflow-hidden">
        
        {/* Fine-detailed dot grid graphic background on the container to feel like luxury paper */}
        <div className="absolute inset-0 opacity-[0.25] pointer-events-none" style={{
          backgroundImage: 'radial-gradient(#D98286 1px, transparent 1px)',
          backgroundSize: '24px 24px'
        }}></div>
        <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-[#F5E4E2]/25 rounded-full blur-3xl pointer-events-none"></div>

        <div className="max-w-[1100px] mx-auto px-6 relative z-10 text-center">
          <div className="bg-white border border-[#E2D3CA]/50 rounded-[20px] p-12 md:p-16 shadow-xl max-w-3xl mx-auto flex flex-col items-center space-y-8">
            
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-montserrat font-extrabold tracking-tight text-[#0A0A0A] leading-tight">
              Gatavs radīt savu nākamo šedevru?
            </h1>
            
            <p className="text-[#6B6B6B] text-base leading-relaxed font-medium max-w-xl">
              Personalizē savu kladi, izvēlies luksusa zelta spiedumu un baudi augstākā mēroga papīra kvalitāti ikdienas radīšanā. Sāc savu jauno stāstu jau šodien ar ērtu un ātru piegādi visā Latvijā!
            </p>

            <div className="pt-2">
              <a 
                href="https://dainamax.lv" 
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex px-10 py-5 bg-[#D98286] hover:bg-[#C96F74] text-white btn-typography rounded-full tracking-[0.11em] transition-all duration-300 shadow-md hover:shadow-xl hover:-translate-y-0.5 font-montserrat font-bold text-sm uppercase"
                id="middle_checkout_cta"
              >
                RADI SAVU PIEZĪMJU GRĀMATU
              </a>
            </div>

          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-[#0A0A0A] text-[#FAF9F8] py-16 border-t border-[#111111] relative overflow-hidden">
        <div className="absolute top-0 right-0 w-80 h-80 bg-[#D98286]/10 rounded-full blur-3xl"></div>
        
        <div className="max-w-[1200px] mx-auto px-6 relative">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-12 pb-12 border-b border-[#FAF9F8]/10" id="footer_grid">
            
            {/* Branding Column */}
            <div className="md:col-span-2 space-y-4">
              <div className="flex items-center h-12 w-48 relative">
                <img 
                  src={dainamaxLogo} 
                  alt="DAINAMAX" 
                  className="h-full w-full object-contain object-left filter brightness-0 invert pointer-events-none" 
                />
              </div>
              <p className="text-xs text-[#6B6B6B] leading-relaxed max-w-sm">
                Rūpīgi izstrādātas un personalizētas spirāļu piezīmju grāmatiņas, kas palīdz māksliniekiem un radošiem prātiem vizualizēt savas idejas uz augstākās kvalitātes papīra.
              </p>
              <div className="text-xs text-[#6B6B6B] pt-2">
                © {new Date().getFullYear()} DAINAMAX. Visas tiesības aizsargātas.
              </div>
            </div>

            {/* Links Column with the 4 links */}
            <div>
              <h5 className="font-montserrat font-bold text-xs text-white uppercase tracking-wider mb-4">Saites</h5>
              <ul className="space-y-2.5">
                <li><a href="#hero" className="text-xs text-[#6B6B6B] hover:text-white transition-colors duration-300">Sākums</a></li>
                <li><a href="#mockup" className="text-xs text-[#6B6B6B] hover:text-white transition-colors duration-300">Mockup</a></li>
                <li><a href="#highlights" className="text-xs text-[#6B6B6B] hover:text-white transition-colors duration-300">Kāpēc mēs</a></li>
                <li><a href="#testimonials" className="text-xs text-[#6B6B6B] hover:text-white transition-colors duration-300">Atsauksmes</a></li>
              </ul>
            </div>

            {/* Social / Contact Column */}
            <div className="space-y-4">
              <h5 className="font-montserrat font-bold text-xs text-white uppercase tracking-wider mb-4 font-semibold">Mēs esam šeit</h5>
              <ul className="space-y-2.5">
                <li>
                  <a href="https://www.dainamax.lv" target="_blank" rel="noopener noreferrer" className="text-xs text-[#6B6B6B] hover:text-white transition-colors duration-300 flex items-center gap-1.5">
                    www.dainamax.lv
                  </a>
                </li>
                <li className="text-xs text-[#6B6B6B]">Instagram: <span className="text-white"><a href="https://www.instagram.com/dainamaxstudio/" target="_blank" rel="noopener noreferrer" className="text-xs text-[#6B6B6B] hover:text-white transition-colors duration-300 flex items-center gap-1.5">@dainamaxstudio</a></span></li>
                <li className="text-xs text-[#6B6B6B]">TikTok: <span className="text-white"><a href="https://www.tiktok.com/@dainamax_" target="_blank" rel="noopener noreferrer" className="text-xs text-[#6B6B6B] hover:text-white transition-colors duration-300 flex items-center gap-1.5">@dainamax_</a></span></li>
              </ul>
            </div>

          </div>
        </div>
      </footer>
    </div>
  );
}
