const request = require("supertest");
const server = require("../app");
const albumRepository = require("../src/repository/albums.repository");

// Con esto falseamos la información
jest.mock("../src/repository/albums.repository");

// Vamos a comprobar el funcionamiento del Route Not Found
describe("Albums", () => {
  //Le indicamos a jest antes de cada una de las pruebas limpie los mocks
  beforeEach(() => {
    jest.clearAllMocks();
  });
  describe("GET /route not found", () => {
    it("Al entrar en una ruta definida debería responder con un 404 y un mensaje de error", async () => {
      const response = await request(server).get("/api/albums/create/algo");
      expect(response.status).toBe(404);
      expect(response.body).toStrictEqual({ error: "Route not found" });
    });
  });
  describe("GET /api/albums", () => {
    it("Al hacer la llamada debería retornar un array vacio y un status 200", async () => {
      // Estamos simulando que getAllAlbums nos devuelve un array vacio para que lo entienda el test
      albumRepository.getAllAlbums.mockResolvedValue([]);

      const response = await request(server).get("/api/albums");
      expect(response.status).toBe(200);
      expect(response.body).toStrictEqual([]);
    });
    it("Al hacer la llamada debería retornar un array con un album y un status 200", async () => {
      albumRepository.getAllAlbums.mockResolvedValue([
        {
          _id: "660f1c2a8b7d4e1f9a123456",
          title: "Hybrid Theory",
          genre: "Rock",
          price: 19.99,
          inStock: true,
          createdAt: "2026-03-31T10:15:30.000Z",
          updatedAt: "2026-03-31T10:15:30.000Z",
        },
      ]);
      const response = await request(server).get("/api/albums");
      expect(response.status).toBe(200);
      expect(response.body).toStrictEqual([
        {
          _id: "660f1c2a8b7d4e1f9a123456",
          title: "Hybrid Theory",
          genre: "Rock",
          price: 19.99,
          inStock: true,
          createdAt: "2026-03-31T10:15:30.000Z",
          updatedAt: "2026-03-31T10:15:30.000Z",
        },
      ]);
    });
  });
  describe("GET /api/albums/:id", () => {
    it("Debe devolver un estado 404 si el id no se encuentra", async () => {
      const response = await request(server).get("/api/albums/1234");
      expect(response.status).toBe(404);
      expect(response.body).toStrictEqual({
        message: "Error encontrando el album",
      });
    });
  });
  describe("POST /api/albums", () => {
    it("Debe devolver un estado 201 y el elemento creado", async () => {
      const newAlbum = {
        title: "Lawless Darkness",
        genre: "Black metal",
        price: 20,
        inStock: true,
      };
      albumRepository.createAlbum.mockResolvedValue({
        _id: "660f1c2a8b7d4e1f9a123456",
        createdAt: "2026-03-31T10:15:30.000Z",
        updatedAt: "2026-03-31T10:15:30.000Z",
        ...newAlbum,
      });
      const response = await request(server).post("/api/albums").send(newAlbum);

      expect(response.status).toBe(201);
      expect(response.body).toStrictEqual({
        _id: "660f1c2a8b7d4e1f9a123456",
        createdAt: "2026-03-31T10:15:30.000Z",
        updatedAt: "2026-03-31T10:15:30.000Z",
        title: "Lawless Darkness",
        genre: "Black metal",
        price: 20,
        inStock: true,
      });
    });
  });
});
