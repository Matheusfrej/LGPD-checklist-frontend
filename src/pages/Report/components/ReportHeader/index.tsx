import { SectionContainer } from '../../../../templates/SectionContainer'
import { SectionTitleComponent } from '../../../../components/SectionTitleComponent'
import { useUsers } from '../../../../contexts/UsersContext'
import * as S from './styles'
import { LineComponent } from '../../../../components/LineComponent'
import { SystemDTO } from '../../../../dtos/systemDTO'
import { useEffect, useState } from 'react'
import {
  getSystemService,
  getSystemServiceDefaultErrorMessage,
} from '../../../../services/system/getSystemService'
import { AppError } from '../../../../utils/AppError'
import { useToast } from '../../../../contexts/ToastContext'

export function ReportHeader() {
  const { user } = useUsers()
  const { toastError } = useToast()
  const [system, setSystem] = useState<SystemDTO>()

  const getSystem = async (id: number) => {
    try {
      const data = await getSystemService(id)

      setSystem(data.system)
    } catch (error) {
      const isAppError = error instanceof AppError

      const title = isAppError
        ? error.message
        : getSystemServiceDefaultErrorMessage
      toastError(title)
    }
  }

  const userSystem = user.system

  useEffect(() => {
    if (userSystem) {
      getSystem(userSystem)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user, userSystem])

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
            <p>{system ? system.name : user.systemName}</p>
          </div>
          <div>
            <span>Descrição do sistema</span>
            <p>{system ? system.description : user.systemDesc}</p>
          </div>
        </S.UserInfoContainer>
      </SectionContainer>
    </>
  )
}
