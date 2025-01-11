import React from 'react';
import './Wc.css'
import whatsappicon from '../assets/whatsapp_icon.png';

const Wc = () => {
    const phoneNumber = "923030122235";

    return (
        <div className='wc-container'>
            <a
                href={`https://wa.me/${phoneNumber}`}
                target="_blank"
                rel="noopener noreferrer"
            >
                <img className="wc-img" src={whatsappicon} alt="WhatsApp" title='Chat on WhatsApp' />
            </a>
        </div>
    );
}

export default Wc;
