import axiosClient from "../../../api/axiosClient";

class AuthAPI {
  endPoint = '/auth';
  login = async (email: string, password: string) => {
    const response = await axiosClient.post(`${this.endPoint}/login`, { email, password });
    return response.data.response.access_token;
  }
  signUp = async (userData: { name: string, email: string, password: string | null }) => {
    const { email, name, password } = userData;
    const response = await axiosClient.post(`${this.endPoint}/register`, { email, password, name });
    return response.data.response;
  }

}

const authAPI = new AuthAPI();

export {
  authAPI
};