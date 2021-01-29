const EventEmitter = require('events') // Much of the Node.js core API is built around an idiomatic asynchronous event-driven architecture in which certain kinds of objects (called "emitters") emit named events that cause Function objects ("listeners") to be called.
const fs = require('fs') // The fs module enables interacting with the file system in a way modeled on standard POSIX functions.
const path = require('path') // The path module provides utilities for working with file and directory paths

const emitter = new EventEmitter()

emitter.on('log', (message) => {
    /* fs.appendFile('./log.txt', message, (err) => { não é a melhor maneira de referenciar diretório
        join: identifica o sistema operacional para definir o melhor caminho para chegar no _dirname(diretório atual)
        err: callback function. Função que executa após localizar o arquivo
        if err = true { exibir erro no console }
        throw: A declaração throw lança uma exceção definida pelo usuário. A execução da função atual vai parar (as instruções após o throw não serão executadas), e o controle será passado para o primeiro bloco catch na pilha de chamadas. Se nenhum bloco catch existe entre as funções "chamadoras", o programa vai terminar.    */
        fs.appendFile(path.join(__dirname, 'log.txt'), message, err => {
            if (err) throw err
        })
    })
    
function log(message) {
    emitter.emit('log', message)
} 

module.exports = log