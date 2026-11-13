import React, { useState, useRef } from 'react';
import { 
  Building2, 
  MapPin, 
  ShieldCheck, 
  Award, 
  Download, 
  Calendar, 
  Phone, 
  MessageSquare, 
  Maximize2, 
  CheckCircle2, 
  ChevronRight, 
  Play, 
  Pause,
  Volume2,
  VolumeX,
  Star, 
  Calculator, 
  Layers, 
  Sparkles, 
  X, 
  Compass, 
  Zap, 
  Info, 
  FileText, 
  Check, 
  Eye,
  ArrowRight,
  ExternalLink,
  Percent,
  Clock,
  Send,
  HelpCircle
} from 'lucide-react';

export default function App() {
  // Modal & Notification States
  const [isDossierOpen, setIsDossierOpen] = useState(false);
  const [isTourModalOpen, setIsTourModalOpen] = useState(false);
  const [toastMessage, setToastMessage] = useState(null);

  // Mortgage Calculator States
  const [propertyPrice, setPropertyPrice] = useState(680000);
  const [downPaymentPercent, setDownPaymentPercent] = useState(30);
  const [termMonths, setTermMonths] = useState(36);

  // Tour Form State
  const [tourForm, setTourForm] = useState({
    name: '',
    phone: '',
    email: '',
    date: '',
    time: '10:00 AM',
    propertyType: 'Skyline Penthouse (350 m²)'
  });
  const [tourSubmitted, setTourSubmitted] = useState(false);

  // Interactive Floor Plan & Gallery State
  const [selectedFloorPlan, setSelectedFloorPlan] = useState('penthouse');
  const [galleryFilter, setGalleryFilter] = useState('all');
  const [lightboxImage, setLightboxImage] = useState(null);
  const [selectedFinish, setSelectedFinish] = useState(0);

  // Video Player Control State
  const videoRef = useRef(null);
  const [isPlaying, setIsPlaying] = useState(true);
  const [isMuted, setIsMuted] = useState(true);

  // Calculated Mortgage Values
  const downPaymentAmount = (propertyPrice * downPaymentPercent) / 100;
  const remainingBalance = propertyPrice - downPaymentAmount;
  const monthlyPayment = termMonths > 0 ? (remainingBalance / termMonths) : 0;

  // Toggle Video Playback
  const togglePlay = () => {
    if (videoRef.current) {
      if (isPlaying) {
        videoRef.current.pause();
      } else {
        videoRef.current.play().catch(err => console.log("Autoplay prevented:", err));
      }
      setIsPlaying(!isPlaying);
    }
  };

  // Toggle Video Mute
  const toggleMute = () => {
    if (videoRef.current) {
      videoRef.current.muted = !isMuted;
      setIsMuted(!isMuted);
    }
  };

  // WhatsApp Trigger with Custom Toast Notification
  const handleWhatsAppRedirect = () => {
    setToastMessage("Te estás redirigiendo a WhatsApp Business en este momento...");
    setTimeout(() => {
      setToastMessage(null);
      window.open('https://wa.me/525512345678?text=Hola,%20me%20interesa%20recibir%20informaci%C3%B3n%20sobre%20Aura%20Horizon%20Residences', '_blank');
    }, 2200);
  };

  // Función para Descargar PDF del Dossier de Paquetes Predefinidos
  const handleDownloadPDF = (pkg) => {
    setToastMessage(`Generando PDF detallado: ${pkg.title}...`);
    
    setTimeout(() => {
      setToastMessage(null);
      
      const printWindow = window.open('', '_blank');
      if (!printWindow) {
        alert("Por favor, permite las ventanas emergentes (pop-ups) para descargar el PDF.");
        return;
      }

      const htmlContent = `
        <!DOCTYPE html>
        <html lang="es">
        <head>
          <meta charset="UTF-8">
          <title>Cotización Oficial - Aura Horizon Residences - ${pkg.title}</title>
          <style>
            body { font-family: 'Helvetica Neue', Helvetica, Arial, sans-serif; color: #1c1917; margin: 0; padding: 30px; background: #fff; }
            .header { border-bottom: 2px solid #C2783E; padding-bottom: 15px; display: flex; justify-content: space-between; align-items: center; }
            .logo { font-size: 20px; font-weight: bold; letter-spacing: 2px; color: #1c1917; }
            .subtitle { font-size: 9px; color: #78716c; text-transform: uppercase; letter-spacing: 2px; }
            .badge { background: #fdf8f5; color: #C2783E; border: 1px solid #C2783E; padding: 5px 12px; font-size: 10px; font-weight: bold; border-radius: 6px; display: inline-block; margin-top: 12px; }
            h1 { font-size: 22px; color: #1c1917; margin-top: 15px; margin-bottom: 5px; }
            .meta { font-size: 11px; color: #78716c; margin-bottom: 20px; }
            .box { background: #f9f8f6; border: 1px solid #e7e2dc; padding: 15px; border-radius: 8px; margin-bottom: 20px; }
            .row { display: flex; justify-content: space-between; padding: 6px 0; border-bottom: 1px solid #e7e2dc; font-size: 12px; }
            .row:last-child { border-bottom: none; }
            .label { color: #78716c; font-weight: 500; }
            .value { font-weight: bold; color: #1c1917; }
            .highlight { color: #C2783E; font-size: 15px; }
            ul { padding-left: 18px; font-size: 12px; color: #44403c; line-height: 1.5; }
            li { margin-bottom: 4px; }
            .footer { margin-top: 30px; border-top: 1px solid #e7e2dc; padding-top: 15px; font-size: 9px; color: #a8a29e; display: flex; justify-content: space-between; }
          </style>
        </head>
        <body>
          <div class="header">
            <div>
              <div class="logo">AURA HORIZON</div>
              <div class="subtitle">Residences & Construction • Dossier Oficial de Inversión</div>
            </div>
            <div style="text-align: right; font-size: 10px; color: #78716c;">
              Fecha: ${new Date().toLocaleDateString()}<br>
              Folio: AH-${Math.floor(100000 + Math.random() * 900000)}
            </div>
          </div>
          <div>
            <span class="badge">${pkg.badge}</span>
            <h1>${pkg.title}</h1>
            <div class="meta">Condición comercial aplicada: <strong>${pkg.discount}</strong></div>
          </div>
          <div class="box">
            <h3 style="margin-top: 0; font-size: 14px; border-bottom: 1px solid #e7e2dc; padding-bottom: 6px;">Desglose Financiero</h3>
            <div class="row"><span class="label">Inversión Inicial:</span><span class="value highlight">${pkg.downPayment}</span></div>
            <div class="row"><span class="label">Mensualidad:</span><span class="value">${pkg.monthly}</span></div>
            <div class="row"><span class="label">Pago Final:</span><span class="value">${pkg.finalPayment}</span></div>
          </div>
          <div class="box">
            <h3 style="margin-top: 0; font-size: 14px; border-bottom: 1px solid #e7e2dc; padding-bottom: 6px;">Beneficios Incluidos</h3>
            <ul>${pkg.benefits.map(b => `<li>${b}</li>`).join('')}</ul>
          </div>
          <div style="background: #1c1917; color: #e7e2dc; padding: 12px 15px; border-radius: 6px; font-size: 10px; margin-top: 20px;">
            <strong>Aviso Legal:</strong> Precios sujetos a disponibilidad y vigencia de 15 días naturales.
          </div>
          <div class="footer">
            <span>Aura Horizon Residences • www.aurahorizon.com</span>
            <span>WhatsApp: +52 55 1234 5678</span>
          </div>
          <script>window.onload = function() { window.print(); }</script>
        </body>
        </html>
      `;
      printWindow.document.write(htmlContent);
      printWindow.document.close();
    }, 800);
  };

  // Función para Generar PDF dinámico basado en los ajustes de la Calculadora
  const handleDownloadCalculatorPDF = () => {
    setToastMessage("Generando Cotización Personalizada de la Calculadora...");

    setTimeout(() => {
      setToastMessage(null);

      const printWindow = window.open('', '_blank');
      if (!printWindow) {
        alert("Por favor, permite las ventanas emergentes (pop-ups) para descargar el PDF.");
        return;
      }

      const htmlContent = `
        <!DOCTYPE html>
        <html lang="es">
        <head>
          <meta charset="UTF-8">
          <title>Simulación Personalizada - Aura Horizon Residences</title>
          <style>
            body { font-family: 'Helvetica Neue', Helvetica, Arial, sans-serif; color: #1c1917; margin: 0; padding: 30px; background: #fff; }
            .header { border-bottom: 2px solid #C2783E; padding-bottom: 15px; display: flex; justify-content: space-between; align-items: center; }
            .logo { font-size: 20px; font-weight: bold; letter-spacing: 2px; color: #1c1917; }
            .subtitle { font-size: 9px; color: #78716c; text-transform: uppercase; letter-spacing: 2px; }
            .badge { background: #fdf8f5; color: #C2783E; border: 1px solid #C2783E; padding: 5px 12px; font-size: 10px; font-weight: bold; border-radius: 6px; display: inline-block; margin-top: 12px; }
            h1 { font-size: 22px; color: #1c1917; margin-top: 15px; margin-bottom: 5px; }
            .meta { font-size: 11px; color: #78716c; margin-bottom: 20px; }
            .box { background: #f9f8f6; border: 1px solid #e7e2dc; padding: 15px; border-radius: 8px; margin-bottom: 20px; }
            .row { display: flex; justify-content: space-between; padding: 8px 0; border-bottom: 1px solid #e7e2dc; font-size: 12px; }
            .row:last-child { border-bottom: none; }
            .label { color: #78716c; font-weight: 500; }
            .value { font-weight: bold; color: #1c1917; }
            .highlight { color: #C2783E; font-size: 16px; }
            .footer { margin-top: 30px; border-top: 1px solid #e7e2dc; padding-top: 15px; font-size: 9px; color: #a8a29e; display: flex; justify-content: space-between; }
          </style>
        </head>
        <body>
          <div class="header">
            <div>
              <div class="logo">AURA HORIZON</div>
              <div class="subtitle">Residences & Construction • Cotización de Simulador a la Medida</div>
            </div>
            <div style="text-align: right; font-size: 10px; color: #78716c;">
              Fecha: ${new Date().toLocaleDateString()}<br>
              Folio Simulador: SIM-${Math.floor(100000 + Math.random() * 900000)}
            </div>
          </div>
          <div>
            <span class="badge">Simulación Financiera Personalizada</span>
            <h1>Resumen de Cuota de Preventa</h1>
            <div class="meta">Parámetros configurados directamente en la plataforma web.</div>
          </div>
          <div class="box">
            <h3 style="margin-top: 0; font-size: 14px; border-bottom: 1px solid #e7e2dc; padding-bottom: 6px;">Parámetros Seleccionados</h3>
            <div class="row"><span class="label">Valor Total de la Unidad:</span><span class="value">$${propertyPrice.toLocaleString()} USD</span></div>
            <div class="row"><span class="label">Porcentaje de Enganche (% Inicial):</span><span class="value">${downPaymentPercent}%</span></div>
            <div class="row"><span class="label">Plazo de Obra Diferida:</span><span class="value">${termMonths} Meses</span></div>
          </div>
          <div class="box">
            <h3 style="margin-top: 0; font-size: 14px; border-bottom: 1px solid #e7e2dc; padding-bottom: 6px;">Resultado del Cálculo</h3>
            <div class="row"><span class="label">Monto de Inicial (${downPaymentPercent}%):</span><span class="value">$${downPaymentAmount.toLocaleString()} USD</span></div>
            <div class="row"><span class="label">Saldo a la Entrega de Llaves:</span><span class="value">$${remainingBalance.toLocaleString()} USD</span></div>
            <div class="row"><span class="label">Financiamiento Directo:</span><span class="value">0% Intereses con Constructora</span></div>
            <div class="row" style="margin-top: 8px; background: #fff5ec; padding: 10px; border-radius: 6px;">
              <span class="label" style="font-size: 13px; font-weight: bold; color: #C2783E;">Pago Mensual Estimado en Obra:</span>
              <span class="value highlight">$${Math.round(monthlyPayment).toLocaleString()} USD/mes</span>
            </div>
          </div>
          <div style="background: #1c1917; color: #e7e2dc; padding: 12px 15px; border-radius: 6px; font-size: 10px; margin-top: 20px;">
            <strong>Validez de Cotización:</strong> Esta simulación tiene una vigencia de 7 días naturales. Para proceder con la firma del contrato bajo estas condiciones, agende su cita en nuestro showroom.
          </div>
          <div class="footer">
            <span>Aura Horizon Residences • www.aurahorizon.com</span>
            <span>WhatsApp VIP: +52 55 1234 5678</span>
          </div>
          <script>window.onload = function() { window.print(); }</script>
        </body>
        </html>
      `;
      printWindow.document.write(htmlContent);
      printWindow.document.close();
    }, 800);
  };

  // Video local personalizado desde la carpeta public
  const renderVideoUrl = "/hero-residence.mp4";
  const renderPosterUrl = "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&w=1200&q=80";

  // Floor Plans Data with 4 Detailed Hotspots
  const floorPlans = {
    penthouse: {
      name: "Skyline Penthouse",
      subtitle: "Nivel 14-15 | Vista 360° Panorámica",
      area: "350 m²",
      bedrooms: 4,
      bathrooms: 4.5,
      terrace: "85 m² Privativa con Jacuzzi",
      price: "$680,000 USD",
      rawPrice: 680000,
      blueprint: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1000&q=80",
      hotspots: [
        { id: 1, title: "Master Suite & Spa", desc: "Vista frontal al mar, baño en mármol Calacatta y vestidor italiano.", top: "25%", left: "35%" },
        { id: 2, title: "Terraza Infinity Privada", desc: "Piscina climatizada en voladizo con sistema de hidromasaje y deck de teca.", top: "70%", left: "65%" },
        { id: 3, title: "Cocina Gourmet Chef", desc: "Equipamiento alemán Gaggenau, isla central de cuarzo de 4.2m y cava refrigerada.", top: "45%", left: "25%" },
        { id: 4, title: "Salón Panorama & Bar", desc: "Doble altura con ventanales de piso a techo y sistema acústico integrado.", top: "50%", left: "75%" }
      ]
    },
    townhouse: {
      name: "Garden House",
      subtitle: "Nivel 1-2 | Jardín Privado & Pool",
      area: "260 m²",
      bedrooms: 3,
      bathrooms: 3.5,
      terrace: "45 m² + Jardín 60 m²",
      price: "$480,000 USD",
      rawPrice: 480000,
      blueprint: "https://images.unsplash.com/photo-1600566753376-12c8ab7fb75b?auto=format&fit=crop&w=1000&q=80",
      hotspots: [
        { id: 1, title: "Jardín Bioclimático", desc: "Paisajismo tropical integrado con riego automatizado y zona de fuego.", top: "80%", left: "50%" },
        { id: 2, title: "Estudio & Home Office", desc: "Aislamiento acústico de 42dB y iluminación LED dimerizable.", top: "30%", left: "30%" },
        { id: 3, title: "Cocina Abierta", desc: "Diseño minimalista con acabados en madera de nogal y acero inoxidable.", top: "45%", left: "60%" },
        { id: 4, title: "Estacionamiento Privado", desc: "Acceso directo subterráneo para 2 vehículos con cargador para autos eléctricos.", top: "70%", left: "25%" }
      ]
    },
    deluxe: {
      name: "Grand Residence",
      subtitle: "Niveles 3 a 12 | Vista al Mar",
      area: "180 m²",
      bedrooms: 2,
      bathrooms: 2.5,
      terrace: "28 m² Balcón Profundo",
      price: "$340,000 USD",
      rawPrice: 340000,
      blueprint: "https://images.unsplash.com/photo-1600573472550-8090b5e0745e?auto=format&fit=crop&w=1000&q=80",
      hotspots: [
        { id: 1, title: "Open Living & Dining", desc: "Conexión directa al balcón exterior mediante canceles europeos corredizos.", top: "50%", left: "50%" },
        { id: 2, title: "Suite Secundaria", desc: "Baño completo en suite, closet empotrado y balcón independiente.", top: "30%", left: "70%" },
        { id: 3, title: "Área de Lavado Integrada", desc: "Centro de lavado oculto con ventilación natural y sink de servicio.", top: "70%", left: "30%" },
        { id: 4, title: "Vestíbulo de Acceso", desc: "Puerta de seguridad blindada con chapa biométrica inteligente.", top: "25%", left: "40%" }
      ]
    }
  };

  // Pre-calculated Investment Dossier Packages
  const dossierPackages = [
    {
      title: "Preventa Exclusiva (30/70)",
      badge: "Más Popular",
      discount: "Descuento del 4% aplicado",
      downPayment: "30% durante la obra ($135,000 USD)",
      monthly: "$4,950 USD / mes (24 Mensualidades)",
      finalPayment: "70% contra entrega de llaves (Financiable)",
      benefits: [
        "Elección prioritaria de nivel y orientación de vista",
        "Personalización de acabados de mármol y carpintería sin costo",
        "Garantía de plusvalía por contrato del 15% mínimo"
      ]
    },
    {
      title: "Pago de Contado Inversionista",
      badge: "Máximo Ahorro",
      discount: "8% de Descuento Directo",
      downPayment: "100% al firmar contrato de compraventa",
      monthly: "$0 USD (Sin financiamiento)",
      finalPayment: "Liquidado totalmente",
      benefits: [
        "Ahorro de hasta $45,000 USD en el valor total",
        "Asignación de 2 cajones de estacionamiento VIP cubiertos",
        "Membresía vitalicia al Club de Yates y Spa del desarrollo"
      ]
    },
    {
      title: "Financiamiento Directo 48 Meses",
      badge: "Flexible",
      discount: "Sin revisión de buró tradicional",
      downPayment: "20% Inicial ($90,000 USD)",
      monthly: "$6,200 USD / mes durante 48 meses",
      finalPayment: "Saldo final ajustado al mes 48",
      benefits: [
        "Tasa fija garantizada directo con la constructora",
        "Posibilidad de aportaciones a capital sin penalización",
        "Cesión de derechos permitida antes de la entrega"
      ]
    }
  ];

  // Gallery items with 100% strict real estate coherence
  const galleryItems = [
    { id: 1, cat: 'fachada', title: 'Fachada Bioclimática Externa (Vista Nocturna)', img: 'https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?auto=format&fit=crop&w=1000&q=80' },
    { id: 2, cat: 'fachada', title: 'Acceso Principal y Torre Residencial de Lujo', img: 'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&w=1000&q=80' },
    { id: 3, cat: 'interiores', title: 'Sala Principal Horizon Penthouse con Doble Altura', img: 'https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?auto=format&fit=crop&w=1000&q=80' },
    { id: 4, cat: 'interiores', title: 'Cocina Gourmet con Isla de Mármol Carrara', img: 'https://images.unsplash.com/photo-1556911220-e15b29be8c8f?auto=format&fit=crop&w=1000&q=80' },
    { id: 5, cat: 'interiores', title: 'Master Suite con Vestidor y Vista Panorámica', img: 'https://images.unsplash.com/photo-1616594039964-ae9021a400a0?auto=format&fit=crop&w=1000&q=80' },
    { id: 6, cat: 'amenidades', title: 'Piscina Infinity Rooftop & Deck Solárium', img: 'https://images.unsplash.com/photo-1582719508461-905c673771fd?auto=format&fit=crop&w=1000&q=80' },
    { id: 7, cat: 'amenidades', title: 'Wellness Spa y Club Privado de Residentes', img: 'https://images.unsplash.com/photo-1540555700478-4be289fbecef?auto=format&fit=crop&w=1000&q=80' },
    { id: 8, cat: 'amenidades', title: 'Gimnasio Profesional Equipado Technogym', img: 'https://images.unsplash.com/photo-1534438327276-14e5300c3a48?auto=format&fit=crop&w=1000&q=80' }
  ];

  // Certified luxury finishes with exact custom local photography
  const finishes = [
    {
      name: "Mármol Carrara & Calacatta",
      type: "Revestimientos & Baños",
      desc: "Importado directamente de canteras italianas con sellado nanotecnológico anti-manchas en pisos y cubiertas.",
      image: "/carrara.jpg"
    },
    {
      name: "Ventanales Doble Vidrio Térmico (Low-E)",
      type: "Ventanería & Cancelería",
      desc: "Aislamiento acústico de 42dB y filtro solar UV del 95% con perfilería de aluminio europeo anonizado.",
      image: "/ventanales.webp"
    },
    {
      name: "Madera Teca de Origen Sostenible",
      type: "Pisos Exteriores & Terrazas",
      desc: "Tratamiento de grado marino de alta resistencia al ambiente salino, con certificación forestal FSC.",
      image: "/teca.jpg"
    }
  ];

  const filteredGallery = galleryFilter === 'all' 
    ? galleryItems 
    : galleryItems.filter(item => item.cat === galleryFilter);

  const handleTourFormSubmit = (e) => {
    e.preventDefault();
    setTourSubmitted(true);
  };

  return (
    <div className="min-h-screen bg-[#141210] text-[#E7E2DC] font-sans antialiased selection:bg-[#C2783E] selection:text-white relative overflow-x-hidden">
      
      {/* Toast Notification */}
      {toastMessage && (
        <div className="fixed top-4 right-4 left-4 sm:left-auto sm:right-6 z-50 bg-[#1C1917] text-[#E7E2DC] px-4 py-3 rounded-2xl shadow-2xl border border-[#C2783E]/50 flex items-center gap-3 backdrop-blur-md">
          <Download className="w-5 h-5 text-[#C2783E] animate-bounce flex-shrink-0" />
          <span className="text-xs sm:text-sm font-medium">{toastMessage}</span>
        </div>
      )}

      {/* Floating WhatsApp & Appointment Action Buttons (Optimized for Mobile view) */}
      <div className="fixed bottom-4 right-4 sm:bottom-6 sm:right-6 z-40 flex items-center gap-2 sm:gap-3">
        <button 
          onClick={handleWhatsAppRedirect}
          className="bg-[#1C1917] hover:bg-[#292524] text-[#E7E2DC] p-3.5 sm:p-4 rounded-full shadow-2xl transition-all hover:scale-105 flex items-center gap-2 font-medium text-sm group cursor-pointer border border-[#C2783E]/40"
          title="Contacto Directo WhatsApp VIP"
        >
          <MessageSquare className="w-5 h-5 text-[#C2783E]" />
          <span className="hidden md:inline font-semibold text-xs tracking-wider">WhatsApp Directo</span>
        </button>

        <button 
          onClick={() => setIsTourModalOpen(true)}
          className="bg-gradient-to-r from-[#C2783E] to-[#B45309] text-white px-4 sm:px-5 py-3.5 rounded-full shadow-2xl transition-all hover:scale-105 flex items-center gap-2 font-bold text-xs uppercase tracking-wider cursor-pointer border border-amber-600/30"
        >
          <Calendar className="w-4 h-4 flex-shrink-0" />
          <span className="hidden xs:inline">Agendar Cita</span>
        </button>
      </div>

      {/* Header / Navigation (Responsive adjustments) */}
      <header className="sticky top-0 z-30 bg-[#141210]/90 backdrop-blur-md border-b border-[#292524] transition-all">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between">
          
          <div className="flex items-center gap-2.5 sm:gap-3">
            <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-xl bg-[#1C1917] flex items-center justify-center text-[#C2783E] shadow-md border border-[#C2783E]/30">
              <Building2 className="w-5 h-5 sm:w-6 sm:h-6" />
            </div>
            <div>
              <span className="text-base sm:text-xl font-serif font-bold tracking-wider text-white block leading-none">AURA HORIZON</span>
              <span className="text-[9px] sm:text-[10px] text-[#A8A29E] tracking-[0.15em] sm:tracking-[0.2em] uppercase font-bold">Residences</span>
            </div>
          </div>

          <nav className="hidden lg:flex items-center gap-8 text-sm font-medium text-stone-300">
            <a href="#hero" className="hover:text-[#C2783E] transition-colors">Inicio</a>
            <a href="#video-tour" className="hover:text-[#C2783E] transition-colors">Recorrido 4K</a>
            <a href="#proyectos" className="hover:text-[#C2783E] transition-colors">Residencias</a>
            <a href="#acabados" className="hover:text-[#C2783E] transition-colors">Acabados</a>
            <a href="#calculadora" className="hover:text-[#C2783E] transition-colors">Simulador</a>
          </nav>

          <div className="flex items-center gap-2 sm:gap-3">
            <button 
              onClick={() => setIsDossierOpen(true)}
              className="hidden sm:flex items-center gap-2 text-xs font-semibold text-[#C2783E] hover:text-white px-3.5 sm:px-4 py-2.5 rounded-xl border border-[#C2783E]/30 hover:border-[#C2783E] transition-all cursor-pointer bg-[#1C1917]/50"
            >
              <Download className="w-4 h-4 text-[#C2783E]" />
              <span>Dossier</span>
            </button>

            <button 
              onClick={() => setIsTourModalOpen(true)}
              className="bg-[#C2783E] hover:bg-[#B45309] text-white font-bold text-[11px] sm:text-xs uppercase tracking-wider px-3.5 sm:px-5 py-2.5 rounded-xl shadow-md transition-all cursor-pointer border border-amber-600/30"
            >
              Cita
            </button>
          </div>

        </div>
      </header>

      {/* 1. HERO SECTION */}
      <section id="hero" className="relative pt-8 sm:pt-12 pb-16 sm:pb-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <div className="grid lg:grid-cols-12 gap-8 lg:gap-12 items-center">
          
          <div className="lg:col-span-7 space-y-5 sm:space-y-6">
            <div className="inline-flex items-center px-3.5 py-1 rounded-full bg-[#1C1917] border border-[#C2783E]/30 text-[#C2783E]">
              <span className="text-[11px] sm:text-xs font-semibold uppercase tracking-widest">Preventa Exclusiva 2027</span>
            </div>

            <h1 className="text-3xl sm:text-5xl lg:text-6xl font-serif font-bold text-white tracking-tight leading-[1.15]">
              Construimos espacios residenciales de lujo con <span className="text-[#C2783E] underline decoration-amber-600/50 underline-offset-8">arquitectura bioclimática</span>
            </h1>

            <p className="text-sm sm:text-lg text-stone-300 font-light leading-relaxed max-w-2xl">
              Residencias exclusivas de <strong>180m² a 350m²</strong> diseñadas para ofrecer máxima plusvalía, aislamiento acústico térmico superior y acabados importados de primera calidad.
            </p>

            <div className="pt-1 sm:pt-2 flex flex-col sm:flex-row items-stretch sm:items-center gap-3 sm:gap-4">
              <button 
                onClick={() => setIsTourModalOpen(true)}
                className="bg-[#C2783E] hover:bg-[#B45309] text-white font-bold px-6 sm:px-7 py-3.5 sm:py-4 rounded-xl shadow-xl hover:scale-[1.02] transition-all flex items-center justify-center gap-2 sm:gap-3 cursor-pointer text-xs sm:text-sm"
              >
                <Calendar className="w-4 h-4 sm:w-5 sm:h-5 text-white flex-shrink-0" />
                <span>Agendar Recorrido Presencial</span>
                <ChevronRight className="w-4 h-4 flex-shrink-0" />
              </button>

              <button 
                onClick={() => setIsDossierOpen(true)}
                className="bg-[#1C1917] hover:bg-[#292524] text-white font-semibold px-5 sm:px-6 py-3.5 sm:py-4 rounded-xl border border-[#292524] hover:border-[#C2783E] transition-all flex items-center justify-center gap-2 cursor-pointer text-xs sm:text-sm shadow-sm"
              >
                <FileText className="w-4 h-4 sm:w-5 sm:h-5 text-[#C2783E] flex-shrink-0" />
                <span>Ver Dossier & Cotizaciones</span>
              </button>
            </div>

            <div className="pt-5 sm:pt-6 border-t border-[#292524] grid grid-cols-3 gap-4 sm:gap-6">
              <div>
                <span className="block text-xl sm:text-2xl font-bold font-serif text-white">18%</span>
                <span className="text-[10px] sm:text-xs text-stone-400">Plusvalía anual proyectada</span>
              </div>
              <div>
                <span className="block text-xl sm:text-2xl font-bold font-serif text-white">30/70</span>
                <span className="text-[10px] sm:text-xs text-stone-400">Esquema de pago diferido</span>
              </div>
              <div>
                <span className="block text-xl sm:text-2xl font-bold font-serif text-white">BREEAM</span>
                <span className="text-[10px] sm:text-xs text-stone-400">Certificado bioclimático</span>
              </div>
            </div>
          </div>

          <div className="lg:col-span-5" id="video-tour">
            <div className="bg-[#1C1917] border border-[#292524] rounded-2xl sm:rounded-3xl p-3 sm:p-4 shadow-2xl relative overflow-hidden group">
              
              <div className="relative rounded-xl sm:rounded-2xl overflow-hidden bg-black aspect-video sm:aspect-square border border-[#292524]">
                <video 
                  ref={videoRef}
                  className="w-full h-full object-cover"
                  loop
                  muted={isMuted}
                  playsInline
                  autoPlay
                  poster={renderPosterUrl}
                >
                  <source src={renderVideoUrl} type="video/mp4" />
                  Tu navegador no soporta reproducción de video HTML5.
                </video>

                <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/20 to-black/40 flex flex-col justify-between p-3 sm:p-4">
                  <div className="flex justify-between items-center">
                    <span className="px-2.5 sm:px-3 py-1 rounded-full bg-black/60 backdrop-blur-md text-white text-[9px] sm:text-[10px] font-mono uppercase tracking-wider flex items-center gap-1.5 border border-[#C2783E]/40">
                      <span className="w-1.5 h-1.5 sm:w-2 sm:h-2 rounded-full bg-[#C2783E] animate-ping"></span> Render 4K
                    </span>

                    <button 
                      onClick={toggleMute} 
                      className="p-2 rounded-full bg-black/60 backdrop-blur-md text-white hover:bg-black transition-all cursor-pointer border border-white/10"
                    >
                      {isMuted ? <VolumeX className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-stone-300" /> : <Volume2 className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-[#C2783E]" />}
                    </button>
                  </div>

                  <div className="flex justify-center items-center">
                    <button 
                      onClick={togglePlay}
                      className="w-14 h-14 sm:w-16 sm:h-16 rounded-full bg-[#C2783E] text-white flex items-center justify-center shadow-2xl hover:scale-110 transition-transform cursor-pointer border-2 border-amber-500/50"
                    >
                      {isPlaying ? <Pause className="w-6 h-6 sm:w-7 sm:h-7 fill-current" /> : <Play className="w-6 h-6 sm:w-7 sm:h-7 fill-current ml-1" />}
                    </button>
                  </div>

                  <div className="flex justify-between items-center text-[11px] sm:text-xs text-white bg-black/40 backdrop-blur-sm p-2 rounded-xl border border-white/5">
                    <span className="font-mono text-[10px] sm:text-[11px] text-[#C2783E] font-semibold truncate pr-2">Residencia Moderna • Vista Nocturna</span>
                    <button 
                      onClick={() => {
                        if (videoRef.current && videoRef.current.requestFullscreen) {
                          videoRef.current.requestFullscreen();
                        }
                      }}
                      className="text-[10px] text-stone-300 hover:text-white flex items-center gap-1 cursor-pointer flex-shrink-0"
                    >
                      <Maximize2 className="w-3.5 h-3.5 text-[#C2783E]" /> <span className="hidden xs:inline">Pantalla Completa</span>
                    </button>
                  </div>
                </div>
              </div>

              <div className="mt-3 sm:mt-4 p-1.5 sm:p-2 flex items-center justify-between text-xs text-stone-400">
                <span className="flex items-center gap-1.5 font-medium text-stone-300 text-[11px] sm:text-xs">
                  <ShieldCheck className="w-4 h-4 text-[#C2783E] flex-shrink-0" /> Render Hiperrealista & Obra Real
                </span>
                <button 
                  onClick={() => setIsTourModalOpen(true)}
                  className="text-[#C2783E] font-bold hover:underline cursor-pointer text-[11px] sm:text-xs"
                >
                  Cita &rarr;
                </button>
              </div>

            </div>
          </div>

        </div>
      </section>

      {/* 2. SOCIAL PROOF */}
      <section className="py-10 sm:py-12 bg-[#1C1917] border-y border-[#292524]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 sm:gap-8 text-center">
            <div className="p-2 sm:p-4 border-r md:border-r border-[#292524] [&:nth-child(even)]:border-r-0 md:[&:nth-child(even)]:border-r">
              <span className="text-2xl sm:text-4xl font-serif font-bold text-white block mb-1">+120,000 m²</span>
              <span className="text-[10px] sm:text-xs text-stone-400 font-medium uppercase tracking-wider">Construidos y Entregados</span>
            </div>
            <div className="p-2 sm:p-4 border-r md:border-r border-[#292524] last:border-0">
              <span className="text-2xl sm:text-4xl font-serif font-bold text-white block mb-1">15 Años</span>
              <span className="text-[10px] sm:text-xs text-stone-400 font-medium uppercase tracking-wider">Trayectoria en el Nicho</span>
            </div>
            <div className="p-2 sm:p-4 border-r md:border-r border-[#292524] [&:nth-child(even)]:border-r-0 md:[&:nth-child(even)]:border-r">
              <span className="text-2xl sm:text-4xl font-serif font-bold text-white block mb-1">99.4%</span>
              <span className="text-[10px] sm:text-xs text-stone-400 font-medium uppercase tracking-wider">Cumplimiento en Tiempos</span>
            </div>
            <div className="p-2 sm:p-4">
              <span className="text-2xl sm:text-4xl font-serif font-bold text-white block mb-1">AA+</span>
              <span className="text-[10px] sm:text-xs text-stone-400 font-medium uppercase tracking-wider">Calificación de Solvencia</span>
            </div>
          </div>
        </div>
      </section>

      {/* 3. FLOOR PLAN & GALLERY */}
      <section id="proyectos" className="py-16 sm:py-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-10 sm:mb-12">
          <span className="text-xs font-mono text-[#C2783E] uppercase tracking-widest block mb-2">Planta Arquitectónica</span>
          <h2 className="text-2xl sm:text-4xl font-serif font-bold text-white">Explora Nuestras Residencias</h2>
          <p className="text-stone-400 text-xs sm:text-sm mt-3 px-2">Selecciona una tipología para inspeccionar las características y planos arquitectónicos.</p>
        </div>

        <div className="flex justify-start sm:justify-center gap-2 sm:gap-3 mb-8 sm:mb-10 overflow-x-auto pb-3 px-1 scrollbar-none">
          {Object.keys(floorPlans).map((key) => {
            const plan = floorPlans[key];
            const isActive = selectedFloorPlan === key;
            return (
              <button
                key={key}
                onClick={() => {
                  setSelectedFloorPlan(key);
                  setPropertyPrice(plan.rawPrice);
                }}
                className={`px-4 sm:px-6 py-2.5 sm:py-3 rounded-xl font-medium text-xs sm:text-sm transition-all whitespace-nowrap cursor-pointer flex items-center gap-2 border flex-shrink-0 ${
                  isActive 
                    ? 'bg-[#C2783E] text-white border-[#C2783E] shadow-lg' 
                    : 'bg-[#1C1917] text-stone-300 border-[#292524] hover:border-stone-600'
                }`}
              >
                <Building2 className="w-4 h-4 text-white flex-shrink-0" />
                <span>{plan.name}</span>
                <span className={`text-[10px] sm:text-xs py-0.5 px-2 rounded-full font-mono ${isActive ? 'bg-black/30 text-white' : 'bg-[#292524] text-stone-400'}`}>
                  {plan.area}
                </span>
              </button>
            );
          })}
        </div>

        {(() => {
          const currentPlan = floorPlans[selectedFloorPlan];
          return (
            <div className="bg-[#1C1917] border border-[#292524] rounded-2xl sm:rounded-3xl p-5 sm:p-8 grid lg:grid-cols-12 gap-6 sm:gap-8 items-center shadow-2xl">
              
              <div className="lg:col-span-7 relative rounded-xl sm:rounded-2xl overflow-hidden bg-black border border-[#292524] group">
                <img 
                  src={currentPlan.blueprint} 
                  alt={currentPlan.name} 
                  className="w-full h-[300px] sm:h-[420px] object-cover opacity-85 group-hover:scale-105 transition-transform duration-700"
                />
                
                {currentPlan.hotspots.map((spot) => (
                  <div 
                    key={spot.id} 
                    style={{ top: spot.top, left: spot.left }}
                    className="absolute -translate-x-1/2 -translate-y-1/2 group/spot cursor-pointer"
                  >
                    <div className="w-7 h-7 sm:w-8 sm:h-8 rounded-full bg-[#C2783E] text-white font-bold text-xs flex items-center justify-center shadow-xl animate-bounce border-2 border-white">
                      {spot.id}
                    </div>
                    <div className="absolute left-1/2 bottom-full mb-2 -translate-x-1/2 w-52 sm:w-60 bg-black text-white rounded-xl p-3 shadow-2xl opacity-0 group-hover/spot:opacity-100 transition-opacity pointer-events-none z-20 border border-[#C2783E]/50">
                      <h5 className="text-xs font-bold text-[#C2783E] mb-1">{spot.title}</h5>
                      <p className="text-[11px] text-stone-300 leading-tight">{spot.desc}</p>
                    </div>
                  </div>
                ))}

                <div className="absolute bottom-3 left-3 right-3 sm:left-4 sm:right-auto bg-black/80 backdrop-blur-md px-3 py-1.5 rounded-lg text-[11px] sm:text-xs text-white flex items-center gap-2 border border-white/10">
                  <Info className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-[#C2783E] flex-shrink-0" />
                  <span>Inspecciona los 4 puntos clave interactivos</span>
                </div>
              </div>

              <div className="lg:col-span-5 space-y-5 sm:space-y-6">
                <div>
                  <span className="text-[11px] sm:text-xs font-mono text-[#C2783E] uppercase tracking-wider block mb-1">{currentPlan.subtitle}</span>
                  <h3 className="text-2xl sm:text-3xl font-serif font-bold text-white">{currentPlan.name}</h3>
                  <div className="text-xl sm:text-2xl font-serif font-bold text-[#C2783E] mt-2">{currentPlan.price}</div>
                </div>

                <div className="grid grid-cols-2 gap-3 sm:gap-4 py-3 sm:py-4 border-y border-[#292524]">
                  <div>
                    <span className="text-[11px] sm:text-xs text-stone-400 block">Superficie</span>
                    <span className="text-xs sm:text-sm font-bold text-white">{currentPlan.area}</span>
                  </div>
                  <div>
                    <span className="text-[11px] sm:text-xs text-stone-400 block">Habitaciones</span>
                    <span className="text-xs sm:text-sm font-bold text-white">{currentPlan.bedrooms} Master Suites</span>
                  </div>
                  <div>
                    <span className="text-[11px] sm:text-xs text-stone-400 block">Baños</span>
                    <span className="text-xs sm:text-sm font-bold text-white">{currentPlan.bathrooms} Baños</span>
                  </div>
                  <div>
                    <span className="text-[11px] sm:text-xs text-stone-400 block">Exterior Privado</span>
                    <span className="text-xs sm:text-sm font-bold text-white">{currentPlan.terrace}</span>
                  </div>
                </div>

                <div className="space-y-3">
                  <button 
                    onClick={() => setIsTourModalOpen(true)}
                    className="w-full bg-[#C2783E] hover:bg-[#B45309] text-white font-bold py-3.5 rounded-xl transition-all cursor-pointer shadow-md flex items-center justify-center gap-2 text-xs uppercase tracking-wider"
                  >
                    <Calendar className="w-4 h-4 text-white flex-shrink-0" />
                    <span>Reservar Visita a esta Planta</span>
                  </button>

                  <button 
                    onClick={() => setIsDossierOpen(true)}
                    className="w-full bg-[#1C1917] hover:bg-[#292524] text-white font-medium py-3 rounded-xl border border-[#292524] text-xs transition-all cursor-pointer flex items-center justify-center gap-2"
                  >
                    <Download className="w-4 h-4 text-[#C2783E] flex-shrink-0" />
                    <span>Descargar Ficha en Dossier</span>
                  </button>
                </div>
              </div>

            </div>
          );
        })()}

        <div className="mt-16 sm:mt-20">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-6 sm:mb-8 gap-4">
            <div>
              <span className="text-xs font-mono text-[#C2783E] uppercase tracking-widest block mb-1">Galería High-Res</span>
              <h3 className="text-xl sm:text-2xl font-serif font-bold text-white">Inspección Visual de Proyectos</h3>
            </div>

            <div className="flex flex-wrap gap-1.5 sm:gap-2">
              {[
                { id: 'all', label: 'Ver Todo' },
                { id: 'interiores', label: 'Interiores' },
                { id: 'amenidades', label: 'Amenidades' },
                { id: 'fachada', label: 'Fachadas' }
              ].map(tab => (
                <button
                  key={tab.id}
                  onClick={() => setGalleryFilter(tab.id)}
                  className={`px-3 sm:px-4 py-2 rounded-lg text-xs font-medium transition-all cursor-pointer ${
                    galleryFilter === tab.id 
                      ? 'bg-[#C2783E] text-white font-bold' 
                      : 'bg-[#1C1917] text-stone-300 hover:bg-[#292524] border border-[#292524]'
                  }`}
                >
                  {tab.label}
                </button>
              ))}
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
            {filteredGallery.map(item => (
              <div 
                key={item.id}
                onClick={() => setLightboxImage(item)}
                className="group relative h-60 sm:h-64 rounded-2xl overflow-hidden cursor-pointer border border-[#292524] bg-black"
              >
                <img 
                  src={item.img} 
                  alt={item.title} 
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700 opacity-90"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent opacity-80"></div>
                <div className="absolute bottom-4 left-4 right-4 flex items-center justify-between text-white">
                  <div>
                    <span className="text-[10px] font-mono uppercase text-[#C2783E] block">{item.cat}</span>
                    <h4 className="text-xs font-bold font-serif">{item.title}</h4>
                  </div>
                  <Maximize2 className="w-4 h-4 text-[#C2783E] flex-shrink-0" />
                </div>
              </div>
            ))}
          </div>
        </div>

      </section>

      {/* 4. MATERIALS & FINISHES */}
      <section id="acabados" className="py-16 sm:py-20 bg-[#1C1917] border-t border-[#292524]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-12 gap-8 lg:gap-12 items-center">
            <div className="lg:col-span-5 space-y-5 sm:space-y-6">
              <span className="text-xs font-mono text-[#C2783E] uppercase tracking-widest block">Estándar de Construcción</span>
              <h2 className="text-2xl sm:text-3xl font-serif font-bold text-white">Materiales & Acabados Certificados</h2>
              <p className="text-stone-300 text-xs sm:text-sm leading-relaxed">
                Seleccionamos componentes de grado de ingeniería resistente a zonas costeras y clima tropical, garantizando durabilidad y bajo mantenimiento.
              </p>

              <div className="space-y-3">
                {finishes.map((item, idx) => (
                  <div 
                    key={idx}
                    onClick={() => setSelectedFinish(idx)}
                    className={`p-3.5 sm:p-4 rounded-2xl cursor-pointer transition-all border ${
                      selectedFinish === idx 
                        ? 'bg-[#141210] border-[#C2783E] shadow-md text-white' 
                        : 'bg-black/40 border-[#292524] text-stone-400 hover:border-stone-600'
                    }`}
                  >
                    <div className="flex justify-between items-center mb-1">
                      <h4 className="text-xs sm:text-sm font-bold">{item.name}</h4>
                      <span className="text-[9px] sm:text-[10px] font-mono text-[#C2783E] uppercase">{item.type}</span>
                    </div>
                    <p className="text-[11px] sm:text-xs text-stone-400">{item.desc}</p>
                  </div>
                ))}
              </div>
            </div>

            <div className="lg:col-span-7">
              <div className="relative h-[280px] sm:h-[400px] rounded-2xl sm:rounded-3xl overflow-hidden border border-[#292524] shadow-2xl bg-black">
                <img 
                  src={finishes[selectedFinish].image} 
                  alt={finishes[selectedFinish].name}
                  className="w-full h-full object-cover transition-all duration-700 opacity-90"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-transparent to-transparent"></div>
                <div className="absolute bottom-4 left-4 right-4 sm:bottom-6 sm:left-6 sm:right-6 p-3.5 sm:p-4 rounded-xl sm:rounded-2xl bg-[#1C1917]/95 backdrop-blur-md border border-[#292524] flex flex-col sm:flex-row justify-between items-start sm:items-center gap-2">
                  <div>
                    <span className="text-[10px] sm:text-xs text-[#C2783E] font-mono block">Especificación Técnica</span>
                    <span className="text-xs sm:text-sm font-bold text-white">{finishes[selectedFinish].name}</span>
                  </div>
                  <span className="px-3 py-1 bg-[#C2783E] text-white text-[10px] sm:text-xs font-semibold rounded-full flex-shrink-0">
                    Garantía 10 Años
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 5. INTERACTIVE MORTGAGE & PAYMENT CALCULATOR */}
      <section id="calculadora" className="py-16 sm:py-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-[#1C1917] text-white border border-[#292524] rounded-2xl sm:rounded-3xl p-6 sm:p-8 lg:p-12 shadow-2xl">
          <div className="grid lg:grid-cols-12 gap-8 lg:gap-12 items-center">
            
            <div className="lg:col-span-6 space-y-5 sm:space-y-6">
              <span className="text-xs font-mono text-[#C2783E] uppercase tracking-widest block">Simulaciones de Pago</span>
              <h2 className="text-2xl sm:text-3xl font-serif font-bold">Calculadora de Cuota de Preventa</h2>
              <p className="text-stone-300 text-xs sm:text-sm">
                Ajusta los parámetros para conocer la cuota mensual durante la fase de construcción de la obra.
              </p>

              {/* Slider 1: Valor de la Unidad */}
              <div className="space-y-2">
                <div className="flex justify-between text-xs font-semibold">
                  <span className="text-stone-400">Valor de la Unidad</span>
                  <span className="text-[#C2783E] font-mono">${propertyPrice.toLocaleString()} USD</span>
                </div>
                <input 
                  type="range" 
                  min="300000" 
                  max="800000" 
                  step="10000"
                  value={propertyPrice} 
                  onChange={(e) => setPropertyPrice(Number(e.target.value))}
                  className="w-full accent-[#C2783E] cursor-pointer bg-[#292524] h-2 rounded-lg"
                />
              </div>

              {/* Slider 2: Porcentaje de Enganche */}
              <div className="space-y-2">
                <div className="flex justify-between text-xs font-semibold">
                  <span className="text-stone-400">Porcentaje de Enganche (% Inicial)</span>
                  <span className="text-[#C2783E] font-mono">{downPaymentPercent}% (${downPaymentAmount.toLocaleString()} USD)</span>
                </div>
                <input 
                  type="range" 
                  min="20" 
                  max="50" 
                  step="5"
                  value={downPaymentPercent} 
                  onChange={(e) => setDownPaymentPercent(Number(e.target.value))}
                  className="w-full accent-[#C2783E] cursor-pointer bg-[#292524] h-2 rounded-lg"
                />
              </div>

              {/* Slider 3: Meses de Obra Diferida */}
              <div className="space-y-2">
                <div className="flex justify-between text-xs font-semibold">
                  <span className="text-stone-400">Meses de Obra Diferida</span>
                  <span className="text-[#C2783E] font-mono">{termMonths} Meses</span>
                </div>
                <input 
                  type="range" 
                  min="12" 
                  max="48" 
                  step="6"
                  value={termMonths} 
                  onChange={(e) => setTermMonths(Number(e.target.value))}
                  className="w-full accent-[#C2783E] cursor-pointer bg-[#292524] h-2 rounded-lg"
                />
              </div>
            </div>

            <div className="lg:col-span-6">
              <div className="bg-[#141210] border border-[#292524] rounded-2xl p-5 sm:p-8 space-y-5 sm:space-y-6 relative overflow-hidden">
                <div className="border-b border-[#292524] pb-5 sm:pb-6">
                  <span className="text-[11px] sm:text-xs text-stone-400 uppercase tracking-wider block mb-1">Pago Mensual Estimado en Obra</span>
                  <span className="text-3xl sm:text-5xl font-serif font-bold text-[#C2783E] font-mono block truncate">
                    ${Math.round(monthlyPayment).toLocaleString()} <span className="text-xs sm:text-sm font-sans text-stone-300">USD/mes</span>
                  </span>
                </div>

                <div className="space-y-3 text-xs text-stone-300">
                  <div className="flex justify-between py-1 border-b border-[#292524]">
                    <span>Monto de Inicial ({downPaymentPercent}%):</span>
                    <span className="font-mono font-bold text-white">${downPaymentAmount.toLocaleString()} USD</span>
                  </div>
                  <div className="flex justify-between py-1 border-b border-[#292524]">
                    <span>Saldo a la Entrega de Llaves:</span>
                    <span className="font-mono font-bold text-white">${remainingBalance.toLocaleString()} USD</span>
                  </div>
                  <div className="flex justify-between py-1">
                    <span>Financiamiento Directo:</span>
                    <span className="font-mono text-[#C2783E] font-bold">0% Intereses con Constructora</span>
                  </div>
                </div>

                <button 
                  onClick={handleDownloadCalculatorPDF}
                  className="w-full bg-[#C2783E] hover:bg-[#B45309] text-white font-bold py-3.5 sm:py-4 rounded-xl text-xs uppercase tracking-wider transition-all cursor-pointer shadow-lg flex items-center justify-center gap-2"
                >
                  <FileText className="w-4 h-4 flex-shrink-0" />
                  <span>Obtener Cotización Formal en Dossier</span>
                </button>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="bg-[#141210] text-stone-400 text-xs py-10 sm:py-12 pb-32 border-t border-[#292524]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row justify-between items-center gap-6 text-center sm:text-left">
          <div className="flex flex-col sm:flex-row items-center gap-3">
            <div className="w-8 h-8 rounded bg-[#1C1917] text-[#C2783E] flex items-center justify-center font-bold border border-[#C2783E]/30 flex-shrink-0">
              AH
            </div>
            <div>
              <span className="font-serif font-bold text-white block">AURA HORIZON BUILDERS</span>
              <span className="text-[11px]">© 2026 Desarrollos Inmobiliarios de Lujo.</span>
            </div>
          </div>

          <div className="flex flex-wrap justify-center gap-4 sm:gap-6 text-[11px] sm:text-xs">
            <a href="#hero" className="hover:text-[#C2783E]">Privacidad</a>
            <a href="#hero" className="hover:text-[#C2783E]">Términos de Preventa</a>
            <a href="#hero" className="hover:text-[#C2783E]">Licencia Ambiental</a>
          </div>
        </div>
      </footer>

      {/* MODAL 1: DOSSIER DE PRECIOS */}
      {isDossierOpen && (
        <div className="fixed inset-0 z-50 bg-black/85 backdrop-blur-md flex items-center justify-center p-3 sm:p-4 overflow-y-auto">
          <div className="bg-[#1C1917] border border-[#292524] rounded-2xl sm:rounded-3xl max-w-4xl w-full p-4 sm:p-8 relative shadow-2xl my-8 text-white max-h-[90vh] overflow-y-auto">
            
            <button 
              onClick={() => setIsDossierOpen(false)}
              className="absolute top-4 right-4 sm:top-6 sm:right-6 text-stone-400 hover:text-white p-2 rounded-full bg-[#292524] cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="mb-6 sm:mb-8 pr-8">
              <span className="text-[11px] sm:text-xs font-mono text-[#C2783E] uppercase tracking-widest block mb-1">Documento Oficial de Cotización</span>
              <h3 className="text-xl sm:text-3xl font-serif font-bold text-white">Dossier de Precios & Planes de Inversión</h3>
              <p className="text-xs sm:text-sm text-stone-300 mt-1">
                Selecciona la modalidad de pago que mejor se adecue a tu estrategia financiera o descarga la ficha completa en PDF.
              </p>
            </div>

            <div className="grid md:grid-cols-3 gap-4 sm:gap-6 mb-6 sm:mb-8">
              {dossierPackages.map((pkg, idx) => (
                <div key={idx} className="bg-[#141210] border border-[#292524] rounded-2xl p-4 sm:p-5 shadow-sm hover:border-[#C2783E] transition-all flex flex-col justify-between">
                  <div>
                    <div className="flex items-center justify-between mb-3">
                      <span className="text-[10px] font-bold font-mono px-2.5 py-1 bg-[#C2783E]/20 text-[#C2783E] rounded-md border border-[#C2783E]/30">
                        {pkg.badge}
                      </span>
                      <span className="text-[10px] text-stone-400 font-semibold">{pkg.discount}</span>
                    </div>

                    <h4 className="font-serif font-bold text-sm sm:text-base text-white mb-2">{pkg.title}</h4>
                    
                    <div className="space-y-2 text-xs py-3 border-y border-[#292524] my-3">
                      <div>
                        <span className="text-stone-400 block text-[10px]">Cuota Inicial</span>
                        <span className="font-bold text-[#C2783E]">{pkg.downPayment}</span>
                      </div>
                      <div>
                        <span className="text-stone-400 block text-[10px]">Mensualidad Estimada</span>
                        <span className="font-bold text-white">{pkg.monthly}</span>
                      </div>
                    </div>

                    <ul className="space-y-1.5 text-[11px] text-stone-300 mb-4">
                      {pkg.benefits.map((b, i) => (
                        <li key={i} className="flex items-start gap-1.5">
                          <Check className="w-3.5 h-3.5 text-[#C2783E] flex-shrink-0 mt-0.5" />
                          <span>{b}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  <button 
                    onClick={() => handleDownloadPDF(pkg)}
                    className="w-full bg-[#C2783E] hover:bg-[#B45309] text-white text-xs font-semibold py-2.5 rounded-xl transition-all flex items-center justify-center gap-2 cursor-pointer shadow-md"
                  >
                    <Download className="w-3.5 h-3.5 text-white flex-shrink-0" />
                    <span>Descargar PDF</span>
                  </button>
                </div>
              ))}
            </div>

            <div className="bg-black/50 rounded-2xl p-3.5 sm:p-4 flex flex-col sm:flex-row justify-between items-center gap-3 text-xs text-stone-300 border border-[#292524] text-center sm:text-left">
              <span className="flex items-center gap-2">
                <Info className="w-4 h-4 text-[#C2783E] flex-shrink-0" /> Precios sujetos a ajuste por avance de obra. Validez: 15 días.
              </span>
              <button 
                onClick={() => {
                  setIsDossierOpen(false);
                  setIsTourModalOpen(true);
                }}
                className="text-[#C2783E] font-bold underline hover:text-white cursor-pointer flex-shrink-0"
              >
                Agendar Cita &rarr;
              </button>
            </div>

          </div>
        </div>
      )}

      {/* MODAL 2: TOUR FORM */}
      {isTourModalOpen && (
        <div className="fixed inset-0 z-50 bg-black/85 backdrop-blur-md flex items-center justify-center p-3 sm:p-4 overflow-y-auto">
          <div className="bg-[#1C1917] border border-[#292524] rounded-2xl sm:rounded-3xl max-w-md w-full p-5 sm:p-8 relative shadow-2xl text-white my-8 max-h-[90vh] overflow-y-auto">
            
            <button 
              onClick={() => {
                setIsTourModalOpen(false);
                setTourSubmitted(false);
              }}
              className="absolute top-4 right-4 sm:top-6 sm:right-6 text-stone-400 hover:text-white p-2 rounded-full bg-[#292524] cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>

            {!tourSubmitted ? (
              <form onSubmit={handleTourFormSubmit} className="space-y-4 pr-6 sm:pr-0">
                <div>
                  <span className="text-[11px] sm:text-xs font-mono text-[#C2783E] uppercase tracking-widest block mb-1">Atención Personalizada</span>
                  <h3 className="text-xl sm:text-2xl font-serif font-bold text-white">Agendar Cita Presencial</h3>
                  <p className="text-xs text-stone-300 mt-1">
                    Selecciona tu horario preferido para coordinar la visita a la sala de ventas y showroom.
                  </p>
                </div>

                <div className="space-y-3 text-xs">
                  <div>
                    <label className="block font-medium text-stone-300 mb-1">Nombre Completo *</label>
                    <input 
                      type="text" 
                      required
                      placeholder="Ej. Ing. Ricardo Morales"
                      value={tourForm.name}
                      onChange={(e) => setTourForm({...tourForm, name: e.target.value})}
                      className="w-full bg-[#141210] border border-[#292524] rounded-xl px-3.5 py-2.5 text-white focus:outline-none focus:border-[#C2783E]"
                    />
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <div>
                      <label className="block font-medium text-stone-300 mb-1">Teléfono *</label>
                      <input 
                        type="tel" 
                        required
                        placeholder="55 1234 5678"
                        value={tourForm.phone}
                        onChange={(e) => setTourForm({...tourForm, phone: e.target.value})}
                        className="w-full bg-[#141210] border border-[#292524] rounded-xl px-3.5 py-2.5 text-white focus:outline-none focus:border-[#C2783E]"
                      />
                    </div>
                    <div>
                      <label className="block font-medium text-stone-300 mb-1">Correo Electrónico *</label>
                      <input 
                        type="email" 
                        required
                        placeholder="ricardo@ejemplo.com"
                        value={tourForm.email}
                        onChange={(e) => setTourForm({...tourForm, email: e.target.value})}
                        className="w-full bg-[#141210] border border-[#292524] rounded-xl px-3.5 py-2.5 text-white focus:outline-none focus:border-[#C2783E]"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <div>
                      <label className="block font-medium text-stone-300 mb-1">Fecha Deseada *</label>
                      <input 
                        type="date" 
                        required
                        value={tourForm.date}
                        onChange={(e) => setTourForm({...tourForm, date: e.target.value})}
                        className="w-full bg-[#141210] border border-[#292524] rounded-xl px-3.5 py-2.5 text-white focus:outline-none focus:border-[#C2783E]"
                      />
                    </div>
                    <div>
                      <label className="block font-medium text-stone-300 mb-1">Horario *</label>
                      <select 
                        value={tourForm.time}
                        onChange={(e) => setTourForm({...tourForm, time: e.target.value})}
                        className="w-full bg-[#141210] border border-[#292524] rounded-xl px-3.5 py-2.5 text-white focus:outline-none focus:border-[#C2783E]"
                      >
                        <option>10:00 AM</option>
                        <option>12:00 PM</option>
                        <option>04:00 PM</option>
                        <option>06:00 PM</option>
                      </select>
                    </div>
                  </div>

                  <div>
                    <label className="block font-medium text-stone-300 mb-1">Modelo de Interés</label>
                    <select 
                      value={tourForm.propertyType}
                      onChange={(e) => setTourForm({...tourForm, propertyType: e.target.value})}
                      className="w-full bg-[#141210] border border-[#292524] rounded-xl px-3.5 py-2.5 text-white focus:outline-none focus:border-[#C2783E]"
                    >
                      <option>Skyline Penthouse (350 m²)</option>
                      <option>Garden House (260 m²)</option>
                      <option>Grand Residence (180 m²)</option>
                    </select>
                  </div>
                </div>

                <button 
                  type="submit"
                  className="w-full bg-[#C2783E] hover:bg-[#B45309] text-white font-bold py-3.5 rounded-xl text-xs uppercase tracking-wider transition-all cursor-pointer shadow-md mt-2"
                >
                  Confirmar Reserva de Cita
                </button>
              </form>
            ) : (
              <div className="text-center py-6 space-y-4">
                <div className="w-14 h-14 bg-amber-900/50 text-[#C2783E] rounded-full flex items-center justify-center mx-auto border border-[#C2783E]/30">
                  <Check className="w-7 h-7" />
                </div>
                <h3 className="text-2xl font-serif font-bold text-white">¡Cita Confirmada!</h3>
                <p className="text-xs text-stone-300">
                  Hemos enviado la confirmación y ubicación exacta del Showroom al correo <strong className="text-white">{tourForm.email}</strong>.
                </p>
                <button 
                  onClick={() => {
                    setIsTourModalOpen(false);
                    setTourSubmitted(false);
                  }}
                  className="bg-[#292524] text-white text-xs px-6 py-2.5 rounded-xl hover:bg-stone-700 transition-all cursor-pointer"
                >
                  Cerrar Ventana
                </button>
              </div>
            )}

          </div>
        </div>
      )}

      {/* LIGHTBOX */}
      {lightboxImage && (
        <div className="fixed inset-0 z-50 bg-black/95 backdrop-blur-xl flex items-center justify-center p-3 sm:p-4">
          <button 
            onClick={() => setLightboxImage(null)}
            className="absolute top-4 right-4 sm:top-6 sm:right-6 text-stone-400 hover:text-white p-2 rounded-full bg-stone-900 border border-[#292524] cursor-pointer z-10"
          >
            <X className="w-6 h-6" />
          </button>
          <div className="max-w-4xl w-full">
            <img src={lightboxImage.img} alt={lightboxImage.title} className="w-full h-auto max-h-[75vh] object-contain rounded-2xl border border-[#292524]" />
            <div className="mt-4 text-center">
              <h4 className="text-base sm:text-lg font-serif font-bold text-white">{lightboxImage.title}</h4>
              <span className="text-xs text-[#C2783E] uppercase font-mono">{lightboxImage.cat}</span>
            </div>
          </div>
        </div>
      )}

    </div>
  );
}