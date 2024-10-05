const express = require("express");
const fs = require("fs");

const app = express();

app.get("/pokemons", (req, res) => {
  const { type, name } = req.query;

  fs.readFile("db.json", "utf8", (data, err) => {
    if (err) {
      res.status(500).send("Internal Server Error");
      return;
    }
    let pokemons = JSON.parse(data);
    try {
      if (type) {
        pokemons = pokemons.filter((pokemon) => pokemon.types.includes(type));
      }
      if (name) {
        const lowerCaseName = name.toLowerCase();
        pokemons = pokemons.filter((pokemon) =>
          pokemon.name.includes(lowerCaseName)
        );
      }
    } catch (parseError) {
      console.error("Error parsing JSON data:", parseError);
      res.status(500).send("Error parsing JSON data");
      return;
    }
    res.json(pokemons);
  });
});

const PORT = 5000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
