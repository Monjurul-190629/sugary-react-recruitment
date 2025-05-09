import { Navigate } from 'react-router-dom';
import { useAppSelector } from '../hookes/reduxHooks';

const PrivateRoute = ({ children }) => {
    const token = useAppSelector((state) => state.auth.token);
    return token ? children : <Navigate to="/" />;
};

export default PrivateRoute;
