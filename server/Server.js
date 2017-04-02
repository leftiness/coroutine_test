const uuid = require('uuid')
const Koa = require('koa')
const { get } = require('koa-route')
const bodyparser = require('koa-bodyparser')

const CheckAll = require('../event/CheckAll.js')
const CheckDone = require('../event/CheckDone.js')
const CheckNotDone = require('../event/CheckNotDone.js')
const ReportCountCollector = require('../event/ReportCountCollector.js')

/**
 * Turn HTTP requests into dispatched events
 */
class Server {
  constructor(dispatcher) {
    this.dispatch = dispatcher.send.bind(dispatcher)
    this.register = dispatcher.register.bind(dispatcher)
    this.unregister = dispatcher.unregister.bind(dispatcher)

    const koa = new Koa
    const get_all = get('/all', this.check_status.bind(this, CheckAll))
    const get_done = get('/done', this.check_status.bind(this, CheckDone))

    const get_not_done = get(
      '/not_done',
      this.check_status.bind(this, CheckNotDone)
    )

    koa.use(bodyparser())
    koa.use(get_all)
    koa.use(get_done)
    koa.use(get_not_done)

    this.koa = koa
  }

  /**
   * Check matching count statuses
   */
  async check_status (EventType, ctx) {
    const request_id = uuid.v4()
    const status_request = new EventType(request_id)
    const collector = new ReportCountCollector(request_id)
    const listener_id = this.register(collector)

    await this.dispatch(status_request)

    this.unregister(listener_id)

    ctx.body = { request_id, events: collector.events }
    ctx.status = 200
  }

  /**
   * Listen for events sent by HTTP
   */
  listen () {
    this.koa.listen(8080)
  }
}

module.exports = Server
