import React, { useEffect, useState } from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import {
  Chip,
  Input,
  InputLabel,
  MenuItem,
  OutlinedInput,
  Select,
  TextField,
  useTheme,
} from "@mui/material";
import Style from "./Modal.module.css";
import { create_group, fetch_group_details, fetch_users_for_group, update_group_details } from "@/controllers/message";
const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
};

export default function BasicModal({
  open,
  setOpen,
  isEditable,
  setIsEditable,
  chat_id,
  run,
  setRun,
}) {
  //   const [open, setOpen] = useState(false);
  //   const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const theme = useTheme();

  const [details, setDetails] = useState({
    group_name: "",
  });

  const [search, setSearch] = useState("");
  const [users, setUsers] = useState([]);
  const [error, setError] = useState("");
  const [selectedUsers, setSelectedUsers] = useState([]);
  const [filteredUsers, setFilteredUsers] = useState([]);

  function getStyles(name, personName, theme) {
    return {
      fontWeight:
        selectedUsers.indexOf(name) === -1
          ? theme.typography.fontWeightRegular
          : theme.typography.fontWeightMedium,
    };
  }

  useEffect(() => {
    fetch_group_details(chat_id).then((res) => {
      if (res?.error) {
        setError(res?.error);
      } else if (res?.data) {
        setDetails({
          group_name: res?.data?.groupName,
        });
        setSelectedUsers(res?.data?.memberData);
      }
    });
  }, [chat_id]);

  useEffect(() => {
    fetch_users_for_group().then((res) => {
      if (res?.error) {
        setError(res?.error);
      } else if (res?.data) {
        setUsers(res?.data);
      }
    });
  }, [chat_id]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;

    setDetails((prev) => {
      return {
        ...prev,
        [name]: value,
      };
    });
  };

  const handleChange = (event) => {
    const {
      target: { value },
    } = event;
    setSelectedUsers(
      // On autofill we get a stringified value.
      typeof value === "string" ? value.split(",") : value
    );
  };

  const handleSearch = (e) => {
    const value = e.target.value;
    setSearch(value);

    if (!value) {
      setFilteredUsers(users);
    }
    if (value) {
      const filteredData = users.filter((user) =>
        user?.name?.toLowerCase().includes(value.toLowerCase())
      );

      setFilteredUsers(filteredData);
    }
  };

  const createGroup = () => {
    const data_to_send = {
      selectedUsers: selectedUsers,
      groupName: details?.group_name,
    };
    create_group(data_to_send).then((res) => {
      if (res.error) {
        setError("");
      } else {
        setRun(!run)
        setOpen(false);
      }
    });
  };

  const updateGroupDetails = () => {
    const data_to_send = {
      selectedUsers: selectedUsers,
      groupName: details?.group_name,
    };

    update_group_details(chat_id, data_to_send).then((res) => {
      if (res.error) {
        setError("");
      } else {
        setRun(!run);
        setOpen(false);
      }
    });
  };

  const getLabelName = (id) => {
    const user = users.find((user) => id === user.id);

    return user?.name;
  };
  return (
    <div>
      {/* <Button onClick={handleOpen}>Open modal</Button> */}
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <p
            style={{
              marginTop: 0,
              textAlign: "center",
              fontSize: "1.5rem",
              marginBottom: "30px",
            }}
          >
            Create Group
          </p>

          <div
            style={{ display: "flex", flexDirection: "column", gap: "30px" }}
          >
            <label className={Style.label}>
              Enter Group Name:
              <input
                className={Style.input}
                onChange={handleInputChange}
                name="group_name"
                value={details?.group_name}
                type="text"
                style={{ width: "380px" }}
              />
            </label>

            <div
              style={{ display: "flex", gap: "2px", flexDirection: "column" }}
            >
              <label className={Style.label}>
                Select Users:
                <Select
                  labelId="demo-multiple-chip-label"
                  id="demo-multiple-chip"
                  multiple
                  value={selectedUsers}
                  onChange={handleChange}
                  renderValue={(users) => (
                    <Box sx={{ display: "flex", flexWrap: "wrap", gap: 0.5 }}>
                      {users.map((id) => (
                        <Chip key={id} label={getLabelName(id)} />
                      ))}
                    </Box>
                  )}
                >
                  {users.map(({ name, id }) => (
                    <MenuItem
                      key={name}
                      value={id}
                      style={getStyles(name, selectedUsers, theme)}
                    >
                      {name}
                    </MenuItem>
                  ))}
                </Select>
              </label>
            </div>
            {isEditable && (
              <Button onClick={updateGroupDetails} variant="contained">
                Edit Group
              </Button>
            )}
            {!isEditable && (
              <Button onClick={createGroup} variant="contained">
                Create Group
              </Button>
            )}
          </div>
        </Box>
      </Modal>
    </div>
  );
}
