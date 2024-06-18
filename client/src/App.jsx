import './App.css'
import 'swiper/css'
import Homepage from './components/Homepage';
import SearchResults from './components/SearchResults';
import AnimeDetails from './components/AnimeDetails'
import { useNavigate, Link, BrowserRouter, Routes, Route } from "react-router-dom";
import 'react-multi-carousel/lib/styles.css';
import { useState } from 'react';
import Register from './components/Register';
import Login from './components/Login';
import AnimeLists from './components/AnimeLists';
import AnimeListsContents from './components/AnimeListContents';


function App() {
  const [searchResults, setSearchResults] = useState([])
  const [user, setUser] = useState()
  const [id, setId] = useState()
  return (
    <BrowserRouter>
      <div>
        <Routes>
          <Route path={'/'} element={<Homepage 
                                        searchResults={searchResults} 
                                        setSearchResults={setSearchResults}
                                        id={id}
                                        setId={setId}
                                        user={user} 
                                        setUser={setUser}/>}/>
          <Route path={'/search'} element={<SearchResults 
                                              searchResults={searchResults} 
                                              setSearchResults={setSearchResults}
                                              id={id}
                                              setId={setId}
                                              user={user} 
                                              setUser={setUser}/>}/>
          <Route path={'/anime/:id'} element={<AnimeDetails 
                                            searchResults={searchResults} 
                                            setSearchResults={setSearchResults}
                                            id={id}
                                            setId={setId} 
                                            user={user} 
                                            setUser={setUser}/>}/>
          <Route path={'/animelists'} element={<AnimeLists 
                                            searchResults={searchResults} 
                                            setSearchResults={setSearchResults}
                                            id={id}
                                            setId={setId} 
                                            user={user} 
                                            setUser={setUser}/>}/>
          <Route path={'/animelists/:list_id'} element={<AnimeListsContents 
                                            searchResults={searchResults} 
                                            setSearchResults={setSearchResults}
                                            id={id}
                                            setId={setId} 
                                            user={user} 
                                            setUser={setUser}/>}/>                                  
          <Route path={'/register'} element={<Register />}/>
          <Route path={'/login'} element={<Login />}/>                                     
        </Routes>
      </div>
    </BrowserRouter>
  )
}

export default App
