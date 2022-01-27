const User = require('../models/user')

const initialUsers = [
  {
    username: 'Aapo94',
    name: 'Aapo Ahlström',
    passwordHash: 'maajoukkue#kapiteelikirjain#PYSÄKÖINTIMITTARI'
  },
  {
    username: 'Anna2021',
    name: 'Anna Kataja',
    passwordHash: 'VARPAISILLAAN#LEHTINAINEN#surettaa'
  }
]

const usersInDb = async () => {
  const users = await User.find({})
  return users.map(user =>  user.toJSON())
}

module.exports = {
  initialUsers,
  usersInDb
}