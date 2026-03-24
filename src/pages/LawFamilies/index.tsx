import { useNavigate, useParams } from 'react-router-dom'
import { ButtonComponent } from '../../components/ButtonComponent'
import { MainContainer } from '../../templates/MainContainer'
import { SectionContainer } from '../../templates/SectionContainer'
import { ActionsFooterContainer } from '../../templates/ActionsFooterContainer'
import { useChecklists } from '../../contexts/ChecklistsContext'
import { CheckboxComponent } from '../../components/CheckboxComponent'
import { useEffect, useState } from 'react'
import { AppError } from '../../utils/AppError'
import { useToast } from '../../contexts/ToastContext'
import {
  listLawsService,
  listLawsServiceDefaultErrorMessage,
} from '../../services/law/listLaws'
import { LawDTO } from '../../dtos/lawDTO'
import styled from 'styled-components'

export function LawFamilies() {
  const { laws, onSetLaws } = useChecklists()
  const { toastError } = useToast()
  const { id } = useParams()
  const navigate = useNavigate()
  const [allLaws, setAllLaws] = useState<LawDTO[]>([])
  const [selectedLawIds, setSelectedLawIds] = useState<string[]>([])

  const goToChecklistFamilies = () => {
    if (id) {
      navigate(`/checklist-families/${id}`)
    } else {
      navigate('/checklist-families')
    }
  }

  useEffect(() => {
    const fetchLaws = async () => {
      try {
        const data = await listLawsService()
        setAllLaws(data.laws)
        if (laws && laws.length > 0) {
          setSelectedLawIds(laws.map((l) => String(l.id)))
        }
      } catch (error) {
        const isAppError = error instanceof AppError
        const title = isAppError
          ? error.message
          : listLawsServiceDefaultErrorMessage
        toastError(title)
      }
    }
    fetchLaws()
  }, [laws, toastError])

  const handleLawCheckboxChange = (lawId: number) => {
    const idStr = String(lawId)
    setSelectedLawIds((prev) =>
      prev.includes(idStr)
        ? prev.filter((id) => id !== idStr)
        : [...prev, idStr],
    )
  }

  const handleContinue = () => {
    if (selectedLawIds.length === 0) {
      toastError('Selecione pelo menos uma lei para continuar.')
      return
    }
    const filteredLaws = allLaws.filter((law) =>
      selectedLawIds.includes(String(law.id)),
    )
    onSetLaws(filteredLaws)
    goToChecklistFamilies()
  }

  return (
    <MainContainer>
      <SectionContainer hasHeader>
        <LawsContainer>
          <p>Selecione abaixo quais leis você quer incluir nessa avaliação:</p>
          <form>
            {allLaws &&
              allLaws.length > 0 &&
              allLaws.map((law) => (
                <CheckboxComponent
                  key={law.id}
                  value={String(law.id)}
                  checked={selectedLawIds.includes(String(law.id))}
                  labelText={law.name}
                  onChange={() => handleLawCheckboxChange(law.id)}
                />
              ))}
          </form>
        </LawsContainer>
      </SectionContainer>
      <ActionsFooterContainer hasMessage>
        <ButtonComponent text="Voltar" action={() => navigate('/')} />
        <ButtonComponent
          text="Continuar"
          action={handleContinue}
          disabled={selectedLawIds.length === 0}
        />
      </ActionsFooterContainer>
    </MainContainer>
  )
}

const LawsContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 2rem;
  padding: 1rem;

  form {
    display: flex;
    flex-direction: column;
    gap: 1rem;

    input[type='checkbox'] {
      width: 1.25rem;
      height: 1.25rem;
      accent-color: ${({ theme }) => theme.colors.contrast};
    }
  }
`
