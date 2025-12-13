import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import { Checkbox } from "@mui/material";

export default function PackageCard({
  title,
  comment,
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
        justifyContent: "space-between",
        alignItems: "center",
        px: 4,
      }}
    >
      <Box>
        <Typography
          sx={{
            color: txtColor,
            fontWeight: "bold",
            cursor: "default",
          }}
        >
          {title}
        </Typography>
        <Typography
          variant="subtitle2"
          sx={{
            mt: 1,
            color: txtColor,
            cursor: "default",
          }}
        >
          {comment}
        </Typography>
      </Box>

      <Box>
        <Checkbox
          checked={selected}
          onChange={onSelect}
          sx={{ color: "primary.main" }}
        />
      </Box>
    </Box>
  );
}
