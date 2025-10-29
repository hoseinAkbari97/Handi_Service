import React from 'react'
import TechnicianCard from '../Components/TechnicianCard'
import { Box } from '@mui/material'

export default function TeamTechnicians() {
  return (
    <Box display={'flex'} justifyContent={"center"} alignItems={"center"} height={"100%"}>
      <TechnicianCard />
    </Box>
  )
}
