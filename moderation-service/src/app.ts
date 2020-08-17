import express, { Response, Request } from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import morgan from 'morgan';

import CommentController from './controllers/CommentController';
import EventController from './controllers/EventController';
import { CommentStatus } from './types/Comment';

dotenv.config();
const appPort = process.env.APP_PORT;

const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(morgan(':method :url :status :response-time ms'));

const commentController = new CommentController();
const eventController = new EventController(commentController);

app.post('/events', (req: Request, res: Response) => {
  const { type, payload } = req.body;
  eventController.handleEvent({ type, payload }, res);
});

app.get('/comments', (req: Request, res: Response) => {
  const comments = commentController.getComments();
  res.status(200).json({ posts: comments });
});

app.get('/comments/resolved', (req: Request, res: Response) => {
  const resolvedComments = commentController.getResolvedComments();
  res.status(200).json({ resolvedComments });
});

app.get('/comments/unresolved', (req: Request, res: Response) => {
  const unresolvedComments = commentController.getUnresolvedComments();
  res.status(200).json({ unresolvedComments });
});

app.post('/comments/resolve/:id', (req: Request, res: Response) => {
  const { status } = req.body;
  const { id } = req.params;

  if (status in CommentStatus) {
    const commentId = parseInt(id, 10);
    commentController.resolveCommentModeration(commentId, status, res);
  }
});

app.listen(appPort, () => {
  console.log(`Posts service listening on port ${appPort}`);
});
