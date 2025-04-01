export class User {
  id?: number;
  username: string;
  password: string;

  constructor(props: { id?: number; username: string; password: string }) {
    this.id = props.id;
    this.username = props.username;
    this.password = props.password;
  }
}
