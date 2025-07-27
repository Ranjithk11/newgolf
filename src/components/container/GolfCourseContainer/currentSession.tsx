import React from "react";
import { Box, Typography, Grid, Button } from "@mui/material";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import WaterDropIcon from "@mui/icons-material/WaterDrop";
import AirIcon from "@mui/icons-material/Air";

// Inline StatCard component
const StatCard = ({
  label,
  value = "0",
}: {
  label: string;
  value?: string;
}) => (
  <Box
    sx={{
      backgroundImage: "url('/images/qunbg2.png')",
      backgroundSize: "cover",
      backgroundRepeat: "no-repeat",
      backgroundPosition: "center",
      backgroundColor: "#1e1e1e", // fallback for no image
      borderRadius: 3,
      p: 2,
      textAlign: "center",
      boxShadow: "0 0 8px rgba(0,0,0,0.3)",
    }}
  >
    <Typography variant="subtitle2" sx={{ color: "#ffffff", fontWeight: 600 }}>
      {label}
    </Typography>
    <Typography variant="h6" sx={{ color: "#e1b12c", fontWeight: 700 }}>
      {value}
    </Typography>
  </Box>
);

const YourComponent = () => {
  return (
    <>
      {/* Section: Current Session */}
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

          {/* PAR / HOLE / YDS Grid */}
          <Grid container spacing={1} sx={{ pt: 1 }}>
            {["PAR", "HOLE", "YDS"].map((label) => (
              <Grid size={{ xs: 4 }} key={label}>
                <Box
                  sx={{
                    backgroundColor: "#131313",
                    borderRadius: 1,
                    textAlign: "center",
                    py: 0.5,
                  }}
                >
                  <Typography variant="caption" color="gray">
                    {label}
                  </Typography>
                  <Typography
                    variant="subtitle2"
                    sx={{ fontWeight: 600, color: "#fff" }}
                  >
                    1
                  </Typography>
                </Box>
              </Grid>
            ))}
          </Grid>

          {/* Weather + Strategy Button */}
          <Box
            sx={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              px: 3,
              mt: 1,
            }}
          >
            <Box sx={{ display: "flex", gap: 3 }}>
              <WaterDropIcon fontSize="small" sx={{ color: "gray" }} />
              <AirIcon fontSize="small" sx={{ color: "gray" }} />
              <Typography variant="caption" color="gray">
                mph
              </Typography>
            </Box>

            <Button
              size="small"
              variant="contained"
              sx={{
                background: "linear-gradient(90deg, #0EA7D2, #18B73A)",
                color: "#fff",
                fontWeight: 600,
                textTransform: "none",
                borderRadius: 2,
                px: 2,
                py: 0.5,
                fontSize: "0.75rem",
                "&:hover": {
                  background: "linear-gradient(90deg, #0EA7D2, #18B73A)",
                  opacity: 0.9,
                },
              }}
            >
              Strategy
            </Button>
          </Box>
        </Box>
      </Box>

      {/* Section: Your Stats */}
      <Box sx={{ px: 2, pt: 4 }}>
        <Typography
          variant="subtitle2"
          sx={{ fontWeight: 600, color: "#ffffff" }}
        >
          Your Stats
        </Typography>
        <Typography variant="body2" sx={{ color: "gray", mb: 2 }}>
          Lorem Ipsum
        </Typography>

        <Grid container spacing={2}>
          {[
            { label: "Greens Hit", value: "12" },
            { label: "Fairways Hit", value: "9" },
            { label: "Putts", value: "30" },
            { label: "Score", value: "72" },
          ].map((stat, idx) => (
            <Grid size={{ xs: 6 }} key={idx}>
              <StatCard label={stat.label} value={stat.value} />
            </Grid>
          ))}
        </Grid>
      </Box>
    </>
  );
};

export default YourComponent;
