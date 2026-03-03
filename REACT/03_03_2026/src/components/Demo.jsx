import { useEffect, useState } from 'react';

import { suma } from '../utils/utils';

export default function Demo() {
  const total = suma(1, 2);
  const [count, setCount] = useState(0);

  useEffect(() => {}, []);

  if (count === 0) {
    return;
  }

  return (
    <div>
      <h1>Demo</h1>
      <p>Total: {total}</p>
      <button onClick={() => setCount(count + 1)}>Incrementar</button>
    </div>
  );
}
