import { useCallback, useMemo } from "react";
import useSWR, { MutatorOptions, useSWRConfig } from "swr";
import { useNetwork } from "../../../hooks/useNetwork";
import { errorLog } from "../../../utils/logger";
import {
  CreateTagRequest,
  CreateTagRequestSchema,
  CreateTagResponseSchema,
  ListTagsResponseSchema,
} from "./Tags.schema";
import { TagService } from "./Tags.services";

export const useCreateTag = () => {
  const { controllerId } = useNetwork();
  const { mutate } = useSWRConfig();

  const createTag = useCallback(
    async (data: CreateTagRequest, options?: MutatorOptions) => {
      try {
        const res = await mutate(
          `create-tag`,
          () =>
            TagService.createTag(
              controllerId,
              CreateTagRequestSchema.parse(data)
            ),
          options
        );
        return CreateTagResponseSchema.parse(res);
      } catch (error) {
        errorLog("Error while parsing data", error);
        return undefined;
      }
    },
    [controllerId, mutate]
  );

  return createTag;
};

export const useDeleteTag = () => {
  const { controllerId } = useNetwork();
  const { mutate } = useSWRConfig();

  return (tagId: string, options?: MutatorOptions) =>
    mutate(
      `delete-tag`,
      () => TagService.deleteTag(controllerId, tagId),
      options
    );
};

export const useListTags = () => {
  const { controllerId } = useNetwork();

  const { data, ...others } = useSWR(`list-tags`, () =>
    TagService.listTags(controllerId)
  );

  const parsedData = useMemo(() => {
    if (others.isLoading) return undefined;
    try {
      return ListTagsResponseSchema.parse(data);
    } catch (error) {
      errorLog("Error while parsing data", error);
      return undefined;
    }
  }, [data, others.isLoading]);

  return { data: parsedData, ...others };
};
