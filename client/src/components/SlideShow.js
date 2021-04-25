import React from 'react';
import Carousel from 'react-material-ui-carousel';
import Link from 'react-router-dom/Link';
// code from https://www.npmjs.com/package/react-material-ui-carousel
const SlideShow = () => {
    return(
        <Carousel 
        fullHeightHover={false}     // We want the nav buttons wrapper to only be as big as the button element is
        navButtonsProps={{          // Change the colors and radius of the actual buttons. THIS STYLES BOTH BUTTONS
            
        }} 
        navButtonsWrapperProps={{   // Move the buttons to the bottom. Unsetting top here to override default style.
            style: {
                
                marginLeft: '150px',
                marginRight: '150px',
                marginTop: "75px"
            }
        }} >
            <div style={{
                textAlign: "center",
                // marginTop: "150px",
                height: "500px"
                }}>
                <Link to={'/products'}>
                    <img className="center" src="/images/air-max-1.jpg" alt="airmax"/>
                </Link>
            </div>
            <div style={{
                textAlign: "center",
                // marginTop: "150px",
                height: "500px"
                }}>
                <Link to={'/products'}>
                    <img src="/images/airforce-2.jpeg" alt="airmax2" />
                </Link>
            </div>
            <div style={{
                textAlign: "center",
                // marginTop: "150px",
                height: "500px"
                }}>
                <Link to={'/products'}>
                    <img src="/images/airforce-1.jpeg" alt="airforce" />
                </Link>
            </div>
        </Carousel>
    );
}

export default SlideShow;