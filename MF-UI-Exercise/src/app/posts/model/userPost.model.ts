import { User } from 'src/app/user/user.module';

export class UserPost {
    user: User;
    id: number;
    title: string;
    body: string;

    constructor(user: User, title: string, body: string, postId: number) {
        this.user = user;
        this.title = title;
        this.body = body;
        this.id = postId;
    }
}
