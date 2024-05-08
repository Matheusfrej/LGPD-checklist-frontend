import { ReactNode, createContext, useContext, useEffect } from 'react'
import { storageThemeGet, storageThemeSave } from '../storage/storageTheme'

export type ThemeType = 'light' | 'dark'

interface ThemeContextType {
  theme: ThemeType
  setTheme: (theme: ThemeType) => void
}

const ThemeContext = createContext({} as ThemeContextType)

interface ThemeContextProviderProps {
  themeInput: ThemeType
  setThemeInput: (theme: ThemeType) => void
  children: ReactNode
}

export function ThemeContextProvider({
  children,
  themeInput,
  setThemeInput,
}: ThemeContextProviderProps) {
  const setTheme = (theme: ThemeType) => {
    setThemeInput(theme)
    storageThemeSave(theme)
  }

  const getThemeFromStorage = () => {
    const theme = storageThemeGet()

    if (theme) {
      setThemeInput(theme)
    }
  }

  useEffect(() => {
    getThemeFromStorage()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return (
    <ThemeContext.Provider value={{ theme: themeInput, setTheme }}>
      {children}
    </ThemeContext.Provider>
  )
}

export function useTheme(): ThemeContextType {
  const context = useContext(ThemeContext)

  return context
}
