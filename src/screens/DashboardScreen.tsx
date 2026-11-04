import React from 'react';
import { View, StyleSheet, Alert } from 'react-native';
import { Screen, PageHeader, Section, SectionLabel } from '../components/Layout';
import StatGrid from '../components/StatGrid';
import FilterBar from '../components/FilterBar';
import Button from '../components/Button';
import { colors, spacing } from '../theme/theme';
import { dashboardStats } from '../data/mockData';

export default function DashboardScreen() {
  return (
    <Screen>
      <PageHeader title="Dashboard UBS Jundiapeba · AgroSUS" subtitle="Equipe UBS · mareIA" />
      <FilterBar
        filters={[
          { label: 'Período', value: '', placeholder: '__/__ – __/__', type: 'text' },
          { label: 'ACS', value: 'todos', type: 'select', options: ['todos', 'Maria S.', 'João P.'] },
          { label: 'Microárea', value: 'todos', type: 'select', options: ['todos', '03', '05'] },
          { label: 'Equipe ESF', value: 'todos', type: 'select', options: ['todos', 'ESF 1', 'ESF 2'] },
        ]}
      />

      <Section>
        <SectionLabel>Monitoramento</SectionLabel>
        <StatGrid
          items={dashboardStats.monitoramento.map((s) => ({
            ...s,
            color: s.color ? colors.risk[s.color] : undefined,
          }))}
        />
      </Section>

      <Section>
        <SectionLabel>Estratificação de risco</SectionLabel>
        <StatGrid
          items={dashboardStats.estratificacao.map((s) => ({ ...s, color: colors.risk[s.color] }))}
        />
      </Section>

      <Section>
        <StatGrid
          columns={4}
          groupLabels={[
            { label: 'Saúde', span: 2 },
            { label: 'Produção agrícola', span: 2 },
          ]}
          items={[
            ...dashboardStats.saude.map((s) => ({ ...s, color: s.color ? colors.risk[s.color] : undefined })),
            ...dashboardStats.producao,
          ]}
        />
      </Section>

      <Section>
        <StatGrid items={dashboardStats.encaminhamentos} columns={4} />
      </Section>

      <Section>
        <SectionLabel>Evolução temporal · risco médio</SectionLabel>
        <View style={styles.sparklineBox}>
          <MiniTrend />
        </View>
      </Section>

      <View style={styles.actionsRow}>
        <Button
          label="Exportar relatório"
          variant="primary"
          style={{ flex: 1 }}
          onPress={() => Alert.alert('Exportar relatório', 'O relatório do período selecionado foi gerado e está pronto para download.')}
        />
        <Button
          label="Comparativo mensal"
          variant="secondary"
          style={{ flex: 1 }}
          onPress={() => Alert.alert('Comparativo mensal', 'Comparando a evolução do risco médio com o mês anterior.')}
        />
      </View>
    </Screen>
  );
}

function MiniTrend() {
  const values = [30, 35, 42, 38, 46, 52, 48];
  const max = Math.max(...values);
  return (
    <View style={styles.trendRow}>
      {values.map((v, i) => (
        <View
          key={i}
          style={{
            width: 10,
            height: (v / max) * 48 + 6,
            backgroundColor: i === values.length - 1 ? colors.brandOrange : colors.border,
            borderRadius: 2,
            marginRight: 6,
          }}
        />
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  sparklineBox: { paddingVertical: spacing.sm },
  trendRow: { flexDirection: 'row', alignItems: 'flex-end', height: 60 },
  actionsRow: { flexDirection: 'row', paddingHorizontal: spacing.lg, gap: spacing.sm },
});
