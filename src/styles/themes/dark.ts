import { ThemeInterface } from './themeInterface'

export const darkTheme: ThemeInterface = {
  colors: {
    'base-background': '#191b27',
    'header-backgroud': '#24252d',
    contrast: '#c0c4eb',
    'strong-contrast': '#787da6',
    'base-text': '#FFFFFF',
    title: '#FFFFFF',
    border: '#2c2c2c',
    span: '#666666',
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
