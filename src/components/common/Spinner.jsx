import { SyncOutlined } from "@ant-design/icons";

const Spinner = ({ label }) => {
  return (
    <div className="flex items-center gap-2">
      <SyncOutlined spin />
      <p className="text-[15px] text-white">{label}</p>
    </div>
  );
};

export default Spinner;
