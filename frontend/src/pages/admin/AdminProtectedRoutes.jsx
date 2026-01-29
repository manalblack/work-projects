import { Navigate, Outlet } from 'react-router-dom';
import { useAuth } from '../admin/hooks/userAuth'
import toast from 'react-hot-toast';




export default function AdminProtectedRoute() {

    const { user, loading, isAdmin } = useAuth();

    if (loading) return <div className="flex h-screen items-center justify-center">Loading...</div>;

    if (!user || !isAdmin) {
      toast.error('You ar not Authorized to visit this page');
    return <Navigate to="/admin-login" replace />;
  }

  return <Outlet />;

}


