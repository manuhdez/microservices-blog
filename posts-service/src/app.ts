import express, { Response, Request } from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import morgan from 'morgan';

import PostsList, { PostData } from './Post';

dotenv.config();
const appPort = process.env.APP_PORT;

const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(morgan(':method :url :status :response-time ms'));

// Storage of posts data
const posts = new PostsList();

app.get('/posts', (req: Request, res: Response<PostData[]>) => {
  res.status(200).json(posts.getPostsList());
});

app.post('/posts', (req: Request, res: Response<PostData>) => {
  const { title } = req.body;

  res.status(200).json(posts.createPost(title));
});

app.post('/events', (req: Request, res: Response) => {
  const { type, payload } = req.body;

  console.log(`Event received ${type}`);
  res.status(200).json({ success: true });
});

app.listen(appPort, () => {
  console.log(`Posts service listening on port ${appPort}`);
});
