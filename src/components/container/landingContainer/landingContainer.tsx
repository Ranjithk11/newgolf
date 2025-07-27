"use client";
import React, { useEffect, useState } from "react";
import Box from "@mui/material/Box";
import { Button, styled, Typography } from "@mui/material";
import { useRouter } from "next/navigation";

const slides = [
  {
    image: "/images/slide1.png",
    title: "Swing Into Action",
    description:
      "Let’s get started. Whether you’re practicing or playing a round, we’re here to make every swing count.",
  },
  {
    image: "/images/slide2.png",
    title: "Smarter Preparation Starts Here",
    description:
      "Get everything you need to prep, play, and perform—right from your phone.",
  },
  {
    image: "/images/slide3.png",
    title: "Tournament Ready Yardage Book",
    description:
      "Your digital yardage book, built for clarity—so you know every shot before you take it.",
  },
];

const StyledMainBoxWrapper = styled(Box)(() => ({
  minHeight: "100dvh",
  backgroundColor: "#101518",
  color: "#fff",
}));

const LandingContainer = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [showSplash, setShowSplash] = useState(true);
  const router = useRouter();

  useEffect(() => {
    const splashTimeout = setTimeout(() => {
      setShowSplash(false);
    }, 2500);
    return () => clearTimeout(splashTimeout);
  }, []);
  // Auto-change slide every 2 seconds
  useEffect(() => {
    if (!showSplash) {
      const interval = setInterval(() => {
        setCurrentSlide((prev) => (prev + 1) % slides.length);
      }, 3000);
      return () => clearInterval(interval);
    }
  }, [showSplash]);

  const handleNext = () => {
    setCurrentSlide((prev) => (prev + 1) % slides.length);
  };

  const handleSkip = () => {
    router.push("/SignUp");
  };
  if (showSplash) {
    return (
      <Box
        height="100dvh"
        display="flex"
        justifyContent="center"
        alignItems="center"
        bgcolor="#101518" 
      >
        <Box display="flex" alignItems="center" gap={2}>
          <img
            src="/images/logo.png" // <- Make sure this is your golfer icon
            alt="Logo Icon"
            style={{
              width: 60,
              height: 60,
              objectFit: "contain",
            }}
          />
          <Typography
            variant="h5"
            sx={{ color: "#fff", fontWeight: "600", fontFamily: "sans-serif" }}
          >
            Golf Go.
          </Typography>
        </Box>
      </Box>
    );
  }
  const slide = slides[currentSlide];

  return (
    <StyledMainBoxWrapper>
      {/* Image Area */}
      <Box
        sx={{
          height: "75dvh",
          width: "100%",
          backgroundImage: `url(${slide.image})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundColor:"#101518",
        }}
      />

      {/* Text & Controls */}
      <Box
        px={3}
        py={4}
        display="flex"
        flexDirection="column"
        justifyContent="space-between"
        height="25dvh"
      >
        <Box>
          <Typography variant="h6" fontWeight="bold">
            <span style={{ color: "#00bcd4" }}>
              {slide.title.split(" ")[0]}
            </span>{" "}
            {slide.title.split(" ").slice(1).join(" ")}
          </Typography>
          <Typography variant="body2" mt={1}>
            {slide.description}
          </Typography>
        </Box>

        {/* Navigation Controls */}
        <Box
          display="flex"
          justifyContent="space-between"
          alignItems="center"
          mt={3}
        >
          <Button
            onClick={handleSkip}
            sx={{ textTransform: "none", color: "#aaa" }}
          >
            Skip
          </Button>

          {/* Dots */}
          <Box display="flex" alignItems="center">
            {slides.map((_, idx) => (
              <Box
                key={idx}
                sx={{
                  width: 8,
                  height: 8,
                  borderRadius: "50%",
                  backgroundColor: idx === currentSlide ? "#00bcd4" : "#555",
                  mx: 0.5,
                }}
              />
            ))}
          </Box>

          <Button
           onClick={() => router.push("/SignUp")}
            sx={{
              minWidth: 40,
              height: 40,
              borderRadius: "50%",
              fontSize: "1.2rem",
              backgroundColor: "#00bcd4",
              color: "#fff",
              "&:hover": {
                backgroundColor: "#00acc1",
              },
            }}
          >
            →
          </Button>
        </Box>
      </Box>
    </StyledMainBoxWrapper>
  );
};

export default LandingContainer;
