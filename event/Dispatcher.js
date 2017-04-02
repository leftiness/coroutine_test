const p = require('bluebird')
const uuid = require('uuid')

/**
 * Keep track of listeners. Send them messages when you receive messages.
 */
class Dispatcher {
  constructor () {
    this.listeners = new Map()
  }

  /**
   * Register a listener
   */
  register (listener) {
    let id = uuid.v4()

    while (this.listeners.has(id))
      id = uuid.v4()

    this.listeners.set(id, listener)

    return id
  }

  /**
   * Unregister a listener
   */
  unregister (listener_id) {
    this.listeners.delete(listener_id)
  }

  /**
   * Send a message to all listeners who want to receive it
   */
  async send (event) {
    const promises = []

    for (const listener of this.listeners.values())
      if (listener.predicate(event))
        promises.push(listener.send(event))

    return p.all(promises)
  }
}

module.exports = Dispatcher
