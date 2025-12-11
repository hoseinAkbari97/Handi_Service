import { Box, Typography, Button, ButtonGroup } from "@mui/material";
import { Engineering } from "@mui/icons-material";
import PersonIcon from "@mui/icons-material/Person";
import ErrorIcon from "@mui/icons-material/Error";

export default function NewRequestCard({task}) {
  return (
    <Box
      sx={{
        display: "flex",
        justifySelf: "center",
        flexDirection: "column",
        backgroundColor: "secondary.dark",
        justifyContent: "space-between",
        width: 280,
        height: 380,
        borderTop: 5,
        // borderColor: task.status === "complete"
        // ? "success.light"
        // : task.status === "assigned"
        // ? "warning.light"
        // : "error.main",
        borderColor: "primary.light",
        borderRadius: 3,
        mt: 2,
        pb: 2,
        px: 2,
      }}
    >
      <Box>
        <Typography
          sx={{
            fontSize: 18,
            fontWeight: "bold",
            mt: 2,
            textAlign: "center",
            color: "primary.light",
          }}
        >
          درخواست جدید
        </Typography>

        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            mt: 2,
            gap: 0.3,
          }}
        >
          <PersonIcon fontSize="small" />
          <Typography
            sx={{
              fontSize: 14,
              mt: 0.5,
            }}
          >
            نام مشتری:
          </Typography>
        </Box>

        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            gap: 0.5,
            mt: 2,
          }}
        >
          <ErrorIcon fontSize="small" />
          <Typography
            sx={{
              fontSize: 14,
              mt: 0.5,
            }}
          >
            مشکل:
          </Typography>
        </Box>
      </Box>

      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          alignSelf: "",
          mt: 1,
          width: "100%",
        }}
      >
        <ButtonGroup
          size="large"
          variant="contained"
          aria-label="Basic button group"
          color="primary.main"
          sx={{ mt: 1, justifySelf: "center" }}
        >
          <Button sx={{minWidth:"50%", textWrap:"nowrap", backgroundColor:"success.main"}}>قبول درخواست</Button>
          <Button sx={{minWidth:"50%", textWrap:"nowrap", backgroundColor:"error.main"}}>رد درخواست</Button>
        </ButtonGroup>
      </Box>
    </Box>
  );
}
