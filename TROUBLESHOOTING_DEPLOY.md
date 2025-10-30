# 🔧 Troubleshooting - Deploy Netlify

## ✅ Problemas Resolvidos

### 1. ❌ Tela Preta
**Erro:** Página carrega mas fica preta

**Causas Identificadas:**
- charset incorreto no index.html (UTF-to em vez de UTF-8)
- importmap não funciona em produção
- Caminho do script incorreto

**Solução Aplicada:**
- ✅ Corrigido charset para UTF-8
- ✅ Removido importmap
- ✅ Corrigido caminho do script

### 2. ❌ Failed to resolve /src/index.tsx
**Erro:** `Failed to resolve /src/index.tsx from /opt/build/repo/index.html`

**Causa:**
- O arquivo `index.tsx` está na raiz do projeto, não em `src/`

**Solução Aplicada:**
- ✅ Alterado de `/src/index.tsx` para `/index.tsx` no index.html

### 3. ❌ Could not resolve "../lib/supabase"
**Erro:** `Could not resolve "../lib/supabase" from "hooks/useRSVP.ts"`

**Causa:**
- A pasta `lib` está em `src/lib/`, mas os hooks estão na raiz em `hooks/`
- Import relativo estava incorreto

**Solução Aplicada:**
- ✅ Corrigido em `hooks/useRSVP.ts`: `../lib/supabase` → `../src/lib/supabase`
- ✅ Corrigido em `hooks/usePosts.ts`: `../lib/supabase` → `../src/lib/supabase`

## 📁 Estrutura do Projeto

```
lancamento-xopy/
├── src/
│   ├── lib/
│   │   └── supabase.ts          ← Aqui está o supabase
│   └── hooks/
│       └── useRsvp.ts
├── hooks/                        ← Hooks na raiz
│   ├── useRSVP.ts               ← Importa de ../src/lib/supabase
│   └── usePosts.ts              ← Importa de ../src/lib/supabase
├── components/
├── pages/
├── index.tsx                     ← Na raiz
├── App.tsx                       ← Na raiz
└── index.html                    ← Aponta para /index.tsx
```

## 🔍 Como Diagnosticar Erros

### 1. Verificar Logs de Build na Netlify

1. Acesse seu site na Netlify
2. Vá em **Deploys**
3. Clique no último deploy
4. Role até a seção de logs
5. Procure por linhas em vermelho com "error"

### 2. Verificar Console do Navegador

1. Abra o site
2. Pressione F12
3. Vá na aba **Console**
4. Veja se há erros em vermelho

### 3. Verificar Network

1. F12 > Aba **Network**
2. Recarregue a página
3. Veja se algum arquivo retorna 404

## 🚨 Erros Comuns e Soluções

### Erro: "Module not found"
**Causa:** Import path incorreto

**Solução:**
1. Verifique a estrutura de pastas
2. Ajuste os imports relativos
3. Use caminhos absolutos se necessário

### Erro: "Environment variable not defined"
**Causa:** Variáveis de ambiente não configuradas

**Solução:**
1. Vá em Site settings > Environment variables
2. Adicione `VITE_SUPABASE_URL` e `VITE_SUPABASE_ANON_KEY`
3. Faça redeploy

### Erro: "Failed to fetch"
**Causa:** CORS ou Supabase não configurado

**Solução:**
1. Verifique se o SQL foi executado no Supabase
2. Adicione o domínio da Netlify nas configurações do Supabase
3. Verifique as políticas RLS

### Erro: "Blank page" após deploy
**Causa:** JavaScript não está carregando

**Solução:**
1. Verifique o console (F12)
2. Veja se há erros de import
3. Verifique se todos os arquivos foram commitados

## ✅ Checklist Final

Antes de fazer deploy:

- [ ] `npm run build` funciona localmente
- [ ] `npm run preview` mostra o site funcionando
- [ ] Todos os arquivos foram commitados
- [ ] .env.local está no .gitignore
- [ ] Variáveis de ambiente configuradas na Netlify
- [ ] netlify.toml está na raiz
- [ ] index.html aponta para o arquivo correto
- [ ] Imports estão corretos

## 🧪 Testar Localmente Antes de Deploy

```bash
# 1. Build
npm run build

# 2. Preview (simula produção)
npm run preview

# 3. Abra http://localhost:4173
# 4. Teste todas as funcionalidades
# 5. Veja o console (F12) para erros
```

## 📝 Comandos Úteis

### Limpar cache e reinstalar
```bash
rm -rf node_modules package-lock.json
npm install
```

### Verificar build localmente
```bash
npm run build
```

### Ver preview do build
```bash
npm run preview
```

### Verificar estrutura de pastas
```bash
# Windows
tree /F

# Linux/Mac
tree
```

## 🔄 Processo de Deploy Correto

1. **Desenvolver localmente**
   ```bash
   npm run dev
   ```

2. **Testar build**
   ```bash
   npm run build
   npm run preview
   ```

3. **Commit e push**
   ```bash
   git add .
   git commit -m "feat: sua mudança"
   git push origin main
   ```

4. **Aguardar deploy automático na Netlify**

5. **Verificar logs de build**

6. **Testar site em produção**

## 📊 Status Atual

### ✅ Correções Aplicadas

1. ✅ charset UTF-8
2. ✅ Removido importmap
3. ✅ Caminho do index.tsx corrigido
4. ✅ Imports do supabase corrigidos
5. ✅ netlify.toml criado
6. ✅ vite.config.ts simplificado

### ⏳ Aguardando

- Deploy automático na Netlify
- Configuração de variáveis de ambiente

### 🎯 Próximos Passos

1. Aguardar deploy terminar
2. Configurar variáveis de ambiente
3. Testar site
4. Compartilhar com convidados

## 🆘 Ainda com Problemas?

Se após todas as correções ainda houver erro:

1. **Compartilhe:**
   - URL do site
   - Logs completos de build
   - Erros do console (F12)
   - Screenshots

2. **Verifique:**
   - Versão do Node (deve ser 18+)
   - Todas as dependências instaladas
   - Variáveis de ambiente configuradas

3. **Tente:**
   - Clear cache and retry deploy na Netlify
   - Deletar e recriar o site na Netlify
   - Verificar se o repositório está público

## 📚 Recursos

- [Netlify Docs](https://docs.netlify.com/)
- [Vite Docs](https://vitejs.dev/)
- [Supabase Docs](https://supabase.com/docs)
- [React Docs](https://react.dev/)

---

**Última atualização:** Todas as correções aplicadas e pushed para o GitHub
