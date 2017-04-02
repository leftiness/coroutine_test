/**
 * Collect events to be retrieved later
 */
class AbstractCollector {
  constructor () {
    this.events = []
  }

  /**
   * Decide whether to keep the event
   */
  predicate (event) {
    throw new Error('not implemented')
  }

  /**
   * Store events matching the predicate
   */
  async send (event) {
    if (this.predicate(event))
      this.events.push(event)
  }
}

module.exports = AbstractCollector
