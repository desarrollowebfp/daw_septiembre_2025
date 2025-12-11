import { useState } from "react";

const Toggle = () => {
  const [visible, setVisible] = useState(false);

  const handleClick = () => {
    setVisible(!visible);
  };

  return (
    <div>
      {visible && <h1>Soy visible</h1>}
      <button onClick={handleClick}>Toggle</button>
    </div>
  );
};

export default Toggle;
