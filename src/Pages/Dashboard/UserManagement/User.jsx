import React, { useState } from "react";
import { Table, Avatar, ConfigProvider, Input, Button, message } from "antd";
import { SearchOutlined, DeleteOutlined } from "@ant-design/icons";
import GetPageName from "../../../components/common/GetPageName";
import PopOver from "../../../components/common/PopOver";
import { LuDownload } from "react-icons/lu";
import UserEditModal from "./UserEditModal";
import man from "../../../assets/man.png";

function User() {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedRowKeys, setSelectedRowKeys] = useState([]);
  const [userData, setUserData] = useState(data);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedProvider, setSelectedProvider] = useState(null);

  const handleSearch = (value) => {
    setSearchQuery(value);
  };

  const filteredData = userData.filter(
    (user) =>
      user.customerName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      user.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
      user.phoneNumber.includes(searchQuery) ||
      user.address.toLowerCase().includes(searchQuery.toLowerCase()) ||
      user.spent.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const rowSelection = {
    selectedRowKeys,
    onChange: setSelectedRowKeys,
  };

  // Handle edit button click
  const handleEdit = (record) => {
    setSelectedProvider(record); // Store selected provider's data
    setIsModalOpen(true); // Open modal
  };

  // Handle ban functionality
  const handleBan = (provider) => {
    setUserData((prevData) =>
      prevData.map((user) =>
        user.key === provider.key ? { ...user, banned: !user.banned } : user
      )
    );
    message.success(
      `${provider.customerName} has been ${
        provider.banned ? "unbanned" : "banned"
      }`
    );
  };

  // Handle saving edited provider
  const handleSave = (updatedProvider) => {
    setUserData((prevData) =>
      prevData.map((user) =>
        user.key === updatedProvider.key ? updatedProvider : user
      )
    );
    setIsModalOpen(false);
  };

  const handleDeleteSelected = () => {
    setUserData(userData.filter((user) => !selectedRowKeys.includes(user.key)));
    setSelectedRowKeys([]);
  };

  return (
    <>
      <div className="flex justify-between items-center py-5">
        <h1 className="text-[20px] font-medium">{GetPageName()}</h1>
        <div className="flex gap-3">
          <Input
            placeholder="Search by Name, Email or Phone"
            onChange={(e) => handleSearch(e.target.value)}
            prefix={<SearchOutlined />}
            className="h-[47px] gap-2 border"
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
            onClick={handleDeleteSelected}
            className="bg-smart hover:bg-smart text-white border-none h-9"
          >
            Export
          </Button>
        </div>
      </div>

      <Table
        rowSelection={rowSelection}
        columns={columns(handleEdit, handleBan)} // Pass handleEdit and handleBan to columns
        dataSource={filteredData}
        rowClassName={() => "text-black"}
        size="middle"
        pagination={{
          defaultPageSize: 5,
          position: ["bottomRight"],
          size: "default",
          total: 50,
          showSizeChanger: false,
          showQuickJumper: false,
        }}
      />
      {/* Edit Modal */}
      <UserEditModal
        isModalOpen={isModalOpen}
        handleCancel={() => setIsModalOpen(false)}
        providerData={selectedProvider}
        onSave={handleSave}
      />
    </>
  );
}

export default User;

const columns = (handleEdit, handleBan) => [
  {
    title: "User ID",
    dataIndex: "userID",
    key: "userID",
  },
  {
    title: "User Name",
    dataIndex: "customerName",
    key: "customerName",
    render: (text, record) => (
      <div className="flex items-center gap-2.5 text-black">
        <div className="border rounded-full">
          <Avatar src={record.avatar} alt={text} shape="circle" size={40} />
        </div>
        <div className="flex flex-col">
          <span>{text}</span>
          <span>{record.email}</span>
        </div>
      </div>
    ),
  },
  {
    title: "Subscription Type",
    dataIndex: "subscriptionType",
    key: "subscriptionType",
  },
  {
    title: "Total Post",
    dataIndex: "totalPost",
    key: "totalPost",
  },
  {
    title: "Join Date",
    dataIndex: "joinDate",
    key: "joinDate",
  },
  {
    title: "Status",
    dataIndex: "status",
    key: "status",
  },
  {
    key: "action",
    render: (text, record) => (
      <PopOver
        onEdit={() => handleEdit(record)}
        onBan={() => handleBan(record)}
      />
    ),
  },
];

const data = [
  {
    key: 1,
    userID: "US001",
    customerName: "John Doe",
    email: "johndoe@gmail.com",
    subscriptionType: "Premium",
    totalPost: 12,
    joinDate: "2023-01-15",
    status: "Active",
    avatar: man,
    banned: false, // Add banned field
  },
  {
    key: 2,
    userID: "US002",
    customerName: "Jane Smith",
    email: "janesmith@gmail.com",
    subscriptionType: "Basic",
    totalPost: 20,
    joinDate: "2023-01-15",
    status: "Deactive",
    avatar: man,
    banned: false, // Add banned field
  },
  {
    key: 3,
    userID: "US003",
    customerName: "John Foster",
    email: "johnfoster@gmail.com",
    subscriptionType: "Premium",
    totalPost: 12,
    joinDate: "2023-01-15",
    status: "Active",
    avatar: man,
    banned: false, // Add banned field
  },
  {
    key: 4,
    userID: "US004",
    customerName: "Jane Leaster",
    email: "janeleaster@gmail.com",
    subscriptionType: "Free",
    totalPost: 20,
    joinDate: "2023-01-15",
    status: "Active",
    avatar: man,
    banned: false, // Add banned field
  },
];
