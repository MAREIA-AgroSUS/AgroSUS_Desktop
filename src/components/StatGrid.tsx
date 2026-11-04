import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { colors, spacing, typography } from '../theme/theme';

export interface StatItem {
  label: string;
  value: string;
  color?: string;
}

export interface GroupLabel {
  label: string;
  span: number;
}

// Grade "tipo tabela": cada célula tem linha em cima e embaixo, e um traço
// vertical só entre colunas (não fecha caixa nas laterais externas).
// `groupLabels` permite um cabeçalho com rótulos agrupando colunas (ex.: "Saúde"
// cobrindo as 2 primeiras colunas e "Produção agrícola" as 2 últimas), mantendo
// os traços verticais alinhados com a grade de baixo.
export default function StatGrid({
  items,
  columns = 2,
  groupLabels,
}: {
  items: StatItem[];
  columns?: number;
  groupLabels?: GroupLabel[];
}) {
  const rows: StatItem[][] = [];
  for (let i = 0; i < items.length; i += columns) {
    rows.push(items.slice(i, i + columns));
  }

  return (
    <View>
      {groupLabels && (
        <View style={styles.groupRow}>
          {groupLabels.map((g) => (
            <Text key={g.label} style={[typography.label, styles.groupLabel, { flex: g.span }]}>
              {g.label.toUpperCase()}
            </Text>
          ))}
        </View>
      )}
      {rows.map((row, ri) => (
        <View key={ri} style={styles.row}>
          {row.map((item, ci) => (
            <View
              key={item.label}
              style={[styles.cell, ci < row.length - 1 && styles.cellDivider]}
            >
              <Text style={[typography.statValue, item.color ? { color: item.color } : null]}>
                {item.value}
              </Text>
              <Text style={typography.statLabel}>{item.label}</Text>
            </View>
          ))}
        </View>
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  row: {
    flexDirection: 'row',
  },
  groupRow: {
    flexDirection: 'row',
    marginBottom: spacing.sm,
  },
  groupLabel: {
    textTransform: 'uppercase',
  },
  cell: {
    flex: 1,
    borderTopWidth: 1,
    borderBottomWidth: 1,
    borderColor: colors.border,
    paddingVertical: spacing.md,
    paddingRight: spacing.lg,
  },
  cellDivider: {
    borderRightWidth: 1,
    borderRightColor: colors.border,
    marginRight: spacing.lg,
    paddingRight: 0,
  },
});
