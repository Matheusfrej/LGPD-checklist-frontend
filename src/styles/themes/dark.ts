import { ThemeInterface } from './themeInterface'

export const darkTheme: ThemeInterface = {
  colors: {
    'base-background': '#181A20', // deep dark
    'header-background': '#232634', // slightly lighter for header
    contrast: '#4F8CFF', // blue accent for contrast
    'weak-contrast': '#232634', // match header for subtle contrast
    'strong-contrast': '#1E90FF', // vivid blue for strong contrast
    'base-text': '#F5F6FA', // very light for readability
    title: '#B0C7F9', // soft blue for titles
    span: '#5A5A6E', // muted for spans
    white: '#FFFFFF',
    black: '#000000',
    red: '#FF5C5C', // brighter red for alerts
    green: '#238636', // modern green
    wheat: '#E5C07B', // gold accent
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
