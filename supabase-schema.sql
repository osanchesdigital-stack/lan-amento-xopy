-- ============================================
-- XOPY - Schema SQL para Supabase
-- ============================================
-- Sistema de RSVP para o lançamento do aplicativo Xopy
-- Permite que convidados confirmem presença e admin visualize
-- ============================================

-- Habilitar extensões necessárias
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- ============================================
-- TABELA PRINCIPAL: CONFIRMAÇÕES DE PRESENÇA
-- ============================================

-- Tabela de confirmações de presença para o lançamento
CREATE TABLE rsvp_confirmations (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    name VARCHAR(255) NOT NULL,
    rsvp VARCHAR(10) NOT NULL CHECK (rsvp IN ('yes', 'no')),
    reason TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Índices para performance
CREATE INDEX idx_rsvp_status ON rsvp_confirmations(rsvp);
CREATE INDEX idx_rsvp_created_at ON rsvp_confirmations(created_at DESC);
CREATE INDEX idx_rsvp_name ON rsvp_confirmations(name);

-- ============================================
-- TRIGGER PARA ATUALIZAR updated_at
-- ============================================

-- Função para atualizar automaticamente o campo updated_at
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Aplicar trigger na tabela de confirmações
CREATE TRIGGER update_rsvp_confirmations_updated_at 
BEFORE UPDATE ON rsvp_confirmations 
FOR EACH ROW 
EXECUTE FUNCTION update_updated_at_column();

-- ============================================
-- ROW LEVEL SECURITY (RLS)
-- ============================================

-- Habilitar RLS na tabela
ALTER TABLE rsvp_confirmations ENABLE ROW LEVEL SECURITY;

-- Política: Qualquer pessoa pode inserir uma confirmação (sem autenticação)
CREATE POLICY "Qualquer um pode criar RSVP" 
ON rsvp_confirmations 
FOR INSERT 
WITH CHECK (true);

-- Política: Qualquer pessoa pode ver todas as confirmações
-- (necessário para o painel admin funcionar)
CREATE POLICY "Todos podem ver RSVPs" 
ON rsvp_confirmations 
FOR SELECT 
USING (true);

-- Política: Permitir atualização (caso queira editar depois)
CREATE POLICY "Qualquer um pode atualizar RSVP" 
ON rsvp_confirmations 
FOR UPDATE 
USING (true);

-- Política: Permitir deleção (caso queira remover depois)
CREATE POLICY "Qualquer um pode deletar RSVP" 
ON rsvp_confirmations 
FOR DELETE 
USING (true);

-- ============================================
-- VIEW PARA ESTATÍSTICAS
-- ============================================

-- View para estatísticas de RSVP (usada no painel admin)
CREATE OR REPLACE VIEW rsvp_stats AS
SELECT 
    COUNT(*) FILTER (WHERE rsvp = 'yes') as confirmed_count,
    COUNT(*) FILTER (WHERE rsvp = 'no') as absent_count,
    COUNT(*) as total_responses
FROM rsvp_confirmations;

-- ============================================
-- FUNÇÕES ÚTEIS
-- ============================================

-- Função para buscar confirmados
CREATE OR REPLACE FUNCTION get_confirmed_participants()
RETURNS TABLE (
    id UUID,
    name VARCHAR,
    created_at TIMESTAMP WITH TIME ZONE
) AS $$
BEGIN
    RETURN QUERY
    SELECT 
        rsvp_confirmations.id,
        rsvp_confirmations.name,
        rsvp_confirmations.created_at
    FROM rsvp_confirmations
    WHERE rsvp = 'yes'
    ORDER BY created_at DESC;
END;
$$ LANGUAGE plpgsql;

-- Função para buscar ausentes
CREATE OR REPLACE FUNCTION get_absent_participants()
RETURNS TABLE (
    id UUID,
    name VARCHAR,
    reason TEXT,
    created_at TIMESTAMP WITH TIME ZONE
) AS $$
BEGIN
    RETURN QUERY
    SELECT 
        rsvp_confirmations.id,
        rsvp_confirmations.name,
        rsvp_confirmations.reason,
        rsvp_confirmations.created_at
    FROM rsvp_confirmations
    WHERE rsvp = 'no'
    ORDER BY created_at DESC;
END;
$$ LANGUAGE plpgsql;

-- ============================================
-- DADOS INICIAIS (SEED)
-- ============================================

-- Inserir RSVPs de exemplo (dados do mock do App.tsx)
INSERT INTO rsvp_confirmations (name, rsvp, reason) VALUES
('Ana Clara', 'yes', ''),
('Bruno Costa', 'yes', ''),
('Carla Dias', 'yes', ''),
('Gabriel Alves', 'yes', ''),
('Helena Souza', 'yes', ''),
('Igor Pereira', 'yes', ''),
('Juliana Lima', 'yes', ''),
('Lucas Martins', 'yes', ''),
('Diego Martins', 'no', 'Estarei fora da cidade a trabalho.'),
('Fernanda Lima', 'no', 'Infelizmente tenho outro compromisso no mesmo dia.'),
('Mariana Oliveira', 'no', '');

-- ============================================
-- COMENTÁRIOS E DOCUMENTAÇÃO
-- ============================================

COMMENT ON TABLE rsvp_confirmations IS 'Confirmações de presença para o lançamento do aplicativo Xopy';
COMMENT ON COLUMN rsvp_confirmations.name IS 'Nome completo do convidado';
COMMENT ON COLUMN rsvp_confirmations.rsvp IS 'Resposta: yes (confirmado) ou no (não vai)';
COMMENT ON COLUMN rsvp_confirmations.reason IS 'Motivo da ausência (opcional, apenas para quem não vai)';

-- ============================================
-- FIM DO SCHEMA
-- ============================================
-- Para usar este schema:
-- 1. Copie todo o conteúdo deste arquivo
-- 2. No Supabase, vá em SQL Editor
-- 3. Cole e execute o SQL
-- 4. Verifique se a tabela rsvp_confirmations foi criada
-- 5. Configure as variáveis de ambiente no .env.local
-- ============================================
