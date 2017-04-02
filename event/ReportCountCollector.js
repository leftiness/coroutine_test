const AbstractCollector = require('./AbstractCollector.js')
const ReportCount = require('../event/ReportCount.js')

/**
* Keep ReportCount events with the proper request_id
*/
class ReportCountCollector extends AbstractCollector {
  constructor (request_id) {
    super()
    this.request_id = request_id
  }

  /**
   * Check event name and request_id
   */
  predicate ({ name, data }) {
    return name === ReportCount.NAME() && data.request_id === this.request_id
  }
}

module.exports = ReportCountCollector
