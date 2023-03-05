const bcrypt = require('bcryptjs')
const users = []

module.exports = {
    login: (req, res) => {
      console.log('Logging In User')
      console.log(req.body)
      const { username, password } = req.body
      for (let i = 0; i < users.length; i++) {
        if (users[i].username === username) {
          const authenticated = bcrypt.compareSync([password, users[i].pwordHash])
          if (authenticated) {
            let userToReturn = {...users[i]}
            delete userToReturn.pwordHash
            res.status(200).send(userToReturn)
          }
        }
        if (users[i].username === username && users[i].password === password) {
          res.status(200).send(users[i])
        }
      }
      res.status(400).send("User not found.")
    },
    register: (req, res) => {
        console.log('Registering User')
        console.log(req.body)
        users.push(req.body)
        res.status(200).send(req.body)
        const { username, email, firstName, lastName, password } = req.body
        const salt = bcrypt.getSaltSync(5)
        const pwordHash = bcrypt.hashSync(password, salt)
        const user = {
          username,
          email,
          firstName,
          lastName,
          pwordHash
        }
        users.push(user)
        let userToReturn = {...user}
        delete userToReturn.pwordHash
    }
}