import React from 'react'
import ReactDOM from 'react-dom/client'
import { Router as BrowserRouter, RouterProvider, createBrowserRouter } from "react-router-dom"
import MainLayout from './components/mainLayout.jsx'
import Project from './components/project/project.jsx'
import About from './components/about/about.jsx'
import './index.css'
import LoadingScreen from './components/loadingScreen/loadingScreen.jsx'
import Project2 from './components/project2/project2.jsx'
import { Provider } from 'react-redux'
import Store from './redux/store.js'

const router = createBrowserRouter([
  {
    path: "/",
    element: <LoadingScreen />
  },
  {
    path: "/home",
    element: <MainLayout />
  },
  {
    path: "/project",
    element: <Project />
  },
  {
    path:"/about",
    element: <About />
  },
  {
    path:"/project2",
    element: <Project2 />
  }
]);

ReactDOM.createRoot(document.getElementById('root')).render(
  <Provider store={Store}>
    <RouterProvider router={router}/>
  </Provider>
)
