import express, { Response, Request } from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import morgan from 'morgan';

import CommentsList, { CommentData } from './CommentsList';
import EventsController from './controllers/EventsController';

dotenv.config();
const appPort = process.env.APP_PORT;

const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(morgan(':method :url :status :response-time ms'));

// Storage of posts data
const comments = new CommentsList();
const eventHandler = new EventsController(comments);

app.get('/posts/:id/comments', (req: Request, res: Response<CommentData[]>) => {
  const { id } = req.params;

  res.status(200).json(comments.getCommentsListFromPost(parseInt(id)));
});

app.post('/posts/:id/comments', (req: Request, res: Response<CommentData>) => {
  const { id } = req.params;
  const { content } = req.body;

  res.status(200).json(comments.createComment(parseInt(id), content));
});

app.post('/events', (req: Request, res: Response) => {
  const { type, payload } = req.body;
  eventHandler.handleEvent({ type, payload }, res);
});

app.listen(appPort, () => {
  console.log(`Posts service listening on port ${appPort}`);
});
