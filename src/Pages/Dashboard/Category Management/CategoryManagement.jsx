import React, { useState } from "react";
import { Segmented } from "antd";
import CategorySubcategoryForm from "./CategorySubcategoryForm";
import CategoryList from "./CategoryList";

function CategoryManagement() {
  const [selected, setSelected] = useState("Category");

  const handleSelected = (value) => {
    setSelected(value);
    console.log(value);
  };

  const ControlView = () => {
    switch (selected) {
      case "Top View":
        return <CategoryList />;
      case "Category":
        return <CategorySubcategoryForm isSelected={selected} />;
      case "Sub Category":
        return <CategorySubcategoryForm isSelected={selected} />;
      default:
        return <div>Default</div>;
    }
  };

  return (
    <div>
      <Segmented
        options={["Top View", "Category", "Sub Category"]}
        block
        className="border border-smart mb-4"
        onChange={handleSelected}
        value={selected}
      />
      <ControlView />
    </div>
  );
}

export default CategoryManagement;
