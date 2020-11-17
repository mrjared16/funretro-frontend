import axiosClient from "../../api/axiosClient";

class CardAPI {
  endPoint = '/cards';
  // endPoints = {
  //   getAll: '/cards',
  //   post: '/cards'
  // }

  addCard = async (cardData: { name: string, idBoard: string, idList: string, pos: number }) => {
    const { name, idBoard, idList, pos } = cardData;
    const response = await axiosClient.post(this.endPoint, { name, idBoard, idList, pos });
    return response.data.response.card;
  }

  deleteCard = async (id: string) => {
    const response = await axiosClient.delete(`${this.endPoint}/${id}`);
    // return response.data.response.card;
  }

}

const cardAPI = new CardAPI();

export {
  cardAPI
};