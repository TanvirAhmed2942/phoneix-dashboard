import React, { useState } from "react";
import { Table, Avatar, ConfigProvider, Input, Button } from "antd";
import { SearchOutlined, DeleteOutlined } from "@ant-design/icons";
import { RiDeleteBin6Line } from "react-icons/ri";
import { IoEye } from "react-icons/io5";
import GetPageName from "../../../components/common/GetPageName";
import { LuDownload } from "react-icons/lu";
import man from "../../../assets/man.png";

// ✅ UserAvatar Component — now receives the image correctly
const UserAvatar = ({ name, image }) => (
  <div className="flex gap-2 items-center">
    <Avatar shape="circle" size={30} src={image} />
    <p>{name}</p>
  </div>
);

// Sample Data
const initialData = [
  {
    key: 1,
    date: "2021-09-01",
    name: "John Lennon",
    transactionID: "#1214454",
    ammount: 5,
    plan: "Basic",
    status: "Sent",
  },
  {
    key: 2,
    date: "2021-10-15",
    name: "Paul McCartney",
    transactionID: "#121idj54",
    ammount: 10,
    plan: "Premium",
    status: "Pending",
  },
  {
    key: 3,
    date: "2021-10-15",
    name: "George Harrison",
    transactionID: "#1256789",
    ammount: 15,
    plan: "Free",
    status: "Pending",
  },
  {
    key: 4,
    date: "2021-11-20",
    name: "Ringo Starr",
    transactionID: "#1239874",
    ammount: 20,
    plan: "Basic",
    status: "Sent",
  },
  {
    key: 5,
    date: "2021-11-20",
    name: "Ringo Starr",
    transactionID: "#1239874",
    ammount: 20,
    plan: "Basic",
    status: "Unpaid",
  },
];

function Transaction() {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedRowKeys, setSelectedRowKeys] = useState([]);
  const [data, setData] = useState(initialData);

  const handleSearch = (value) => setSearchQuery(value);

  const filteredData = data.filter(
    ({ name, ...rest }) =>
      Object.entries(rest).some(([key, value]) => {
        if (key === "date") {
          return new Date(value).toLocaleDateString().includes(searchQuery);
        }
        if (key === "ammount") {
          return value.toString().includes(searchQuery);
        }
        return (
          typeof value === "string" &&
          value.toLowerCase().includes(searchQuery.toLowerCase())
        );
      }) || name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const rowSelection = {
    selectedRowKeys,
    onChange: (keys) => setSelectedRowKeys(keys),
  };

  const handleDelete = () => {
    setData(data.filter((item) => !selectedRowKeys.includes(item.key)));
    setSelectedRowKeys([]);
  };

  const columns = [
    {
      title: "Transaction ID",
      dataIndex: "transactionID",
      key: "transactionID",
    },
    {
      title: "User Name",
      dataIndex: "name",
      key: "name",
      render: (name) => <UserAvatar name={name} image={man} />,
    },
    {
      title: "Plan",
      dataIndex: "plan",
      key: "plan",
    },
    {
      title: "Ammount",
      dataIndex: "ammount",
      key: "ammount",
      sorter: (a, b) => a.ammount - b.ammount,
    },
    {
      title: "Status",
      dataIndex: "status",
      key: "status",
      render: (status) => (
        <p
          className={`${
            status.toLowerCase() === "sent"
              ? "text-green-500 bg-green-50 border border-green-500 w-20 px-1.5 py-0.5 rounded-lg"
              : status.toLowerCase() === "pending"
              ? "text-sky-500 bg-sky-50 border border-sky-500 w-20 px-1.5 py-0.5 rounded-lg"
              : "text-red-500 bg-red-50 border border-red-500 w-20 px-1.5 py-0.5 rounded-lg"
          }`}
        >
          {status}
        </p>
      ),
    },
    {
      title: "Date",
      dataIndex: "date",
      key: "date",
      render: (date) => <p>{new Date(date).toLocaleDateString()}</p>,
    },
    {
      title: "Actions",
      key: "action",
      render: (_, record) => (
        <div className="flex items-center gap-4">
          <IoEye
            size={25}
            className="text-black hover:text-blue-500 cursor-pointer"
          />
          <RiDeleteBin6Line
            size={20}
            className="text-black hover:text-red-500 cursor-pointer"
            onClick={() =>
              setData(data.filter((item) => item.key !== record.key))
            }
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
      <Head
        onSearch={handleSearch}
        pagename="Transactions"
        selectedRowKeys={selectedRowKeys}
        handleDelete={handleDelete}
        filteredData={filteredData}
      />

      <Table
        columns={columns}
        rowSelection={rowSelection}
        dataSource={filteredData}
        size="middle"
        pagination={{
          defaultPageSize: 5,
          position: ["bottomRight"],
          total: filteredData.length,
          showSizeChanger: false,
          showQuickJumper: false,
        }}
        showSorterTooltip={{ target: "sorter-icon" }}
      />
    </ConfigProvider>
  );
}

export default Transaction;

// ✅ Head Component
function Head({ onSearch, selectedRowKeys, handleDelete, filteredData }) {
  return (
    <ConfigProvider
      theme={{
        components: {
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

        <div className="flex gap-3 items-center">
          <Input
            placeholder="Search by Recipient, Occasion, Price, or Status"
            onChange={(e) => onSearch(e.target.value)}
            prefix={<SearchOutlined />}
            className="h-9 gap-2"
            allowClear
          />

          {selectedRowKeys.length > 1 && (
            <Button
              onClick={handleDelete}
              icon={<DeleteOutlined />}
              className="bg-[#18a0fb] text-white border-none h-9"
            >
              {selectedRowKeys.length === filteredData.length
                ? "Delete All"
                : "Delete Selected"}
            </Button>
          )}

          <Button
            icon={<LuDownload size={20} />}
            className="bg-[#f1f1f1] hover:bg-smart text-black border h-9"
          >
            Export
          </Button>
        </div>
      </div>
    </ConfigProvider>
  );
}
