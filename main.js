const p = require('bluebird')
const uuid = require('uuid')

const Server = require('./server/Server.js')
const Dispatcher = require('./event/Dispatcher.js')
const Counter = require('./event/Counter.js')

const dispatcher = new Dispatcher()
const server = new Server(dispatcher)

for (const i in new Array(5).fill(null)) {
  const countTo = Math.random() * 100
  const countEvery = Math.random() * 1000
  const id = uuid.v4()
  const counter = new Counter(dispatcher, id, countTo, countEvery)

  dispatcher.register(counter)
  p.coroutine(counter.wait.bind(counter))()
}

server.listen()
