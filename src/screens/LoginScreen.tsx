import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  KeyboardAvoidingView,
  Platform,
  Alert,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { SafeAreaView } from 'react-native-safe-area-context';
import Logo from '../components/Logo';
import Button from '../components/Button';
import { colors, radius, spacing, typography, fonts } from '../theme/theme';
import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import type { RootStackParamList } from '../navigation/types';

type Props = NativeStackScreenProps<RootStackParamList, 'Login'>;

export default function LoginScreen({ navigation }: Props) {
  const [cpf, setCpf] = useState('');
  const [senha, setSenha] = useState('');
  const [showSenha, setShowSenha] = useState(false);

  return (
    <SafeAreaView style={styles.safe}>
      <KeyboardAvoidingView
        style={{ flex: 1 }}
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}
      >
        <View style={styles.menuRow}>
          <View />
          <TouchableOpacity
            hitSlop={10}
            onPress={() => Alert.alert('Menu', 'Suporte e configurações da conta ficam aqui — em breve.')}
          >
            <Ionicons name="menu" size={22} color={colors.text} />
          </TouchableOpacity>
        </View>

        <View style={styles.content}>
          <View style={styles.logoBlock}>
            <Logo size="lg" />
            <Text style={styles.subtitle}>AgroSUS · Acesso do Agente</Text>
          </View>

          <View style={styles.form}>
            <Text style={styles.fieldLabel}>CPF ou MATRICULA</Text>
            <TextInput
              style={styles.input}
              placeholder="000.000.000-00"
              placeholderTextColor={colors.textFaint}
              value={cpf}
              onChangeText={setCpf}
              keyboardType="number-pad"
            />

            <Text style={[styles.fieldLabel, { marginTop: spacing.lg }]}>SENHA</Text>
            <View style={styles.passwordRow}>
              <TextInput
                style={[styles.input, { flex: 1, marginBottom: 0 }]}
                placeholder="••••••••"
                placeholderTextColor={colors.textFaint}
                value={senha}
                onChangeText={setSenha}
                secureTextEntry={!showSenha}
              />
              <TouchableOpacity
                style={styles.eyeBtn}
                onPress={() => setShowSenha((v) => !v)}
              >
                <Ionicons
                  name={showSenha ? 'eye-off-outline' : 'eye-outline'}
                  size={18}
                  color={colors.textMuted}
                />
              </TouchableOpacity>
            </View>

            <Button
              label="Entrar"
              variant="primary"
              style={{ marginTop: spacing.lg }}
              onPress={() => navigation.replace('Main')}
            />

            <TouchableOpacity
              style={{ alignSelf: 'center', marginTop: spacing.md }}
              onPress={() => navigation.navigate('EsqueciSenha')}
            >
              <Text style={styles.link}>Esqueci minha senha</Text>
            </TouchableOpacity>
          </View>
        </View>

        <View style={styles.footer}>
          <Ionicons name="lock-closed-outline" size={13} color={colors.textFaint} />
          <Text style={styles.footerText}>Funciona offline após o primeiro acesso</Text>
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: colors.card },
  menuRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: spacing.lg,
    paddingTop: spacing.sm,
  },
  content: { flex: 1, justifyContent: 'center', paddingHorizontal: spacing.xl },
  logoBlock: { alignItems: 'center', marginBottom: spacing.xxl },
  subtitle: { ...typography.bodyMuted, marginTop: spacing.sm },
  form: { width: '100%' },
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
    marginBottom: spacing.md,
  },
  passwordRow: { flexDirection: 'row', alignItems: 'center' },
  eyeBtn: {
    marginLeft: -40,
    padding: spacing.sm,
  },
  link: { fontFamily: fonts.body, color: colors.ink500, fontSize: 13, textDecorationLine: 'underline' },
  footer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    paddingBottom: spacing.lg,
  },
  footerText: { ...typography.bodyMuted, fontSize: 11, marginLeft: 6 },
});
