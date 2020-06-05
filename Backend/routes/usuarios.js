const { Usuario } = require('../db/sequelize')

const create = (req, res, next) => {
    console.log(req.body)
    Usuario.create(req.body)
        .then(user => res.json(user))
        .catch(error => res.status(500).json(error))
};

module.exports = {
    create
}