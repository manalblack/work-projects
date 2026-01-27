import { Navigate, Outlet } from 'react-router-dom';
import { useAuth } from '../admin/hooks/userAuth'




export default function AdminProtectedRoute() {

    const { user, loading } = useAuth();

    if (loading) return <div className="flex h-screen items-center justify-center">Loading...</div>;

    if (!user) {
    return <Navigate to="/admin-login" replace />;
  }

  return <Outlet />;

}


