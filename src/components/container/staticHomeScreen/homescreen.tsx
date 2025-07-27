"use client";
import React from "react";
import {
  Box,
  Typography,
  IconButton,
  Button,
  Card,
  CardContent,
} from "@mui/material";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import SettingsIcon from "@mui/icons-material/Settings";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";

const HomeScreen = () => {
  const userName = "Vivek";
  const courseNames = ["TPC Swagrass", "TPC Stonebrae", " TPC Craig Ranch", "TPC Scottsdale"];

  return (
    <Box
      sx={{
        backgroundColor: "#0f0f0f",
        minHeight: "100vh",
        color: "#fff",
      }}
    >
      {/* Top Section */}
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
          <IconButton>
            <SettingsIcon sx={{ color: "#fff" }} />
          </IconButton>
        </Box>

        <Box sx={{ mt: 3 }}>
          <Typography variant="h6">
            Welcome,{" "}
            <Box component="span" sx={{ color: "#A3DE53" }}>
              {userName}
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
              borderRadius:2,
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
              "&:hover": {
                backgroundColor: "#101518",
              },
            }}
          >
            <ArrowForwardIosIcon fontSize="small" />
          </Button>
        </Box>
      </Box>

      {/* Current Session */}
      <Box sx={{ px: 2, pt: 3 }}>
        <Typography
          variant="subtitle2"
          sx={{ fontWeight: 600, color: "#ffffff" }}
        >
          Current Session
        </Typography>
        <Typography variant="body2" sx={{ color: "gray" }}>
          Pickup where you left off
        </Typography>
      </Box>

      <Box
        sx={{
          background: "linear-gradient(90deg, #1e1e1e 60%, #0c0f11)",
          margin: "10px 20px",
          borderRadius: 5,
          overflow: "hidden",
          display: "flex",
        }}
      >
        {/* Left - image placeholder */}
        <Box
          sx={{
            minWidth: 100,
            height: 120,
            borderRadius: 5,
            backgroundImage: "url('/images/golfCourse.jpg')",
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
        />

        {/* Right - session info */}
        <Box
          sx={{
            flexGrow: 1,
            p: 2,
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-between",
          }}
        >
          <Box
            sx={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "flex-start",
            }}
          >
            <Box>
              <Typography sx={{ fontWeight: 600, color: "#ffffff" }}>
                TPC Sawgrass
              </Typography>
              <Typography variant="caption" color="gray">
                18 hole | Aim for ###
              </Typography>
            </Box>
            <ArrowForwardIcon fontSize="large" sx={{ color: "gray" }} />
          </Box>

          <Typography
            sx={{
              pt: 1.5,
              fontWeight: 600,
              fontSize: "0.95rem",
              color: "#ffffff",
            }}
          >
            Round #
          </Typography>
        </Box>
      </Box>

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
        {courseNames.map((name, index) => (
          <Box key={index} sx={{ minWidth: 150 }}>
            <Box
              sx={{
                height: 200,
                borderRadius: 2,
                backgroundImage: "url('/images/golfCourse.jpg')",
                backgroundSize: "cover",
                backgroundPosition: "center",
              }}
            />
            <Typography
              variant="caption"
              sx={{ pt: 1, color: "#ccc", fontWeight: 500 }}
            >
              {name}
            </Typography>
          </Box>
        ))}
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
         {courseNames.map((name, index) => (
          <Box key={index} sx={{ minWidth: 150 }}>
            <Box
              sx={{
                height: 200,
                borderRadius: 2,
                backgroundImage: "url('/images/golfCourse.jpg')",
                backgroundSize: "cover",
                backgroundPosition: "center",
              }}
            />
            <Typography
              variant="caption"
              sx={{ pt: 1, color: "#ccc", fontWeight: 500 }}
            >
              {name}
            </Typography>
          </Box>
        ))}
      </Box>
    </Box>
  );
};

export default HomeScreen;
