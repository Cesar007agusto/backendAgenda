import pgPromise from "pg-promise";

import dotenv from "dotenv";

dotenv.config();

const host = String(process.env.HOST);
const port = Number(process.env.PORT);
const user = String(process.env.USER_DB);
const database = String(process.env.DATABASE);
const password = String(process.env.PASSWORD);



const pgp = pgPromise();

const pool = pgp({
  user: user, host: host, database: database, password: password, port: port
});

pool
  .connect()
  .then((con) => {
    console.log("conexion establecida con la base: ", database);
    con.done();
  })
  .catch((error) => {
    if (error.code == "3D000") {
      console.log("No existe la base de datos  ", database);
    }
    if (error.code == "28P01") {
      console.log("usuario no válido ", user);
    }
    if (error.code == "ENOFOUND") {
      console.log("error servidor ");
    }
    console.log("codigo error: ", error);
  });
  export default pool;