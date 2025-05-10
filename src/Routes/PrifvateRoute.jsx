import { Navigate } from 'react-router-dom';
import { useAppSelector } from '../hookes/reduxHooks';

const PrivateRoute = ({ children }) => {
    const user = useAppSelector((state) => state.auth.user);
    const token = useAppSelector((state) => state.auth.token);
    return (token && user) ? children : <Navigate to="/Login" />;
};

export default PrivateRoute;
