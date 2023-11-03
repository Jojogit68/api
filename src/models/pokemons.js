const validTypes = ["Plante", "Poison", "Feu", "Eau", "Insecte", "Vol", "Normal", "Electrik", "Fée"]

module.exports = (sequelize, DataTypes) => {
	return sequelize.define(
		"Pokemon",
		{
			id: {
				type: DataTypes.INTEGER,
				primaryKey: true,
				autoIncrement: true,
			},
			name: {
				type: DataTypes.STRING,
				allowNull: false,
				unique: {
					msg: "Le nom est déjà utilisé",
				},
				validate: {
					notEmpty: { msg: "Un nom de pokemon est nécessaire" },
					notNull: { msg: "Propriété requise" },
				},
			},
			hp: {
				type: DataTypes.INTEGER,
				allowNull: false,
				validate: {
					isInt: { msg: "Un nombre entier est demandé" },
					min: {
						args: [0],
						msg: "Les pts de vie doivent être supérieurs ou égal à 0",
					},
					max: {
						args: [999],
						msg: "Les pts de vie doivent être inférieurs ou égal à 999",
					},
					notNull: { msg: "Propriété requise" },
				},
			},
			cp: {
				type: DataTypes.INTEGER,
				allowNull: false,
				validate: {
					isInt: { msg: "Un nombre entier est demandé" },
					min: {
						args: [0],
						msg: "Les pts de dégât doivent être supérieurs ou égal à 0",
					},
					max: {
						args: [99],
						msg: "Les pts de dégât doivent être inférieurs ou égal à 99",
					},
					notNull: { msg: "Propriété requise" },
				},
			},
			picture: {
				type: DataTypes.STRING,
				allowNull: false,
				validate: {
					isUrl: { msg: "Une URL est demandée" },
					notNull: { msg: "Propriété requise" },
				},
			},
			types: {
				type: DataTypes.STRING,
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
		},
		{
			timestamps: true,
			createdAt: "created",
			updatedAt: false,
		}
	)
}
