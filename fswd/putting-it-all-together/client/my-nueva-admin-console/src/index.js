import { createRoot } from 'react-dom/client';
import {
  BrowserRouter,
  Routes,
  Route,
} from "react-router-dom";
import App from "./App";
import AddFood from "./components/AddNuevan"
import ShowAllNuevans from "./components/ShowAllNuevans"
import ShowNuevan from "./components/ShowNuevan"
import UpdateNuevan from "./components/UpdateNuevan"

const container = document.getElementById('root');
const root = createRoot(container);
root.render(
  <BrowserRouter>
    <Routes>
      <Route path="/" element= {<App />}>
        <Route path="show" element={<ShowAllNuevans />}  />
        <Route path='show/:email' element={<ShowNuevan />} />
        <Route path="createMeal" element={<CreateMeal />} />
        <Route path="update-nuevan" element={<UpdateNuevan />} />
      </Route>
      <Route path="*" element={ <p>Uh oh! There's nothing here! </p>} />
    </Routes>
  </BrowserRouter>
);
