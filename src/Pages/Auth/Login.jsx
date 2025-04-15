import { Checkbox, Form, Input, message } from "antd";
import React from "react";
import { useNavigate } from "react-router-dom";
import { useLoginMutation } from "../../redux/apiSlices/authApi";
import Spinner from "../../components/common/Spinner";
// import Cookies from "js-cookie";

const Login = () => {
  const navigate = useNavigate();
  const [login, { isLoading }] = useLoginMutation();

  const onFinish = async (values) => {
    try {
      const res = await login(values).unwrap();

      // Assuming the response contains a token and user info
      // const { accessToken, user } = res;
      console.log("Login response:", res?.data?.accessToken);
      console.log("Login response:", res);

      localStorage.setItem("accessToken", res?.data?.accessToken);

      // Show success message
      message.success("Login successful!");

      // Navigate to dashboard or desired page
      navigate("/");
    } catch (error) {
      console.error("Login failed:", error);
      message.error(error);
    }
  };

  return (
    <div>
      <div className="text-center mb-8">
        <h1 className="text-[25px] font-semibold mb-6">Login</h1>
        <p>Please enter your email and password to continue</p>
      </div>
      <Form onFinish={onFinish} layout="vertical">
        <Form.Item
          name="email"
          label={
            <p className="text-black font-normal text-base">Enter Your Email</p>
          }
          rules={[
            {
              required: true,
              message: `Please enter your email`,
            },
          ]}
        >
          <Input
            placeholder={`Enter your email`}
            style={{
              height: 45,
              border: "1px solid #d9d9d9",
              outline: "none",
              boxShadow: "none",
            }}
          />
        </Form.Item>

        <Form.Item
          name="password"
          label={<p className="text-black font-normal text-base">Password</p>}
          rules={[
            {
              required: true,
              message: "Please input your password!",
            },
          ]}
        >
          <Input.Password
            placeholder="Enter your password"
            style={{
              height: 45,
              border: "1px solid #d9d9d9",
              outline: "none",
              boxShadow: "none",
            }}
          />
        </Form.Item>

        <div className="flex items-center justify-between">
          <Form.Item
            style={{ marginBottom: 0 }}
            name="remember"
            valuePropName="checked"
          >
            <Checkbox>Remember me</Checkbox>
          </Form.Item>

          <a
            className="login-form-forgot text-smart/80 hover:text-smart font-semibold"
            href="/auth/forgot-password"
          >
            Forgot password
          </a>
        </div>

        <Form.Item style={{ marginBottom: 0 }}>
          <button
            htmlType="submit"
            type="submit"
            disabled={isLoading}
            style={{
              width: "100%",
              height: 47,
              color: "white",
              fontWeight: "400px",
              fontSize: "18px",
              marginTop: 20,
            }}
            className="flex items-center justify-center bg-smart hover:bg-smart/90 rounded-lg text-base"
          >
            {isLoading ? <Spinner label="Signing in..." /> : "Sign in"}
          </button>
        </Form.Item>
      </Form>
    </div>
  );
};

export default Login;
