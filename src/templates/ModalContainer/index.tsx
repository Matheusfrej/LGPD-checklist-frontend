import * as Dialog from '@radix-ui/react-dialog'
import { X } from 'phosphor-react'
import { styled } from 'styled-components'
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
        <Overlay />
        <Content>
          <Dialog.Title>{title}</Dialog.Title>
          <CloseButton>
            <X size={24} />
          </CloseButton>
          {children}
        </Content>
      </Dialog.Portal>
    </Dialog.Root>
  )
}

const Overlay = styled(Dialog.Overlay)`
  position: fixed;
  width: 100vw;
  height: 100vh;

  inset: 0;

  background: rgba(0, 0, 0, 0.75);
`

const CloseButton = styled(Dialog.Close)`
  position: absolute;
  background: transparent;
  border: 0;
  top: 1.5rem;
  right: 1.5rem;
  line-height: 0;
  cursor: pointer;
  color: ${(props) => props.theme.colors['base-text']};
`

const Content = styled(Dialog.Content)`
  min-width: 32rem;
  border-radius: 6px;
  padding: 2.5rem 3rem;

  @media (max-width: 1000px) {
    min-width: 80%;
    padding: 2rem;
  }

  background: ${(props) => props.theme.colors['base-background']};

  position: fixed;

  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
`
