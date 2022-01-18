// import './App.css';

import { Route } from 'react-router-dom';
import { Fragment } from 'react';

import LandingPage from './components/LandingPage';
import Home from './components/Home';
import RecipeCreation from './components/RecipeCreation';
import Details from './components/Details';



function App() {
 
  return(
    <Fragment>
        <Route exact path="/" component={LandingPage}/>
        <Route exact path="/home" component={Home}/>
        {/* <Route path="/recipes/:idRecipe" render={({location, match})=><Details location={location} match={match}/>}/> */}
        <Route path="/recipes/:idRecipe" render={({match})=><Details match={match}/>}/>
        <Route exact path="/recipe" component={RecipeCreation}/>
    </Fragment>
  );
}

export default App;
