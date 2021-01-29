const http = require('http')
const fs = require('fs')
const path = require('path')

http.createServer((req, res) => {
    const file = req.url === '/' ? 'index.html' : req.url  // ? ifternário, significa "então"  ||  : (dois pontos) significa senão 
    const filePath = path.join(__dirname, 'public', file) // lê o arquivo index.html da página public
    const extname = path.extname(filePath)
    
    const allowedFileTypes = ['.html', '.css', '.js']
    const allowed = allowedFileTypes.find( (item) =>  { return item == extname }) // como tem só um argumento e um retorno, pode ser escrito como --->  item =>  item == extname

    if(!allowed) return

        fs.readFile(
            filePath,
            (err, content) => {
                if(err) throw err 
                    res.end(content)
            }
        )
}).listen(5000, () => console.log('Server is running'))