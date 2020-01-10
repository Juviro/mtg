import { CronJob } from 'cron';
import updateCards from './updateCards';
import deleteSessions from './deleteSessions';

const startCronjobs = () => {
  new CronJob('0 0 21 * * *', updateCards, null, true, 'Europe/Berlin');
  new CronJob('0 0 20 * * *', deleteSessions, null, true, 'Europe/Berlin');
};

startCronjobs();
