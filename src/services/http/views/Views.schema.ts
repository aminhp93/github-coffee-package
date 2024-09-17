import { z } from "zod";
import { DataSourceType } from "../../../types/process-view/data-source";

// common
const VIEWS_TYPE = ["process-view", "popup", "template"] as const;

const ViewsTypeSchema = z.enum(VIEWS_TYPE);

export type ViewsType = z.infer<typeof ViewsTypeSchema>;

const ViewItemSchema = z.object({
  id: z.string(),
  type: z.string().optional(),
  locked: z.boolean().optional(),
  parentId: z.string().optional(),
  config: z.any(),
});

export type ViewItem = z.infer<typeof ViewItemSchema>;

const DataSourceConfigSchema = z
  .object({
    config: z.any(),
    type: z.nativeEnum(DataSourceType),
  })
  .transform((o) => ({ config: o.config, ...o }));

export type DataSourceConfig = z.infer<typeof DataSourceConfigSchema>;

const FrameSchema = z.object({
  x: z.number(),
  y: z.number(),
  width: z.number(),
  height: z.number(),
});

export type Frame = z.infer<typeof FrameSchema>;

const GridSettingsSchema = z.object({
  showGrid: z.boolean(),
  gridOnTop: z.boolean(),
  color: z.string(),
  size: z.number(),
  offset: z.union([z.number(), z.tuple([z.number(), z.number()])]).optional(),
});

export type GridSettings = z.infer<typeof GridSettingsSchema>;

const ContentConfigSchema = z.object({
  viewPort: z.object({
    x: z.number(),
    y: z.number(),
  }),
  favoriteItems: z.array(z.string()),
  theme: z.string().optional(),
  template: z.string().nullable().optional(),
  frame: FrameSchema.optional(),
  grid: GridSettingsSchema.optional(),
});

export type ViewConfig = z.infer<typeof ContentConfigSchema>;

const ContentSchema = z.object({
  items: z.array(ViewItemSchema),
  dataSources: z.record(z.string(), DataSourceConfigSchema).optional(),
  config: ContentConfigSchema.optional(),
});

const ItemViewsSchema = z.object({
  id: z.string(),
  controllerId: z.string(),
  name: z.string(),
  description: z.string(),
  type: ViewsTypeSchema,
  userId: z.string().nullable(),
  created: z.string(),
  updated: z.string(),
  content: ContentSchema,
});

// ===== list views =====
const ItemListViewsResponseSchema = ItemViewsSchema.omit({
  content: true,
});

export const ListViewsResponseSchema = z.array(ItemListViewsResponseSchema);

export type ItemListViewsResponse = z.infer<typeof ItemListViewsResponseSchema>;
export type ListViewsResponse = z.infer<typeof ListViewsResponseSchema>;

// ===== create view =====
export const CreateViewRequestSchema = ItemViewsSchema.pick({
  name: true,
  description: true,
  type: true,
  content: true,
})
  .partial({ content: true })
  .extend({ parentId: z.string() });

export const CreateViewResponseSchema = ItemViewsSchema;

export type CreateViewRequest = z.infer<typeof CreateViewRequestSchema>;
export type CreateViewResponse = z.infer<typeof CreateViewResponseSchema>;

// ===== read view =====
export const ReadViewResponseSchema = ItemViewsSchema;

export type ReadViewResponse = z.infer<typeof ReadViewResponseSchema>;

// ===== update view =====
export const UpdateViewRequestSchema = ItemViewsSchema.pick({
  name: true,
  description: true,
  content: true,
});

export const UpdateViewResponseSchema = ItemViewsSchema;

export type UpdateViewRequest = z.infer<typeof UpdateViewRequestSchema>;
export type UpdateViewResponse = z.infer<typeof UpdateViewResponseSchema>;

// ===== delete view =====
export const DeleteViewResponseSchema = ItemViewsSchema;

export type DeleteViewResponse = z.infer<typeof DeleteViewResponseSchema>;
