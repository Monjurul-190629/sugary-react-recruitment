import { createBrowserRouter } from 'react-router-dom';
import Main from '../Layout/main';
import Home from '../Component/Home/Home';
import Login from '../pages/LoginPage';
import Dashboard from '../pages/Dashboard';

const router = createBrowserRouter([
    {
        path: '/',
        element: <Main></Main>,
        children: [
            {
                path: '/',
                element: <Home></Home>
            },
            {
                path: '/Login',
                element : <Login></Login>
            },
            {
                path: '/dashboard',
                element: <Dashboard></Dashboard>
            }
        ]
    }
]);

export default router;
