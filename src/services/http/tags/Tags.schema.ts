import { z } from "zod";

// ----- common -----
const AlarmLimitSchema = z.object({
  limitValue: z.number(),
  limitType: z.number(),
});

const MetadataSchema = z.object({
  name: z.string(),
  type: z.string(),
  value: z.string(),
});

const ComponentsSchema = z.object({
  analogValue: z
    .object({
      deadband: z.number(),
      defaultValue: z.number(),
      minValue: z.number(),
      maxValue: z.number(),
      unit: z.number(),
      magnitude: z.number(),
      value: z.number(),
    })
    .optional(),
  digitalValue: z
    .object({
      defaultValue: z.boolean(),
      activeName: z.string(),
      inactiveName: z.string(),
      value: z.boolean(),
    })
    .optional(),
  enumeratedValue: z
    .object({
      value: z.number(),
      defaultValue: z.number(),
      names: z.array(z.string()),
    })
    .optional(),
  stringValue: z
    .object({
      defaultValue: z.string(),
    })
    .optional(),
  jsonValue: z
    .object({
      value: z.string(),
    })
    .optional(),
  binaryValue: z
    .object({
      value: z.string(),
    })
    .optional(),
  analogAlarm: z
    .object({
      alarmClass: z.string(),
      alarmDelay: z.number(),
      alarmDelayNormal: z.number(),
      alarmLimits: z.array(AlarmLimitSchema),
    })
    .optional(),
  digitalAlarm: z
    .object({
      alarmClass: z.string(),
      alarmDelay: z.number(),
      alarmDelayNormal: z.number(),
      alarmValue: z.boolean(),
    })
    .optional(),
  enumeratedAlarm: z
    .object({
      alarmClass: z.string(),
      alarm_values: z.array(z.number()),
    })
    .optional(),
  stringAlarm: z
    .object({
      alarmClass: z.string(),
      alarmValues: z.array(z.string()),
    })
    .optional(),
  runtime: z.record(z.unknown()).optional(),
  metadata: z
    .object({
      metadata: z.array(MetadataSchema),
    })
    .optional(),
});

const ItemTagSchema = z.object({
  id: z.string(),
  controllerId: z.string(),
  type: z.string(),
  name: z.string(),
  description: z.string(),
  parentId: z.string(),
  createdBy: z.string(),
  created: z.string(),
  updated: z.string(),
  components: ComponentsSchema,
});

// ----- list tags -----
const ItemListTagsResponseSchema = ItemTagSchema.omit({
  components: true,
});

export const ListTagsResponseSchema = z.array(ItemListTagsResponseSchema);
export type ListTagsResponse = z.infer<typeof ListTagsResponseSchema>;

// ----- create tag -----
export const CreateTagRequestSchema = ItemTagSchema.pick({
  type: true,
  name: true,
  description: true,
  parentId: true,
  components: true,
});
export const CreateTagResponseSchema = ItemTagSchema.pick({
  type: true,
  name: true,
  description: true,
  parentId: true,
  components: true,
});

export type CreateTagRequest = z.infer<typeof CreateTagRequestSchema>;
export type CreateTagResponse = z.infer<typeof CreateTagResponseSchema>;

// ----- read tag -----
export const ReadTagResponseSchema = CreateTagResponseSchema;

export type ReadTagResponse = z.infer<typeof ReadTagResponseSchema>;

// ----- update tag -----
// omit parentId and type from CreateTagRequestSchema
export const UpdateTagRequestSchema = ItemTagSchema.pick({
  type: true,
  name: true,
  description: true,
  parentId: true,
});
export const UpdateTagResponseSchema = CreateTagResponseSchema;

export type UpdateTagRequest = z.infer<typeof UpdateTagRequestSchema>;
export type UpdateTagResponse = z.infer<typeof UpdateTagResponseSchema>;

//  ----- delete tag -----
export const DeleteTagResponseSchema = CreateTagResponseSchema;

export type DeleteTagResponse = z.infer<typeof DeleteTagResponseSchema>;

// ---- tag ----
export const TagSchema = ItemTagSchema.omit({
  components: true,
});

export type Tag = z.infer<typeof TagSchema>;
