import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import { Checkbox } from "@mui/material";

export default function PackageCard({
  title,
  bgColor,
  txtColor,
  selected,
  onSelect,
}) {
  return (
    <Box
      sx={{
        display: "flex",
        backgroundColor: bgColor,
        width: "100%",
        height: "33%",
        borderRadius: 3,
        justifyContent: "space-around",
        alignItems: "center",
        px: 4,
      }}
    >
      <Typography
        sx={{
          color: txtColor,
          fontWeight: "bold",
        }}
      >
        {title}
      </Typography>
      <Box>
        <Checkbox checked={selected} onChange={onSelect} sx={{color:"primary.main"}} />
      </Box>
    </Box>
  );
}
