import TaskItem from "./TaskItem"
import PropTypes from "prop-types";


const TaskList = ({ tasks, completeTask, deleteTask }) => {
    return (
        <ul className="space-y-3">

            {tasks.length === 0 ? (
                <p className="text-center text-gray-400">
                    No hay tareas
                </p>
            ) : (
                tasks.map((task) => (
                    <TaskItem
                        key={task.id}
                        task={task}
                        completeTask={completeTask}
                        deleteTask={deleteTask}
                    />
                ))
            )}
        </ul>
    )
}

TaskList.propTypes = {
    tasks: PropTypes.arrayOf(
        PropTypes.shape({
            id: PropTypes.number.isRequired,
            title: PropTypes.string.isRequired,
            completed: PropTypes.bool.isRequired,
        })
    ).isRequired,
    completeTask: PropTypes.func.isRequired,
    deleteTask: PropTypes.func.isRequired
};

export default TaskList