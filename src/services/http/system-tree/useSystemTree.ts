// Import libraries
import useSWR from "swr";
import { useEffect, useState } from "react";

// Import local files
import { ListNodesResponseSchema } from "./SystemTree.schema";
import { SystemTreeServices } from "./SystemTree.services";
import { useNetwork } from "@/hooks/useNetwork";
import { SystemNode } from "@/services/http/system-tree/SystemTree.schema";
import { log } from "@/utils/logger";

export const useSystemTree = () => {
  const { controllerId } = useNetwork();
  const [systemTree, setSystemTree] = useState<SystemNode[] | undefined>(
    undefined
  );
  const { data, mutate, isLoading, isValidating } = useSWR(
    "/system-tree-list",
    () => SystemTreeServices.listNodes(controllerId)
  );

  useEffect(() => {
    try {
      if (data) {
        const parsedData = ListNodesResponseSchema.parse(data);
        setSystemTree(parsedData);
      }
    } catch (error) {
      setSystemTree([]);
      log(error);
    }
  }, [setSystemTree, data]);

  return {
    systemTree,
    setSystemTree,
    mutate,
    isLoading,
    isValidating,
  };
};
