import { CommonPropertyGroupKey, SetupConfig } from "./property";
import { DataValue } from "./data-source";
import { ItemTheme } from "../../services/http/themes/Themes.schema";

export * from "./data-source";
export * from "./property";

export type ItemConfig<K extends PropertyKey = CommonPropertyGroupKey> = {
  [key in K]?: Record<string, unknown>;
};

export type ItemProps<T> = {
  editMode: boolean;
  itemTheme: ItemTheme | null;
  config: T;
  onUpdateData?: (tagId: string, value: DataValue) => void;
};

type Component<T, U> = {
  (props: ItemProps<T>): JSX.Element;
  itemSetup: ItemSetup<U>;
};

export type CachedItem<T = ItemConfig> = {
  key: string;
  name: string;
  icon?: string;
  image?: string;
  // component: {
  //   render: FunctionComponent<ItemProps<T>>;
  //   itemSetup: ItemSetup<T>;
  // };
  component: Component<T, ItemConfig>;
  config: SetupConfig<T>;
  dir: string[];
};

export type ItemSetup<T = ItemConfig> = Omit<CachedItem<T>, "component" | "dir"> & {
  requiredFeature?: string;
};

const _ROLES = ["administrator", "powerUser", "maintenance", "user", "viewer"] as const;

export const ROLES = [..._ROLES];

export type Role = typeof _ROLES[number];

export type ViewItemData = { locked?: boolean; config: ItemConfig };
