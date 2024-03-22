import { Margin, usePDF } from 'react-to-pdf'
import { MainContainer } from '../../components/MainContainer'
import { ReportActions } from './components/ReportActions'
import { ReportContent } from './components/ReportContent'
import { ReportHeader } from './components/ReportHeader'
import * as S from './styles'

export function Report() {
  const { toPDF, targetRef } = usePDF({
    filename: 'RelatorioLGPD.pdf',
    page: { margin: Margin.MEDIUM },
  })

  return (
    <MainContainer hasTable>
      <ReportActions action={toPDF} />
      <S.ReportMainContent ref={targetRef}>
        <ReportHeader />
        <ReportContent />
      </S.ReportMainContent>
    </MainContainer>
  )
}
