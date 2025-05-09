import { createBrowserRouter } from 'react-router-dom';
import Main from '../Layout/main';
import Home from '../Component/Home/Home';

const router = createBrowserRouter([
    {
        path: '/',
        element: <Main></Main>,
        children: [
            {
                path: '/',
                element: <Home></Home>
            }
        ]
    }
]);

export default router;
