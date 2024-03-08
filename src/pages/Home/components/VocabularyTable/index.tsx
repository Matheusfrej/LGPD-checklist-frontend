import * as S from './styles'

export function VocabularyTable() {
  const header = ['Vocabulário da LGPD', 'Descrição']
  const body = [
    [
      'Titular',
      `Pessoa natural a quem se referem os dados pessoais que são objeto de
  tratamento`,
    ],
    [
      'Controlador',
      `Pessoa natural ou jurídica, de direito público ou privado, 
      a quem competem as decisões referentes ao tratamento de dados pessoais`,
    ],
    [
      'DPO',
      `Pessoa indicada pelo controlador e operador para atuar como 
      canal de comunicação entre o controlador, os titulares dos dados
       e a Autoridade Nacional de Proteção de Dados (ANPD)`,
    ],
    [
      'Dados pessoais',
      `Informação relacionada a pessoa natural identificada ou identificável`,
    ],
    [
      'Tratamento de Dados',
      `Toda operação realizada com dados pessoais, como as que
       se referem a coleta, produção, recepção, classificação, utilização, acesso`,
    ],
    [
      'Base Legal',
      `É a fundamentação que dá amparo ao tratamento de dados pessoais realizado
       pelo controlador, ou seja, por meio da opção por determinada base legal
       é que o controlador conseguirá justificar o tratamento de dados pessoais
       que está realizando`,
    ],
  ]
  return (
    <S.TableContainer>
      <S.Table>
        <thead>
          <tr>
            {header.map((h, idx) => {
              return <th key={idx}>{h}</th>
            })}
          </tr>
        </thead>
        <tbody>
          {body.map((row, idx) => {
            return (
              <tr key={idx}>
                {row.map((column, idx2) => {
                  return <td key={idx + idx2}>{column}</td>
                })}
              </tr>
            )
          })}
        </tbody>
      </S.Table>
    </S.TableContainer>
  )
}
