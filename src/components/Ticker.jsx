import React from "react"
import { useState, useContext } from "react";
import { useQuery } from "react-query";
import Ticker from "react-ticker"
import { TasksService } from "../app/services/tasks";
import Loader from "./Loader";
import ThemeContext from "../context";


const MyTicker = () => {
  const [newsString, setNewsString] = useState('')
  const {isLoading} = useQuery(
    'news',
    () => TasksService.getNews(),
    {
      onError: error => alert(error),
      onSuccess: ({data}) => {
        let newsString = ''
        data.articles.forEach(item => {
          newsString += item.content
        })
        setNewsString(newsString)
      }
    }
  )

  const {stringShow} = useContext(ThemeContext)

  if(stringShow){
    return (
      <>
        {isLoading ? <Loader/> :
        <Ticker
        style={{
          background: '#121212',
        }}
        >
          {({ index }) => (
            <>
              <p 
              style={{ 
                paddingRight: "0.5em",
                whiteSpace:'nowrap',
                background: '#121212',
                color: '#fff'
                }}>
                {newsString}
              </p>
            </>
          )}
        </Ticker>
        }
      </>
    );
  }

  return null
}

export default MyTicker