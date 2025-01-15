import { closeDBConnection, initializeDBConnection } from "./db.js";
import { app, PORT } from "./server.js";

initializeDBConnection()
  .then(() => {
    app.listen(PORT, () => {
      console.info(`Server is running at : localhost:${PORT}`);
    })
  })
  .catch((err) => {
    console.error(err);
    throw err;
  })
  .finally(() => {
    closeDBConnection();
  });
