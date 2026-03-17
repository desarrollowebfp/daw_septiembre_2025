import { useState } from "react";
import Markdown from "react-markdown";
import { posts } from "./posts";

const App = () => {
  const [selectedSlug, setSelectedSlug] = useState(posts[0]?.slug || "");

  const selectedPost =
    posts.find((post) => post.slug === selectedSlug) || posts[0];

  return (
    <div className="page">
      <header className="header">
        <h1>React & Markdown Blog</h1>
        <p>Este blog lee los archivos markdown de la carpeta "./posts"</p>
      </header>
      <div className="layout">
        <aside className="sidebar">
          {posts.map((post) => (
            <button
              key={post.slug}
              onClick={() => setSelectedSlug(post.slug)}
              className={`card ${post.slug === selectedPost?.slug ? 'active' : ""}`}
            >
              <small>{post.date}</small>
              <h2>{post.title}</h2>
              <p>{post.description}</p>
            </button>
          ))}
        </aside>
        <main className="content">
          <Markdown>{selectedPost?.content || "## No hay post"}</Markdown>
        </main>
      </div>
    </div>
  );
};

export default App;
