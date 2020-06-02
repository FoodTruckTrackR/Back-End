module.exports = {
	development: {
		client: "sqlite3",
		useNullAsDefault: true, 
		connection: {
			filename: "./data/food-truck.db3",
		},
		migrations: {
			directory: "./data/migrations"
		},
		seeds: {
			directory: "./data/seeds"
		},
		// needed when using foreign keys
		pool: {
			afterCreate: (conn, done) => {
				// runs after a connection is made to the sqlite engine
				conn.run("PRAGMA foreign_keys = ON", done) // turn on FK enforcement
			},
		},
	},
	testing: {
		client: "sqlite3",
		useNullAsDefault: true, 
		connection: {
			filename: "./data/food-truck-test.db3",
		},
		migrations: {
			directory: "./data/migrations"
		},
		seeds: {
			directory: "./data/seeds"
		},
		// needed when using foreign keys
		pool: {
			afterCreate: (conn, done) => {
				// runs after a connection is made to the sqlite engine
				conn.run("PRAGMA foreign_keys = ON", done) // turn on FK enforcement
			},
		},
	}
}
