const mongoose = require('mongoose')
const databaseUrl =
  process.env.DATABASE_URL ||
  'mongodb+srv://jonathanandri_db_user:h04UemKAo3sFcZHV@cluster0.aftngoo.mongodb.net/argentBank?retryWrites=true&w=majority'

module.exports = async () => {
  try {
    await mongoose.connect(databaseUrl, {
      ssl: true,
      tlsAllowInvalidCertificates: false,
    })
    console.log('Database successfully connected')
  } catch (error) {
    console.error(`Database Connectivity Error: ${error}`)
    throw new Error(error)
  }
}
