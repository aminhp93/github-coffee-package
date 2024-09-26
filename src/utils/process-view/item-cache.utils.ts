import { CachedItem, ItemSetup } from "@/types/process-view";

type AssetFolderConfigContent = {
  id: string;
  name: string;
  icon: string;
  image: string;
};

type AssetFolderConfig = {
  id: string;
  name: string;
  toggled: boolean;
  content: AssetFolderConfigContent[]; // Replace with the actual type of content array
  requiredFeature?: string;
};

const ASSET_FOLDER: { [key: string]: AssetFolderConfig } = {
  drawing: {
    id: "drawing",
    name: "Drawing",
    toggled: false,
    content: [],
  },
  basic: {
    id: "basic",
    name: "Basic",
    toggled: false,
    content: [],
  },
  charts: {
    id: "charts",
    name: "Charts",
    toggled: false,
    content: [],
  },
  piping: {
    id: "piping",
    name: "Piping",
    toggled: false,
    content: [],
  },
  utilities: {
    id: "utilities",
    name: "Utilities",
    toggled: false,
    content: [],
  },
  dashboards: {
    id: "dashboards",
    name: "Dashboards",
    toggled: false,
    content: [],
  },
  tools: {
    id: "tools",
    name: "Tools",
    toggled: false,
    content: [],
  },
  objects: {
    id: "objects",
    name: "Objects",
    toggled: false,
    content: [],
  },
  bas: {
    id: "bas",
    name: "BAS",
    toggled: false,
    content: [],
  },
  AteaDemo: {
    id: "AteaDemo",
    name: "Atea alarm demo",
    requiredFeature: "ATEA_VELFERD",
    toggled: false,
    content: [],
  },
  piscadaBAS: {
    id: "piscadaBAS",
    name: "Piscada BAS",
    toggled: false,
    content: [],
  },
};

const isHiddenFeature = (
  feature?: string,
  features?: { [key: string]: boolean }
): boolean => {
  if (!feature || !features) {
    return false;
  }
  return !features[feature];
};

let first = true;

export const createAssetsStructure = (
  assetsMap: Map<string, CachedItem>,
  features: { [key: string]: boolean }
) => {
  if (!first) return Object.values(ASSET_FOLDER);

  first = false;
  assetsMap.forEach((setup, id) => {
    const component = setup.component;
    if (
      !component?.itemSetup ||
      isHiddenFeature(component.itemSetup.requiredFeature, features)
    ) {
      return;
    }
    const { image, icon = "add" } = component.itemSetup;
    const { name, dir } = setup;
    let folder;

    if (dir && (folder = ASSET_FOLDER[dir[dir.length - 1]])) {
      folder.content.push({
        id,
        name,
        image: image ?? "",
        icon,
      });
    }
  });

  const result: {
    id: string;
    name: string;
    content: AssetFolderConfigContent[];
  }[] = [];
  for (const key of Object.keys(ASSET_FOLDER)) {
    const folder = ASSET_FOLDER[key];
    if (
      folder.content.length === 0 ||
      isHiddenFeature(folder.requiredFeature, features)
    ) {
      continue;
    }
    result.push(folder);
  }

  return result;
};

const normalizeName = (name: string) =>
  name.replace(/\.\//, "").replace(/\.js$/, "");

// type Context = ReturnType<typeof require.context>;

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const cacheItems = (cache: Map<string, CachedItem>, items: any) => {
  for (const key of items.keys()) {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const component = (items(key) as any).default;
    if (!component?.itemSetup) continue;

    const normal = normalizeName(key);
    const dir = normal.split("/");
    dir.pop();

    const {
      key: itemKey,
      name,
      config,
      icon,
      image,
    } = component.itemSetup as ItemSetup;

    cache.set(itemKey, {
      key: itemKey,
      component,
      name,
      config,
      dir,
      icon,
      image,
    });
  }
};
