const { app } = require("./app");
const PORT = process.env.port || 3001;

app.listen(PORT, () => console.log(`Listening on port ${PORT}`));
