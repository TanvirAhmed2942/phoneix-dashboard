import React, { useState, useRef } from "react";
import {
  Table,
  ConfigProvider,
  Modal,
  Form,
  Input,
  message,
  Button,
} from "antd";
import {
  PlusOutlined,
  CloudUploadOutlined,
  CloseCircleOutlined,
} from "@ant-design/icons";
import { FiEdit2 } from "react-icons/fi";
import { RiDeleteBin6Line } from "react-icons/ri";
import ButtonEDU from "../../../components/common/ButtonEDU";
import GetPageName from "../../../components/common/GetPageName";

import comic from "../../../assets/comic.jpg";
import travel from "../../../assets/travel.jpeg";
import man from "../../../assets/man.png";

function Announcement() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [form] = Form.useForm();
  const [uploadedImage, setUploadedImage] = useState(null);
  const [editingKey, setEditingKey] = useState(null);
  const fileInputRef = useRef(null);
  const [tableData, setTableData] = useState([
    {
      key: "1",
      announcementTitle: "Comic Announcement",
      announcementDescription: "A fun comic-style post",
      serial: 1,
      announcementImg: comic,
      status: "Active",
    },
    {
      key: "2",
      announcementTitle: "Travel Announcement",
      announcementDescription: "Pack your bags, adventure awaits!",
      serial: 2,
      announcementImg: travel,
      status: "Inactive",
    },
    {
      key: "3",
      announcementTitle: "Man Announcement",
      announcementDescription: "Man of the year spotted!",
      serial: 3,
      announcementImg: man,
      status: "Active",
    },
  ]);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [deletingRecord, setDeletingRecord] = useState(null);

  const showModal = () => {
    setIsEditing(false);
    form.resetFields();
    setUploadedImage(null);
    setIsModalOpen(true);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
    form.resetFields();
    setUploadedImage(null);
    setEditingKey(null);
  };

  const handleFormSubmit = (values) => {
    if (!uploadedImage && !isEditing) {
      message.error("Please upload an image!");
      return;
    }

    const newData = {
      key: isEditing ? editingKey : (tableData.length + 1).toString(),
      serial: isEditing
        ? tableData.find((item) => item.key === editingKey).serial
        : tableData.length + 1,
      announcementTitle: values.announcementTitle,
      announcementDescription: values.announcementDescription,
      announcementImg:
        uploadedImage ||
        tableData.find((item) => item.key === editingKey)?.announcementImg,
      status: isEditing
        ? tableData.find((item) => item.key === editingKey)?.status
        : "Inactive",
    };

    const updatedData = isEditing
      ? tableData.map((item) =>
          item.key === editingKey ? { ...item, ...newData } : item
        )
      : [...tableData, newData];

    setTableData(updatedData);
    message.success(
      isEditing ? "Announcement updated!" : "Announcement added!"
    );
    handleCancel();
  };

  // Direct file input handler
  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const isImage = file.type.startsWith("image/");
    if (!isImage) {
      message.error("You can only upload image files!");
      return;
    }

    const reader = new FileReader();
    reader.onloadend = () => {
      setUploadedImage(reader.result);
    };
    reader.readAsDataURL(file);
  };

  const triggerFileInput = () => {
    fileInputRef.current.click();
  };

  const handleEdit = (record) => {
    setIsEditing(true);
    setEditingKey(record.key);
    setUploadedImage(record.announcementImg);
    form.setFieldsValue({
      announcementTitle: record.announcementTitle,
      announcementDescription: record.announcementDescription,
    });
    setIsModalOpen(true);
  };

  const handleDelete = (key, title) => {
    setDeletingRecord({ key, title });
    setIsDeleteModalOpen(true);
  };

  const onConfirmDelete = () => {
    setTableData(tableData.filter((item) => item.key !== deletingRecord.key));
    message.success("Announcement deleted!");
    setIsDeleteModalOpen(false);
  };

  const onCancelDelete = () => {
    setIsDeleteModalOpen(false);
  };

  const toggleStatus = (key) => {
    const updatedData = tableData.map((item) =>
      item.key === key
        ? { ...item, status: item.status === "Active" ? "Inactive" : "Active" }
        : item
    );
    setTableData(updatedData);
  };

  const columns = [
    {
      title: "Sl",
      dataIndex: "serial",
      key: "serial",
      render: (serial) => (
        <span className="text-black text-[16px]">
          {serial < 10 ? "0" + serial : serial}
        </span>
      ),
    },
    {
      title: "Image",
      dataIndex: "announcementImg",
      key: "announcementImg",
      render: (img) => <img src={img} alt="img" width={60} />,
    },
    {
      title: "Title",
      dataIndex: "announcementTitle",
      key: "announcementTitle",
    },
    {
      title: "Description",
      dataIndex: "announcementDescription",
      key: "announcementDescription",
    },
    {
      title: "Status",
      dataIndex: "status",
      key: "status",
      render: (status, record) => (
        <span
          className={`cursor-pointer font-semibold text-[16px] ${
            status === "Active" ? "text-green-500" : "text-red-500"
          }`}
          onClick={() => toggleStatus(record.key)}
        >
          <div className="w-fit border rounded-full px-2 py-.5">{status}</div>
        </span>
      ),
    },
    {
      title: "Actions",
      key: "actions",
      render: (_, record) => (
        <div className="flex gap-4">
          <FiEdit2
            className="text-black hover:text-blue-500 cursor-pointer text-[20px]"
            onClick={() => handleEdit(record)}
          />
          <RiDeleteBin6Line
            className="text-black hover:text-red-500 cursor-pointer text-[20px]"
            onClick={() => handleDelete(record.key, record.announcementTitle)}
          />
        </div>
      ),
    },
  ];

  return (
    <ConfigProvider
      theme={{
        components: {
          Table: { rowSelectedBg: "#f6f6f6", headerBg: "#f6f6f6" },
        },
      }}
    >
      <div className="py-5">
        <div className="flex justify-between items-center py-5">
          <h1 className="text-[20px] font-medium">{GetPageName()}</h1>
          <Button
            icon={<PlusOutlined />}
            className="bg-smart text-white px-4 py-2 rounded"
            onClick={showModal}
          >
            Add New
          </Button>
        </div>

        <Table
          columns={columns}
          dataSource={tableData}
          pagination={{
            pageSize: 5,
            position: ["bottomCenter"],
          }}
        />

        {/* Delete Confirmation Modal */}
        <Modal
          title="Delete Confirmation"
          open={isDeleteModalOpen}
          onCancel={onCancelDelete}
          footer={null}
          centered
        >
          <p className="text-center">
            Are you sure you want to delete{" "}
            <strong>{deletingRecord?.title}</strong>?
          </p>
          <div className="flex justify-center gap-4 mt-5">
            <ButtonEDU actionType="cancel" onClick={onCancelDelete}>
              Cancel
            </ButtonEDU>
            <ButtonEDU actionType="delete" onClick={onConfirmDelete}>
              Delete
            </ButtonEDU>
          </div>
        </Modal>

        {/* Add/Edit Modal */}
        <Modal
          title={isEditing ? "Edit Announcement" : "Add Announcement"}
          open={isModalOpen}
          onCancel={handleCancel}
          footer={null}
          centered
        >
          <Form form={form} layout="vertical" onFinish={handleFormSubmit}>
            <Form.Item
              label="Announcement Title"
              name="announcementTitle"
              rules={[{ required: true, message: "Enter title" }]}
            >
              <Input placeholder="Title" />
            </Form.Item>
            <Form.Item
              label="Announcement Description"
              name="announcementDescription"
              rules={[{ required: true, message: "Enter description" }]}
            >
              <Input.TextArea rows={3} placeholder="Description" />
            </Form.Item>
            <Form.Item label="Upload Image">
              <input
                type="file"
                ref={fileInputRef}
                onChange={handleFileChange}
                accept="image/*"
                style={{ display: "none" }}
              />
              <Button icon={<CloudUploadOutlined />} onClick={triggerFileInput}>
                Upload
              </Button>
              {uploadedImage && (
                <div className="relative w-32 h-32 mt-2">
                  <img
                    src={uploadedImage}
                    alt="Preview"
                    className="w-full h-full object-cover rounded"
                  />
                  <CloseCircleOutlined
                    className="absolute top-0 right-0 text-red-500 text-xl cursor-pointer bg-white rounded-full"
                    onClick={() => setUploadedImage(null)}
                  />
                </div>
              )}
            </Form.Item>
            <Form.Item>
              <Button
                htmlType="submit"
                className="bg-smart text-white w-full"
                size="large"
              >
                {isEditing ? "Update" : "Add"}
              </Button>
            </Form.Item>
          </Form>
        </Modal>
      </div>
    </ConfigProvider>
  );
}

export default Announcement;
