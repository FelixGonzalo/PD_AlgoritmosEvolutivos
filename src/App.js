import {BrowserRouter as Router, Switch, Route} from 'react-router-dom'
import FormSolicitudReciclaje from './pages/FormSolicitudReciclaje'
import Mapa from './pages/Mapa'
import Header from './components/layout/Header'

function App() {
  return (
    <Router>
      <Switch>
        <Route path="/mapa">
          <Header />
          <Mapa />
        </Route>
        <Route path="/">
          <Header />
          <FormSolicitudReciclaje />
        </Route>
      </Switch>
    </Router>
  );
}

export default App;
