// import React, { useState } from "react";
// import { imageUrl } from "../../redux/api/baseApi";
// import { Link } from "react-router-dom";
// import { FaRegBell } from "react-icons/fa6";
// import { UserOutlined, DownOutlined } from "@ant-design/icons";
// import { Badge, Space, Flex, Avatar, Dropdown, ConfigProvider } from "antd";
// import { useUser } from "../../provider/User";
// import { US, GB, FR, DE } from "country-flag-icons/react/3x2";

// const Header = () => {
//   const { user } = useUser();
//   const src = user?.image?.startsWith("https")
//     ? user?.image
//     : `${imageUrl}/${user?.image}`;

//   const [selectedCountry, setSelectedCountry] = useState("USA");

//   const handleCountryChange = (value) => {
//     setSelectedCountry(value);
//     console.log("Selected Language:", value);
//   };

//   const countryList = [
//     {
//       label: (
//         <div className="flex items-center gap-1.5 font-semibold">
//           <US title="United States" className="w-8 h-8 rounded-lg" /> Eng (USA)
//         </div>
//       ),
//       key: "USA",
//     },
//     {
//       label: (
//         <div className="flex items-center gap-1.5 font-semibold">
//           <GB title="United Kingdom" className="w-8 h-8 rounded-lg" /> Eng (UK)
//         </div>
//       ),
//       key: "UK",
//     },
//     {
//       label: (
//         <div className="flex items-center gap-1.5 font-semibold">
//           <FR title="France" className="w-8 h-8 rounded-lg" /> Fre (FR)
//         </div>
//       ),
//       key: "France",
//     },
//     {
//       label: (
//         <div className="flex items-center gap-1.5 font-semibold">
//           <DE title="Germany" className="w-8 h-8 rounded-lg" /> DE (GER)
//         </div>
//       ),
//       key: "Germany",
//     },
//   ];

//   const userMenuItems = [
//     { label: <Link to="/auth/login">Log Out</Link>, key: "logout" },
//   ];

//   return (
//     <ConfigProvider
//       theme={{
//         token: {
//           borderRadius: "16px",
//           colorPrimaryBorderHover: "red",
//         },
//         components: {
//           Dropdown: {
//             paddingBlock: "5px",
//           },
//         },
//       }}
//     >
//       <Flex
//         align="center"
//         justify="end"
//         className="w-100% h-[100px] px-10 py-2 shadow-sm overflow-auto bg-white"
//       >
//         <Flex align="center" gap={30} justify="flex-end">
//           {/* Country Language Dropdown */}
//           <Dropdown
//             trigger={["click"]}
//             menu={{
//               items: countryList.map((country) => ({
//                 key: country.key,
//                 label: (
//                   <div onClick={() => handleCountryChange(country.key)}>
//                     {country.label}
//                   </div>
//                 ),
//               })),
//             }}
//           >
//             <a className="flex gap-2 cursor-pointer hover:text-black">
//               {countryList.find((c) => c.key === selectedCountry)?.label ||
//                 "Select Language"}
//               <DownOutlined />
//             </a>
//           </Dropdown>

//           {/* Notification Badge */}
//           <div className="w-8 h-8 bg-[#f5effb] flex items-center justify-center p-6 rounded-md relative">
//             <Link to="/notification" className="flex">
//               <FaRegBell color="#975CDB" size={30} className="relative" />
//               <Badge dot className="absolute top-[30%] left-[55%]" />
//             </Link>
//           </div>

//           {/* User Profile */}
//           <Link to="/setting" className="flex items-center gap-3">
//             <Avatar shape="square" size={60} className="rounded" src={src} />
//           </Link>

//           {/* Dropdown Menu */}
//           <Flex vertical align="start">
//             <Dropdown menu={{ items: userMenuItems }} trigger={["click"]}>
//               <a onClick={(e) => e.preventDefault()}>
//                 <div className="mr-4 flex gap-2.5 font-semibold hover:text-black">
//                   {`${user?.firstName} ${user?.lastName}`}
//                   <DownOutlined />
//                 </div>
//               </a>
//             </Dropdown>
//             <p>Super Admin</p>
//           </Flex>
//         </Flex>
//       </Flex>
//     </ConfigProvider>
//   );
// };

// export default Header;

import React, { useState } from "react";
import { Link } from "react-router-dom";
import { FaRegBell } from "react-icons/fa6";
import { Badge, Avatar, ConfigProvider, Flex, Dropdown } from "antd";
import { useUser } from "../../provider/User";
import { CgMenu } from "react-icons/cg";
import { US, GB, FR, DE } from "country-flag-icons/react/3x2";
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
