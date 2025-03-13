import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import AuthUser from './components/page/authUser/AuthUser.jsx'
import RegUser from './components/page/regUser/RegUser.jsx'

import DataAnalysis from './components/page/dataAnalysisPage/DataAnalysis.jsx'
import AboutProjectPage from './components/page/aboutProjectPage/AboutProjectPage.jsx'
import DocumentationPage from './components/page/documentationPage/DocumentationPage.jsx'
import ProfilePage from './components/page/profilePage/ProfilePage.jsx'
import PublicDataPage from './components/page/publicDataPage/PublicDataPage.jsx'
import PublicDataSearch from './components/page/publicDataSearch/PublicDataSearch.jsx'

import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import App from './App.jsx'
import '@ant-design/v5-patch-for-react-19';

const router = createBrowserRouter([
  {
    path: '/',
    element: <App/>,
    children:[
      {
        path: 'dataanalysis',
        element: <DataAnalysis/>
      },
      {
        path: 'aboutproject',
        element: <AboutProjectPage/>
      },
      {
        path: 'documentation',
        element: <DocumentationPage/>
      },
      {
        path: 'profile',
        element: <ProfilePage/>
      },
      {
        path: 'publicdate',
        element: <PublicDataPage/>
        
      },
      {
        path: 'publicdate/:id',
        element: <PublicDataSearch/>
      }
    ]
  },
  {
    path:'/authuser',
    element: <AuthUser/>
  },
  {
    path:'/reguser',
    element: <RegUser/>
  }
])

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <div>sdafsdf</div>
    {/* <RouterProvider router={router}/> */}
  </StrictMode>,
)
