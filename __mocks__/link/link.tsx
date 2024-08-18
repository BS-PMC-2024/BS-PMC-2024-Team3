import React from 'react';
import { useRouter } from 'next/router';

const Link = ({ children, href }: { children: React.ReactNode; href: string }) => {
  const router = useRouter();

  const handleClick = (e: React.MouseEvent) => {
    e.preventDefault();
    router.push(href);
  };

  return (
    <a href={href} onClick={handleClick}>
      {children}
    </a>
  );
};

export default Link;