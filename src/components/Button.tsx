import React from 'react';
import { TouchableOpacity, Text, StyleSheet, ViewStyle } from 'react-native';
import { colors, radius, fonts } from '../theme/theme';

export default function Button({
  label,
  variant = 'primary',
  onPress,
  style,
  icon,
}: {
  label: string;
  variant?: 'primary' | 'secondary' | 'ghost';
  onPress?: () => void;
  style?: ViewStyle;
  icon?: React.ReactNode;
}) {
  return (
    <TouchableOpacity
      activeOpacity={0.75}
      onPress={onPress}
      style={[styles.base, styles[variant], style]}
    >
      {icon}
      <Text style={[styles.label, textStyles[variant], icon ? { marginLeft: 6 } : null]}>
        {label}
      </Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  base: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: radius.sm,
    paddingVertical: 11,
    paddingHorizontal: 18,
    borderWidth: 1.5,
    borderColor: 'transparent',
  },
  primary: { backgroundColor: colors.orange500 },
  secondary: { backgroundColor: 'transparent', borderColor: colors.ink900 },
  ghost: { backgroundColor: 'transparent', paddingHorizontal: 0 },
  label: { fontFamily: fonts.bodySemiBold, fontSize: 14 },
});

const textStyles = StyleSheet.create({
  primary: { color: colors.white },
  secondary: { color: colors.ink900 },
  ghost: { color: colors.ink500, textDecorationLine: 'underline' },
});
