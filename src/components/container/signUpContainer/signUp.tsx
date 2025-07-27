"use client";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import {
  Box,
  Button,
  Container,
  IconButton,
  Typography,
  Divider,
  Grid,
} from "@mui/material";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { useRouter } from "next/navigation";
import { ArrowBack, Visibility, VisibilityOff } from "@mui/icons-material";
import { parsePhoneNumberWithError } from "libphonenumber-js";
import TextInputFieldComponent from "@/components/form-fields/textInputFields";
import FormMobileInput from "@/components/form-fields/phoneInputField";
import { matchIsValidTel } from "mui-tel-input";
import { useRegisterNewUserMutation } from "../../../../lib/redux/userApi/userApi";
import { signIn } from "next-auth/react";
const schema = yup.object().shape({
  email: yup.string().email("Invalid email").required("Email is required"),
  password: yup.string().min(6).required("Password is required"),
});

const SignUp = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [registerNewUser, { isLoading }] = useRegisterNewUserMutation();
  const router = useRouter();

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });
  console.log(errors);

  const onSubmit = (data: any) => {
    const phoneNumber = parsePhoneNumberWithError(data?.phoneNumber);
    const payload = {
      ...data,
      phoneNumber: phoneNumber.nationalNumber,
      countryCode: phoneNumber.countryCallingCode,
    };
    registerNewUser(payload)
      .then((response) => {
        if (response?.error) {
          alert("User Already Exists!!");
        } else {
          router.push("/yourself");
        }
      })
      .catch((error) => {
        alert(error.message);
      });
  };

  return (
    <Box
      sx={{
        backgroundColor: "#101518",
        minHeight: "100vh",
        color: "#fff",
        py: 2,
      }}
    >
      <Container maxWidth="xs">
        <IconButton
          onClick={() => router.back()}
          sx={{
            color: "#fff",
            border: 2,
            borderColor: "#4E4E4E",
            borderRadius: 1, // Square corners
            width: 33,
            height: 33, // Makes it a square
          }}
        >
          <ArrowBack />
        </IconButton>

        <Box
          display="flex"
          justifyContent="left"
          alignItems="center"
          mt={5}
          mb={3}
          gap={3}
        >
          <img src="/images/logo.png" alt="Logo" max-width={50} height={50} />
          <Box mt={2}>
            <Typography
              variant="h5"
              fontWeight="600"
              textAlign="left"
              fontSize={20}
            >
              Get Started.
            </Typography>
            <Typography variant="body2" textAlign="left" color="#707070">
              Enter your details below to get started.
            </Typography>
          </Box>
        </Box>

        <form onSubmit={handleSubmit(onSubmit)}>
          <Grid container spacing={2}>
            <Grid size={{ xs: 12 }}>
              <Typography>Email</Typography>

              <TextInputFieldComponent
                control={control}
                name="email"
                id="email"
                label=""
                defaultValue=""
                textFieldProps={{
                  fullWidth: true,
                  placeholder: "Example@gmail.com",
                  InputProps: {
                    sx: {
                      backgroundColor: "#fff",
                      color: "#1e1e1e",
                      borderRadius: 1,
                      input: {
                        fontWeight: 500,
                        "&::placeholder": {
                          color: "#aaa",
                        },
                      },
                    },
                  },
                }}
              />
            </Grid>
            <Grid size={{ xs: 12 }}>
              <Typography>phoneNumber</Typography>
              <FormMobileInput
                name="phoneNumber"
                size="medium"
                rules={{
                  required: "This is a required field",
                  validate: matchIsValidTel,
                }}
                control={control}
                defaultValue=""
                id="form-phone-input"
                placeholder="Enter phone number"
                sx={{
                  backgroundColor: "#fff",
                  borderRadius: 2,
                  input: {
                    color: "#1e1e1e",
                    fontWeight: 600,
                    borderRadius: "8px",
                    backgroundColor: "#fff",
                    "&::placeholder": {
                      color: "white",
                    },
                  },
                }}
              />
            </Grid>

            <Grid size={{ xs: 12 }}>
              <Typography>Password</Typography>
              <TextInputFieldComponent
                control={control}
                name="password"
                id="password"
                label=""
                defaultValue=""
                textFieldProps={{
                  fullWidth: true,
                  placeholder: "Enter password here",
                  type: showPassword ? "text" : "password",
                  InputProps: {
                    endAdornment: (
                      <IconButton
                        onClick={() => setShowPassword(!showPassword)}
                        size="small"
                      >
                        {showPassword ? <Visibility /> : <VisibilityOff />}
                      </IconButton>
                    ),
                    sx: {
                      backgroundColor: "#fff",
                      color: "#1e1e1e",
                      borderRadius: 2,
                      input: {
                        fontWeight: 500,
                        "&::placeholder": {
                          color: "#aaa",
                        },
                      },
                    },
                  },
                }}
              />
            </Grid>

            <Grid size={{ xs: 12 }}>
              <Typography variant="body2" textAlign="left" color="#aaa">
                Already have an account?{" "}
                <span
                  style={{ color: "#FF7F00", cursor: "pointer" }}
                  onClick={() => router.push("/login")}
                  
                > 
                  Sign in.
                </span>
              </Typography>
            </Grid>

            <Grid size={{ xs: 12 }}>
              <Button
                type="submit"
                onClick={handleSubmit(onSubmit)}
                fullWidth
                variant="contained"
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
                Sign Up
              </Button>
            </Grid>

            {/* Divider */}
            <Grid size={{ xs: 12 }}>
              <Box display="flex" alignItems="center" my={1}>
                <Divider sx={{ flexGrow: 1, bgcolor: "#333" }} />
                <Typography sx={{ mx: 2, color: "#888" }}>OR</Typography>
                <Divider sx={{ flexGrow: 1, bgcolor: "#333" }} />
              </Box>
            </Grid>

            {/* Apple Sign-In */}
            <Grid size={{ xs: 12 }}>
              <Button
                fullWidth
                sx={{
                  backgroundColor: "#000",
                  color: "#fff",
                  fontWeight: "bold",
                  borderRadius: "10px",
                  py: 1.2,
                  textTransform: "none",
                  border: "1px solid #333",
                }}
              >
                <img
                  src="/images/apple.png"
                  alt="Apple"
                  style={{ width: 20, marginRight: 8 }}
                />
                Sign in with Apple
              </Button>
            </Grid>

            {/* Google Sign-In */}
            <Grid size={{ xs: 12 }}>
              <Button
                fullWidth
                onClick={async () => {
                  const result = await signIn("google", {
                    callbackUrl: "/golfCourse",
                    redirect: false,
                  });
                  if (result?.error) {
                    console.error("Google sign-in error:", result.error);
                  } else {
                    router.push(result?.url || "/question");
                  }
                }}
                sx={{
                  backgroundColor: "#fff",
                  color: "#000",
                  fontWeight: "bold",
                  borderRadius: "10px",
                  py: 1.2,
                  textTransform: "none",
                  border: "1px solid #ccc",
                }}
              >
                <img
                  src="/images/google.png"
                  alt="Google"
                  style={{ width: 20, marginRight: 8 }}
                />
                Sign in with Google
              </Button>
            </Grid>

            {/* Terms */}
            <Grid size={{ xs: 12 }}>
              <Typography
                variant="caption"
                display="block"
                textAlign="center"
                color="#888"
                mt={2}
              >
                By signing up, you agree to our{" "}
                <span
                  style={{ textDecoration: "underline", cursor: "pointer" }}
                >
                  Terms.
                </span>
              </Typography>
            </Grid>
          </Grid>
        </form>
      </Container>
    </Box>
  );
};

export default SignUp;
