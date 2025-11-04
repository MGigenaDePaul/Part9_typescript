import { useEffect, useState } from 'react'
import type { Diary } from './types'
import { getAllDiaries, createDiary } from './diaryService'
import axios from 'axios';

interface Error {
  data: string
}

const App = () => {
  const [newDate, setNewDate] = useState('');
  const [newWeather, setNewWeather] = useState('');
  const [newVisibility, setNewVisibility] = useState('');
  const [newComment, setNewComment] = useState('');
  const [diaries, setDiaries] = useState<Diary[]>([]);
  const [notify, setNotify] = useState<Error>({});

  useEffect(() => {
    getAllDiaries().then(data => {
      setDiaries(data)
    })
  }, [])
  
  const diaryCreation = (event: React.SyntheticEvent) => {
    event.preventDefault()

    createDiary({
      date: newDate,
      weather: newWeather,
      visibility: newVisibility,
      comment: newComment
    })
    .then(data => {
      setDiaries(diaries.concat(data))

      setNewDate('')
      setNewWeather('')
      setNewVisibility('')
      setNewComment('')
    })
    .catch((error) => {
      if (axios.isAxiosError(error)) {
        console.log('error status:', error.status)
        console.error('error response', error.response)
        console.log('total error', error)
        setNotify(error.response)
      }
    })
  }

  return (
    <>
    <h2>Add new entry</h2>
    <p style={{color: 'rgb(255,0,0)'}}>{notify.data}</p>
    <form onSubmit={diaryCreation}>
      <label>date:</label>
      <input value={newDate} onChange={(event) => (setNewDate(event.target.value))} />
      <br />
      <label>weather:</label>
      <input value={newWeather} onChange={(event) => (setNewWeather(event.target.value))} />
      <br />
      <label>visibility:</label>
      <input value={newVisibility} onChange={(event) => (setNewVisibility(event.target.value))} />
      <br />
      <label>comment:</label>
      <input value={newComment} onChange={(event) => (setNewComment(event.target.value))} />
      <br/>

      <button type='submit'>add</button>

      <h2>Diary entries</h2>
      {diaries.map(d => (
        <div key={d.id}>
          <h3>{d.date}</h3>
          visibility: {d.visibility}
          <br />
          weather: {d.weather}
        </div>
      ))}
     </form>
    </>
  )
}

export default App
