import http from "../../../http_common";

// Action types
export const ADD_TASK = "ADD_TASK";
export const DELETE_TASK = "DELETE_TASK";
export const TOGGLE_TASK = "TOGGLE_TASK";
export const FETCH_TASKS = "FETCH_TASKS";
export const FETCH_TASK = "FETCH_TASK";
export const UPDATE_TASK = "UPDATE_TASK";
export const ARCHIVE_TASK = "ARCHIVE_TASK";

// Fetch all tasks
export const fetchTasks = () => async (dispatch) => {
    try {
        const response = await http.get("tasks");
        const { data } = response;
        dispatch({ type: FETCH_TASKS, payload: data });
    } catch (error) {
        console.error("Error fetching tasks:", error.response?.data?.message || error.message);
    }
};

// Fetch a single task by taskId
export const fetchTask = (taskId) => async (dispatch) => {
    try {
        const response = await http.get(`tasks/${taskId}`);
        const { data } = response;
        dispatch({ type: FETCH_TASK, payload: data });
        return data;
    } catch (error) {
        console.error("Error fetching task:", error.response?.data?.message || error.message);
    }
};

// Add a new task
export const addTask = (task) => async (dispatch) => {
    try {
        const response = await http.post("tasks", task);
        const { data } = response;
        dispatch({ type: ADD_TASK, payload: data });
        return { success: true, message: "Task added successfully" };
    } catch (error) {
        return { success: false, message: error.response?.data?.message || "Error adding task" };
    }
};

// Update a task by taskId
export const updateTask = (taskId, task) => async (dispatch) => {
    try {
        const response = await http.put(`tasks/${taskId}`, task);
        const { data } = response;
        dispatch({ type: UPDATE_TASK, payload: data });
        return { success: true, message: "Task updated successfully" };
    } catch (error) {
        return { success: false, message: error.response?.data?.message || "Error updating task" };
    }
};

// Delete a task by taskId
export const deleteTask = (taskId) => async (dispatch) => {
    try {
        await http.delete(`tasks/${taskId}`);
        dispatch({ type: DELETE_TASK, payload: taskId });
        return { success: true, message: "Task deleted successfully" };
    } catch (error) {
        return { success: false, message: error.response?.data?.message || "Error deleting task" };
    }
};

// Archive a task by taskId
export const archiveTask = (taskId) => async (dispatch) => {
    try {
        const response = await http.post(`tasks/${taskId}/archive`);
        const { data } = response;
        dispatch({ type: ARCHIVE_TASK, payload: data });
        return { success: true, message: "Task archived successfully" };
    } catch (error) {
        return { success: false, message: error.response?.data?.message || "Error archiving task" };
    }
};
