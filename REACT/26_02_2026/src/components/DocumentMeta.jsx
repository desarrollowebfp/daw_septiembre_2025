import { useState } from "react";

const Home = () => {
  return (
    <>
      <title>Home | React</title>
      <meta name="description" content="Estoy en el Home" />
      <h2>Home</h2>
      <p>Estoy en el Home</p>
    </>
  );
};

const Contact = () => {
  return (
    <>
      <title>Contact | React</title>
      <meta name="description" content="Estoy en el Contact" />
      <h2>Contact</h2>
      <p>Estoy en el Contact</p>
    </>
  );
};

const Gallery = () => {
  return (
    <>
      <title>Gallery | React</title>
      <meta name="description" content="Estoy en el Gallery" />
      <h2>Gallery</h2>
      <p>Estoy en el Gallery</p>
    </>
  );
};

const DocumentMeta = () => {
  const [page, setPage] = useState("home");
  return (
    <>
      <button onClick={() => setPage("home")}>Home</button>
      <button onClick={() => setPage("contact")}>Contact</button>
      <button onClick={() => setPage("gallery")}>Gallery</button>

      {page === "home" ? (
        <Home />
      ) : page === "contact" ? (
        <Contact />
      ) : page === "gallery" ? (
        <Gallery />
      ) : (
        <Home />
      )}
    </>
  );
};

export default DocumentMeta;
