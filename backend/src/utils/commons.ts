import { Request } from "express";
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
  limit: number;
  offset: number;
}

export const getPageInfo = (req: Request) => {
  const limit = Number(req.query?.limit) || 10;
  const page = (Number(req.query?.page) || 1) - 1;
  return { limit, offset: page * limit };
};

export const generatePagination = (page: IPageResult[]) => {
  return { pageInfo: { total: page?.[0]?.total || null } };
};
