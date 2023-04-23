import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { useAlert } from "../../contexts/alert-context";
import { getErrorMessage } from "../../utils/getErrorMessage";
import { Card, Spinner, Badge } from "flowbite-react";
import { useAuth } from "../../contexts/auth-context";
import { getBadgeColor } from "../../utils/getBadgeColor";
import { fetchTask, fetchDeveloperById } from "../../utils/api";
import { useNavigate } from "react-router-dom";

function TaskDetails() {
  const { id } = useParams();
  const auth = useAuth();
  const { showAlert } = useAlert();
  const [task, setTask] = useState({});
  const [developer, setDeveloper] = useState({});
  const [isLoading, setIsLoading] = useState(true);
  const [isFetchingDeveloperLoading, setIsFetchingDeveloperLoading] =
    useState(true);
  const navigate = useNavigate();

  const badgeColor = getBadgeColor(task.status);

  useEffect(() => {
    async function getTask() {
      setIsLoading(true);
      try {
        const fetchedTask = await fetchTask(id, auth.token);
        console.log(fetchedTask);
        setTask(fetchedTask);
        setIsLoading(false);
      } catch (error) {
        showAlert(
          "failure",
          "Fetching Task failed. Server responded with the following error: " +
            getErrorMessage(error.response.data)
        );
      }
    }
    getTask();
  }, []);

  useEffect(() => {
    async function getDeveloper() {
      if (task.developerId) {
        setIsFetchingDeveloperLoading(true);
        try {
          const fetchedDeveloper = await fetchDeveloperById(
            task.developerId,
            auth.token
          );
          setDeveloper(fetchedDeveloper);
          setIsFetchingDeveloperLoading(false);
        } catch (error) {
          showAlert(
            "failure",
            "Fetching Developer failed. Server responded with the following error: " +
              getErrorMessage(error.response.data)
          );
        }
      }
    }
    getDeveloper();
  }, [task]);

  const handleModifyClick = (id) => {
    navigate(`/tasks/update/${id}`);
  };

  return (
    <>
      {!isLoading ? (
        <div className="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8">
          <div className="w-full flex justify-between items-center">
            <button
              onClick={() => navigate("/")}
              className="inline-flex items-center mb-4 p-2 text-xs font-semibold leading-4 text-blue-600 transition-colors duration-150 bg-transparent rounded-md hover:bg-blue-100 hover:text-blue-700"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="w-4 h-4 mr-1"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M11 19l-7-7 7-7m8 14l-7-7 7-7"
                />
              </svg>
              Back
            </button>
            <button
              className="inline-flex items-center mb-4 p-2 text-xs font-semibold leading-4 text-white transition-colors duration-150 bg-blue-600 rounded-md hover:bg-blue-700"
              onClick={() => handleModifyClick(task.id)}
            >
              Modify
            </button>
          </div>
          <Card
            className="text-left"
            style={{ width: "1200px", maxWidth: "100%" }}
          >
            <div>
              <div className="px-4">
                <h3 className="text-base font-semibold leading-7 text-gray-900">
                  Task Information
                </h3>
                <p className="mt-1 max-w-2xl text-sm leading-6 text-gray-500">
                  Details, story points, status, etc...
                </p>
              </div>
              <div className="mt-6 border-t ml-4 border-gray-100">
                <dl className="divide-y divide-gray-100">
                  <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
                    <dt className="text-sm font-medium leading-6 text-gray-900">
                      Title
                    </dt>
                    <dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">
                      {task.title}
                    </dd>
                  </div>
                  <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
                    <dt className="text-sm font-medium leading-6 text-gray-900">
                      Assigned To
                    </dt>
                    <dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">
                      {!isFetchingDeveloperLoading ? (
                        <>{developer.name}</>
                      ) : (
                        <Spinner />
                      )}
                    </dd>
                  </div>
                  <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
                    <dt className="text-sm font-medium leading-6 text-gray-900">
                      Status
                    </dt>
                    <dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">
                      <span className="inline-flex">
                        <Badge color={badgeColor} className="my-2 py-1 px-2">
                          {task.status}
                        </Badge>
                      </span>
                    </dd>
                  </div>
                  <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
                    <dt className="text-sm font-medium leading-6 text-gray-900">
                      Story Points
                    </dt>
                    <dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">
                      {task.storyPoints}
                    </dd>
                  </div>
                  {task.startDate && (
                    <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
                      <dt className="text-sm font-medium leading-6 text-gray-900">
                        Started at
                      </dt>
                      <dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">
                        {task.startDate}
                      </dd>
                    </div>
                  )}
                  {task.doneDate && (
                    <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
                      <dt className="text-sm font-medium leading-6 text-gray-900">
                        Done at
                      </dt>
                      <dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">
                        {task.doneDate}
                      </dd>
                    </div>
                  )}
                  <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
                    <dt className="text-sm font-medium leading-6 text-gray-900">
                      Description
                    </dt>
                    <dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">
                      {task.description}
                    </dd>
                  </div>
                </dl>
              </div>
            </div>
          </Card>
        </div>
      ) : (
        <Spinner />
      )}
    </>
  );
}

export default TaskDetails;
