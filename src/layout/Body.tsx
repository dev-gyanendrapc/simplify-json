import React, { useState } from "react";
import InputJson from "../components/InputJson";
import OutputJson from "../components/OutputJson";
import { JSONObject } from "../types/commonTypes";

const Body = () => {
  const [jsonInput, setJsonInput] = useState<JSONObject>();
  // get input file

  function handleJsonInput(callback: JSONObject) {
    setJsonInput(callback);
  }

  return (
    <div className="columns-2 h-full">
      <div className="w-full h-full">
        <InputJson handleJsonInput={handleJsonInput} />
      </div>
      <div className="w-full h-full">
        <OutputJson jsonInput={jsonInput} />
      </div>
    </div>
  );
};

export default Body;
