const fs = require('fs')
const path = require('path')
const Sequelize = require('sequelize')
const config = require('../config/config')
const UserModel = require('./User')
const TagModel = require('./Tag')
const db = {}

const sequelize = new Sequelize(
    config.db.database,
    config.db.user,
    config.db.password,
    config.db.options,
)

// fs
//     .readdirSync(__dirname)
//     .filter((file) =>
//       file !== 'index.js'
//     )
//     .forEach((file) => {
//       const model = sequelize.import(path.join(__dirname, file))
//       db[model.name] = model
//     })

db.sequelize = sequelize
db.Sequelize = Sequelize

const User = UserModel(sequelize, Sequelize)
const Tag = TagModel(sequelize, Sequelize)
// Sets up the associations between Tag and User (a many to many relationship).
const Users_Tag = sequelize.define('Users_Tag', {}, { timestamps: false} )

User.belongsToMany(Tag, {through: Users_Tag});
Tag.belongsToMany(User, {through: Users_Tag});


db.User = User
db.Tag = Tag
db.Project = Project

module.exports = db
