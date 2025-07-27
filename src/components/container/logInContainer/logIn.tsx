"use client";
import React, { useState } from "react";
import {
  Box,
  Grid,
  TextField,
  Typography,
  Button,
  Link,
  Divider,
  IconButton,
} from "@mui/material";
import { useRouter } from "next/navigation";
import { useLogInUserMutation } from "../../../../lib/redux/userApi/userApi";
import { ArrowBack } from "@mui/icons-material";
import {signIn} from "next-auth/react";

const LogInForm: React.FC = () => {
  const [input, setInput] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const [logInUser, { isLoading }] = useLogInUserMutation();
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage(null);

    try {
      const res = await logInUser({ input, password }).unwrap();
      if (res?.status === "success" && res?.data?._id) {
        localStorage.setItem("user_info", JSON.stringify(res.data));
        router.push("/question");
      } else {
        setErrorMessage("An unexpected error occurred. Please try again.");
      }
    } catch (err: any) {
      setErrorMessage(err?.data?.message || err?.message || "Login failed.");
    }
  };

  const handleGoogleLogin=()=>{
    signIn('google',{
      callbackUrl:"/golfCourse"
    })
  }


  return (
    <Box
      sx={{
        minHeight: "100vh",
        backgroundColor: "#101518",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        px: 2,
      }}
    >
      <Box sx={{ width: "100%", maxWidth: 400 }}>
        {/* Back Button */}
        <IconButton
          onClick={() => router.back()}
          sx={{
            color: "#fff",
            border: 2,
            borderColor: "#4E4E4E",
            borderRadius: 1,
            width: 36,
            height: 36,
            mb: 5,
          }}
        >
          <ArrowBack />
        </IconButton>

        {/* Logo & Title */}
        <Box display="flex" alignItems="center" gap={2} mb={3}>
          <img
            src="/images/logo.png"
            alt="Logo"
            style={{ width: 50, height: 50 }}
          />
          <Box>
            <Typography variant="h6" color="#fff" fontWeight={600}>
              Welcome Back
            </Typography>
            <Typography variant="body2" color="#707070">
              Enter your details below to log in.
            </Typography>
          </Box>
        </Box>

        {/* Form */}
        
          <Grid container spacing={2}>
            <Grid size={{ xs: 12 }}>
              <Typography color="#fff">Email or Number</Typography>
              <TextField
                fullWidth
                // label="Email or Number"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="Email or Phone"
                variant="outlined"
                InputLabelProps={{ style: { color: "#ccc" } }}
                InputProps={{
                  sx: {
                    backgroundColor: "#fff",
                    borderRadius: 1,
                    "& input": { color: "#000", fontWeight: 500 },
                  },
                }}
              />
            </Grid>

            <Grid size={{ xs: 12 }}>
              <Typography color="#fff">Password</Typography>
              <TextField
                fullWidth
                // label="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                type="password"
                placeholder="Enter password"
                variant="outlined"
                InputLabelProps={{ style: { color: "#ccc" } }}
                InputProps={{
                  sx: {
                    backgroundColor: "#fff",
                    borderRadius: 1,
                    "& input": { color: "#000", fontWeight: 500 },
                  },
                }}
              />
            </Grid>

            <Grid size={{ xs: 12 }} textAlign="left">
              <Link href="#" underline="hover" color="#f4a261">
                Forgot Password?
              </Link>
            </Grid>

            <Grid size={{ xs: 12 }}>
              <Button
               onClick={handleSubmit}
                
                fullWidth
                variant="contained"
                disabled={isLoading}
                sx={{
                  background: "linear-gradient(to right, #00c6ff, #00ff95)",
                  color: "#000",
                  fontWeight: "bold",
                  borderRadius: "8px",
                  py: 1.4,
                  "&:hover": {
                    background: "linear-gradient(to right, #00a0ff, #00e384)",
                  },
                }}
              >
                {isLoading ? "Logging in..." : "Log In"}
              </Button>
            </Grid>

            {errorMessage && (
              <Grid size={{ xs: 12 }}>
                <Typography
                  color="error"
                  fontSize={14}
                  textAlign="center"
                  mt={1}
                >
                  {errorMessage}
                </Typography>
              </Grid>
            )}

            <Grid size={{ xs: 12 }}>
              <Typography variant="body2" textAlign="center" color="#aaa">
                New Here?{" "}
                <span
                  style={{ color: "#FF7F00", cursor: "pointer" }}
                  onClick={() => router.push("/SignUp")}
                >
                  Sign Up.
                </span>
              </Typography>
            </Grid>

            <Grid size={{ xs: 12 }}>
              <Box display="flex" alignItems="center" my={1}>
                <Divider sx={{ flexGrow: 1, bgcolor: "#333" }} />
                <Typography sx={{ mx: 2, color: "#888" }}>OR</Typography>
                <Divider sx={{ flexGrow: 1, bgcolor: "#333" }} />
              </Box>
            </Grid>

            <Grid size={{ xs: 12 }}>
              <Button
                fullWidth
                variant="contained"
                sx={{
                  backgroundColor: "#000",
                  color: "#fff",
                  borderRadius: "8px",
                  py: 1.2,
                  textTransform: "none",
                }}
                startIcon={
                  <img src="/images/apple.png" alt="Apple" width={20} />
                }
              >
                Sign in with Apple
              </Button>
            </Grid>

            <Grid size={{ xs: 12 }}>
              <Button
                fullWidth
                variant="outlined"
                onClick={handleGoogleLogin}
                sx={{
                  backgroundColor: "#fff",
                  color: "#000",
                  borderRadius: "8px",
                  py: 1.2,
                  textTransform: "none",
                  borderColor: "#ccc",
                }}
                startIcon={
                  <img src="/images/google.png" alt="Google" width={20} />
                }
              >
                Sign in with Google
              </Button>
            </Grid>
          </Grid>
       
      </Box>
    </Box>
  );
};

export default LogInForm;
