import axios from 'axios'

const API_URL = 'http://localhost:3004/'
const ApiKey = '675a57d0e9c84287bd26a730b9eaa288'

axios.defaults.baseURL = API_URL

export const TasksService = {
    async getAll(){
        return axios.get('/tasks')
    },
    async edit(task){
        return axios.patch(`/tasks/${task.id}`, {done: task.done})
    },
    async getTodayTasks(date){
        return axios.get(`/tasks?date=${date}`)
    },
    async getNews(){
        return axios.get(`https://newsapi.org/v2/everything?q=Apple&from=2022-09-28&sortBy=popularity&apiKey=${ApiKey}`)
    }
}