import api from "../api/api";

const handleApiError = (error: unknown) => {
  console.error("Erro na API:", error);
  throw error;
};

export default function User() {
  const GetUsers = async () => {
    try {
      const response = await api.get("/users");
      return response;
    } catch (error) {
      handleApiError(error);
    }
  };
  const CreateUser = async (params: any) => {
    try {
      const response = await api.post("/users", params);

      return response;
    } catch (error) {
      handleApiError(error);
    }
  };
  const FilterUsersByType = async (type: string) => {
    try {
      const response = await api.get(`/users/filter/${type}`);
      console.log(response);
      return response;
    } catch (error) {
      handleApiError(error);
    }
  };
  const DeleteUser = async (id: string) => {
    try {
      const response = await api.delete(`/users/${id}`);
      return response;
    } catch (error) {
      handleApiError(error);
    }
  };

  return { GetUsers, CreateUser, FilterUsersByType, DeleteUser };
}
