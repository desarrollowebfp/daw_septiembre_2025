import { useRef } from "react";

const Example = () => {
  const inputRef = useRef(null);

  const handleInput = () => {
    console.log(inputRef.current.value);
  };

  return (
    <>
      <input type="text" ref={inputRef}/>
      <button onClick={handleInput}>Click</button>
    </>
  );
};

export default Example;
