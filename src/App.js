import React from 'react';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import  Home  from './pages/Home';
import  Product  from './pages/Product';
import Navigation from "./components/Navigation";
import { BrowserRouter,Route, Switch } from  'react-router-dom';
function App() {
  return (


    <BrowserRouter>
    <div className="container">
    <Navigation/>
      <Switch>
        <Route path='/' component={Home} exact/>
        <Route path='/product/:id' component={Product}/>
      </Switch>
      
    </div>
    </BrowserRouter>
    
  );
}

export default App;
