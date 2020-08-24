import express, { Response, Request } from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import axios from 'axios';
import morgan from 'morgan';
import EventsController from './cotrollers/EventsController';

dotenv.config();
const appPort = process.env.APP_PORT;

const app = express();
const events = new EventsController();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(morgan(':method :url :status :response-time ms'));

app.post('/events', (req: Request, res: Response) => {
  const { type, payload } = req.body;

  if (type) {
    events.storeEvent({ type, payload });

    console.log(`Event ${type} received`);

    axios
      .post(process.env.POSTS_SERVICE_URL as string, { type, payload })
      .then(() => console.log(`Event ${type} redirected to posts service`))
      .catch((err) => console.log('error passing event to posts service'));
    axios
      .post(process.env.COMMENTS_SERVICE_URL as string, { type, payload })
      .then(() => console.log(`Event ${type} redirected to comments service`))
      .catch((err) => console.log('error passing event to comments service'));
    axios
      .post(process.env.QUERY_SERVICE_URL as string, { type, payload })
      .then(() => console.log(`Event ${type} redirected to query service`))
      .catch((err) => console.log('error passing event to query service'));
    axios
      .post(process.env.MODERATION_SERVICE_URL as string, { type, payload })
      .then(() => console.log(`Event ${type} redirected to moderation service`))
      .catch((err) => console.log('error passing event to moderation service'));
  }

  res.status(200).json({ success: true });
});

app.get('/events', (req: Request, res: Response) => {
  const olderEvents = events.getAllEvents();
  res.status(200).json(olderEvents);
});

app.listen(appPort, () => {
  console.log(`Posts service listening on port ${appPort}`);
});
