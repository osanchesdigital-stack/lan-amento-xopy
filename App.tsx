import React, { useState, useEffect } from 'react';
import { Globe, Wrench, HardHat, Building, Shield, ArrowLeft, Users, UserX, BarChart2, Share2, Link as LinkIcon } from 'lucide-react';
import { Typewriter } from './components/Typewriter';
import { useRSVP } from './hooks/useRSVP';

const TYPEWRITER_TEXTS = ['Construção', 'Serviços', 'Locações', 'e Mais...'];

const InstagramIcon = (props: React.SVGProps<SVGSVGElement>) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="24"
    height="24"
    viewBox="0 0 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    {...props}
  >
    <rect width="20" height="20" x="2" y="2" rx="5" ry="5"></rect>
    <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path>
    <line x1="17.5" x2="17.51" y1="6.5" y2="6.5"></line>
  </svg>
);

// --- Admin Dashboard Component ---

interface AdminDashboardProps {
    setView: (view: 'landing' | 'admin') => void;
}
  
const AdminDashboard: React.FC<AdminDashboardProps> = ({ setView }) => {
    const [activeTab, setActiveTab] = useState<'confirmed' | 'absent'>('confirmed');
    const [copyButtonText, setCopyButtonText] = useState('Copiar Link');
    const [rsvpData, setRsvpData] = useState<any[]>([]);
    const [stats, setStats] = useState({ confirmed_count: 0, absent_count: 0, total_responses: 0 });
    const [loading, setLoading] = useState(true);
    const { getAllRSVPs, getRSVPStats } = useRSVP();

    useEffect(() => {
        const loadData = async () => {
            setLoading(true);
            const [data, statsData] = await Promise.all([
                getAllRSVPs(),
                getRSVPStats()
            ]);
            setRsvpData(data);
            if (statsData) setStats(statsData);
            setLoading(false);
        };
        loadData();
    }, []);

    const confirmedParticipants = rsvpData.filter(p => p.rsvp === 'yes');
    const absentParticipants = rsvpData.filter(p => p.rsvp === 'no');
  
    const totalConfirmed = stats.confirmed_count;
    const totalAbsent = stats.absent_count;
    const totalRsvps = stats.total_responses;
    
    const handleCopyLink = () => {
        const shareUrl = `${window.location.origin}?share=true`;
        navigator.clipboard.writeText(shareUrl).then(() => {
            setCopyButtonText('Copiado!');
            setTimeout(() => setCopyButtonText('Copiar Link'), 2000);
        }).catch(err => {
            console.error('Failed to copy link: ', err);
            setCopyButtonText('Erro ao copiar');
        });
    };
  
    return (
      <div className="relative min-h-screen bg-[#020000] text-[#fefefe] flex justify-center items-start p-4 overflow-y-auto animate-fade-in">
        <div className="w-full max-w-2xl mx-auto">
            <header className="flex items-center justify-between mb-6 pt-4">
                <button 
                    onClick={() => setView('landing')} 
                    className="flex items-center gap-2 text-white/80 hover:text-white transition-colors"
                >
                    <ArrowLeft size={20} />
                    Voltar
                </button>
                <h1 className="text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-[#fefefe] to-[#e87b3a]">
                    Painel Admin
                </h1>
                <div className="w-24"></div> {/* Spacer */}
            </header>
    
            {/* Report Section */}
            <section className="mb-8">
                <h2 className="text-xl font-semibold text-white/90 mb-4 flex items-center gap-2">
                <BarChart2 size={22} className="text-[#e87b3a]" />
                Relatório de Inscrições
                </h2>
                <div className="grid grid-cols-2 gap-4 text-center">
                <div className="bg-green-500/10 border border-green-500/50 p-4 rounded-xl">
                    <h3 className="font-semibold text-green-400">Confirmados</h3>
                    <p className="text-4xl font-bold mt-2">{totalConfirmed}</p>
                </div>
                <div className="bg-red-500/10 border border-red-500/50 p-4 rounded-xl">
                    <h3 className="font-semibold text-red-400">Não Comparecerão</h3>
                    <p className="text-4xl font-bold mt-2">{totalAbsent}</p>
                </div>
                <div className="col-span-2 bg-white/5 border border-white/20 p-4 rounded-xl">
                    <h3 className="font-semibold text-white/80">Total de Respostas</h3>
                    <p className="text-4xl font-bold mt-2">{totalRsvps}</p>
                </div>
                </div>
            </section>

            {/* Share Section */}
            <section className="mb-8">
                <h2 className="text-xl font-semibold text-white/90 mb-4 flex items-center gap-2">
                    <Share2 size={22} className="text-[#e87b3a]" />
                    Compartilhar Convite
                </h2>
                <div className="bg-white/5 border border-white/20 p-4 rounded-xl flex flex-col sm:flex-row items-center gap-4">
                    <input 
                        type="text"
                        readOnly
                        value={`${window.location.origin}?share=true`}
                        className="w-full p-2 bg-black/30 border border-white/20 rounded-md shadow-sm text-white/80"
                        aria-label="Link de compartilhamento do convite"
                    />
                    <button
                        onClick={handleCopyLink}
                        className="w-full sm:w-auto flex-shrink-0 flex items-center justify-center gap-2 bg-[#e64c03] text-white font-bold py-2 px-4 rounded-lg hover:bg-[#e87b3a] transition-colors"
                    >
                        <LinkIcon size={18} />
                        {copyButtonText}
                    </button>
                </div>
                <p className="text-xs text-white/50 mt-2 text-center sm:text-left">
                    Este link ocultará o acesso ao painel de administrador para os convidados.
                </p>
            </section>
    
            {/* Lists Section */}
            <section>
                <div className="flex border-b border-white/20 mb-4">
                <button 
                    onClick={() => setActiveTab('confirmed')}
                    className={`flex-1 py-2 text-center font-semibold transition-colors flex items-center justify-center gap-2 ${activeTab === 'confirmed' ? 'text-[#e87b3a] border-b-2 border-[#e87b3a]' : 'text-white/60 hover:text-white'}`}
                >
                    <Users size={18} />
                    Confirmados
                </button>
                <button 
                    onClick={() => setActiveTab('absent')}
                    className={`flex-1 py-2 text-center font-semibold transition-colors flex items-center justify-center gap-2 ${activeTab === 'absent' ? 'text-[#e87b3a] border-b-2 border-[#e87b3a]' : 'text-white/60 hover:text-white'}`}
                >
                    <UserX size={18} />
                    Ausentes
                </button>
                </div>
    
                <div className="bg-black/40 backdrop-blur-md border border-white/10 rounded-lg p-4 max-h-[40vh] overflow-y-auto">
                {loading ? (
                    <div className="text-center py-8 text-white/60">Carregando...</div>
                ) : (
                    <>
                    {activeTab === 'confirmed' && (
                        confirmedParticipants.length > 0 ? (
                            <ul className="space-y-3">
                            {confirmedParticipants.map((p) => (
                                <li key={p.id} className="p-3 bg-white/5 rounded-md text-white/90 font-medium">
                                {p.name}
                                </li>
                            ))}
                            </ul>
                        ) : (
                            <p className="text-center py-8 text-white/60">Nenhuma confirmação ainda</p>
                        )
                    )}
                    {activeTab === 'absent' && (
                        absentParticipants.length > 0 ? (
                            <ul className="space-y-4">
                            {absentParticipants.map((p) => (
                                <li key={p.id} className="p-3 bg-white/5 rounded-md">
                                <p className="text-white/90 font-medium">{p.name}</p>
                                {p.reason && (
                                    <p className="text-sm text-white/60 mt-1 italic border-l-2 border-[#e87b3a]/50 pl-2">
                                    {p.reason}
                                    </p>
                                )}
                                </li>
                            ))}
                            </ul>
                        ) : (
                            <p className="text-center py-8 text-white/60">Nenhuma ausência registrada</p>
                        )
                    )}
                    </>
                )}
                </div>
            </section>
        </div>
      </div>
    );
};


const XopyLanding: React.FC<{ setView: (view: 'landing' | 'admin') => void; hideAdminButton: boolean }> = ({ setView, hideAdminButton }) => {
  const qrCodeUrl = `https://api.qrserver.com/v1/create-qr-code/?size=128x128&data=https://app.xopy.com.br/&bgcolor=fefefe&color=020000&qzone=1`;

  const [rsvp, setRsvp] = useState<'yes' | 'no' | null>(null);
  const [name, setName] = useState('');
  const [reason, setReason] = useState('');
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState('');
  const { submitRSVP, loading: submitting } = useRSVP();

  // Countdown timer state and logic
  const [timeLeft, setTimeLeft] = useState({
    days: '00',
    hours: '00',
    minutes: '00',
    seconds: '00',
  });

  useEffect(() => {
    const targetDate = new Date(new Date().getFullYear(), 10, 15, 23, 59, 59); // November 15th

    const interval = setInterval(() => {
      const now = new Date();
      const difference = targetDate.getTime() - now.getTime();

      if (difference > 0) {
        const days = Math.floor(difference / (1000 * 60 * 60 * 24));
        const hours = Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutes = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((difference % (1000 * 60)) / 1000);

        setTimeLeft({
          days: String(days).padStart(2, '0'),
          hours: String(hours).padStart(2, '0'),
          minutes: String(minutes).padStart(2, '0'),
          seconds: String(seconds).padStart(2, '0'),
        });
      } else {
        clearInterval(interval);
        setTimeLeft({ days: '00', hours: '00', minutes: '00', seconds: '00' });
      }
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!rsvp) {
      setError('Por favor, selecione uma opção de presença.');
      return;
    }
    if (!name.trim()) {
      setError('Por favor, preencha seu nome.');
      return;
    }
    setError('');
    
    const result = await submitRSVP({
      name: name.trim(),
      rsvp,
      reason: reason.trim() || undefined,
    });

    if (result.success) {
      setSubmitted(true);
    } else {
      setError(result.error || 'Erro ao enviar confirmação. Tente novamente.');
    }
  };

  return (
    <div className="relative min-h-screen bg-[#020000] text-[#fefefe] flex items-center justify-center p-4 overflow-hidden">
      
      {/* Background elements */}
      <div className="absolute inset-0 bg-grid-orange"></div>
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[80vw] h-[80vw] max-w-lg max-h-lg bg-[#e64c03]/30 rounded-full blur-3xl animate-pulse"></div>
      <img 
        src="/construction-bg.svg"
        alt="Construção Civil"
        className="absolute inset-0 w-full h-full object-cover opacity-5"
      />
      
      {/* Decorative Icons */}
      <HardHat size={64} className="absolute top-[10%] left-[15%] text-[#e87b3a]/20 -rotate-12 opacity-50" />
      <Wrench size={80} className="absolute bottom-[15%] right-[10%] text-[#e87b3a]/20 rotate-12 opacity-50" />
      <Building size={72} className="absolute bottom-[20%] left-[5%] text-[#e87b3a]/20 rotate-6 opacity-50" />

      {/* Main Content */}
      <main className="relative z-10 w-full max-w-2xl mx-auto bg-black/40 backdrop-blur-md border border-white/10 rounded-2xl shadow-2xl shadow-[#e64c03]/10 p-6 md:p-10 text-center animate-fade-in">
        <div className="mb-6">
          <span className="inline-block bg-[#e64c03] text-[#fefefe] text-sm font-bold px-4 py-1 rounded-full shadow-lg">
            LANÇAMENTO OFICIAL • 10/12
          </span>
        </div>

        {/* Countdown Timer */}
        <div className="mb-8">
            <p className="text-white/80 mb-4 text-md">As inscrições para o lançamento encerram em:</p>
            <div className="flex justify-center gap-2 md:gap-4 text-white">
                <div className="text-center p-3 md:p-4 bg-white/5 rounded-lg w-20 md:w-24 border border-white/10 shadow-lg">
                    <p className="text-3xl md:text-4xl font-bold text-[#e87b3a] tracking-wider">{timeLeft.days}</p>
                    <p className="text-xs text-white/60 uppercase tracking-widest">Dias</p>
                </div>
                <div className="text-center p-3 md:p-4 bg-white/5 rounded-lg w-20 md:w-24 border border-white/10 shadow-lg">
                    <p className="text-3xl md:text-4xl font-bold text-[#e87b3a] tracking-wider">{timeLeft.hours}</p>
                    <p className="text-xs text-white/60 uppercase tracking-widest">Horas</p>
                </div>
                <div className="text-center p-3 md:p-4 bg-white/5 rounded-lg w-20 md:w-24 border border-white/10 shadow-lg">
                    <p className="text-3xl md:text-4xl font-bold text-[#e87b3a] tracking-wider">{timeLeft.minutes}</p>
                    <p className="text-xs text-white/60 uppercase tracking-widest">Minutos</p>
                </div>
                <div className="text-center p-3 md:p-4 bg-white/5 rounded-lg w-20 md:w-24 border border-white/10 shadow-lg">
                    <p className="text-3xl md:text-4xl font-bold text-[#e87b3a] tracking-wider">{timeLeft.seconds}</p>
                    <p className="text-xs text-white/60 uppercase tracking-widest">Segundos</p>
                </div>
            </div>
        </div>

        <h1 className="text-4xl md:text-6xl font-extrabold mb-4 text-transparent bg-clip-text bg-gradient-to-r from-[#fefefe] to-[#e87b3a] h-20 md:h-32 flex items-center justify-center flex-wrap">
          <span className="mr-3">Xopy</span>
          <Typewriter text={TYPEWRITER_TEXTS} />
        </h1>
        <h2 className="text-2xl md:text-3xl font-semibold text-[#fefefe] mb-6">
          O futuro da construção civil está no seu bolso!
        </h2>

        <p className="max-w-xl mx-auto text-lg text-white/80 mb-8">
          Uma nova era para construir, e reforma ou vender materiais. um app que conecta lojas, prestadores de serviço e clientes em um único lugar.
        </p>
        
        <div className="max-w-lg mx-auto bg-white/5 p-6 rounded-lg border border-white/10 mb-8">
          <h3 className="text-xl font-bold mb-4 text-[#e87b3a]">Acesse agora e faça parte da revolução!</h3>
          <p className="text-white/90 mb-6">
            Descubra como é fácil comprar e vender no setor da construção.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-6 w-full">
            {/* Coluna da Esquerda: Botão e Link */}
            <div className="flex flex-col items-center gap-4">
              <a href="https://app.xopy.com.br/" target="_blank" rel="noopener noreferrer" className="w-full sm:w-auto flex items-center justify-center gap-2 bg-[#fefefe] text-[#020000] font-bold py-3 px-6 rounded-lg hover:bg-gray-200 transition-transform transform hover:scale-105">
                <Globe size={20} />
                <span>Acessar Web App</span>
              </a>
              <a href="https://www.instagram.com/xopy_app/" target="_blank" rel="noopener noreferrer" className="flex items-center justify-center gap-3 text-white/80 hover:text-white font-semibold transition-colors">
                <InstagramIcon className="w-5 h-5" />
                <span>Siga no Instagram</span>
              </a>
            </div>
            
            {/* Coluna da Direita: QR Code */}
            <img src={qrCodeUrl} alt="QR Code para o site Xopy" className="p-2 bg-[#fefefe] rounded-lg shadow-lg w-32 h-32"/>
          </div>
        </div>

        {/* RSVP Section */}
        <div className="max-w-lg mx-auto bg-white/5 p-6 rounded-lg border border-white/10">
          <h3 className="text-xl font-bold mb-4 text-[#e87b3a]">Marque sua presença!</h3>
          
          {submitted ? (
            <div className="text-center py-4">
              <p className="text-lg text-white/90">
                {rsvp === 'yes' 
                  ? 'Obrigado por confirmar sua presença! Esperamos por você.'
                  : 'Agradecemos a resposta. Sentiremos sua falta!'}
              </p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-6">
              <fieldset className="flex flex-col sm:flex-row gap-4 justify-center">
                <legend className="sr-only">Você irá ao lançamento?</legend>
                <label className={`flex-1 p-3 border-2 rounded-lg cursor-pointer text-center transition-all ${rsvp === 'yes' ? 'border-[#e64c03] bg-[#e64c03]/20' : 'border-white/20'}`}>
                  <input type="radio" name="rsvp" value="yes" checked={rsvp === 'yes'} onChange={() => setRsvp('yes')} className="sr-only" />
                  <span className="font-semibold">Sim, estarei no lançamento!</span>
                </label>
                <label className={`flex-1 p-3 border-2 rounded-lg cursor-pointer text-center transition-all ${rsvp === 'no' ? 'border-[#e64c03] bg-[#e64c03]/20' : 'border-white/20'}`}>
                  <input type="radio" name="rsvp" value="no" checked={rsvp === 'no'} onChange={() => setRsvp('no')} className="sr-only" />
                  <span className="font-semibold">Não poderei comparecer</span>
                </label>
              </fieldset>

              {rsvp && (
                 <div className="space-y-4 text-left animate-fade-in">
                    <div>
                        <label htmlFor="name" className="block text-sm font-medium text-white/80 mb-1">Nome completo</label>
                        <input
                            type="text"
                            id="name"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            placeholder="Seu nome aqui"
                            className="w-full p-3 bg-black/30 border border-white/20 rounded-md shadow-sm focus:ring-2 focus:ring-[#e64c03] focus:border-[#e64c03] text-white"
                            required
                        />
                    </div>
                    {rsvp === 'no' && (
                        <div>
                            <label htmlFor="reason" className="block text-sm font-medium text-white/80 mb-1">Motivo (opcional)</label>
                            <textarea
                                id="reason"
                                rows={3}
                                value={reason}
                                onChange={(e) => setReason(e.target.value)}
                                placeholder="Gostaria de compartilhar o motivo?"
                                className="w-full p-3 bg-black/30 border border-white/20 rounded-md shadow-sm focus:ring-2 focus:ring-[#e64c03] focus:border-[#e64c03] resize-none text-white"
                            />
                        </div>
                    )}
                 </div>
              )}
              
              {error && <p className="text-red-400 text-sm">{error}</p>}

              <button 
                type="submit"
                className="w-full bg-[#e64c03] text-white font-bold py-3 px-6 rounded-lg hover:bg-[#e87b3a] transition-transform transform hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed"
                disabled={!rsvp || !name.trim() || submitting}
              >
                {submitting ? 'Enviando...' : 'Enviar Confirmação'}
              </button>
            </form>
          )}
        </div>
      </main>

      {/* Admin Access Button */}
      {!hideAdminButton && (
        <button 
            onClick={() => setView('admin')}
            className="absolute bottom-4 right-4 bg-black/40 backdrop-blur-md border border-white/10 p-3 rounded-full text-white/60 hover:text-white hover:border-white/30 transition-all z-20"
            aria-label="Acessar painel do administrador"
        >
            <Shield size={22} />
        </button>
      )}
    </div>
  );
};


function App() {
  const [view, setView] = useState<'landing' | 'admin'>('landing');
  const [isShareView, setIsShareView] = useState(false);

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    if (params.get('share') === 'true') {
      setIsShareView(true);
    }
  }, []);

  if (view === 'admin') {
    return <AdminDashboard setView={setView} />;
  }

  return (
    <XopyLanding setView={setView} hideAdminButton={isShareView} />
  );
}

export default App;