import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, TextInput, Modal, FlatList, Pressable } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { colors, radius, spacing, fonts } from '../theme/theme';

export interface FilterDef {
  label: string;
  value: string;
  type?: 'select' | 'text';
  options?: string[];
  placeholder?: string;
}

export default function FilterBar({ filters }: { filters: FilterDef[] }) {
  // Estado interno controla cada campo — permite digitar e escolher de verdade.
  const [values, setValues] = useState<string[]>(filters.map((f) => f.value));
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const setValueAt = (index: number, v: string) => {
    setValues((prev) => {
      const next = [...prev];
      next[index] = v;
      return next;
    });
  };

  return (
    <View style={styles.row}>
      {filters.map((f, index) => {
        const isSelect = f.type !== 'text';
        return (
          <View key={f.label} style={styles.field}>
            <Text style={styles.label}>{f.label.toUpperCase()}</Text>

            {isSelect ? (
              <TouchableOpacity style={styles.box} onPress={() => setOpenIndex(index)} activeOpacity={0.7}>
                <Ionicons name="chevron-down" size={12} color={colors.ink500} style={{ marginRight: 6 }} />
                <Text style={styles.value} numberOfLines={1}>
                  {values[index]}
                </Text>
              </TouchableOpacity>
            ) : (
              <View style={styles.box}>
                <TextInput
                  style={styles.input}
                  value={values[index]}
                  onChangeText={(t) => setValueAt(index, t)}
                  placeholder={f.placeholder}
                  placeholderTextColor={colors.ink300}
                />
              </View>
            )}

            {isSelect && f.options && (
              <Modal
                visible={openIndex === index}
                transparent
                animationType="fade"
                onRequestClose={() => setOpenIndex(null)}
              >
                <Pressable style={styles.overlay} onPress={() => setOpenIndex(null)}>
                  <View style={styles.dropdown}>
                    <Text style={styles.dropdownTitle}>{f.label}</Text>
                    <FlatList
                      data={f.options}
                      keyExtractor={(item) => item}
                      renderItem={({ item }) => (
                        <TouchableOpacity
                          style={styles.option}
                          onPress={() => {
                            setValueAt(index, item);
                            setOpenIndex(null);
                          }}
                        >
                          <Text style={styles.optionText}>{item}</Text>
                          {values[index] === item && (
                            <Ionicons name="checkmark" size={16} color={colors.orange600} />
                          )}
                        </TouchableOpacity>
                      )}
                    />
                  </View>
                </Pressable>
              </Modal>
            )}
          </View>
        );
      })}
    </View>
  );
}

const styles = StyleSheet.create({
  row: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    paddingHorizontal: spacing.lg,
    marginBottom: spacing.lg,
    marginTop: spacing.xs,
  },
  field: { flexGrow: 1, flexBasis: '46%', marginRight: spacing.md, marginBottom: spacing.sm, minWidth: 140 },
  label: {
    fontFamily: fonts.mono,
    fontSize: 11,
    fontWeight: '600',
    color: colors.ink700,
    letterSpacing: 0.4,
    marginBottom: 6,
  },
  box: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1.5,
    borderColor: colors.ink300,
    borderRadius: radius.sm,
    paddingHorizontal: 10,
    paddingVertical: 9,
    backgroundColor: colors.white,
  },
  value: { fontFamily: fonts.body, fontSize: 13, color: colors.ink900 },
  input: { fontFamily: fonts.body, fontSize: 13, color: colors.ink900, padding: 0 },
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(19,32,41,0.35)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  dropdown: {
    width: 260,
    maxHeight: 320,
    backgroundColor: colors.white,
    borderRadius: radius.md,
    borderWidth: 1,
    borderColor: colors.ink150,
    paddingVertical: spacing.sm,
  },
  dropdownTitle: {
    fontFamily: fonts.monoMedium,
    fontSize: 11,
    color: colors.ink500,
    textTransform: 'uppercase',
    letterSpacing: 0.4,
    paddingHorizontal: spacing.md,
    paddingBottom: spacing.xs,
  },
  option: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: spacing.md,
    paddingVertical: 11,
    borderTopWidth: 1,
    borderTopColor: colors.ink100,
  },
  optionText: { fontFamily: fonts.body, fontSize: 14, color: colors.ink900 },
});
