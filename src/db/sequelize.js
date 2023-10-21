/* L’API Rest et la Base de données : Créer un modèle Sequelize */
const { Sequelize, DataTypes } = require("sequelize")
const PokemonModel = require("../models/pokemons")
const UserModel = require("../models/users")
const pokemons = require("./mock-pokemon")
const bcrypt = require('bcrypt')


const sequelize = new Sequelize("pokedex", "root", "", {
  host: "localhost",
  dialect: "mariadb",
  dialectOptions: {
    timezone: "Etc/GMT-2",
  },
  logging: false,
})

const Pokemon = PokemonModel(sequelize, DataTypes)
const User = UserModel(sequelize, DataTypes)

const initDb = () => {
  return sequelize.sync({force: true})
    .then((_) => {
      pokemons.map((pokemon) => {
        Pokemon.create({
          name: pokemon.name,
          hp: pokemon.hp,
          cp: pokemon.cp,
          picture: pokemon.picture,
          types: pokemon.types,
        })
        .then(pokemon => console.log(pokemon.toJSON()))
      })

      bcrypt.hash('Pikachu', 10)
      .then(hash => {
        User.create({
					username: "Pikachu",
					password: hash
				})
      })
      // .then(user => console.log(user.toJSON()))

      console.log("La base de donnée a bien été initialisée !")
    })
}
module.exports = {
  initDb, Pokemon, User
}