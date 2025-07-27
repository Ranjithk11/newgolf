"use client";
import React, { useEffect, useState } from "react";
import {
  Box,
  Typography,
  IconButton,
  Button,
  Drawer,
  Divider,
  ListItem,
  List,
  Avatar,
  ListItemIcon,
  ListItemText,
  Grid,
} from "@mui/material";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import SettingsIcon from "@mui/icons-material/Settings";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import CloseIcon from "@mui/icons-material/Close";
import { useRouter } from "next/navigation";
import { useLazyGetAllGolfCoursesQuery } from "../../../../lib/redux/golfCourseApi/golfCourseApi";
import { useSession } from "next-auth/react";
import NotificationsIcon from "@mui/icons-material/Notifications";
import WaterDropIcon from "@mui/icons-material/WaterDrop";
import AirIcon from "@mui/icons-material/Air";

import FeedbackIcon from "@mui/icons-material/Feedback";
import LogoutIcon from "@mui/icons-material/Logout";
import DeleteIcon from "@mui/icons-material/Delete";
import SlideScreen from "./SlideScreen";
import EditProfileScreen from "./EditProfileScreen";
import CurrentSessionCard from "./currentSession";

const HomeScreen = () => {
  const { data: session } = useSession();
  const [userName, setUserName] = useState("");
  const [getCourses, { data: courseData }] = useLazyGetAllGolfCoursesQuery();
  const [openSettings, setOpenSettings] = useState(false);
  const [openEditProfile, setOpenEditProfile] = useState(false);

  const router = useRouter();

  useEffect(() => {
    if (session?.user?.email) {
      setUserName(session.user.email);
    }
    getCourses({
      latitude: "25.7163907",
      longitude: "-80.1618256",
      miles: "10",
    });
  }, [session]);

  const renderCourseCard = (course: any, index: number) => (
    <Box key={index} sx={{ minWidth: 150 }}>
      <Box
        onClick={() =>
          router.push(
            `/CourseDetails?latitude=${course?.latitude}&longitude=${course?.longitude}&club_name=${course.club_name}&place_id=${course.place_id}`
          )
        }
        sx={{
          height: 200,
          borderRadius: 2,
          backgroundImage: `url('${
            course?.image || "/images/golfCourse.jpg"
          }')`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          cursor: "pointer",
        }}
      />
      <Typography
        variant="caption"
        sx={{ pt: 1, color: "#ccc", fontWeight: 500 }}
      >
        {course.club_name}
      </Typography>
    </Box>
  );

  const SettingsScreen = () => (
    <Box
      sx={{ p: 4, minWidth: 300, backgroundColor: "#1a1a1a", height: "100%" }}
    >
      <Box>
        {/* Profile Header */}
        <Box display="flex" alignItems="center" gap={2} mb={4} mt={5}>
          <Avatar sx={{ bgcolor: "purple", width: 60, height: 60 }}>V</Avatar>
          <Box>
            <Typography fontWeight="bold" fontSize="18px">
              Hey, {userName}
            </Typography>
            <Typography
              fontSize="14px"
              color="#00e676"
              sx={{ cursor: "pointer", textDecoration: "underline" }}
              onClick={() => {
                setOpenEditProfile(true);
              }}
            >
              Edit Profile
            </Typography>
          </Box>
          <IconButton onClick={() => setOpenSettings(false)}>
            <CloseIcon sx={{ color: "#fff" }} />
          </IconButton>
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
    </Box>
  );

  return (
    <>
      <Box
        sx={{ backgroundColor: "#0f0f0f", minHeight: "100vh", color: "#fff" }}
      >
        {/* Top Header */}
        <Box
          sx={{
            backgroundColor: "#000000",
            borderBottomLeftRadius: 18,
            borderBottomRightRadius: 18,
            padding: "24px 20px 40px 20px",
          }}
        >
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
            }}
          >
            <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
              <img src="/images/logo.png" width={40} alt="Golf Go" />
              <Typography fontWeight="bold" variant="h6">
                Golf Go.
              </Typography>
            </Box>
            <IconButton onClick={() => setOpenSettings(true)}>
              <SettingsIcon sx={{ color: "#fff" }} />
            </IconButton>
          </Box>

          <Box sx={{ mt: 3 }}>
            <Typography variant="h6">
              Welcome,{" "}
              <Box
                component="span"
                sx={{
                  background: "linear-gradient(90deg, #0EA7D2, #18B73A)",
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                  fontWeight: 600,
                }}
              >
                {userName || "Mate"}
              </Box>
            </Typography>
            <Typography variant="body2" sx={{ color: "#b0b0b0" }}>
              Search maps based on distance, rating, length, etc. <br />
              <Box component="span" sx={{ color: "#FF7F00" }}>
                Smart practice begins here.
              </Box>
            </Typography>
          </Box>

          <Box
            sx={{
              mt: 2,
              display: "flex",
              alignItems: "center",
              gap: 5,
              backgroundColor: "#101518",
              borderRadius: 2,
            }}
          >
            <Button
              variant="contained"
              fullWidth
              disabled
              sx={{
                color: "#ffffff",
                backgroundColor: "#101518",
                "&.Mui-disabled": {
                  color: "#ffffff",
                  backgroundColor: "#101518",
                },
              }}
            >
              Start Playing
            </Button>
            <Button
              sx={{
                minWidth: "42px",
                height: "42px",
                backgroundColor: "#21e58e",
                color: "#ffff",
                borderRadius: 2,
                "&:hover": { backgroundColor: "#101518" },
              }}
            >
              <ArrowForwardIosIcon fontSize="small" />
            </Button>
          </Box>
        </Box>

        {/* Current Session */}
              <CurrentSessionCard/>

        {/* Popular Courses */}
        <Typography variant="subtitle1" sx={{ px: 2, pt: 3, fontWeight: 600 }}>
          Popular courses near you
        </Typography>
        <Box
          sx={{
            display: "flex",
            overflowX: "auto",
            padding: "10px 20px",
            gap: 2,
          }}
        >
          {courseData?.data?.map(renderCourseCard)}
        </Box>

        {/* Previous Sessions */}
        <Typography variant="subtitle1" sx={{ px: 2, pt: 3, fontWeight: 600 }}>
          Your Previous Sessions
        </Typography>
        <Box
          sx={{
            display: "flex",
            overflowX: "auto",
            padding: "10px 20px",
            gap: 2,
          }}
        >
          {courseData?.data?.map(renderCourseCard)}
        </Box>
      </Box>

      {/* Settings Drawer */}
      <Drawer
        anchor="right"
        open={openSettings}
        onClose={() => setOpenSettings(false)}
        PaperProps={{ sx: { backgroundColor: "#0f0f0f", color: "#fff" } }}
      >
        <SettingsScreen />
      </Drawer>
      <Drawer
        anchor="right"
        open={openEditProfile}
        onClose={() => setOpenEditProfile(false)}
        PaperProps={{
          sx: {
            backgroundColor: "#000",
            width: { xs: "100vw", sm: 450 }, // Adjust this as needed
          },
        }}
      >
        <EditProfileScreen onClose={() => setOpenEditProfile(false)} userId={""} />
      </Drawer>
    </>
  );
};

export default HomeScreen;
