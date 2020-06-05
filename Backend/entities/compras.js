module.exports = (sequelize, type) => {
  return sequelize.define("compras", {
    id: {
      type: type.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    id_usuario: type.INTEGER,
    id_paquete: type.INTEGER,
    fecha: type.DATE,
  });
};
