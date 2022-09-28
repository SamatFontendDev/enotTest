import { Box } from "@mui/material"
import React from "react"
import Item from "./Item"

const TodayTasksList = ({data}) => {
    return(
        <Box
            cx={{
                background: '#282828',
                boxShadow: '16px 16px 20px rgba(0, 0, 0, 0.15), -8px -8px 20px rgba(255, 255, 255, 0.05)',
                borderRadius: '40px'
            }}
        >
            {data.map(item => <Item key={item.id} data={item} />)}
        </Box>
    )
}

export default TodayTasksList