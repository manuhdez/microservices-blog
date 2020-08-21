import axios, { AxiosError } from 'axios';
import morgan from 'morgan';

export interface PostData {
  id: number;
  title: string;
}

export interface PostEvent {
  type: string;
  payload?: Object;
}

export default class PostsList {
  private postsList: PostData[];
  private eventBusUrl = process.env.EVENT_BUS_URL as string;

  constructor(defaultData: PostData[] = []) {
    this.postsList = defaultData;
  }

  createPost(title: string): PostData {
    const newPost: PostData = {
      id: this.postsList.length + 1,
      title,
    };

    this.postsList.push(newPost);
    this.sendPostEvent({ type: 'postCreated', payload: newPost });

    return newPost;
  }

  getPostsList(): PostData[] {
    return this.postsList;
  }

  async sendPostEvent(event: PostEvent) {
    await axios
      .post(this.eventBusUrl, event)
      .catch((err: AxiosError) =>
        console.log(
          `Failed to send event => ${event.type} with status ${err.code}`
        )
      );
  }
}
