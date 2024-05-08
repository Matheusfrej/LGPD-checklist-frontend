import { AUTH_STORAGE } from './config'

type StorageAuthTokenProps = {
  token: string
}

function storageAuthTokenSave(token: string): void {
  localStorage.setItem(AUTH_STORAGE, JSON.stringify({ token }))
}

function storageAuthTokenGet(): string {
  const response = localStorage.getItem(AUTH_STORAGE)

  const { token }: StorageAuthTokenProps = response
    ? JSON.parse(response)
    : null

  return token
}

function storageAuthTokenRemove() {
  localStorage.removeItem(AUTH_STORAGE)
}

export { storageAuthTokenSave, storageAuthTokenGet, storageAuthTokenRemove }
