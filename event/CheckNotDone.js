const SimpleEvent = require('./SimpleEvent.js')

const NAME = 'CHECK_NOT_DONE'

/**
 * Ask about the status of counters that aren't done yet
 */
class CheckNotDone extends SimpleEvent {
  constructor (request_id) {
    super(NAME, { request_id })
  }
  static NAME () {
    return NAME
  }
}

module.exports = CheckNotDone
