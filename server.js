const express = require('express')

const app = express()
app.use(express.json()) 

app.listen(9998, () => {
  console.log(`Server running on PORT 9998`)
})