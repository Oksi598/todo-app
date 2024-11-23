const initState = {
    tasks: [],
    archivedTasks: [],
    selectedTask: null,
};

const taskReducer = (state = initState, action) => {
    switch (action.type) {
        case "FETCH_TASKS":
            return { ...state, tasks: action.payload };

        case "FETCH_TASK":
            return { ...state, selectedTask: action.payload };

        case "ADD_TASK":
            return { ...state, tasks: [...state.tasks, action.payload] };

        case "UPDATE_TASK":
            return {
                ...state,
                tasks: state.tasks.map((task) =>
                    task.id === action.payload.id ? action.payload : task
                ),
            };

        case "DELETE_TASK":
            return {
                ...state,
                tasks: state.tasks.filter((task) => task.id !== action.payload),
            };

        case "ARCHIVE_TASK":
            return {
                ...state,
                tasks: state.tasks.filter((task) => task.id !== action.payload.id),
                archivedTasks: [...state.archivedTasks, action.payload],
            };

        case "RESTORE_TASK":
            return {
                ...state,
                archivedTasks: state.archivedTasks.filter(
                    (task) => task.id !== action.payload.id
                ),
                tasks: [...state.tasks, action.payload],
            };

        default:
            return state;
    }
};

export default taskReducer;
