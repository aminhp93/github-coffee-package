import { httpService } from "../../..";
import {
  NodeType,
  ListNodesResponse,
  CreateNodeRequest,
  CreateNodeResponse,
  GetTreeResponse,
  GetNodeResponse,
  UpdateNodeRequest,
  UpdateNodeResponse,
  DeleteNodeResponse,
} from "./SystemTree.schema";

const SystemTreeUrl = {
  listNodes: (controllerId: string, nodeType?: NodeType) =>
    `/system-tree/${controllerId}${nodeType ? `?node_type=${nodeType}` : ""}`,
  createNode: (controllerId: string) => `/system-tree/${controllerId}`,
  getTree: (controllerId: string) => `/system-tree/${controllerId}/tree`,
  getNode: (controllerId: string, nodeId: string) =>
    `/system-tree/${controllerId}/${nodeId}`,
  updateNode: (controllerId: string, nodeId: string) =>
    `/system-tree/${controllerId}/${nodeId}`,
  deleteNode: (controllerId: string, nodeId: string) =>
    `/system-tree/${controllerId}/${nodeId}`,
};

export const SystemTreeServices = {
  listNodes: (
    controllerId: string,
    nodeType?: NodeType
  ): Promise<ListNodesResponse> => {
    return httpService({
      method: "GET",
      url: SystemTreeUrl.listNodes(controllerId, nodeType),
    });
  },
  createNode: (
    controllerId: string,
    data: CreateNodeRequest
  ): Promise<CreateNodeResponse> => {
    return httpService({
      method: "POST",
      url: SystemTreeUrl.createNode(controllerId),
      data,
    });
  },
  getTree: (controllerId: string): Promise<GetTreeResponse> => {
    return httpService({
      method: "GET",
      url: SystemTreeUrl.getTree(controllerId),
    });
  },
  getNode: (controllerId: string, nodeId: string): Promise<GetNodeResponse> => {
    return httpService({
      method: "GET",
      url: SystemTreeUrl.getNode(controllerId, nodeId),
    });
  },
  updateNode: (
    controllerId: string,
    nodeId: string,
    data: UpdateNodeRequest
  ): Promise<UpdateNodeResponse> => {
    return httpService({
      method: "POST",
      url: SystemTreeUrl.updateNode(controllerId, nodeId),
      data,
    });
  },
  deleteNode: (
    controllerId: string,
    nodeId: string
  ): Promise<DeleteNodeResponse> => {
    return httpService({
      method: "DELETE",
      url: SystemTreeUrl.deleteNode(controllerId, nodeId),
    });
  },
};
