import React from 'react';
import usePrevious from '../hooks/usePrevious';
import { useLocation } from 'react-router-dom';

export default function BackBtn() {
  const { goBack, hasState } = usePrevious();
  const location = useLocation();

  const hideFromHomepage = location.pathname !== '/';
  return (
    hideFromHomepage && (
      <button onClick={goBack} className="back-btn">
        {hasState ? 'Go to last page' : 'Go to home page'}
      </button>
    )
  );
}
