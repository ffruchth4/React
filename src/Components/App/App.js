import './App.css';
import { useState } from 'react';

import * as React from 'react';
 import {
  HashRouter,
  Routes,
  Route,
} from "react-router-dom"; 
import {Todo} from '../todo/todo'; 
import {Header} from '../header/header';
import {Chat} from '../Chat/Chat';

export const todoContext = React.createContext();

function App() {
  const [tasks, setTasks] = useState([ ]);
  return (
    <div> 
    <todoContext.Provider value = {{tasks, setTasks}}>
     
  <HashRouter>
  <Header/>
    <Routes>
      
      <Route path="/" element={<Todo />}/> 
      <Route path="/chat" element={<Chat/>}/>
      
        
    </Routes>
  </HashRouter> 
  </todoContext.Provider>

    </div>
    
  );
}


export default App;