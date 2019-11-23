const mongoose = require('mongoose')

mongoose
  .connect(
    'mongodb+srv://sundeep:<password>@cluster0-d9tfh.mongodb.net/Events-GraphQL?retryWrites=true&w=majority'.replace(
      '<password>',
      'Sundeep1998'
    ),
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
