import express from "express";
import cors from "cors"
import jsonRoute from "./routes/json.js";
import authRoute from "./routes/auth.js";

const app = express();
const port = process.env.SERVER_PORT || 3000;
app.use(cors());
app.use(express.json());

app.use("/json", jsonRoute)
app.use("/auth", authRoute);


app.get("/", (req, res) => {
    return res.json([1])
})

app.listen(port, d => console.log(`Listening on port: ${port}`));

