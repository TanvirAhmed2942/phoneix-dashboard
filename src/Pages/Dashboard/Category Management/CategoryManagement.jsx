import React, { useState } from "react";
import { ConfigProvider, Segmented } from "antd";
import CategorySubcategoryForm from "./CategorySubcategoryForm";
import CategoryList from "./CategoryList";
import EditCatSub from "./EditCatSub";

function CategoryManagement() {
  // Default selected value is set to "Quick View"
  const [selected, setSelected] = useState("Quick View");

  const handleSelected = (value) => {
    setSelected(value);
    console.log(value);
  };

  const ControlView = () => {
    switch (selected) {
      case "Quick View":
        return <CategoryList />;
      case "Add New":
        return <CategorySubcategoryForm />;
      case "Edit":
        return <EditCatSub isSelected={selected} />;
      default:
        return <div>Default</div>;
    }
  };

  return (
    <ConfigProvider
      theme={{
        components: {
          Segmented: {
            itemHoverBg: "#0ea5e9",
            trackBg: "#0ea5e9",
            itemColor: "white",
          },
        },
      }}
    >
      <div>
        <Segmented
          options={["Quick View", "Add New", "Edit", "Delete"]}
          block
          className="border border-smart mb-4"
          onChange={handleSelected}
          value={selected}
        />
        <ControlView />
      </div>
    </ConfigProvider>
  );
}

export default CategoryManagement;
