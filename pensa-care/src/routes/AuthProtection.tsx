import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

export default function withAuthProtection(WrappedComponent: React.ComponentType) {
  return function ProtectedRoute(props: any) {

    const navigate = useNavigate();
    const expiresAt = localStorage.getItem('expires_at');
    const token = localStorage.getItem('access_token');

    const isTokenExpired = () => {
      if (!expiresAt) {
        return true;
      }

      const currentTime = new Date().getTime();
      const expiryTime = new Date(expiresAt).getTime();

      return currentTime > expiryTime;
    };

    const checkInactivity = () => {
      const lastActivity = localStorage.getItem('last_activity_timestamp');
      const currentTime = new Date().getTime();
      const thirtyMinutes = 30 * 60 * 1000; // 30 minutes in milliseconds

      if (lastActivity && currentTime - Number(lastActivity) > thirtyMinutes) {
        localStorage.removeItem('access_token');
        navigate('/login');
      }
    };

    useEffect(() => {
      if (!token || isTokenExpired()) {
        navigate('/login');
      } else {
        localStorage.setItem('last_activity_timestamp', String(new Date().getTime()));
      }

      const intervalId = setInterval(checkInactivity, 60000); // 1 minuto

      return () => {
        clearInterval(intervalId);
      };
    }, [token, expiresAt, navigate]);

    return <WrappedComponent {...props} />;
  };
}