import React, { useState, useEffect } from "react";
import { Modal, Input, Button, message } from "antd";
import axios from "axios";
import "./UpdateProfileDialog.css";

const UpdateProfileDialog = ({ visible, onClose, fieldToUpdate }) => {
  const [inputValue, setInputValue] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setInputValue("");
  }, [fieldToUpdate, visible]);

  const handleUpdate = async () => {
    if (!inputValue) {
      message.error(`Please enter a new ${fieldToUpdate}.`);
      return;
    }

    setLoading(true);
    try {
      const authToken = localStorage.getItem("authToken");
      await axios.put(
        "http://localhost:8080/users/update",
        { [fieldToUpdate]: inputValue },
        {
          headers: {
            Authorization: `Bearer ${authToken}`,
          },
        }
      );
      message.success(`${fieldToUpdate} updated successfully!`);
      handleClose();
    } catch (error) {
      message.error(`Failed to update ${fieldToUpdate}.`);
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
      title={`Update ${fieldToUpdate}`}
      visible={visible}
      onCancel={handleClose}
      footer={null}
      centered
    >
      <div style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
        <Input
          placeholder={`Enter new ${fieldToUpdate}`}
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
