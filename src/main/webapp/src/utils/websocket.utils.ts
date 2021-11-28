import { Client, StompSubscription } from "@stomp/stompjs";

import * as ENV from "env/env";
import SockJS from "sockjs-client";

const MAX_RETRY = 2;

class Websocket {
  client: Client | null = null;
  listeners: {
    [id in string]: {
      count: number;
      listener?: StompSubscription;
    };
  } = {};
  retry = 0;

  connect = (): Promise<Client> => {
    return new Promise((resolve, reject) => {
      const client = new Client({
        debug: function (str: string) {
          console.debug(str);
        },
        reconnectDelay: 5000,
        webSocketFactory: function () {
          return new SockJS(ENV.WEBSOCKET_BASE_URL, null, {
            transports: ["websocket"],
            timeout: 10000,
          });
        },
        onConnect: () => {
          console.debug("WEBSOCKET_CONNECTED");
          resolve(client);
        },
        onWebSocketClose: () => {
          console.debug("WEBSOCKET_CLOSED");
          this.retry++;
          if (this.retry >= MAX_RETRY) {
            client.deactivate();
            this.client = null;
          }
          console.debug("WEBSOCKET_CLOSED", this.retry);

          reject();
        },
      });
      client.activate();
    });
  };

  disconnect = (client: any) => {
    if (client !== null) {
      client.disconnect();
    }
  };

  getWebsocket = async () => {
    this.retry = 0;
    if (!this.client) {
      this.client = await this.connect();
    }

    return this.client;
  };
}

const singletonInstance = new Websocket();

export default singletonInstance;
