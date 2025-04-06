import React, { useState } from "react";
import { Table, Avatar, ConfigProvider, Input, Button, message } from "antd";
import { SearchOutlined, DeleteOutlined } from "@ant-design/icons";
import GetPageName from "../../../components/common/GetPageName";
import { LuDownload } from "react-icons/lu";
import { FiEye } from "react-icons/fi";
import { RiDeleteBin6Line } from "react-icons/ri";
import { IoEye } from "react-icons/io5";

function PostList() {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedRowKeys, setSelectedRowKeys] = useState([]);
  const [userData, setUserData] = useState(data);

  const handleSearch = (value) => {
    setSearchQuery(value);
  };

  const filteredData = userData.filter(
    (user) =>
      user.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      user.author.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const rowSelection = {
    selectedRowKeys,
    onChange: setSelectedRowKeys,
  };

  const handleDelete = (key) => {
    const updated = userData.filter((item) => item.key !== key);
    setUserData(updated);
    message.success("Post deleted successfully!");
  };

  const handleDeleteSelected = () => {
    const updated = userData.filter(
      (item) => !selectedRowKeys.includes(item.key)
    );
    setUserData(updated);
    setSelectedRowKeys([]);
    message.success("Selected posts deleted!");
  };

  const handleExport = () => {
    message.success("Exported Successfully (Demo)");
  };

  const columns = [
    {
      title: "Post ID",
      dataIndex: "postID",
      key: "postID",
    },
    {
      title: "Title",
      dataIndex: "title",
      key: "title",
    },
    {
      title: "Author",
      dataIndex: "author",
      key: "author",
    },
    {
      title: "Status",
      dataIndex: "status",
      key: "status",
    },
    {
      key: "action",
      render: (_, record) => (
        <div className="flex items-center gap-2">
          <IoEye size={25} className="hover:text-sky-500 cursor-pointer" />
          <RiDeleteBin6Line
            size={20}
            className="hover:text-red-500 cursor-pointer"
            onClick={() => handleDelete(record.key)}
          />
        </div>
      ),
    },
  ];

  return (
    <ConfigProvider
      theme={{
        components: {
          Table: {
            rowSelectedBg: "#f6f6f6",
            headerBg: "#f6f6f6",
            headerSplitColor: "none",
            headerBorderRadius: "none",
            cellFontSize: "16px",
          },
          Pagination: {
            borderRadius: "3px",
            itemActiveBg: "#18a0fb",
          },
          Button: {
            defaultHoverBg: "#18a0fb",
            defaultHoverColor: "white",
            defaultHoverBorderColor: "#18a0fb",
          },
        },
      }}
    >
      <div className="flex justify-between items-center py-5">
        <h1 className="text-[20px] font-medium">{GetPageName()}</h1>
        <div className="flex gap-3">
          <Input
            placeholder="Search by Title or Author"
            onChange={(e) => handleSearch(e.target.value)}
            prefix={<SearchOutlined />}
            className="h-9 gap-2"
            allowClear
          />
          {selectedRowKeys.length > 0 && (
            <Button
              icon={<DeleteOutlined />}
              onClick={handleDeleteSelected}
              className="bg-smart hover:bg-smart text-white border-none h-9"
            >
              Delete Selected
            </Button>
          )}
          <Button
            icon={<LuDownload size={20} />}
            onClick={handleExport}
            className="bg-[#f1f1f1] hover:bg-smart text-black border h-9"
          >
            Export
          </Button>
        </div>
      </div>

      <Table
        rowSelection={rowSelection}
        columns={columns}
        dataSource={filteredData}
        size="middle"
        pagination={{
          defaultPageSize: 5,
          position: ["bottomRight"],
          size: "default",
          total: filteredData.length,
          showSizeChanger: false,
          showQuickJumper: false,
        }}
      />
    </ConfigProvider>
  );
}

export default PostList;

// Dummy Data
const data = [
  {
    key: 1,
    postID: "JJJ354",
    title: "Weather Condition",
    author: "John Doe",
    status: "Published",
  },
  {
    key: 2,
    postID: "KHH687",
    title: "Us vs China Economic War",
    author: "Alex",
    status: "Published",
  },
  {
    key: 3,
    postID: "JJSD54",
    title: "AI in Healthcare",
    author: "Paul",
    status: "Draft",
  },
  {
    key: 4,
    postID: "KJK687",
    title: "Can Robot replace Human?",
    author: "Al Shams",
    status: "Published",
  },
];
