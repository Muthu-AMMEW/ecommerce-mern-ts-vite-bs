import { useSelector } from 'react-redux';
import { Navigate, useLocation } from 'react-router-dom';
import Loader from '../layouts/Loader';

export default function ProtectedRoute({ children, isAdmin }) {
    const { isAuthenticated, loading, authUser } = useSelector(state => state.authState);
    const location = useLocation();

    if (loading) {
        return <Loader />;
    }

    if (!isAuthenticated) {
        return <Navigate to="/login" replace />;
    }

    if (isAuthenticated) {
        if (authUser.role === 'unverified') {
            // Only allow access to /myprofile/update or /verify/email
            if (
                location.pathname !== '/myprofile/update' &&
                location.pathname !== '/verify/email'
            ) {
                return <Navigate to="/myprofile/update" replace />;
            }
            return children;
        }

        if (isAdmin === true && authUser.role !== 'admin') {
            return <Navigate to="/" replace />;
        }

        return children;
    }

    return null; // Fallback if nothing matches
}
