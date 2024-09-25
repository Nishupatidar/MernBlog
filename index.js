const express = require('express')
const path = require('path')
const bcrypt = require('bcryptjs')

const router = require('./Router/router')
const app = express()
const sidebar = require('./Model/Sidebar')
// const fs = require('fs')
const nodemailer = require('nodemailer')
const bodyParser = require('body-parser')
const role_permission = require('./Model/role_permission')
require('dotenv').config()
const cors = require('cors')

app.use(cors())
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: false }))
app.use(router)
app.use('/Files',express.static(path.join(__dirname,'/public/Files')))
app.use('/public',express.static('public'))
app.use('/assets', express.static('public', {
    setHeaders: (res, path) => {
      if (path.endsWith('.css')) {
        res.setHeader('Content-Type', 'text/css');
      } else if (path.endsWith('.js')) {
        res.setHeader('Content-Type', 'application/javascript');
      }
    },
  }));
// const pathToIndex = path.join(__dirname, "build/index.html")
// app.get('/',(req,res)=>{
//     const raw = fs.readFileSync(pathToIndex)
//     const pageTitle = "Homepage - Welcome to my page"
//   const updated = raw.replace("__PAGE_META__", `<title>${pageTitle}</title>`)
//   res.send(updated)
// })
app.listen(process.env.PORT || 10000,()=>{
    console.log(`Server Runing Port ${process.env.PORT}`)
})
