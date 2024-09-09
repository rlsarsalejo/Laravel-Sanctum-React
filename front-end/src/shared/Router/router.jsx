import { createBrowserRouter, Route,Navigate } from "react-router-dom";
import LoginPage from '../Pages/LoginPage.jsx'
import GuestLayouts from "../Components/GuestLayouts.jsx";
import DefaultLayouts from "../Components/DefaultLayouts.jsx"
import Main from "../Pages/Main.jsx";
import RouteProtection from '../Router/RouteGuard.jsx'
const router = createBrowserRouter([

    // Guest Router
        {   
            path: '/',
            element: <GuestLayouts />,
            children:[
             {
                path: 'login',
                element: <LoginPage />
             },
             {
                path: '/',
                element: <Navigate to="/login" replace />
              }
            ]
        },

    // Authenticated Users
    {
        path: '/dashboard',
        element:
        <RouteProtection>
            <DefaultLayouts />
        </RouteProtection>
         ,
        children:[
            {
                path: '',
                element: <Main />
            },
        ]
    },
    // Not Found Route
    {
        path: '*',
        element: <Navigate to="/login" replace />
      }
       
]);
export default router;