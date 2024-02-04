const app = require("./app.js")

require("dotenv").config()
const PORT = process.env.PORT||3003

app.listen(PORT || 3003, () => {
  console.log(`app is live on port: ${PORT}`);
});
