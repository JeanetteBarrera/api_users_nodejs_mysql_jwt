const express = require("express");
const cors = require("cors")
require("dotenv");

const app = express();



// REQUERIMOS ROUTER
//const userRouter = require("./router/userRouter")

// CONFIGURACIONES
app.use(cors)
app.use(express.urlencoded({extend:false}));
app.use(express.json());

//app.use("/api/account", userRouter)


const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}.`)
})