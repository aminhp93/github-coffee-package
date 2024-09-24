export const DATA_POINT_TOPIC_PREFIX = "webpmp/v5/";

export const getTagIdFromTopic = (topic: string): string => {
  const sperated = topic.split("/");
  if (sperated.length > 0) {
    return sperated[sperated.length - 1];
  }

  return "";
};

export const makeTopicFromTagId = (
  tagId: string,
  prefix: string = DATA_POINT_TOPIC_PREFIX
): string => {
  return prefix + "/set/datapoint/" + tagId;
};
