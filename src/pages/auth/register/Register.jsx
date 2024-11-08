import * as React from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import { Link, useNavigate } from 'react-router-dom';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useFormik } from 'formik';
import * as Yup from 'yup';

const Register = () => {

    const validateYupSchema = Yup.object({
        firstName: Yup.string()
            .required("Обов'язкове поле")
            .max(15, "Ім'я повинне містити до 16 символів"),
        lastName: Yup.string()
            .required("Обов'язкове поле")
            .max(15, "Прізвище повинне містити до 16 символів"),
        email: Yup.string()
            .email("Некоректний емайл")
            .required("Обов'язкове поле"),
        password: Yup.string()
            .min(8, "Повинно бути 8 і більше символів")
            .required("Обов'язкове поле")
    });

    const navigate = useNavigate();
    const { isAuth } = useSelector((state) => state.auth || { isAuth: false });

    const formik = useFormik({
        initialValues: {
            firstName: '',
            lastName: '',
            email: '',
            password: ''
        },
        validationSchema: validateYupSchema,
        onSubmit: values => {
            console.log(values);
        }
    });

    useEffect(() => {
        if (isAuth) {
            navigate('/');
        }
    }, [isAuth, navigate]);

    return (
        <Container component="main" maxWidth="xs">
            <Box
                sx={{
                    marginTop: 8,
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    backgroundColor: 'background.paper',
                    padding: 4,
                    borderRadius: 2,
                    boxShadow: 3,
                }}
            >
                <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
                    <LockOutlinedIcon />
                </Avatar>
                <Typography component="h1" variant="h5" sx={{ mb: 2 }}>
                    Sign up
                </Typography>
                <Box component="form" noValidate onSubmit={formik.handleSubmit} sx={{ mt: 3 }}>
                    <TextField
                        fullWidth
                        name="firstName"
                        label="First Name"
                        id="firstName"
                        required
                        autoFocus
                        onChange={formik.handleChange}
                        value={formik.values.firstName}
                        onBlur={formik.handleBlur}
                        sx={{ mb: 2 }}
                        error={formik.touched.firstName && Boolean(formik.errors.firstName)}
                        helperText={formik.touched.firstName && formik.errors.firstName}
                    />
                    <TextField
                        fullWidth
                        name="lastName"
                        label="Last Name"
                        id="lastName"
                        required
                        onChange={formik.handleChange}
                        value={formik.values.lastName}
                        onBlur={formik.handleBlur}
                        sx={{ mb: 2 }}
                        error={formik.touched.lastName && Boolean(formik.errors.lastName)}
                        helperText={formik.touched.lastName && formik.errors.lastName}
                    />
                    <TextField
                        fullWidth
                        name="email"
                        label="Email Address"
                        id="email"
                        required
                        onChange={formik.handleChange}
                        value={formik.values.email}
                        onBlur={formik.handleBlur}
                        sx={{ mb: 2 }}
                        error={formik.touched.email && Boolean(formik.errors.email)}
                        helperText={formik.touched.email && formik.errors.email}
                    />
                    <TextField
                        fullWidth
                        name="password"
                        label="Password"
                        type="password"
                        id="password"
                        required
                        onChange={formik.handleChange}
                        value={formik.values.password}
                        onBlur={formik.handleBlur}
                        sx={{ mb: 2 }}
                        error={formik.touched.password && Boolean(formik.errors.password)}
                        helperText={formik.touched.password && formik.errors.password}
                    />
                    <FormControlLabel
                        control={<Checkbox value="allowExtraEmails" color="primary" />}
                        label="I want to receive inspiration, marketing promotions and updates via email."
                        sx={{ mb: 2 }}
                    />
                    <Button
                        type="submit"
                        fullWidth
                        variant="contained"
                        color="primary"
                        sx={{ mt: 2, mb: 2 }}
                    >
                        Sign Up
                    </Button>
                    <Box sx={{ display: 'flex', justifyContent: 'flex-end' }}>
                        <Link to="/login" style={{ textDecoration: 'none', color: 'primary.main' }}>
                            Already have an account? Sign in
                        </Link>
                    </Box>
                </Box>
            </Box>
        </Container>
    );
}

export default Register;
