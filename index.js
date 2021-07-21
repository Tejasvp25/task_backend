const express = require("express");
const { PORT } = require("./config");
const cors = require("cors");
const app = express();

app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(cors());

require("./routes/student.route")(app);

app.listen(PORT, () => console.log(`Listening to Port ${PORT}`));
