const Redis = require('ioredis').default

const redis = new Redis({
    host:process.env.REDIS_HOST,
    password:process.env.REDIS_PASSWORD,
    port:process.env.REDIS_PORT
})

redis.on('connect', ()=>{
    console.log("Redis connected")
})

redis.on('error', ()=>{
    console.log(error)
})

module.exports = redis