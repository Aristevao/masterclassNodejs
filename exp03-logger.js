const EventEmitter = require('events') // Much of the Node.js core API is built around an idiomatic asynchronous event-driven architecture in which certain kinds of objects (called "emitters") emit named events that cause Function objects ("listeners") to be called.

const emitter = new EventEmitter()

emitter.on('log', (message) => {
    console.log(message)
})

function log(message) {
    emitter.emit('log', message)
}

module.exports = log