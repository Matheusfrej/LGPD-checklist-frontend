import { ThemeType } from '../contexts/ThemeContext'
import { THEME_STORAGE } from './storageConfig'

type StorageThemeProps = {
  theme: ThemeType
}

function storageThemeSave(theme: ThemeType): void {
  localStorage.setItem(THEME_STORAGE, JSON.stringify({ theme }))
}

function storageThemeGet(): ThemeType {
  const response = localStorage.getItem(THEME_STORAGE)

  const { theme }: StorageThemeProps = response ? JSON.parse(response) : null

  return theme
}

function storageThemeRemove() {
  localStorage.removeItem(THEME_STORAGE)
}

export { storageThemeSave, storageThemeGet, storageThemeRemove }
