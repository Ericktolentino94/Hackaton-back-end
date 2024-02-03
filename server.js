const express = require("express");
const cors = require("cors");
const axios = require("axios");
require("dotenv").config();

const app = express();
const API_KEY = process.env.API_KEY;
const PORT = process.env.PORT;
const BASE_API_URL = process.env.BASE_API_URL;

app.use(express.json());
app.use(cors());

app.post("/", async (req, res) => {
    const timestamp = new Date()
    console.log("post request received at " + timestamp , " looking for " + req.body.query )
    try {
        const { location, distance, query } = req.body;
        const queryString = `${BASE_API_URL}?location=${encodeURIComponent(location)}&radius=${distance}&keyword=${encodeURIComponent(query)}&key=${API_KEY}`;
        const mapsData = await axios.get(queryString);
        res.status(200).json(mapsData.data)
    } catch(err) {
        console.error(err)
        res.status(400).send(err)
    }

});

app.listen(PORT || 8181, () => {
  console.log(`app is live on port: ${PORT}`);
});
