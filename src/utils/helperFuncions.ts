import api from "../api/api";

export default function User() {
  const GetUsers = async () => {
    try {
      const response = await api.get("/users");
      return response;
    } catch (error) {
      console.error(error);
    }
  };
  const CreateUser = async (params: any) => {
    try {
      const response = await api.post("/users", params);
     
      return response;
    } catch (error) {
      console.error(error);
    }
  };
  const FilterUsersByType = async (type:string) => {
    try {
      const response = await api.get(`/users/filter/${type}`)
      console.log(response)
      return response;
    } catch (error) {
      console.error(error);
    }
  }

  return { GetUsers, CreateUser,FilterUsersByType };
}
