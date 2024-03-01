// styles
import { ThemeProvider } from 'styled-components'
import { darkTheme } from './styles/themes/dark'
import { lightTheme } from './styles/themes/light'
import { GlobalStyle } from './styles/global'

// routes
import { BrowserRouter } from 'react-router-dom'

import { useState } from 'react'
import { Router } from './Router'

export function Wrapper() {
  const [theme, setTheme] = useState<string>('light')
  const changeTheme = () => {
    theme === 'light' ? setTheme('dark') : setTheme('light')
  }

  return (
    <ThemeProvider theme={theme === 'light' ? lightTheme : darkTheme}>
      <BrowserRouter>
        <Router changeTheme={changeTheme} />
        <GlobalStyle />
      </BrowserRouter>
    </ThemeProvider>
  )
}
