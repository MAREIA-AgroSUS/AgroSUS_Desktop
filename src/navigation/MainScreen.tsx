import React, { useState } from 'react';
import { View, StyleSheet, Alert } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import Sidebar from '../components/Sidebar';
import DashboardScreen from '../screens/DashboardScreen';
import CasosScreen from '../screens/CasosScreen';
import FichaScreen from '../screens/FichaScreen';
import MapaScreen from '../screens/MapaScreen';
import AlertasScreen from '../screens/AlertasScreen';
import RelatoriosScreen from '../screens/RelatoriosScreen';
import ProfileScreen from '../screens/ProfileScreen';
import { colors } from '../theme/theme';
import { NavKey } from './types';
import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import type { RootStackParamList } from './types';

type Props = NativeStackScreenProps<RootStackParamList, 'Main'>;

export default function MainScreen({ navigation }: Props) {
  const [active, setActive] = useState<NavKey>('Casos');
  const [openCasoId, setOpenCasoId] = useState<string | null>(null);
  const [showProfile, setShowProfile] = useState(false);

  const handleChangeTab = (key: NavKey) => {
    setActive(key);
    setOpenCasoId(null);
    setShowProfile(false);
  };

  // Usado por Mapa e Alertas para abrir a ficha de um participante a partir
  // de qualquer tela — muda para a aba Casos já com a ficha selecionada.
  const openFicha = (casoId: string) => {
    setShowProfile(false);
    setActive('Casos');
    setOpenCasoId(casoId);
  };

  const handleLogout = () => {
    Alert.alert('Sair da conta', 'Tem certeza que deseja sair?', [
      { text: 'Cancelar', style: 'cancel' },
      {
        text: 'Sair',
        style: 'destructive',
        onPress: () => navigation.reset({ index: 0, routes: [{ name: 'Login' }] }),
      },
    ]);
  };

  return (
    <SafeAreaView style={styles.safe} edges={['top', 'left', 'right', 'bottom']}>
      <View style={styles.row}>
        <Sidebar
          active={active}
          onChange={handleChangeTab}
          onOpenProfile={() => setShowProfile(true)}
          onLogout={handleLogout}
        />
        <View style={styles.content}>
          {showProfile ? (
            <ProfileScreen onBack={() => setShowProfile(false)} onLogout={handleLogout} />
          ) : (
            <>
              {active === 'Dashboard' && <DashboardScreen />}
              {active === 'Casos' &&
                (openCasoId ? (
                  <FichaScreen casoId={openCasoId} onBack={() => setOpenCasoId(null)} />
                ) : (
                  <CasosScreen onOpenFicha={(id) => setOpenCasoId(id)} />
                ))}
              {active === 'Mapa' && <MapaScreen onOpenFicha={openFicha} />}
              {active === 'Alertas' && <AlertasScreen onOpenFicha={openFicha} />}
              {active === 'Relatorios' && <RelatoriosScreen />}
            </>
          )}
        </View>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: colors.white },
  row: { flex: 1, flexDirection: 'row' },
  content: { flex: 1, backgroundColor: colors.bg },
});
