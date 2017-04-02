const SimpleEvent = require('./SimpleEvent.js')

const NAME = 'CHECK_DONE'

/**
 * Ask about the status of finished counters
 */
class CheckDone extends SimpleEvent {
  constructor (request_id) {
    super(NAME, { request_id })
  }
  static NAME () {
    return NAME
  }
}

module.exports = CheckDone
