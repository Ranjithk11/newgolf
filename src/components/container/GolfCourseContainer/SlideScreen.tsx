"use client";
import {
  Box,
  Typography,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Avatar,
  Divider,
  IconButton,
} from "@mui/material";
import SettingsIcon from "@mui/icons-material/Settings";
import NotificationsIcon from "@mui/icons-material/Notifications";
import FeedbackIcon from "@mui/icons-material/Feedback";
import LogoutIcon from "@mui/icons-material/Logout";
import DeleteIcon from "@mui/icons-material/Delete";
import CloseIcon from "@mui/icons-material/Close";

import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import { useState } from "react";

const SlideScreen = () => {
  const [openSettings, setOpenSettings] = useState(false);

  return (
    <Box
      sx={{
        height: "100vh",
        bgcolor: "#0e0e0e",
        color: "#fff",
        px: 2,
        py: 4,
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
      }}
    >
      <Box>
        {/* Profile Header */}
        <Box display="flex" alignItems="center" gap={2} mb={4}>
          <IconButton onClick={() => setOpenSettings(false)}>
            <CloseIcon sx={{ color: "#fff" }} />
          </IconButton>
          <Avatar sx={{ bgcolor: "purple", width: 56, height: 56 }}>V</Avatar>
          <Box>
            <Typography fontWeight="bold" fontSize="18px">
              Hey, Vivek
            </Typography>
            <Typography fontSize="14px" color="#aaa">
              Edit Profile
            </Typography>
          </Box>
        </Box>

        {/* Menu List */}
        <List>
          {[
            { icon: <SettingsIcon />, label: "Settings" },
            { icon: <NotificationsIcon />, label: "Notifications" },
            { icon: <FeedbackIcon />, label: "Share Feedback" },
            { icon: <LogoutIcon />, label: "Logout" },
          ].map((item, index) => (
            <ListItem
              key={index}
              sx={{
                color: "#fff",
                py: 1,
                "&:hover": { bgcolor: "#1c1c1c", borderRadius: 2 },
              }}
              secondaryAction={
                <ArrowForwardIosIcon sx={{ fontSize: 14, color: "#888" }} />
              }
            >
              <ListItemIcon sx={{ color: "#fff", minWidth: 36 }}>
                {item.icon}
              </ListItemIcon>
              <ListItemText primary={item.label} />
            </ListItem>
          ))}

          {/* Delete my data */}
          <ListItem
            sx={{
              color: "#ff4d4f",
              py: 1,
              "&:hover": { bgcolor: "#1c1c1c", borderRadius: 2 },
            }}
            secondaryAction={
              <ArrowForwardIosIcon sx={{ fontSize: 14, color: "#888" }} />
            }
          >
            <ListItemIcon sx={{ color: "#ff4d4f", minWidth: 36 }}>
              <DeleteIcon />
            </ListItemIcon>
            <ListItemText primary="Delete my data" />
          </ListItem>
        </List>
      </Box>

      {/* Bottom Nav */}
      <Box
        sx={{
          bgcolor: "#161616",
          py: 1.5,
          borderRadius: 2,
          textAlign: "center",
        }}
      >
        <Typography color="#aaa">Navigation Bar</Typography>
      </Box>
    </Box>
  );
};

export default SlideScreen;
