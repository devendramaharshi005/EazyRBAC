/* eslint-disable react/prop-types */
import Task from './Task';

const TaskList = ({ 
  tasks, 
  title, 
  onSuccessTask 
}) => {
  return (
    <div >
      <h2 className="text-xl text-[#293544] font-semibold mb-4">{title}</h2>
      {tasks.length === 0 ? (
        <p className="text-red-600">No tasks found.</p>
      ) : (
        <div className="justify-start items-start flex flex-1 flex-row flex-wrap gap-4">
          {tasks.map((task) => (
            <Task
              key={task.id}
              task={task}
              onSuccessTask={onSuccessTask}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default TaskList;