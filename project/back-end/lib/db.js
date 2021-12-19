const { v4: uuid } = require("uuid");
const { clone, merge } = require("mixme");
const microtime = require("microtime");
const level = require("level");
const db = level(__dirname + "/../db");

module.exports = {
  channels: {
    create: async (channel) => {
      if (!channel.name) throw Error("Invalid channel");
      channel.id = uuid();
      await db.put(`channels:${channel.id}`, JSON.stringify(channel));
      const data = await db.get(`channels:${channel.id}`);
      return merge(channel, { id: channel.id });
    },
    get: async (id) => {
      if (!id) throw Error("Invalid id");
      const data = await db.get(`channels:${id}`);
      const channel = JSON.parse(data);
      return merge(channel, { id: id });
    },
    list: async () => {
      return new Promise((resolve, reject) => {
        const channels = [];
        db.createReadStream({
          gt: "channels:",
          lte: "channels" + String.fromCharCode(":".charCodeAt(0) + 1),
        })
          .on("data", ({ key, value }) => {
            channel = JSON.parse(value);
            channel.id = key.split(":")[1];
            channels.push(channel);
          })
          .on("error", (err) => {
            reject(err);
          })
          .on("end", () => {
            resolve(channels);
          });
      });
    },
    update: async (id, editedChannel) => {
      const data = await db.put(
        `channels:${id}`,
        JSON.stringify(editedChannel)
      );
    },
    delete: (id, channel) => {
      const original = store.channels[id];
      if (!original) throw Error("Unregistered channel id");
      delete store.channels[id];
    },
  },
  messages: {
    create: async (channelId, message) => {
      if (!channelId) throw Error("Invalid channel");
      if (!message.author) throw Error("Invalid message");
      if (!message.content) throw Error("Invalid message");
      creation = microtime.now();
      await db.put(
        `messages:${channelId}:${creation}`,
        JSON.stringify({
          author: message.author,
          content: message.content,
        })
      );
      return merge(message, { channelId: channelId, creation: creation });
    },
    delete: async (channelId, creation) => {
      await db.del(`messages:${channelId}:${creation}`);
      return { sucess: true };
    },
    update: async (content, channelId, creation) => {
      const editMessage = content;
      const data = await db.get(`messages:${channelId}:${creation}`);
      let message = JSON.parse(data);
      message.content = editMessage;
      await db.put(
        `messages:${channelId}:${creation}`,
        JSON.stringify(message)
      );
    },
    list: async (channelId) => {
      return new Promise((resolve, reject) => {
        const messages = [];
        db.createReadStream({
          gt: `messages:${channelId}:`,
          lte:
            `messages:${channelId}` +
            String.fromCharCode(":".charCodeAt(0) + 1),
        })
          .on("data", ({ key, value }) => {
            message = JSON.parse(value);
            const [, channelId, creation] = key.split(":");
            message.channelId = channelId;
            message.creation = creation;
            messages.push(message);
          })
          .on("error", (err) => {
            reject(err);
          })
          .on("end", () => {
            resolve(messages);
          });
      });
    },
  },
  users: {
    create: async (user) => {
      if (!user.username) throw Error("Invalid user");
      //const id = uuid()
      await db.put(`users:${user.username}`, JSON.stringify(user));
      return merge(user, { id: user.username });
    },
    get: async (username) => {
      if (!username) throw Error("Invalid username");
      const data = await db.get(`users:${username}`);
      const user = JSON.parse(data);
      return merge(user, { id: username });
    },
    list: async () => {
      return new Promise((resolve, reject) => {
        const users = [];
        db.createReadStream({
          gt: "users:",
          lte: "users" + String.fromCharCode(":".charCodeAt(0) + 1),
        })
          .on("data", ({ key, value }) => {
            user = JSON.parse(value);
            user.id = key.split(":")[1];
            users.push(user);
          })
          .on("error", (err) => {
            reject(err);
          })
          .on("end", () => {
            resolve(users);
          });
      });
    },
    update: async (user) => {
      await db.put(`users:${user.username}`, JSON.stringify(user));
    },
    delete: (id, user) => {
      const original = store.users[id];
      if (!original) throw Error("Unregistered user id");
      delete store.users[id];
    },
  },
  admin: {
    clear: async () => {
      await db.clear();
    },
  },
};
