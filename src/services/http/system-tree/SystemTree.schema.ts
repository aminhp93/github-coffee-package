import { z, ZodSchema } from "zod";

// ==== common ====
const NODE_TYPE = [
  "unknown",
  "network",
  "controller",
  "folder",
  "process-view",
  "device",
  "program",
  "popup",
  "template",
  "tag",
] as const;
const NodeTypeSchema = z.enum(NODE_TYPE);
export type NodeType = z.infer<typeof NodeTypeSchema>;

const ItemNodeSchema = z.object({
  id: z.string(),
  controllerId: z.string(),
  type: NodeTypeSchema,
  name: z.string(),
  description: z.string(),
  parentId: z.string().nullable(),
  createdBy: z.string().nullable(),
  created: z.string(),
  updated: z.string(),
});

// ===== list nodes =====
const ItemListNodesResponseSchema = ItemNodeSchema;
export const ListNodesResponseSchema = z.array(ItemListNodesResponseSchema);

export type ItemListNodesResponse = z.infer<typeof ItemListNodesResponseSchema>;
export type ListNodesResponse = z.infer<typeof ListNodesResponseSchema>;

// ===== create node =====
const CreateNodeRequestSchema = ItemNodeSchema.pick({
  type: true,
  name: true,
  description: true,
  parentId: true,
});

export const CreateNodeResponseSchema = ItemNodeSchema;

export type CreateNodeRequest = z.infer<typeof CreateNodeRequestSchema>;
export type CreateNodeResponse = z.infer<typeof CreateNodeResponseSchema>;

// ===== get tree =====
const GetTreeResponseSchema = ItemNodeSchema.omit({
  controllerId: true,
  type: true,
  createdBy: true,
});

export type GetTreeResponse = z.infer<typeof GetTreeResponseSchema>;

// ===== get node =====
type GetNodeResponseType = {
  id: string;
  name: string;
  description: string;
  parentId: string | null;
  created: string;
  updated: string;
  type: NodeType;
  children?: GetNodeResponseType[];
};

function createNodeDetailResponseDataSchema(): ZodSchema<GetNodeResponseType> {
  return z.lazy(() =>
    z.object({
      id: z.string(),
      name: z.string(),
      description: z.string(),
      parentId: z.string().nullable(),
      created: z.string(),
      updated: z.string(),
      type: NodeTypeSchema,
      children: z.array(createNodeDetailResponseDataSchema()).optional(),
    })
  );
}

export const NodeDetailResponseDataSchema = createNodeDetailResponseDataSchema();

export type GetNodeResponse = z.infer<typeof NodeDetailResponseDataSchema>;

// ===== update node =====
const UpdateNodeRequestSchema = z.object({
  name: z.string().optional(),
  description: z.string().optional(),
  parentId: z.string().optional(),
});
export const UpdateNodeResponseSchema = ItemNodeSchema;

export type UpdateNodeRequest = z.infer<typeof UpdateNodeRequestSchema>;
export type UpdateNodeResponse = z.infer<typeof UpdateNodeResponseSchema>;

// ===== delete node =====
export const DeleteNodeResponseSchema = ItemNodeSchema;
export type DeleteNodeResponse = z.infer<typeof DeleteNodeResponseSchema>;

// ==== node ====
export type SystemNode = Pick<GetNodeResponse, "id" | "name" | "parentId" | "type" | "description">;

export type NodeDetail = Pick<
  GetNodeResponse,
  "id" | "name" | "type" | "description" | "children" | "updated" | "created"
>;
