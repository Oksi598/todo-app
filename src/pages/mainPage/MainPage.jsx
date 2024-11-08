import React, { useState, useEffect } from "react";
import axios from "axios";
import {
    Container,
    Grid,
    TextField,
    Button,
    FormControl,
    InputLabel,
    Select,
    MenuItem,
    Typography,
    Paper,
    Box,
    Card,
    CardContent,
    CardActions,
    AppBar,
    Toolbar,
    IconButton
} from "@mui/material";
import { FormControlLabel, Checkbox } from "@mui/material";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";  // Assuming you are using react-router-dom for routing
import AccountCircleIcon from '@mui/icons-material/AccountCircle';

const MainPage = () => {
    const { user } = useSelector((state) => state.auth); // Getting user information
    const [tasks, setTasks] = useState([]);
    const [newTask, setNewTask] = useState("");
    const [newDescription, setNewDescription] = useState("");
    const [category, setCategory] = useState("");
    const [priority, setPriority] = useState(0); // 0 - low, 1 - medium, 2 - high
    const [dueDate, setDueDate] = useState("");
    const [statusFilter, setStatusFilter] = useState(""); // For filtering by status
    const [categoryFilter, setCategoryFilter] = useState(""); // For filtering by category

    useEffect(() => {
        if (user && user.token) {
            fetchTasks();
        } else {
            console.error("User is not authorized.");
        }
    }, [user]);

    const fetchTasks = async () => {
        try {
            const token = user?.token || localStorage.getItem("token");
            if (!token) {
                console.error("Token is not available, user is not authenticated");
                return;
            }
            const response = await axios.get("http://localhost:5000/api/tasks", {
                headers: { Authorization: `Bearer ${token}` },
            });
            setTasks(response.data);
        } catch (error) {
            console.error("Error fetching tasks:", error);
        }
    };

    const handleAddTask = async () => {
        if (newTask.trim() === "") return;

        const task = {
            title: newTask,
            description: newDescription,
            category: category,
            priority: priority,
            dueDate: dueDate,
            status: false,
        };

        try {
            const token = user?.token || localStorage.getItem("token");
            if (!token) {
                console.error("Token is not available, user is not authenticated");
                return;
            }

            await axios.post("http://localhost:5000/api/tasks", task, {
                headers: { Authorization: `Bearer ${token}` },
            });
            setNewTask("");
            setNewDescription("");
            setCategory("");
            setPriority(0);
            setDueDate("");
            fetchTasks();
        } catch (error) {
            console.error("Error adding task:", error);
        }
    };

    const handleTaskCompletion = async (taskId, currentStatus) => {
        try {
            const token = user?.token || localStorage.getItem("token");
            if (!token) {
                console.error("Token is not available, user is not authenticated");
                return;
            }

            const updatedTask = {
                status: !currentStatus,
            };

            await axios.put(`http://localhost:5000/api/tasks/${taskId}`, updatedTask, {
                headers: { Authorization: `Bearer ${token}` },
            });
            fetchTasks();
        } catch (error) {
            console.error("Error updating task completion:", error);
        }
    };

    const handleDeleteTask = async (taskId) => {
        try {
            const token = user?.token || localStorage.getItem("token");
            if (!token) {
                console.error("Token is not available, user is not authenticated");
                return;
            }

            await axios.delete(`http://localhost:5000/api/tasks/${taskId}`, {
                headers: { Authorization: `Bearer ${token}` },
            });
            fetchTasks();
        } catch (error) {
            console.error("Error deleting task:", error);
        }
    };

    const filteredTasks = tasks.filter((task) => {
        return (
            (statusFilter === "" || task.status === (statusFilter === "completed")) &&
            (categoryFilter === "" || task.category === categoryFilter)
        );
    });

    return (
        <>
            {/* AppBar for Login/Register buttons */}
            <AppBar position="static">
                <Toolbar sx={{ justifyContent: "flex-end" }}>
                    {!user ? (
                        <>
                            <Button color="inherit" component={Link} to="/login">Login</Button>
                            <Button color="inherit" component={Link} to="/register">Register</Button>
                        </>
                    ) : (
                        <IconButton color="inherit">
                            <AccountCircleIcon />
                        </IconButton>
                    )}
                </Toolbar>
            </AppBar>

            <Container sx={{ pt: 3 }}>
                <Typography variant="h4" gutterBottom align="center">
                    Список справ
                </Typography>

                <Box sx={{ mb: 3 }}>
                    <Grid container spacing={2} justifyContent="center">
                        <Grid item xs={12} md={4}>
                            <TextField
                                fullWidth
                                label="Назва завдання"
                                value={newTask}
                                onChange={(e) => setNewTask(e.target.value)}
                            />
                        </Grid>
                        <Grid item xs={12} md={4}>
                            <TextField
                                fullWidth
                                label="Опис завдання"
                                value={newDescription}
                                onChange={(e) => setNewDescription(e.target.value)}
                            />
                        </Grid>
                        <Grid item xs={12} md={4}>
                            <FormControl fullWidth>
                                <InputLabel>Категорія</InputLabel>
                                <Select value={category} onChange={(e) => setCategory(e.target.value)}>
                                    <MenuItem value="work">Робота</MenuItem>
                                    <MenuItem value="study">Навчання</MenuItem>
                                    <MenuItem value="personal">Особисте</MenuItem>
                                </Select>
                            </FormControl>
                        </Grid>
                        <Grid item xs={12} md={4}>
                            <FormControl fullWidth>
                                <InputLabel>Пріоритет</InputLabel>
                                <Select value={priority} onChange={(e) => setPriority(e.target.value)}>
                                    <MenuItem value={0}>Низький</MenuItem>
                                    <MenuItem value={1}>Середній</MenuItem>
                                    <MenuItem value={2}>Високий</MenuItem>
                                </Select>
                            </FormControl>
                        </Grid>
                        <Grid item xs={12} md={4}>
                            <TextField
                                fullWidth
                                label="Термін виконання"
                                type="datetime-local"
                                value={dueDate}
                                onChange={(e) => setDueDate(e.target.value)}
                                InputLabelProps={{ shrink: true }}
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <Button variant="contained" fullWidth onClick={handleAddTask}>
                                Додати завдання
                            </Button>
                        </Grid>
                    </Grid>
                </Box>

                <Typography variant="h6" gutterBottom>
                    Фільтри
                </Typography>

                <Grid container spacing={2} justifyContent="center">
                    <Grid item xs={12} md={4}>
                        <FormControl fullWidth>
                            <InputLabel>Статус</InputLabel>
                            <Select
                                value={statusFilter}
                                onChange={(e) => setStatusFilter(e.target.value)}
                                label="Статус"
                            >
                                <MenuItem value="">Усі</MenuItem>
                                <MenuItem value="completed">Виконано</MenuItem>
                                <MenuItem value="pending">Невиконано</MenuItem>
                            </Select>
                        </FormControl>
                    </Grid>
                    <Grid item xs={12} md={4}>
                        <FormControl fullWidth>
                            <InputLabel>Категорія</InputLabel>
                            <Select
                                value={categoryFilter}
                                onChange={(e) => setCategoryFilter(e.target.value)}
                                label="Категорія"
                            >
                                <MenuItem value="">Усі</MenuItem>
                                <MenuItem value="work">Робота</MenuItem>
                                <MenuItem value="study">Навчання</MenuItem>
                                <MenuItem value="personal">Особисте</MenuItem>
                            </Select>
                        </FormControl>
                    </Grid>
                </Grid>

                <Grid container spacing={2} sx={{ mt: 3 }} justifyContent="center">
                    {filteredTasks.map((task) => (
                        <Grid item xs={12} md={4} key={task.id}>
                            <Card elevation={3}>
                                <CardContent>
                                    <Typography variant="h6">{task.title}</Typography>
                                    <Typography variant="body2" color="textSecondary">{task.description}</Typography>
                                    <Typography variant="body2">Категорія: {task.category}</Typography>
                                    <Typography variant="body2">Пріоритет: {task.priority === 0 ? "Низький" : task.priority === 1 ? "Середній" : "Високий"}</Typography>
                                    <Typography variant="body2">Термін: {new Date(task.dueDate).toLocaleString()}</Typography>
                                </CardContent>
                                <CardActions>
                                    <FormControlLabel
                                        control={<Checkbox checked={task.status} onChange={() => handleTaskCompletion(task.id, task.status)} />}
                                        label={task.status ? "Виконано" : "Невиконано"}
                                    />
                                    <Button variant="outlined" color="error" onClick={() => handleDeleteTask(task.id)}>
                                        Видалити
                                    </Button>
                                </CardActions>
                            </Card>
                        </Grid>
                    ))}
                </Grid>
            </Container>
        </>
    );
};

export default MainPage;
