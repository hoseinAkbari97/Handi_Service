import { Box } from '@mui/material'
import React from 'react'
import TaskCard from '../Components/TaskCard'
import { TasksList } from '../../../Datas'


export default function ManageTasks() {
  return (
    <Box>
      <TaskCard task={TasksList[0]}/>
    </Box>
  )
}
