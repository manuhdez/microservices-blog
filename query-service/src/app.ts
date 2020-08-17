import express, { Response, Request } from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import morgan from 'morgan';
import PostController from './controllers/PostController';
import EventController from './controllers/EventController';

dotenv.config();
const appPort = process.env.APP_PORT;

const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(morgan(':method :url :status :response-time ms'));

const postController = new PostController();
const eventController = new EventController(postController);

app.post('/events', (req: Request, res: Response) => {
  const { type, payload } = req.body;

  eventController.handleEvent({ type, payload });
  res.status(200).json({});
});

app.get('/posts', (req: Request, res: Response) => {
  const posts = postController.getPosts();
  res.status(200).json({ posts });
});

app.listen(appPort, async () => {
  console.log(`Posts service listening on port ${appPort}`);

  const successfulMigration = await eventController.migrate();
  if (successfulMigration) {
    console.log('Successfully migrated older events.');
  } else {
    console.log('No older events to migrate.');
  }
});
