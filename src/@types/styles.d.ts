import 'styled-components'
import { ThemeInterface } from '../styles/themes/themeInterface'

declare module 'styled-components' {
  export interface DefaultTheme extends ThemeInterface {}
}
