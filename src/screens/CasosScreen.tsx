import React from 'react';
import { Text, StyleSheet } from 'react-native';
import { Screen, PageHeader, Footnote } from '../components/Layout';
import FilterBar from '../components/FilterBar';
import RiskBadge from '../components/RiskBadge';
import DataTable, { ColumnDef } from '../components/DataTable';
import { colors, fonts } from '../theme/theme';
import { casos, Caso } from '../data/mockData';

export default function CasosScreen({ onOpenFicha }: { onOpenFicha: (casoId: string) => void }) {
  const columns: ColumnDef<Caso>[] = [
    { key: 'id', label: 'ID participante', flex: 1.1, render: (c) => <Text style={styles.strongCell}>{c.id}</Text> },
    { key: 'bairro', label: 'Bairro', flex: 1, render: (c) => <Text style={styles.cell}>{c.bairro}</Text> },
    { key: 'risco', label: 'Risco', flex: 1, render: (c) => <RiskBadge risco={c.risco} /> },
    { key: 'acs', label: 'ACS', flex: 0.9, render: (c) => <Text style={styles.cell}>{c.acs}</Text> },
    { key: 'coleta', label: 'Última coleta', flex: 1, render: (c) => <Text style={styles.cell}>{c.ultimaColeta}</Text> },
    { key: 'enc', label: 'Encaminhamento', flex: 1.3, render: (c) => <Text style={styles.cell}>{c.encaminhamento}</Text> },
  ];

  return (
    <Screen>
      <PageHeader title="Painel UBS Jundiapeba · AgroSUS" subtitle="Equipe UBS · mareIA" />
      <FilterBar
        filters={[
          { label: 'Risco', value: 'todos', type: 'select', options: ['todos', 'baixo', 'moderado', 'alto', 'alerta'] },
          { label: 'ACS', value: 'todos', type: 'select', options: ['todos', 'Maria S.', 'João P.'] },
          { label: 'Período', value: '', type: 'text', placeholder: '__/__ – __/__' },
          { label: 'Status', value: 'todos', type: 'select', options: ['todos', 'enviado', 'em atendimento', 'sem encaminhamento'] },
        ]}
      />
      <DataTable columns={columns} data={casos} onRowPress={(c) => onOpenFicha(c.id)} />
      <Footnote>
        Listagem por ID AgroSUS · referência apenas de bairro (sem nome completo, CPF ou coordenadas).
      </Footnote>
    </Screen>
  );
}

const styles = StyleSheet.create({
  cell: { fontSize: 12, fontFamily: fonts.body, color: colors.ink900 },
  strongCell: { fontSize: 12, fontFamily: fonts.bodySemiBold, color: colors.ink900 },
});
