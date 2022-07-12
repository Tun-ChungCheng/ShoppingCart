const redis = require("redis");
const redisClient = redis.createClient({
  host: process.env.REDIS_HOSTNAME,
  port: process.env.REDIS_PORT,
  password: process.env.REDIS_PASSWORD,
  legacyMode: true,
});

redisClient.on("connect", () => {
  console.log("Connect to Redis Cloud sucessfully.");
  redisClient.set("Programmer", "Ian Cheng");
});

function getOrSetCache(key, cb) {
  return new Promise((resolve, reject) => {
    redisClient.get(key, async (error, data) => {
      if (error) return reject(error);
      if (data != null) return resolve(JSON.parse(data));
      const freshData = await cb();
      redisClient.set(key, JSON.stringify(freshData));
      resolve(freshData);
      console.log("Hit Cache");
    });
  });
}

module.exports.getOrSetCache = getOrSetCache;
