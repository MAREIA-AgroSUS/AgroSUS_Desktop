# mare.IA · Painel UBS (AgroSUS) — Front-end React Native / Expo

Protótipo de front-end (sem back-end/API real, apenas dados mockados) com a navegação
completa entre as telas do painel da UBS, seguindo os wireframes enviados.

## Telas incluídas

- **Login** — CPF/matrícula + senha, mesmo layout do app mobile (frame 30/imagem 3), agora
  usado também como tela de entrada do "site" (mesmo código React Native, roda também no
  navegador via Expo Web).
- **Dashboard** — indicadores (monitoramento, estratificação de risco, saúde, produção
  agrícola, evolução temporal, encaminhamentos).
- **Casos** — lista de casos com filtros e badges de risco → toque num card abre a **Ficha
  individual** (score de risco, linha do tempo, sintomas, pendências, encaminhamentos).
- **Mapa** — alterna entre visão **Operacional** (pontos/pins por situação de visita) e
  **Gerencial** (heatmap por microárea/risco).
- **Alertas** — lista de alertas ativos com risco, gatilho e ação sugerida.
- **Relatórios** — relatórios disponíveis e exportações (PDF, CSV, agendar envio).

Navegação: pilha raiz (Login → Main). Dentro de Main, uma **barra de navegação superior**
fixa (igual ao wireframe: logo + links Dashboard/Casos/Mapa/Alertas/Relatórios com
sublinhado laranja no item ativo) troca o conteúdo abaixo; em Casos, tocar numa linha da
tabela abre a Ficha no lugar da lista, mantendo a barra superior visível.

## Fidelidade ao Design System mare.IA v1.1

O front foi adaptado ao design system oficial enviado (cores, tipografia, espaçamento
e componentes):
- **Cores**: laranja `#F77625`/`#D9600F` (marca), teal `#6CC6DE`/`#2C7F97` (secundária),
  escala de neutros "ink" (`#132029` a `#EEF3F4`) e semânticas clínicas de risco
  (`baixo #2F9E6E`, `moderado #C98A12`, `alto #D64545`).
- **Tipografia**: Poppins SemiBold para títulos, Inter para texto corrido e botões,
  IBM Plex Mono para rótulos/dados técnicos — carregadas via `@expo-google-fonts`.
- **Sem raio de borda decorativo**: botões e campos usam 2px, só o logo e o indicador
  de risco têm curva.
- **Indicador de risco = medidor de maré**: componente-assinatura do design system
  (`TideMeter`), um "copo" com nível de água colorido por risco, usado em vez de badges
  genéricas em toda a Ficha, Mapa e Alertas.
- **Alertas** viraram uma lista "reta" com borda esquerda colorida (padrão "Alerta de
  equipe" do design system), sem cartão.
- **Botões**: componente único `Button` com as três variantes do design system
  (primary sólido laranja, secondary contornado, ghost sublinhado).


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

## Próximos passos sugeridos

- Ligar os filtros (hoje são apenas visuais) a estado real e/ou a uma API.
- Trocar o `PseudoMap` (SVG estilizado, fiel ao wireframe) por um mapa real
  (`react-native-maps`) quando houver coordenadas de verdade.
- Autenticação real na tela de Login.

## Atualizações desta rodada

- **Dashboard**: Saúde + Produção Agrícola agora formam uma única grade de 4 colunas
  (com dois rótulos de grupo no topo), alinhada com a grade de Encaminhamentos logo
  abaixo — os traços verticais batem certinho entre as duas linhas.
- **Telas novas**: `EsqueciSenhaScreen` (fluxo de recuperação de senha, acessível pelo
  link na tela de Login).
- **Botões que não iam a lugar nenhum agora funcionam**:
  - "Esqueci minha senha" (Login) → abre a tela de recuperação.
  - Ícone de menu (☰) no Login → feedback via alerta.
  - "Abrir ficha do produtor" (Mapa) → muda para a aba Casos já na ficha do
    participante selecionado.
  - Ação de cada alerta (Encaminhar/Orientar/Notificar/etc. em Alertas) → abre a
    ficha do participante correspondente.
  - Cartões de relatório (Visitas, Exposição, Sintomas...) → abrem um modal de
    pré-visualização com opção de exportar.
  - Botões "Exportar relatório"/"Comparativo mensal" (Dashboard) e
    "PDF"/"Planilha (CSV)"/"Agendar envio" (Relatórios) → dão feedback confirmando
    a ação (simulada, sem backend real).
- Adicionadas fichas mock para os participantes AGS-0220, AGS-0231 e AGS-0246 (que
  só existiam como alertas) para que "abrir ficha" a partir de Alertas sempre
  encontre dados reais.

## Atualizações desta rodada (mapa gerencial + páginas faltantes + logout)

- **Mapa gerencial (heatmap) agora é interativo**: clicar numa zona seleciona ela
  (destaque visual + painel abaixo com bairro, risco e nº de casos monitorados);
  clicar na legenda "Concentração de risco" filtra quais zonas aparecem no mapa,
  igual já acontecia no mapa operacional.
- **Tela nova: Perfil/Conta** (`ProfileScreen`) — dados da ACS logada, matrícula,
  microárea, links de suporte, e o botão de sair. Acessada pelo rodapé da barra
  lateral (nome + avatar).
- **Botão de Sair**: no rodapé da barra lateral, sempre visível. Pede confirmação
  e volta para a tela de Login (reseta a navegação, sem deixar "voltar" para a
  área logada).
- Fechei os últimos botões sem ação (links de suporte no Perfil).
