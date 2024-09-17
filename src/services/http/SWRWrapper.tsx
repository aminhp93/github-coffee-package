import React, { PropsWithChildren } from "react";
import useSwr, { SWRConfig, SWRConfiguration, useSWRConfig } from "swr";

const SWRWrapper = ({
  children,
  config = { errorRetryCount: 1, errorRetryInterval: 2000, revalidateOnFocus: false },
}: PropsWithChildren<{ config?: SWRConfiguration }>) => (
  <SWRConfig value={config}>{children}</SWRConfig>
);

export { SWRWrapper, useSwr, useSWRConfig };
export type { SWRConfiguration}
