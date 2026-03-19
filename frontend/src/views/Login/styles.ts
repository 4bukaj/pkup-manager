import type {
  SxProps,
  Theme,
} from "@mui/material";

export const container: SxProps<Theme> =
  {
    minHeight: "100vh",
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
  };

export const paper: SxProps<Theme> = {
  p: 6,
  width: "100%",
  textAlign: "center",
  borderRadius: 4,
};

export const title: SxProps<Theme> = {
  mb: 2,
  color: "primary.main",
};

export const subtitle: SxProps<Theme> =
  {
    mb: 6,
  };

export const googleButton: SxProps<Theme> =
  {
    py: 1.8,
    fontSize: "1rem",
  };

export const githubButton: SxProps<Theme> =
  {
    py: 1.8,
    fontSize: "1rem",
    borderColor: "#d2d2d7",
    color: "#1d1d1f",
    "&:hover": {
      borderColor: "#86868b",
      backgroundColor:
        "rgba(0, 0, 0, 0.02)",
    },
  };

export const footerText: SxProps<Theme> =
  {
    mt: 5,
    display: "block",
    opacity: 0.7,
  };
