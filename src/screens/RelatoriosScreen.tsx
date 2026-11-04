import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Alert } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { Screen, PageHeader, Section, SectionLabel, Footnote } from '../components/Layout';
import FilterBar from '../components/FilterBar';
import Button from '../components/Button';
import ReportDetailModal from '../components/ReportDetailModal';
import { colors, spacing, radius, fonts } from '../theme/theme';
import { relatoriosDisponiveis } from '../data/mockData';

export default function RelatoriosScreen() {
  const [aberto, setAberto] = useState<{ titulo: string; desc: string } | null>(null);

  return (
    <Screen>
      <PageHeader title="Relatórios e exportações" subtitle="Apoio à vigilância e gestão" />
      <FilterBar
        filters={[
          { label: 'Período', value: '', type: 'text', placeholder: '__/__ – __/__' },
          { label: 'ACS', value: 'todos', type: 'select', options: ['todos', 'Maria S.', 'João P.'] },
          { label: 'Área / microárea', value: 'todas', type: 'select', options: ['todas', '03', '05'] },
          { label: 'Risco', value: 'todos', type: 'select', options: ['todos', 'baixo', 'moderado', 'alto', 'alerta'] },
        ]}
      />

      <Section>
        <SectionLabel>Relatórios disponíveis</SectionLabel>
        <View style={styles.grid}>
          {relatoriosDisponiveis.map((r) => (
            <TouchableOpacity
              key={r.titulo}
              style={styles.reportTile}
              activeOpacity={0.7}
              onPress={() => setAberto({ titulo: r.titulo, desc: r.desc })}
            >
              <Text style={styles.reportTitle}>{r.titulo}</Text>
              <Text style={styles.reportDesc}>{r.desc}</Text>
            </TouchableOpacity>
          ))}
        </View>
      </Section>

      <Section>
        <SectionLabel>Exportar</SectionLabel>
        <View style={styles.exportRow}>
          <Button
            label="PDF"
            variant="primary"
            style={styles.exportGrow}
            icon={<Ionicons name="download-outline" size={14} color={colors.white} />}
            onPress={() => Alert.alert('Exportar PDF', 'O PDF com os relatórios selecionados foi gerado.')}
          />
          <Button
            label="Planilha (CSV)"
            variant="primary"
            style={styles.exportGrow}
            icon={<Ionicons name="download-outline" size={14} color={colors.white} />}
            onPress={() => Alert.alert('Exportar planilha', 'A planilha CSV com os relatórios selecionados foi gerada.')}
          />
          <Button
            label="Agendar envio"
            variant="secondary"
            style={styles.exportGrow}
            onPress={() => Alert.alert('Agendar envio', 'O envio periódico destes relatórios foi agendado.')}
          />
        </View>
      </Section>

      <Footnote>
        Exportações respeitam o perfil de acesso; relatórios gerenciais usam dados agregados/pseudonimizados (ID
        AgroSUS) conforme LGPD.
      </Footnote>

      <ReportDetailModal
        visible={!!aberto}
        titulo={aberto?.titulo ?? ''}
        descricao={aberto?.desc ?? ''}
        onClose={() => setAberto(null)}
      />
    </Screen>
  );
}

const styles = StyleSheet.create({
  grid: { flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'space-between' },
  reportTile: {
    flexBasis: '31%',
    flexGrow: 1,
    borderWidth: 1,
    borderColor: colors.ink150,
    borderRadius: radius.sm,
    padding: spacing.md,
    marginBottom: spacing.sm,
    minWidth: 150,
  },
  reportTitle: { fontSize: 13, fontFamily: fonts.bodySemiBold, color: colors.ink900 },
  reportDesc: { fontSize: 10, fontFamily: fonts.body, color: colors.ink500, marginTop: 4 },
  exportRow: { flexDirection: 'row', flexWrap: 'wrap', gap: spacing.sm },
  exportGrow: { flexGrow: 1, flexBasis: '30%', minWidth: 130 },
});
