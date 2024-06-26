import { ChecklistItemType } from '../../@types'

const initialItems: ChecklistItemType[] = [
  {
    code: 'T-01',
    itemDesc:
      'As finalidades de tratamento de dados foram definidas na organização?',
    recomendations:
      'Crie um documento definindo uma Política de Privacidade e os Termos de Consentimento, descrevendo quais são os objetivos de tratamento de dados e de que forma os dados serão utilizados.',
    mandatory: true,
    answer: undefined,
    severityDegree: undefined,
    userComment: '',
    type: 'general',
  },
  {
    code: 'T-02',
    itemDesc:
      'O tratamento de dados pessoais é realizado de acordo com uma base legal?',
    recomendations:
      'Na documentação da Política de Privacidade e dos Termos de Consentimento, explique a base legal em que fundamenta o tratamento de dados pessoais. \nExemplos de base legais: I - Mediante o fornecimento de consentimento pelo titular; II - Para o cumprimento de obrigação legal ou regulatória pelo controlador. Ver completo na lei, disponível: Capítulo 2, Seção 1, artigo 7.',
    mandatory: true,
    answer: undefined,
    severityDegree: undefined,
    userComment: '',
    type: 'general',
  },
  {
    code: 'T-03',
    itemDesc:
      'O sistema informa ao titular sobre as finalidades de tratamento de dados pessoais?',
    recomendations:
      'O sistema deve disponibilizar a Política de Privacidade e/ou Termos de Consentimento para o titular dos dados, sobre as finalidades de tratamento. ',
    mandatory: true,
    answer: undefined,
    severityDegree: undefined,
    userComment: '',
    type: 'general',
  },
  {
    code: 'T-04',
    itemDesc:
      'O sistema realiza o tratamento de dados em conformidade com a finalidade apresentada ao titular?',
    recomendations:
      'Revisar o consentimento e implementar as alterações que não estão de acordo com o que foi informado ao titular. ',
    mandatory: true,
    answer: undefined,
    severityDegree: undefined,
    userComment: '',
    type: 'general',
  },
  {
    code: 'T-05',
    itemDesc:
      'O sistema informa para o titular a forma e duração do tratamento dos seus dados pessoais de maneira gratuita e acessível?',
    recomendations:
      'Descreva no documento da Política de Privacidade e no Termo de Consentimento, sobre a forma que se realizará o tratamento de dados e qual a sua duração, disponibilizando essas informações sempre para o titular. ',
    mandatory: true,
    answer: undefined,
    severityDegree: undefined,
    userComment: '',
    type: 'general',
  },
  {
    code: 'T-06',
    itemDesc:
      'O sistema permite o titular consultar sobre a integralidade dos seus dados pessoais de maneira gratuita e acessível?',
    recomendations:
      'Crie um canal de comunicação entre o titular e a empresa para facilitar que o titular possa requisitar a integralidade dos seus dados pessoais, sempre de forma gratuita e sem lentidão da operação. Exemplo: Disponibilizar e-mail, telefone, ou criar uma página exclusiva para a comunicação.',
    mandatory: true,
    answer: undefined,
    severityDegree: undefined,
    userComment: '',
    type: 'general',
  },
  {
    code: 'T-07',
    itemDesc:
      'O sistema armazena com exatidão e clareza os dados pessoais coletados dos titulares?',
    recomendations:
      'Durante a coleta, garanta que os dados pessoais estão sendo informados corretamente. EX: Usar uma validação de campos nos formulários (CPF, Cep).',
    mandatory: true,
    answer: undefined,
    severityDegree: undefined,
    userComment: '',
    type: 'general',
  },
  {
    code: 'T-08',
    itemDesc:
      'O sistema mantém atualizados os dados pessoais, conforme necessário e para o cumprimento da finalidade de seu tratamento?',
    recomendations:
      'Crie um processo para mapear e revisar os dados pessoais no banco de dados, e se descobrir que os dados pessoais estão incorretos, é necessário corrigir ou apagar o mais rápido possível. E sempre que necessário, pedir ao titular que atualize seus dados para cumprimento da finalidade de tratamento.',
    mandatory: true,
    answer: undefined,
    severityDegree: undefined,
    userComment: '',
    type: 'general',
  },
  {
    code: 'T-09',
    itemDesc:
      'O sistema disponibiliza para o titular as informações sobre a realização do tratamento de dados e a identidade do controlador?',
    recomendations:
      'Disponibilizar para o titular na Política de Privacidade e no Termo de Consentimento, informações claras e precisas sobre: a) Finalidades de Processamento; b) A identidade e contato do controlador; c) Os dados envolvidos; d) A base legal; e) Detalhes de transferências de dados fora do brasil; f) Período de retenção de dados; g) Os direitos do titular.',
    mandatory: true,
    answer: undefined,
    severityDegree: undefined,
    userComment: '',
    type: 'general',
  },
  {
    code: 'T-10',
    itemDesc:
      'A organização realiza o tratamento de dados quando baseado no seu legítimo interesse, de forma adequada com a lei?',
    recomendations:
      'A empresa realizará uma análise do legítimo interesse para verificar se a hipótese de tratamento pode se enquadrar na base legal. Essa análise deve demonstrar que: a) Há um interesse legítimo válido; b) O processamento de dados é estritamente necessário na busca do interesse legítimo; e c) O processamento não é prejudicial ou anulado pelos direitos do indivíduo.',
    mandatory: true,
    answer: undefined,
    severityDegree: undefined,
    userComment: '',
    type: 'general',
  },
  {
    code: 'T-11',
    itemDesc:
      'O sistema mantém registros das operações de tratamento de dados, especialmente quando baseado em seu legítimo interesse?',
    recomendations:
      'Armazenar no banco de dados informações sobre as operações de tratamento dos dados, para possíveis comprovações legais.',
    mandatory: true,
    answer: undefined,
    severityDegree: undefined,
    userComment: '',
    type: 'general',
  },
  {
    code: 'T-12',
    itemDesc:
      'O sistema informa para o titular e autoridades competentes sobre informações de tratamento de dados, principalmente quando baseado em seu legítimo interesse?',
    recomendations:
      'Elaborar relatórios das operações de tratamento de dados, principalmente quando baseado no seu legítimo interesse, e disponibilizar quando requisitado para o titular e para as autoridades competentes, como a ANPD.',
    mandatory: true,
    answer: undefined,
    severityDegree: undefined,
    userComment: '',
    type: 'general',
  },
  {
    code: 'T-13',
    itemDesc:
      'O sistema realiza o tratamento de dados pessoais ou dados sensíveis, de forma que não possam ser conectados a um titular de dados, quando for requisitado?',
    recomendations:
      'Analisar quais dados pessoais deverão ser anonimizados, ou em outros casos, realizar uma pseudonimização. Exemplo: Uma versão semelhante aos dados originais, mas sem revelar a verdadeira informação do titular.',
    mandatory: true,
    answer: undefined,
    severityDegree: undefined,
    userComment: '',
    type: 'general',
  },
  {
    code: 'T-14',
    itemDesc:
      'O sistema informa ao titular de dados sobre a existência de tratamento dos seus dados, antes da coleta?',
    recomendations:
      'Disponibilizar ao titular, sempre em destaque e com avisos, sobre os dados pessoais que serão coletados e solicitar o consentimento do titular.',
    mandatory: true,
    answer: undefined,
    severityDegree: undefined,
    userComment: '',
    type: 'general',
  },
  {
    code: 'C-01',
    itemDesc:
      'O sistema permite que o titular forneça o seu consentimento de forma autônoma e clara, para realizar o tratamento de seus dados?',
    recomendations:
      'No Termo de Consentimento, recomenda-se usar uma linguagem clara e objetiva, sem propaganda enganosa, evitando caixas pré-marcadas, e também possuir uma opção para que o titular possa negar ou retirar o seu consentimento sem ter nenhum prejuízo.',
    mandatory: true,
    answer: undefined,
    severityDegree: undefined,
    userComment: '',
    type: 'general',
  },
  {
    code: 'C-02',
    itemDesc:
      'O sistema solicita o consentimento específico do titular de dados para comunicar ou compartilhar os dados pessoais com outros controladores?',
    recomendations:
      'É obrigatório ser transparente para o titular sobre a finalidade de tratamento dos seus dados. Principalmente quando for compartilhar os dados com outros controladores, o titular deverá ser informado no consentimento de forma clara.',
    mandatory: true,
    answer: undefined,
    severityDegree: undefined,
    userComment: '',
    type: 'general',
  },
  {
    code: 'C-03',
    itemDesc:
      'O sistema armazena o consentimento dado pelo titular para comprovações legais?',
    recomendations:
      'Armazenar no banco de dados os registros de consentimento do titular para comprovação.',
    mandatory: true,
    answer: undefined,
    severityDegree: undefined,
    userComment: '',
    type: 'general',
  },
  {
    code: 'C-04',
    itemDesc:
      'O sistema permite ao titular de dados meios para recusar ou retirar o consentimento sem prejuízo ao titular?',
    recomendations:
      'O titular deve ter acesso ao seu termo de consentimento ou contrato com a opção de negar a realização do tratamento de dados.',
    mandatory: true,
    answer: undefined,
    severityDegree: undefined,
    userComment: '',
    type: 'general',
  },
  {
    code: 'C-05',
    itemDesc:
      'O sistema realiza o tratamento de dados pessoais de crianças e adolescentes somente com consentimento específico pelos pais ou responsável legal, de uma forma acessível e fácil de entender?',
    recomendations:
      'Deve certificar que apenas o responsável legítimo poderá dar o consentimento, e somente ele poderá atualizá-lo. Um exemplo é realizar autenticação do titular.',
    mandatory: true,
    answer: undefined,
    severityDegree: undefined,
    userComment: '',
    type: 'general',
  },
  {
    code: 'C-06',
    itemDesc:
      'O sistema informa o titular sobre as mudanças de finalidade e atualização de consentimentos, podendo o titular revogar o consentimento caso discorde das alterações?',
    recomendations:
      'Sempre que for alterar a finalidade de tratamento, deverá informar o titular da mudança e solicitar o novo consentimento para realizar o tratamento de dados, com a opção de negar o tratamento caso o titular discorde da alteração.',
    mandatory: true,
    answer: undefined,
    severityDegree: undefined,
    userComment: '',
    type: 'general',
  },
  {
    code: 'C-07',
    itemDesc:
      'O sistema fornece uma declaração de consentimento de forma inteligível e facilmente acessível, não contendo termos abusivos?',
    recomendations:
      'O Termo de Consentimento deve ser bem escrito, com linguagem de fácil compreensão, respeitando os direitos do titular.',
    mandatory: true,
    answer: undefined,
    severityDegree: undefined,
    userComment: '',
    type: 'general',
  },
  {
    code: 'C-08',
    itemDesc:
      'O sistema informa o titular de dados sobre todos os seus direitos no consentimento?',
    recomendations:
      'Informar no Termo de Consentimento e na Política de Privacidade, os direitos que os titulares de dados possuem.',
    mandatory: true,
    answer: undefined,
    severityDegree: undefined,
    userComment: '',
    type: 'general',
  },
  {
    code: 'D-01',
    itemDesc:
      'O sistema armazena os dados pessoais em formato que facilite o titular de dados acessá-los?',
    recomendations:
      'Para facilitar o acesso aos titulares, os dados pessoais devem ser armazenados em formato comumente usados por computador, em arquivos estruturados, para que os aplicativos de software possam facilmente identificar, reconhecer e extrair os dados pessoais. alguns exemplos: CSV, XML e JSON.',
    mandatory: true,
    answer: undefined,
    severityDegree: undefined,
    userComment: '',
    type: 'general',
  },
  {
    code: 'D-02',
    itemDesc:
      'O sistema fornece ao titular de dados, meios para registrar reclamações em relação à proteção e ao tratamento de seus dados pessoais?',
    recomendations:
      'Disponibilizar o contato de DPO ou responsável pelo tratamento de dados, na política de privacidade ou uma página exclusiva para reclamações.',
    mandatory: true,
    answer: undefined,
    severityDegree: undefined,
    userComment: '',
    type: 'general',
  },
  {
    code: 'D-03',
    itemDesc:
      'O sistema fornece a cópia eletrônica integral dos dados pessoais para o titular?',
    recomendations:
      'Transmitir diretamente os dados solicitados ao titular; ou_x000D_ fornecer acesso a uma ferramenta que permite que o próprio titular extraia os dados solicitados.',
    mandatory: true,
    answer: undefined,
    severityDegree: undefined,
    userComment: '',
    type: 'general',
  },
  {
    code: 'D-04',
    itemDesc: 'O sistema permite que o titular atualize seus dados pessoais?',
    recomendations:
      'De acordo com a finalidade de tratamento, é necessário solicitar a atualização dos dados pessoais do titular. É recomendado criar um mecanismo para que o próprio titular possa atualizar seus dados pessoais.',
    mandatory: true,
    answer: undefined,
    severityDegree: undefined,
    userComment: '',
    type: 'general',
  },
  {
    code: 'D-05',
    itemDesc:
      'O sistema utiliza apenas dados relevantes e adequados à finalidade?',
    recomendations:
      'É necessário realizar a minimização dos dados pessoais, utilizando apenas dados relevantes para o tratamento. É recomendado realizar a anonimização de dados desnecessários, realizar bloqueio ou eliminação dos dados pessoais irrelevantes.',
    mandatory: true,
    answer: undefined,
    severityDegree: undefined,
    userComment: '',
    type: 'general',
  },
  {
    code: 'D-06',
    itemDesc:
      'O sistema permite a portabilidade de dados a outro controlador mediante requisição do titular?',
    recomendations:
      'Os dados pessoais devem ser armazenados em formato acessível e legível por máquina, para poder exportar os dados do titular quando ele requisitar.',
    mandatory: true,
    answer: undefined,
    severityDegree: undefined,
    userComment: '',
    type: 'general',
  },
  {
    code: 'D-07',
    itemDesc:
      'O sistema permite excluir os dados pessoais do titular, mediante a sua requisição?',
    recomendations:
      'Criar um mecanismo para que o titular possa solicitar a remoção dos seus dados pessoais.',
    mandatory: true,
    answer: undefined,
    severityDegree: undefined,
    userComment: '',
    type: 'general',
  },
  {
    code: 'D-08',
    itemDesc:
      'O sistema remove os dados pessoais do titular após o término de seu tratamento?',
    recomendations:
      'É necessário excluir os dados pessoais do titular após o cumprimento da finalidade, no prazo estabelecido.',
    mandatory: true,
    answer: undefined,
    severityDegree: undefined,
    userComment: '',
    type: 'general',
  },
  {
    code: 'D-09',
    itemDesc:
      'O sistema fornece informações sobre entidades públicas e privadas, caso tenha realizado compartilhamento de dados pessoais?',
    recomendations:
      'Armazenar as informações das entidades e das operações de tratamento realizadas, como o compartilhamento de dados, para comprovações legais e  disponibilizar quando requisitado.',
    mandatory: true,
    answer: undefined,
    severityDegree: undefined,
    userComment: '',
    type: 'general',
  },
  {
    code: 'D-10',
    itemDesc:
      'O sistema informa o titular sobre a possibilidade de não fornecer consentimento e sobre as consequências caso seja negada?',
    recomendations:
      'Deve fornecer no Termo de Consentimento a possibilidade de recusar o tratamento, e as consequências caso não queira consentir.',
    mandatory: true,
    answer: undefined,
    severityDegree: undefined,
    userComment: '',
    type: 'general',
  },
  {
    code: 'D-11',
    itemDesc:
      'O sistema informa o titular quando o tratamento de dados for uma condição para fornecimento de produto, serviço ou para o exercício de direito?',
    recomendations:
      'Deve ficar claro no momento do consentimento do titular os objetivos e pré-requisitos do tratamento de dados.',
    mandatory: true,
    answer: undefined,
    severityDegree: undefined,
    userComment: '',
    type: 'general',
  },
  {
    code: 'D-12',
    itemDesc:
      'O sistema permite aos titulares, o direito de se opor a um tratamento de dados de forma fácil?',
    recomendations:
      'É necessário fornecer um mecanismo para que o titular consiga retirar seu consentimento. Caso o consentimento seja retirado, os dados do titular não poderão ser mais processados.',
    mandatory: true,
    answer: undefined,
    severityDegree: undefined,
    userComment: '',
    type: 'general',
  },
  {
    code: 'D-13',
    itemDesc:
      'O sistema informa ao titular, as razões do não exercício imediato dos direitos do titular?',
    recomendations:
      'Quando não for possível realizar imediatamente uma operação requisitada, é necessário enviar uma resposta ao titular em que poderá em alguns casos: I - comunicar que a empresa não é agente de tratamento dos dados e indicar, sempre que possível, o agente responsável; ou II - indicar as razões de fato ou de direito que impedem a adoção imediata da operação.',
    mandatory: true,
    answer: undefined,
    severityDegree: undefined,
    userComment: '',
    type: 'general',
  },
  {
    code: 'D-14',
    itemDesc:
      'O sistema informa ao titular quando uma decisão foi tomada com base no tratamento automatizado, incluídas as decisões destinadas à criação do seu perfil pessoal?',
    recomendations:
      'Disponibilizar para o titular as informações das decisões automatizadas que serão realizadas. Caso seja requisitado, fornecer o registro dessas informações.',
    mandatory: true,
    answer: undefined,
    severityDegree: undefined,
    userComment: '',
    type: 'general',
  },
  {
    code: 'D-15',
    itemDesc:
      'O sistema fornece a opção do titular contestar ou solicitar revisão da decisão automatizada?',
    recomendations:
      'Caso seja requisitado,  deverá revisar a decisão automatizada contestada, podendo interromper o tratamento de dados e realiazar um novo consentimento para essa finalidade.',
    mandatory: true,
    answer: undefined,
    severityDegree: undefined,
    userComment: '',
    type: 'general',
  },
  {
    code: 'S-01',
    itemDesc:
      'O sistema realiza o tratamento de dados de uma forma segura, incluindo proteção contra acesso não autorizado?',
    recomendations:
      'Garantir a segurança no tratamento dos dados pessoais, possibilitando apenas indivíduos autorizados possam ler, modificar ou excluir dados do sistema. Exemplo recomendado seria criar uma lista de controle de acesso.',
    mandatory: true,
    answer: undefined,
    severityDegree: undefined,
    userComment: '',
    type: 'general',
  },
  {
    code: 'S-02',
    itemDesc:
      'O sistema respeita as normas de transferência de dados pessoais para países internacionais, com grau de proteção de dados pessoais adequado às normas da LGPD?',
    recomendations:
      'Verifique se o país destino da transferência tenha um nível de proteção igual ou superior aos previstos na LGPD, e/ou que a empresa destinatária comprove possuir as mesmas garantias de proteção por meio de normas ou certificados. Verifique também se a Autoridade Nacional do Brasil ANPD autoriza tais operações.',
    mandatory: true,
    answer: undefined,
    severityDegree: undefined,
    userComment: '',
    type: 'general',
  },
  {
    code: 'S-03',
    itemDesc:
      'O sistema informa para o titular sobre as informações das transferências dos dados pessoais realizadas para países internacionais?',
    recomendations:
      'Informar no documento da Política de Privacidade e no Termo de Consentimento, informações sobre a realização de transferências de dados para países internacionais.',
    mandatory: true,
    answer: undefined,
    severityDegree: undefined,
    userComment: '',
    type: 'general',
  },
  {
    code: 'S-04',
    itemDesc:
      'O sistema utiliza mecanismos para prevenir a ocorrência de danos, destruição ou perda de dados?',
    recomendations:
      'É necessário criar mecanismo para prevenir a perda e danos aos dados pessoais do titular. Como boas práticas, deve-se implementar um backup de dados,  armazenamento em nuvem, e qualquer outras ações que protegerão as informações originais em caso de danos, destruição ou perda de dados.',
    mandatory: true,
    answer: undefined,
    severityDegree: undefined,
    userComment: '',
    type: 'general',
  },
  {
    code: 'S-05',
    itemDesc:
      'O sistema utiliza medidas de proteção adequadas para dados pessoais sensíveis?',
    recomendations:
      'É necessário implementar uma camada adicional à segurança e armazenamento, especialmente aos dados pessoais sensíveis. Como exemplos, em alguns casos, usar encriptação dos dados, o controle de acesso, entre outras técnicas recomendadas.',
    mandatory: true,
    answer: undefined,
    severityDegree: undefined,
    userComment: '',
    type: 'general',
  },
  {
    code: 'R-01',
    itemDesc:
      'A organização indica um oficial de proteção de dados (DPO) encarregado pelo tratamento de dados pessoais?',
    recomendations:
      'A organização deverá indicar um encarregado pelo tratamento de dados pessoais (DPO), podendo ser pessoa física ou pessoa jurídica, para atuar como canal de comunicação entre o controlador, os titulares dos dados e a Autoridade Nacional (ANPD). A ANPD poderá estabelecer normas complementares sobre as atividades do DPO, inclusive a dispensa de sua indicação, conforme a natureza da organização.',
    mandatory: true,
    answer: undefined,
    severityDegree: undefined,
    userComment: '',
    type: 'general',
  },
  {
    code: 'R-02',
    itemDesc:
      'A organização divulga publicamente de forma clara e objetiva a identidade e as informações de contato do encarregado DPO?',
    recomendations:
      'A informação deve estar de forma clara, na Política de Privacidade e no Termo de Consentimento, para que os titulares e a autoridade nacional possam ter acesso facilitado.',
    mandatory: true,
    answer: undefined,
    severityDegree: undefined,
    userComment: '',
    type: 'general',
  },
  {
    code: 'R-03',
    itemDesc:
      'A organização comunica à autoridade nacional e ao titular dos dados a ocorrência de incidente de segurança, que possa acarretar risco ou dano relevante aos titulares, nos prazos estabelecidos pelas autoridades?',
    recomendations:
      'Na ocorrência de incidente de segurança, é necessário comunicar ao titular e autoridade nacional ANPD. O prazo recomendado para comunicação pela ANPD é de 2 dias úteis contados da ciência do incidente (mesmo que ainda não esteja confirmado e sob apuração) uma comunicação preliminar deverá ser enviada, sob pena de haver violação à LGPD._x000D_ O conteúdo da comunicação deve abranger, minimamente, o que está previsto no §1º do art. 48, da LGPD, e/ou no formulário disponível em (https://www.gov.br/anpd/pt-br/assuntos/incidente-de-seguranca)',
    mandatory: true,
    answer: undefined,
    severityDegree: undefined,
    userComment: '',
    type: 'general',
  },
  {
    code: 'R-04',
    itemDesc:
      'A organização realiza avaliação de impacto à proteção de dados pessoais, quando o tratamento resulta em um alto risco para os direitos e liberdades dos titulares dos dados?',
    recomendations:
      'A organização deve realizar uma avaliação de impacto de proteção de dados, quando existir um elevado risco no tratamento de dados. Certificar que a avaliação é sempre revisada, especialmente se o grau de risco de tratamento de dados for alto.',
    mandatory: true,
    answer: undefined,
    severityDegree: undefined,
    userComment: '',
    type: 'general',
  },
  {
    code: 'R-05',
    itemDesc:
      'A organização realiza relatório de impactos à proteção de dados pessoais e disponibiliza a autoridade nacional, quando solicitado?  ',
    recomendations:
      'É necessário realizar um relatório de impactos à proteção de dados e disponibilizar-lo quando requisitado. O relatório deverá conter, no mínimo, a descrição dos tipos de dados coletados, a metodologia utilizada para a coleta e para a garantia da segurança das informações e a análise do controlador com relação a medidas, salvaguardas e mecanismos de mitigação de risco adotados.',
    mandatory: true,
    answer: undefined,
    severityDegree: undefined,
    userComment: '',
    type: 'general',
  },
  {
    code: 'S-01',
    itemDesc:
      'O sistema utiliza boas práticas de proteção de privacidade, como privacy by design?',
    recomendations:
      'Como boa prática para o desenvolvimento e adequação do sistema, implementar a metodologia privacy by design.',
    mandatory: false,
    answer: undefined,
    severityDegree: undefined,
    userComment: '',
    type: 'general',
  },
  {
    code: 'S-02',
    itemDesc:
      'O sistema realiza o mapeamento dos dados pessoais e mantém em segurança?',
    recomendations:
      'Organizar os locais onde os dados são coletados e armazenados.',
    mandatory: false,
    answer: undefined,
    severityDegree: undefined,
    userComment: '',
    type: 'general',
  },
  {
    code: 'S-03',
    itemDesc:
      'O sistema fornece a confidencialidade, usando medidas técnicas apropriadas?',
    recomendations:
      'Realizar a proteção contra acesso não autorizado, no uso de dados pessoais armazenados ou em transição, como exemplos realizar a autenticação e controle de acesso.',
    mandatory: false,
    answer: undefined,
    severityDegree: undefined,
    userComment: '',
    type: 'general',
  },
  {
    code: 'S-04',
    itemDesc:
      'O sistema fornece a integridade dos dados pessoais, impedindo modificações?',
    recomendations:
      'Verificar a integridade dos dados durante a coleta e no tratamento dos dados pessoais.',
    mandatory: false,
    answer: undefined,
    severityDegree: undefined,
    userComment: '',
    type: 'general',
  },
  {
    code: 'S-05',
    itemDesc:
      'O sistema mantém registros de auditorias de conformidades e disponibiliza informação ao titular de dados, caso requisitado?',
    recomendations:
      'Uma solução seria documentar os dados das auditorias realizadas para fornecer ao titular.',
    mandatory: false,
    answer: undefined,
    severityDegree: undefined,
    userComment: '',
    type: 'general',
  },
  {
    code: 'S-06',
    itemDesc:
      'A organização possui um plano de correção a incidentes de privacidade e segurança?',
    recomendations:
      'A organização deve documentar um plano para correção de falhas ou incidentes de segurança.',
    mandatory: false,
    answer: undefined,
    severityDegree: undefined,
    userComment: '',
    type: 'general',
  },
  {
    code: 'S-07',
    itemDesc:
      'O sistema possui certificação ou selos,  para comprovar a observância e o cumprimento das normas de proteção de dados pessoais?',
    recomendations:
      'É recomendável que os sistemas tenha uma certificação, que comprovem que seguem um código de conduta ou política de segurança confiável para aderência da lei de proteção de dados. Alguns exemplos: ISO 27001, ISO 27701.',
    mandatory: false,
    answer: undefined,
    severityDegree: undefined,
    userComment: '',
    type: 'general',
  },
  {
    code: 'S-08',
    itemDesc:
      'O dispositivo possui certificação para comprovar os padrões de qualidade?',
    recomendations:
      'Ao utilizar certificações, é comprovado que o dispositivo possui níveis de qualidade e segurança que são determinadas pela regulamentação.\nÉ de grande importância possuir uma certificação, como por exemplo: Certificação Anatel.',
    mandatory: false,
    answer: undefined,
    severityDegree: undefined,
    userComment: '',
    type: 'IoT',
  },
  {
    code: 'S-09',
    itemDesc:
      "O dispositivo é seguro contra ataques de 'força bruta' e/ou outras tentativas abusivas de login?",
    recomendations:
      'Um ataque de força bruta é uma maneira de conseguir acesso privilegiado através de inúmeras tentativas. _x000D_\nUma solução é criar mecanismo para bloquear os utilizadores após várias tentativas inválidas de acesso',
    mandatory: false,
    answer: undefined,
    severityDegree: undefined,
    userComment: '',
    type: 'IoT',
  },
  {
    code: 'S-10',
    itemDesc:
      'O dispositivo possui mecanismos contra ataques conhecidos atualmente, como buffer overflow, DDoS, entre outros?',
    recomendations:
      'Realizar uma bateria de testes de ataques mais conhecidos atualmente como forma de prevenção.',
    mandatory: false,
    answer: undefined,
    severityDegree: undefined,
    userComment: '',
    type: 'IoT',
  },
  {
    code: 'S-11',
    itemDesc:
      'Os dispositivos utilizam técnicas de proteção para realizar uma comunicação segura?',
    recomendations:
      'Ao compartilhar os dados entre os dispositivos, é necessário que técnicas de proteção sejam implementadas.',
    mandatory: false,
    answer: undefined,
    severityDegree: undefined,
    userComment: '',
    type: 'IoT',
  },
  {
    code: 'S-12',
    itemDesc: 'As senhas ficam encriptadas na base de dados do dispositivo?',
    recomendations:
      'As senhas que ficam salvas na base de dados do dispositivo, se elas estiverem encriptografadas, se tornam mais seguras, se alguém tiver acesso ao dispositivo, não conseguirá visualizar a senha facilmente.',
    mandatory: false,
    answer: undefined,
    severityDegree: undefined,
    userComment: '',
    type: 'IoT',
  },
  {
    code: 'S-13',
    itemDesc:
      'O dispositivo encaminha os dados devidamente para para o seu destino?',
    recomendations:
      'Realizar verificações para identificar se os dados estão sendo encaminhados apenas para seu devido destino.',
    mandatory: false,
    answer: undefined,
    severityDegree: undefined,
    userComment: '',
    type: 'IoT',
  },
  {
    code: 'S-14',
    itemDesc:
      'O dispositivo utiliza protocolos como SSL e TLS para criptografar as comunicações?',
    recomendations:
      'Os protocolos (Secure Socket Layer) e TLS (Transport Layer Security) servem para encriptar as comunicações, proporcionando a segurança na troca de dados e das informações.',
    mandatory: false,
    answer: undefined,
    severityDegree: undefined,
    userComment: '',
    type: 'IoT',
  },
  {
    code: 'S-15',
    itemDesc:
      'A organização cria mecanismos de segurança para os dispositivos com pouco processamento?',
    recomendations:
      'Em cenários que dispositivos não suportam protocolos como por exemplo, CoAP. Nesse caso será necessário a interação entre os equipamentos. Uma alternativa é a utilização de gateways, onde enviará as informações para um ponto na rede e realizará o tratamento e procedimentos que o dispositivo restrito não consegue.',
    mandatory: false,
    answer: undefined,
    severityDegree: undefined,
    userComment: '',
    type: 'IoT',
  },
  {
    code: 'S-16',
    itemDesc: 'O dispositivo recebe atualizações de segurança?',
    recomendations:
      'As atualizações de segurança corrigem falhas e o quanto mais rápido essas falhas forem corrigidas, diminui os riscos contra invasões.',
    mandatory: false,
    answer: undefined,
    severityDegree: undefined,
    userComment: '',
    type: 'IoT',
  },
  {
    code: 'S-17',
    itemDesc:
      'O dispositivo encripta os dados no armazenamento, para evitar a identificação dos dados pessoais?',
    recomendations:
      'Ao armazenar os dados pessoais utilizando criptografia, os dados ficarão mais protegidos. Se ocorrer uma violação, os dados não serão facilmente acessados.',
    mandatory: false,
    answer: undefined,
    severityDegree: undefined,
    userComment: '',
    type: 'IoT',
  },
  {
    code: 'S-18',
    itemDesc:
      'Existe um profissional de segurança fiscalizando atividades suspeitas ou incomuns e pronto para agir imediatamente?',
    recomendations:
      'Ter um profissional fiscalizando todo o processo diminuirá bastante as chances de um incidente de dados, visto que ele estará sempre a disposição para agir imediatamente.',
    mandatory: false,
    answer: undefined,
    severityDegree: undefined,
    userComment: '',
    type: 'IoT',
  },
  {
    code: 'S-19',
    itemDesc:
      'Os dispositivos são alocados em uma VLAN específica, separando-se de ambientes de usuário/visitantes?',
    recomendations:
      'Realizar o gerenciamento de toda a rede, separando o acesso a internet de usuários/visitantes com a rede de acesso dos dispositivos.',
    mandatory: false,
    answer: undefined,
    severityDegree: undefined,
    userComment: '',
    type: 'IoT',
  },
  {
    code: 'S-20',
    itemDesc:
      'Quando a senha do dispositivo é trocada, a organização recebe uma notificação?',
    recomendations:
      'É importante a notificação após mudanças de senhas, porque se alguém sem autorização conseguir realizar a mudança de senha, a organização poderá tomar medidas protetivas imediatamente.',
    mandatory: false,
    answer: undefined,
    severityDegree: undefined,
    userComment: '',
    type: 'IoT',
  },
  {
    code: 'S-21',
    itemDesc:
      'A organização recebe notificações em caso de acessos não autorizados ?',
    recomendations:
      'Criar mecanismos para notificações se ocorrer acessos indevidos, com o intuito de conseguir agir imediatamente em caso de invasões.',
    mandatory: false,
    answer: undefined,
    severityDegree: undefined,
    userComment: '',
    type: 'IoT',
  },
  {
    code: 'R-01',
    itemDesc:
      'A organização registra as atividades realizadas pelo DPO, para possíveis comprovações legais?',
    recomendations:
      'Armazene e documente o histórico de atividades do encarregado DPO.',
    mandatory: false,
    answer: undefined,
    severityDegree: undefined,
    userComment: '',
    type: 'general',
  },
  {
    code: 'R-02',
    itemDesc:
      'A organização realiza capacitação para seus funcionários sobre a aderência à LGPD?',
    recomendations:
      'Capacite os funcionários e colaboradores sobre as informações que a LGPD determina. Exemplo: Através de treinamentos, cursos e palestras, certificações e etc.',
    mandatory: false,
    answer: undefined,
    severityDegree: undefined,
    userComment: '',
    type: 'general',
  },
  {
    code: 'R-03',
    itemDesc:
      'São realizadas capacitações para os funcionários que utilizam os dispositivos?',
    recomendations:
      'Realizar capacitações com os funcionários para garantir a qualidade e eficiência de todo o processo.',
    mandatory: false,
    answer: undefined,
    severityDegree: undefined,
    userComment: '',
    type: 'IoT',
  },
  {
    code: 'A-01',
    itemDesc:
      'A organização fornece credenciais diferentes para cada utilizador?',
    recomendations:
      'Deve ser realizado o controle de acesso para cada utilizador, criando uma lista de pessoas autorizadas.',
    mandatory: false,
    answer: undefined,
    severityDegree: undefined,
    userComment: '',
    type: 'IoT',
  },
  {
    code: 'A-02',
    itemDesc:
      'São atribuídas senhas diferentes a cada dispositivo para fortalecer a segurança?',
    recomendations:
      'Ao utilizar a mesma senha para cada dispositivo, a segurança fica enfraquecida, o ideal é ter senhas diferentes. Uma solução é utilizar um algoritmo para gerar as senhas',
    mandatory: false,
    answer: undefined,
    severityDegree: undefined,
    userComment: '',
    type: 'IoT',
  },
  {
    code: 'A-03',
    itemDesc:
      'Houve mudança da senha padrão do dispositivo, para evitar acesso não autorizado?',
    recomendations:
      'É de suma importância a mudança imediata da senha padrão do dispositivo, a senha padrão já é disponibilizada no manual dos dispositivos que facilmente é encontrado no site do fabricante.',
    mandatory: false,
    answer: undefined,
    severityDegree: undefined,
    userComment: '',
    type: 'IoT',
  },
  {
    code: 'A-04',
    itemDesc: 'O dispositivo garante que a senha seja forte e segura?',
    recomendations:
      'Para o fornecimento de uma maior proteção a segurança, é fundamental senhas fortes, como por exemplo: Uso de letras maiúsculas, letras minúsculas, números e símbolos',
    mandatory: false,
    answer: undefined,
    severityDegree: undefined,
    userComment: '',
    type: 'IoT',
  },
  {
    code: 'A-05',
    itemDesc:
      'São registradas falhas ou possíveis suspeitas de vulnerabilidade?',
    recomendations:
      'Realizar registros de todas as falhas e suspeitas reais, possuir esta documentação pode ajudar na organização e prevenções.',
    mandatory: false,
    answer: undefined,
    severityDegree: undefined,
    userComment: '',
    type: 'IoT',
  },
  {
    code: 'SF-01',
    itemDesc:
      'O dispositivo possui apenas portas em funcionamento, não perminintdo portas desnecessarias? ',
    recomendations:
      'Todas as portas que não estão em uso, deverão ser desativadas. Exemplos de portas: rj45 e usb.',
    mandatory: false,
    answer: undefined,
    severityDegree: undefined,
    userComment: '',
    type: 'IoT',
  },
  {
    code: 'SF-02',
    itemDesc:
      'O dispositivo não possibilita o acesso facilmente de pessoas não autorizadas, evitando riscos à segurança física do mesmo?',
    recomendations:
      'Analisar o ambiente no qual o dispositivo se encontra, analisando possíveis riscos que o dispositivo poderá sofrer.',
    mandatory: false,
    answer: undefined,
    severityDegree: undefined,
    userComment: '',
    type: 'IoT',
  },
  {
    code: 'SF-03',
    itemDesc:
      'O dispositivo é protegido contra tentativas de ser resetado para configuração de fábrica por pessoas não autorizadas? ',
    recomendations:
      'Apenas pessoas autorizadas poderão ter acesso aos dispositivos e deve ter proibição de intrusos, não permitindo utilização do dispositivo. Se o reset de fábrica não estiver restrito, uma solução é a blindagem do equipamento vedando o seu acesso.',
    mandatory: false,
    answer: undefined,
    severityDegree: undefined,
    userComment: '',
    type: 'IoT',
  },
  {
    code: 'SF-04',
    itemDesc: 'O dispositivo é resistente para o ambiente que está alocado?',
    recomendations:
      'Realizar uma análise das condições ambientais, como temperatura e umidade, identificando se irá afetar negativamente o dispositivo que irá ser utilizado.',
    mandatory: false,
    answer: undefined,
    severityDegree: undefined,
    userComment: '',
    type: 'IoT',
  },
  {
    code: 'SF-05',
    itemDesc:
      'A manutenção do dispositivo  é realizada conforme recomendação do fornecedor?',
    recomendations:
      'O ideal é que as manutenções dos dispositivos sejam realizadas nos intervalos recomendados pelo fornecedor e de acordo com suas recomendações.',
    mandatory: false,
    answer: undefined,
    severityDegree: undefined,
    userComment: '',
    type: 'IoT',
  },
  {
    code: 'SF-06',
    itemDesc:
      'A manutenção e consertos dos dispositivos são realizados por uma equipe autorizada?',
    recomendations:
      'Para a confiabilidade desse procedimento, é de grande importância ser realizado por uma equipe autorizada.',
    mandatory: false,
    answer: undefined,
    severityDegree: undefined,
    userComment: '',
    type: 'IoT',
  },
  {
    code: 'SF-07',
    itemDesc: 'São registradas todas as manutenções preventivas?',
    recomendations:
      'A manutenção preventiva é a garantia do bom funcionamento do dispositivo e o registro se torna a comprovação e organização de quando realizou-se o procedimento.',
    mandatory: false,
    answer: undefined,
    severityDegree: undefined,
    userComment: '',
    type: 'IoT',
  },
]

export { initialItems }
