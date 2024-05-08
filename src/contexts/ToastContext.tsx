import { ReactNode, createContext, useContext } from 'react'
import { toast } from 'react-toastify'
import { useTheme as useThemeStyledComponents } from 'styled-components'

interface ToastContextType {
  toastSuccess: (message: string) => void
  toastWarn: (message: string) => void
  toastError: (message: string) => void
}

const ToastContext = createContext({} as ToastContextType)

interface ToastContextProviderProps {
  children: ReactNode
}

export function ToastContextProvider({ children }: ToastContextProviderProps) {
  const themeStyledComponents = useThemeStyledComponents()

  const autoCloseTiming = 2000

  const toastSuccess = (message: string) => {
    toast.success(message, {
      position: 'top-right',
      autoClose: autoCloseTiming,
      hideProgressBar: true,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      style: {
        background: themeStyledComponents.colors.contrast,
        color: themeStyledComponents.colors['base-background'],
      },
    })
  }

  const toastWarn = (message: string) => {
    toast.warn(message, {
      position: 'top-right',
      autoClose: autoCloseTiming,
      hideProgressBar: true,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      style: {
        background: themeStyledComponents.colors.contrast,
        color: themeStyledComponents.colors['base-background'],
      },
    })
  }

  const toastError = (message: string) => {
    toast.error(message, {
      position: 'top-right',
      autoClose: autoCloseTiming,
      hideProgressBar: true,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      style: {
        background: themeStyledComponents.colors.contrast,
        color: themeStyledComponents.colors['base-background'],
      },
    })
  }

  return (
    <ToastContext.Provider value={{ toastSuccess, toastWarn, toastError }}>
      {children}
    </ToastContext.Provider>
  )
}

export function useToast(): ToastContextType {
  const context = useContext(ToastContext)

  return context
}
