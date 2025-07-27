"use client";

import {
  Box,
  Avatar,
  IconButton,
  TextField,
  Typography,
  Button,
  MenuItem,
} from "@mui/material";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { Controller, useForm } from "react-hook-form";
import { useUpdateUserMutation } from "../../../../lib/redux/userApi/userApi";

const GENDER_OPTIONS = ["MALE", "FEMALE", "OTHER"];
const DEXTERITY_OPTIONS = ["LEFT_HANDED", "RIGHT_HANDED"];
const BALL_FLIGHT_OPTIONS = ["DRAW", "FADE", "STRAIGHT"];
const PLAY_STYLE_OPTIONS = ["AGGRESSIVE", "STRATEGIC"];
const PLAYER_TYPE_OPTIONS = [
  {
    type: "TUMBLER",
    characteristics:
      "Low-ball hitters who are accurate with above average short game",
  },
  {
    type: "BOMBER",
    characteristics: "Long hitters with high-risk, high-reward game",
  },
];

const EditProfileScreen = ({
  onClose,
  userId,
  defaultValues,
}: {
  onClose: () => void;
  userId: string;
  defaultValues?: any;
}) => {
  const { control, handleSubmit } = useForm({
    defaultValues: {
      name: defaultValues?.name || "",
      email: defaultValues?.email || "",
      gender: defaultValues?.gender || "MALE",
      dateOfBirth: defaultValues?.dateOfBirth || "",
      handicap: defaultValues?.handicap || "",
      golfProfile: {
        playerType: defaultValues?.golfProfile?.playerType?.type || "TUMBLER",
        tournamentPrep: defaultValues?.golfProfile?.tournamentPrep || false,
        ballFlight: defaultValues?.golfProfile?.ballFlight || "DRAW",
        playStyle: defaultValues?.golfProfile?.playStyle || "AGGRESSIVE",
        dexterity: defaultValues?.golfProfile?.dexterity || "LEFT_HANDED",
      },
    },
  });

  const [updateUser, { isLoading }] = useUpdateUserMutation();

  const onSubmit = async (data: any) => {
    const payload = {
      userId,
      golfProfile: {
        playerType: {
          type: data.golfProfile.playerType,
          characteristics:
            PLAYER_TYPE_OPTIONS.find(
              (pt) => pt.type === data.golfProfile.playerType
            )?.characteristics || "",
        },
        tournamentPrep: data.golfProfile.tournamentPrep,
        ballFlight: data.golfProfile.ballFlight,
        playStyle: data.golfProfile.playStyle,
        dexterity: data.golfProfile.dexterity,
      },
      handicap: data.handicap,
      gender: data.gender,
      dateOfBirth: data.dateOfBirth,
    };

    try {
      await updateUser(payload).unwrap();
      alert("Profile updated successfully!");
      onClose();
    } catch (error) {
      console.error("Error updating profile", error);
    }
  };

  return (
    <Box
      sx={{
        backgroundColor: "#161616",
        minHeight: "100vh",
        color: "#fff",
        px: 2,
        pb: 4,
      }}
    >
      {/* Top Banner */}
      <Box
        sx={{
          position: "relative",
          height: 180,
          backgroundImage: `url("/images/profileBg.png")`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          borderBottomLeftRadius: 20,
          borderBottomRightRadius: 20,
        }}
      >
        <IconButton
          onClick={onClose}
          sx={{
            position: "absolute",
            top: 10,
            left: 10,
            backgroundColor: "#00000088",
          }}
        >
          <ArrowBackIcon sx={{ color: "#fff" }} />
        </IconButton>
      </Box>

      <Box sx={{ display: "flex", justifyContent: "center", mt: -7, mb: 3 }}>
        <Avatar sx={{ width: 100, height: 100, bgcolor: "purple" }} />
      </Box>

      <Box
        component="form"
        onSubmit={handleSubmit(onSubmit)}
        sx={{ display: "flex", flexDirection: "column", gap: 2 }}
      >
        <Typography color="#fff">Name</Typography>
        <Controller
          name="name"
          control={control}
          render={({ field }) => (
            <TextField
              {...field}
              fullWidth
              variant="filled"
              placeholder="Your Name"
              InputProps={{
                sx: {
                  backgroundColor: "#fff",
                  borderRadius: 1,
                  "& input": { color: "#000", fontWeight: 500 },
                },
              }}
              InputLabelProps={{ sx: { color: "gray" } }}
            />
          )}
        />

        <Typography color="#fff">Email</Typography>
        <Controller
          name="email"
          control={control}
          render={({ field }) => (
            <TextField
              {...field}
              fullWidth
              variant="filled"
              placeholder="example@mail.com"
              InputProps={{
                sx: {
                  backgroundColor: "#fff",
                  borderRadius: 1,
                  "& input": { color: "#000", fontWeight: 500 },
                },
              }}
              InputLabelProps={{ sx: { color: "gray" } }}
            />
          )}
        />
        <Typography color="#fff">Handicap</Typography>
        <Controller
          name="handicap"
          control={control}
          rules={{ required: "Handicap is required" }}
          render={({ field, fieldState }) => (
            <TextField
              {...field}
              fullWidth
              variant="filled"
              placeholder="Enter Handicap Here"
              error={!!fieldState.error}
              helperText={fieldState.error?.message}
              InputProps={{
                sx: {
                  backgroundColor: "#fff",
                  borderRadius: 1,
                  "& input": { color: "#000", fontWeight: 500 },
                },
              }}
              InputLabelProps={{ sx: { color: "gray" } }}
            />
          )}
        />

        <Typography color="#fff">Gender</Typography>
        <Controller
          name="gender"
          control={control}
          render={({ field }) => (
            <TextField
              {...field}
              select
              fullWidth
              variant="filled"
              InputProps={{
                sx: {
                  backgroundColor: "#fff",
                  borderRadius: 1,
                  color: "#000",
                },
              }}
            >
              {GENDER_OPTIONS.map((g) => (
                <MenuItem key={g} value={g}>
                  {g}
                </MenuItem>
              ))}
            </TextField>
          )}
        />

        <Typography color="#fff">Date Of Birth</Typography>
        <Controller
          name="dateOfBirth"
          control={control}
          render={({ field }) => (
            <TextField
              {...field}
              type="date"
              fullWidth
              variant="filled"
              InputProps={{
                sx: {
                  backgroundColor: "#fff",
                  borderRadius: 1,
                  color: "#000",
                },
              }}
            />
          )}
        />

        {/* You can add more dropdowns for playStyle, ballFlight, dexterity etc. */}
        <Typography color="#fff">Dexterity</Typography>
        <Controller
          name="golfProfile.dexterity"
          control={control}
          render={({ field }) => (
            <TextField
              {...field}
              select
              fullWidth
              variant="filled"
              InputProps={{
                sx: {
                  backgroundColor: "#fff",
                  borderRadius: 1,
                  color: "#000",
                },
              }}
            >
              {DEXTERITY_OPTIONS.map((d) => (
                <MenuItem key={d} value={d}>
                  {d}
                </MenuItem>
              ))}
            </TextField>
          )}
        />

        <Button
          type="submit"
          disabled={isLoading}
          fullWidth
          sx={{
            mt: 2,
            py: 1.5,
            color: "#fff",
            background: "linear-gradient(90deg, #0EA7D2, #18B73A)",
            fontWeight: 900,
            borderRadius: 2,
            textTransform: "none",
          }}
        >
          {isLoading ? "Updating..." : "Update"}
        </Button>
      </Box>
    </Box>
  );
};

export default EditProfileScreen;
