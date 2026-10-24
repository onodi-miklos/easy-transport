import express from 'express'
import cors from 'cors'
import logger from '@onodi-miklos/logger'
import path from 'node:path'
import { fileURLToPath } from 'node:url'
import { exec } from 'node:child_process'

const app = express()

app.use(logger([
  // "console",
  // "file"
], './log.txt'))

app.use([
  cors(),
  express.json(),
  express.urlencoded({ extended: true })
])

app.get('/', (req, res) => {
  return res.status(200).sendFile(path.resolve(path.dirname(fileURLToPath(import.meta.url)), 'public/index.html'))
})

let data
app.post('/data', (req, res) => {
  data = req.body.data
  res.status(200).json({success:true})
})

app.get('/data', (req, res) => {
  res.status(200).json({data: data})
})


app.all(/.*/, (req, res) => {
  return res.status(404).json({success:false})
})

app.listen(9001, () => {
  console.log('server listening on port 9001....')

  const command =
    process.platform === "win32" ? "start" :
    process.platform === "darwin" ? "open" :
    "xdg-open"
  
  exec(`${command} http://localhost:9001`)
})