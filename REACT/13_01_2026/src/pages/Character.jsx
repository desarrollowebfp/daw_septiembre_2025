import { useParams, Link } from "react-router-dom";

const Character = () => {
  const { id } = useParams();

  const characters = [
    {
      id: 1,
      nombre: "Spider-Man",
      editorial: "Marvel",
      imagen:
        "https://commons.wikimedia.org/wiki/Special:FilePath/Spiderman_cosplay.jpg",
    },
    {
      id: 2,
      nombre: "Batman",
      editorial: "DC",
      imagen:
        "https://commons.wikimedia.org/wiki/Special:FilePath/Batman_cossplay.JPG",
    },
    {
      id: 3,
      nombre: "Wonder Woman",
      editorial: "DC",
      imagen:
        "https://commons.wikimedia.org/wiki/Special:FilePath/NYCC_2016_Cosplay_of_Wonder_Woman.jpg",
    },
    {
      id: 4,
      nombre: "Iron Man",
      editorial: "Marvel",
      imagen:
        "https://commons.wikimedia.org/wiki/Special:FilePath/Iron_Man_Cosplay_Comic_Con_Liverpool_2020.jpg",
    },
    {
      id: 5,
      nombre: "Hulk",
      editorial: "Marvel",
      imagen:
        "https://commons.wikimedia.org/wiki/Special:FilePath/Zombie_Hulk_costume.jpg",
    },
    {
      id: 6,
      nombre: "Wolverine",
      editorial: "Marvel",
      imagen:
        "https://commons.wikimedia.org/wiki/Special:FilePath/Wolverine_cosplay_(14236134614).jpg",
    },
  ];

  const character = characters.find((character) => character.id === Number(id));

  if (!character) {
    return (
      <main>
        <h2>Personaje no encontrado</h2>
        <Link to="/">Volver</Link>
      </main>
    );
  }

  return (
    <main>
      <h2>{character.nombre}</h2>
      <h3>{character.editorial}</h3>
      <img src={character.imagen} alt={character.nombre} />
      <Link to="/">Volver</Link>
    </main>
  );
};

export default Character;
