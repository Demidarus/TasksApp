import { useState, useEffect } from "react";
import { Card, Badge, Label, TextInput, Button } from "flowbite-react";
import {
  fetchTasksByDeveloperId,
  searchTasksByDeveloperId,
} from "../utils/api";
import { useAuth } from "../contexts/auth-context";
import { useAlert } from "../contexts/alert-context";
import { getErrorMessage } from "../utils/getErrorMessage";
import { getBadgeColor } from "../utils/getBadgeColor";
import { useNavigate } from "react-router-dom";
import { HiSearch } from "react-icons/hi";

function Home() {
  const auth = useAuth();

  const [isLoading, setIsLoading] = useState(true);
  const [tasks, setTasks] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const { showAlert } = useAlert();
  const navigate = useNavigate();

  useEffect(() => {
    if (auth.developer !== null) {
      fetchTasks();
    }
  }, [auth.developer]);

  const handleSearchButtonClick = async () => {
    setIsLoading(true);
    if (searchQuery.trim() !== "") {
      await fetchSearchedTasks(searchQuery);
    } else {
      await fetchTasks();
    }
    setIsLoading(false);
  };

  async function fetchTasks() {
    setIsLoading(true);
    console.log(auth.developer);
    if (auth.isAuthenticated()) {
      try {
        const tasks = await fetchTasksByDeveloperId(
          auth.developer.id,
          auth.token
        );
        setTasks(tasks);
        setIsLoading(false);
      } catch (error) {
        showAlert(
          "failure",
          "Registration failed. Server responded with the following error: " +
            getErrorMessage(error.response.data)
        );
      }
    }
  }

  const fetchSearchedTasks = async (query) => {
    if (auth.isAuthenticated()) {
      try {
        const searchedTasks = await searchTasksByDeveloperId(
          auth.developer.id,
          auth.token,
          query
        );
        setTasks(searchedTasks);
      } catch (error) {
        showAlert(
          "failure",
          "Error fetching tasks: " + getErrorMessage(error.response.data)
        );
      }
    }
  };

  const handleCardClick = (id) => {
    navigate(`/tasks/${id}`);
  };

  return (
    <>
      {auth.isAuthenticated() ? (
        <div className="flex flex-col min-h-screen w-full">
          <header className="top-0 z-10 bg-white">
            <h1 className="text-3xl font-bold mb-10">My Tasks</h1>
            <div className="mb-4">
              <Label
                htmlFor="search"
                value="Search tasks by Title"
                className="block mb-2"
              />
              <div className="flex items-center">
                <TextInput
                  id="search"
                  type="text"
                  icon={HiSearch}
                  placeholder="Search tasks by Title..."
                  required={true}
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="mr-0 flex-grow"
                />
                <Button
                  size="sm"
                  onClick={handleSearchButtonClick}
                  className="ml-0"
                >
                  Search
                </Button>
              </div>
            </div>
          </header>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
            {!isLoading ? (
              <>
                {tasks.length !== 0 ? (
                  <>
                    {tasks.map((task) => {
                      const badgeColor = getBadgeColor(task.status);
                      return (
                        <div key={task.id} className="w-full">
                          <Card
                            className="flex flex-col h-full min-w-0"
                            onClick={() => handleCardClick(task.id)}
                            href="#"
                          >
                            <h5 className="text-2xl font-bold tracking-tight text-gray-900 dark:text-white overflow-hidden line-clamp-1">
                              {task.title}
                            </h5>
                            <div className="flex justify-between">
                              <Badge
                                color={badgeColor}
                                className="my-2 py-1 px-2"
                              >
                                {task.status}
                              </Badge>
                              <div className="flex items-center">
                                <span className="text-gray-500 text-xs mr-2">
                                  str pnt
                                </span>
                                <Badge color="gray" className="my-2 py-1 px-2">
                                  {task.storyPoints}
                                </Badge>
                              </div>
                            </div>
                            <p className="font-normal text-gray-700 dark:text-gray-400 flex-grow overflow-hidden line-clamp-5">
                              {task.description}
                            </p>
                          </Card>
                        </div>
                      );
                    })}
                  </>
                ) : (
                  <div>No Tasks found.</div>
                )}
              </>
            ) : (
              <div>
                <div role="status" className="w-[100] animate-pulse">
                  <div className="h-2.5 bg-gray-200 rounded-full dark:bg-gray-700 w-48 mb-4"></div>
                  <div className="h-2 bg-gray-200 rounded-full dark:bg-gray-700 max-w-[700px] mb-2.5"></div>
                  <div className="h-2 bg-gray-200 rounded-full dark:bg-gray-700 mb-2.5"></div>
                  <div className="h-2 bg-gray-200 rounded-full dark:bg-gray-700 max-w-[700px] mb-2.5"></div>
                  <div className="h-2 bg-gray-200 rounded-full dark:bg-gray-700 max-w-[700px] mb-2.5"></div>
                  <div className="h-2 bg-gray-200 rounded-full dark:bg-gray-700 max-w-[700px]"></div>
                  <span className="sr-only">Loading...</span>
                </div>
              </div>
            )}
          </div>
        </div>
      ) : (
        <div className="p-4">
          <h1 className="text-3xl font-bold mb-4">Welcome to My Tasks App</h1>
          <p>
            Please create an Account or Log In to start exploring your tasks.
          </p>
        </div>
      )}
    </>
  );
}

export default Home;
