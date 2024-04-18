import React from "react";
interface Props {
  handleJsonInput: (callback: any) => void;
}
const InputJson: React.FC<Props> = (props) => {
  return (
    <div className="h-full">
      <textarea
        className="resize-none border rounded-md p-2 w-full h-full focus:outline-none focus:border-blue-500"
        placeholder="Enter your text here"
        onChange={(e: any) => props.handleJsonInput(e.target.value)}
      ></textarea>
    </div>
  );
};

export default InputJson;
