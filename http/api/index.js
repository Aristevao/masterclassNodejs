/* Esse programa insere e remove dados do arquivo urls.json

    Lê a url com URL.parse().query e pega name, url e del.
    Três condições:
        - if não houver name ou url após '/' --> exibir o objeto urls.json
        - if del = true --> remover objeto com name e url indicado após '/'
        - else capturar name e url e inserir no objeto json urls.json    */

const http = require('http')
const URL = require('url')
const fs = require('fs')
const path = require('path')

const data = require('./urls.json')

function writeFile(cb) { // Interage com o arquivo urls.json; o localiza e converte para objeto
    fs.writeFile(
        path.join(__dirname, "urls.json"),
        JSON.stringify(data, null, 2), // ---> 3° arg: identação
        err => {
            if(err) throw err

            cb(JSON.stringify({ success: "ok" }))
        }
    )
}

http.createServer((req, res) => {
   const { name, url, del } = URL.parse(req.url, true).query

   res.writeHead(200, { // libera para qualquer origem entrar na aplicação. Rompe uma segurança nativa do browser.
       'Access-Control-Allow-Origin': '*'
   })

   
   if(!name || !url)  // all resourses
        return res.end(JSON.stringify(data))

    if(del) {
        data.urls = data.urls.filter(item => String(item.url) !== String(url)) // Confere se a url capturada no .query é diferente da contida no urls.json
        return writeFile( (message) => {
            res.end(message)
        }) 
    }

    data.urls.push({ name, url }) // Appends new elements to an array, and returns the new length of the array.

    return writeFile ( (message) => {
        res.end(message)
    })

}).listen(3000, () => console.log('Api is running')) // mensagem exibida no terminal ao iniciar servidor <npm run api> (definido no package.json)