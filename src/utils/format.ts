const convertToBrazilDateTime = (dateTimeString: Date) => {
  const date = new Date(dateTimeString)
  const options = {
    timeZone: 'America/Sao_Paulo',
  }
  return date.toLocaleString('pt-BR', options)
}

export { convertToBrazilDateTime }
