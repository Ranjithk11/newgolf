"use client";

import React, { useEffect } from "react";
import { Box, Typography, IconButton } from "@mui/material";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import RefreshIcon from "@mui/icons-material/Refresh";
import { useRouter } from "next/navigation";
import { useLazyGetAllGolfCoursesQuery } from "../../../../lib/redux/golfCourseApi/golfCourseApi";

const PopularCoursesPage = () => {
  const router = useRouter();
  const [getCourses, { data: courseData, isLoading }] =
    useLazyGetAllGolfCoursesQuery();

  const fetchCourses = () => {
    getCourses({
      latitude: "25.7163907",
      longitude: "-80.1618256",
      miles: "10",
    });
  };

  useEffect(() => {
    fetchCourses();
  }, []);

  const renderCourseCard = (course: any, index: number) => (
    <Box
      key={index}
      onClick={() =>
        router.push(
          `/CourseDetails?latitude=${course?.latitude}&longitude=${course?.longitude}&club_name=${course.club_name}&place_id=${course.place_id}`
        )
      }
      sx={{
        backgroundColor: "#1a1a1a",
        borderRadius: 2,
        overflow: "hidden",
        mb: 2,
        cursor: "pointer",
      }}
    >
      <Box
        component="img"
        src={course?.image || "/images/golfCourse.jpg"}
        alt={course.club_name}
        sx={{
          width: "100%",
          height: 140,
          objectFit: "cover",
        }}
      />
      <Box sx={{ px: 2, py: 1 }}>
        <Typography variant="caption" color="gray">
          {course?.hole_count || 18} holes
        </Typography>
        <Typography variant="subtitle2" sx={{ fontWeight: 600, mt: 0.5 }}>
          {course.club_name}
        </Typography>
        <Typography
          variant="body2"
          color="gray"
          sx={{ fontSize: "12px" }}
        >
          {course.city}, {course.state}
        </Typography>
      </Box>
    </Box>
  );

  return (
    <Box
      sx={{
        backgroundColor: "#0f0f0f",
        minHeight: "100vh",
        color: "#fff",
        px: 2,
        pt: 2,
      }}
    >
      {/* Top Bar */}
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          mb: 2,
        }}
      >
        <IconButton onClick={() => router.push("/golfCourse")}>
          <ArrowBackIcon sx={{ color: "#fff" }} />
        </IconButton>

       

        <IconButton onClick={fetchCourses}>
          <RefreshIcon sx={{ color: "#fff" }} />
        </IconButton>
      </Box>
       <Typography variant="subtitle1" sx={{marginLeft:1, fontWeight: 600 }}>
          Start Playing
        </Typography>

      {/* Subtext */}
      <Typography variant="body2" sx={{ color: "#999", mb: 2,marginLeft:1 }}>
        Improvement begins here.
      </Typography>

      {/* Search placeholder */}
      <Box
        sx={{
          backgroundColor: "#1e1e1e",
          borderRadius: 5,
          px: 2,
          py: 1.2,
          mb: 2,
        }}
      >
        <Typography color="#888" fontSize={14}>
          🔍 Search
        </Typography>
      </Box>

      {/* Course List */}
      {isLoading ? (
        <Typography>Loading...</Typography>
      ) : (
        courseData?.data?.map(renderCourseCard)
      )}
    </Box>
  );
};

export default PopularCoursesPage;
