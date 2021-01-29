const os = require('os')    // importa módulo de dentro do Node (módulo nativo)
const log = require('./exp04-logger')   // importa função log criada no arquivo logger

// função global que executa a cada período predeterminado
setInterval(() => {

    /* Semelhante ao 'from os import freemem, totalmem
    const freemem = os.freemem
    const totalmem = os.totalmem  */
    const { freemem, totalmem } = os

    /*  freemem: Returns the amount of free system memory in bytes as an integer.
        totalmem: Returns the total amount of system memory in bytes as an integer.
        parseInt: converte para número inteiro
        /1024 /1024: converte bytes para megabytes  */
    const total = parseInt(totalmem() / 1024 / 1024)
    const mem = parseInt(freemem() / 1024 / 1024)
    const percents = parseInt((mem / total) * 100)
    
    const stats = {
        free: `${mem} MB`,
        total: `${total} MB`,
        usage: `${percents}%`
    }
    
    console.clear()
    console.log("===== PC STATS =====")
    console.table(stats)

    /* uso da função importada do arquivo logger
        JSON.stringify: transforma o objeto JavaScript em objeto json tipo string
        \n: quebrar linha    */
    log(`${JSON.stringify(stats)}\n`) 

}, 1000)
