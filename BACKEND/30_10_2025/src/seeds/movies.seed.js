//Lo suyo es que por seguridad esta carpeta seeds se oculte en el .gitignore
const movies = require("./movies");
const Movie = require("../models/movie.model");
const mongoose = require("mongoose");

mongoose
  .connect(
    "STRING DE DB_URL"
  )
  .then(async () => {
    //Buscamos todas las películas en Mongo
    const allMovies = await Movie.find();
    //Si en la lista de películas hay longitud (hay elementos dentro)
    if (allMovies.length) {
      //Eliminamos todas las películas de la colección en Mongo
      await Movie.collection.drop();
    }
  })
  .catch((error) => console.log("Error borrando las peliculas", error.message))
  .then(async () => {
    //Una vez que hayamos comprobado que la colección en Mongo de películas esta vacia, inserto mediante el modelo todo el array de peliculas, para asi convertirlas en formato Mongo y comprobar que cada una de ellas coincide con el equema
    await Movie.insertMany(movies);
    console.log("Semilla de películas insertada!")
  })
  .catch((error) =>
    console.log("Error insertando las peliculas", error.message)
  )
  .finally(() => mongoose.disconnect());
