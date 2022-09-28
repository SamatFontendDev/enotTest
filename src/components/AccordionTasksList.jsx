import React from "react"
import { Box } from "@mui/material"
import Item from "./Item"
import {useQuery} from 'react-query'
import { TasksService } from "../app/services/tasks"
import Loader from "./Loader"

const AccordionTasksList = ({date}) => {
    const {isLoading, data:res} = useQuery(
        'accordion tasks' + date, 
        () => TasksService.getTodayTasks(date),
        {
            onError: (error) => alert(error.message),
            onSuccess: ({data}) => {
                console.log(data)
            }
        })

    return(
        <Box
            cx={{
                background: '#282828',
                boxShadow: '16px 16px 20px rgba(0, 0, 0, 0.15), -8px -8px 20px rgba(255, 255, 255, 0.05)',
                borderRadius: '40px'
            }}
        >
           {isLoading ? <Loader/> : res.data.map(item => <Item key={item.id} data={item} />)}
        </Box>
    )
}

export default AccordionTasksList