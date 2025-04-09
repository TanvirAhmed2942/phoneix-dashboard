import { ConfigProvider } from "antd";
import React from "react";

function AntdConfig({ children }) {
  return (
    <ConfigProvider
      theme={{
        components: {
          Segmented: {
            itemHoverBg: "#3b55ff",
            itemHoverColor: "white",
            trackBg: "#0100fa",
            itemColor: "white",
            itemSelectedColor: "black",
            fontSize: 14,
          },
          Button: {
            defaultActiveColor: "#ffffff",
            defaultActiveBorderColor: "#0100fa",
            defaultActiveBg: "#0100fa",
            defaultHoverBg: "#3b55ff",
            defaultHoverBorderColor: "#0100fa",
            defaultHoverColor: "#ffffff",
          },
          Table: {
            rowSelectedBg: "#f6f6f6",
            headerBg: "#f6f6f6",
            headerSplitColor: "none",
            headerBorderRadius: "none",
            cellFontSize: "16px",
          },
          // Pagination: {
          //   borderRadius: "3px",
          //   itemActiveBg: "#18a0fb",
          // },
        },
      }}
    >
      {children}
    </ConfigProvider>
  );
}

export default AntdConfig;
