const SimpleEvent = require('./SimpleEvent.js')

const NAME = 'CHECK_ALL'

/**
 * Ask about the status of counters
 */
class CheckAll extends SimpleEvent {
  constructor (request_id) {
    super(NAME, { request_id })
  }
  static NAME () {
    return NAME
  }
}

module.exports = CheckAll
