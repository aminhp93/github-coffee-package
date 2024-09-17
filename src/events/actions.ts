import { EventData } from "./event-data";
import { EventType } from "./event-types";

type CustomEventListener<Data> = (e: CustomEvent<Data>) => void;

// EventDataType = never when EventData does not contain K key meaning that event does not need to pass any data
type EventDataType<K> = K extends keyof EventData ? EventData[K] : never;

export const GlobalEvent = {
  subscribe: <T extends EventType>(eventType: T, listener?: CustomEventListener<EventDataType<T>>) => {
    document.addEventListener(eventType, listener as EventListener);
  },
  unsubscribe: <T extends EventType>(eventType: T, listener?: CustomEventListener<EventDataType<T>>) => {
    document.removeEventListener(eventType, listener as EventListener);
  },
  publish: <T extends EventType>(eventType: T, data?: EventDataType<T>) => {
    const event = new CustomEvent(eventType, { detail: data });
    document.dispatchEvent(event);
  },
} 