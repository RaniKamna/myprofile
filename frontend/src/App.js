import { Route, Routes } from 'react-router-dom';
import './App.css';
import { Mybioscreen } from './screens/Mybioscreen';
import { Mybioeditscreen } from './screens/Mybioeditscreen';

function App() {
  return (
    <div>
      <Routes>
        <Route exact path='/' element={<Mybioscreen />} />
        <Route exact path='/edit' element={<Mybioeditscreen />} />
      </Routes>
    </div>
  );
}

export default App;
