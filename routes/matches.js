const express = require("express");
const axios = require("axios");
require("dotenv").config();

const router = express.Router();

router.get("/live-scores", async (req, res) => {
  try {
    const response = await axios.get("https://v3.football.api-sports.io/fixtures", {
      headers: {
        "x-rapidapi-host": "v3.football.api-sports.io",
        "x-rapidapi-key": process.env.API_KEY,
      },
      params: { live: "all" },
    });

    const fixtures = response.data.response.map((f) => ({
      fixtureId: f.fixture.id,
      homeTeam: f.teams.home.name,
      awayTeam: f.teams.away.name,
      score: `${f.goals.home ?? 0}-${f.goals.away ?? 0}`,
      league: f.league.name,
      status: f.fixture.status.short,
      date: f.fixture.date,
      homeLogo: f.teams.home.logo,
      awayLogo: f.teams.away.logo,
    }));

    res.json(fixtures);
  } catch (error) {
    console.error("Error fetching live matches:", error.message);
    res.status(500).json({ error: "Failed to fetch live matches" });
  }
});

router.get("/stats/:fixtureId", async (req, res) => {
  try {
    const fixtureId = req.params.fixtureId;
    const response = await axios.get("https://v3.football.api-sports.io/fixtures/statistics", {
      headers: {
        "x-rapidapi-host": "v3.football.api-sports.io",
        "x-rapidapi-key": process.env.API_KEY,
      },
      params: { fixture: fixtureId },
    });

    res.json(response.data.response);
  } catch (error) {
    console.error("Error fetching match stats:", error.message);
    res.status(500).json({ error: "Failed to fetch match stats" });
  }
});

module.exports = router;
Added routes/matches.js file
