import { createBrowserRouter } from 'react-router-dom';
import Main from '../Layout/Main';
import Login from '../pages/LoginPage';
import Dashboard from '../pages/Dashboard';
import PrivateRoute from './PrifvateRoute';

const router = createBrowserRouter([
    {
        path: '/',
        element: <Main></Main>,
        children: [
            {
                path: '/',
                element : <Login></Login>
            },
            {
                path: '/dashboard',
                element: <PrivateRoute><Dashboard></Dashboard></PrivateRoute>
            }
        ]
    }
]);

export default router;
