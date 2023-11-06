import { TrackItem } from './components/TrackItem';
import { TrackList } from './components/TrackList';
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

  return (
    <div className="container">
      <TrackList tracks={items}/>
    </div>
  );
}

export default App;
