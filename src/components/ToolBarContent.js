import React, { useState } from 'react';
import { Button, Divider, Grid } from '@material-ui/core';
import twitter from '../images/twitter-icon.png';
import reddit from '../images/reddit-icon.png';
import instagram from '../images/instagram-icon.png';
import facebook from '../images/facebook-icon.png';
import info from '../images/info-icon.png';
import Day from '../images/sun-icon.png';
import Night from '../images/moon-icon.png';


const Content = (props) => {

    const social = [{ name: "Twitter", link: "https://twitter.com/?lang=en", image: twitter },
    { name: "Reddit", link: "https://www.reddit.com/", image: reddit },
    { name: "Instagram", link: "https://www.instagram.com/", image: instagram },
    { name: "Facebook", link: "https://www.facebook.com/", image: facebook }];

    return (
        <div className="Content">
            <div className="Mode">
                <h2>Day/Night Mode</h2>
                <Grid container justify="center">
                    <Grid item size="large">
                        <Button variant="outlined"><img src={Day} className="sun" alt="sun" /></Button>
                    </Grid>
                    <Grid item size="large">
                        <Button variant="outlined"><img src={Night} className="moon" alt="night" /></Button>
                    </Grid>
                </Grid>
            </div>
            <div className="About">
                <h2>Contact</h2>
                <Grid container spacing={4} direction="column">
                    {social.map((media) => (<Grid item xs>
                        <Button className="button" variant="outlined" onClick={() => window.open(media.link)} >
                            <img src={media.image} className="brand" alt={media.name} />
                        </Button>
                    </Grid>))
                    }
                    <Grid item xs>
                        <Button className="button" variant="outlined" onClick={props.popup} >
                            <img src={info} className="brand" alt="information" />
                        </Button>
                    </Grid>
                </Grid>
            </div>
        </div>
    );
}

export default Content;