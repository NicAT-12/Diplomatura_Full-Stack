import PropTypes from "prop-types";

const TaskItem = ({ task, completeTask, deleteTask }) => {
    return (
        <li
            className="
                flex
                items-center
                justify-between
                bg-gray-50
                border
                border-gray-200
                rounded-xl
                p-4
                mb-3
                shadow-sm
                hover:shadow-md
                transition
            "
        >
            <p
                className={`
                    text-gray-800
                    font-medium
                    ${task.completed ? "line-through text-gray-400" : ""}
                `}
            >
                {task.title}
            </p>

            <div className="flex gap-2">
                <button
                    onClick={() => completeTask(task.id)}
                    disabled={task.completed}
                    className={`
                        px-4
                        py-2
                        rounded-lg
                        text-white
                        transition
                        ${task.completed
                            ? "bg-gray-400 cursor-not-allowed"
                            : "bg-green-600 hover:bg-green-700 cursor-pointer"
                        }
                    `}
                >
                    {task.completed ? "Completada" : "Completar"}
                </button>

                <button
                    onClick={() => deleteTask(task.id)}
                    className="
                        px-4
                        py-2
                        bg-red-600
                        text-white
                        rounded-lg
                        hover:bg-red-700
                        transition
                        cursor-pointer
                    "
                >
                    Eliminar
                </button>
            </div>
        </li>
    )
}

TaskItem.propTypes = {
    task: PropTypes.shape({
        id: PropTypes.number.isRequired,
        title: PropTypes.string.isRequired,
        completed: PropTypes.bool.isRequired
    }).isRequired,
    completeTask: PropTypes.func.isRequired,
    deleteTask: PropTypes.func.isRequired
};

export default TaskItem