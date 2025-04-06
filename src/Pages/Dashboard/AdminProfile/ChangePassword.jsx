import { Button, Form, Input } from "antd";
import React from "react";

const ChangePassword = () => {
  const [form] = Form.useForm();

  const handleChangePassword = (values) => {
    console.log(values);
  };

  return (
    <div>
      <div className="">
        <div>
          <Form
            form={form}
            layout="vertical"
            className="lg:ms-[50px] pe-[30px] mt-[30px] "
            initialValues={{
              remember: true,
            }}
            style={{
              width: "100%",
              height: "fit-content",
            }}
            onFinish={handleChangePassword}
          >
            <div className=" mb-[20px]  lg:w-[50%] w-[100%]">
              <Form.Item
                style={{ marginBottom: 0 }}
                name="current_password"
                label={<p style={{ display: "block" }}>Current Password</p>}
                rules={[
                  {
                    required: true,
                    message: "Please input your current password!",
                  },
                ]}
              >
                <Input.Password
                  placeholder="Enter Password"
                  type="password"
                  style={{
                    border: "1px solid #E0E4EC",
                    height: "52px",
                    background: "white",
                    borderRadius: "8px",
                    outline: "none",
                  }}
                />
              </Form.Item>
            </div>

            <div className=" mb-[20px]  lg:w-[50%] w-[100%]">
              <Form.Item
                name="new_password"
                label={<p style={{ display: "block" }}>New Password</p>}
                dependencies={["current_password"]}
                hasFeedback
                rules={[
                  {
                    required: true,
                    message: "Please confirm your password!",
                  },
                  ({ getFieldValue }) => ({
                    validator(_, value) {
                      if (
                        !value ||
                        getFieldValue("current_password") === value
                      ) {
                        return Promise.reject(
                          new Error(
                            "The new password and current password do not match!"
                          )
                        );
                      }
                      return Promise.resolve();
                    },
                  }),
                ]}
                style={{ marginBottom: 0 }}
              >
                <Input.Password
                  type="password"
                  placeholder="Enter password"
                  style={{
                    border: "1px solid #E0E4EC",
                    height: "52px",
                    background: "white",
                    borderRadius: "8px",
                    outline: "none",
                  }}
                />
              </Form.Item>
            </div>

            <div className=" mb-[40px]  lg:w-[50%] w-[100%]">
              <Form.Item
                name="confirm_password"
                label={<p style={{ display: "block" }}>Re-Type Password</p>}
                style={{ marginBottom: 0 }}
                dependencies={["new_password"]}
                hasFeedback
                rules={[
                  {
                    required: true,
                    message: "Please confirm your password!",
                  },
                  ({ getFieldValue }) => ({
                    validator(_, value) {
                      if (!value || getFieldValue("new_password") === value) {
                        return Promise.resolve();
                      }
                      return Promise.reject(
                        new Error(
                          "The new password that you entered do not match!"
                        )
                      );
                    },
                  }),
                ]}
              >
                <Input.Password
                  type="password"
                  placeholder="Enter password"
                  style={{
                    border: "1px solid #E0E4EC",
                    height: "52px",
                    background: "white",
                    borderRadius: "8px",
                    outline: "none",
                  }}
                />
              </Form.Item>
            </div>
            <div
              style={{
                width: "50%",
                display: "flex",
                gap: "16px",
                alignItems: "center",
                marginBottom: "20px",
              }}
            >
              <div style={{ width: "100%", position: "relative" }}>
                <Form.Item>
                  <Button
                    htmlType="submit"
                    block
                    style={{
                      border: "none",
                      height: "41px",
                      background: "#023f86",
                      color: "white",
                      borderRadius: "8px",
                      outline: "none",
                      width: "150px",
                      position: "absolute",
                      right: "20px",
                      bottom: "0px",
                    }}
                  >
                    Submit
                  </Button>
                </Form.Item>
              </div>
            </div>
          </Form>
        </div>
      </div>
    </div>
  );
};

export default ChangePassword;
