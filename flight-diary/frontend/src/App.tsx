import { useEffect, useState } from 'react'
import axios from 'axios'

import { apiBaseUrl } from './constants'

interface Diary {
  id: number,
  date: string,
  weather: string,
  comment: string,
  visibility: string
}

const App = () => {
  const [diaries, setDiaries] = useState<Diary[]>([
    {id: 50, date: '2020-09-15', comment: 'testing', weather: 'rainy', visibility: 'poor'}
  ]);

  useEffect(() => {
    axios.get<Diary[]>(`${apiBaseUrl}/diaries`).then(response => {
      console.log(response.data)
      setDiaries(response.data)
    })
  }, [])
  
  return (
    <>
     {diaries.map(d => (
      <div key={d.id}>
        <p>date: {d.date}</p>
        <p>visibility: {d.visibility}</p>
        <p>weather: {d.weather}</p>
        <p>comment: {d.comment}</p>
      </div>
     ))}
    </>
  )
}

export default App
