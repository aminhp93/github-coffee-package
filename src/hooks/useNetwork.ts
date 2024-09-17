import AppConfig from "../configs/app";

/**
 * Hook for retrieving user's controller id
 */
export function useNetwork() {
  try {
    const userStorageValue = window.localStorage.getItem(AppConfig.userDataKey) ?? "{}";
    const user = JSON.parse(userStorageValue);
    const controllerId = user.controllerId;

    return { controllerId };
  } catch (error) {
    return { controllerId: "" };
  }
}
