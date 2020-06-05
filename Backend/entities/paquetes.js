module.exports = (sequelize, type) => {
  return sequelize.define("paquetes", {
    id: {
      type: type.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    imageUrl: type.STRING,
    packageName: type.STRING,
    destination: type.STRING,
    description: type.STRING,
    quantity: type.INTEGER,
    price: type.INTEGER,
  });
};
