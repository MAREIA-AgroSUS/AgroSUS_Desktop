import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Alert } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { Screen, PageHeader, Section, SectionLabel } from '../components/Layout';
import Button from '../components/Button';
import { colors, spacing, fonts, radius } from '../theme/theme';

export default function ProfileScreen({ onBack, onLogout }: { onBack: () => void; onLogout: () => void }) {
  return (
    <Screen>
      <View style={styles.backRow}>
        <TouchableOpacity onPress={onBack} style={styles.backBtn}>
          <Ionicons name="chevron-back" size={16} color={colors.ink500} />
          <Text style={styles.backText}>Voltar</Text>
        </TouchableOpacity>
      </View>

      <PageHeader title="Minha conta" subtitle="Equipe UBS · mareIA" />

      <Section>
        <View style={styles.avatarRow}>
          <View style={styles.avatar}>
            <Text style={styles.avatarInitials}>MS</Text>
          </View>
          <View>
            <Text style={styles.name}>Maria S.</Text>
            <Text style={styles.role}>Agente Comunitária de Saúde · UBS Jundiapeba</Text>
          </View>
        </View>
      </Section>

      <Section>
        <SectionLabel>Dados de acesso</SectionLabel>
        <View style={styles.infoRow}>
          <Text style={styles.infoLabel}>Matrícula</Text>
          <Text style={styles.infoValue}>AGR-2291</Text>
        </View>
        <View style={styles.infoRow}>
          <Text style={styles.infoLabel}>Microárea</Text>
          <Text style={styles.infoValue}>03 · Jundiapeba</Text>
        </View>
        <View style={styles.infoRow}>
          <Text style={styles.infoLabel}>Equipe ESF</Text>
          <Text style={styles.infoValue}>ESF 1</Text>
        </View>
        <View style={[styles.infoRow, { borderBottomWidth: 0 }]}>
          <Text style={styles.infoLabel}>Acesso offline</Text>
          <Text style={styles.infoValue}>Ativado</Text>
        </View>
      </Section>

      <Section>
        <SectionLabel>Suporte</SectionLabel>
        <TouchableOpacity
          style={styles.linkRow}
          onPress={() => Alert.alert('Central de ajuda', 'Artigos e tutoriais do AgroSUS estarão disponíveis aqui em breve.')}
        >
          <Text style={styles.linkText}>Central de ajuda AgroSUS</Text>
          <Ionicons name="chevron-forward" size={16} color={colors.ink300} />
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.linkRow}
          onPress={() => Alert.alert('Fale com o coordenador', 'Isso abrirá uma conversa com o coordenador da sua UBS.')}
        >
          <Text style={styles.linkText}>Fale com o coordenador da UBS</Text>
          <Ionicons name="chevron-forward" size={16} color={colors.ink300} />
        </TouchableOpacity>
      </Section>

      <View style={styles.logoutBox}>
        <Button label="Sair da conta" variant="secondary" onPress={onLogout} />
      </View>
    </Screen>
  );
}

const styles = StyleSheet.create({
  backRow: { paddingHorizontal: spacing.lg, paddingTop: spacing.md },
  backBtn: { flexDirection: 'row', alignItems: 'center', alignSelf: 'flex-start' },
  backText: { fontFamily: fonts.bodyMedium, fontSize: 13, color: colors.ink500, marginLeft: 2 },
  avatarRow: { flexDirection: 'row', alignItems: 'center' },
  avatar: {
    width: 52,
    height: 52,
    borderRadius: radius.sm,
    backgroundColor: colors.orange100,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: spacing.md,
  },
  avatarInitials: { fontFamily: fonts.heading, fontSize: 18, color: colors.orange600 },
  name: { fontFamily: fonts.heading, fontSize: 16, color: colors.ink900 },
  role: { fontFamily: fonts.body, fontSize: 12, color: colors.ink500, marginTop: 2 },
  infoRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 11,
    borderBottomWidth: 1,
    borderBottomColor: colors.ink150,
  },
  infoLabel: { fontFamily: fonts.mono, fontSize: 12, color: colors.ink500 },
  infoValue: { fontFamily: fonts.bodySemiBold, fontSize: 13, color: colors.ink900 },
  linkRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: colors.ink150,
  },
  linkText: { fontFamily: fonts.body, fontSize: 13, color: colors.ink900 },
  logoutBox: { paddingHorizontal: spacing.lg, marginTop: spacing.sm },
});
