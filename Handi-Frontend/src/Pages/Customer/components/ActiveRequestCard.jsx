import { Box, Typography, Button } from "@mui/material";
import BuildIcon from '@mui/icons-material/Build';
import ErrorIcon from '@mui/icons-material/Error';
import EngineeringIcon from "@mui/icons-material/Engineering";
import { UserContext } from "../../../Contexts/UserContext";
import { useContext } from "react";
import { toPersianNumber } from "../../../Utils/NumberUtils";

export default function ActiveRequestCard() {
  const { user } = useContext(UserContext);

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        backgroundColor: "primary.main",
        border: "solid 2px",
        borderColor: "secondary.main",
        color: "text.primary",
        p: 3,
        borderRadius: 3,
        textAlign: "center",
        boxShadow: 3,
        m: "0 auto",
        width: "100%",
        height: { lg: "100%", xl: "350px" },
        justifyContent: "center",
      }}
    >
      
      <Typography
        variant="h5"
        color="secondary"
        sx={{ mb: 2, fontWeight: "bold" }}
      >
        آخرین درخواست فعال شما
      </Typography>

      {user.active_request ? (
        <>
          <Box>
            <Typography
              sx={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <BuildIcon fontSize="small" sx={{ mr: 0.5 }} />
              {user.active_request.title}
            </Typography>

              <Typography
              sx={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                mt: 1,
              }}
            >
              <ErrorIcon sx={{ mr: 0.5 }} />
              مشکل: {user.active_request.description}
            </Typography>
            
            <Typography
              sx={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                mt: 1,
              }}
            >
              <EngineeringIcon sx={{ mr: 0.5 }} />
             تعمیرکار: {user?.active_request?.technician?.first_name} {user?.active_request?.technician?.last_name}
            </Typography>
            <Typography
              variant="h5"
              color="secondary"
              sx={{ mt: 2, fontWeight: "bold" }}
            >
            هزینه: {toPersianNumber(user.active_request.cost)} تومان
            </Typography>
          </Box>
          <Box>
            <Button
              variant="contained"
              color="secondary"
              sx={{
                mt: 2,
                borderRadius: 1.5,
                fontSize: 17,
                width: "100%",
              }}
            >
              پرداخت هزینه
            </Button>
          </Box>
        </>
      ) : (
        <Typography
          variant="body2"
          color="text.dark"
          sx={{ mb: 2, fontWeight: "bold" }}
        >
          هیچ درخواست فعالی وجود ندارد
        </Typography>
      )}
    </Box>
  );
}
