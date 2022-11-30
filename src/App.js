import './App.css';
import {BrowserRouter,Routes,Route} from 'react-router-dom'

//component
import AddVehicle from './pages/AddVehicle';
import DetailVehicle from './pages/DetailVehicle'
import EditVehicle from './pages/EditVehicle'
import Index from './pages/Index';


function App() {
  return (
    <BrowserRouter >
    <Routes>
      <Route path="/" element={<Index/>} />
      <Route path="/add-vehicle" element={<AddVehicle/>} />
      <Route path="/edit-vehicle/:id" element={<EditVehicle/>} />
      <Route path="/detail-vehicle/:id" element={<DetailVehicle/>} />
    </Routes>
    </BrowserRouter>
  );
}

export default App;
