const app = require("./app");

const { Config } = require("./Config/index");
const main = require("./connections/db");

const startServer = async () => {
  const PORT = Config.PORT;
  try {
    await main();
    app.listen(PORT, () => {
      console.log(`server is runnong on port ${PORT}`);
    });
  } catch (err) {
    if (err instanceof Error) {
      console.log(err.message);
      setTimeout(() => {
        process.exit(1);
      }, 1000);
    }
  }
};

startServer();
