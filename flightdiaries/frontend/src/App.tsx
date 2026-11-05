import { useEffect, useState } from 'react';

import { Diary } from './types';

import flightdiaryService from './services/flightdiaries';

function App() {
  const [diaries, setDiaries] = useState<Diary[]>([]);

  useEffect(() => {
    const fetchDiariesList = async () => {
      const diaries = await flightdiaryService.getAll();
      setDiaries(diaries);
    };
    void fetchDiariesList();
  }, []);

  return (
    <>
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
