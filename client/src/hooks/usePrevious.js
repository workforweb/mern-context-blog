import { useLocation, useNavigate } from 'react-router-dom';

export default function usePrevious() {
  const navigate = useNavigate();
  const location = useLocation();
  const hasState = location.key !== '/';
  const goBack = () => (hasState ? navigate(-1) : navigate('/'));

  return { goBack, hasState };
}
