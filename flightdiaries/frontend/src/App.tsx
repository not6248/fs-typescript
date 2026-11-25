import React, { SyntheticEvent, useEffect, useState } from 'react';

import { Diary, NewDiaryEntry, Weather, Visibility } from './types';

import flightdiaryService from './services/flightdiaries';
import axios from 'axios';

function App() {
  const [diaries, setDiaries] = useState<Diary[]>([]);
  const [weather, setWeather] = useState<Weather>(Weather.Sunny);
  const [visibility, setVisibility] = useState<Visibility>(
    Visibility.Great,
  );
  const [date, setDate] = useState('');
  const [comment, setComment] = useState<string>('');
  const [errorMessage, seterrorMessage] = useState<string>('');

  const setError = (message: string) => {
    seterrorMessage(message);
    setTimeout(() => {
      seterrorMessage('');
    }, 3000);
  };

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
          setError(message);
        } else {
          type ValueKey = keyof typeof values;
          const path = e?.response?.data.error[0].path[0] as ValueKey;
          setError(`Error: Incorrect ${path} : ${values[path] || 'null'}`);
        }
      } else {
        console.error('Unknown error', e);
        setError('Unknown error');
      }
    }
  };

  const handleVisibilityChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setVisibility(event.target.value as Visibility);
  };

  const handleWeatherChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setWeather(event.target.value as Weather);
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
        <h3>Add new entry</h3>
        <span style={{ color: 'red' }}>{errorMessage}</span>
        <form onSubmit={addDiary}>
          <label>
            <span>date: </span>
            <input
              type='date'
              name='date'
              value={date}
              onChange={({ target }) => setDate(target.value)}
            />
          </label>
          <br />
          <label>
            <span>visibility : </span>
            great
            <input
              type='radio'
              name='visibility'
              value='great'
              checked={visibility === 'great'}
              onChange={handleVisibilityChange}
            />
            good
            <input
              type='radio'
              name='visibility'
              value='good'
              checked={visibility === 'good'}
              onChange={handleVisibilityChange}
            />
            ok
            <input
              type='radio'
              name='visibility'
              value='ok'
              checked={visibility === 'ok'}
              onChange={handleVisibilityChange}
            />
            poor
            <input
              type='radio'
              name='visibility'
              value='poor'
              checked={visibility === 'poor'}
              onChange={handleVisibilityChange}
            />
          </label>
          <br />
          <label>
            <span>weather : </span>
            sunny
            <input
              type='radio'
              name='weather'
              value='sunny'
              checked={weather === 'sunny'}
              onChange={handleWeatherChange}
            />
            rainy
            <input
              type='radio'
              name='weather'
              value='rainy'
              checked={weather === 'rainy'}
              onChange={handleWeatherChange}
            />
            cloudy
            <input
              type='radio'
              name='weather'
              value='cloudy'
              checked={weather === 'cloudy'}
              onChange={handleWeatherChange}
            />
            stormy
            <input
              type='radio'
              name='weather'
              value='stormy'
              checked={weather === 'stormy'}
              onChange={handleWeatherChange}
            />
            windy
            <input
              type='radio'
              name='weather'
              value='windy'
              checked={weather === 'windy'}
              onChange={handleWeatherChange}
            />
          </label>
          <br />
          <label>
            <span>comment: </span>
            <input
              type='comment'
              name='comment'
              value={comment}
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
