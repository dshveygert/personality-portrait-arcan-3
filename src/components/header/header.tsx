import React, { FC } from 'react';

type Props = {
  title?: string;
  metaDescription?: string;
};

const Header: FC<Props> = (props) => {
  const {
    title = 'Расчет психологического портрета личности по дате рождения',
    metaDescription = 'Расчет психологического портрета личности на основе арканов по дате рождения'
  } = props;
  return (
      <></>
    // <Helmet>
    //   <title>{title}</title>
    //   <meta name='description' content={metaDescription} />
    //   <meta name='theme-color' content='#00796B' />
    // </Helmet>
  );
};

export default Header;
