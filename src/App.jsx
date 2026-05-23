import "primereact/resources/themes/lara-dark-teal/theme.css";
import "primereact/resources/primereact.min.css";
import "primeicons/primeicons.css";

import './App.css';
import { PrimeReactProvider } from 'primereact/api';
import Portfolio from './Views/Portfolio';


function App() {
  return (
    <PrimeReactProvider>
      <Portfolio/>
    </PrimeReactProvider>
  );
}

export default App;
