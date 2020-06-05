const ENV = process.env.NODE_ENV || "development";
const Sequelize = require("sequelize");
const usuarioModelo = require("../entities/usuarios.js");
const paqueteModelo = require("../entities/paquetes.js");
const compraModelo = require("../entities/compras.js");
const config = require("../config/" + ENV).config.MysqlConfig;

const sequelize = new Sequelize(config.Db, config.User, config.Password, {
  host: config.Host,
  dialect: config.Dialect,
  operatorsAliases: false,
});

const Compras = compraModelo(sequelize, Sequelize);
const Usuario = usuarioModelo(sequelize, Sequelize);
const Paquete = paqueteModelo(sequelize, Sequelize);

Usuario.hasMany(Compras, {
  foreignKey: "id_usuario",
  foreignKeyConstraint: true,
});
Paquete.hasMany(Compras, {
  foreignKey: "id_paquete",
  foreignKeyConstraint: true,
});

sequelize.sync({ force: false }).then(() => {
  console.log(`Base de datos y tablas creadas!`);
});

module.exports = {
  Usuario,
  Paquete,
  Compras,
  sequelize,
};
