import React from 'react';
import TideMeter from './TideMeter';
import { RiskLevel } from '../data/mockData';

// Mantido como wrapper fino para compatibilidade: o indicador de risco
// oficial do design system é o "medidor de maré" (TideMeter).
export default function RiskBadge({
  risco,
  variant = 'inline',
}: {
  risco: RiskLevel;
  variant?: 'inline' | 'pill';
}) {
  return <TideMeter risco={risco} size={variant === 'pill' ? 'md' : 'sm'} />;
}
