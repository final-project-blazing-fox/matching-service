const app = require("./app.js");
const { mongoDB } = require("./model/index");

const PORT = process.env.PORT || 3000;

mongoDB
  .run()
  .then(() => {
    app.listen(3000, () => {
      console.log(`Running on port ${PORT}`);
    });
  })
  .catch((err) => {
    console.log(err);
  });
