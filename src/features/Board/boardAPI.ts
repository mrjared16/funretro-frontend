import axiosClient from "../../api/axiosClient"


class BoardAPI {
  endPoints = {
    getAll: '/boards'
  }

  getAllBoards = async () => {
    const response = await axiosClient.get(this.endPoints.getAll);
    return response.data.response.boards;
  }
}

const boardAPI = new BoardAPI();

export {
  boardAPI
};