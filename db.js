const mongoose = require('mongoose')

mongoose
  .connect(
    process.env.MONGODB_URI.replace('<password>', process.env.MONGODB_PASSWORD),
    {
      useNewUrlParser: true,
      useCreateIndex: true,
      useUnifiedTopology: true,
      useFindAndModify: false
    }
  )
  .then(() => console.log('Database connected successfully'))
  .catch(err => console.log(err))

exports = mongoose
