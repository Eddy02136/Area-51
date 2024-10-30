import React, { useState } from "react";
import { Modal, Select, Input, Button, message } from "antd";
import axios from "axios";
import "./UpdateProfileDialog.css";

const { Option } = Select;

const UpdateProfileDialog = ({ visible, onClose }) => {
  const [selectedField, setSelectedField] = useState("email");
  const [inputValue, setInputValue] = useState("");
  const [loading, setLoading] = useState(false);

  const handleUpdate = async () => {
    if (!inputValue) {
      message.error("Please enter a value to update.");
      return;
    }

    setLoading(true);
    try {
      const authToken = localStorage.getItem("authToken");
      await axios.put(
        "http://localhost:3000/users/update",
        { [selectedField]: inputValue },
        {
          headers: {
            Authorization: `Bearer ${authToken}`,
          },
        }
      );
      message.success("Profile updated successfully!");
      handleClose();
    } catch (error) {
      message.error("Failed to update profile.");
    } finally {
      setLoading(false);
    }
  };

  const handleClose = () => {
    onClose();
    window.location.reload();
  };

  return (
    <Modal
      title="Update Profile"
      visible={visible}
      onCancel={handleClose}
      footer={null}
      centered
    >
      <div style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
        <Select
          defaultValue="email"
          style={{ width: "100%" }}
          onChange={(value) => setSelectedField(value)}
        >
          <Option value="email">Email</Option>
          <Option value="firstname">Firstname</Option>
          <Option value="lastname">Lastname</Option>
        </Select>
        <Input
          placeholder={`Enter new ${selectedField}`}
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
        />
        <div style={{ display: "flex", justifyContent: "space-between" }}>
          <button className="update-profile-close-button" onClick={handleClose}>
            Close
          </button>
          <button
            className="update-profile-update-button"
            type="primary"
            loading={loading}
            onClick={handleUpdate}
          >
            Update
          </button>
        </div>
      </div>
    </Modal>
  );
};

export default UpdateProfileDialog;
