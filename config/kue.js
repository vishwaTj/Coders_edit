// const kue = require('kue');
// const queue = kue.createQueue();

// module.exports = queue;
const kue= require('kue');
const redis= require('redis');
const queue= kue.createQueue(redis);
queue.watchStuckJobs(6379);
queue.on('ready',()=>{
    console.info('queue is ready');
})
queue.on('error',(err)=>{
    console.error(err.stack);

})
module.exports= queue;