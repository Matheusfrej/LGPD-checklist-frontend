import { ThemeInterface } from './themeInterface'

export const lightTheme: ThemeInterface = {
  colors: {
    'base-background': '#eceef8',
    'header-backgroud': '#FFFFFF',
    contrast: '#3f51b5',
    'strong-contrast': '#004080',
    'base-text': '#000001',
    title: '#000010',
    border: '#FCFCFC',
    span: '#AAAAAA',
    white: '#FFFFFF',
  },
  fonts: {
    family: 'Roboto',
    sizes: {
      xxsmall: '1.0rem',
      xsmall: '1.2rem',
      small: '1.4rem',
      medium: '1.6rem',
      large: '1.8rem',
      xlarge: '2.0rem',
      xxlarge: '2.8rem',
    },
  },
  spacings: {
    xxsmall: '0.8rem',
    xsmall: '1.6rem',
    small: '2.4rem',
    medium: '3.2rem',
    large: '4.0rem',
    xlarge: '5rem',
    xxlarge: '5rem',
  },
  layers: {
    base: 10,
    menu: 20,
    overlay: 30,
    modal: 40,
    alwaysOnTop: 50,
  },
}
