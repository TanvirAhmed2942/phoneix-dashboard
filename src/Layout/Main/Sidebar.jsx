import { FaQuoteRight } from "react-icons/fa6";
import { CgTemplate } from "react-icons/cg";
import { Menu } from "antd";
import React, { useEffect, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { TbCategory2, TbDashboard } from "react-icons/tb";
import { BsFilePost } from "react-icons/bs";
import { SiAntdesign } from "react-icons/si";
import { HiUsers } from "react-icons/hi";
import { RxDashboard } from "react-icons/rx";
import { PiWallet } from "react-icons/pi";
import { FiLogOut } from "react-icons/fi";
import { RiContactsBook3Line, RiSettings5Line } from "react-icons/ri";
import { MdCategory, MdOutlineReportProblem } from "react-icons/md";
import { MdOutlinePrivacyTip } from "react-icons/md";
import { IoDocumentTextOutline } from "react-icons/io5";
import { GrAnnounce } from "react-icons/gr";
const Sidebar = ({ isCollapsed }) => {
  const location = useLocation();
  const path = location.pathname;
  const [selectedKey, setSelectedKey] = useState("");
  const [openKeys, setOpenKeys] = useState([]);
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/auth/login");
  };

  const menuItems = [
    {
      key: "/",
      icon: <RxDashboard size={24} />,
      label: <Link to="/">Overview</Link>,
    },

    {
      key: "/user-list",
      icon: <HiUsers size={23} />,
      label: isCollapsed ? (
        <Link to="/user-list">User</Link>
      ) : (
        <Link to="/user-list">User</Link>
      ),
    },
    {
      key: "/post-list",
      icon: <BsFilePost size={23} />,
      label: isCollapsed ? (
        <Link to="/post-list">Post</Link>
      ) : (
        <Link to="/post-list">Post</Link>
      ),
    },
    {
      key: "/category-subcategory-management",
      icon: <MdCategory size={25} />,
      label: isCollapsed ? (
        <Link to="/category-subcategory-management">
          Category-Sub Cateogory
        </Link>
      ) : (
        <Link to="/category-subcategory-management">
          Category-Sub Cateogory
        </Link>
      ),
    },
    {
      key: "/transaction",
      icon: <PiWallet size={25} />,
      label: isCollapsed ? (
        <Link to="/transaction">Transaction</Link>
      ) : (
        <Link to="/transaction">Transaction</Link>
      ),
    },
    {
      key: "/reported-issues",
      icon: <MdOutlineReportProblem size={25} />,
      label: isCollapsed ? (
        <Link to="/reported-issues">Report</Link>
      ) : (
        <Link to="/reported-issues">Report</Link>
      ),
    },

    {
      key: "subMenuSetting",
      icon: <CgTemplate size={`${isCollapsed ? 25 : 25}`} />,
      label: "Cms",
      children: [
        {
          key: "/privacy-policy",

          icon: <MdOutlinePrivacyTip size={24} />,
          label: (
            <Link to="/privacy-policy" className="text-white hover:text-white">
              Privacy Policy
            </Link>
          ),
        },
        {
          key: "/terms-and-conditions",
          icon: <IoDocumentTextOutline size={24} />,
          label: (
            <Link
              to="/terms-and-conditions"
              className="text-white hover:text-white"
            >
              Terms And Condition
            </Link>
          ),
        },
        {
          key: "/faq",
          icon: <FaQuoteRight size={24} />,
          label: (
            <Link to="/faq" className="text-white hover:text-white">
              FAQ
            </Link>
          ),
        },
        {
          key: "/announcement",
          icon: <GrAnnounce size={25} />,
          label: isCollapsed ? (
            <Link to="/announcement">Announcement</Link>
          ) : (
            <Link to="/announcement">Announcement</Link>
          ),
        },
        // {
        //   key: "/category-list",
        //   icon: <TbCategory2 size={24} />,
        //   label: (
        //     <Link to="/category-list" className="text-white hover:text-white">
        //       Category
        //     </Link>
        //   ),
        // },
        {
          key: "/logo",
          icon: <SiAntdesign size={24} />,
          label: (
            <Link to="/logo" className="text-white hover:text-white">
              Logo
            </Link>
          ),
        },
        {
          key: "/contact",
          icon: <RiContactsBook3Line size={24} />,
          label: (
            <Link to="/contact" className="text-white hover:text-white">
              Contact Us
            </Link>
          ),
        },
      ],
    },

    {
      key: "/admin-list",
      icon: <RiSettings5Line size={24} />,
      label: isCollapsed ? (
        <Link to="/admin-list">setting</Link>
      ) : (
        <Link to="/admin-list">setting</Link>
      ),
    },
    {
      key: "/logout",
      icon: <FiLogOut size={24} />,
      label: isCollapsed ? null : (
        <p onClick={handleLogout} className="text-black hover:text-black">
          Logout
        </p>
      ),
    },
  ];

  useEffect(() => {
    const selectedItem = menuItems.find(
      (item) =>
        item.key === path || item.children?.some((sub) => sub.key === path)
    );

    if (selectedItem) {
      setSelectedKey(path);

      if (selectedItem.children) {
        setOpenKeys([selectedItem.key]);
      } else {
        const parentItem = menuItems.find((item) =>
          item.children?.some((sub) => sub.key === path)
        );
        if (parentItem) {
          setOpenKeys([parentItem.key]);
        }
      }
    }
  }, [path]);

  return (
    <div
      className={`bg-quilocoP h-full shadow-md transition-all duration-300  max-h-100  ${
        isCollapsed ? "w-[80px]" : "w-[280px]"
      }`}
    >
      <Link
        to="/"
        className="flex items-center justify-center py-4 text-white bg-white sticky z-50 mb-10"
      >
        <div className="w-full flex items-center justify-center bg-quilocoP px-4 py-3 -mt-1.5 gap-3 rounded-lg">
          <TbDashboard size={40} className="text-smart" />
          {!isCollapsed && (
            <p className="text-2xl text-smart font-semibold ">Dashboard</p>
          )}
          {/* <img src={"qilocoLogo"} /> */}
        </div>
      </Link>
      <div
        className=" h-[80%]  overflow-y-auto
  [&::-webkit-scrollbar]:w-0
  [&::-webkit-scrollbar-track]:rounded-full
  [&::-webkit-scrollbar-track]:bg-gray-100
  [&::-webkit-scrollbar-thumb]:rounded-full
  [&::-webkit-scrollbar-thumb]:bg-gray-300
  dark:[&::-webkit-scrollbar-track]:bg-neutral-700
  dark:[&::-webkit-scrollbar-thumb]:bg-neutral-500
"
      >
        <Menu
          mode="inline"
          selectedKeys={[selectedKey]}
          items={menuItems}
          inlineCollapsed={isCollapsed}
          className="text-white  bg-white my-auto "
        />
      </div>
    </div>
  );
};

export default Sidebar;

// import { FaQuoteRight } from "react-icons/fa6";
// import { CgTemplate } from "react-icons/cg";
// import { Menu, ConfigProvider } from "antd";
// import React, { useEffect, useState } from "react";
// import { Link, useLocation, useNavigate } from "react-router-dom";
// import { TbCategory2, TbDashboard } from "react-icons/tb";
// import { BsFilePost } from "react-icons/bs";
// import { SiAntdesign } from "react-icons/si";
// import { HiUsers } from "react-icons/hi";
// import { RxDashboard } from "react-icons/rx";
// import { PiWallet } from "react-icons/pi";
// import { FiLogOut } from "react-icons/fi";
// import { RiContactsBook3Line, RiSettings5Line } from "react-icons/ri";
// import { MdCategory, MdOutlineReportProblem } from "react-icons/md";
// import { MdOutlinePrivacyTip } from "react-icons/md";
// import { IoDocumentTextOutline } from "react-icons/io5";
// import { GrAnnounce } from "react-icons/gr";

// const Sidebar = ({ isCollapsed }) => {
//   const location = useLocation();
//   const path = location.pathname;
//   const [selectedKey, setSelectedKey] = useState("");
//   const [openKeys, setOpenKeys] = useState([]);
//   const navigate = useNavigate();

//   const handleLogout = () => {
//     localStorage.removeItem("token");
//     navigate("/auth/login");
//   };

//   // Custom styles for the menu
//   const customMenuStyles = `
//     /* Selected menu item styles */
//     .ant-menu-item-selected {
//       background-color: #b0b9f7 !important;
//       color: #0100fa !important;
//     }
//     .ant-menu-item-selected .anticon,
//     .ant-menu-item-selected svg,
//     .ant-menu-item-selected a {
//       color: #0100fa !important;
//     }

//     /* Hover styles for menu items */
//     .ant-menu-item:hover {
//       background-color: #b0b9f7 !important;
//       color: #0100fa !important;
//     }
//     .ant-menu-item:hover .anticon,
//     .ant-menu-item:hover svg,
//     .ant-menu-item:hover a {
//       color: #0100fa !important;
//     }

//     /* Submenu item selected styles */
//     .ant-menu-submenu-selected > .ant-menu-submenu-title {
//       color: #0100fa !important;
//       background-color: #b0b9f7 !important;
//     }
//     .ant-menu-submenu-selected > .ant-menu-submenu-title .anticon,
//     .ant-menu-submenu-selected > .ant-menu-submenu-title svg {
//       color: #0100fa !important;
//     }

//     /* Submenu hover styles */
//     .ant-menu-submenu:hover > .ant-menu-submenu-title {
//       color: #0100fa !important;
//       background-color: #b0b9f7 !important;
//     }
//     .ant-menu-submenu:hover > .ant-menu-submenu-title .anticon,
//     .ant-menu-submenu:hover > .ant-menu-submenu-title svg {
//       color: #0100fa !important;
//     }

//     /* Submenu popup hover styles */
//     .ant-menu-submenu-popup .ant-menu-item:hover {
//       background-color: #b0b9f7 !important;
//       color: #0100fa !important;
//     }
//     .ant-menu-submenu-popup .ant-menu-item:hover .anticon,
//     .ant-menu-submenu-popup .ant-menu-item:hover svg,
//     .ant-menu-submenu-popup .ant-menu-item:hover a {
//       color: #0100fa !important;
//     }

//     /* Fix for Link components inside menu items */
//     .ant-menu-item-selected a,
//     .ant-menu-item:hover a,
//     .ant-menu-submenu-title:hover a {
//       color: #0100fa !important;
//     }
//   `;

//   const menuItems = [
//     {
//       key: "/",
//       icon: <RxDashboard size={24} />,
//       label: <Link to="/">Overview</Link>,
//     },

//     {
//       key: "/user-list",
//       icon: <HiUsers size={23} />,
//       label: <Link to="/user-list">User</Link>,
//     },
//     {
//       key: "/post-list",
//       icon: <BsFilePost size={23} />,
//       label: <Link to="/post-list">Post</Link>,
//     },
//     {
//       key: "/category-subcategory-management",
//       icon: <MdCategory size={25} />,
//       label: (
//         <Link to="/category-subcategory-management">
//           Category-Sub Cateogory
//         </Link>
//       ),
//     },
//     {
//       key: "/transaction",
//       icon: <PiWallet size={25} />,
//       label: <Link to="/transaction">Transaction</Link>,
//     },
//     {
//       key: "/reported-issues",
//       icon: <MdOutlineReportProblem size={25} />,
//       label: <Link to="/reported-issues">Report</Link>,
//     },

//     {
//       key: "subMenuSetting",
//       icon: <CgTemplate size={`${isCollapsed ? 25 : 25}`} />,
//       label: "Cms",
//       children: [
//         {
//           key: "/privacy-policy",
//           icon: <MdOutlinePrivacyTip size={24} />,
//           label: <Link to="/privacy-policy">Privacy Policy</Link>,
//         },
//         {
//           key: "/terms-and-conditions",
//           icon: <IoDocumentTextOutline size={24} />,
//           label: <Link to="/terms-and-conditions">Terms And Condition</Link>,
//         },
//         {
//           key: "/faq",
//           icon: <FaQuoteRight size={24} />,
//           label: <Link to="/faq">FAQ</Link>,
//         },
//         {
//           key: "/announcement",
//           icon: <GrAnnounce size={25} />,
//           label: <Link to="/announcement">Announcement</Link>,
//         },
//         {
//           key: "/logo",
//           icon: <SiAntdesign size={24} />,
//           label: <Link to="/logo">Logo</Link>,
//         },
//         {
//           key: "/contact",
//           icon: <RiContactsBook3Line size={24} />,
//           label: <Link to="/contact">Contact Us</Link>,
//         },
//       ],
//     },

//     {
//       key: "/admin-list",
//       icon: <RiSettings5Line size={24} />,
//       label: <Link to="/admin-list">setting</Link>,
//     },
//     {
//       key: "/logout",
//       icon: <FiLogOut size={24} />,
//       label: isCollapsed ? null : <p onClick={handleLogout}>Logout</p>,
//     },
//   ];

//   useEffect(() => {
//     const selectedItem = menuItems.find(
//       (item) =>
//         item.key === path || item.children?.some((sub) => sub.key === path)
//     );

//     if (selectedItem) {
//       setSelectedKey(path);

//       if (selectedItem.children) {
//         setOpenKeys([selectedItem.key]);
//       } else {
//         const parentItem = menuItems.find((item) =>
//           item.children?.some((sub) => sub.key === path)
//         );
//         if (parentItem) {
//           setOpenKeys([parentItem.key]);
//         }
//       }
//     }
//   }, [path]);

//   return (
//     <div
//       className={`bg-quilocoP h-full shadow-md transition-all duration-300 max-h-100 ${
//         isCollapsed ? "w-[80px]" : "w-[280px]"
//       }`}
//     >
//       <style dangerouslySetInnerHTML={{ __html: customMenuStyles }} />

//       <Link
//         to="/"
//         className="flex items-center justify-center py-4 text-white bg-white sticky z-50 mb-10"
//       >
//         <div className="w-full flex items-center justify-center bg-quilocoP px-4 py-3 -mt-1.5 gap-3 rounded-lg">
//           <TbDashboard size={40} className="text-smart" />
//           {!isCollapsed && (
//             <p className="text-2xl text-smart font-semibold">Dashboard</p>
//           )}
//         </div>
//       </Link>

//       <div
//         className="h-[80%] overflow-y-auto
//         [&::-webkit-scrollbar]:w-0
//         [&::-webkit-scrollbar-track]:rounded-full
//         [&::-webkit-scrollbar-track]:bg-gray-100
//         [&::-webkit-scrollbar-thumb]:rounded-full
//         [&::-webkit-scrollbar-thumb]:bg-gray-300
//         dark:[&::-webkit-scrollbar-track]:bg-neutral-700
//         dark:[&::-webkit-scrollbar-thumb]:bg-neutral-500"
//       >
//         <ConfigProvider
//           theme={{
//             components: {
//               Menu: {
//                 itemSelectedBg: "#b0b9f7",
//                 itemSelectedColor: "#0100fa",
//                 itemHoverBg: "#b0b9f7",
//                 itemHoverColor: "#0100fa",
//                 subMenuItemBg: "transparent",
//               },
//             },
//           }}
//         >
//           <Menu
//             mode="inline"
//             selectedKeys={[selectedKey]}
//             openKeys={openKeys}
//             onOpenChange={setOpenKeys}
//             items={menuItems}
//             inlineCollapsed={isCollapsed}
//             className="bg-white"
//           />
//         </ConfigProvider>
//       </div>
//     </div>
//   );
// };

// export default Sidebar;
