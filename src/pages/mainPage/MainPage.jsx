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
    IconButton,
    FormControlLabel,
    Checkbox,
} from "@mui/material";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";

const MainPage = () => {
    const { user } = useSelector((state) => state.auth);
    const [tasks, setTasks] = useState([]);
    const [newTask, setNewTask] = useState("");
    const [newDescription, setNewDescription] = useState("");
    const [category, setCategory] = useState("");
    const [priority, setPriority] = useState(0);
    const [dueDate, setDueDate] = useState("");
    const [statusFilter, setStatusFilter] = useState("");
    const [categoryFilter, setCategoryFilter] = useState("");
    const [showArchived, setShowArchived] = useState(false);
    

    useEffect(() => {
        if (user && user.token) {
            fetchTasks();
        } else {
            console.error("User is not authorized.");
        }
    }, [user, showArchived, statusFilter, categoryFilter]);

    const fetchTasks = async () => {
        try {
            const token = user?.token || localStorage.getItem("token");
            if (!token) return;
      
            const params = {
                status: statusFilter === "completed" ? true : statusFilter === "pending" ? false : undefined,
                category: categoryFilter || undefined,
            };
      
            const url = showArchived
                ? "https://localhost:5000/api/tasks/archived"
                : "https://localhost:5000/api/tasks";
      
            const response = await axios.get(url, {
                headers: { Authorization: `Bearer ${token}` },
                params,
            });
      
            console.log(response.data);
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
            category,
            priority,
            dueDate,
            status: false,
        };

        try {
            const token = user?.token || localStorage.getItem("token");
            await axios.post("https://localhost:5000/api/tasks", task, {
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
            await axios.put(
                `https://localhost:5000/api/tasks/${taskId}`,
                { status: !currentStatus },
                { headers: { Authorization: `Bearer ${token}` } }
            );
            fetchTasks();
        } catch (error) {
            console.error("Error updating task completion:", error);
        }
    };

    const handleDeleteTask = async (taskId) => {
        try {
            const token = user?.token || localStorage.getItem("token");
            await axios.delete(`https://localhost:5000/api/tasks/${taskId}`, {
                headers: { Authorization: `Bearer ${token}` },
            });
            fetchTasks();
        } catch (error) {
            console.error("Error deleting task:", error);
        }
    };

    const handleArchiveTask = async (taskId) => {
        try {
            const token = user?.token || localStorage.getItem("token");
            await axios.post(`https://localhost:5000/api/tasks/${taskId}/archive`, {}, {
                headers: { Authorization: `Bearer ${token}` },
            });
            fetchTasks();
        } catch (error) {
            console.error("Error archiving task:", error);
        }
    };

    const toggleArchivedView = () => {
        setShowArchived(!showArchived);
    };
    const filteredTasks = tasks.filter((task) => {
        return (
            (statusFilter === "" || task.status === (statusFilter === "completed")) &&
            (categoryFilter === "" || task.category === categoryFilter)
        );
    });


    return (
        <>
    <AppBar position="static">
        <Toolbar sx={{ justifyContent: "space-between" }}>
            <Typography variant="h6">ToDo App</Typography>
            <div>
                <Button color="inherit" component={Link} to="/login">
                    Вхід
                </Button>
                <Button color="inherit" component={Link} to="/register">
                    Реєстрація
                </Button>
            </div>
        </Toolbar>
    </AppBar>

    <Container sx={{ pt: 4 }}>
        <Typography variant="h4" gutterBottom align="center">
            Список справ
        </Typography>

        {/* Форма додавання завдання */}
        <Box sx={{ mb: 4 }}>
            <Grid container spacing={2}>
                <Grid item xs={12} md={6}>
                    <TextField
                        fullWidth
                        label="Назва завдання"
                        value={newTask}
                        onChange={(e) => setNewTask(e.target.value)}
                    />
                </Grid>
                <Grid item xs={12} md={6}>
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
                    <Button variant="contained" fullWidth onClick={handleAddTask}>
                        Додати завдання
                    </Button>
                </Grid>
            </Grid>
        </Box>

        {/* Фільтри завдань */}
        <Box sx={{ mb: 4 }}>
            <Grid container spacing={2} justifyContent="center">
                <Grid item xs={12} md={5}>
                    <FormControl fullWidth>
                        <InputLabel>Фільтр за статусом</InputLabel>
                        <Select value={statusFilter} onChange={(e) => setStatusFilter(e.target.value)}>
                            <MenuItem value="">Усі</MenuItem>
                            <MenuItem value="completed">Виконано</MenuItem>
                            <MenuItem value="pending">Невиконано</MenuItem>
                        </Select>
                    </FormControl>
                </Grid>
                <Grid item xs={12} md={5}>
                    <FormControl fullWidth>
                        <InputLabel>Фільтр за категорією</InputLabel>
                        <Select value={categoryFilter} onChange={(e) => setCategoryFilter(e.target.value)}>
                            <MenuItem value="">Усі</MenuItem>
                            <MenuItem value="work">Робота</MenuItem>
                            <MenuItem value="study">Навчання</MenuItem>
                            <MenuItem value="personal">Особисте</MenuItem>
                        </Select>
                    </FormControl>
                </Grid>
                <Grid item xs={12} md={2}>
                    <Button variant="outlined" fullWidth onClick={toggleArchivedView}>
                        {showArchived ? "Активні завдання" : "Архівовані завдання"}
                    </Button>
                </Grid>
            </Grid>
        </Box>

        <Grid container spacing={3} justifyContent="center">
        {filteredTasks.length > 0 ? (
            filteredTasks.map((task) => (
                <Grid item xs={12} md={6} lg={4} key={task.id}>
                    <Card elevation={4}>
                        <CardContent>
                            <Typography variant="h6">{task.title}</Typography>
                            <Typography variant="body2" color="textSecondary">
                                {task.description}
                            </Typography>
                            <Typography variant="body2">
                                Категорія: <strong>{task.category}</strong>
                            </Typography>
                            <Typography variant="body2">
                                Пріоритет:{" "}
                                <strong>
                                    {task.priority === 0
                                        ? "Низький"
                                        : task.priority === 1
                                        ? "Середній"
                                        : "Високий"}
                                </strong>
                            </Typography>
                            <Typography variant="body2">
                                Термін: {new Date(task.dueDate).toLocaleDateString()}
                            </Typography>
                        </CardContent>
                        <CardActions sx={{ justifyContent: "space-between" }}>
                            <FormControlLabel
                                control={
                                    <Checkbox
                                        checked={task.status}
                                        onChange={() => handleTaskCompletion(task.id, task.status)}
                                    />
                                }
                                label={task.status ? "Виконано" : "Невиконано"}
                            />
                            <Button
                                variant="outlined"
                                color="error"
                                onClick={() => handleDeleteTask(task.id)}
                            >
                                Видалити
                            </Button>
                            <Button
                                variant="outlined"
                                onClick={() => handleArchiveTask(task.id)}
                            >
                                Архівувати
                            </Button>
                        </CardActions>
                    </Card>
                </Grid>
            ))
        ) : (
            <Typography variant="body1" color="textSecondary" align="center" sx={{ mt: 4 }}>
                Завдань не знайдено
            </Typography>
        )}
    </Grid>

    </Container>
</>

    );
};

export default MainPage;
