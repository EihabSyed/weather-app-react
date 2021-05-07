import React from 'react';
import { Button, Grid } from '@material-ui/core';
import twitter from '../images/twitter-icon.png';
import reddit from '../images/reddit-icon.png';
import instagram from '../images/instagram-icon.png';
import facebook from '../images/facebook-icon.png';
import info from '../images/info-icon.png';
import Day from '../images/sun-icon.png';
import Night from '../images/moon-icon.png';


const Content = (props) => {

    const social = [{ name: "Twitter", link: "https://twitter.com/?lang=en", image: twitter, id: 1},
    { name: "Reddit", link: "https://www.reddit.com/", image: reddit, id: 2},
    { name: "Instagram", link: "https://www.instagram.com/", image: instagram, id: 3},
    { name: "Facebook", link: "https://www.facebook.com/", image: facebook, id: 4}];

    return (
        <div className="Content">
            <div className="Mode">
                <h2>Day/Night Mode</h2>
                <Grid container justify="center">
                    <Grid item size="large" className={!props.modeType ? "light" : "darkTheme" }>
                        <Button variant="outlined" className="sun-button" onClick={!props.modeType ? null : props.handleMode}><img src={Day} className="sun" alt="sun" /></Button>
                    </Grid>
                    <Grid item size="large" className={props.modeType ? "dark" : null }>
                        <Button variant="outlined" className="moon-button" onClick={props.modeType ? null : props.handleMode}><img src={Night} className="moon" alt="night" /></Button>
                    </Grid>
                </Grid>
            </div>
            <div className="About">
                <h2>Contact</h2>
                <Grid container spacing={4} direction="column">
                    {social.map((media) => (<Grid item xs key={media.id.toString()}>
                        <Button className="button" variant="contained" onClick={() => window.open(media.link)} color="primary">
                            <img src={media.image} className="brand" alt={media.name} />
                        </Button>
                    </Grid>))
                    }
                    <Grid item xs>
                        <Button className="button" variant="contained" onClick={props.handleClose} color="primary">
                            <img src={info} className="brand" alt="information" />
                        </Button>
                    </Grid>
                </Grid>
            </div>
        </div>
    );
}

export default Content;