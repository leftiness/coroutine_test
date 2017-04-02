const SimpleEvent = require('./SimpleEvent.js')

const NAME = 'REPORT_COUNT'

/**
 * Broadcast the counter status to anyone interested
 */
class ReportCount extends SimpleEvent {
  constructor (request_id, counter_id, count, countTo) {
    super(NAME, { request_id, counter_id, count, countTo })
  }
  static NAME () {
    return NAME
  }
}

module.exports = ReportCount
