import React, { useState } from "react";
import { FaCopy } from "react-icons/fa";
import { toast } from "react-toastify";

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  content: any;
}

const Modal: React.FC<ModalProps> = ({ isOpen, onClose, content }) => {
  const [copied, setCopied] = useState(false);
  const [showHtml, setShowHtml] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(JSON.stringify(content, null, 2));
    setCopied(true);
    toast.success("Copied!", { position: "bottom-left" });
  };

  const detectHtmlPattern = (text: string) => {
    // Check if the text contains common HTML tags
    const htmlPattern = /<([A-Za-z][A-Za-z0-9]*)\b[^>]*>(.*?)<\/\1>/;
    return htmlPattern.test(text);
  };

  const handleShowHtml = () => {
    if (typeof content === "string" && detectHtmlPattern(content)) {
      setShowHtml(!showHtml); // Toggle showHtml state
    } else {
      toast.error("Not valid HTML content!", { position: "bottom-left" });
    }
  };

  return isOpen ? (
    <div className="fixed inset-0 flex justify-center items-center bg-gray-900 bg-opacity-50">
      <div className="bg-white p-4 rounded-lg max-w-screen-lg w-auto max-h-screen h-auto overflow-auto">
        <div className="mb-2 font-bold">
          Value
          <FaCopy
            className="cursor-pointer text-blue-500 inline-block ml-2"
            onClick={handleCopy}
          />
        </div>
        {showHtml ? (
          <div dangerouslySetInnerHTML={{ __html: content }} />
        ) : (
          <div className="flex items-center mb-2">
            <pre
              className="whitespace-pre-wrap break-all"
              onClick={(e) => e.stopPropagation()}
            >
              {JSON.stringify(content, null, 2)}
            </pre>
          </div>
        )}
        <div className="flex mt-2">
          {detectHtmlPattern(content) && (
            <button
              className="px-2 py-1 bg-blue-500 text-white rounded mr-2"
              onClick={handleShowHtml}
            >
              {showHtml ? "Show Value" : "Show HTML"}
            </button>
          )}
          <button
            className="px-2 py-1 bg-red-600 text-white rounded"
            onClick={onClose}
          >
            Close
          </button>
        </div>
      </div>
    </div>
  ) : null;
};

export default Modal;
