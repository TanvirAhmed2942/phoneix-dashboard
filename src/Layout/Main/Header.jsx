import React, { useState } from "react";
import { Link } from "react-router-dom";
import { FaRegBell } from "react-icons/fa6";
import { Badge, Avatar, ConfigProvider, Flex, Dropdown } from "antd";
import { useUser } from "../../provider/User";
import { CgMenu } from "react-icons/cg";
import { UserOutlined, DownOutlined } from "@ant-design/icons";

const Header = ({ toggleSidebar }) => {
  const { user } = useUser();
  const src = user?.image?.startsWith("https")
    ? user?.image
    : `https://your-image-source/${user?.image}`;
  const [selectedCountry, setSelectedCountry] = useState("USA");

  const handleCountryChange = (value) => {
    setSelectedCountry(value);
    console.log("Selected Language:", value);
  };

  const userMenuItems = [
    { label: <Link to="/auth/login">Log Out</Link>, key: "logout" },
  ];

  return (
    <ConfigProvider
      theme={{
        token: {
          borderRadius: "16px",
          colorPrimaryBorderHover: "red",
        },
        components: {
          Dropdown: {
            paddingBlock: "5px",
          },
        },
      }}
    >
      <Flex
        align="center"
        justify="between"
        className="w-100% min-h-[85px] px-4 py-2 shadow-sm overflow-auto text-slate-700 bg-white"
      >
        <div>
          <CgMenu
            size={40}
            onClick={toggleSidebar}
            className="cursor-pointer text-sky-500"
          />
        </div>

        <Flex align="center" gap={30} justify="flex-end" className="w-full">
          {/* Notification Badge */}
          <div className="w-8 h-8 bg-[#e0f1fc] flex items-center justify-center p-6 rounded-md relative">
            <Link to="/notification" className="flex">
              <FaRegBell color="#18a0fb" size={30} className="relative " />
              <Badge dot className="absolute top-[30%] left-[55%]" />
            </Link>
          </div>
          {/* User Profile */}
          <Link to="/admin-list" className="flex items-center gap-3">
            <Avatar shape="square" size={60} className="rounded" src={src} />
          </Link>
          {/* Dropdown Menu */}
          <Flex vertical align="start">
            <Dropdown menu={{ items: userMenuItems }} trigger={["click"]}>
              <a onClick={(e) => e.preventDefault()}>
                <div className="mr-4 flex gap-2.5 font-semibold hover:text-black">
                  {`${user?.firstName} ${user?.lastName}`}
                  <DownOutlined />
                </div>
              </a>
            </Dropdown>
            <p>Super Admin</p>
          </Flex>
        </Flex>
      </Flex>
    </ConfigProvider>
  );
};

export default Header;
