import { TrackList } from './components/TrackList';
import { FormAdd } from './components/FormAdd';
import dayjs from 'dayjs';
import customParseFormat from "dayjs/plugin/customParseFormat";
import { useState } from 'react';
import './App.css';

function App() {

  const items = [
    {
      date: 1699231038183,
      qty: 5
    },
    {
      date: 1699200038183,
      qty: 10
    }
  ];

  dayjs.extend(customParseFormat);

  const tracks = items;
  const [curTracks, setTracks] = useState(tracks);
  const initialState = {
    date: '',
    qty: ''
  }
  const [form, setForm] = useState(initialState);

  const addTrack = (event: React.FormEvent) => {
    event.preventDefault();

    setTracks(prevTracks => {

        if (form.date === '' || form.qty === '') {
            return prevTracks;
        }
        else {
            const formDate = Date.parse(dayjs(form.date).format('MM/DD/YYYY'));            
            const trackSameDate = prevTracks.filter(item => item.date === formDate);

            if (trackSameDate.length) {
                const tracksWithoutDate = prevTracks.filter(item => item.date !== formDate);
                return [...tracksWithoutDate, {
                    date: formDate,
                    qty: Number(form.qty) + Number(trackSameDate[0].qty)
                }].sort((a, b) => 
                    a.date - b.date 
                );
            }
            else {
                return [...prevTracks, {
                    date: formDate,
                    qty: Number(form.qty)
                }].sort((a, b) => 
                    a.date - b.date 
                );
            }
        }
    });

    setForm(initialState);
  }

  const deleteTrack = (date: number) => {
    setTracks(prevTracks => {
        return prevTracks.filter(item => item.date !== date).sort((a, b) => 
            a.date - b.date 
        );
    });
  }

  return (
    <div className="container">
      <FormAdd addTrack={addTrack} setForm={setForm} form={form}/>
      <TrackList tracks={curTracks} onDelete={deleteTrack}/>
    </div>
  );
}

export default App;
