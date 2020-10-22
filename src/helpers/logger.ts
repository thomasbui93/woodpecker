import pino from 'pino'

const logger = pino().child({
  root: 'bison'
})

export default logger
