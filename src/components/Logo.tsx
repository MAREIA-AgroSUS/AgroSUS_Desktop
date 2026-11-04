import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import Svg, { Path } from 'react-native-svg';
import { colors, fonts } from '../theme/theme';

export default function Logo({ size = 'md' }: { size?: 'sm' | 'md' | 'lg' }) {
  const fontSize = size === 'lg' ? 26 : size === 'sm' ? 15 : 18;
  const waveWidth = size === 'lg' ? 34 : size === 'sm' ? 20 : 26;
  return (
    <View style={styles.row}>
      <Svg width={waveWidth} height={waveWidth * 0.5} viewBox="0 0 40 20">
        <Path
          d="M1 14 C 6 4, 12 4, 18 12 C 24 20, 30 8, 39 4"
          stroke={colors.teal500}
          strokeWidth={3}
          fill="none"
          strokeLinecap="round"
        />
      </Svg>
      <Text style={[styles.mare, { fontSize, marginLeft: size === 'sm' ? 4 : 6 }]}>
        mare<Text style={[styles.ia, { fontSize }]}>.IA</Text>
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  row: { flexDirection: 'row', alignItems: 'center' },
  mare: { color: colors.orange500, fontFamily: fonts.heading },
  ia: { color: colors.ink900, fontFamily: fonts.body },
});
