module.exports = (sequelize, type) => {
  return sequelize.define("usuarios", {
    id: {
      type: type.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    auth: type.STRING,
    name: type.STRING,
    email: {
      type: type.STRING,
      validate: {
        isEmail: true,
      },
    },
    password: type.STRING,
  });
};
