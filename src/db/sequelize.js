const { Sequelize, DataTypes } = require("sequelize")
const PokemonModel = require("../models/pokemons")
const UserModel = require("../models/users")
const pokemons = require("./mock-pokemon")
const bcrypt = require("bcrypt")

// const sequelize = new Sequelize("postgres://postgres:Postgresql@localhost:5432/pokedex")

// const sequelize = new Sequelize(
// 	"postgres://pokedex_7sms_user:TYNnZ4YHNvlfyLXy2lhVTWcXFNMgCpNv@dpg-ckrafv9rfc9c73dprvog-a:5432/pokedex_7sms"
// )

// const sequelize = new Sequelize(
// 	"postgres://pokedex_7sms_user:TYNnZ4YHNvlfyLXy2lhVTWcXFNMgCpNv@dpg-ckrafv9rfc9c73dprvog-a/pokedex_7sms"
// )

const sequelize = new Sequelize(
	"postgres://pokedex_7sms_user:TYNnZ4YHNvlfyLXy2lhVTWcXFNMgCpNv@dpg-ckrafv9rfc9c73dprvog-a.frankfurt-postgres.render.com:5432/pokedex_7sms?ssl=true"
)

const Pokemon = PokemonModel(sequelize, DataTypes)
const User = UserModel(sequelize, DataTypes)

const initDb = () => {
	return sequelize.sync().then(() => {
		pokemons.map((pokemon) => {
			Pokemon.create({
				name: pokemon.name,
				hp: pokemon.hp,
				cp: pokemon.cp,
				picture: pokemon.picture,
				types: pokemon.types,
			}).then((pokemon) => console.log(pokemon.toJSON()))
		})

		bcrypt.hash("Pikachu", 10).then((hash) => {
			User.create({
				username: "Pikachu",
				password: hash,
			})
		})
		// .then(user => console.log(user.toJSON()))

		console.log("La base de donnée a bien été initialisée !")
	})
}
module.exports = {
	initDb,
	Pokemon,
	User,
}
