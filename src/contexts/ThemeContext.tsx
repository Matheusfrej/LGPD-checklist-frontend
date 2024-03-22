import { ReactNode, createContext, useContext } from 'react'

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
  }

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
