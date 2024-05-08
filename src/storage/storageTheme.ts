import { ThemeType } from '../contexts/ThemeContext'
import { THEME_STORAGE } from './config'

type StorageThemeProps = {
  theme: ThemeType | null
}

function storageThemeSave(theme: ThemeType): void {
  localStorage.setItem(THEME_STORAGE, JSON.stringify({ theme }))
}

function storageThemeGet(): ThemeType | null {
  const response = localStorage.getItem(THEME_STORAGE)

  const theme: StorageThemeProps = response ? JSON.parse(response) : null

  return theme ? theme.theme : null
}

function storageThemeRemove() {
  localStorage.removeItem(THEME_STORAGE)
}

export { storageThemeSave, storageThemeGet, storageThemeRemove }
