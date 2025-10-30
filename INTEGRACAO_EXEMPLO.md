# 🔌 Exemplo de Integração com Supabase

## 📦 Instalação

```bash
npm install @supabase/supabase-js
```

## 🔧 Configuração

1. Crie o arquivo `.env.local` na raiz do projeto:

```env
VITE_SUPABASE_URL=https://seu-projeto.supabase.co
VITE_SUPABASE_ANON_KEY=sua-chave-aqui
```

2. Reinicie o servidor de desenvolvimento

## 💻 Usando o Hook useRsvp

### Exemplo 1: Criar Confirmação (Formulário RSVP)

```typescript
import { useRsvp } from './hooks/useRsvp';

function RsvpForm() {
  const { createConfirmation, loading } = useRsvp();
  const [name, setName] = useState('');
  const [rsvp, setRsvp] = useState<'yes' | 'no'>('yes');
  const [reason, setReason] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    const result = await createConfirmation(name, rsvp, reason);
    
    if (result.success) {
      alert('Confirmação enviada com sucesso!');
      // Limpar formulário
      setName('');
      setReason('');
    } else {
      alert(`Erro: ${result.error}`);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input 
        value={name} 
        onChange={(e) => setName(e.target.value)}
        placeholder="Seu nome"
        required
      />
      
      <select value={rsvp} onChange={(e) => setRsvp(e.target.value as 'yes' | 'no')}>
        <option value="yes">Sim, estarei presente</option>
        <option value="no">Não poderei comparecer</option>
      </select>
      
      {rsvp === 'no' && (
        <textarea
          value={reason}
          onChange={(e) => setReason(e.target.value)}
          placeholder="Motivo (opcional)"
        />
      )}
      
      <button type="submit" disabled={loading}>
        {loading ? 'Enviando...' : 'Confirmar'}
      </button>
    </form>
  );
}
```

### Exemplo 2: Painel Admin com Estatísticas

```typescript
import { useRsvp } from './hooks/useRsvp';

function AdminDashboard() {
  const { stats, getConfirmed, getAbsent, loading } = useRsvp();

  if (loading) return <div>Carregando...</div>;

  const confirmed = getConfirmed();
  const absent = getAbsent();

  return (
    <div>
      <h1>Painel Admin</h1>
      
      {/* Estatísticas */}
      <div className="stats">
        <div className="stat">
          <h3>Confirmados</h3>
          <p>{stats?.confirmed_count || 0}</p>
        </div>
        <div className="stat">
          <h3>Ausentes</h3>
          <p>{stats?.absent_count || 0}</p>
        </div>
        <div className="stat">
          <h3>Total</h3>
          <p>{stats?.total_responses || 0}</p>
        </div>
      </div>

      {/* Lista de Confirmados */}
      <div>
        <h2>Confirmados ({confirmed.length})</h2>
        <ul>
          {confirmed.map(person => (
            <li key={person.id}>{person.name}</li>
          ))}
        </ul>
      </div>

      {/* Lista de Ausentes */}
      <div>
        <h2>Ausentes ({absent.length})</h2>
        <ul>
          {absent.map(person => (
            <li key={person.id}>
              <strong>{person.name}</strong>
              {person.reason && <p>{person.reason}</p>}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
```

### Exemplo 3: Atualização em Tempo Real

```typescript
import { useEffect } from 'react';
import { supabase } from './lib/supabase';
import { useRsvp } from './hooks/useRsvp';

function RealtimeRsvp() {
  const { confirmations, refresh } = useRsvp();

  useEffect(() => {
    // Inscrever-se para mudanças em tempo real
    const channel = supabase
      .channel('rsvp_changes')
      .on(
        'postgres_changes',
        {
          event: '*', // INSERT, UPDATE, DELETE
          schema: 'public',
          table: 'rsvp_confirmations'
        },
        (payload) => {
          console.log('Mudança detectada:', payload);
          refresh(); // Atualizar dados
        }
      )
      .subscribe();

    // Limpar inscrição ao desmontar
    return () => {
      supabase.removeChannel(channel);
    };
  }, [refresh]);

  return (
    <div>
      <h2>Confirmações em Tempo Real</h2>
      <p>Total: {confirmations.length}</p>
      {/* ... resto do componente */}
    </div>
  );
}
```

## 🔍 Queries Diretas (sem hook)

### Buscar todas as confirmações

```typescript
const { data, error } = await supabase
  .from('rsvp_confirmations')
  .select('*')
  .order('created_at', { ascending: false });
```

### Buscar apenas confirmados

```typescript
const { data, error } = await supabase
  .from('rsvp_confirmations')
  .select('*')
  .eq('rsvp', 'yes');
```

### Buscar apenas ausentes

```typescript
const { data, error } = await supabase
  .from('rsvp_confirmations')
  .select('*')
  .eq('rsvp', 'no');
```

### Buscar estatísticas

```typescript
const { data, error } = await supabase
  .from('rsvp_stats')
  .select('*')
  .single();
```

### Criar nova confirmação

```typescript
const { data, error } = await supabase
  .from('rsvp_confirmations')
  .insert([
    { name: 'João Silva', rsvp: 'yes' }
  ])
  .select();
```

### Atualizar confirmação

```typescript
const { data, error } = await supabase
  .from('rsvp_confirmations')
  .update({ rsvp: 'no', reason: 'Viagem de trabalho' })
  .eq('id', 'uuid-aqui')
  .select();
```

### Deletar confirmação

```typescript
const { error } = await supabase
  .from('rsvp_confirmations')
  .delete()
  .eq('id', 'uuid-aqui');
```

## 🎯 Integrando no App.tsx Atual

Para integrar no seu `App.tsx` atual, substitua os dados mockados:

```typescript
// ANTES (mock)
const rsvpData = [
    { name: 'Ana Clara', rsvp: 'yes', reason: '' },
    // ...
];

// DEPOIS (Supabase)
import { useRsvp } from './hooks/useRsvp';

function AdminDashboard() {
  const { getConfirmed, getAbsent, stats, loading } = useRsvp();
  
  if (loading) return <div>Carregando...</div>;
  
  const confirmedParticipants = getConfirmed();
  const absentParticipants = getAbsent();
  
  // Resto do código permanece igual!
}
```

## 🚀 Próximos Passos

1. ✅ Instalar `@supabase/supabase-js`
2. ✅ Configurar `.env.local`
3. ✅ Usar o hook `useRsvp` no seu componente
4. ⬜ Testar criação de confirmações
5. ⬜ Testar painel admin
6. ⬜ (Opcional) Adicionar realtime updates

## 🆘 Troubleshooting

### Erro: "Invalid API key"
- Verifique se copiou a chave correta do Supabase
- Certifique-se de usar a chave `anon/public`, não a `service_role`

### Erro: "relation does not exist"
- Execute o SQL no Supabase SQL Editor
- Verifique se está no projeto correto

### Dados não aparecem
- Verifique as políticas RLS no Supabase
- Abra o console do navegador para ver erros
- Teste as queries diretamente no Supabase Table Editor
