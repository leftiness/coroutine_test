const p = require('bluebird')

const CheckAll = require('../event/CheckAll.js')
const CheckDone = require('../event/CheckDone.js')
const CheckNotDone = require('../event/CheckNotDone.js')
const ReportCount = require('../event/ReportCount.js')

/**
 * Update some status by counting up until you should stop
 */
class Counter {
  constructor (dispatcher, id, countTo, countEvery) {
    this.dispatch = dispatcher.send.bind(dispatcher)
    this.id = id
    this.countTo = countTo
    this.countEvery = countEvery
    this.count = 0
  }

  /**
   * Return whether the counter is finished
   */
  done () {
    return this.count >= this.countTo
  }

  /**
   * Decide if the status update should be sent
   */
  predicate (event) {
    switch (event.name) {
      case CheckDone.NAME():
        return this.done()
      case CheckNotDone.NAME():
        return !this.done()
      case CheckAll.NAME():
        return true
    }
  }

  /**
   * Send a status update when requested
   */
  async send (event) {
    const update = new ReportCount(
      event.data.request_id,
      this.id,
      this.count,
      this.countTo
    )

    this.dispatch(update)
  }

  /**
   * Increment the count
   */
  async tick () {
    await p.delay(this.countEvery)
    this.count += 1
  }

  /**
   * Count until you should stop
   */
  *wait () {
    while (this.count < this.countTo)
      yield this.tick()
  }
}

module.exports = Counter
