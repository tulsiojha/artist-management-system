import { RowDataPacket } from "mysql2";

export const handleError = (e: unknown) => {
  if (e instanceof Error) {
    return e.message;
  } else {
    return "Something went wrong";
  }
};

export interface IPageResult extends RowDataPacket {
  total: number;
}

export interface IPageInfo {
  page: number;
  limit: number;
}

export const getPageInfo = (pageInfo?: IPageInfo) => {
  const limit = pageInfo?.limit || 10;
  const page = (pageInfo?.page || 1) - 1;
  return { limit, offset: page * limit };
};

export const generatePagination = (page: IPageResult[]) => {
  return { pageInfo: { total: page?.[0]?.total || null } };
};
