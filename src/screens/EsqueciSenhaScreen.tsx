import React, { useState } from 'react';
import { View, Text, TextInput, StyleSheet, KeyboardAvoidingView, Platform, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { SafeAreaView } from 'react-native-safe-area-context';
import Logo from '../components/Logo';
import Button from '../components/Button';
import { colors, radius, spacing, fonts } from '../theme/theme';
import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import type { RootStackParamList } from '../navigation/types';

type Props = NativeStackScreenProps<RootStackParamList, 'EsqueciSenha'>;

export default function EsqueciSenhaScreen({ navigation }: Props) {
  const [cpf, setCpf] = useState('');
  const [enviado, setEnviado] = useState(false);

  return (
    <SafeAreaView style={styles.safe}>
      <KeyboardAvoidingView style={{ flex: 1 }} behavior={Platform.OS === 'ios' ? 'padding' : undefined}>
        <TouchableOpacity style={styles.backRow} onPress={() => navigation.goBack()}>
          <Ionicons name="chevron-back" size={18} color={colors.ink700} />
          <Text style={styles.backText}>Voltar</Text>
        </TouchableOpacity>

        <View style={styles.content}>
          <View style={styles.logoBlock}>
            <Logo size="lg" />
          </View>

          {!enviado ? (
            <>
              <Text style={styles.title}>Recuperar acesso</Text>
              <Text style={styles.desc}>
                Informe o CPF ou matrícula cadastrado. Enviaremos as instruções de redefinição de
                senha para o contato registrado na sua UBS.
              </Text>

              <Text style={styles.fieldLabel}>CPF ou MATRICULA</Text>
              <TextInput
                style={styles.input}
                placeholder="000.000.000-00"
                placeholderTextColor={colors.ink300}
                value={cpf}
                onChangeText={setCpf}
                keyboardType="number-pad"
              />

              <Button
                label="Enviar instruções"
                variant="primary"
                style={{ marginTop: spacing.lg }}
                onPress={() => setEnviado(true)}
              />
            </>
          ) : (
            <>
              <View style={styles.successIcon}>
                <Ionicons name="checkmark-circle" size={40} color={colors.riskLow} />
              </View>
              <Text style={styles.title}>Instruções enviadas</Text>
              <Text style={styles.desc}>
                Se o CPF ou matrícula informado estiver cadastrado, você receberá as instruções de
                redefinição de senha em instantes. Verifique com o coordenador da sua UBS caso não
                receba.
              </Text>
              <Button
                label="Voltar para o login"
                variant="secondary"
                style={{ marginTop: spacing.lg }}
                onPress={() => navigation.goBack()}
              />
            </>
          )}
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: colors.white },
  backRow: { flexDirection: 'row', alignItems: 'center', paddingHorizontal: spacing.lg, paddingTop: spacing.sm },
  backText: { fontFamily: fonts.bodyMedium, fontSize: 14, color: colors.ink700, marginLeft: 2 },
  content: { flex: 1, justifyContent: 'center', paddingHorizontal: spacing.xl },
  logoBlock: { alignItems: 'center', marginBottom: spacing.xl },
  successIcon: { alignItems: 'center', marginBottom: spacing.sm },
  title: { fontFamily: fonts.heading, fontSize: 19, color: colors.ink900, textAlign: 'center', marginBottom: spacing.sm },
  desc: {
    fontFamily: fonts.body,
    fontSize: 13,
    color: colors.ink500,
    textAlign: 'center',
    marginBottom: spacing.xl,
    lineHeight: 19,
  },
  fieldLabel: {
    fontFamily: fonts.mono,
    fontSize: 11,
    fontWeight: '600',
    color: colors.ink700,
    letterSpacing: 0.4,
    marginBottom: spacing.xs,
    textTransform: 'uppercase',
  },
  input: {
    borderWidth: 1.5,
    borderColor: colors.ink300,
    borderRadius: radius.sm,
    paddingHorizontal: spacing.md,
    paddingVertical: 12,
    fontSize: 14,
    fontFamily: fonts.body,
    color: colors.ink900,
    backgroundColor: colors.white,
  },
});
