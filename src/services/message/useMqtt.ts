import mqtt from "mqtt";
import { QoS } from "mqtt-packet";
import { useCallback, useEffect, useRef } from "react";
import { create } from "zustand";
import { log, errorLog } from "@/utils/logger";

type SettingsStore = {
  client: mqtt.MqttClient | null;
  getClient: () => SettingsStore["client"];
  setClient: (data: mqtt.MqttClient | null) => void;
};

const useMqttStore = create<SettingsStore>((set, get) => ({
  client: null,
  getClient: () => get().client,
  setClient: (client) => set((state) => ({ ...state, client })),
}));

export type Subscription = {
  topic: string;
  qos: QoS;
};

/**
 * hook for realtime messages, using mqtt
 * @param onMessageCb "on message" callback, should be wrapped with useCallback
 *
 */
const useMqtt = <T>(onMessageCb?: (topic: string, data: T) => void) => {
  const client = useMqttStore((state) => state.client);
  const setClient = useMqttStore((state) => state.setClient);
  const subscribedTopics = useRef<Set<string>>(new Set());

  const mqttConnect = useCallback(
    (host: string, mqttOption?: mqtt.IClientOptions) => {
      if (client) {
        return;
      }
      setClient(mqtt.connect(host, mqttOption));
    },
    [client, setClient]
  );

  // disconnect
  const mqttDisconnect = useCallback(() => {
    if (client) {
      try {
        client.end(false, () => {
          log("MQTT disconnected successfully");
          subscribedTopics.current = new Set();
        });
        setClient(null);
      } catch (error) {
        errorLog("MQTT disconnect error:", error);
      }
    }
  }, [client, setClient]);

  // publish message
  const mqttPublish = useCallback(
    (context: { topic: string; qos?: QoS; payload: string | Buffer }) => {
      if (client) {
        // topic, QoS & payload for publishing message
        const { topic, qos, payload } = context;
        client.publish(topic, payload, { qos }, (error) => {
          if (error) {
            errorLog("MQTT publish error: ", error);
          }
        });
      }
    },
    [client]
  );

  // unsubscribe topic
  const mqttUnSub = useCallback(
    (subscription: Subscription) => {
      if (client) {
        const { topic } = subscription;
        client.unsubscribe(topic, (error) => {
          if (error) {
            errorLog("MQTT unsubscribe error:", error);
          }
        });
        // Remove topic from ref
        subscribedTopics.current.delete(topic);
      }
    },
    [client]
  );

  const mqttSub = useCallback(
    (subscription: Subscription) => {
      if (client) {
        // topic & QoS for MQTT subscribing
        const { topic, qos } = subscription;
        mqttUnSub(subscription);
        client.subscribe(topic, { qos }, (error) => {
          if (error) {
            errorLog("MQTT subscribe error:", error);
            return;
          }
        });
        subscribedTopics.current.add(topic);
      }
    },
    [client, mqttUnSub]
  );

  const mqttUnSubAll = useCallback(() => {
    if (client) {
      subscribedTopics.current.forEach((topic) => {
        client.unsubscribe(topic, (error) => {
          if (error) {
            errorLog("MQTT unsubscribe error:", error);
          }
        });
      });
      // remove all topics from ref
      subscribedTopics.current.clear();
    }
  }, [client]);

  useEffect(() => {
    if (client) {
      client.setMaxListeners(1000);
      // https://github.com/mqttjs/MQTT.js#event-connect
      client.on("connect", () => {
        log("MQTT connection successful");
      });

      // https://github.com/mqttjs/MQTT.js#event-error
      client.on("error", (err) => {
        errorLog("MQTT connection error: ", err);
        // client?.end();
      });

      // https://github.com/mqttjs/MQTT.js#event-reconnect
      client.on("reconnect", () => {
        // resubscribe topics
        subscribedTopics.current.forEach((topic) => {
          mqttSub({ topic, qos: 0 });
        });
        log("Mqtt reconnecting");
      });

      // https://github.com/mqttjs/MQTT.js#event-message
      client.on("message", (topic: string, message: Buffer) => {
        if (subscribedTopics.current.has(topic)) {
          const parsedData = JSON.parse(message.toString());
          onMessageCb?.(topic, parsedData);
        }
      });
    }
  }, [client, mqttSub, onMessageCb]);

  useEffect(() => {
    // unsubscribe from all topics when component is unmounted
    return () => {
      mqttUnSubAll();
    };
  }, [mqttUnSubAll]);

  return {
    connect: mqttConnect,
    disconnect: mqttDisconnect,
    publish: mqttPublish,
    subscribe: mqttSub,
    unsubscribe: mqttUnSub,
    unsubscribeAll: mqttUnSubAll,
  };
};

export default useMqtt;
