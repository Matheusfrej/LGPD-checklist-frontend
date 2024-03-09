import { LineComponent } from '../../../../components/LineComponent'
import { SectionContainer } from '../../../../components/SectionContainer'
import * as S from './styles'

export function Instructions() {
  return (
    <SectionContainer hasHeader>
      <S.InstructionsTitle>Instruções Gerais</S.InstructionsTitle>
      <LineComponent />
      <S.InstructionsParagraph>
        Este Checklist tem o objetivo de avaliar adequação dos sistemas à Lei
        Geral de Proteção de Dados LGPD, e possui alguns itens adicionais
        específicos para IoT. O checklist está dividido em 2 partes:{' '}
        <strong>47 Itens Obrigatórios</strong> (exigidos pela Lei LGPD) e{' '}
        <strong>36 Itens Não Obrigatórios</strong> (itens recomendáveis,
        oportunidades de melhorias, opcionais). Os 47 itens obrigatórios estão
        classificados em 5 categorias: Transparência de Dados (T), Consentimento
        do Titular (C), Direito do Titular (D), Segurança de Dados (S) e
        Responsabilidade do Controlador (R). Dos 36 itens não obrigatórios, 27
        são itens específicos de IoT e 9 itens gerais, na qual estão
        classificados em 4 categorias: Segurança de dados (S), Responsabilidade
        do Controlador (R), Acesso ao Dispositivo (A) e Segurança Física (SF).{' '}
        <br /> <br />
        Para preencher o Checklist Empresa, o avaliador, após a leitura de cada
        item, deve indicar na coluna <strong>Resposta</strong> se o item está
        1-Sim ( item adequado, em conformidade), 2-Não (item com defeito, não
        adequado), 3- Não se aplica( item que não corresponde ao tipo de
        tratamento de dados que a empresa realiza). Em seguida, para os itens
        não adequados ou com defeitos, o avaliador deve preencher na coluna{' '}
        <strong>Grau de Severidade</strong>, se o defeito é 1-Leve, 2-Grave,
        3-Catastrófico. Por fim, na coluna opcional{' '}
        <strong>Comentário do Avaliador</strong>,o avaliador poderá descrever
        qualquer informação sobre o item relacionado, sugestões, dúvidas,
        problemas encontrados, localização do defeito, explicação sobre a
        avaliação, entre outros. A última coluna de{' '}
        <strong>Recomendações</strong>, são comentários e sugestões opcionais
        para uma solução ou melhor adequação do item à LGPD. O checklist possui
        2 gráficos para acompanhamento dos itens obrigatórios e 2 gráficos para
        o acompanhamento dos itens não obrigatórios, são eles: 1-{' '}
        <strong>Gráfico de Progresso </strong>
        (mostra a porcentagem do preenchimento total da tabela) e 2-{' '}
        <strong>Gráfico do Indice de Adequação</strong> ( taxa de adequação ou
        aderência dos itens, taxa de defeito/problemas encontrados, taxa de
        itens não aplicados, e taxa de itens não preenchidos). No final, o{' '}
        <strong>Relatório</strong> apresenta os dados totais do checklist de
        inspeção.
      </S.InstructionsParagraph>
      <LineComponent />
    </SectionContainer>
  )
}
