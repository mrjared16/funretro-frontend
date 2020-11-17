import { CardDTO } from "./card.dto";
import { ListDTO } from "./list.dto";

export enum PermissionLevel {
  PUBLIC = 'public',
  PRIVATE = 'private',
  MEMBER = 'member'
}

export interface BoardDTO {
  id: string;
  name: string;
  url: string;
  permissionLevel: PermissionLevel;
}

export interface BoardDetailDTO extends BoardDTO {

  lists: ListDTO[]
  cards: CardDTO[]
  members: {
      id: string,
      idMember: string,
      memberType: 'owner' | 'member',
  }[]

}