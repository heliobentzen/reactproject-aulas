import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

export default function withAuthProtection(WrappedComponent: React.ComponentType) {
  return function ProtectedRoute(props: any) {

    const navigate = useNavigate();
    const token = localStorage.getItem('access_token');
    const expiresAt = localStorage.getItem('expires_at');

    const isTokenExpired = () => {
      if (!expiresAt) {
        return true;
      }

      const currentTime = new Date().getTime();
      const expiryTime = new Date(expiresAt).getTime();

      return currentTime > expiryTime;
    };

    useEffect(() => {
      if (!token || isTokenExpired()) {
        navigate('/login');
      }
    }, [token, expiresAt, navigate]);

    return <WrappedComponent {...props} />;
  };
}