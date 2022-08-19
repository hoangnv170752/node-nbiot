import React from 'react';
import './footer.css';
 

const Footer = () => {
    return (
        <div className="main-footer">
            <div className='container'>
                <div className='row'>
                    {/* Column 1 */}
                    <div className='col'>
                        <h4>NB - IOT Light Config</h4>
                    </div>
                    {/* Column 2 */}
                    <div className='col'>
                        <h4>How to use the web app</h4>
                        <ul className='list-unstyled'>
                            <li>Add light to database (fill out the form)</li>
                            <li>Add multi lights by converting CSV file to JSON</li>
                            <li>Send light json data through MQTT</li>
                            <li>Delete light info if it was changed</li>
                        </ul>
                    </div>
                </div>
                <hr />
                <div className='row'>
                    <p className='col-sm'>
                        &copy;{new Date().getFullYear()} Hoàng Nguyễn - Digital R&D 
                    </p>
                </div>
            </div>
        </div>
    );
}

export default Footer;