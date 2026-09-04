import { useEffect, useState, useRef } from "react";

import PropTypes from "prop-types";

const TaskForm = ({ addTask }) => {
    const [newTask, setNewTask] = useState("");
    const inputRef = useRef(null);

    useEffect(() => {
        inputRef.current?.focus();
    }, []);

    const handleAddTask = () => {
        if (!newTask.trim()) return;

        addTask(newTask);
        setNewTask("");
    };
    return (
        <div className="flex gap-3 mb-6">
            <input
                onChange={(e) => setNewTask(e.target.value)}
                onKeyDown={(e) => {
                    if (e.key === "Enter") {
                        handleAddTask();
                    }
                }}
                type="text"
                placeholder="Nueva tarea..."
                value={newTask}
                ref={inputRef}
                className="
            flex-1
            px-4
            py-3
            border
            border-gray-300
            rounded-xl
            outline-none
            focus:ring-2
            focus:ring-blue-500
            focus:border-blue-500
            transition
        "
            />

            <button
                onClick={handleAddTask}
                className="
            px-6
            py-3
            bg-blue-600
            text-white
            font-semibold
            rounded-xl
            hover:bg-blue-700
            active:scale-95
            transition
            cursor-pointer
        "
            >
                Agregar
            </button>
        </div>
    )
}

TaskForm.propTypes = {
    addTask: PropTypes.func.isRequired,
};

export default TaskForm;