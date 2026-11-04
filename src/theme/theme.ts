// Tokens extraídos do Design System mare.IA v1.1
export const colors = {
  // Marca
  orange600: '#D9600F',
  orange500: '#F77625',
  orange100: '#FDE6D5',
  teal700: '#2C7F97',
  teal500: '#6CC6DE',
  teal100: '#E3F5FA',

  // Neutros
  ink900: '#132029',
  ink700: '#3C4C56',
  ink500: '#6C7B84',
  ink300: '#A9B6BC',
  ink150: '#DCE4E7',
  ink100: '#EEF3F4',
  bg: '#FBFCFC',
  white: '#FFFFFF',

  // Semânticas clínicas (ESAS: Baixo / Moderado / Alto)
  riskLow: '#2F9E6E',
  riskMod: '#C98A12',
  riskHigh: '#D64545',

  // aliases usados nas telas (mapeando o antigo "alerta" para o mesmo tom de alto risco,
  // já que o design system só define baixo/moderado/alto)
  riskAlerta: '#D64545',

  // aliases de compatibilidade com código existente
  get text() { return this.ink900; },
  get textMuted() { return this.ink500; },
  get textFaint() { return this.ink300; },
  get border() { return this.ink150; },
  get card() { return this.white; },
  get page() { return this.bg; },
  get brand() { return this.teal700; },
  get brandOrange() { return this.orange500; },
  get brandOrangeDark() { return this.orange600; },
  get headerRowBg() { return this.ink100; },
  get navActive() { return this.ink900; },
  get navInactive() { return this.ink500; },
  risk: {
    baixo: '#2F9E6E',
    moderado: '#C98A12',
    alto: '#D64545',
    alerta: '#D64545',
  },
  riskBg: {
    baixo: '#E7F5EE',
    moderado: '#FBF0DC',
    alto: '#FBE8E8',
    alerta: '#FBE8E8',
  },
};

// Escala de espaçamento 8pt do design system
export const spacing = {
  xs: 4,
  sm: 8,
  md: 12,
  lg: 16,
  xl: 24,
  xxl: 32,
  xxxl: 48,
};

// "Sem raio de borda decorativo — a curva fica reservada ao símbolo da maré
// e ao medidor de risco." Botões/campos usam 2px.
export const radius = {
  sm: 2,
  md: 2,
  lg: 2,
  pill: 2,
};

export const fonts = {
  heading: 'Poppins_600SemiBold',
  headingMedium: 'Poppins_500Medium',
  body: 'Inter_400Regular',
  bodyMedium: 'Inter_500Medium',
  bodySemiBold: 'Inter_600SemiBold',
  bodyBold: 'Inter_700Bold',
  mono: 'IBMPlexMono_400Regular',
  monoMedium: 'IBMPlexMono_500Medium',
};

export const typography = {
  h1: { fontFamily: fonts.heading, fontSize: 19, color: colors.ink900 },
  h2: { fontFamily: fonts.heading, fontSize: 15, color: colors.ink900 },
  label: {
    fontFamily: fonts.mono,
    fontSize: 11,
    color: colors.ink500,
    letterSpacing: 0.5,
  },
  fieldLabel: {
    fontFamily: fonts.mono,
    fontSize: 11,
    fontWeight: '600' as const,
    color: colors.ink700,
    letterSpacing: 0.4,
  },
  body: { fontFamily: fonts.body, fontSize: 13, color: colors.ink900 },
  bodyMuted: { fontFamily: fonts.body, fontSize: 12, color: colors.ink500 },
  statValue: { fontFamily: fonts.heading, fontSize: 20, color: colors.ink900 },
  statLabel: {
    fontFamily: fonts.mono,
    fontSize: 10,
    color: colors.ink500,
    textTransform: 'uppercase' as const,
    letterSpacing: 0.4,
  },
  eyebrow: {
    fontFamily: fonts.mono,
    fontSize: 11,
    color: colors.orange600,
    textTransform: 'uppercase' as const,
    letterSpacing: 1,
  },
};
