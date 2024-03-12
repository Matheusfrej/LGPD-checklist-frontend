import { ChecklistItemType } from '../contexts/ChecklistsContext'

const initialItems: ChecklistItemType[] = [
  {
    code: 'T-01',
    itemDesc:
      'As finalidades de tratamento de dados foram definidas na organização?',
    mandatory: true,
    answer: undefined,
    severityDegree: undefined,
    userComment: '',
    type: 'general',
    recomendations:
      'Crie um documento definindo uma Política de Privacidade e os Termos de Consentimento, descrevendo quais são os objetivos de tratamento de dados e de que forma os dados serão utilizados.',
  },
  {
    code: 'T-02',
    itemDesc:
      'O tratamento de dados pessoais é realizado de acordo com uma base legal?',
    mandatory: true,
    answer: undefined,
    severityDegree: undefined,
    userComment: '',
    type: 'general',
    recomendations: `Na documentação da Política de Privacidade e dos Termos de Consentimento, explique a base legal em que fundamenta o tratamento de dados pessoais. 
      Exemplos de base legais: I - Mediante o fornecimento de consentimento pelo titular; II - Para o cumprimento de obrigação legal ou regulatória pelo controlador. Ver completo na lei, disponível: Capítulo 2, Seção 1, artigo 7.`,
  },
  {
    code: 'T-03',
    itemDesc:
      'O sistema informa ao titular sobre as finalidades de tratamento de dados pessoais?',
    mandatory: true,
    answer: undefined,
    severityDegree: undefined,
    userComment: '',
    type: 'general',
    recomendations: `O sistema deve disponibilizar a Política de Privacidade e/ou Termos de Consentimento para o titular dos dados, sobre as finalidades de tratamento.`,
  },
  {
    code: 'T-04',
    itemDesc:
      'As finalidades de tratamento de dados foram definidas na organização?',
    mandatory: true,
    answer: undefined,
    severityDegree: undefined,
    userComment: '',
    type: 'general',
    recomendations:
      'Crie um documento definindo uma Política de Privacidade e os Termos de Consentimento, descrevendo quais são os objetivos de tratamento de dados e de que forma os dados serão utilizados.',
  },
  {
    code: 'T-05',
    itemDesc:
      'O sistema informa para o titular a forma e duração do tratamento dos seus dados pessoais de maneira gratuita e acessível?',
    mandatory: true,
    answer: undefined,
    severityDegree: undefined,
    userComment: '',
    type: 'general',
    recomendations:
      'Descreva no documento da Política de Privacidade e no Termo de Consentimento, sobre a forma que se realizará o tratamento de dados e qual a sua duração, disponibilizando essas informações sempre para o titular.',
  },
  {
    code: 'T-06',
    itemDesc:
      'O sistema permite o titular consultar sobre a integralidade dos seus dados pessoais de maneira gratuita e acessível?',
    mandatory: true,
    answer: undefined,
    severityDegree: undefined,
    userComment: '',
    type: 'general',
    recomendations:
      'Crie um canal de comunicação entre o titular e a empresa para facilitar que o titular possa requisitar a integralidade dos seus dados pessoais, sempre de forma gratuita e sem lentidão da operação. Exemplo: Disponibilizar e-mail, telefone, ou criar uma página exclusiva para a comunicação.',
  },
  {
    code: 'C-01',
    itemDesc:
      'O sistema permite que o titular forneça o seu consentimento de forma autônoma e clara, para realizar o tratamento de seus dados?',
    mandatory: true,
    answer: undefined,
    severityDegree: undefined,
    userComment: '',
    type: 'general',
    recomendations:
      'No Termo de Consentimento, recomenda-se usar uma linguagem clara e objetiva, sem propaganda enganosa, evitando caixas pré-marcadas, e também possuir uma opção para que o titular possa negar ou retirar o seu consentimento sem ter nenhum prejuízo.',
  },
  {
    code: 'C-02',
    itemDesc:
      'O sistema solicita o consentimento específico do titular de dados para comunicar ou compartilhar os dados pessoais com outros controladores?',
    mandatory: true,
    answer: undefined,
    severityDegree: undefined,
    userComment: '',
    type: 'general',
    recomendations:
      'É obrigatório ser transparente para o titular sobre a finalidade de tratamento dos seus dados. Principalmente quando for compartilhar os dados com outros controladores, o titular deverá ser informado no consentimento de forma clara.',
  },
  {
    code: 'C-03',
    itemDesc:
      'O sistema armazena o consentimento dado pelo titular para comprovações legais?',
    mandatory: true,
    answer: undefined,
    severityDegree: undefined,
    userComment: '',
    type: 'general',
    recomendations:
      'Armazenar no banco de dados os registros de consentimento do titular para comprovação.',
  },
  {
    code: 'S-01',
    itemDesc:
      'O sistema utiliza boas práticas de proteção de privacidade, como privacy by design?',
    mandatory: false,
    answer: undefined,
    severityDegree: undefined,
    userComment: '',
    type: 'general',
    recomendations:
      'Como boa prática para o desenvolvimento e adequação do sistema, implementar a metodologia privacy by design.',
  },
  {
    code: 'S-02',
    itemDesc:
      'O sistema realiza o mapeamento dos dados pessoais e mantém em segurança?',
    mandatory: false,
    answer: undefined,
    severityDegree: undefined,
    userComment: '',
    type: 'general',
    recomendations:
      'Organizar os locais onde os dados são coletados e armazenados.',
  },
  {
    code: 'S-03',
    itemDesc:
      'O sistema fornece a confidencialidade, usando medidas técnicas apropriadas?',
    mandatory: false,
    answer: undefined,
    severityDegree: undefined,
    userComment: '',
    type: 'general',
    recomendations:
      'Realizar a proteção contra acesso não autorizado, no uso de dados pessoais armazenados ou em transição, como exemplos realizar a autenticação e controle de acesso.',
  },
  {
    code: 'R-01',
    itemDesc:
      'A organização registra as atividades realizadas pelo DPO, para possíveis comprovações legais?',
    mandatory: false,
    answer: undefined,
    severityDegree: undefined,
    userComment: '',
    type: 'general',
    recomendations:
      'Armazene e documente o histórico de atividades do encarregado DPO.',
  },
  {
    code: 'R-02',
    itemDesc:
      'A organização realiza capacitação para seus funcionários sobre a aderência à LGPD?',
    mandatory: false,
    answer: undefined,
    severityDegree: undefined,
    userComment: '',
    type: 'general',
    recomendations:
      'Capacite os funcionários e colaboradores sobre as informações que a LGPD determina. Exemplo: Através de treinamentos, cursos e palestras, certificações e etc.',
  },
  {
    code: 'R-03',
    itemDesc:
      'São realizadas capacitações para os funcionários que utilizam os dispositivos?',
    mandatory: false,
    answer: undefined,
    severityDegree: undefined,
    userComment: '',
    type: 'IoT',
    recomendations:
      'Realizar capacitações com os funcionários para garantir a qualidade e eficiência de todo o processo.',
  },
]

export { initialItems }
