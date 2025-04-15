import { Form, Input, ConfigProvider, message } from "antd";
import React from "react";
import { useNavigate } from "react-router-dom";
import { useForgotPasswordMutation } from "../../redux/apiSlices/authApi";
import Spinner from "../../components/common/Spinner";

export const ForgotPassword = () => {
  const navigate = useNavigate();
  const [forgotPassword, { isLoading }] = useForgotPasswordMutation();

  const onFinish = async (values) => {
    try {
      const res = await forgotPassword({ email: values.email }).unwrap();
      console.log("Forgot Password response:", res);

      if (res?.success === true) {
        message.success("OTP sent successfully!");
        localStorage.clear("otpSuccessToken");
        navigate(`/auth/verify-otp?email=${values.email}`);
      } else {
        message.error("Something went wrong. Please try again.");
      }
    } catch (error) {
      console.error("Error:", error);
      message.error("Failed to send OTP. Please check the email address.");
    }
  };

  return (
    <div>
      <div className="text-center mb-8">
        <h1 className="text-[25px] font-semibold mb-6">Forgot Password</h1>
        <p className="w-[90%] mx-auto text-base">
          Enter your email below to reset your password
        </p>
      </div>

      <ConfigProvider
        theme={{
          components: {
            Form: {
              labelColor: "black",
            },
          },
        }}
      >
        <Form layout="vertical" onFinish={onFinish}>
          <Form.Item
            label={<p className="text-base font-normal">Email</p>}
            name="email"
            id="email"
            rules={[
              {
                required: true,
                message: "Please input your email!",
              },
              {
                type: "email",
                message: "Please enter a valid email address!",
              },
            ]}
          >
            <Input
              placeholder="Enter your email address"
              style={{
                height: 45,
                border: "1px solid #d9d9d9",
                outline: "none",
                boxShadow: "none",
              }}
            />
          </Form.Item>

          <Form.Item>
            <button
              htmlType="submit"
              type="submit"
              disabled={isLoading}
              style={{
                width: "100%",
                height: 45,
                color: "white",
                fontWeight: "400px",
                fontSize: "18px",
                marginTop: 20,
              }}
              className="flex items-center justify-center bg-smart rounded-lg hover:bg-smart/90"
            >
              {isLoading ? <Spinner label="Sending OTP..." /> : "Send OTP"}
            </button>
          </Form.Item>
        </Form>
      </ConfigProvider>
    </div>
  );
};

export default ForgotPassword;
