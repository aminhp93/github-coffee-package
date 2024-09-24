import { httpService } from "../../..";
import {
  ListTagsResponse,
  CreateTagResponse,
  CreateTagRequest,
  ReadTagResponse,
  UpdateTagRequest,
  UpdateTagResponse,
  DeleteTagResponse,
} from "./Tags.schema";

const TagUrl = {
  listTags: (controllerId: string) => `/tags/${controllerId}`,
  createTag: (controllerId: string) => `/tags/${controllerId}`,
  readTag: (controllerId: string, tagId: string) =>
    `/tags/${controllerId}/${tagId}`,
  updateTag: (controllerId: string, tagId: string) =>
    `/tags/${controllerId}/${tagId}`,
  deleteTag: (controllerId: string, tagId: string) =>
    `/tags/${controllerId}/${tagId}`,
  listTagComponents: (controllerId: string, tagId: string) =>
    `/tags/${controllerId}/${tagId}/components`,
  addTagComponent: (controllerId: string, tagId: string) =>
    `/tags/${controllerId}/${tagId}/components/add`,
  removeTagComponent: (controllerId: string, tagId: string) =>
    `/tags/${controllerId}/${tagId}/components/remove`,
};

export const TagService = {
  listTags: (controllerId: string): Promise<ListTagsResponse> => {
    return httpService({
      method: "GET",
      url: TagUrl.listTags(controllerId),
    });
  },
  createTag: (
    controllerId: string,
    data: CreateTagRequest
  ): Promise<CreateTagResponse> => {
    return httpService({
      method: "POST",
      url: TagUrl.createTag(controllerId),
      data,
    });
  },
  readTag: (controllerId: string, tagId: string): Promise<ReadTagResponse> => {
    return httpService({
      method: "GET",
      url: TagUrl.readTag(controllerId, tagId),
    });
  },
  updateTag: (
    controllerId: string,
    tagId: string,
    data: UpdateTagRequest
  ): Promise<UpdateTagResponse> => {
    return httpService({
      method: "POST",
      url: TagUrl.updateTag(controllerId, tagId),
      data,
    });
  },
  deleteTag: (
    controllerId: string,
    tagId: string
  ): Promise<DeleteTagResponse> => {
    return httpService({
      method: "DELETE",
      url: TagUrl.deleteTag(controllerId, tagId),
    });
  },
};
