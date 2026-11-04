import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { Screen, PageHeader, Card, Section, Footnote } from '../components/Layout';
import FilterBar from '../components/FilterBar';
import RiskBadge from '../components/RiskBadge';
import { OperationalMap, HeatMap } from '../components/PseudoMap';
import Button from '../components/Button';
import { colors, spacing, radius, typography, fonts } from '../theme/theme';
import { mapPointsOperacional, heatZones, casos } from '../data/mockData';

const SITUACAO_LEGEND: { key: string; label: string; color: string }[] = [
  { key: 'baixo', label: 'Baixo', color: colors.risk.baixo },
  { key: 'moderado', label: 'Moderado', color: colors.risk.moderado },
  { key: 'reavaliacao', label: 'Reavaliação', color: colors.risk.alto },
  { key: 'encaminhamento', label: 'Encam. imediato', color: colors.risk.alerta },
  { key: 'programada', label: 'Programada', color: colors.brand },
  { key: 'nao_visitado', label: 'Não visitado', color: colors.textFaint },
];

const RISCO_LEGEND: { key: 'baixo' | 'moderado' | 'alto' | 'alerta'; label: string }[] = [
  { key: 'baixo', label: 'baixa' },
  { key: 'moderado', label: 'média' },
  { key: 'alto', label: 'alta' },
  { key: 'alerta', label: 'crítica' },
];

export default function MapaScreen({ onOpenFicha }: { onOpenFicha: (casoId: string) => void }) {
  const [view, setView] = useState<'operacional' | 'gerencial'>('operacional');
  const [selected, setSelected] = useState('AGS-0207');
  const [situacaoFiltro, setSituacaoFiltro] = useState<string | null>(null);
  const [zonaSelecionada, setZonaSelecionada] = useState<number | null>(1);
  const [riscoFiltro, setRiscoFiltro] = useState<string | null>(null);

  const pontosVisiveis = situacaoFiltro
    ? mapPointsOperacional.filter((p) => p.situacao === situacaoFiltro)
    : mapPointsOperacional;
  const casoSelecionado = casos.find((c) => c.id === selected);

  const zonasVisiveis = riscoFiltro ? heatZones.filter((z) => z.risco === riscoFiltro) : heatZones;
  const zonaAtiva = heatZones.find((z) => z.id === zonaSelecionada);

  return (
    <Screen>
      <PageHeader
        title={view === 'operacional' ? 'Mapa inteligente · visão operacional' : 'Mapa inteligente · visão gerencial'}
        subtitle={view === 'operacional' ? 'Comprovação de visita' : 'Sem endereço · apenas ID AgroSUS'}
      />

      <View style={styles.toggleRow}>
        <TouchableOpacity
          style={[styles.toggleBtn, view === 'operacional' && styles.toggleBtnActive]}
          onPress={() => setView('operacional')}
        >
          <Text style={[styles.toggleText, view === 'operacional' && styles.toggleTextActive]}>Operacional</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.toggleBtn, view === 'gerencial' && styles.toggleBtnActive]}
          onPress={() => setView('gerencial')}
        >
          <Text style={[styles.toggleText, view === 'gerencial' && styles.toggleTextActive]}>Gerencial</Text>
        </TouchableOpacity>
      </View>

      {view === 'operacional' ? (
        <>
          <FilterBar
            filters={[
              { label: 'ACS', value: 'Maria S.', type: 'select', options: ['todos', 'Maria S.', 'João P.'] },
              { label: 'Período', value: '', type: 'text', placeholder: 'jun/2026' },
              { label: 'Microárea', value: '03', type: 'select', options: ['todas', '03', '05'] },
              { label: 'Situação', value: 'todas', type: 'select', options: ['todas', 'baixo', 'moderado', 'reavaliação', 'encam. imediato', 'programada', 'não visitado'] },
            ]}
          />
          <Section>
            <OperationalMap points={pontosVisiveis} selectedId={selected} onSelect={setSelected} />
            <View style={styles.legendWrap}>
              {SITUACAO_LEGEND.map((l) => {
                const isActive = situacaoFiltro === l.key;
                return (
                  <TouchableOpacity
                    key={l.key}
                    style={[styles.legendItem, isActive && styles.legendItemActive]}
                    onPress={() => setSituacaoFiltro(isActive ? null : l.key)}
                  >
                    <View style={[styles.legendDot, { backgroundColor: l.color }]} />
                    <Text style={[styles.legendText, isActive && styles.legendTextActive]}>{l.label}</Text>
                  </TouchableOpacity>
                );
              })}
            </View>
          </Section>

          {casoSelecionado && (
            <Card>
              <View style={styles.selectedRow}>
                <Text style={typography.h2}>Ponto selecionado · {casoSelecionado.id}</Text>
                <RiskBadge risco={casoSelecionado.risco} variant="pill" />
              </View>
              <View style={styles.selectedMetaRow}>
                <Text style={styles.selectedMeta}>{casoSelecionado.ultimaColeta} · 09:14 · GPS ±5 m</Text>
                <Text style={styles.selectedMeta}>ACS {casoSelecionado.acs} · realizada</Text>
              </View>
              <Button
                label="Abrir ficha do produtor"
                variant="primary"
                style={{ marginTop: spacing.md }}
                onPress={() => onOpenFicha(casoSelecionado.id)}
              />
            </Card>
          )}
        </>
      ) : (
        <>
          <FilterBar
            filters={[
              { label: 'UBS', value: 'Jundiapeba', type: 'select', options: ['Jundiapeba', 'Cocuera', 'Taboão'] },
              { label: 'Microárea', value: 'todas', type: 'select', options: ['todas', '03', '05'] },
              { label: 'Bairro', value: 'todos', type: 'select', options: ['todos', 'Jundiapeba', 'Cocuera', 'Taboão'] },
              { label: 'Período', value: '', type: 'text', placeholder: '2026' },
            ]}
          />
          <Section>
            <HeatMap zones={zonasVisiveis} selectedId={zonaSelecionada} onSelect={setZonaSelecionada} />
            <View style={styles.legendWrap}>
              <Text style={styles.legendPrefix}>Concentração de risco:</Text>
              {RISCO_LEGEND.map((l) => {
                const isActive = riscoFiltro === l.key;
                return (
                  <TouchableOpacity
                    key={l.key}
                    style={[styles.legendItem, isActive && styles.legendItemActive]}
                    onPress={() => setRiscoFiltro(isActive ? null : l.key)}
                  >
                    <View style={[styles.legendDot, { backgroundColor: colors.risk[l.key] }]} />
                    <Text style={[styles.legendText, isActive && styles.legendTextActive]}>{l.label}</Text>
                  </TouchableOpacity>
                );
              })}
            </View>
          </Section>

          {zonaAtiva && (
            <Card>
              <View style={styles.selectedRow}>
                <Text style={typography.h2}>{zonaAtiva.label ?? `Zona ${zonaAtiva.id}`}</Text>
                <RiskBadge risco={zonaAtiva.risco} variant="pill" />
              </View>
              <View style={styles.selectedMetaRow}>
                <Text style={styles.selectedMeta}>Bairro {zonaAtiva.bairro}</Text>
                <Text style={styles.selectedMeta}>{zonaAtiva.casos} casos monitorados</Text>
              </View>
              <Button
                label="Ver casos desta microárea"
                variant="primary"
                style={{ marginTop: spacing.md }}
                onPress={() => {
                  setSituacaoFiltro(null);
                  setView('operacional');
                }}
              />
            </Card>
          )}

          <Footnote>
            Heatmap por setor censitário / microárea, sem ponto exato nem endereço — pseudonimização por ID AgroSUS
            conforme LGPD (minimização e finalidade).
          </Footnote>
        </>
      )}
    </Screen>
  );
}

const styles = StyleSheet.create({
  toggleRow: {
    flexDirection: 'row',
    marginHorizontal: spacing.lg,
    marginBottom: spacing.md,
    backgroundColor: colors.headerRowBg,
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: radius.sm,
    padding: 3,
  },
  toggleBtn: { flex: 1, paddingVertical: 8, borderRadius: radius.sm - 1, alignItems: 'center' },
  toggleBtnActive: { backgroundColor: colors.card, borderWidth: 1, borderColor: colors.border },
  toggleText: { fontSize: 12, fontFamily: fonts.bodyMedium, color: colors.ink500 },
  toggleTextActive: { color: colors.ink900, fontFamily: fonts.bodySemiBold },
  legendWrap: { flexDirection: 'row', flexWrap: 'wrap', marginTop: spacing.md, alignItems: 'center' },
  legendPrefix: { fontSize: 11, fontFamily: fonts.monoMedium, color: colors.ink500, marginRight: 8 },
  legendItem: { flexDirection: 'row', alignItems: 'center', marginRight: spacing.md, marginBottom: 4, paddingVertical: 3, paddingHorizontal: 6, borderRadius: radius.sm },
  legendItemActive: { backgroundColor: colors.ink100 },
  legendDot: { width: 9, height: 9, borderRadius: 2, marginRight: 5 },
  legendText: { fontSize: 11, fontFamily: fonts.mono, color: colors.ink500 },
  legendTextActive: { color: colors.ink900, fontFamily: fonts.monoMedium },
  selectedRow: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' },
  selectedMetaRow: { flexDirection: 'row', justifyContent: 'space-between', marginTop: 6 },
  selectedMeta: { ...typography.bodyMuted },
});
