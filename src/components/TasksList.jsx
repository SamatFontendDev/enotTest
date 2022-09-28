import React, { useContext, useState } from "react"
import {useQuery} from 'react-query'
import { TasksService } from "../app/services/tasks"
import Loader from "./Loader"
import Typography from '@mui/material/Typography'
import Box from '@mui/material/Box'
import SvgIcon from "./SvgIcons"
import Checkbox from '@mui/material/Checkbox'
import FormControlLabel from '@mui/material/FormControlLabel'
import TodayTasksList from "./TodayTasksList"
import AccordionList from "./AccordionList"
import Modal from '@mui/material/Modal'
import Button from '@mui/material/Button'
import IOSSwitch from "./IOSSwitch"
import ThemeContext from "../context"

const TasksList = () => {
    const [checked, setChecked] = React.useState(true)
    const [todayTasks, setTodayTasks] = useState([])
    const [open, setOpen] = React.useState(false)
    const {stringShow, setStringShow} = useContext(ThemeContext)

    const handleOpen = () => {
        setOpen(true)
    }
    const handleClose = () => setOpen(false)
    
    const {isLoading,refetch:refet} = useQuery(
        'today tasks', 
        () => TasksService.getTodayTasks('10/07'),
        {
            onError: (error) => alert(error.message),
            onSuccess: ({data}) => {
                setTodayTasks(data)
            }
        })
    const {refetch} = useQuery(
        'all tasks', 
        () => TasksService.getAll(),
        {
            onError: (error) => alert(error.message),
            onSuccess: ({data}) => {
                setTodayTasks(data)
            },
            enabled: false
        })

    
    const handleChange = (event) => {
        setChecked(event.target.checked)
        if(checked){
            refetch()
        } else{
            refet()
        }
    };

    const style = {
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        width: 300,
        bgcolor: '#222',
        boxShadow: 24,
        p: 4,
        color: '#fff',
        borderRadius: '10px'
      };

      const handleChangeSwitch = () => {
        setStringShow(!stringShow)
        setOpen(false)
      }

    return(
        <React.Fragment>
            <Box
            sx={{ 
                bgcolor: '#121212', 
                alignItems: 'center', 
                minHeight: '100%', 
                display: 'flex', 
                justifyContent: 'space-between',
                fontFamily: "Actor",
                width: '100%',
                paddingLeft: '15px',
                paddingRight: '15px',
                boxSizing: 'border-box'
            }}
            >  
                <Typography 
                sx={{ color: 'rgba(255, 255, 255, 0.7)'}} 
                variant="h4">
                    Тестовое задание
                </Typography>
                <Box
                    sx={{
                        backgroundColor: '#222',
                        borderRadius: '30px',
                        padding: '13px 39px',
                        color: '#fff',
                        minWidth: '390px'
                    }}
                >
                     <Box
                        sx={{
                            display: 'flex',
                            justifyContent: 'space-between',
                            alignItems: 'center',
                            marginBottom: '17px'
                        }} 
                    >
                         <Typography 
                        variant="h4">
                            To Do
                        </Typography>
                        <Button onClick={handleOpen}>
                        <SvgIcon 
                        id='settings' 
                        width='30' height='30' 
                        fill='#fff' />
                        </Button>
                    </Box>
                    <FormControlLabel
                        control={
                        <Checkbox 
                        checked={checked}
                        onChange={handleChange}
                        sx={{
                            color: '#fff',
                            '&.Mui-checked': {
                              color: '#fff',
                            },
                          }}
                        />
                        }
                        label="Today Tasks:"
                    />
                    {isLoading ? <Loader/> : <TodayTasksList data={todayTasks} />}
                    <AccordionList />
                </Box>
            </Box>
            <Modal
                open={open}
                onClose={handleClose}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <Box sx={style}>
                <Typography id="modal-modal-title" variant="h6" component="h2">
                    Бегущая строка
                </Typography>
                <Typography id="modal-modal-description" sx={{ mt: 2 }}>
                    <IOSSwitch
                    onChange={handleChangeSwitch}
                    checked={stringShow}
                    />
                </Typography>
                </Box>
            </Modal>
        </React.Fragment>
    )
}

export default TasksList