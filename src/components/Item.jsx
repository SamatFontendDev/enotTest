import React from 'react'
import Box from '@mui/material/Box'
import ListItemText from '@mui/material/ListItemText'
import ListItem from '@mui/material/ListItem'
import { useMutation } from 'react-query'
import { TasksService } from '../app/services/tasks'
import IOSSwitch from './IOSSwitch'
import { Typography } from '@mui/material'

const Item = ({data}) => {
  const {mutateAsync} = useMutation('update task', task => TasksService.edit(task), {
    onError: error => {
      alert(error.message)
    }
  })

  const handleChange = async e => {
    data.done = !data.done
    
    await mutateAsync(data)
  }

    return(
        <Box
        cx={{
            display: 'flex',
            alignItems: 'center', 
            justifyContent: 'space-between',
        }}
        >
                <ListItem
                sx={{
                    borderLeft: '5px solid #FF0000',
                    overflow: 'hidden',
                    borderRadius: '3px',
                    marginBottom: '10px'
                }}
                  secondaryAction={
                    <IOSSwitch checked={data.done} onChange={handleChange} />
                  }
                >  
                  <Box>
                  <ListItemText
                    sx={{
                      textDecoration: `${data.done ? 'line-through' : 'none'}`
                    }}
                    primary={data.title}
                  />
                  <Typography
                  sx={{
                    fontSize: '14px',
                    color: 'rgba(255, 255, 255, 0.6)'
                  }}
                  >{data.description}</Typography>
                  </Box>
                </ListItem>
        </Box>
    )
}

export default Item