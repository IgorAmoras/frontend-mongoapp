import axios from "axios";

const api = axios.create({ baseURL: "http://localhost:8080" });

const createUser = async (user) => {
    try {
    console.log(user)
      const createdUser = await api.post("/auth/register", user);
      return createdUser;    
    } catch (error) {
      throw error.response
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
  console.log(user)
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
    throw error
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

const createProject = async (project, user) => {
  try {
    const created = await api.post('/projects/create', project, { headers: { authorization: `Bearer ${user.token}` }})
    return created.data
  } catch (error) {
    throw error
  }

}

const deleteUser = async(user) => {
  try {
    const deleted = await api.delete(`/auth/users/${user._id}`)
    return deleted
  } catch (error) {
    throw error
  }
}

const updateUser = async(user) => {
  try{
    const updated = await api.put(`/auth/users/${user._id}`, user)
    return updated
  }catch(err){
    throw err
  }

}

export {
  createUser,
  loginUser,
  validateUser,
  getProjects,
  deleteProject,
  getResponsible,
  getAllUsers,
  updateProject,
  createProject,
  deleteUser,
  updateUser
};
