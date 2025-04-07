// import React, { useState } from "react";
// import { Button, Radio, Form, Input, Upload, message } from "antd";
// import { InboxOutlined } from "@ant-design/icons";

// const { Dragger } = Upload;

// const beforeUpload = (file) => {
//   const isImage =
//     file.type === "image/jpeg" ||
//     file.type === "image/png" ||
//     file.type === "image/jpg";
//   if (!isImage) {
//     message.error("You can only upload JPG/PNG/JPEG files!");
//   }
//   const isLt2M = file.size / 1024 / 1024 < 2;
//   if (!isLt2M) {
//     message.error("Image must be smaller than 2MB!");
//   }
//   return isImage && isLt2M;
// };

// const CategorySubcategoryForm = ({ isSelected }) => {
//   const [categoryDetails, setCategoryDetails] = useState({
//     categoryName: "",
//     categoryDesc: "",
//     imageUrl: "",
//     currentStatus: 1,
//   });

//   const handleInputChange = (field) => (e) => {
//     setCategoryDetails({
//       ...categoryDetails,
//       [field]: e.target.value,
//     });
//   };

//   const handleStatusChange = (e) => {
//     setCategoryDetails({
//       ...categoryDetails,
//       currentStatus: e.target.value,
//     });
//   };

//   const handleImageUpload = (file) => {
//     return false; // Disable auto upload, and handle manually
//   };

//   const handleImageChange = (info) => {
//     if (info.fileList.length > 0) {
//       const file = info.fileList[0].originFileObj;
//       const fileUrl = URL.createObjectURL(file);
//       setCategoryDetails({
//         ...categoryDetails,
//         imageUrl: fileUrl,
//       });
//     }
//   };

//   return (
//     <div className="w-full flex gap-4">
//       <div className="w-2/3 mt-4">
//         <Form name="basic" autoComplete="on" layout="vertical">
//           {isSelected === "Sub Category" && (
//             <Form.Item
//               label="Select Parent Category"
//               name="parentCategory"
//               rules={[{ required: true, message: "Please select a Category!" }]}
//             >
//               <Input onChange={handleInputChange("parentCategory")} />
//             </Form.Item>
//           )}

//           <Form.Item
//             label="Category Name"
//             name="categoryName"
//             rules={[
//               { required: true, message: "Please input a Category Name!" },
//             ]}
//           >
//             <Input onChange={handleInputChange("categoryName")} />
//           </Form.Item>

//           <Form.Item
//             label="Upload Image"
//             name="image"
//             valuePropName="fileList"
//             getValueFromEvent={(e) => (Array.isArray(e) ? e : e && e.fileList)}
//             rules={[{ required: true, message: "Please upload an image!" }]}
//           >
//             <Upload
//               listType="picture"
//               maxCount={1}
//               beforeUpload={beforeUpload}
//               accept=".png,.jpg,.jpeg"
//               customRequest={({ file, onSuccess }) => {
//                 // Simulate success
//                 setTimeout(() => onSuccess("ok"), 0);
//               }}
//               onChange={handleImageChange}
//             >
//               <Button icon={<InboxOutlined />}>Click to Upload</Button>
//             </Upload>
//           </Form.Item>

//           <Form.Item
//             label="Category Description"
//             name="categoryDesc"
//             rules={[
//               {
//                 required: true,
//                 message: "Please input a Category Description!",
//               },
//             ]}
//           >
//             <Input.TextArea
//               style={{ maxHeight: "150px", overflow: "auto" }}
//               onChange={handleInputChange("categoryDesc")}
//             />
//           </Form.Item>

//           <Form.Item
//             label="Status"
//             name="currentStatus"
//             rules={[{ required: true, message: "Please add Status!" }]}
//           >
//             <Radio.Group
//               name="radiogroup"
//               value={categoryDetails.currentStatus}
//               onChange={handleStatusChange}
//               options={[
//                 { value: 1, label: "Active" },
//                 { value: 2, label: "Deactive" },
//               ]}
//             />
//           </Form.Item>

//           <Form.Item>
//             <Button type="primary" htmlType="submit">
//               Submit
//             </Button>
//           </Form.Item>
//         </Form>
//       </div>

//       {/* Right Side Container with Fixed Width */}
//       <div
//         className="w-1/3 h-fit mx-auto mt-4 "
//         style={{ maxWidth: "400px", overflow: "hidden" }}
//       >
//         <div className="border-2 rounded-lg border-green-700 p-4 flex flex-col gap-4">
//           <p>
//             Status:{" "}
//             {categoryDetails.currentStatus === 1 ? "Active" : "Deactive"}
//           </p>
//           <p>Category Name: {categoryDetails.categoryName}</p>
//           <div className="w-40 h-auto">
//             <p>Category Image</p>
//             {categoryDetails.imageUrl && (
//               <img src={categoryDetails.imageUrl} alt="Uploaded" width="50%" />
//             )}
//           </div>{" "}
//           <p>Category Description:</p>
//           <div className="overflow-auto h-20 flex flex-col">
//             <p>{categoryDetails.categoryDesc}</p>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default CategorySubcategoryForm;

import React, { useState } from "react";
import { Button, Radio, Form, Input, Upload, message } from "antd";
import { InboxOutlined } from "@ant-design/icons";

const { Dragger } = Upload;

const beforeUpload = (file) => {
  const isImage =
    file.type === "image/jpeg" ||
    file.type === "image/png" ||
    file.type === "image/jpg";
  if (!isImage) {
    message.error("You can only upload JPG/PNG/JPEG files!");
  }
  const isLt2M = file.size / 1024 / 1024 < 2;
  if (!isLt2M) {
    message.error("Image must be smaller than 2MB!");
  }
  return isImage && isLt2M;
};

const CategorySubcategoryForm = ({ isSelected }) => {
  const [categoryDetails, setCategoryDetails] = useState({
    categoryName: "",
    categoryDesc: "",
    imageUrl: "",
    currentStatus: 1,
    parentCategory: "",
  });

  const handleInputChange = (field) => (e) => {
    setCategoryDetails({
      ...categoryDetails,
      [field]: e.target.value,
    });
  };

  const handleStatusChange = (e) => {
    setCategoryDetails({
      ...categoryDetails,
      currentStatus: e.target.value,
    });
  };

  const handleImageUpload = (file) => {
    return false; // Disable auto upload, and handle manually
  };

  const handleImageChange = (info) => {
    if (info.fileList.length > 0) {
      const file = info.fileList[0].originFileObj;
      const fileUrl = URL.createObjectURL(file);
      setCategoryDetails({
        ...categoryDetails,
        imageUrl: fileUrl,
      });
    }
  };

  return (
    <div className="w-full flex gap-4">
      <div className="w-2/3 mt-4">
        <Form name="basic" autoComplete="on" layout="vertical">
          {/* Conditionally render parent category field for Subcategory */}
          {isSelected === "Sub Category" && (
            <Form.Item
              label="Select Parent Category"
              name="parentCategory"
              rules={[
                { required: true, message: "Please select a Parent Category!" },
              ]}
            >
              <Input onChange={handleInputChange("parentCategory")} />
            </Form.Item>
          )}

          {/* Category Name or Subcategory Name */}
          <Form.Item
            label={
              isSelected === "Category" ? "Category Name" : "Subcategory Name"
            }
            name={
              isSelected === "Category" ? "categoryName" : "subCategoryName"
            }
            rules={[
              {
                required: true,
                message: `Please input a ${
                  isSelected === "Category" ? "Category" : "Subcategory"
                } Name!`,
              },
            ]}
          >
            <Input
              onChange={handleInputChange(
                isSelected === "Category" ? "categoryName" : "subCategoryName"
              )}
            />
          </Form.Item>

          {/* Upload Image */}
          <Form.Item
            label="Upload Image"
            name="image"
            valuePropName="fileList"
            getValueFromEvent={(e) => (Array.isArray(e) ? e : e && e.fileList)}
            rules={[{ required: true, message: "Please upload an image!" }]}
          >
            <Upload
              listType="picture"
              maxCount={1}
              beforeUpload={beforeUpload}
              accept=".png,.jpg,.jpeg"
              customRequest={({ file, onSuccess }) => {
                // Simulate success
                setTimeout(() => onSuccess("ok"), 0);
              }}
              onChange={handleImageChange}
            >
              <Button icon={<InboxOutlined />}>Click to Upload</Button>
            </Upload>
          </Form.Item>

          {/* Category Description or Subcategory Description */}
          <Form.Item
            label={
              isSelected === "Category"
                ? "Category Description"
                : "Subcategory Description"
            }
            name={
              isSelected === "Category" ? "categoryDesc" : "subCategoryDesc"
            }
            rules={[
              {
                required: true,
                message: `Please input a ${
                  isSelected === "Category" ? "Category" : "Subcategory"
                } Description!`,
              },
            ]}
          >
            <Input.TextArea
              style={{ maxHeight: "150px", overflow: "auto" }}
              onChange={handleInputChange(
                isSelected === "Category" ? "categoryDesc" : "subCategoryDesc"
              )}
            />
          </Form.Item>

          {/* Status */}
          <Form.Item
            label="Status"
            name="currentStatus"
            rules={[{ required: true, message: "Please add Status!" }]}
          >
            <Radio.Group
              name="radiogroup"
              value={categoryDetails.currentStatus}
              onChange={handleStatusChange}
              options={[
                { value: 1, label: "Active" },
                { value: 2, label: "Deactive" },
              ]}
            />
          </Form.Item>

          <Form.Item>
            <Button type="primary" htmlType="submit">
              Submit
            </Button>
          </Form.Item>
        </Form>
      </div>

      {/* Right Side Container with Fixed Width */}
      <div
        className="w-1/3 h-fit mx-auto mt-4"
        style={{ maxWidth: "400px", overflow: "hidden" }}
      >
        <div className="border-2 rounded-lg border-green-700 p-4 flex flex-col gap-4">
          <p>
            Status:{" "}
            {categoryDetails.currentStatus === 1 ? "Active" : "Deactive"}
          </p>
          <p>
            {isSelected === "Category" ? "Category Name" : "Subcategory Name"}:{" "}
            {
              categoryDetails[
                isSelected === "Category" ? "categoryName" : "subCategoryName"
              ]
            }
          </p>
          <div className="w-40 h-auto">
            <p>Category Image</p>
            {categoryDetails.imageUrl && (
              <img src={categoryDetails.imageUrl} alt="Uploaded" width="50%" />
            )}
          </div>
          <p>
            {isSelected === "Category"
              ? "Category Description"
              : "Subcategory Description"}
            :
          </p>
          <div className="overflow-auto h-20 flex flex-col">
            <p>
              {
                categoryDetails[
                  isSelected === "Category" ? "categoryDesc" : "subCategoryDesc"
                ]
              }
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CategorySubcategoryForm;
