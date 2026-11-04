import React, { useState } from 'react';
import { View, StyleSheet } from 'react-native';
import Svg, { Circle, Line } from 'react-native-svg';
import { colors, radius } from '../theme/theme';
import { MapPoint } from '../data/mockData';

const SITUACAO_COLOR: Record<MapPoint['situacao'], string> = {
  baixo: colors.risk.baixo,
  moderado: colors.risk.moderado,
  reavaliacao: colors.risk.alto,
  encaminhamento: colors.risk.alerta,
  programada: colors.brand,
  nao_visitado: colors.textFaint,
};


export function OperationalMap({
  points,
  selectedId,
  onSelect,
  height = 220,
}: {
  points: MapPoint[];
  selectedId?: string;
  onSelect?: (id: string) => void;
  height?: number;
}) {
  const [pressedId, setPressedId] = useState<string | null>(null);

  return (
    <View style={[styles.mapBox, { height }]}>
      <Svg width="100%" height="100%">
        <Line x1="0" y1="33%" x2="100%" y2="33%" stroke={colors.border} strokeWidth={1} />
        <Line x1="0" y1="66%" x2="100%" y2="66%" stroke={colors.border} strokeWidth={1} />
        <Line x1="33%" y1="0" x2="33%" y2="100%" stroke={colors.border} strokeWidth={1} />
        {points.map((p) => {
          const isActive = selectedId === p.id || pressedId === p.id;
          return (
            <React.Fragment key={p.id}>
              {/* ponto visível */}
              <Circle
                cx={`${p.x * 100}%`}
                cy={`${p.y * 100}%`}
                r={isActive ? 9 : 7}
                fill={SITUACAO_COLOR[p.situacao]}
                stroke={selectedId === p.id ? colors.text : 'transparent'}
                strokeWidth={2}
              />
              {/* alvo de toque maior e invisível, por cima, para facilitar o clique/toque */}
              <Circle
                cx={`${p.x * 100}%`}
                cy={`${p.y * 100}%`}
                r={16}
                fill="transparent"
                onPressIn={() => setPressedId(p.id)}
                onPressOut={() => setPressedId(null)}
                onPress={() => onSelect?.(p.id)}
              />
            </React.Fragment>
          );
        })}
      </Svg>
    </View>
  );
}

export function HeatMap({
  zones,
  selectedId,
  onSelect,
  height = 220,
}: {
  zones: { id: number; x: number; y: number; r: number; risco: keyof typeof colors.risk }[];
  selectedId?: number | null;
  onSelect?: (id: number) => void;
  height?: number;
}) {
  const [pressedId, setPressedId] = useState<number | null>(null);

  return (
    <View style={[styles.mapBox, { height }]}>
      <Svg width="100%" height="100%">
        <Line x1="50%" y1="0" x2="50%" y2="100%" stroke={colors.border} strokeWidth={1} />
        <Line x1="0" y1="55%" x2="100%" y2="55%" stroke={colors.border} strokeWidth={1} />
        {zones.map((z) => {
          const isActive = selectedId === z.id || pressedId === z.id;
          return (
            <Circle
              key={z.id}
              cx={`${z.x * 100}%`}
              cy={`${z.y * 100}%`}
              r={isActive ? z.r + 4 : z.r}
              fill={colors.risk[z.risco]}
              opacity={isActive ? 0.55 : 0.35}
              stroke={selectedId === z.id ? colors.text : 'transparent'}
              strokeWidth={2}
              onPressIn={() => setPressedId(z.id)}
              onPressOut={() => setPressedId(null)}
              onPress={() => onSelect?.(z.id)}
            />
          );
        })}
      </Svg>
    </View>
  );
}

const styles = StyleSheet.create({
  mapBox: {
    backgroundColor: colors.ink100,
    borderRadius: radius.md,
    borderWidth: 1,
    borderColor: colors.border,
    overflow: 'hidden',
  },
});
