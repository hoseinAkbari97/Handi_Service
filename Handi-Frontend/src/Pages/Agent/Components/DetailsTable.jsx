import React from 'react'
import {
  Typography,
  Card,
  Table,
  TableHead,
  TableBody,
  TableRow,
  TableCell,
} from "@mui/material";
import { TasksList } from '../../../Datas';

export default function DetailsTable() {
  return (
    <Card
        sx={{
          backgroundColor: "primary.main",
          color: "text.primary",
          borderRadius: 3,
          p: 2,
        }}
      >
        <Typography variant="h6" sx={{ mb: 2, fontWeight: "bold" }}>
          جزئیات کارها
        </Typography>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell sx={{ color: "secondary.main" }}>امتیاز</TableCell>
              <TableCell sx={{ color: "secondary.main" }}>هزینه</TableCell>
              <TableCell sx={{ color: "secondary.main" }}>دستگاه</TableCell>
              <TableCell sx={{ color: "secondary.main" }}>مشتری</TableCell>
              <TableCell sx={{ color: "secondary.main" }}>تکنسین</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {TasksList.map((task, index) => (
              <TableRow key={index}>
                <TableCell sx={{ color: "text.primary" }}>{task.taskRate}</TableCell>
                <TableCell sx={{ color: "text.primary" }}>{task.cost}</TableCell>
                <TableCell sx={{ color: "text.primary" }}>{task.request.device}</TableCell>
                <TableCell sx={{ color: "text.primary" }}>{task.customerName}</TableCell>
                <TableCell sx={{ color: "text.primary" }}>{task.technicianName}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </Card>
  )
}
