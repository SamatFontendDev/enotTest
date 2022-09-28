import React from "react"
import {useQuery} from 'react-query'
import { TasksService } from "../app/services/tasks"
import Accordion from '@mui/material/Accordion'
import AccordionDetails from '@mui/material/AccordionDetails'
import AccordionSummary from '@mui/material/AccordionSummary'
import Typography from '@mui/material/Typography'
import SvgIcon from "./SvgIcons"
import Loader from "./Loader"
import AccordionTasksList from "./AccordionTasksList"

function uniq(a) {
  var seen = {};
  return a.filter(function(item) {
      return seen.hasOwnProperty(item) ? false : (seen[item] = true);
  });
}

function ControlledAccordions({data, index}) {
  const [expanded, setExpanded] = React.useState(false)

  const handleChange = (panel) => (event, isExpanded) => {
    setExpanded(isExpanded ? panel : false);
  };

  console.log(data)

  return (
      <Accordion
      expanded={expanded === 'panel1'} 
      onChange={handleChange('panel1')}>
        <AccordionSummary
          expandIcon={<SvgIcon id='arrow' width='20' height='20' fill='#fff'/>}
          aria-controls="panel1bh-content"
          id="panel1bh-header"
        >
          <Typography sx={{ width: '70%', flexShrink: 0 }}>{`${index === 1 ? 'Tomorrow' : data} Tasks`}</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Typography>
              <AccordionTasksList date={data} />
          </Typography>
        </AccordionDetails>
      </Accordion>
  );
}


const AccordionList = () => {
  const [days, setDays] = React.useState([])
  
  const {isLoading, data:res} = useQuery(
    'days tasks',
    () => TasksService.getAll(),
   {
     onError: error => alert(error.message),
     onSuccess: ({data}) => {
      let arr = []
      data.forEach(item => {
        arr.push(item.date)
      })
      arr = uniq(arr)
      setDays(arr)
     }
   }
  )
  

   return (
    <React.Fragment>
      {isLoading ? <Loader/> : days.map((item, index) => {
        if(index !== 0) {
          return <ControlledAccordions index={index} key={item} data={item} />
        }
      })}
    </React.Fragment>
   )
}

export default AccordionList