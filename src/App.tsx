import { useState } from "react";
import reactLogo from "./assets/react.svg";
import { apply, install, tw } from "@twind/core";
import { config } from "../twind.config";
import { Form } from "./Form";

// const divClass = apply`flex bg-red`;
// console.log({ divClass });

function App() {
  const fullPageContainer = tw("min-h-screen bg-gray-200");
  const containerClasses = tw(
    "flex flex-col max-w-7xl m-auto justify-center py-12"
  );
  // const fullPageContainer = tw("h-full bg-green-300");
  const [count, setCount] = useState(0);

  return (
    <div className={fullPageContainer}>
      <div className={containerClasses}>
        <Form />
      </div>
    </div>
  );
}

export default App;
