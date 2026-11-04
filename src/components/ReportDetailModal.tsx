import React from 'react';
import { View, Text, StyleSheet, Modal, Pressable, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import Button from './Button';
import { colors, radius, spacing, fonts } from '../theme/theme';

export default function ReportDetailModal({
  visible,
  titulo,
  descricao,
  onClose,
}: {
  visible: boolean;
  titulo: string;
  descricao: string;
  onClose: () => void;
}) {
  return (
    <Modal visible={visible} transparent animationType="fade" onRequestClose={onClose}>
      <Pressable style={styles.overlay} onPress={onClose}>
        <Pressable style={styles.card} onPress={(e) => e.stopPropagation()}>
          <View style={styles.headerRow}>
            <Text style={styles.title}>{titulo}</Text>
            <TouchableOpacity onPress={onClose} hitSlop={10}>
              <Ionicons name="close" size={20} color={colors.ink500} />
            </TouchableOpacity>
          </View>
          <Text style={styles.desc}>{descricao}</Text>

          <View style={styles.previewBox}>
            <Ionicons name="bar-chart-outline" size={28} color={colors.ink300} />
            <Text style={styles.previewText}>Pré-visualização do relatório "{titulo}"</Text>
          </View>

          <View style={styles.actions}>
            <Button label="Exportar PDF" variant="primary" style={{ flex: 1 }} onPress={onClose} />
            <Button label="Fechar" variant="secondary" style={{ flex: 1 }} onPress={onClose} />
          </View>
        </Pressable>
      </Pressable>
    </Modal>
  );
}

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(19,32,41,0.4)',
    justifyContent: 'center',
    alignItems: 'center',
    padding: spacing.lg,
  },
  card: {
    width: '100%',
    maxWidth: 420,
    backgroundColor: colors.white,
    borderRadius: radius.md,
    borderWidth: 1,
    borderColor: colors.ink150,
    padding: spacing.lg,
  },
  headerRow: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' },
  title: { fontFamily: fonts.heading, fontSize: 16, color: colors.ink900 },
  desc: { fontFamily: fonts.body, fontSize: 12, color: colors.ink500, marginTop: 4 },
  previewBox: {
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: colors.ink150,
    borderRadius: radius.sm,
    paddingVertical: spacing.xl,
    marginTop: spacing.lg,
    marginBottom: spacing.lg,
    backgroundColor: colors.ink100,
  },
  previewText: { fontFamily: fonts.body, fontSize: 12, color: colors.ink500, marginTop: spacing.sm, textAlign: 'center' },
  actions: { flexDirection: 'row', gap: spacing.sm },
});
