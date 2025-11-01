import { Box } from '@mui/material'
import React from 'react'
import TaskCard from '../Components/TaskCard'
import { TasksList } from '../../../Datas'


export default function ManageTasks() {
  return (
    <Box
    sx={{
      display:"grid" ,
      justifyContent:"center",
      alignItems:"center",
      height:"100%",
      gap:1,
      gridTemplateColumns:"repeat(auto-fit, minmax(280px, 1fr))"
    }}
      
    >
      {TasksList.map((task, index) => (
        <Box key={index}>
          <TaskCard task={task} />
        </Box>
      ))}
    </Box>
  )
}
