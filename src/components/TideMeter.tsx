import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import Svg, { Rect, Path } from 'react-native-svg';
import { colors, fonts } from '../theme/theme';
import { RiskLevel } from '../data/mockData';

// Nível de preenchimento da onda para cada risco (quanto maior, mais "cheio").
// Valores espelham o SVG do design system (0,18 baixo / 0,11 moderado / 0,5 alto).
const FILL_Y: Record<RiskLevel, number> = {
  baixo: 18,
  moderado: 11,
  alto: 5,
  alerta: 2,
};

const LABEL: Record<RiskLevel, string> = {
  baixo: 'Baixo',
  moderado: 'Moderado',
  alto: 'Alto',
  alerta: 'Alerta',
};

const COLOR: Record<RiskLevel, string> = {
  baixo: colors.riskLow,
  moderado: colors.riskMod,
  alto: colors.riskHigh,
  alerta: colors.riskHigh,
};

export default function TideMeter({
  risco,
  size = 'md',
}: {
  risco: RiskLevel;
  size?: 'sm' | 'md';
}) {
  const w = size === 'sm' ? 16 : 20;
  const h = size === 'sm' ? 20.8 : 26;
  const y = FILL_Y[risco];
  const fill = COLOR[risco];

  return (
    <View style={styles.row}>
      <Svg width={w} height={h} viewBox="0 0 20 26">
        <Rect x={0.5} y={0.5} width={19} height={25} fill="none" stroke={colors.ink300} strokeWidth={1} />
        <Path
          d={`M0,${y + 7} Q5,${y + 4} 10,${y + 7} T20,${y + 7} L20,25.5 L0,25.5 Z`}
          fill={fill}
        />
      </Svg>
      <Text style={[styles.label, { color: fill, fontSize: size === 'sm' ? 11 : 12 }]}>
        {LABEL[risco].toUpperCase()}
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  row: { flexDirection: 'row', alignItems: 'center' },
  label: {
    fontFamily: fonts.bodySemiBold,
    letterSpacing: 0.4,
    marginLeft: 7,
  },
});
