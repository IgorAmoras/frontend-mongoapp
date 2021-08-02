import axios from "axios";

const api = axios.create({ baseURL: "http://localhost:8080" });

const createUser = async (user) => {
    try {
    console.log(user)
      const createdUser = await api.post("/auth/register", user);
      return createdUser.data;    
    } catch (error) {
        console.log(error)
    }
};
const loginUser = async (user) => {
  try {
    const loggedUser = await api.post("/auth/authenticate", user);
    return loggedUser.data;
  } catch (error) {
    console.log(error);
  }
};
const validateUser = async (user) => {
  console.log(user.token, user.user.email);
  try {
    const res = await api.get(`/auth/users/${user.user.email}`, {
      headers: { authorization: `Bearer ${user.token}` },
    });
    return res;
  } catch (error) {
    console.error(error);
    return false;
  }
};

const getProjects = async (user) => {
  try {
    const projects = await api.get("/projects/all", {
      headers: { authorization: `Bearer ${user.token}` },
    });
    return projects;
  } catch (error) {
    console.error(error);
  }
};

const deleteProject = async (user, projectId) => {
  try {
    const deletedProject = await api.delete(`/projects/${projectId}`, {
      headers: { authorization: `Bearer ${user.token}` },
    });
    return deletedProject;
  } catch (err) {
    console.error(err);
  }
};
const getResponsible = async (userId) => {
  try {
    const user = await api.get(`/auth/user/${userId}`);
    return user.data;
  } catch (error) {
    console.error(error);
  }
};

const getAllUsers = async () => {
  try {
    const users = await api.get("auth/users");
    return users.data;
  } catch (error) {
    console.error(error);
  }
};

const updateProject = async (id, project, user) => {
  try {
    const updated = await api.put(`/projects/${id}`, project, {
      headers: { authorization: `Bearer ${user.token}` },
    });
    return updated;
  } catch (error) {
    console.error(error);
  }
};

export {
  createUser,
  loginUser,
  validateUser,
  getProjects,
  deleteProject,
  getResponsible,
  getAllUsers,
  updateProject,
};
