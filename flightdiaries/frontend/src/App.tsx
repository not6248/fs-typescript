import { SyntheticEvent, useEffect, useState } from 'react';

import { Diary, NewDiaryEntry, Weather, Visibility } from './types';

import flightdiaryService from './services/flightdiaries';
import axios from 'axios';

function App() {
  const [diaries, setDiaries] = useState<Diary[]>([]);
  const [weather, setWeather] = useState<Weather>(Weather.Sunny);
  const [visibility, setVisibility] = useState<Visibility>(Visibility.Great);
  const [date, setDate] = useState('');
  const [comment, setComment] = useState('');

  useEffect(() => {
    const fetchDiariesList = async () => {
      const diaries = await flightdiaryService.getAll();
      setDiaries(diaries);
    };
    void fetchDiariesList();
  }, []);

  const submitNewDiary = async (values: NewDiaryEntry) => {
    try {
      const diary = await flightdiaryService.create(values);
      setDiaries(diaries.concat(diary));
      setWeather(Weather.Sunny);
      setVisibility(Visibility.Great);
      setDate('');
      setComment('');
    } catch (e: unknown) {
      if (axios.isAxiosError(e)) {
        if (e?.response?.data && typeof e?.response?.data === 'string') {
          const message = e.response.data.replace(
            'Something went wrong. Error: ',
            '',
          );
          console.error(message);
        } else {
          console.error('Unrecognized axios error');
        }
      } else {
        console.error('Unknown error');
      }
    }
  };

  const addDiary = (event: SyntheticEvent) => {
    event.preventDefault();
    submitNewDiary({
      weather,
      visibility,
      date,
      comment,
    });
  };

  return (
    <>
      <div>
        <form onSubmit={addDiary}>
          <label>
            <span>weather :</span>
            <select
              name='weather'
              value={weather}
              onChange={({ target }) => setWeather(target.value)}
            >
              <option value='sunny'>Sunny</option>
              <option value='rainy'>Rainy</option>
              <option value='cloudy'>Cloudy</option>
              <option value='stormy'>Stormy</option>
              <option value='windy'>Windy</option>
            </select>
          </label>
          <br />
          <label>
            <span>Visibility :</span>
            <select
              name='visibility'
              onChange={({ target }) => setVisibility(target.value)}
            >
              <option value='great'>Great</option>
              <option value='good'>Good</option>
              <option value='ok'>Ok</option>
              <option value='poor'>Poor</option>
            </select>
          </label>
          <br />
          <label>
            <span>Date: </span>
            <input
              type='date'
              name='date'
              onChange={({ target }) => setDate(target.value)}
            />
          </label>
          <br />
          <label>
            <span>comment: </span>
            <input
              type='comment'
              name='comment'
              onChange={({ target }) => setComment(target.value)}
            />
          </label>
          <br />
          <button type='submit'>create</button>
        </form>
      </div>

      <table>
        <thead>
          <tr>
            <th>Id</th>
            <th>Date</th>
            <th>Weather</th>
            <th>Visibility</th>
          </tr>
        </thead>
        <tbody>
          {diaries.map((diary) => (
            <tr key={diary.id}>
              <td>{diary.id}</td>
              <td>{diary.date}</td>
              <td>{diary.weather}</td>
              <td>{diary.visibility}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </>
  );
}

export default App;
