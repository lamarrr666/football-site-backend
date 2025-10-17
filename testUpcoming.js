const axios = require("axios");
require("dotenv").config();

async function testUpcoming() {
  try {
    const res = await axios.get("https://v3.football.api-sports.io/fixtures", {
      headers: { "x-apisports-key": process.env.API_KEY },
      params: { next: 10, timezone: "Africa/Accra" },
    });
    console.log(res.data);
  } catch (err) {
    console.error(err.response?.data || err.message);
  }
}

testUpcoming();
