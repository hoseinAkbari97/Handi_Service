import { createTheme } from "@mui/material/styles";

const primaryColor = { main: "#1A423A", light: "#00695c", dark: "#122e28" };
const secondaryColor = { main: "#D4AF37", light: "#f5d876", dark: "#b68b00ff" };
const backgroundColor = { default: "#EFE6D5", paper: "#e6f7f7" };
const textColor = {
  primary: "#FFFFFF",
  secondary: "#D9B55A",
  dark: "#cfcfd1",
  contrastText: "#0A3D3F",
};
const success = {
  main: "#4CAF50",
  light: "#81C784",
  dark: "#388E3C",
}
const error = {
  main: "#F44336",
  light: "#E57373",
  dark: "#D32F2F",
}
const warning = {
  main: "#FF9800",
  light: "#FFB74D",
  dark: "#F57C00",
}
const info = {
  main: "#2196F3",
  light: "#64B5F6",
  dark: "#1976D2",
}

const theme = createTheme({
  palette: {
    primary: primaryColor,
    secondary: secondaryColor,
    background: backgroundColor,
    text: textColor,
  },
  typography: { fontFamily: `'vazirmatn', Roboto, Arial` },
  direction: "rtl",

  // Input Labels
  components: {
    MuiInputLabel: {
      styleOverrides: {
        root: ({ theme }) => ({
          color: theme.palette.secondary.main,
          "&.Mui-focused": {
            color: theme.palette.secondary.dark,
          },
          "&.MuiInputLabel-shrink": {
            color: theme.palette.secondary.dark,
          },
        }),
      },
    },

    // TextFields
    MuiTextField: {
      styleOverrides: {
        root: {
          ".muirtl-1qyrcum-MuiInputBase-root-MuiOutlinedInput-root":{
            backgroundColor: primaryColor.main
          },
          "& .MuiOutlinedInput-notchedOutline": {
            borderColor: secondaryColor.main,
          },
          "& .MuiOutlinedInput-root.Mui-focused .MuiOutlinedInput-notchedOutline":
            {
              borderColor: secondaryColor.light,
              borderWidth: "2px",
            },
          "& .MuiInputLabel-root.MuiInputLabel-shrink": {
            color: secondaryColor.dark,
          },
          "& .MuiInputLabel-root": {
            color: secondaryColor.main,
          },
          "& .MuiInputBase-input": {
            color: textColor.primary,
          },
        },
      },
    },

    // Dropdowns & Select fields
    MuiSelect: {
      styleOverrides: {
        root: {
          "& .MuiOutlinedInput-notchedOutline": {
            borderColor: secondaryColor.main,
          },
          "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
            borderColor: secondaryColor.dark,
            borderWidth: "2px",
          },
          "& .MuiOutlinedInput-input":
            {
              backgroundColor: primaryColor.main,
            },
        },
      },
    },



    // Select Menus
    MuiMenu: {
      styleOverrides: {
        paper: {
          backgroundColor: primaryColor.dark,
          "& .MuiMenuItem-root": {
            color: textColor.primary,
            "&:hover": {
              backgroundColor: secondaryColor.dark,
              color: textColor.contrastText,
            },
            "&.Mui-selected": {
              backgroundColor: secondaryColor.main,
              color: textColor.contrastText,
              "&:hover": {
                backgroundColor: secondaryColor.light,
              },
            },
          },
        },
      },
    },

    //Buttons
    MuiButton: {
      variants: [
        {
          props: { variant: "contained", color: "primary" },
          style: {
            backgroundColor: secondaryColor.main,
            color: textColor.contrastText,
            paddingTop: "1.2em",
            paddingBottom: "1.2em",

            "&:hover": {
              backgroundColor: secondaryColor.light,
              color: textColor.contrastText,
            },
            
            "&.Mui-disabled": {
              backgroundColor: secondaryColor.dark,
              color: textColor.contrastText,
            },
          },
        },
        {
          props: { variant: "contained", color: "secondary" },
          style: {
            backgroundColor: secondaryColor.main,
            color: textColor.contrastText,
            "&:hover": {
              backgroundColor: secondaryColor.light,
            },
          },
        },
      ],
      defaultProps: {
        disableElevation: true,
      },
    },

    // Paper
    MuiPaper: {
      styleOverrides: {
        root: {
          '&[elevation="5"]': {
            backgroundColor: primaryColor.main,
            border: `solid 2px ${secondaryColor.main}`,
          },
          '&[elevation="5"] > .MuiTypography-root': {
            color: textColor.contrastText,
          },
        },
      },
    },
  },
});

export default theme;
