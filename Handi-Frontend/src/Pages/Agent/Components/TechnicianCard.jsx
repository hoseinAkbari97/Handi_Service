import React from 'react'
import { Box, Avatar, Typography } from '@mui/material'


export default function TechnicianCard({technician}) {
  return (
    <Box sx={{backgroundColor:"primary.main", width:220, height:320, borderRadius:3}}>

      <Avatar
            src={technician?.avatar || ""}
            alt={technician?.name || ""}
            sx={{ width: 74, height: 75, mt: -4, mx: "auto" }}
          />

      <Typography
        sx={{
          fontSize: 18,
          fontWeight: "bold",
          mt: 2,
          textAlign: "center",
          color:"text.secondary"
        }}
      >
        {technician.fullName}
      </Typography>
    </Box>
  )
}
