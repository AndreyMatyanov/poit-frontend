import React from 'react';
import s from './App.module.sass'
import {BrowserRouter, Route, Routes} from "react-router-dom";
import Main from "./components/pages/Main/Main";
import Navbar from "./components/app/Navbar/Navbar";
import Footer from "./components/app/Footer/Footer";
import AdminPage from "./components/pages/Admin/Admin";
import Profile from "./components/pages/Profile/Profile";
import UserList from "./components/pages/UserList/UserList";
import ProjectList from "./components/pages/ProjectsList/ProjectList";
import 'bootstrap/dist/css/bootstrap.min.css';

function App() {
  return (
      <BrowserRouter>
          <Navbar />
          <div className={s.main__wrapper}>
              <Routes>
                  <Route path={'/'} element={<Main/>}/>
                  <Route path={'/users'} element={<UserList />}/>
                  <Route path={'/users/:id'} element={<Profile/>}/>
                  <Route path={'/admin/*'} element={<AdminPage/>}/>
                  <Route path="*" element={<h2>Ресурс не найден</h2>} />
                  <Route path={'/projects/:id'} element={<ProjectList/>} />
              </Routes>
          </div>
          <Footer/>
      </BrowserRouter>
  );
}

export default App;
