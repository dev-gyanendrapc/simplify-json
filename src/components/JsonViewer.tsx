import React, { useState, useEffect } from "react";
import Modal from "./Modal"; // Import your Modal component
import { FaCaretDown, FaCaretRight, FaRegEye } from "react-icons/fa"; // Import icons from react-icons library

interface JsonViewerProps {
  jsonData: any; // Assuming jsonData is the JSON object passed as a prop
}

const JsonViewer: React.FC<JsonViewerProps> = ({ jsonData }) => {
  const [collapsedSections, setCollapsedSections] = useState<string[]>([]);
  const [selectedValue, setSelectedValue] = useState<any | null>(null);

  // Collapse all sections by default
  useEffect(() => {
    const keys = Object.keys(jsonData);
    setCollapsedSections(keys);
  }, [jsonData]);

  const toggleCollapse = (key: string) => {
    setCollapsedSections((prev) => {
      if (prev.includes(key)) {
        return prev.filter((item) => item !== key);
      } else {
        return [...prev, key];
      }
    });
  };

  const handleViewValue = (value: any) => {
    setSelectedValue(value);
  };

  const handleCloseModal = () => {
    setSelectedValue(null);
  };

  const renderValue = (value: any, keyPath: string[] = []) => {
    if (typeof value === "object" && value !== null) {
      return Object.keys(value).map((key) => {
        const nestedKeyPath = [...keyPath, key];
        const nestedValue = value[key];
        const isNestedCollapsible =
          typeof nestedValue === "object" && nestedValue !== null;
        const isCollapsed = collapsedSections.includes(nestedKeyPath.join("."));
        const count = isNestedCollapsible ? Object.keys(nestedValue).length : 1;

        return (
          <div key={key}>
            <div
              className="flex items-center cursor-pointer border py-1"
              onClick={() => {
                if (isNestedCollapsible) {
                  toggleCollapse(nestedKeyPath.join("."));
                } else {
                  handleViewValue(nestedValue);
                }
              }}
            >
              <div className="mr-2">
                {isNestedCollapsible ? (
                  isCollapsed ? (
                    <FaCaretRight />
                  ) : (
                    <FaCaretDown />
                  )
                ) : (
                  <div className="w-4 h-4" />
                )}
              </div>
              <div>
                {`${key} (${count}): `}
                {count === 1 && typeof nestedValue !== "object" ? (
                  nestedValue
                ) : (
                  <span
                    className="text-blue-500 cursor-pointer"
                    onClick={() => handleViewValue(nestedValue)}
                  >
                    <FaRegEye className="inline-block ml-2" />
                  </span>
                )}
              </div>
            </div>
            {!isCollapsed && isNestedCollapsible && (
              <div className="pl-6">
                {renderValue(nestedValue, nestedKeyPath)}
              </div>
            )}
          </div>
        );
      });
    } else {
      return <div className="pl-4">{value}</div>;
    }
  };

  const expandAll = () => {
    setCollapsedSections([]);
  };

  const collapseAll = () => {
    setCollapsedSections(Object.keys(jsonData));
  };

  return (
    <div className="p-4">
      <div className="flex justify-end gap-2 mb-2">
        <button
          className="px-2 py-1 bg-blue-500 text-white rounded"
          onClick={expandAll}
        >
          Expand All
        </button>
        <button
          className="px-2 py-1 bg-blue-500 text-white rounded"
          onClick={collapseAll}
        >
          Collapse All
        </button>
      </div>
      {renderValue(jsonData)}
      <Modal
        isOpen={!!selectedValue}
        onClose={handleCloseModal}
        content={selectedValue}
      />
    </div>
  );
};

export default JsonViewer;
