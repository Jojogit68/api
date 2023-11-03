"use strict"
/** @type {import('sequelize-cli').Migration} */

const validTypes = ["Plante", "Poison", "Feu", "Eau", "Insecte", "Vol", "Normal", "Electrik", "Fée"]

module.exports = {
	async up(queryInterface, Sequelize) {
		await queryInterface
			.createTable("Users", {
				id: {
					allowNull: false,
					autoIncrement: true,
					primaryKey: true,
					type: Sequelize.INTEGER,
				},
				username: {
					allowNull: false,
					unique: true,
					type: Sequelize.STRING,
				},
				password: {
					type: Sequelize.STRING,
				},
				createdAt: {
					allowNull: false,
					type: Sequelize.DATE,
				},
				updatedAt: {
					allowNull: false,
					type: Sequelize.DATE,
				},
			})
			.then(console.log("Création de la table users OK")),
			await queryInterface
				.createTable("Pokemons", {
					id: {
						type: Sequelize.INTEGER,
						primaryKey: true,
						autoIncrement: true,
					},
					name: {
						type: Sequelize.STRING,
						allowNull: false,
						unique: true,
					},
					hp: {
						type: Sequelize.INTEGER,
						allowNull: false,
					},
					cp: {
						type: Sequelize.INTEGER,
						allowNull: false,
					},
					picture: {
						type: Sequelize.STRING,
						allowNull: false,
					},
					types: {
						type: Sequelize.STRING,
						allowNull: false,
						get() {
							return this.getDataValue("types").split(",")
						},
						set(types) {
							this.setDataValue("types", types.join())
						},
						validate: {
							isTypesValid(value) {
								if (!value) {
									throw new Error("Un pokemon doit avoir au moins un type")
								}
								if (value.split(",").length > 3) {
									throw new Error("Un pokemon ne peux pas avoir plus de 3 types")
								}
								value.split(",").forEach((type) => {
									if (!validTypes.includes(type)) {
										throw new Error(`Le type doit appartenir à la liste suivante : ${validTypes}`)
									}
								})
							},
						},
					},
				})
				.then(console.log("Création de la table pokemons OK"))
	},
	async down(queryInterface, Sequelize) {
		await queryInterface.dropTable("Users")
		await queryInterface.dropTable("Pokemons")
	},
}
