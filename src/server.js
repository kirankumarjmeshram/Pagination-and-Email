const app = require("./index");
const connect = require("./configs/db")
app.listen(1234,async()=>{
    await connect();
    console.log("listening on 1234")
})