import React from 'react';

import './styles.css';

const Footer = ({ title }) => (
    <footer>
        <h6 className="font-weight-bold"> {title?title:'Copywrite'} </h6>
    </footer>
);

export default Footer;