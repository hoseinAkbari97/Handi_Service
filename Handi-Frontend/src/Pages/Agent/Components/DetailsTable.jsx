import {
  Typography,
  Card,
  Table,
  TableHead,
  TableBody,
  TableRow,
  TableCell,
} from "@mui/material";
import { toPersianNumber } from "../../../Utils/NumberUtils";

export default function DetailsTable({tasks}) {

  return (
    <Card
      sx={{
        backgroundColor: "primary.main",
        color: "text.primary",
        borderRadius: 3,
        p: 2,
      }}
    >

      <Typography dir="rtl" variant="h6" sx={{ mb: 2, fontWeight: "bold" }}>
        جزئیات کارها
      </Typography>
      <Table dir="rtl">
        <TableHead>
          <TableRow>
            <TableCell sx={{ color: "secondary.main" }}>تکنسین</TableCell>
            <TableCell sx={{ color: "secondary.main" }}>مشتری</TableCell>
            <TableCell sx={{ color: "secondary.main" }}>دستگاه</TableCell>
            <TableCell sx={{ color: "secondary.main" }}>هزینه</TableCell>
            <TableCell sx={{ color: "secondary.main" }}>امتیاز</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {tasks.map((task) => (
                  
            <TableRow key={task.id}>
              <TableCell sx={{ color: "text.primary" }}>
                {task.technician_name}
              </TableCell>
              <TableCell sx={{ color: "text.primary" }}>
                {task.customer_name}
              </TableCell>
              <TableCell sx={{ color: "text.primary" }}>
                {task.title}
              </TableCell>
              <TableCell sx={{ color: "text.primary" }}>{toPersianNumber(task.cost)}</TableCell>
              <TableCell sx={{ color: "text.primary" }}>
                {task.rate || "ثبت نشده"}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </Card>
  );
}
