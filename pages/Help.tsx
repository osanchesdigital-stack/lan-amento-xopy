import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Header from '../components/Header';
import { ArrowLeft, ChevronDown, Mail } from 'lucide-react';

const faqs = [
  {
    question: 'Como compro uma passagem?',
    answer: 'Vá para a aba "Viagens", selecione sua rota e horário desejados e clique em "Comprar". Siga os passos na tela para finalizar a compra.'
  },
  {
    question: 'Onde encontro meu QR Code de embarque?',
    answer: 'Seu QR Code para check-in fica disponível na aba "Histórico". Apenas passagens válidas para viagens futuras possuem um QR Code ativo.'
  },
  {
    question: 'Posso cancelar uma compra?',
    answer: 'Para informações sobre cancelamento e reembolso, por favor entre em contato com nosso suporte através do email: suporte@embarquedigital.com.'
  },
];

const Help: React.FC = () => {
  const navigate = useNavigate();
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  const toggleFaq = (index: number) => {
    setOpenFaq(openFaq === index ? null : index);
  };

  return (
    <div className="bg-gray-50 dark:bg-gray-900 min-h-full">
      <Header title="Ajuda e Suporte" />
      <div className="p-4">
        <button onClick={() => navigate(-1)} className="flex items-center gap-2 text-[#003366] dark:text-gray-300 font-semibold mb-6">
          <ArrowLeft size={18} />
          Voltar
        </button>
        
        <h3 className="text-lg font-semibold text-[#003366] dark:text-gray-100 mb-4">Perguntas Frequentes (FAQ)</h3>

        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 mb-8">
          {faqs.map((faq, index) => (
            <div key={index} className={`${index < faqs.length - 1 ? 'border-b border-gray-200 dark:border-gray-700' : ''}`}>
              <button
                onClick={() => toggleFaq(index)}
                className="w-full flex justify-between items-center p-4 text-left font-semibold text-gray-800 dark:text-gray-200"
              >
                <span>{faq.question}</span>
                <ChevronDown size={20} className={`transform transition-transform ${openFaq === index ? 'rotate-180' : ''}`} />
              </button>
              {openFaq === index && (
                <div className="p-4 pt-0 text-gray-600 dark:text-gray-400">
                  <p>{faq.answer}</p>
                </div>
              )}
            </div>
          ))}
        </div>
        
        <h3 className="text-lg font-semibold text-[#003366] dark:text-gray-100 mb-4">Ainda precisa de ajuda?</h3>
        <a 
            href="mailto:suporte@embarquedigital.com"
            className="w-full flex items-center justify-center gap-3 bg-[#003366] text-white py-3 rounded-lg font-bold text-lg shadow-lg hover:bg-opacity-90 transition-colors"
        >
            <Mail size={22} />
            Entre em Contato
        </a>

      </div>
    </div>
  );
};

export default Help;