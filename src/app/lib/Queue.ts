import Queue from 'bull';
import redisConfig from '../../config/redis';
import * as jobs from '../jobs';

const queues = Object.values(jobs).map(job => ({
  bull: new Queue(job.key, redisConfig as any),
  name: job.key,
  handle: job.handle,
  options: job.options
}))

export default { // As Queue
  queues,

  add(name: string, data: string) {
    const queue = queues.find(queue => queue.name === name);

    return queue.bull.add(data, queue.options);
  },
  
  process() {
    return this.queues.forEach(queue => {
      queue.bull.process(queue.handle);
      
      queue.bull.on('failed', (job, err) => {

        // Sentry.captureException(err);
        
        console.log('Job failed', queue.key, job.data);
        console.log(err);
      })
    })
  }
}