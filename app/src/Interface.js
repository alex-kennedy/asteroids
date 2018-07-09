import React from 'react';
import Button from '@material-ui/core/Button'
import { MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles';
import { Grid, AppBar, Typography, Switch, Slide, Chip, Input } from '@material-ui/core';
import Paper from '@material-ui/core/Paper';
import Toolbar from '@material-ui/core/Toolbar'
// import MenuIcon from '@material-ui/icons/Menu'

import svgLogo from './logo.svg'

const theme = createMuiTheme({
    palette: {
        primary: {
            light: '#8bf5ff',
            main: '#4fc2f7',
            dark: '#0092c4',
            contrastText: '#000'
        },
        secondary: {
            light: '#ffc4ff',
            main: '#ce93d8',
            dark: '#9c64a6',
            contrastText: '#000'
        }
    }
})

// class Settings extends React.Component {
//     state = {
//         checked: false,
//     }

//     handleChange = () => {
//         this.setState({ checked: !this.state.checked });
//     }

//     render(){
//         const { checked } = this.state;
        
//         return (
//             <span>
//             <Switch checked={checked} onChange={this.handleChange} aria-label="MenuCollapse" />
//             <Slide direction="right" in={checked}>
//             <Grid item xs={12} sm={8}>
//                 <Paper style={{paddingBottom: '20px'}}>
//                     <AppBar position="static" color="primary" style={{marginBottom: '20px'}}>
//                         <Toolbar>
//                             <img src={svgLogo} alt="Site Logo" height="50" style={{paddingRight: '20px'}}/>
//                             <Typography variant="display1" color="inherit">
//                                 Solar System
//                             </Typography>
//                         </Toolbar>
//                     </AppBar>

//                     <Typography align='center' variant='subheading'>
//                         Hi! This project is in progress
//                         <Button align='center' color='action' href='https://github.com/alex-kennedy/solar-system'>
//                             GitHub
//                         </Button>
//                     </Typography>
//                 </Paper>
//             </Grid> 
//             </Slide>
//             </span>
//         );
//     }
// }


class Settings extends React.Component {
    render() {
        return (
            <Paper>
                <Typography variant="headline" component="h2">
                    Settings
                </Typography>
                <Typography variant="subheading">
                    Turn parts of the solar system on or off.
                </Typography>
                <Grid container spacing={12}>
                    <Grid item xs={12}>
                        <Typography variant="body2">
                            The Sun <Switch />
                        </Typography>
                    </Grid>
                    <Grid item xs={12}>
                        <Typography variant="body2">
                            The Planets <Switch />
                        </Typography>
                    </Grid>
                    <Grid item xs={12} sm={6}>
                        <Typography variant="body2">
                            Mercury <Switch />
                        </Typography>
                        <Typography variant="body2">
                            Venus <Switch />
                        </Typography>
                        <Typography variant="body2">
                            Earth <Switch />
                        </Typography>
                        <Typography variant="body2">
                            Mars <Switch />
                        </Typography>
                    </Grid>
                    <Grid item xs={12} sm={6}>
                        <Typography variant="body2">
                            Jupiter <Switch />
                        </Typography>
                        <Typography variant="body2">
                            Saturn <Switch />
                        </Typography>
                        <Typography variant="body2">
                            Uranus <Switch />
                        </Typography>
                        <Typography variant="body2">
                            Neptune <Switch />
                        </Typography>
                    </Grid>
                    <Grid item xs={12}>
                        <Typography variant="body2">
                            Dwarf Planets <Switch />
                        </Typography>
                    </Grid>
                    <Grid item xs={12}>
                        <Typography variant="body2">
                            Ceres <Switch />
                        </Typography>
                        <Typography variant="body2">
                            Pluto <Switch />
                        </Typography>
                        <Typography variant="body2">
                            Haumea <Switch />
                        </Typography>
                        <Typography variant="body2">
                            Makemake <Switch />
                        </Typography>
                        <Typography variant="body2">
                            Eros <Switch />
                        </Typography>
                    </Grid>
                    <Grid item xs={12}>
                        <Typography variant="body2">
                            Asteroids
                        </Typography>
                        <Paper>
                            <Input
                                fullWidth
                                placeholder="Search for asteroids"
                            />
                        </Paper>
                    </Grid>
                    <Grid item xs={12}>
                        <Typography variant="caption" align="center">
                            Alex Kennedy  •  <a href="https://github.com/alex-kennedy/solar-system">View on GitHub</a>
                        </Typography>
                    </Grid>
                </Grid>
            </Paper>
        );
    }
}





function Interface() {
    return (
        <MuiThemeProvider theme={theme}>
            {/* <Button variant="fab" color="primary" aria-label="settings">
                <MenuIcon />
            </Button> */}
            <Settings />
        </MuiThemeProvider>
    );
}

export default Interface;