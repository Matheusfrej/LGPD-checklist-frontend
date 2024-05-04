import { ItemClassification } from '../../@types'

const mandatoryItemsClassifications: ItemClassification[] = [
  {
    name: 'Sobre transparência de Dados (T)',
    tag: 'T-',
  },
  {
    name: 'Sobre Consentimento do Titular (C)',
    tag: 'C-',
  },
  {
    name: 'Sobre os Direitos do Titular (D)',
    tag: 'D-',
  },
  {
    name: 'Sobre Segurança de Dados (S)',
    tag: 'S-',
  },
  {
    name: 'Sobre Responsabilidade do Controlador   (R)',
    tag: 'R-',
  },
]

const nonMandatoryItemsClassifications: ItemClassification[] = [
  {
    name: 'Sobre Segurança de Dados (S)',
    tag: 'S-',
  },
  {
    name: 'Sobre Responsabilidade do Controlador   (R)',
    tag: 'R-',
  },
  {
    name: 'Acesso ao Dispositivo (A)',
    tag: 'A-',
  },
  {
    name: 'Segurança Física (SF)',
    tag: 'SF-',
  },
]

export { mandatoryItemsClassifications, nonMandatoryItemsClassifications }
