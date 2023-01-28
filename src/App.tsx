import { useState } from 'react';
import reactLogo from './assets/react.svg';
import { tw } from 'twind';

const divClass = tw`flex bg-red`;

function App() {
  const [count, setCount] = useState(0);

  return <div className={divClass}>App</div>;
}

export default App;
