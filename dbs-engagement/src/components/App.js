import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';

import SignInSide from './Auth/loginform';
import MessageBoard from './Post/MessageBoard';




const App = () => {
    

    return (
            
            <Router>

                        
                <Route path="/" exact component={SignInSide} />
                <Route path='/posts' exact component={MessageBoard}/>        
            </Router>
          
    );
};

export default App;

// login: no navbar, no sidebar //
// navbar displayed all times after login
// side bar only for metrics related components

