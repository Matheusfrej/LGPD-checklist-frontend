import { Palette } from 'phosphor-react'
import * as S from './styles'
import { ButtonComponent } from '../ButtonComponent'
import { useAllData } from '../../contexts/AllDataContext'
import { useTheme } from '../../contexts/ThemeContext'

export function Header() {
  const { theme, setTheme } = useTheme()
  const { importJson, exportJson } = useAllData()

  return (
    <S.HeaderContainer>
      <h2>Checklist LGPD</h2>
      <div>
        <div>
          <p>Importar/exportar dados do formulário</p>
          <div>
            <ButtonComponent
              action={() => importJson()}
              text="Importar"
              variant="default"
            />
            <ButtonComponent
              action={() => exportJson()}
              text="Exportar"
              variant="default"
            />
          </div>
        </div>
        <ButtonComponent
          icon={<Palette size={24} />}
          action={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
          text="Mudar tema"
          variant="outline"
        />
      </div>
    </S.HeaderContainer>
  )
}
