# 🚀 Deploy na Netlify - Guia Completo

## ⚠️ Problema: Tela Preta

Se você está vendo tela preta, siga estes passos:

## 🔧 Correções Aplicadas

1. ✅ Corrigido `charset` no index.html (era "UTF-to", agora é "UTF-8")
2. ✅ Removido importmap (não funciona bem em produção)
3. ✅ Corrigido caminho do script (de `/index.tsx` para `/src/index.tsx`)
4. ✅ Criado `netlify.toml` com configurações corretas
5. ✅ Simplificado `vite.config.ts`

## 📋 Passo a Passo para Deploy

### 1. Configurar Variáveis de Ambiente na Netlify

1. Acesse seu site na Netlify
2. Vá em **Site settings** > **Environment variables**
3. Clique em **Add a variable**
4. Adicione as seguintes variáveis:

```
Key: VITE_SUPABASE_URL
Value: https://rrxmpdsbxeogkgcpkkin.supabase.co

Key: VITE_SUPABASE_ANON_KEY
Value: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InJyeG1wZHNieGVvZ2tnY3Bra2luIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjE3NTU2OTksImV4cCI6MjA3NzMzMTY5OX0.Q4BbxkD9jZzfEAmVy5KT7sL6iVAfNtEotrPdTN0f_1s
```

### 2. Fazer Commit e Push das Correções

```bash
git add .
git commit -m "fix: Corrige deploy na Netlify (charset, importmap, paths)"
git push origin main
```

### 3. Verificar Build Settings na Netlify

Certifique-se de que as configurações estão assim:

- **Build command:** `npm run build`
- **Publish directory:** `dist`
- **Node version:** 18 ou superior

### 4. Fazer Redeploy

1. Vá em **Deploys**
2. Clique em **Trigger deploy** > **Deploy site**
3. Aguarde o build terminar

### 5. Verificar Logs

Se ainda houver erro:

1. Vá em **Deploys**
2. Clique no último deploy
3. Veja os logs de build
4. Procure por erros em vermelho

## 🐛 Troubleshooting

### Erro: "Failed to load module"

**Solução:** Verifique se as variáveis de ambiente foram configuradas corretamente.

### Erro: "Cannot find module"

**Solução:** Limpe o cache e faça rebuild:
1. Na Netlify, vá em **Deploys**
2. Clique em **Deploy settings**
3. Role até **Build & deploy**
4. Clique em **Clear cache and retry deploy**

### Erro: "Blank page" ou "Tela preta"

**Solução:** Abra o console do navegador (F12) e veja os erros. Geralmente são:

1. **Variáveis de ambiente não configuradas**
   - Configure no painel da Netlify

2. **Erro de CORS do Supabase**
   - Adicione o domínio da Netlify nas configurações do Supabase
   - Vá em: Authentication > URL Configuration
   - Adicione: `https://seu-site.netlify.app`

3. **Erro 404 nos assets**
   - Verifique se o `netlify.toml` está na raiz do projeto

## ✅ Checklist de Deploy

- [ ] Variáveis de ambiente configuradas na Netlify
- [ ] Build command: `npm run build`
- [ ] Publish directory: `dist`
- [ ] Node version: 18+
- [ ] Arquivos corrigidos commitados e pushed
- [ ] Redeploy feito
- [ ] Site abrindo sem tela preta
- [ ] Console do navegador sem erros
- [ ] Formulário RSVP funcionando
- [ ] Painel admin acessível

## 🔍 Como Testar

1. Abra o site da Netlify
2. Abra o console do navegador (F12)
3. Vá na aba **Console**
4. Veja se há erros
5. Teste o formulário de RSVP
6. Teste o painel admin (clique no ícone de escudo)

## 📱 Testar em Diferentes Dispositivos

- [ ] Desktop (Chrome, Firefox, Safari)
- [ ] Mobile (iOS Safari, Android Chrome)
- [ ] Tablet

## 🆘 Ainda com Problemas?

Se ainda estiver com tela preta:

1. Compartilhe a URL do site
2. Compartilhe os logs de build da Netlify
3. Compartilhe os erros do console do navegador (F12)

## 🎉 Deploy Bem-Sucedido!

Quando tudo estiver funcionando:

1. Teste todas as funcionalidades
2. Compartilhe o link com os convidados
3. Monitore as confirmações no painel admin

## 📊 Monitoramento

A Netlify oferece:
- Analytics (tráfego, visitantes)
- Logs de deploy
- Logs de função (se usar)
- Alertas de erro

Acesse em: **Analytics** no menu lateral

## 🔄 Atualizações Futuras

Para fazer atualizações:

1. Faça as mudanças no código local
2. Commit: `git commit -m "feat: sua mudança"`
3. Push: `git push origin main`
4. A Netlify fará deploy automático!

## 🌐 Domínio Customizado (Opcional)

Para usar um domínio próprio:

1. Vá em **Domain settings**
2. Clique em **Add custom domain**
3. Siga as instruções para configurar DNS
4. Aguarde propagação (pode levar até 48h)

---

**Dica:** Sempre teste localmente antes de fazer push:
```bash
npm run build
npm run preview
```
