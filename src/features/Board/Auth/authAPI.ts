import axiosClient from "../../../api/axiosClient";

class AuthAPI {
  endPoint = '/auth';
  login = async (email: string, password: string) => {
    const response = await axiosClient.post(`${this.endPoint}/login`, { email, password });
    return response.data.response.access_token;
  }
  // addCard = async (cardData: { name: string, idBoard: string, idList: string, pos: number }) => {
  //   const { name, idBoard, idList, pos } = cardData;
  //   const response = await axiosClient.post(this.endPoint, { name, idBoard, idList, pos });
  //   return response.data.response.card;
  // }
  // updateCard = async (idCard: string, cardData: { name: string }) => {
  //   const { name } = cardData;
  //   const response = await axiosClient.patch(`${this.endPoint}/${idCard}`, { name });
  //   return response.data.response.card;
  // }
  // deleteCard = async (idCard: string) => {
  //   const response = await axiosClient.delete(`${this.endPoint}/${idCard}`);
  //   // return response.data.response.card;
  // }

}

const authAPI = new AuthAPI();

export {
  authAPI
};