import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { Screen, PageHeader, Footnote } from '../components/Layout';
import FilterBar from '../components/FilterBar';
import TideMeter from '../components/TideMeter';
import { colors, spacing, fonts } from '../theme/theme';
import { alertas } from '../data/mockData';

export default function AlertasScreen({ onOpenFicha }: { onOpenFicha: (casoId: string) => void }) {
  return (
    <Screen>
      <PageHeader title="Alertas ativos · AgroSUS" subtitle="Gerado por regras automáticas" />
      <FilterBar
        filters={[
          { label: 'Tipo', value: 'todos', type: 'select', options: ['todos', 'Sintomas críticos', 'Ausência de EPI', 'Armazenamento inadequado', 'Necessidade de retorno', 'Histórico de intoxicação'] },
          { label: 'Risco', value: 'alto/alerta', type: 'select', options: ['todos', 'alto/alerta', 'moderado', 'baixo'] },
          { label: 'ACS', value: 'todos', type: 'select', options: ['todos', 'Maria S.', 'João P.'] },
          { label: 'Status', value: 'abertos', type: 'select', options: ['abertos', 'em andamento', 'concluídos'] },
        ]}
      />

      <View style={styles.list}>
        {alertas.map((a) => (
          <View
            key={a.id}
            style={[styles.alert, { borderLeftColor: colors.risk[a.risco] }]}
          >
            <View style={styles.topRow}>
              <Text style={styles.strong}>
                {a.id} · {a.tipo}
              </Text>
              <TideMeter risco={a.risco} size="sm" />
            </View>
            <Text style={styles.desc}>{a.gatilho}</Text>
            <View style={styles.bottomRow}>
              <Text style={styles.meta}>ACS {a.acs}</Text>
              <TouchableOpacity style={styles.actionRow} onPress={() => onOpenFicha(a.id)}>
                <Text style={styles.actionText}>{a.acao}</Text>
                <Ionicons name="arrow-forward" size={12} color={colors.orange600} style={{ marginLeft: 4 }} />
              </TouchableOpacity>
            </View>
          </View>
        ))}
      </View>

      <Footnote>
        Alertas derivam das regras automáticas (sintomas, EPI, exposição, armazenamento, descarte, exposição
        familiar/crianças, histórico, risco alto). Cada linha abre a ficha do produtor.
      </Footnote>
    </Screen>
  );
}

const styles = StyleSheet.create({
  list: { marginTop: spacing.xs, paddingHorizontal: spacing.lg },
  alert: {
    borderLeftWidth: 3,
    paddingLeft: spacing.md,
    paddingVertical: spacing.md,
    marginBottom: spacing.md,
  },
  topRow: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' },
  strong: { fontFamily: fonts.bodySemiBold, fontSize: 13, color: colors.ink900, flexShrink: 1, marginRight: spacing.sm },
  desc: { fontFamily: fonts.body, fontSize: 12, color: colors.ink700, marginTop: 4 },
  bottomRow: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginTop: spacing.sm },
  meta: { fontFamily: fonts.mono, fontSize: 11, color: colors.ink500 },
  actionRow: { flexDirection: 'row', alignItems: 'center' },
  actionText: { fontFamily: fonts.bodySemiBold, fontSize: 12, color: colors.orange600 },
});
