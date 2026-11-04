import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { Screen, Section, SectionLabel, Footnote } from '../components/Layout';
import RiskBadge from '../components/RiskBadge';
import { colors, spacing, typography, fonts } from '../theme/theme';
import { casos } from '../data/mockData';

export default function FichaScreen({ casoId, onBack }: { casoId: string; onBack: () => void }) {
  const caso = casos.find((c) => c.id === casoId) ?? casos[0];
  const maxScore = Math.max(...caso.scoreHistorico, 100);

  return (
    <Screen>
      <View style={styles.headerRow}>
        <TouchableOpacity onPress={onBack} style={styles.backBtn}>
          <Ionicons name="chevron-back" size={16} color={colors.textMuted} />
          <Text style={styles.backText}>Casos</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.titleRow}>
        <Text style={typography.h1}>
          Ficha · {caso.id} · Bairro {caso.bairro}
        </Text>
        <RiskBadge risco={caso.risco} variant="pill" />
      </View>

      <View style={styles.twoCol}>
        <Section style={styles.colSection}>
          <SectionLabel>Evolução do score de risco</SectionLabel>
          <View style={styles.barsRow}>
            {caso.scoreHistorico.map((v, i) => (
              <View key={i} style={styles.barCol}>
                <View
                  style={[
                    styles.bar,
                    {
                      height: Math.max((v / maxScore) * 90, 8),
                      backgroundColor: v >= 60 ? colors.risk.alto : colors.risk.moderado,
                    },
                  ]}
                />
              </View>
            ))}
          </View>
          <Text style={styles.scoreRange}>
            {caso.scoreDatas[0]?.data} → {caso.scoreDatas[caso.scoreDatas.length - 1]?.data} · score{' '}
            {caso.scoreHistorico[0]} → {caso.scoreHistorico[caso.scoreHistorico.length - 1]}
          </Text>
        </Section>

        <Section style={styles.colSection}>
          <SectionLabel>Linha do tempo</SectionLabel>
          {caso.scoreDatas.map((item, i) => (
            <View key={i} style={styles.timelineItem}>
              <Text style={styles.timelineDate}>{item.data}</Text>
              <Text style={styles.timelineLabel}>
                {item.label} · score {item.score}
              </Text>
            </View>
          ))}
          <View style={styles.timelineItem}>
            <Text style={styles.timelineDate}>{caso.encaminhamentoDetalhe.data}</Text>
            <Text style={styles.timelineLabel}>Encaminhado à UBS</Text>
          </View>
        </Section>
      </View>

      <View style={styles.divider} />

      <View style={styles.threeCol}>
        <Section style={styles.thirdSection}>
          <SectionLabel>Sintomas relatados</SectionLabel>
          {caso.sintomas.map((s, i) => (
            <View key={i} style={styles.bulletRow}>
              <View style={styles.bullet} />
              <Text style={styles.bulletText}>{s}</Text>
            </View>
          ))}
        </Section>

        <Section style={styles.thirdSection}>
          <SectionLabel>Pendências</SectionLabel>
          {caso.pendencias.length === 0 ? (
            <Text style={typography.bodyMuted}>Nenhuma pendência.</Text>
          ) : (
            caso.pendencias.map((p, i) => (
              <View key={i} style={styles.checkRow}>
                <Ionicons
                  name={p.feito ? 'checkbox' : 'square-outline'}
                  size={16}
                  color={p.feito ? colors.text : colors.textFaint}
                />
                <Text style={styles.checkText}>{p.label}</Text>
              </View>
            ))
          )}
        </Section>

        <Section style={styles.thirdSection}>
          <SectionLabel>Encaminhamentos</SectionLabel>
          <Text style={styles.encDate}>
            {caso.encaminhamentoDetalhe.data} — {caso.encaminhamentoDetalhe.local}
          </Text>
          <Text style={styles.encLine}>Status: {caso.encaminhamentoDetalhe.status}</Text>
          <Text style={styles.encLine}>Motivo: {caso.encaminhamentoDetalhe.motivo}</Text>
        </Section>
      </View>

      <Footnote>
        Listagem por ID AgroSUS · referência apenas de bairro (sem nome completo, CPF ou coordenadas).
      </Footnote>
    </Screen>
  );
}

const styles = StyleSheet.create({
  headerRow: { paddingHorizontal: spacing.lg, paddingTop: spacing.md },
  backBtn: { flexDirection: 'row', alignItems: 'center', alignSelf: 'flex-start' },
  backText: { fontSize: 12, color: colors.textMuted, marginLeft: 2 },
  titleRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: spacing.lg,
    paddingTop: spacing.sm,
    paddingBottom: spacing.lg,
  },
  twoCol: { flexDirection: 'row', flexWrap: 'wrap' },
  colSection: { flexGrow: 1, flexBasis: '46%', minWidth: 260 },
  divider: { height: 1, backgroundColor: colors.border, marginHorizontal: spacing.lg, marginBottom: spacing.lg },
  threeCol: { flexDirection: 'row', flexWrap: 'wrap' },
  thirdSection: { flexGrow: 1, flexBasis: '30%', minWidth: 200 },
  barsRow: { flexDirection: 'row', alignItems: 'flex-end', height: 100, marginTop: spacing.sm },
  barCol: { flex: 1, alignItems: 'center', justifyContent: 'flex-end', paddingHorizontal: 3 },
  bar: { width: '100%', borderRadius: 2 },
  scoreRange: { ...typography.bodyMuted, fontSize: 11, marginTop: spacing.sm },
  timelineItem: { marginBottom: spacing.sm },
  timelineDate: { fontSize: 11, fontFamily: fonts.monoMedium, color: colors.ink300 },
  timelineLabel: { fontSize: 13, fontFamily: fonts.bodySemiBold, color: colors.ink900, marginTop: 2 },
  bulletRow: { flexDirection: 'row', alignItems: 'flex-start', marginBottom: 6 },
  bullet: { width: 4, height: 4, borderRadius: 2, backgroundColor: colors.textMuted, marginTop: 7, marginRight: 8 },
  bulletText: { ...typography.body, flex: 1 },
  checkRow: { flexDirection: 'row', alignItems: 'center', marginBottom: 8 },
  checkText: { ...typography.body, marginLeft: 8 },
  encDate: { fontFamily: fonts.bodySemiBold, fontSize: 13, color: colors.ink900, marginBottom: 4 },
  encLine: { ...typography.bodyMuted, marginTop: 2 },
});
