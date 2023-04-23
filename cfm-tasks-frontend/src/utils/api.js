import axios from "axios";
import { API_BASE_URL } from "../config/config";

// api Calls
export async function fetchTask(id, token) {
  const response = await axios.get(`${API_BASE_URL}/tasks/${id}`, null, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return response.data.data;
}

export async function createTask(token, values) {
  const response = await axios.post(`${API_BASE_URL}/tasks`, values, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return response.data.data;
}

export async function fetchTasksByDeveloperId(id, token) {
  const response = await axios.get(
    `${API_BASE_URL}/developers/${id}?includeTasks=true`,
    null,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );
  return response.data.data.tasks;
}

export async function fetchDeveloperById(id, token) {
  const response = await axios.get(`${API_BASE_URL}/developers/${id}`, null, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return response.data.data;
}

export async function fetchDevelopers(token) {
  const response = await axios.get(`${API_BASE_URL}/developers`, null, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return response.data.data;
}

export async function updateTask(id, token, values) {
  const response = await axios.patch(`${API_BASE_URL}/tasks/${id}`, values, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return response.data.data;
}

export async function updateDeveloperById(id, token, values) {
  const response = await axios.patch(
    `${API_BASE_URL}/developers/${id}`,
    values,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );
  return response.data.data;
}

export async function searchTasksByDeveloperId(id, token, query) {
  const response = await axios.get(
    `${API_BASE_URL}/tasks/search/${query}/${id}`,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );
  return response.data;
}
