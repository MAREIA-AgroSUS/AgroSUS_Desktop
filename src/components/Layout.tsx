import React from 'react';
import { View, Text, StyleSheet, ScrollView, ViewStyle } from 'react-native';
import { colors, radius, spacing, typography, fonts } from '../theme/theme';

export function Screen({ children }: { children: React.ReactNode }) {
  return (
    <ScrollView style={styles.screen} contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
      {children}
    </ScrollView>
  );
}

export function PageHeader({ title, subtitle }: { title: string; subtitle?: string }) {
  return (
    <View style={styles.headerRow}>
      <Text style={typography.h1}>{title}</Text>
      {subtitle ? <Text style={styles.subtitle}>{subtitle}</Text> : null}
    </View>
  );
}

export function Section({ children, style }: { children: React.ReactNode; style?: ViewStyle }) {
  return <View style={[styles.section, style]}>{children}</View>;
}

export function Card({ children, style }: { children: React.ReactNode; style?: ViewStyle }) {
  return <View style={[styles.card, style]}>{children}</View>;
}

export function SectionLabel({ children }: { children: React.ReactNode }) {
  return <Text style={[typography.label, styles.sectionLabel]}>{typeof children === 'string' ? children.toUpperCase() : children}</Text>;
}

export function StatBox({ label, value, color }: { label: string; value: string; color?: string }) {
  return (
    <View style={styles.statBox}>
      <Text style={[typography.statValue, color ? { color } : null]}>{value}</Text>
      <Text style={typography.statLabel}>{label}</Text>
    </View>
  );
}

export function Footnote({ children }: { children: React.ReactNode }) {
  return <Text style={styles.footnote}>{children}</Text>;
}

const styles = StyleSheet.create({
  screen: { flex: 1, backgroundColor: colors.bg },
  scrollContent: { paddingBottom: 40 },
  headerRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-end',
    paddingHorizontal: spacing.lg,
    paddingTop: spacing.lg,
    paddingBottom: spacing.md,
  },
  subtitle: { fontFamily: fonts.mono, fontSize: 11, color: colors.ink500 },
  card: {
    backgroundColor: colors.white,
    borderRadius: radius.md,
    borderWidth: 1,
    borderColor: colors.ink150,
    padding: spacing.lg,
    marginHorizontal: spacing.lg,
    marginBottom: spacing.md,
  },
  sectionLabel: { marginBottom: spacing.sm },
  section: {
    marginHorizontal: spacing.lg,
    marginBottom: spacing.lg,
  },
  statBox: {
    flexGrow: 1,
    flexBasis: '45%',
    paddingVertical: spacing.xs,
  },
  footnote: {
    fontFamily: fonts.body,
    fontStyle: 'italic',
    fontSize: 11,
    color: colors.ink500,
    paddingHorizontal: spacing.lg,
    marginTop: 2,
    marginBottom: spacing.lg,
  },
});
