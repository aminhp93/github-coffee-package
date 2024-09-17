import httpService from "../instance";
import {
  ViewsType,
  ListViewsResponse,
  CreateViewRequest,
  CreateViewResponse,
  ReadViewResponse,
  UpdateViewRequest,
  UpdateViewResponse,
  DeleteViewResponse,
} from "./Views.schema";

const ViewsUrl = {
  listViews: (controllerId: string, type?: ViewsType) =>
    `/views/${controllerId}${type ? `?filter=${type}` : ""}`,
  createView: (controllerId: string) => `/views/${controllerId}`,
  readView: (controllerId: string, viewId: string) => `/views/${controllerId}/${viewId}`,
  updateView: (controllerId: string, viewId: string) => `/views/${controllerId}/${viewId}`,
  deleteView: (controllerId: string, viewId: string) => `/views/${controllerId}/${viewId}`,
};

export const ViewsService = {
  listViews: (controllerId: string, type?: ViewsType): Promise<ListViewsResponse> => {
    return httpService({
      method: "GET",
      url: ViewsUrl.listViews(controllerId, type),
    });
  },
  createView: (controllerId: string, data: CreateViewRequest): Promise<CreateViewResponse> => {
    return httpService({
      method: "POST",
      url: ViewsUrl.createView(controllerId),
      data,
    });
  },
  readView: (controllerId: string, viewId: string): Promise<ReadViewResponse> => {
    return httpService({
      method: "GET",
      url: ViewsUrl.readView(controllerId, viewId),
    });
  },
  updateView: (
    controllerId: string,
    viewId: string,
    data: UpdateViewRequest
  ): Promise<UpdateViewResponse> => {
    return httpService({
      method: "POST",
      url: ViewsUrl.updateView(controllerId, viewId),
      data,
    });
  },
  deleteView: (controllerId: string, viewId: string): Promise<DeleteViewResponse> => {
    return httpService({
      method: "DELETE",
      url: ViewsUrl.deleteView(controllerId, viewId),
    });
  },
};
