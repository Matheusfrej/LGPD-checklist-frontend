import { styled } from 'styled-components'
import * as Dialog from '@radix-ui/react-dialog'

export const Overlay = styled(Dialog.Overlay)`
  position: fixed;
  width: 100vw;
  height: 100vh;

  inset: 0;

  background: rgba(0, 0, 0, 0.75);
`

export const CloseButton = styled(Dialog.Close)`
  position: absolute;
  background: transparent;
  border: 0;
  top: 1.5rem;
  right: 1.5rem;
  line-height: 0;
  cursor: pointer;
  color: ${(props) => props.theme.colors['base-text']};
`

export const Content = styled(Dialog.Content)`
  min-width: 32rem;
  @media (max-width: 700px) {
    min-width: 15rem;
  }
  border-radius: 6px;
  padding: 2.5rem 3rem;
  background: ${(props) => props.theme.colors['base-background']};

  position: fixed;

  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
`
