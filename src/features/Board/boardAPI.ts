import axiosClient from "../../api/axiosClient"
import { BoardDetailDTO } from "./interfaces/board.dto";

class BoardAPI {
  endPoint = '/boards';
  // endPoints = {
  //   getAll: '/boards',
  //   post: '/boards'
  // }

  getAllBoards = async () => {
    const response = await axiosClient.get(this.endPoint);
    return response.data.response.boards;
  }

  addBoard = async (boardData: { name: string }) => {
    const { name } = boardData;
    // console.log({name})
    const response = await axiosClient.post(this.endPoint, { name });
    return response.data.response.board;
  }

  deleteBoard = async (id: string) => {
    const response = await axiosClient.delete(`${this.endPoint}/${id}`);
    // return response.data.response.board;
  }

  getBoard = async (id: string): Promise<BoardDetailDTO> => {
    const response = await axiosClient.get(`${this.endPoint}/${id}`);
    return response.data.response.board;
  }

  updateBoard = async (id: string, boardData: { name: string }) => {
    const { name } = boardData;
    const response = await axiosClient.patch(`${this.endPoint}/${id}`, { name });
    return response.data.response.board;
  }
}

const boardAPI = new BoardAPI();

export {
  boardAPI
};