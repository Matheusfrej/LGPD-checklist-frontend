import * as Dialog from '@radix-ui/react-dialog'
import { X } from 'phosphor-react'
import * as S from './styles'
import { ReactNode } from 'react'

interface ModalContainerProps {
  title?: string
  isVisible: boolean
  handleModalOpenChange: (state: boolean) => void
  children: ReactNode
}

export function ModalContainer({
  title,
  isVisible,
  children,
  handleModalOpenChange,
}: ModalContainerProps) {
  return (
    <Dialog.Root open={isVisible} onOpenChange={handleModalOpenChange}>
      <Dialog.Portal>
        <S.Overlay />
        <S.Content>
          <Dialog.Title>{title}</Dialog.Title>
          <S.CloseButton>
            <X size={24} />
          </S.CloseButton>
          {children}
        </S.Content>
      </Dialog.Portal>
    </Dialog.Root>
  )
}
