import React from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { useCollection } from '../../actions/reducers';


const RequireAuth = ({ children }) => {
    const {user,token,}=useCollection();

    const location = useLocation();
   

    if (!token) {
        return <Navigate to="/sign-in" state={{ from: location }} replace />;
    }
    return children;
};

export default RequireAuth;