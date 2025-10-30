# ⚡ Comandos Rápidos - Supabase

## 🚀 Setup Inicial (Faça UMA VEZ)

### 1. Executar SQL no Supabase
```
1. Acesse: https://supabase.com/dashboard/project/rrxmpdsbxeogkgcpkkin/sql
2. Clique em "New Query"
3. Copie TODO o conteúdo de: supabase-schema.sql
4. Cole e clique em "Run"
5. Aguarde "Success. No rows returned"
```

### 2. Verificar Tabelas
```
1. Acesse: https://supabase.com/dashboard/project/rrxmpdsbxeogkgcpkkin/editor
2. Veja se aparecem 9 tabelas
3. Clique em rsvp_confirmations - deve ter 11 registros
```

### 3. Rodar o Projeto
```bash
npm run dev
```

## 📝 Queries SQL Úteis

### Ver todas as confirmações
```sql
SELECT * FROM rsvp_confirmations ORDER BY created_at DESC;
```

### Ver estatísticas
```sql
SELECT * FROM rsvp_stats;
```

### Ver confirmados
```sql
SELECT name, created_at 
FROM rsvp_confirmations 
WHERE rsvp = 'yes' 
ORDER BY created_at DESC;
```

### Ver ausentes com motivo
```sql
SELECT name, reason, created_at 
FROM rsvp_confirmations 
WHERE rsvp = 'no' 
ORDER BY created_at DESC;
```

### Limpar todas as confirmações (CUIDADO!)
```sql
DELETE FROM rsvp_confirmations;
```

### Adicionar confirmação manualmente
```sql
INSERT INTO rsvp_confirmations (name, rsvp, reason) 
VALUES ('Nome da Pessoa', 'yes', '');
```

## 🔍 Verificar Dados

### No Supabase Dashboard

**Ver RSVPs:**
```
Table Editor > rsvp_confirmations
```

**Ver Usuários:**
```
Table Editor > users
```

**Ver Embarcações:**
```
Table Editor > boats
```

## 🐛 Resolver Problemas

### Erro: "relation does not exist"
```sql
-- Execute novamente o arquivo supabase-schema.sql completo
```

### Resetar tudo (CUIDADO! Apaga TUDO)
```sql
-- Apagar todas as tabelas
DROP TABLE IF EXISTS trip_passengers CASCADE;
DROP TABLE IF EXISTS tickets CASCADE;
DROP TABLE IF EXISTS trips CASCADE;
DROP TABLE IF EXISTS boats CASCADE;
DROP TABLE IF EXISTS comments CASCADE;
DROP TABLE IF EXISTS post_likes CASCADE;
DROP TABLE IF EXISTS posts CASCADE;
DROP TABLE IF EXISTS users CASCADE;
DROP TABLE IF EXISTS rsvp_confirmations CASCADE;

-- Depois execute o supabase-schema.sql novamente
```

### Ver logs de erro
```
1. Abra o navegador (F12)
2. Vá na aba "Console"
3. Veja os erros em vermelho
```

## 📊 Testar Funcionalidades

### 1. Testar RSVP
```
1. Abra: http://localhost:5173
2. Preencha o formulário
3. Clique em "Enviar Confirmação"
4. Deve aparecer mensagem de sucesso
5. Verifique no Supabase: Table Editor > rsvp_confirmations
```

### 2. Testar Painel Admin
```
1. Abra: http://localhost:5173
2. Clique no ícone de escudo (canto inferior direito)
3. Veja as estatísticas
4. Navegue entre "Confirmados" e "Ausentes"
```

### 3. Testar Link de Compartilhamento
```
1. No painel admin, copie o link
2. Abra em uma aba anônima
3. O botão de admin não deve aparecer
```

## 🔗 Links Rápidos

**Seu Projeto:**
https://supabase.com/dashboard/project/rrxmpdsbxeogkgcpkkin

**SQL Editor:**
https://supabase.com/dashboard/project/rrxmpdsbxeogkgcpkkin/sql

**Table Editor:**
https://supabase.com/dashboard/project/rrxmpdsbxeogkgcpkkin/editor

**API Docs:**
https://supabase.com/dashboard/project/rrxmpdsbxeogkgcpkkin/api

## 💡 Dicas

### Backup dos Dados
```sql
-- Exportar RSVPs
SELECT * FROM rsvp_confirmations;
-- Copie o resultado e salve em um arquivo
```

### Ver quantas pessoas confirmaram hoje
```sql
SELECT COUNT(*) as total_hoje
FROM rsvp_confirmations
WHERE DATE(created_at) = CURRENT_DATE;
```

### Ver últimas 10 confirmações
```sql
SELECT name, rsvp, created_at
FROM rsvp_confirmations
ORDER BY created_at DESC
LIMIT 10;
```

## 🎯 Checklist Rápido

Antes de colocar em produção:

- [ ] SQL executado no Supabase
- [ ] 9 tabelas criadas
- [ ] Dados iniciais inseridos
- [ ] `.env.local` configurado
- [ ] `npm run dev` funcionando
- [ ] Formulário RSVP enviando
- [ ] Painel admin carregando dados
- [ ] Sem erros no console (F12)

## 🚨 Emergência

Se algo der muito errado:

1. **Backup**: Exporte os dados importantes
2. **Reset**: Execute o script de reset acima
3. **Recriar**: Execute o `supabase-schema.sql` novamente
4. **Testar**: Verifique se tudo voltou ao normal

## 📞 Suporte

Se precisar de ajuda:
1. Verifique o console do navegador (F12)
2. Veja os logs no Supabase Dashboard
3. Leia o arquivo SETUP_COMPLETO.md
4. Consulte a documentação: https://supabase.com/docs
