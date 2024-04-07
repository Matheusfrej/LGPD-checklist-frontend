import { SectionContainer } from '../../../../templates/SectionContainer'
import { SectionTitleComponent } from '../../../../components/SectionTitleComponent'
import { useUsers } from '../../../../contexts/UsersContext'
import * as S from './styles'
import { LineComponent } from '../../../../components/LineComponent'

export function ReportHeader() {
  const { user } = useUsers()

  return (
    <>
      <SectionContainer hasHeader>
        <SectionTitleComponent text="Relatório LGPD" />
        <LineComponent />
        <S.UserInfoContainer>
          <div>
            <span>Nome do avaliador</span>
            <p>{user.name}</p>
          </div>
          <div>
            <span>Cargo ou função</span>
            <p>{user.office}</p>
          </div>
          <div>
            <span>Nome do sistema </span>
            <p>{user.systemName}</p>
          </div>
          <div>
            <span>Descrição do sistema</span>
            <p>{user.systemDesc}</p>
          </div>
        </S.UserInfoContainer>
      </SectionContainer>
    </>
  )
}
