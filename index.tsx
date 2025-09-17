import React, { useState, useEffect, useRef } from 'react';
import { createRoot } from 'react-dom/client';

const FormularioContato = () => {
  const [formData, setFormData] = useState({
    name: '', instagram: '', whatsapp: '', motivacaoContato: ''
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const formatWhatsAppMessage = (data) => {
    const message = `Olá! Gostaria de solicitar um orçamento.

Dados para contato:
Nome: ${data.name}
Instagram: ${data.instagram}
WhatsApp: ${data.whatsapp}
Motivação para o contato: ${data.motivacaoContato}

Aguardo o retorno para conversarmos sobre os serviços!`;
    return encodeURIComponent(message);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.name || !formData.instagram || !formData.whatsapp || !formData.motivacaoContato) {
      alert('Por favor, preencha todos os campos.');
      return;
    }

    const whatsappURL = `https://wa.me/5591991883384?text=${formatWhatsAppMessage(formData)}`;
    window.open(whatsappURL, '_blank');
    setFormData({ name: '', instagram: '', whatsapp: '', motivacaoContato: '' });
  };

  return (
    <div className="form-wrapper">
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="name">Seu Nome</label>
          <input type="text" id="name" name="name" value={formData.name} onChange={handleInputChange} required />
        </div>
        <div className="form-group">
          <label htmlFor="instagram">Seu Instagram</label>
          <input type="text" id="instagram" name="instagram" placeholder="seuusuario" value={formData.instagram} onChange={handleInputChange} required />
        </div>
        <div className="form-group">
          <label htmlFor="whatsapp">WhatsApp</label>
          <input type="tel" id="whatsapp" name="whatsapp" placeholder="99 99999-9999" value={formData.whatsapp} onChange={handleInputChange} required />
        </div>
        <div className="form-group">
          <label htmlFor="motivacaoContato">O que motivou esse primeiro contato?</label>
          <select id="motivacaoContato" name="motivacaoContato" value={formData.motivacaoContato} onChange={handleInputChange} required>
            <option value="">Selecione uma opção</option>
            <option value="buscar-se-destacar">Buscar se destacar</option>
            <option value="ter-mais-autoridade">Ter mais autoridade</option>
            <option value="ja-queria-um-site">Já queria um site</option>
            <option value="mais-credibilidade">Mais credibilidade</option>
            <option value="mais-faturamento">Mais faturamento</option>
            <option value="apenas-quero-saber-mais">Apenas quero saber mais sobre</option>
          </select>
        </div>
        <button type="submit" className="btn btn-primary">Enviar e Pedir Orçamento</button>
      </form>
    </div>
  );
};

const GoogleSearchMock = () => {
  const [currentSearch, setCurrentSearch] = useState(0);
  const [displayText, setDisplayText] = useState('');
  const [isTyping, setIsTyping] = useState(true);

  const searches = [
    'estética automotiva perto de mim', 'polimento de carro', 'higienização automotiva',
    'enceramento automotivo', 'lavagem ecológica', 'proteção cerâmica automotiva',
    'revitalização de pintura', 'detailing automotivo', 'cera de carnaúba', 'lavagem a seco'
  ];

  useEffect(() => {
    const currentText = searches[currentSearch];
    let timeout;

    if (isTyping) {
      if (displayText.length < currentText.length) {
        timeout = setTimeout(() => setDisplayText(currentText.slice(0, displayText.length + 1)), 100);
      } else {
        timeout = setTimeout(() => setIsTyping(false), 2000);
      }
    } else {
      if (displayText.length > 0) {
        timeout = setTimeout(() => setDisplayText(displayText.slice(0, -1)), 50);
      } else {
        setCurrentSearch((prev) => (prev + 1) % searches.length);
        setIsTyping(true);
      }
    }
    return () => clearTimeout(timeout);
  }, [displayText, isTyping, currentSearch, searches]);

  return (
    <div className="google-search-mock">
      <div className="search-container">
        <div className="google-icon">
          <svg width="20" height="20" viewBox="0 0 24 24">
            <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
            <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
            <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
            <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
          </svg>
        </div>
        <div className="search-input">
          <span className="search-text">{displayText}</span>
          <span className="search-cursor">|</span>
        </div>
        <button className="search-button" aria-label="Pesquisar">
          <svg width="20" height="20" viewBox="0 0 24 24">
            <path fill="var(--electric-violet)" d="M15.5 14h-.79l-.28-.27A6.471 6.471 0 0 0 16 9.5 6.5 6.5 0 1 0 9.5 16c1.61 0 3.09-.59 4.23-1.57l.27.28v.79l5 4.99L20.49 19l-4.99-5zm-6 0C7.01 14 5 11.99 5 9.5S7.01 5 9.5 5 14 7.01 14 9.5 11.99 14 9.5 14z"/>
          </svg>
        </button>
      </div>
    </div>
  );
};

const App = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [openAccordion, setOpenAccordion] = useState(null);

  const portfolioItems = [
    { name: 'RevisaCar', url: 'https://revisacar.com.br/index', img: '/images/imagem1.png' },
    { name: 'Auto Detailing BR', url: 'https://autodetailingbr.netlify.app', img: '/images/imagem2.png' },
    { name: 'Starker SPA Automotivo', url: 'https://starkerspaautomotivo.com.br', img: '/images/imagem3.png' },
    { name: 'Unique Estética Auto', url: 'https://www.uniqueesteticaauto.com.br', img: '/images/imagem4.png' }
  ];

  const faqData = [
    {
      question: "Quanto tempo demora para meu site ficar pronto?",
      answer: "O prazo médio é de 7 a 10 dias úteis, dependendo da complexidade do projeto. Isso inclui toda a estratégia, design, desenvolvimento e otimização SEO. Trabalhamos com prazos realistas para garantir a qualidade máxima."
    },
    {
      question: "Meu site vai aparecer no Google quando as pessoas pesquisarem?",
      answer: "Sim! Todos os nossos sites são otimizados para SEO desde o desenvolvimento. Configuramos palavras-chave específicas do seu negócio como 'estética automotiva [sua cidade]' para que você seja encontrado pelos clientes certos."
    },
    {
      question: "Preciso fornecer textos e fotos ou vocês criam tudo?",
      answer: "Nós criamos todos os textos profissionais do seu site. Para as fotos, recomendamos que você forneça imagens dos seus trabalhos (celular mesmo), pois são o seu diferencial. Também podemos sugerir bancos de imagens complementares se necessário."
    },
    {
      question: "Qual é o investimento para ter um site profissional?",
      answer: "Oferecemos duas modalidades de investimento: Investimento único (você paga uma vez e o site é seu) ou Investimento parcelado (valores menores mensais com serviços incluídos). Cada modalidade tem suas vantagens específicas dependendo do seu perfil e necessidades. Entre em contato conosco para uma conversa sem compromisso e descobriremos qual opção se encaixa melhor no seu orçamento e objetivos."
    },
    {
      question: "Vocês fazem manutenção do site após a entrega?",
      answer: "Sim! Nos responsabilizamos por manter seu site sempre funcionando perfeitamente - isso inclui atualizações de segurança, backups e monitoramento. Porém, alterações de conteúdo, design ou novas funcionalidades precisam ser negociadas separadamente. Para maior comodidade, oferecemos um **Plano de Acompanhamento** que inclui alterações mensais, suporte prioritário e muito mais. Entre em contato para conhecer todos os detalhes deste plano."
},
  {
    question: "E se eu não gostar do resultado final?",
    answer: "Trabalhamos com aprovação por etapas justamente para evitar isso. Você aprova o design antes de começarmos o desenvolvimento. Além disso, oferecemos revisões incluídas no projeto para garantir sua total satisfação."
  }
];


  const deliverables = [
      {
        title: "100% Personalizado",
        icon: <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polygon points="12 2 2 7 12 12 22 7 12 2"></polygon><polyline points="2 17 12 22 22 17"></polyline><polyline points="2 12 12 17 22 12"></polyline></svg>,
        content: "Criamos um design do zero, alinhado com sua identidade visual. Nada de templates prontos. Seu site será único, como sua estética."
      },
      {
        title: "SEO Otimizado",
        icon: <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path><circle cx="12" cy="10" r="3"></circle></svg>,
        content: "Estruturamos seu site para que o Google o encontre e o posicione bem. Isso significa mais tráfego orgânico e clientes qualificados."
      },
      {
        title: "Google Analytics",
        icon: <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="8" y1="6" x2="21" y2="6"></line><line x1="8" y1="12" x2="21" y2="12"></line><line x1="8" y1="18" x2="21" y2="18"></line><line x1="3" y1="6" x2="3.01" y2="6"></line><line x1="3" y1="12" x2="3.01" y2="12"></line><line x1="3" y1="18" x2="3.01" y2="18"></line></svg>,
        content: "Integramos a principal ferramenta de análise de dados para que você saiba de onde vêm seus visitantes e como eles se comportam."
      },
      {
  title: "Suporte Pós Entrega",
  icon: <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"></path></svg>,
  content: "Oferecemos 30 dias de suporte gratuito para garantir que tudo funcione perfeitamente e para tirar qualquer dúvida que você tenha."
}

  ]

  const toggleAccordion = (index: number) => {
    setOpenAccordion(openAccordion === index ? null : index);
  };

  const useOnScreen = (options: IntersectionObserverInit | undefined): [React.RefObject<HTMLDivElement>, boolean] => {
    const ref = useRef<HTMLDivElement>(null);
    const [isVisible, setIsVisible] = useState(false);

    useEffect(() => {
      const observer = new IntersectionObserver(([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.unobserve(entry.target);
        }
      }, options);

      if (ref.current) {
        observer.observe(ref.current);
      }

      return () => {
        if (ref.current) {
          observer.unobserve(ref.current);
        }
      };
    }, [ref, options]);

    return [ref, isVisible];
  };

  const FadeInSection = ({ children }: { children: React.ReactNode }) => {
    const [ref, isVisible] = useOnScreen({ threshold: 0.1 });
    return (
      <div ref={ref} className={`fade-in-section ${isVisible ? 'is-visible' : ''}`}>
        {children}
      </div>
    );
  };

  return (
    <>
      <style>{`
        :root {
          --onyx: #0B0B12;
          --graphite: #111322;
          --slate: #1A1D29;
          --electric-violet: #8B5CF6;
          --deep-violet: #7C3AED;
          --cobalt: #2563EB;
          --accent-cyan: #22D3EE;
          --text-primary: #FFFFFF;
          --text-secondary: #a7a9c4;
          --aurora-b: linear-gradient(45deg, #7C3AED, #2563EB, #0B0B12 60%);
          --aurora-a-radial: radial-gradient(ellipse 120% 80% at 50% -30%, rgba(124, 58, 237, 0.8), rgba(37, 99, 235, 0.6), rgba(34, 211, 238, 0.4), rgba(139, 92, 246, 0.3), transparent);
        }

        *, *::before, *::after {
          box-sizing: border-box;
          margin: 0;
          padding: 0;
        }
        
        html {
          scroll-behavior: smooth;
        }

        body {
          font-family: 'Poppins', sans-serif;
          background-color: var(--onyx);
          color: var(--text-primary);
          overflow-x: hidden;
        }

        .container {
          width: 90%;
          max-width: 1200px;
          margin: 0 auto;
          padding: 80px 0;
        }

        h1, h2, h3 {
          font-weight: 600;
        }

        h2 {
          font-size: 2.5rem;
          text-align: center;
          margin-bottom: 20px;
        }
        
        h2 span {
          background: linear-gradient(90deg, var(--deep-violet), var(--accent-cyan));
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
        }
        
        .section-description {
            text-align: center;
            color: var(--text-secondary);
            max-width: 700px;
            margin: 0 auto 60px auto;
            font-size: 1.1rem;
            line-height: 1.6;
        }

.google-search-mock {
  max-width: 500px;
  margin: 40px auto 0;
  text-align: center;
}

.search-container {
  display: flex;
  align-items: center;
  width: 100%;
  max-width: 450px;
  margin: 0 auto;
  padding: 12px 16px;
  background: var(--graphite);
  border: 1px solid var(--slate);
  border-radius: 24px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
  transition: all 0.3s ease;
}

.search-container:hover {
  box-shadow: 0 6px 20px rgba(142, 45, 226, 0.2);
  border-color: var(--electric-violet);
}

.google-icon {
  margin-right: 12px;
  display: flex;
  align-items: center;
  flex-shrink: 0;
}

.search-input {
  flex: 1;
  display: flex;
  align-items: center;
  min-height: 24px;
}

.search-text {
  color: var(--text-primary);
  font-size: 16px;
  font-family: 'Poppins', sans-serif;
  line-height: 24px;
}

.search-cursor {
  color: var(--electric-violet);
  font-size: 16px;
  animation: blink 1s infinite;
  margin-left: 1px;
}

@keyframes blink {
  0%, 50% { opacity: 1; }
  51%, 100% { opacity: 0; }
}

.search-button {
  background: none;
  border: none;
  padding: 8px;
  margin-left: 8px;
  border-radius: 50%;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: background-color 0.3s ease;
  flex-shrink: 0;
}

.search-button:hover {
  background-color: rgba(142, 45, 226, 0.1);
}

/* Responsividade */
@media (max-width: 600px) {
  .google-search-mock {
    margin: 30px auto 0;
    padding: 0 20px;
  }
  
  .search-container {
    max-width: 100%;
    padding: 10px 14px;
  }
  
  .search-text {
    font-size: 14px;
  }
  
  .google-icon svg {
    width: 18px;
    height: 18px;
  }
  
  .search-button svg {
    width: 18px;
    height: 18px;
  }
}


        .btn {
          display: inline-block;
          padding: 12px 30px;
          border-radius: 8px;
          text-decoration: none;
          font-weight: 600;
          transition: transform 0.3s ease, box-shadow 0.3s ease;
        }

        .btn-primary {
  background: linear-gradient(135deg, 
    rgba(124, 58, 237, 0.9), 
    rgba(37, 99, 235, 0.8), 
    rgba(34, 211, 238, 0.3)
  );
  background-size: 200% 200%;
  color: var(--text-primary);
  border: 1px solid rgba(124, 58, 237, 0.3);
  padding: 12px 24px;
  border-radius: 8px;
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 0.5px;
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  position: relative;
  overflow: hidden;
  box-shadow: 
    0 4px 20px rgba(139, 92, 246, 0.3),
    inset 0 1px 0 rgba(255, 255, 255, 0.1);
}

.btn-primary::before {
  content: '';
  position: absolute;
  top: 0;
  left: -100%;
  width: 100%;
  height: 100%;
  background: linear-gradient(
    90deg, 
    transparent, 
    rgba(255, 255, 255, 0.2), 
    transparent
  );
  transition: left 0.5s;
}

.btn-primary:hover {
  transform: translateY(-3px);
  background-position: 100% 0;
  box-shadow: 
    0 8px 25px rgba(139, 92, 246, 0.4),
    0 4px 15px rgba(37, 99, 235, 0.3),
    inset 0 1px 0 rgba(255, 255, 255, 0.2);
  border-color: var(--accent-cyan);
}

.btn-primary:hover::before {
  left: 100%;
}

/* Variação ainda mais próxima do aurora-a-radial */
.btn-primary-aurora {
  background: radial-gradient(ellipse 150% 100% at 50% 0%, 
    rgba(124, 58, 237, 0.8), 
    rgba(37, 99, 235, 0.6), 
    rgba(34, 211, 238, 0.4), 
    rgba(139, 92, 246, 0.2)
  );
  background-size: 100% 200%;
}

.btn-primary-aurora:hover {
  background-position: 50% 100%;
}

        
        .fade-in-section {
          opacity: 0;
          transform: translateY(20px);
          transition: opacity 0.6s ease-out, transform 0.6s ease-out;
        }

        .fade-in-section.is-visible {
          opacity: 1;
          transform: translateY(0);
        }
        
        /* Header */
        .header {
          padding: 20px 5%;
          display: flex;
          justify-content: space-between;
          align-items: center;
          position: absolute;
          width: 100%;
          z-index: 1000;
          background: transparent;
        }
        .logo {
          font-size: 2rem;
          font-weight: 700;
          color: var(--text-primary);
          text-decoration: none;
        }
        .nav-links {
          display: flex;
          gap: 30px;
          list-style: none;
        }
        .nav-links a {
          color: var(--text-secondary);
          text-decoration: none;
          font-weight: 500;
          transition: color 0.3s;
        }
        .nav-links a:hover {
          color: var(--text-primary);
        }
        .menu-toggle {
          display: none;
          background: none;
          border: none;
          color: white;
          font-size: 2rem;
          cursor: pointer;
        }

        /* Hero Section */
        .hero {
          min-height: 100vh;
          display: flex;
          align-items: center;
          justify-content: center;
          text-align: center;
          background: var(--onyx) var(--aurora-a-radial) no-repeat center center;
          background-size: 100% 100%;
          padding: 100px 5% 0 5%;
        }
        .hero-content {
          max-width: 800px;
        }
        .hero h1 {
          font-size: clamp(2.5rem, 6vw, 4rem);
          line-height: 1.2;
          margin-bottom: 20px;
          background: linear-gradient(90deg, #fff, #a7a9c4);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
        }
        .hero p {
          font-size: 1.2rem;
          color: var(--text-secondary);
          margin-bottom: 40px;
        }

        /* Benefits Section */
        .benefits-grid {
            display: grid;
            grid-template-columns: 1fr 1fr;
            gap: 40px;
            align-items: center;
        }
        .benefit-card {
            background-color: var(--graphite);
            padding: 40px;
            border-radius: 12px;
            border: 1px solid var(--slate);
        }
        .benefit-card h3 {
            font-size: 1.8rem;
            margin-bottom: 15px;
            display: flex;
            align-items: center;
            gap: 10px;
        }
        .benefit-card p {
            color: var(--text-secondary);
            line-height: 1.7;
        }
        .complementary-note {
            margin-top: 50px;
            padding: 25px;
            background-color: rgba(37, 99, 235, 0.1);
            border-left: 4px solid var(--cobalt);
            border-radius: 8px;
            color: var(--text-secondary);
            font-size: 1.05rem;
            text-align: center;
        }
        .complementary-note strong {
            color: var(--text-primary);
            font-weight: 600;
        }

        /* Process Section */
        .process-grid {
            display: grid;
            grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
            gap: 30px;
        }
        .process-step {
  padding: 30px;
  border-radius: 12px;
  text-align: center;
  border: 1px solid rgba(124, 58, 237, 0.2);
  transition: transform 0.3s, box-shadow 0.3s;
  position: relative;
  overflow: hidden;
}

/* Gradiente 1 - Violeta para Azul */
.process-step:nth-child(odd) {
  background: linear-gradient(135deg, 
    rgba(124, 58, 237, 0.15), 
    rgba(37, 99, 235, 0.1), 
    var(--graphite)
  );
  border-color: rgba(124, 58, 237, 0.3);
}

/* Gradiente 2 - Azul para Cyan */
.process-step:nth-child(even) {
  background: linear-gradient(135deg, 
    rgba(37, 99, 235, 0.15), 
    rgba(34, 211, 238, 0.1), 
    var(--graphite)
  );
  border-color: rgba(37, 99, 235, 0.3);
}

/* Efeito hover para ambos */
.process-step:hover {
  transform: translateY(-5px);
  box-shadow: 0 10px 30px rgba(139, 92, 246, 0.2);
}

.process-step:nth-child(odd):hover {
  box-shadow: 0 10px 30px rgba(124, 58, 237, 0.3);
  border-color: var(--electric-violet);
}

.process-step:nth-child(even):hover {
  box-shadow: 0 10px 30px rgba(37, 99, 235, 0.3);
  border-color: var(--cobalt);
}

.step-number {
  font-size: 2rem;
  font-weight: 700;
  margin-bottom: 15px;
  background: linear-gradient(45deg, var(--electric-violet), var(--accent-cyan));
  background-clip: text;
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  text-shadow: 0 0 20px rgba(139, 92, 246, 0.3);
}

/* Número alternado para cards pares */
.process-step:nth-child(even) .step-number {
  background: linear-gradient(45deg, var(--cobalt), var(--electric-violet));
  background-clip: text;
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
}

/* Versão com gradientes mais intensos (opcional) */
.process-step-intense:nth-child(odd) {
  background: linear-gradient(135deg, 
    rgba(124, 58, 237, 0.25), 
    rgba(37, 99, 235, 0.15), 
    var(--slate)
  );
}

.process-step-intense:nth-child(even) {
  background: linear-gradient(135deg, 
    rgba(37, 99, 235, 0.25), 
    rgba(34, 211, 238, 0.15), 
    var(--slate)
  );
}

/* Efeito sutil de brilho interno */
.process-step::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  height: 1px;
  background: linear-gradient(90deg, 
    transparent, 
    rgba(255, 255, 255, 0.1), 
    transparent
  );
}

        .process-step h3 {
            font-size: 1.4rem;
            margin-bottom: 10px;
        }
        .process-step p {
            color: var(--text-secondary);
            font-size: 0.95rem;
        }

        /* Portfolio Section */
        .portfolio-grid {
            display: grid;
            grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
            gap: 30px;
        }
        .portfolio-item {
            position: relative;
            border-radius: 12px;
            overflow: hidden;
            border: 1px solid var(--slate);
        }
        .portfolio-item img {
            width: 100%;
            height: 100%;
            object-fit: cover;
            transition: transform 0.4s ease;
        }
        .portfolio-overlay {
            position: absolute;
            inset: 0;
            background: linear-gradient(to top, rgba(11, 11, 18, 0.9), transparent);
            display: flex;
            flex-direction: column;
            justify-content: flex-end;
            padding: 25px;
            opacity: 1;
            transition: opacity 0.4s ease;
        }
        .portfolio-item:hover img {
            transform: scale(1.05);
        }
        .portfolio-item h3 {
            font-size: 1.5rem;
            transform: translateY(20px);
            opacity: 0;
            transition: transform 0.4s, opacity 0.4s;
        }
        .portfolio-item a {
            color: var(--accent-cyan);
            text-decoration: none;
            font-weight: 500;
            transform: translateY(20px);
            opacity: 0;
            transition: transform 0.4s 0.1s, opacity 0.4s 0.1s;
        }
        .portfolio-item:hover h3, .portfolio-item:hover a {
            transform: translateY(0);
            opacity: 1;
        }

        /* Deliverables Section (Accordion) */
        .accordion-container {
          max-width: 800px;
          margin: 0 auto;
        }
        .accordion-item {
          background: var(--graphite);
          border: 1px solid var(--slate);
          border-radius: 12px;
          margin-bottom: 15px;
          overflow: hidden;
        }
        .accordion-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          padding: 20px;
          cursor: pointer;
        }
        .accordion-header-content {
          display: flex;
          align-items: center;
          gap: 15px;
        }
        .accordion-header svg {
          flex-shrink: 0;
          color: var(--accent-cyan);
        }
        .accordion-header h3 {
          font-size: 1.2rem;
          font-weight: 500;
        }
        .accordion-icon {
          transition: transform 0.3s ease;
        }
        .accordion-icon.open {
          transform: rotate(45deg);
        }
        .accordion-content {
          display: grid;
          grid-template-rows: 0fr;
          transition: grid-template-rows 0.5s ease-in-out;
          color: var(--text-secondary);
        }
        .accordion-content > div {
          overflow: hidden;
        }
        .accordion-content p {
          padding: 0 20px 20px 60px;
          line-height: 1.6;
          opacity: 0;
          transition: opacity 0.3s ease-in-out 0.2s;
        }
        .accordion-content.open {
          grid-template-rows: 1fr;
        }
        .accordion-content.open p {
          opacity: 1;
        }

        /* Profile Section */
        .profile-cta {
    margin-top: 30px;
    text-align: center;
}

.profile-section .btn {
    display: inline-block;
    padding: 18px 36px;
    background: linear-gradient(135deg, var(--electric-violet) 0%, var(--cobalt) 100%);
    color: white;
    text-decoration: none;
    border-radius: 8px;
    font-weight: 600;
    font-size: 1.1rem;
    text-transform: uppercase;
    letter-spacing: 0.5px;
    transition: all 0.3s ease;
    box-shadow: 0 4px 15px rgba(142, 45, 226, 0.3);
    position: relative;
    overflow: hidden;
}

.profile-section .btn::before {
    content: "";
    position: absolute;
    top: 0;
    left: -100%;
    width: 100%;
    height: 100%;
    background: linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.2), transparent);
    transition: left 0.5s;
}

.profile-section .btn:hover {
    transform: translateY(-3px);
    box-shadow: 0 8px 25px rgba(142, 45, 226, 0.4);
    background: linear-gradient(135deg, var(--cobalt) 0%, var(--electric-violet) 100%);
}

.profile-section .btn:hover::before {
    left: 100%;
}

@media (max-width: 768px) {
    .profile-section .btn {
        padding: 16px 28px;
        font-size: 1rem;
    }
}

        .profile-section {
          background-color: var(--graphite);
          border-radius: 12px;
          padding: 60px;
          text-align: center;
          border: 1px solid var(--slate);
        }
        .profile-section ul {
          list-style: none;
          display: inline-block;
          text-align: left;
          margin: 30px 0;
          color: var(--text-secondary);
        }
        .profile-section li {
          margin-bottom: 10px;
          display: flex;
          align-items: center;
          gap: 10px;
        }
          .portfolio-cta {
    text-align: center;
    max-width: 600px;
    margin: 60px auto 0;
    padding: 40px;
    background: linear-gradient(135deg, var(--graphite) 0%, var(--slate) 100%);
    border-radius: 16px;
    border: 1px solid rgba(142, 45, 226, 0.2);
    position: relative;
    overflow: hidden;
}

.portfolio-cta::before {
    content: "";
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    height: 1px;
    background: linear-gradient(90deg, transparent, var(--electric-violet), transparent);
}

.portfolio-cta h3 {
    font-size: 1.8rem;
    color: var(--text-primary);
    margin-bottom: 16px;
    background: linear-gradient(135deg, var(--electric-violet), var(--accent-cyan));
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
}

.portfolio-cta p {
    color: var(--text-secondary);
    font-size: 1.1rem;
    line-height: 1.6;
    margin-bottom: 30px;
}

.portfolio-cta .btn {
    display: inline-block;
    padding: 16px 32px;
    background: linear-gradient(135deg, var(--electric-violet) 0%, var(--cobalt) 100%);
    color: white;
    text-decoration: none;
    border-radius: 8px;
    font-weight: 600;
    text-transform: uppercase;
    letter-spacing: 0.5px;
    transition: all 0.3s ease;
    box-shadow: 0 4px 15px rgba(142, 45, 226, 0.3);
}

.portfolio-cta .btn:hover {
    transform: translateY(-2px);
    box-shadow: 0 8px 25px rgba(142, 45, 226, 0.4);
    background: linear-gradient(135deg, var(--cobalt) 0%, var(--electric-violet) 100%);
}

@media (max-width: 768px) {
    .portfolio-cta {
        margin: 40px 20px 0;
        padding: 30px 20px;
    }
    
    .portfolio-cta h3 {
        font-size: 1.5rem;
    }
    
    .portfolio-cta p {
        font-size: 1rem;
    }
}


        /* About Section */
        .about-content {
            text-align: center;
            max-width: 800px;
            margin: 0 auto;
        }
        .about-content p {
            color: var(--text-secondary);
            font-size: 1.1rem;
            line-height: 1.7;
        }
        .about-content p:not(:last-child) {
            margin-bottom: 20px;
        }

        /* Form Section */
       .form-wrapper {
  max-width: 600px;
  margin: 50px auto;
  background: var(--graphite);
  padding: 40px;
  border-radius: 12px;
  border: 1px solid var(--slate);
  box-sizing: border-box;
}

.form-wrapper form {
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
}

.form-group {
  margin-bottom: 25px;
  width: 100%;
  max-width: 400px;
}

.form-group label {
  display: block;
  margin-bottom: 8px;
  font-weight: 500;
  color: var(--text-secondary);
  text-align: left;
}

.form-group input,
.form-group select {
  width: 100%;
  padding: 12px;
  border-radius: 6px;
  border: 1px solid var(--slate);
  background-color: var(--onyx);
  color: var(--text-primary);
  font-family: 'Poppins', sans-serif;
  font-size: 1rem;
  box-sizing: border-box;
}

.form-group input:focus,
.form-group select:focus {
  outline: none;
  border-color: var(--electric-violet);
  box-shadow: 0 0 0 2px rgba(142, 45, 226, 0.2);
}

/* Responsividade */
@media (max-width: 768px) {
  .form-wrapper {
    max-width: 90%;
    margin: 30px auto;
    padding: 30px;
  }
}

@media (max-width: 480px) {
  .form-wrapper {
    margin: 20px auto;
    padding: 20px;
  }
  
  .form-group,
  .btn.btn-primary {
    max-width: 100%;
  }
}


            

        /* Footer */
        .footer {
            padding: 60px 5%;
            border-top: 1px solid var(--slate);
            background-color: var(--graphite);
        }
        .footer-content {
          max-width: 1200px;
          margin: 0 auto;
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 30px;
        }
        .footer .logo {
          font-size: 2.5rem;
        }
        .footer .nav-links {
          margin-bottom: 20px;
        }
        .footer-copyright {
            text-align: center;
            color: var(--text-secondary);
            font-size: 0.9rem;
        }
        
        @media (max-width: 768px) {
            h2 {
                font-size: 2rem;
            }
            .nav-links {
              position: fixed;
              top: 0;
              left: 0;
              width: 100%;
              height: 100vh;
              background-color: var(--onyx);
              flex-direction: column;
              justify-content: center;
              align-items: center;
              transform: translateX(-100%);
              transition: transform 0.3s ease-in-out;
              padding: 0;
            }
            .nav-links.open {
              transform: translateX(0);
            }
            .nav-links li {
              margin: 20px 0;
            }
            .nav-links a {
              font-size: 1.5rem;
            }
            .menu-toggle {
              display: block;
              z-index: 1001;
            }
            .benefits-grid {
                grid-template-columns: 1fr;
            }
            .profile-section {
                padding: 40px 20px;
            }
        }
      `}</style>
      
      <header className="header">
        <a href="#" className="logo">rw&gt;</a>
        <nav>
            <ul className={`nav-links ${isMenuOpen ? 'open' : ''}`}>
                <li><a href="#processo" onClick={() => setIsMenuOpen(false)}>Processo</a></li>
                <li><a href="#portfolio" onClick={() => setIsMenuOpen(false)}>Portfólio</a></li>
                <li><a href="#sobre" onClick={() => setIsMenuOpen(false)}>Sobre</a></li>
                <li><a href="#faq" onClick={() => setIsMenuOpen(false)}>FAQ</a></li>
                <li><a href="#contact" onClick={() => setIsMenuOpen(false)}>Contato</a></li>
            </ul>
        </nav>
        <button className="menu-toggle" onClick={() => setIsMenuOpen(!isMenuOpen)}>
            {isMenuOpen ? <span>&times;</span> : <span>&#9776;</span>}
        </button>
      </header>

      <main>
        {/* Hero Section */}
        <section className="hero">
          <div className="hero-content">
            <h1>Explore o Oceano Azul Que Seus Concorrentes Ainda Não Descobriram</h1>
            <p>Milhares de pessoas procuram estética automotiva todo dia no Google, mas quase ninguém do seu nicho está lá. Esta é sua chance.</p>
<GoogleSearchMock />
          </div>
        </section>

        {/* Benefits Section */}
        <section className="container">
          <FadeInSection>
            <h2>Google ou Instagram? <span>Onde estão seus melhores clientes?</span></h2>
            <p className="section-description">O Instagram é ótimo para relacionamento, mas clientes com intenção de compra procuram no Google. Ter um site é ter um vendedor trabalhando para você 24h por dia, no lugar certo.</p>
            <div className="benefits-grid">
              <div className="benefit-card">
                <h3>
                  <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="11" cy="11" r="8"></circle><line x1="21" y1="21" x2="16.65" y2="16.65"></line></svg>
                  O Poder do Google
                </h3>
                <p>No Google, o cliente já sabe o que quer e está procurando ativamente por "estética automotiva na minha cidade". Um site profissional coloca você no topo dos resultados, atraindo clientes prontos para contratar.</p>
              </div>
              <div className="benefit-card">
                <h3>
                  <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path><line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line></svg>
                  A Fragilidade do Instagram
                </h3>
                <p>No Instagram, você está em um "terreno alugado". O alcance diminui, as regras mudam e a conta pode ser perdida. Seu site é seu ativo digital, um castelo que ninguém pode tirar de você.</p>
              </div>
            </div>
             <div className="complementary-note">
Não se trata de escolher um ou outro. O segredo é ter site e Instagram trabalhando lado a lado para fazer seu negócio crescer.<br/><strong>
Site + Instagram = Sucesso Garantido
</strong>
            </div>
          </FadeInSection>
        </section>

        {/* Process Section */}
        <section id="processo" className="container">
          <FadeInSection>
            <h2>Nosso Processo de <span>Desenvolvimento</span></h2>
            <p className="section-description">Criamos projetos únicos em 4 etapas estratégicas, garantindo um resultado que reflete a excelência do seu trabalho.</p>
            <div className="process-grid">
              <div className="process-step">
                <div className="step-number">01</div>
                <h3>Imersão e Estratégia</h3>
                <p>Entendemos seu negócio, público e objetivos para criar uma estratégia digital matadora.</p>
              </div>
              <div className="process-step">
                <div className="step-number">02</div>
                <h3>Design Exclusivo</h3>
                <p>Criamos um layout moderno e intuitivo, focado na experiência do usuário e na conversão.</p>
              </div>
              <div className="process-step">
                <div className="step-number">03</div>
                <h3>Desenvolvimento</h3>
                <p>Codificamos um site rápido, responsivo e otimizado para os motores de busca (SEO).</p>
              </div>
              <div className="process-step">
                <div className="step-number">04</div>
                <h3>Lançamento e Suporte</h3>
                <p>Publicamos seu site e oferecemos todo o suporte para que você decole no mundo digital.</p>
              </div>
            </div>
          </FadeInSection>
        </section>
        
        {/* Portfolio Section */}
        <section id="portfolio" className="container">
    <FadeInSection>
        <h2>Portfólio de <span>Projetos</span></h2>
        <p className="section-description">Confira alguns sites que desenvolvemos para estéticas automotivas que, como a sua, buscaram se destacar no mercado digital.</p>
        <div className="portfolio-grid">
            {portfolioItems.map(item => (
                <div key={item.name} className="portfolio-item">
                    <img src={item.img} alt={item.name} />
                    <div className="portfolio-overlay">
                        <h3>{item.name}</h3>
                        <a href={item.url} target="_blank" rel="noopener noreferrer">Ver projeto &rarr;</a>
                    </div>
                </div>
            ))}
        </div>
        
        {/* ADICIONE ESTA SEÇÃO */}
        <div className="portfolio-cta">
            <h3>Seu Projeto Pode Ser o Próximo Case de Sucesso</h3>
            <p>Estas estéticas dominaram seus mercados locais. Agora é a sua vez de brilhar no oceano azul do Google.</p>
            <a href="#contact" className="btn btn-primary">
                Quero Dominar Meu Mercado
            </a>
        </div>
    </FadeInSection>
</section>


        {/* Deliverables Section */}
        <section className="container">
            <FadeInSection>
                <h2>O que <span>Você Recebe</span></h2>
                <p className="section-description">Entregamos mais que um site. Entregamos uma solução completa para sua presença online.</p>
                <div className="accordion-container">
                    {deliverables.map((item, index) => (
                        <div className="accordion-item" key={index}>
                            <div className="accordion-header" onClick={() => toggleAccordion(index)}>
                                <div className="accordion-header-content">
                                    {item.icon}
                                    <h3>{item.title}</h3>
                                </div>
                                <div className={`accordion-icon ${openAccordion === index ? 'open' : ''}`}>
                                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="12" y1="5" x2="12" y2="19"></line><line x1="5" y1="12" x2="19" y2="12"></line></svg>
                                </div>
                            </div>
                            <div className={`accordion-content ${openAccordion === index ? 'open' : ''}`}>
                                <div>
                                   <p>{item.content}</p>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </FadeInSection>
        </section>

        {/* Profile Section */}
        <section className="container">
    <FadeInSection>
        <div className="profile-section">
            <h2>Você está pronto para o <span>próximo nível?</span></h2>
            <p className="section-description" style={{marginBottom: 0}}>Se você se identifica com algum destes pontos, estamos prontos para ajudar.</p>
            <ul>
                <li><svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="var(--accent-cyan)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"></polyline></svg> Sua estética é premium e quer um site que reflita essa qualidade.</li>
                <li><svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="var(--accent-cyan)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"></polyline></svg> Quer ser encontrado por quem já procura serviços de estética automotiva e faturar mais?</li>
                <li><svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="var(--accent-cyan)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"></polyline></svg> Quer conquistar mais visibilidade e se tornar autoridade na sua região.</li>
                <li><svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="var(--accent-cyan)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"></polyline></svg> Cansou de depender apenas do "boca a boca" e das redes sociais.</li>
            </ul>
            <p>Um site bem construído não é um custo, é o investimento que separa os amadores dos profissionais e eleva o seu faturamento e posicionamento a um novo patamar.</p>
            
            {/* ADICIONE ESTE CTA */}
            <div className="profile-cta">
                <a href="#contact" className="btn btn-primary">
                    Estou Pronto
                </a>
            </div>
        </div>
    </FadeInSection>
</section>


        {/* FAQ Section */}
<section id="faq" className="container">
  <FadeInSection>
    <h2>Dúvidas <span>Frequentes</span></h2>
    <p className="section-description">
      Esclarecemos as principais questões sobre nosso trabalho e processo de desenvolvimento.
    </p>
    <div className="accordion-container">
      {faqData.map((item, index) => (
        <div className="accordion-item" key={index}>
          <div className="accordion-header" onClick={() => toggleAccordion(index + deliverables.length)}>
            <div className="accordion-header-content">
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <circle cx="12" cy="12" r="10"></circle>
                <path d="M9,9h6v6H9V9z"></path>
              </svg>
              <h3>{item.question}</h3>
            </div>
            <div className={`accordion-icon ${openAccordion === index + deliverables.length ? 'open' : ''}`}>
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <line x1="12" y1="5" x2="12" y2="19"></line>
                <line x1="5" y1="12" x2="19" y2="12"></line>
              </svg>
            </div>
          </div>
          <div className={`accordion-content ${openAccordion === index + deliverables.length ? 'open' : ''}`}>
            <div>
              <p>{item.answer}</p>
            </div>
          </div>
        </div>
      ))}
    </div>
  </FadeInSection>
</section>


        {/* About Section */}
        <section id="sobre" className="container">
            <FadeInSection>
                <h2>Por que nos <span>escolher?</span></h2>
                <div className="about-content">
                    <p>Nós não somos uma agência genérica. Respiramos e entendemos o mercado de estética automotiva. Sabemos exatamente o que seu cliente procura e como transformar o seu site em uma máquina de agendamentos.</p>
                    <p>Nossa especialização no seu nicho nos permite criar uma comunicação direta e eficaz, destacando o que realmente importa para o seu público e posicionando sua empresa como a melhor escolha.</p>
                </div>
            </FadeInSection>
        </section>
        
        {/* Form Section */}
        <section id="contact" className="contact">
       <FormularioContato />
        </section>

      </main>

      <footer className="footer">
        <div className="footer-content">
          <a href="#" className="logo">rw&gt;</a>
           <ul className="nav-links">
                <li><a href="#processo">Processo</a></li>
                <li><a href="#portfolio">Portfólio</a></li>
                <li><a href="#sobre">Sobre</a></li>
                <li><a href="#faq">FAQ</a></li>
                <li><a href="#contact">Contato</a></li>
            </ul>
           <div className="footer-copyright">
                <p>&copy; {new Date().getFullYear()} ReferenciaWeb. Todos os direitos reservados.</p>
           </div>
        </div>
      </footer>
    </>
  );
};

const container = document.getElementById('root');
const root = createRoot(container!);
root.render(<App />);