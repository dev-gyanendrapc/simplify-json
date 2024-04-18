import React from "react";
import { isJSON } from "../helpers/jsonHelper";
import JsonViewer from "./JsonViewer";
interface Props {
  jsonInput: any;
}
const OutputJson: React.FC<Props> = (props) => {
  return (
    <div className="h-full overflow-y-auto border rounded-ss">
      {isJSON(props.jsonInput) ? (
        <JsonViewer jsonData={JSON.parse(props.jsonInput) ?? {}} />
      ) : (
        <textarea
          className="resize-none border rounded-md p-2 w-full h-full focus:outline-none focus:border-blue-500"
          placeholder="Your output goes here."
          value={props.jsonInput}
        ></textarea>
      )}
    </div>
  );
};

export default OutputJson;
