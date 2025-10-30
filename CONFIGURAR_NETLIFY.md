# 🔑 Como Configurar Variáveis de Ambiente na Netlify

## ⚠️ ERRO ATUAL

```
Uncaught Error: Faltam as variáveis de ambiente do Supabase. 
Verifique o arquivo .env.local
```

**Causa:** As variáveis de ambiente não estão configuradas na Netlify.

## 📋 Solução: Passo a Passo

### Passo 1: Acessar o Site na Netlify

1. Acesse: https://app.netlify.com
2. Faça login (se necessário)
3. Clique no seu site: **convite-xopy**

### Passo 2: Ir para Configurações

No menu lateral esquerdo, procure por uma dessas opções:
- **Site configuration** (novo layout)
- **Site settings** (layout antigo)

Clique nela.

### Passo 3: Encontrar Environment Variables

Role a página ou procure no menu lateral por:
- **Environment variables**
- **Environment**
- **Build & deploy** > **Environment**

Clique nessa opção.

### Passo 4: Adicionar Primeira Variável

1. Clique no botão **Add a variable** ou **Add environment variable**

2. Preencha:
   ```
   Key: VITE_SUPABASE_URL
   Value: https://rrxmpdsbxeogkgcpkkin.supabase.co
   ```

3. Clique em **Create variable** ou **Save**

### Passo 5: Adicionar Segunda Variável

1. Clique novamente em **Add a variable**

2. Preencha:
   ```
   Key: VITE_SUPABASE_ANON_KEY
   Value: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InJyeG1wZHNieGVvZ2tnY3Bra2luIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjE3NTU2OTksImV4cCI6MjA3NzMzMTY5OX0.Q4BbxkD9jZzfEAmVy5KT7sL6iVAfNtEotrPdTN0f_1s
   ```

3. Clique em **Create variable** ou **Save**

### Passo 6: Verificar se Foram Criadas

Você deve ver algo assim:

```
VITE_SUPABASE_URL = https://rrxmpdsbxeogkgcpkkin.supabase.co
VITE_SUPABASE_ANON_KEY = eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
```

### Passo 7: Fazer Novo Deploy

1. No menu lateral, clique em **Deploys**

2. Clique no botão **Trigger deploy** (canto superior direito)

3. Selecione **Deploy site**

4. Aguarde o build terminar (1-2 minutos)

5. Quando aparecer "Published" com um checkmark verde, está pronto!

### Passo 8: Testar o Site

1. Clique no link do site (algo como: https://convite-xopy.netlify.app)

2. O site deve carregar normalmente (sem tela preta)

3. Abra o console (F12) e verifique se não há mais o erro

## ✅ Checklist

- [ ] Acessei o painel da Netlify
- [ ] Encontrei Site configuration/settings
- [ ] Encontrei Environment variables
- [ ] Adicionei VITE_SUPABASE_URL
- [ ] Adicionei VITE_SUPABASE_ANON_KEY
- [ ] Fiz um novo deploy (Trigger deploy)
- [ ] Aguardei o build terminar
- [ ] Testei o site
- [ ] Site carrega sem tela preta
- [ ] Console sem erros

## 🎯 Valores Exatos para Copiar

### VITE_SUPABASE_URL
```
https://rrxmpdsbxeogkgcpkkin.supabase.co
```

### VITE_SUPABASE_ANON_KEY
```
eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InJyeG1wZHNieGVvZ2tnY3Bra2luIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjE3NTU2OTksImV4cCI6MjA3NzMzMTY5OX0.Q4BbxkD9jZzfEAmVy5KT7sL6iVAfNtEotrPdTN0f_1s
```

## 🔍 Como Verificar se Funcionou

### No Console do Navegador (F12):

**ANTES (com erro):**
```
❌ Uncaught Error: Faltam as variáveis de ambiente do Supabase
```

**DEPOIS (funcionando):**
```
✅ Sem erros relacionados ao Supabase
```

### Na Página:

**ANTES:**
- Tela preta
- Nada aparece

**DEPOIS:**
- Landing page do Xopy aparece
- Countdown funcionando
- Formulário RSVP visível

## 🆘 Problemas Comuns

### "Não encontro Environment variables"

**Solução:**
- Tente procurar em: Site settings > Build & deploy > Environment
- Ou use a busca no topo da página: digite "environment"

### "Adicionei mas ainda dá erro"

**Solução:**
- Certifique-se de fazer um NOVO deploy após adicionar as variáveis
- Vá em Deploys > Trigger deploy > Deploy site
- Aguarde o build terminar completamente

### "O nome da variável está correto?"

**Importante:**
- Deve ser EXATAMENTE: `VITE_SUPABASE_URL` (com VITE_ no início)
- Deve ser EXATAMENTE: `VITE_SUPABASE_ANON_KEY` (com VITE_ no início)
- Vite requer o prefixo `VITE_` para expor variáveis ao frontend

### "Copiei errado a chave"

**Solução:**
- A chave é MUITO longa (várias linhas)
- Copie TUDO, do início ao fim
- Não deixe espaços no início ou fim
- Use Ctrl+A para selecionar tudo no campo de texto

## 📱 Testando Após Deploy

1. **Abra o site**
   - Clique no link da Netlify

2. **Abra o Console (F12)**
   - Veja se há erros

3. **Teste o Formulário**
   - Preencha nome
   - Selecione "Sim" ou "Não"
   - Clique em "Enviar Confirmação"

4. **Teste o Painel Admin**
   - Clique no ícone de escudo (canto inferior direito)
   - Veja se aparecem as estatísticas

## 🎉 Sucesso!

Quando tudo estiver funcionando:

- ✅ Site carrega normalmente
- ✅ Sem tela preta
- ✅ Console sem erros
- ✅ Formulário funciona
- ✅ Painel admin acessível

## 📞 Ainda com Dúvidas?

Se após seguir todos os passos ainda houver problema:

1. Tire um print da tela de Environment variables
2. Tire um print dos logs de build
3. Tire um print do console (F12)
4. Compartilhe para análise

---

**Importante:** As variáveis de ambiente são ESSENCIAIS para o site funcionar. Sem elas, o código não consegue se conectar ao Supabase.
