import { Suspense, use, useState } from "react";
import { ClipLoader } from "react-spinners";

const wait = (ms) => new Promise((r) => setTimeout(r, ms));

const commentsPromise = () =>
  wait(2000).then(() =>
    fetch("https://jsonplaceholder.typicode.com/comments?_limit=3").then(
      (res) => res.json(),
    ),
  );

const CommentList = ({ promise }) => {
  const comments = use(promise);

  return (
    <ul>
      {comments.map((comment) => (
        <li key={comment.id}>{comment.email}</li>
      ))}
    </ul>
  );
};

const DemoSuspense = () => {
  const [promise, setPromise] = useState(null);
  return (
    <>
      <h2>use + Suspense</h2>
      <button onClick={() => setPromise(commentsPromise())}>
        Cargar la promesa
      </button>

      {promise && (
        <Suspense fallback={<ClipLoader />}>
          <CommentList promise={promise} />
        </Suspense>
      )}
    </>
  );
};

export default DemoSuspense;
