import { Box, Typography, Button } from "@mui/material";
import AcUnitIcon from '@mui/icons-material/AcUnit';
import EngineeringIcon from '@mui/icons-material/Engineering';

export default function ActiveRequestCard() {
  return (
    <Box
      sx={{
        backgroundColor: "primary.main",
        border: "solid 2px",
        borderColor: "secondary.main",
        color: "text.primary",
        p: 3,
        borderRadius: 3,
        textAlign: "center",
        boxShadow: 3,
        m: "0 auto",
        width:{
          xs:"100%",
          sm:"100%",
          md:"700px"
        }
      }}
    >
      <Typography variant="h5" color="secondary" sx={{ mb: 2, fontWeight:"bold" }}>
        درخواست فعال شما
      </Typography>
      <Typography sx={{display:"flex", justifyContent:"center", alignItems:"center"}}><AcUnitIcon fontSize="small" sx={{ mr:.5}}/> تعمیر یخچال فریزر سامسونگ</Typography>
      <Typography sx={{display:"flex", justifyContent:"center", alignItems:"center", mt: 1 }}><EngineeringIcon sx={{ mr:.5}} /> تعمیرکار: علی رضایی</Typography>
      <Typography variant="h5" color="secondary" sx={{ mt: 2, fontWeight:"bold" }}>
        هزینه: ۲۵۰,۰۰۰ تومان
      </Typography>
      <Button variant="contained" color="secondary" sx={{ mt: 2, borderRadius: 1.5, fontSize: 17, width:{xs:"100%", sm:"70%", md:"350px" } }}>
        پرداخت هزینه
      </Button>
    </Box>
  );
}