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
            fontSize: 18,
          },
          Button: {
            defaultActiveColor: "#ffffff",
            defaultActiveBorderColor: "#49b0f1",
            defaultActiveBg: "#49b0f1",
            defaultHoverBg: "#3b55ff",
            defaultHoverColor: "#ffffff",
          },
        },
      }}
    >
      {children}
    </ConfigProvider>
  );
}

export default AntdConfig;
