# 🚀 Configuração do Supabase para o Projeto Xopy

## 📋 Passo a Passo

### 1. Criar Projeto no Supabase

1. Acesse [supabase.com](https://supabase.com)
2. Clique em "Start your project"
3. Crie uma nova organização (se necessário)
4. Clique em "New Project"
5. Preencha:
   - **Name**: Xopy
   - **Database Password**: (escolha uma senha forte)
   - **Region**: escolha a mais próxima (ex: South America - São Paulo)
6. Clique em "Create new project"
7. Aguarde alguns minutos enquanto o projeto é criado

### 2. Executar o Schema SQL

1. No painel do Supabase, vá em **SQL Editor** (ícone de banco de dados na lateral)
2. Clique em **New Query**
3. Copie todo o conteúdo do arquivo `supabase-schema.sql`
4. Cole no editor SQL
5. Clique em **Run** (ou pressione Ctrl+Enter)
6. Aguarde a execução (pode levar alguns segundos)
7. Você verá "Success. No rows returned" - isso é normal!

### 3. Verificar as Tabelas Criadas

1. Vá em **Table Editor** (ícone de tabela na lateral)
2. Você deve ver todas as tabelas criadas:
   - ✅ rsvp_confirmations
   - ✅ users
   - ✅ posts
   - ✅ post_likes
   - ✅ comments
   - ✅ boats
   - ✅ trips
   - ✅ tickets
   - ✅ trip_passengers

### 4. Obter as Credenciais

1. Vá em **Settings** > **API** (ícone de engrenagem na lateral)
2. Copie as seguintes informações:
   - **Project URL**: `https://seu-projeto.supabase.co`
   - **anon/public key**: uma chave longa começando com `eyJ...`

### 5. Configurar o Projeto

1. Copie o arquivo `.env.example` para `.env.local`:
   ```bash
   copy .env.example .env.local
   ```

2. Edite o arquivo `.env.local` e adicione suas credenciais:
   ```env
   VITE_SUPABASE_URL=https://seu-projeto.supabase.co
   VITE_SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
   ```

### 6. Instalar o Cliente Supabase

Execute no terminal:
```bash
npm install @supabase/supabase-js
```

### 7. Verificar os Dados Iniciais

1. Vá em **Table Editor**
2. Clique em `users` - deve ter 5 usuários
3. Clique em `boats` - deve ter 3 embarcações
4. Clique em `rsvp_confirmations` - deve ter 11 confirmações

## 🔐 Configuração de Autenticação (Opcional)

Se quiser adicionar autenticação real:

1. Vá em **Authentication** > **Providers**
2. Habilite os provedores desejados:
   - Email/Password
   - Google
   - GitHub
   - etc.

## 📊 Estrutura do Banco de Dados

### Tabela Principal

#### **rsvp_confirmations**
Armazena as confirmações de presença para o lançamento do Xopy.

**Campos:**
- `id` (UUID): Identificador único
- `name` (VARCHAR): Nome completo do convidado
- `rsvp` (VARCHAR): Resposta - 'yes' (confirmado) ou 'no' (não vai)
- `reason` (TEXT): Motivo da ausência (opcional, apenas para quem não vai)
- `created_at` (TIMESTAMP): Data/hora da confirmação
- `updated_at` (TIMESTAMP): Data/hora da última atualização

## 🔧 Funcionalidades Automáticas

### Triggers Implementados

1. **update_updated_at**: Atualiza automaticamente o campo `updated_at` quando um registro é modificado

### Views Criadas

1. **rsvp_stats**: Estatísticas de confirmações (confirmados, ausentes, total de respostas)

### Funções Úteis

1. **get_confirmed_participants()**: Retorna lista de participantes confirmados
2. **get_absent_participants()**: Retorna lista de participantes ausentes com motivos

## 🔒 Segurança (RLS)

Row Level Security está habilitado com políticas abertas (sem autenticação necessária):

- ✅ Qualquer um pode criar RSVP (para convidados confirmarem)
- ✅ Qualquer um pode ver RSVPs (para o painel admin funcionar)
- ✅ Qualquer um pode atualizar/deletar RSVPs (caso precise corrigir)

**Nota:** Para produção, você pode querer adicionar autenticação no painel admin.

## 🧪 Testando a Conexão

Após configurar, você pode testar a conexão criando um arquivo `src/lib/supabase.ts`:

```typescript
import { createClient } from '@supabase/supabase-js'

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY

export const supabase = createClient(supabaseUrl, supabaseAnonKey)
```

## 📝 Próximos Passos

1. ✅ Criar projeto no Supabase
2. ✅ Executar o schema SQL
3. ✅ Configurar variáveis de ambiente
4. ✅ Instalar cliente Supabase
5. ⬜ Integrar com o código React
6. ⬜ Testar funcionalidades

## 🆘 Problemas Comuns

### Erro: "relation does not exist"
- Certifique-se de que executou todo o SQL
- Verifique se está conectado ao projeto correto

### Erro: "permission denied"
- Verifique as políticas RLS
- Certifique-se de estar usando a chave correta

### Dados não aparecem
- Verifique se os dados iniciais foram inseridos
- Vá no Table Editor e confira manualmente

## 📚 Recursos

- [Documentação Supabase](https://supabase.com/docs)
- [Supabase JavaScript Client](https://supabase.com/docs/reference/javascript/introduction)
- [Row Level Security](https://supabase.com/docs/guides/auth/row-level-security)
