import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import Logo from './Logo';
import { colors, spacing, fonts } from '../theme/theme';
import { NavKey } from '../navigation/types';

const ITEMS: { key: NavKey; label: string; icon: keyof typeof Ionicons.glyphMap }[] = [
  { key: 'Dashboard', label: 'Dashboard', icon: 'speedometer-outline' },
  { key: 'Casos', label: 'Casos', icon: 'people-outline' },
  { key: 'Mapa', label: 'Mapa', icon: 'map-outline' },
  { key: 'Alertas', label: 'Alertas', icon: 'notifications-outline' },
  { key: 'Relatorios', label: 'Relatórios', icon: 'document-text-outline' },
];

export default function Sidebar({
  active,
  onChange,
  onOpenProfile,
  onLogout,
}: {
  active: NavKey;
  onChange: (k: NavKey) => void;
  onOpenProfile: () => void;
  onLogout: () => void;
}) {
  return (
    <View style={styles.wrap}>
      <View style={styles.logoBox}>
        <Logo size="md" />
      </View>

      <View style={styles.nav}>
        {ITEMS.map((item) => {
          const isActive = item.key === active;
          return (
            <TouchableOpacity
              key={item.key}
              onPress={() => onChange(item.key)}
              style={[styles.item, isActive && styles.itemActive]}
              activeOpacity={0.7}
            >
              <Ionicons
                name={item.icon}
                size={18}
                color={isActive ? colors.orange600 : colors.ink500}
              />
              <Text style={[styles.itemText, isActive && styles.itemTextActive]}>{item.label}</Text>
            </TouchableOpacity>
          );
        })}
      </View>

      <View style={styles.footer}>
        <TouchableOpacity style={styles.profileRow} onPress={onOpenProfile} activeOpacity={0.7}>
          <View style={styles.avatar}>
            <Text style={styles.avatarInitials}>MS</Text>
          </View>
          <View style={{ flex: 1 }}>
            <Text style={styles.profileName} numberOfLines={1}>Maria S.</Text>
            <Text style={styles.profileRole} numberOfLines={1}>ACS · UBS Jundiapeba</Text>
          </View>
        </TouchableOpacity>

        <TouchableOpacity style={styles.logoutRow} onPress={onLogout} activeOpacity={0.7}>
          <Ionicons name="log-out-outline" size={18} color={colors.riskHigh} />
          <Text style={styles.logoutText}>Sair</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const SIDEBAR_WIDTH = 216;

const styles = StyleSheet.create({
  wrap: {
    width: SIDEBAR_WIDTH,
    borderRightWidth: 1,
    borderRightColor: colors.ink150,
    backgroundColor: colors.white,
    paddingTop: spacing.lg,
    justifyContent: 'space-between',
  },
  logoBox: { paddingHorizontal: spacing.lg, marginBottom: spacing.xl },
  nav: { paddingHorizontal: spacing.sm, flex: 1 },
  item: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 11,
    paddingHorizontal: spacing.md,
    borderLeftWidth: 2,
    borderLeftColor: 'transparent',
    marginBottom: 2,
  },
  itemActive: {
    borderLeftColor: colors.orange500,
    backgroundColor: colors.orange100,
  },
  itemText: {
    fontFamily: fonts.bodyMedium,
    fontSize: 13,
    color: colors.ink500,
    marginLeft: spacing.sm,
  },
  itemTextActive: {
    fontFamily: fonts.bodySemiBold,
    color: colors.ink900,
  },
  footer: {
    borderTopWidth: 1,
    borderTopColor: colors.ink150,
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.md,
  },
  profileRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: spacing.sm,
    paddingVertical: spacing.xs,
  },
  avatar: {
    width: 30,
    height: 30,
    borderRadius: 2,
    backgroundColor: colors.orange100,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: spacing.sm,
  },
  avatarInitials: { fontFamily: fonts.heading, fontSize: 12, color: colors.orange600 },
  profileName: { fontFamily: fonts.bodySemiBold, fontSize: 12, color: colors.ink900 },
  profileRole: { fontFamily: fonts.mono, fontSize: 10, color: colors.ink500, marginTop: 1 },
  logoutRow: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: spacing.sm,
    paddingHorizontal: spacing.xs,
  },
  logoutText: {
    fontFamily: fonts.bodyMedium,
    fontSize: 13,
    color: colors.riskHigh,
    marginLeft: spacing.sm,
  },
});

export { SIDEBAR_WIDTH };
