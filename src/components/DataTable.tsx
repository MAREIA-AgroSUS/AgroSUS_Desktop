import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { colors, spacing, fonts, radius } from '../theme/theme';

export interface ColumnDef<T> {
  key: string;
  label: string;
  flex?: number;
  render: (row: T) => React.ReactNode;
}

export default function DataTable<T extends { id: string }>({
  columns,
  data,
  onRowPress,
}: {
  columns: ColumnDef<T>[];
  data: T[];
  onRowPress?: (row: T) => void;
}) {
  return (
    <View style={styles.wrap}>
      <View style={[styles.row, styles.headerRow]}>
        {columns.map((c) => (
          <Text key={c.key} style={[styles.headerCell, { flex: c.flex ?? 1 }]}>
            {c.label}
          </Text>
        ))}
      </View>
      {data.map((row, i) => {
        const Wrapper: any = onRowPress ? TouchableOpacity : View;
        return (
          <Wrapper
            key={row.id}
            activeOpacity={0.6}
            onPress={onRowPress ? () => onRowPress(row) : undefined}
            style={[styles.row, i === data.length - 1 && styles.lastRow]}
          >
            {columns.map((c) => (
              <View key={c.key} style={{ flex: c.flex ?? 1, justifyContent: 'center', paddingRight: spacing.sm }}>
                {c.render(row)}
              </View>
            ))}
          </Wrapper>
        );
      })}
    </View>
  );
}

const styles = StyleSheet.create({
  wrap: {
    marginHorizontal: spacing.lg,
    marginBottom: spacing.md,
    borderWidth: 1,
    borderColor: colors.ink150,
    borderRadius: radius.md,
    overflow: 'hidden',
  },
  row: {
    flexDirection: 'row',
    paddingVertical: 12,
    paddingHorizontal: spacing.md,
    borderBottomWidth: 1,
    borderBottomColor: colors.ink150,
  },
  headerRow: { backgroundColor: colors.ink100, paddingVertical: 9 },
  headerCell: { fontSize: 11, fontFamily: fonts.monoMedium, color: colors.ink500, letterSpacing: 0.3 },
  lastRow: { borderBottomWidth: 0 },
});
