import { Button, Form, message, Typography } from "antd";
import React, { useState } from "react";
import OTPInput from "react-otp-input";
import { useNavigate } from "react-router-dom";
import {
  useForgotPasswordMutation,
  useOtpVerifyMutation,
} from "../../redux/apiSlices/authApi";
import Spinner from "../../components/common/Spinner";
const { Text } = Typography;

const VerifyOtp = () => {
  const navigate = useNavigate();
  const [otp, setOtp] = useState("");
  const email = new URLSearchParams(location.search).get("email");
  const [verifyOTP, { isLoading }] = useOtpVerifyMutation();
  const [forgotPassword, { isLoading: isResending }] =
    useForgotPasswordMutation();

  const onFinish = async () => {
    if (!otp || otp.length !== 4) {
      message.error("Please enter a valid 4-digit OTP");
      return;
    }

    try {
      // Convert otp to number as the API expects
      const numericOtp = parseInt(otp, 10);

      const res = await verifyOTP({
        email: email,
        oneTimeCode: numericOtp, // Send as number, not string
      }).unwrap();

      console.log("OTP Verification Response:", res?.data);
      if (res?.success === true) {
        message.success("OTP verified successfully");
        localStorage.setItem("otpSuccessToken", res?.data);
        navigate(`/auth/reset-password?email=${email}`);
      }
    } catch (error) {
      console.error("Verification error:", error);
      message.error(
        error?.data?.message || "Failed to verify OTP. Please try again."
      );
    }
  };

  const handleResendEmail = async () => {
    if (!email) {
      console.error("Email is missing. Cannot resend OTP.");
      message.error("Email not found. Please try again.");
      return;
    }

    try {
      const resendOTP = await forgotPassword({ email }).unwrap();
      console.log("OTP Resent Successfully");
      console.log("Resend OTP Response:", resendOTP);
      message.success("OTP resent to your email.");
    } catch (err) {
      console.error("OTP Resend Failed:", err);
      message.error(err?.data?.message || "Failed to resend OTP");
    }
  };

  return (
    <div>
      <div className="text-center mb-6">
        <h1 className="text-[25px] font-semibold mb-6">Verify OTP</h1>
        <p className="w-[80%] mx-auto">
          We've sent a verification code to your email. Check your inbox and
          enter the code here.
        </p>
      </div>

      <Form layout="vertical" onFinish={onFinish}>
        <div className="flex items-center justify-center mb-6">
          <OTPInput
            value={otp}
            onChange={setOtp}
            numInputs={4}
            inputStyle={{
              height: 50,
              width: 50,
              borderRadius: "8px",
              margin: "16px",
              fontSize: "20px",
              border: "2px solid #0100fa",
              color: "#0100fa",
              outline: "none",
              marginBottom: 10,
            }}
            renderInput={(props) => <input {...props} />}
          />
        </div>

        <div className="flex items-center justify-between mb-6">
          <Text>Didn't receive code?</Text>

          <p
            onClick={handleResendEmail}
            className="login-form-forgot text-smart font-medium cursor-pointer"
            style={{ opacity: isResending ? 0.7 : 1 }}
          >
            {isResending ? "Sending..." : "Resend"}
          </p>
        </div>

        <Form.Item style={{ marginBottom: 0 }}>
          <Button
            htmlType="submit"
            loading={isLoading}
            style={{
              height: 45,
            }}
            className="w-full bg-smart text-[18px] border-none text-white outline-none"
          >
            {isLoading ? <Spinner label="Verifying OTP..." /> : "Verify"}
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
};

export default VerifyOtp;
