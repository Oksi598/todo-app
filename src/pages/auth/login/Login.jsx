import * as React from "react";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import { FormLabel } from "@mui/material";
import TextField from "@mui/material/TextField";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import { Link, useNavigate } from "react-router-dom";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { useSelector } from "react-redux";
import { useState } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import { useAction } from "../../../hooks/useAction";
import { toast } from "react-toastify";

const Login = () => {
    const [token, setToken] = useState(null);
    const navigate = useNavigate();
    const { isAuth } = useSelector((state) => state.auth);
    const { signIn } = useAction();


    const handleSubmit = async (values) => {
        const response = await signIn(values);
        if (!response.success) {
            toast.error(response.message);
        } else {
            toast.success(response.message);
            navigate("/");
        }
    };

    const validateYupSchema = Yup.object({
        email: Yup.string()
            .email("Некоректна пошта")
            .required("Обов'язкове поле"),
        password: Yup.string()
            .min(6, "Повинно бути 8 і більше символів")
            .required("Обов'язкове поле"),
    });

    const formik = useFormik({
        initialValues: {
            email: "",
            password: "",
            rememberMe: false,
        },
        validationSchema: validateYupSchema,
        onSubmit: handleSubmit,
    });

    return (
        <Container component="main" maxWidth="xs">
            <Box
                sx={{
                    marginTop: 8,
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                }}
            >
                <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}>
                    <LockOutlinedIcon />
                </Avatar>
                <Typography component="h1" variant="h5">
                    Sign in
                </Typography>
                <Box
                    component="form"
                    onSubmit={formik.handleSubmit}
                    noValidate
                    sx={{ mt: 1 }}
                >
                    <TextField
                        margin="normal"
                        fullWidth
                        id="email"
                        label="Email Address"
                        name="email"
                        autoComplete="email"
                        autoFocus
                        onChange={formik.handleChange}
                        value={formik.values.email}
                        onBlur={formik.handleBlur}
                    />
                    {formik.touched.email && formik.errors.email && (
                        <Box sx={{ px: 1 }}>
                            <FormLabel sx={{ fontSize: "12px", color: "red" }}>
                                {formik.errors.email}
                            </FormLabel>
                        </Box>
                    )}
                    <TextField
                        margin="normal"
                        required
                        fullWidth
                        name="password"
                        label="Password"
                        type="password"
                        id="password"
                        autoComplete="current-password"
                        onChange={formik.handleChange}
                        value={formik.values.password}
                        onBlur={formik.handleBlur}
                    />
                    {formik.touched.password && formik.errors.password && (
                        <Box sx={{ px: 1 }}>
                            <FormLabel sx={{ fontSize: "12px", color: "red" }}>
                                {formik.errors.password}
                            </FormLabel>
                        </Box>
                    )}
                    <FormControlLabel
                        control={
                            <Checkbox
                                name="rememberMe"
                                color="primary"
                                value={formik.values.rememberMe}
                                onChange={formik.handleChange}
                            />
                        }
                        label="Remember me"
                    />
                    <Button
                        type="submit"
                        fullWidth
                        variant="contained"
                        sx={{ mt: 3, mb: 2 }}
                    >
                        Sign In
                    </Button>
                    <Grid container>
                        <Grid item>
                            <Link to="/register">
                                {"Don't have an account? Sign Up"}
                            </Link>
                        </Grid>
                    </Grid>
                </Box>
            </Box>
            
        </Container>
    );
};

export default Login;
