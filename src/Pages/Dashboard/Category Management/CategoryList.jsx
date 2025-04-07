import React from "react";
import { DownOutlined } from "@ant-design/icons";
import { Tree } from "antd";

const treeData = [
  {
    title: "Category 1",
    key: "1",
    children: [
      {
        title: "Sub Category 1",
        key: "0-1",
      },
      {
        title: "Sub Category 2",
        key: "0-2",
      },
      {
        title: "Sub Category 3",
        key: "0-3",
      },
      {
        title: "Sub Category 4",
        key: "0-4",
      },
    ],
  },
  {
    title: "Category 2",
    key: "2",
    children: [
      {
        title: "Sub Category 1",
        key: "0-1",
      },
      {
        title: "Sub Category 2",
        key: "0-2",
      },
      {
        title: "Sub Category 3",
        key: "0-3",
      },
      {
        title: "Sub Category 4",
        key: "0-4",
      },
    ],
  },
];
function CategoryList() {
  const onSelect = (selectedKeys, info) => {
    console.log("selected", selectedKeys, info);
  };
  return (
    <div>
      <Tree
        showLine
        switcherIcon={<DownOutlined />}
        defaultExpandedKeys={["1"]}
        onSelect={onSelect}
        treeData={treeData}
      />
    </div>
  );
}

export default CategoryList;
