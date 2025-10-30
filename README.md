# 🚀 Xopy - Lançamento Oficial

Landing page para o lançamento oficial do aplicativo **Xopy**, com sistema de confirmação de presença (RSVP) e painel administrativo.

![Xopy](https://img.shields.io/badge/Status-Em%20Desenvolvimento-yellow)
![React](https://img.shields.io/badge/React-19.1.1-blue)
![TypeScript](https://img.shields.io/badge/TypeScript-5.8.2-blue)
![Supabase](https://img.shields.io/badge/Supabase-2.77.0-green)

## 📋 Sobre o Projeto

O **Xopy** é um aplicativo revolucionário para o setor de construção civil que conecta lojas, prestadores de serviço e clientes em um único lugar. Esta landing page foi criada para o evento de lançamento oficial do aplicativo.

### ✨ Funcionalidades

- 🎯 **Landing Page Moderna** - Design atrativo com animações e countdown
- 📝 **Sistema de RSVP** - Confirmação de presença para o evento
- 👥 **Painel Admin** - Visualização de confirmados e ausentes
- 📊 **Estatísticas em Tempo Real** - Contadores automáticos
- 🔗 **Compartilhamento** - Link especial para convidados
- 📱 **Responsivo** - Funciona perfeitamente em mobile e desktop
- 🗄️ **Banco de Dados** - Integração com Supabase

## 🛠️ Tecnologias

- **React 19** - Framework JavaScript
- **TypeScript** - Tipagem estática
- **Vite** - Build tool
- **Tailwind CSS** - Estilização
- **Supabase** - Banco de dados e backend
- **Lucide React** - Ícones
- **Framer Motion** - Animações

## 🚀 Como Executar

### Pré-requisitos

- Node.js 18+ instalado
- Conta no Supabase (gratuita)

### Instalação

1. Clone o repositório:
```bash
git clone https://github.com/osanchesdigital-stack/lan-amento-xopy.git
cd lan-amento-xopy
```

2. Instale as dependências:
```bash
npm install
```

3. Configure o Supabase:
   - Crie um projeto no [Supabase](https://supabase.com)
   - Execute o SQL do arquivo `supabase-schema.sql` no SQL Editor
   - Copie suas credenciais

4. Configure as variáveis de ambiente:
```bash
copy .env.example .env.local
```

Edite `.env.local` com suas credenciais:
```env
VITE_SUPABASE_URL=https://seu-projeto.supabase.co
VITE_SUPABASE_ANON_KEY=sua-chave-aqui
```

5. Inicie o servidor de desenvolvimento:
```bash
npm run dev
```

6. Acesse: `http://localhost:5173`

## 📚 Documentação

- 📖 [Guia de Setup Completo](SUPABASE_SETUP.md)
- 🔌 [Exemplos de Integração](INTEGRACAO_EXEMPLO.md)
- 🗄️ [Documentação do Banco](README_SUPABASE.md)
- ✅ [Verificação de Variáveis](VERIFICACAO_VARIAVEIS.md)

## 🗄️ Estrutura do Banco de Dados

### Tabela: `rsvp_confirmations`

| Campo | Tipo | Descrição |
|-------|------|-----------|
| id | UUID | Identificador único |
| name | VARCHAR | Nome do convidado |
| rsvp | VARCHAR | 'yes' ou 'no' |
| reason | TEXT | Motivo da ausência (opcional) |
| created_at | TIMESTAMP | Data de criação |
| updated_at | TIMESTAMP | Data de atualização |

## 🎨 Estrutura do Projeto

```
lancamento-xopy/
├── public/
│   └── construction-bg.svg      # Imagem de fundo
├── src/
│   ├── components/
│   │   └── Typewriter.tsx       # Componente de animação
│   ├── hooks/
│   │   └── useRsvp.ts          # Hook para gerenciar RSVPs
│   ├── lib/
│   │   └── supabase.ts         # Cliente Supabase
│   ├── App.tsx                  # Componente principal
│   └── index.tsx                # Entry point
├── supabase-schema.sql          # Schema do banco
├── test-supabase.html           # Teste de conexão
└── package.json
```

## 🔒 Segurança

- ✅ Variáveis de ambiente protegidas no `.gitignore`
- ✅ Row Level Security (RLS) configurado no Supabase
- ✅ Validação de dados no frontend e backend
- ⚠️ Para produção, adicione autenticação no painel admin

## 🧪 Testes

### Testar Conexão com Supabase

Abra o arquivo `test-supabase.html` no navegador e clique nos botões de teste.

### Testar no Código

```typescript
import { useRsvp } from './hooks/useRsvp';

function TestComponent() {
  const { stats, loading, error } = useRsvp();
  
  if (loading) return <div>Carregando...</div>;
  if (error) return <div>Erro: {error}</div>;
  
  return (
    <div>
      <p>Confirmados: {stats?.confirmed_count}</p>
      <p>Ausentes: {stats?.absent_count}</p>
    </div>
  );
}
```

## 📦 Build para Produção

```bash
npm run build
```

Os arquivos otimizados estarão na pasta `dist/`.

## 🚀 Deploy

### Vercel (Recomendado)

1. Instale a CLI da Vercel:
```bash
npm i -g vercel
```

2. Faça o deploy:
```bash
vercel
```

3. Configure as variáveis de ambiente no painel da Vercel

### Netlify

1. Conecte o repositório no Netlify
2. Configure as variáveis de ambiente
3. Deploy automático a cada push

## 🤝 Contribuindo

1. Fork o projeto
2. Crie uma branch para sua feature (`git checkout -b feature/MinhaFeature`)
3. Commit suas mudanças (`git commit -m 'Adiciona MinhaFeature'`)
4. Push para a branch (`git push origin feature/MinhaFeature`)
5. Abra um Pull Request

## 📝 Licença

Este projeto está sob a licença MIT. Veja o arquivo [LICENSE](LICENSE) para mais detalhes.

## 👥 Autores

- **Equipe Xopy** - [osanchesdigital-stack](https://github.com/osanchesdigital-stack)

## 📞 Contato

- Instagram: [@xopy_app](https://www.instagram.com/xopy_app/)
- Website: [app.xopy.com.br](https://app.xopy.com.br/)

## 🎉 Agradecimentos

- Comunidade React
- Supabase Team
- Todos os contribuidores

---

**Feito com ❤️ pela equipe Xopy**
