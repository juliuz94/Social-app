import React, { Component } from 'react'
import { withStyles } from '@material-ui/core/styles';
import PropTypes from 'prop-types';
import appIcon from '../images/icon.png';
import axios from 'axios';
import { Link } from 'react-router-dom';

//MUI Stuff
import Container from '@material-ui/core/Container';
import TextField from '@material-ui/core/TextField';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import Alert from '@material-ui/lab/Alert';
import CircularProgress from '@material-ui/core/CircularProgress';

const styles = {
        Centered: {
            textAlign: 'center'
        },
        pageTitle: {
            fontSize: '40px',
            marginBottom: '25px'
        },
        appIcon: {
            margin: '50px 0'
        },
        form: {
            margin: '30px 0'
        },
        TextField: {
            marginBottom: '20px'
        },
        submitButton: {
            background: 'linear-gradient(45deg, #2196F3 30%, #21CBF3 90%)',
            boxShadow: '0 3px 5px 2px rgba(33, 203, 243, .3)',
            margin: '20px 0'
        },
        submitButtonLoading: {
            disabled: 'true',
            margin: '20px 0'
        },
        customError: {
            color: 'red'
        }
}

export class signup extends Component {

    constructor(props) {
        super(props);
        this.state = {
            email: '',
            password: '',
            confirmPassword: '',
            handle: '',
            loading: false,
            errors: {}
        }
    }

    handleSubmit = (event) => {
        event.preventDefault();
        this.setState({
            loading: true
        });
        const userData = {
            email: this.state.email,
            password: this.state.password,
            confirmPassword: this.state.confirmPassword,
            handle: this.state.handle
        }
        axios.post('/sign-up', userData)
        .then(res => {console.log(res.data)
            localStorage.setItem('FBIdToken', `Bearer ${res.data.token}`);
            this.setState({ loading: false });
            this.props.history.push('/');
        })
        .catch(err => {
            this.setState({
                errors: err.response.data,
            })
            this.setState({ loading: false });
        });
    }

    handleChange = (event) => {
        this.setState({
            [event.target.name]: event.target.value
        })
    }

    render() {
        const { classes } = this.props;
        const { errors, loading } = this.state;
        return (
            <div>
             <Container maxWidth="sm" className={classes.Centered}>
                <img src={appIcon} className={classes.appIcon} alt="App" />
                <Typography variant="h1" className={classes.pageTitle}>Create an account</Typography>
                {errors.general && (<Alert variant="outlined" severity="error">
                         {errors.general}
                </Alert>)}
                <form className={classes.form} noValidate onSubmit={this.handleSubmit}>
                    <TextField 
                    className={classes.TextField} 
                    required 
                    id="userHandle" 
                    name="handle"
                    value={this.state.handle} 
                    label="User Name" 
                    variant="outlined" 
                    onChange={this.handleChange} 
                    helperText={errors.handle}
                    error={errors.handle ? true : false}
                    size='small'
                    fullWidth
                    />
                    <TextField 
                    className={classes.TextField} 
                    required 
                    id="email" 
                    name="email"
                    value={this.state.email} 
                    label="Email" 
                    variant="outlined" 
                    onChange={this.handleChange} 
                    helperText={errors.email}
                    error={errors.email ? true : false}
                    size='small'
                    fullWidth
                    />
                    <TextField 
                    className={classes.TextField} 
                    required 
                    id="password" 
                    name="password" 
                    value={this.state.password} 
                    label="Password" 
                    variant="outlined" 
                    onChange={this.handleChange} 
                    helperText={errors.password}
                    error={errors.password ? true : false}
                    size='small'
                    type="password" 
                    fullWidth
                    />
                    <TextField 
                    className={classes.TextField} 
                    required 
                    id="confirmPassword" 
                    name="confirmPassword" 
                    value={this.state.confirmPassword} 
                    label="Confirm password" 
                    variant="outlined" 
                    onChange={this.handleChange} 
                    helperText={errors.confirmPassword}
                    error={errors.confirmPassword ? true : false}
                    size='small'
                    type="password" 
                    fullWidth
                    />
                    <Button className={!loading ? classes.submitButton : classes.submitButtonLoading} disabled={loading} variant="contained" type="submit" fullWidth>
                        {loading ? <CircularProgress size={20} /> : "Create account"}
                    </Button>
                    <small>Already have an account? Log in <Link to="/login">here</Link></small>
                </form>     
            </Container>
            </div>
        )
    }
}

signup.propTypes = {
    classes: PropTypes.object.isRequired
}

export default withStyles(styles)(signup)
