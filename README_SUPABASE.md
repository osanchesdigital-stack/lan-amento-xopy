# 🗄️ Banco de Dados Supabase - Xopy Lançamento

## 📁 Arquivos Criados

1. **`supabase-schema.sql`** - Schema SQL completo para criar no Supabase
2. **`SUPABASE_SETUP.md`** - Guia passo a passo de configuração
3. **`src/lib/supabase.ts`** - Cliente Supabase configurado com tipos
4. **`src/hooks/useRsvp.ts`** - Hook React para gerenciar RSVPs
5. **`INTEGRACAO_EXEMPLO.md`** - Exemplos de código para integração
6. **`.env.example`** - Template de variáveis de ambiente

## 🚀 Quick Start

### 1. Criar Projeto no Supabase

1. Acesse [supabase.com](https://supabase.com) e crie um projeto
2. Aguarde a criação (2-3 minutos)

### 2. Executar o SQL

1. No Supabase, vá em **SQL Editor**
2. Copie todo o conteúdo de `supabase-schema.sql`
3. Cole e clique em **Run**

### 3. Configurar o Projeto

```bash
# Instalar dependência
npm install @supabase/supabase-js

# Criar arquivo de ambiente
copy .env.example .env.local
```

### 4. Adicionar Credenciais

No arquivo `.env.local`, adicione:

```env
VITE_SUPABASE_URL=https://seu-projeto.supabase.co
VITE_SUPABASE_ANON_KEY=sua-chave-aqui
```

Encontre essas informações em: **Settings** > **API** no Supabase

### 5. Usar no Código

```typescript
import { useRsvp } from './hooks/useRsvp';

function MeuComponente() {
  const { stats, getConfirmed, getAbsent, createConfirmation } = useRsvp();
  
  // Usar os dados...
}
```

## 📊 Estrutura do Banco

### Tabela: `rsvp_confirmations`

| Campo | Tipo | Descrição |
|-------|------|-----------|
| `id` | UUID | ID único |
| `name` | VARCHAR | Nome do convidado |
| `rsvp` | VARCHAR | 'yes' ou 'no' |
| `reason` | TEXT | Motivo (opcional) |
| `created_at` | TIMESTAMP | Data de criação |
| `updated_at` | TIMESTAMP | Data de atualização |

### View: `rsvp_stats`

Retorna estatísticas em tempo real:
- `confirmed_count` - Total de confirmados
- `absent_count` - Total de ausentes
- `total_responses` - Total de respostas

## 🔧 Funcionalidades

### ✅ O que está pronto

- [x] Tabela de confirmações
- [x] Índices para performance
- [x] Trigger para atualizar `updated_at`
- [x] View de estatísticas
- [x] Funções para buscar confirmados/ausentes
- [x] Row Level Security (RLS) configurado
- [x] Dados de exemplo (seed)
- [x] Cliente Supabase tipado
- [x] Hook React customizado

### 🎯 Como usar

#### Criar confirmação

```typescript
const result = await createConfirmation('João Silva', 'yes');
```

#### Buscar estatísticas

```typescript
const { stats } = useRsvp();
console.log(stats.confirmed_count); // 8
console.log(stats.absent_count); // 3
```

#### Listar confirmados

```typescript
const { getConfirmed } = useRsvp();
const confirmed = getConfirmed();
```

#### Listar ausentes

```typescript
const { getAbsent } = useRsvp();
const absent = getAbsent();
```

## 🔒 Segurança

O RLS está configurado para permitir acesso público (sem autenticação):

- ✅ Qualquer um pode criar RSVP
- ✅ Qualquer um pode ver RSVPs
- ✅ Qualquer um pode atualizar/deletar

**Para produção:** Considere adicionar autenticação no painel admin.

## 📚 Documentação Completa

- **`SUPABASE_SETUP.md`** - Guia detalhado de setup
- **`INTEGRACAO_EXEMPLO.md`** - Exemplos de código
- [Documentação Supabase](https://supabase.com/docs)

## 🆘 Problemas Comuns

### "Invalid API key"
→ Verifique se copiou a chave `anon/public` correta

### "relation does not exist"
→ Execute o SQL no Supabase SQL Editor

### Dados não aparecem
→ Verifique o console do navegador para erros

## 🎉 Pronto!

Agora você tem um banco de dados completo para o sistema de RSVP do Xopy!

Para mais detalhes, consulte os arquivos de documentação.
