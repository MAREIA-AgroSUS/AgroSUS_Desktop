# mare.IA · Painel UBS (AgroSUS) — Front-end React Native / Expo

## Como rodar

```bash
npm install
npm run web      # roda no navegador (ideal p/ o "site")
npm run android  # emulador/dispositivo Android
npm run ios      # simulador iOS (necessita macOS)
```

Ao abrir, toque em **Entrar** na tela de login (qualquer CPF/senha) para acessar o painel —
ainda não há autenticação real, é apenas navegação de front-end.

## Estrutura

```
src/
  components/   Logo, RiskBadge, FilterBar, PseudoMap, Layout (Screen/Card/StatBox)
  data/         mockData.ts — casos, alertas, indicadores, pontos de mapa
  navigation/   RootNavigator, MainTabs, CasosStack, types
  screens/      LoginScreen, DashboardScreen, CasosScreen, FichaScreen, MapaScreen,
                AlertasScreen, RelatoriosScreen
  theme/        cores, tipografia, espaçamento
```
