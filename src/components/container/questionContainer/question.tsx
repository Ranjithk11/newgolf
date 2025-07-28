"use client";
import { useState } from "react";
import {
  Box,
  Typography,
  Button,
  Grid,
  Card,
  CardContent,
  IconButton,
  CircularProgress,
} from "@mui/material";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { useRouter } from "next/navigation";
import { useUpdateUserMutation } from "../../../../lib/redux/userApi/userApi";
import { motion, AnimatePresence } from "framer-motion";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";

const playerTypes = [
  {
    key: "tumbler",
    title: "The Tumbler",
    description:
      "Low-ball hitters who are accurate with above average short game",
  },
  {
    key: "riser",
    title: "The Riser",
    description:
      "Mid-ball flight, accurate with irons and above average short game, average with drivers.",
  },
  {
    key: "floater",
    title: "The Floater",
    description:
      "High ball flight, accurate with irons and below average short game.",
  },
  {
    key: "knuckler",
    title: "The Knuckler",
    description:
      "High ball flight, maximizing distance from tee with average approach and short games.",
  },
];

const questions = [
  {
    key: "Dexterity",
    question: "Are you left handed or right handed?",
    options: [
      { value: "right", label: "Right Handed" },
      { value: "left", label: "Left Handed" },
    ],
  },
  {
    key: "Aspirations",
    question: "Are you preparing for a tournament?",
    options: [
      { value: "yes", label: "Yes" },
      { value: "no", label: "No" },
    ],
  },
];

const GolfQuestions = () => {
  const [answers, setAnswers] = useState<Record<string, string>>({});
  const [step, setStep] = useState<
    "step1" | "step2" | "loading" | "created" | "success"
  >("step1");

  const router = useRouter();
  const [updateUser] = useUpdateUserMutation();

  const handleAnswer = (key: string, value: string) => {
    setAnswers((prev) => ({ ...prev, [key]: value }));
    if (key === "playerType") {
      setTimeout(() => setStep("step2"), 300);
    }
  };

  const handleSubmit = () => {
    setStep("loading");
    const storedUser = localStorage.getItem("user_info");
    const golfProfile = JSON.parse(
      localStorage.getItem("golfProfile") as string
    );
    const user = storedUser ? JSON.parse(storedUser) : null;
    const userId = user?._id;

    if (!userId) return;

    updateUser({
      userId,
      dateOfBirth:"",
      handicap:"",
      gender:"",
      golfProfile: {
        ...golfProfile,
        playerType: answers["playerType"],
        tournamentPrep: answers["Aspirations"] === "yes",
        dexterity:
          answers["Dexterity"] === "right" ? "RIGHT_HANDED" : "LEFT_HANDED",
      },
    }).then(() => {
      setTimeout(() => {
        setStep("created");
        setTimeout(() => {
          setStep("success");
          router.push("/golfCourse");
        }, 1500);
      }, 1500);
    });
  };

  const StepIndicator = () => (
    <Box
      display="flex"
      justifyContent="center"
      alignItems="center"
      gap={1}
      mt={2}
      mb={4}
    >
      <Box
        sx={{
          height: 4,
          width: 120,
          borderRadius: 2,
          background:
            step === "step1"
              ? "linear-gradient(to right, #00c6ff, #00ff95)"
              : "#333",
          transition: "0.3s",
        }}
      />
      <Box
        sx={{
          height: 4,
          width: 120,
          borderRadius: 2,
          background:
            step === "step2"
              ? "linear-gradient(to right, #00c6ff, #00ff95)"
              : "#333",
          transition: "0.3s",
        }}
      />
    </Box>
  );

  const GolfLoaderOrSuccess = () => (
    <Box
      display="flex"
      alignItems="center"
      justifyContent="center"
      height="80vh"
    >
      <Box display="flex" alignItems="center" gap={1}>
        <img src="/images/logo.png" alt="Golf Icon" width={40} />
        <Typography variant="h6" fontWeight={600}>
          {step === "loading" && "Creating Player Profile"}
          {step === "created" && "Success!"}
        </Typography>
        {step === "loading" && (
          <CircularProgress size={20} sx={{ color: "#00ff95" }} />
        )}
        {step === "created" && (
          <CheckCircleIcon sx={{ color: "#00ff95", fontSize: 24 }} />
        )}
      </Box>
    </Box>
  );

  return (
    <Box
      sx={{
        minHeight: "100vh",
        backgroundColor: "#101518",
        color: "#fff",
        px: 3,
        py: 2,
        position: "relative",
      }}
    >
      <Box display="flex" alignItems="center" justifyContent="space-between">
        <IconButton
          onClick={() => router.push("/login")}
          sx={{
            color: "#fff",
            border: "1px solid #444",
            borderRadius: 1,
            p: "6px",
            mb: 5,
          }}
        >
          <ArrowBackIcon fontSize="small" />
        </IconButton>
      </Box>

      {(step === "step1" || step === "step2") && <StepIndicator />}

      <Box sx={{ overflow: "hidden", position: "relative" }}>
        <AnimatePresence mode="wait">
          {step === "step1" && (
            <motion.div
              key="step1"
              initial={{ x: "-100%", opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              exit={{ x: "100%", opacity: 0 }}
              transition={{ duration: 0.4 }}
            >
              <Typography variant="h6" mb={1}>
                What type of player are you?
              </Typography>
              <Typography variant="body2" mb={3} color="gray">
                Choose the one that suits you the best.
              </Typography>
              <Grid container spacing={2}>
                {playerTypes.map((player) => (
                  <Grid size={{ xs: 12 }} key={player.key}>
                    <Box
                      sx={{
                        p: 0.5,
                        borderRadius: 2,
                        background:
                          answers["playerType"] === player.key
                            ? "linear-gradient(90deg, #34A853 35%, #2B9DA9 15%)"
                            : "#1a1a1a",
                      }}
                    >
                      <Card
                        onClick={() => handleAnswer("playerType", player.key)}
                        sx={{
                          backgroundColor: "#0b0c0e",
                          borderRadius: 2,
                          cursor: "pointer",
                          transition: "0.3s",
                          position: "relative",
                          overflow: "hidden",
                          boxShadow:
                            answers["playerType"] === player.key
                              ? "0 0 0 2px rgba(52, 168, 83, 0.5)"
                              : "none",
                          "&:hover": {
                            backgroundColor: "#1a1a1a",
                          },
                        }}
                      >
                        <Box
                          sx={{
                            position: "absolute",
                            right: 0,
                            top: 0,
                            bottom: 0,
                            width: "40%",
                            backgroundImage:
                              "radial-gradient(circle at center, rgba(52, 168, 83, 0.3) 1px, transparent 1px)",
                            backgroundSize: "8px 8px",
                            opacity: 0.3,
                            pointerEvents: "none",
                          }}
                        />
                        <CardContent>
                          <Typography
                            variant="subtitle1"
                            fontWeight={600}
                            fontSize={18}
                            color="#fff"
                          >
                            {player.title}
                          </Typography>
                          <Typography variant="body2" color="#aaa">
                            {player.description}
                          </Typography>
                        </CardContent>
                      </Card>
                    </Box>
                  </Grid>
                ))}
              </Grid>
            </motion.div>
          )}

          {step === "step2" && (
            <motion.div
              key="step2"
              initial={{ x: "100%", opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              exit={{ x: "-100%", opacity: 0 }}
              transition={{ duration: 0.4 }}
            >
              {questions.map((q) => (
                <Box key={q.key} sx={{ mb: 4 }}>
                  <Typography color="#868686">{q.key}</Typography>
                  <Typography variant="h6" fontSize={25} mb={3}>
                    {q.question}
                  </Typography>
                  <Box display="flex" gap={2}>
                    {q.options.map((option) => (
                      <Button
                        key={option.value}
                        onClick={() => handleAnswer(q.key, option.value)}
                        sx={{
                          borderRadius: "20px",
                          fontWeight: 500,
                          px: 3,
                          py: 3,
                          color: "#fff",
                          borderColor: "#4caf50",
                          backgroundImage: 'url("/images/qunbg2.png")',
                          backgroundSize: "cover",
                          backgroundRepeat: "no-repeat",
                          backgroundPosition: "center",
                          border:
                            answers[q.key] === option.value
                              ? "2px solid #00ff95"
                              : "1px solid #333",
                          backgroundColor:
                            answers[q.key] === option.value
                              ? "#1a1a1a"
                              : "#0b0c0e",
                        }}
                      >
                        {option.label}
                      </Button>
                    ))}
                  </Box>
                </Box>
              ))}

              <Button
                onClick={handleSubmit}
                variant="contained"
                sx={{
                  mt: 4,
                  px: 10,
                  py: 1.5,
                  borderRadius: "25px",
                  fontWeight: 600,
                  backgroundColor: "#fff",
                  color: "#000",
                  alignSelf: "center",
                }}
              >
                Submit
              </Button>
            </motion.div>
          )}

          {(step === "loading" || step === "created") && (
            <motion.div
              key="status"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
            >
              <GolfLoaderOrSuccess />
            </motion.div>
          )}
        </AnimatePresence>
      </Box>
    </Box>
  );
};

export default GolfQuestions;
