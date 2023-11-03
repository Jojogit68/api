const express = require("express")
const favicon = require("serve-favicon")
const bodyParser = require("body-parser")
const sequelize = require("./src/db/sequelize")
// const { Sequelize, DataTypes} = require('sequelize')
// const { success, getUniqueId } = require('./helper')
// let  pokemons = require('./src/db/mock-pokemon')
// const PokemonModel = require('./src/models/pokemons')

const app = express()
const port = process.env.PORT || 3000

// const sequelize = new Sequelize(
//   'pokedex',
//   'root',
//   '',
//   {
//     host: 'localhost',
//     dialect: 'mariadb',
//     logging: false
//   }
// )

// sequelize
//   .authenticate()
//   .then((_) => console.log("La connexion à la bdd a réussi"))
//   .catch((error) => console.error(`Impossible de se connecter à la bdd : ${error}`))

// const Pokemon = PokemonModel(sequelize, DataTypes)

// sequelize.sync({force: true})
//   .then((_) => {
//     console.log('La bdd a été synchronisée')

//     pokemons.map(pokemon => {
//       Pokemon.create({
//         name: pokemon.name,
//         hp: pokemon.hp,
//         cp: pokemon.cp,
//         picture: pokemon.picture,
//         types: pokemon.types.join(),
//       }).then((bulbizarre) => console.log(bulbizarre.toJSON()))
//     })
//   })

app
	.use(favicon(__dirname + "/favicon.ico"))
	.use(bodyParser.json())

// sequelize.initDb()

app.get('/', (req, res) => {
	res.send("Hello, Heroku ! 👋")
})

// Points de terminaison
require("./src/routes/findAllPokemons")(app)
require("./src/routes/findPokemonByPk")(app)
require("./src/routes/createPokemon")(app)
require("./src/routes/updatePokemon")(app)
require("./src/routes/deletePokemon")(app)
require("./src/routes/login")(app)

// Gestion des erreurs 404
app.use(({ res }) => {
	const message = "Impossible de trouver la ressource demandée !"
	res.status(404).json({ message })
})

// app.get('/', (req, res) => res.send('Hello, Express ! 🍀'))

// app.get('/api/pokemons/:id', (req, res) => {
//   const id = parseInt(req.params.id)
//   const pokemon = pokemons.find(pokemon => pokemon.id === id)
//   const message = 'Un pokémon a bien été trouvé'
//   res.json(success(message, pokemon))
// })

// app.get('/api/pokemons', (req, res) => {
//   const message = 'La liste des pokémons a été trouvée'
//   res.json(success(message, pokemons));
// })

// app.post('/api/pokemons', (req, res) => {
//   const id = getUniqueId(pokemons)
//   const pokemonCreated = { ...req.body, ...{id: id, created: new Date()}}
//   pokemons.push(pokemonCreated)
//   const message = `Le pokemon ${pokemonCreated.name} a bien été créé`
//   res.json(success(message, pokemonCreated))
// })

// app.put('/api/pokemons/:id', (req, res) => {
//   const id = parseInt(req.params.id);
//   const pokemonUpdated = { ...req.body, id: id}
//   pokemons = pokemons.map(pokemon => {
//     return pokemon.id === id ? pokemonUpdated : pokemon
//   })
//   const message = `Le pokemon ${pokemonUpdated.name} a été modifié`
//   res.json(success(message, pokemonUpdated))
// })

// app.delete("/api/pokemons/:id", (req, res) => {
//   const id = parseInt(req.params.id);
//   const pokemonDeleted = pokemons.find(pokemon => pokemon.id === id)
//   pokemons = pokemons.filter(pokemon => pokemon.id !== id)
//   const message = `Le pokemon ${pokemonDeleted.name} a été supprimé`;
//   res.json(success(message, pokemonDeleted));
// })

app.listen(port, () =>
	console.log(
		`Notre application Node est démarrée sur : http://localhost:${port}`
	)
)
