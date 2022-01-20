// import "reflect-metadata";
// import {createConnection} from "typeorm";
// import {User} from "./entity/User";

import server from "./Utils/Server";

const port = 3001;

const app = server.listen(port, () => {
  console.log(`running on ${port}`);
});

export default app;
