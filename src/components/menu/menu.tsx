import * as React from 'react';
import Link from "next/link";


const Menu = () => {
  // console.log('location', location.pathname);
  const  links = [
    {
      label: 'Новый расчет',
      link: '/'
    }
  ];
  // const filteredLinks = (location.pathname === '/') ? links.filter((item) => item.link !== '/') : [...links];

  return (
    <div className={'menu'}>
      {links.map((item, idx) => {
        return (
          <Link href={item.link} key={idx} className={'menu-link'}>{item.label}</Link>
        );
      })}
    </div>
  );
};

export default Menu;
