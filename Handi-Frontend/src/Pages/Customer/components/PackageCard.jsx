import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import { Checkbox } from "@mui/material";
import { toPersianNumber } from "../../../Utils/NumberUtils"

export default function PackageCard({
  title,
  comment,
  bgColor,
  txtColor,
  selected,
  onSelect,
  price
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
        p: 4,
      }}
    >
      <Box>
        <Typography
          sx={{
            color: txtColor,
            fontWeight: "bold",
            cursor: "default",
            fontSize:{
              lg:"20px",
              sm:"1rem",
              xs: "12px"
            }
          }}
        >
          {title}
        </Typography>
        <Typography
          sx={{
            color: txtColor,
            fontWeight: "bold",
            cursor: "default",
            fontSize:{
              lg:"20px",
              sm:"1rem",
              xs: "12px"
            }
          }}
        >
          {toPersianNumber(price)} تومان
        </Typography>
        <Typography
          variant="subtitle2"
          sx={{
            mt: 1,
            color: txtColor,
            cursor: "default",
            fontSize:{
              lg:"15px",
              sm:"14px",
              xs: "10px"
            }
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
