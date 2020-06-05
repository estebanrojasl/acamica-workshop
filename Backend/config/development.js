const config = {
  Port: 3000,
  ApiBaseUrl: "https://ambienteprueba.puntos.com",
  JwtSecretKey:
    "856ED746F97360B36E4BA820EB5A848206D5B40EA5D2D5BE0A5392E8BBD2A16C",
  JwtExpiresToken: 180, // seconds
  LoginInfo: {
    User: "acamica",
    Password: "acamica123",
  },
  CnxString:
    "mongodb+srv://testAdminDB:Yx1xgYhissFGc2Mj@cluster0-npwxh.mongodb.net/test?retryWrites=true&w=majority",
  // DataBaseConfig: {
  //     CnxString: "mongodb+srv://wsduque:TGdNML3hD1qKbMtM@clustertest-6s8tr.mongodb.net/test?retryWrites=true&w=majority",
  //     User: "wsduque",
  //     Pass: "TGdNML3hD1qKbMtM"
  // },
  MysqlConfig: {
    Db: "workshop_viajes",
    User: "root",
    Password: "eafiT2020*",
    Host: "localhost",
    Dialect: "mysql",
  },
};
// https://www.grc.com/passwords.htm
module.exports = { config };
