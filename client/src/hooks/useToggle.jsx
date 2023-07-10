import { useState } from 'react';

export default function useToggle() {
  const [toggle, setToggle] = useState();

  const toggler = () => {
    setToggle(!toggle);
  };
  return [toggle, toggler];
}
