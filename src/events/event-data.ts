import { Tag } from "../services/http/tags/Tags.schema";
import { EventType } from "./event-types";

/**
 * this type is for mapping custom events with their data
 */
export type EventData = {
  [EventType.TAG_DIALOG]: {
    onTagsSelected: (tags: Tag[]) => void;
    onCancel?: () => void;
  };
  [EventType.EXPAND_ALL_PROPERTIES]: {
    expanded: boolean;
  };
};
