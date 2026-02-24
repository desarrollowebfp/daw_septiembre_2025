import { useActionState, useOptimistic, useState } from "react";

const wait = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

const LikeCounter = () => {
  const [realLikes, setRealLikes] = useState(0);

  const [optimisticLikes, addOptimisticLikes] = useOptimistic(
    realLikes,
    (current, amount) => current + amount,
  );

  const [error, submitAction, pending] = useActionState(async () => {
    addOptimisticLikes(1);

    try {
      await wait(3000);

      const res = await fetch(
        "https://jsonplaceholder.typicode.com/postsbj",
        {
          method: "POST",
          headers: { "Content-Type": "application/json; charset=UTF-8" },
          body: JSON.stringify({ type: "like" }),
        },
      );

      if (!res.ok) {
        addOptimisticLikes(-1);
        return "No se pudo confirmar el like en el servidor";
      }

      setRealLikes((value) => value + 1);
      return null;
    } catch (error) {
      addOptimisticLikes(-1);
      return "Like no confirmado";
    }
  }, null);

  return (
    <>
      <h2>Contador de likes</h2>
      <p>Likes optimistas: {optimisticLikes}</p>
      <p>Likes reales: {realLikes}</p>
      <form action={submitAction} mehod="post">
        <button type="submit" disabled={pending}>
          {pending ? "..." : "❤️"}
        </button>
      </form>
      {error && <p>{error}</p>}
    </>
  );
};

export default LikeCounter;
