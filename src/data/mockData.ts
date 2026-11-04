export type RiskLevel = 'baixo' | 'moderado' | 'alto' | 'alerta';

export interface Caso {
  id: string;
  bairro: string;
  risco: RiskLevel;
  acs: string;
  ultimaColeta: string;
  encaminhamento: string;
  scoreHistorico: number[];
  scoreDatas: { data: string; label: string; score: number }[];
  sintomas: string[];
  pendencias: { label: string; feito: boolean }[];
  encaminhamentoDetalhe: { data: string; local: string; status: string; motivo: string };
}

export const casos: Caso[] = [
  {
    id: 'AGS-0207',
    bairro: 'Jundiapeba',
    risco: 'alto',
    acs: 'Maria S.',
    ultimaColeta: '30/06/26',
    encaminhamento: 'Enviado · aguarda',
    scoreHistorico: [40, 44, 38, 61, 72],
    scoreDatas: [
      { data: 'jul/25', label: 'Cadastro inicial', score: 40 },
      { data: 'jan/26', label: 'Acompanhamento', score: 52 },
      { data: 'jun/26', label: 'Visita de alerta', score: 72 },
    ],
    sintomas: ['Cefaleia (pós-aplicação)', 'Náusea (pós-aplicação)', 'Falta de ar (pós-aplicação)', 'Irritação ocular'],
    pendencias: [
      { label: 'Bloco rastreabilidade incompleto', feito: true },
      { label: 'EPI incompleto', feito: true },
      { label: 'Receituário vencido', feito: false },
    ],
    encaminhamentoDetalhe: { data: '30/06/26', local: 'UBS Jundiapeba', status: 'Aguarda atendimento', motivo: 'Sintomas + EPI' },
  },
  {
    id: 'AGS-0193',
    bairro: 'Cocuera',
    risco: 'alerta',
    acs: 'Maria S.',
    ultimaColeta: '02/05/26',
    encaminhamento: 'Em atendimento',
    scoreHistorico: [35, 50, 55, 68, 80],
    scoreDatas: [
      { data: 'mar/25', label: 'Cadastro inicial', score: 35 },
      { data: 'nov/25', label: 'Acompanhamento', score: 55 },
      { data: 'maio/26', label: 'Sintomas críticos', score: 80 },
    ],
    sintomas: ['Sintomas pós-aplicação', 'Tontura', 'Vômito'],
    pendencias: [{ label: 'EPI incompleto', feito: true }],
    encaminhamentoDetalhe: { data: '02/05/26', local: 'UBS Jundiapeba', status: 'Em atendimento', motivo: 'Sintomas críticos' },
  },
  {
    id: 'AGS-0158',
    bairro: 'Cocuera',
    risco: 'moderado',
    acs: 'João P.',
    ultimaColeta: '19/02/26',
    encaminhamento: '—',
    scoreHistorico: [20, 28, 30, 34, 45],
    scoreDatas: [
      { data: 'jun/25', label: 'Cadastro inicial', score: 20 },
      { data: 'dez/25', label: 'Acompanhamento', score: 34 },
      { data: 'fev/26', label: 'Visita atrasada', score: 45 },
    ],
    sintomas: ['Nenhum sintoma relatado'],
    pendencias: [{ label: 'Visita atrasada', feito: true }],
    encaminhamentoDetalhe: { data: '—', local: '—', status: 'Sem encaminhamento', motivo: '—' },
  },
  {
    id: 'AGS-0142',
    bairro: 'Jundiapeba',
    risco: 'baixo',
    acs: 'João P.',
    ultimaColeta: '12/03/26',
    encaminhamento: '—',
    scoreHistorico: [10, 12, 14, 15, 18],
    scoreDatas: [
      { data: 'ago/25', label: 'Cadastro inicial', score: 10 },
      { data: 'jan/26', label: 'Acompanhamento', score: 15 },
      { data: 'mar/26', label: 'Visita de rotina', score: 18 },
    ],
    sintomas: ['Nenhum sintoma relatado'],
    pendencias: [],
    encaminhamentoDetalhe: { data: '—', local: '—', status: 'Sem encaminhamento', motivo: '—' },
  },
  {
    id: 'AGS-0211',
    bairro: 'Taboão',
    risco: 'moderado',
    acs: 'Maria S.',
    ultimaColeta: '21/06/26',
    encaminhamento: '—',
    scoreHistorico: [22, 30, 33, 40, 48],
    scoreDatas: [
      { data: 'set/25', label: 'Cadastro inicial', score: 22 },
      { data: 'fev/26', label: 'Acompanhamento', score: 33 },
      { data: 'jun/26', label: 'Histórico de intoxicação', score: 48 },
    ],
    sintomas: ['Histórico de intoxicação prévia'],
    pendencias: [{ label: 'Armazenamento inadequado', feito: true }],
    encaminhamentoDetalhe: { data: '—', local: '—', status: 'Notificado', motivo: 'Histórico de intoxicação' },
  },
  {
    id: 'AGS-0220',
    bairro: 'Cocuera',
    risco: 'alto',
    acs: 'João P.',
    ultimaColeta: '15/07/26',
    encaminhamento: '—',
    scoreHistorico: [28, 35, 42, 55, 65],
    scoreDatas: [
      { data: 'out/25', label: 'Cadastro inicial', score: 28 },
      { data: 'mar/26', label: 'Acompanhamento', score: 42 },
      { data: 'jul/26', label: 'Ausência de EPI', score: 65 },
    ],
    sintomas: ['Exposição frequente sem EPI'],
    pendencias: [{ label: 'EPI nunca utilizado', feito: true }],
    encaminhamentoDetalhe: { data: '15/07/26', local: 'UBS Jundiapeba', status: 'Aguarda orientação', motivo: 'Ausência de EPI' },
  },
  {
    id: 'AGS-0231',
    bairro: 'Jundiapeba',
    risco: 'moderado',
    acs: 'João P.',
    ultimaColeta: '02/08/26',
    encaminhamento: '—',
    scoreHistorico: [18, 24, 30, 38, 44],
    scoreDatas: [
      { data: 'nov/25', label: 'Cadastro inicial', score: 18 },
      { data: 'abr/26', label: 'Acompanhamento', score: 30 },
      { data: 'ago/26', label: 'Armazenamento inadequado', score: 44 },
    ],
    sintomas: ['Nenhum sintoma relatado'],
    pendencias: [{ label: 'Depósito de defensivos sem condições', feito: true }],
    encaminhamentoDetalhe: { data: '02/08/26', local: 'UBS Jundiapeba', status: 'Aguarda orientação', motivo: 'Armazenamento inadequado' },
  },
  {
    id: 'AGS-0246',
    bairro: 'Taboão',
    risco: 'alto',
    acs: 'Maria S.',
    ultimaColeta: '20/08/26',
    encaminhamento: 'Notificado',
    scoreHistorico: [32, 40, 48, 58, 70],
    scoreDatas: [
      { data: 'dez/25', label: 'Cadastro inicial', score: 32 },
      { data: 'maio/26', label: 'Acompanhamento', score: 48 },
      { data: 'ago/26', label: 'Histórico de intoxicação', score: 70 },
    ],
    sintomas: ['Intoxicação confirmada prévia'],
    pendencias: [{ label: 'Notificação SINAN pendente', feito: true }],
    encaminhamentoDetalhe: { data: '20/08/26', local: 'UBS Jundiapeba', status: 'Notificado', motivo: 'Histórico de intoxicação' },
  },
];

export interface Alerta {
  id: string;
  tipo: string;
  risco: RiskLevel;
  gatilho: string;
  acs: string;
  acao: string;
}

export const alertas: Alerta[] = [
  { id: 'AGS-0193', tipo: 'Sintomas críticos', risco: 'alerta', gatilho: 'Sintomas pós-aplicação', acs: 'Maria S.', acao: 'Encaminhar' },
  { id: 'AGS-0207', tipo: 'Necessita encaminhamento', risco: 'alto', gatilho: 'Score 72 + EPI incompleto', acs: 'Maria S.', acao: 'Avaliar UBS' },
  { id: 'AGS-0220', tipo: 'Ausência de EPI', risco: 'alto', gatilho: 'EPI "nunca" + exp. frequente', acs: 'João P.', acao: 'Orientar' },
  { id: 'AGS-0231', tipo: 'Armazenamento inadequado', risco: 'moderado', gatilho: 'Depósito sem condições', acs: 'João P.', acao: 'Orientar' },
  { id: 'AGS-0158', tipo: 'Necessidade de retorno', risco: 'moderado', gatilho: 'Visita atrasada', acs: 'João P.', acao: 'Reagendar' },
  { id: 'AGS-0246', tipo: 'Histórico de intoxicação', risco: 'alto', gatilho: 'Intoxicação confirmada prévia', acs: 'Maria S.', acao: 'Notificar' },
];

export const dashboardStats = {
  monitoramento: [
    { label: 'Cadastrados', value: '42' },
    { label: 'Ativos', value: '38' },
    { label: 'Visitas realizadas', value: '29' },
    { label: 'Visitas atrasadas', value: '7', color: 'alto' as RiskLevel },
  ],
  estratificacao: [
    { label: 'Baixo', value: '18', color: 'baixo' as RiskLevel },
    { label: 'Moderado', value: '11', color: 'moderado' as RiskLevel },
    { label: 'Alto', value: '6', color: 'alto' as RiskLevel },
    { label: 'Alerta', value: '3', color: 'alerta' as RiskLevel },
  ],
  saude: [
    { label: 'C/ sintomas', value: '9' },
    { label: 'Intoxicações', value: '2', color: 'alerta' as RiskLevel },
  ],
  producao: [
    { label: 'Culturas', value: '14' },
    { label: 'Defensivos', value: '23' },
  ],
  encaminhamentos: [
    { label: 'Encaminhamentos', value: '5' },
    { label: 'SINAN', value: '1' },
    { label: 'Uso de EPI', value: '61%' },
    { label: 'C/ receituário', value: '48%' },
  ],
};

export interface MapPoint {
  id: string;
  x: number; // 0-1 relative
  y: number; // 0-1 relative
  situacao: 'baixo' | 'moderado' | 'reavaliacao' | 'encaminhamento' | 'programada' | 'nao_visitado';
  bairro?: string;
}

export const mapPointsOperacional: MapPoint[] = [
  { id: 'AGS-0142', x: 0.12, y: 0.22, situacao: 'baixo', bairro: 'Jundiapeba' },
  { id: 'AGS-0158', x: 0.32, y: 0.18, situacao: 'moderado' },
  { id: 'AGS-0231', x: 0.46, y: 0.28, situacao: 'reavaliacao' },
  { id: 'AGS-0246', x: 0.66, y: 0.16, situacao: 'programada' },
  { id: 'AGS-0207', x: 0.1, y: 0.52, situacao: 'encaminhamento' },
  { id: 'AGS-0220', x: 0.75, y: 0.58, situacao: 'nao_visitado', bairro: 'Cocuera' },
  { id: 'AGS-0193', x: 0.34, y: 0.82, situacao: 'baixo' },
  { id: 'AGS-0211', x: 0.5, y: 0.85, situacao: 'moderado' },
];

export const heatZones = [
  { id: 1, x: 0.2, y: 0.28, r: 70, risco: 'alerta' as RiskLevel, label: 'Microárea 03', casos: 9, bairro: 'Jundiapeba' },
  { id: 2, x: 0.32, y: 0.42, r: 55, risco: 'alto' as RiskLevel, label: 'Microárea 03 · Sul', casos: 6, bairro: 'Jundiapeba' },
  { id: 3, x: 0.62, y: 0.28, r: 65, risco: 'moderado' as RiskLevel, label: 'Microárea 05', casos: 11, bairro: 'Cocuera' },
  { id: 4, x: 0.72, y: 0.44, r: 45, risco: 'baixo' as RiskLevel, label: 'Microárea 05 · Leste', casos: 4, bairro: 'Taboão' },
];

export const relatoriosDisponiveis = [
  { titulo: 'Visitas', desc: 'Realizadas · pendentes · atrasadas' },
  { titulo: 'Exposição', desc: 'Defensivos · frequência' },
  { titulo: 'Sintomas', desc: 'Frequência · casos suspeitos' },
  { titulo: 'Uso de EPI', desc: 'Adesão por item' },
  { titulo: 'Boas práticas', desc: '% por território' },
  { titulo: 'Apoio à vigilância', desc: 'SINAN · CAT · CEREST' },
];
