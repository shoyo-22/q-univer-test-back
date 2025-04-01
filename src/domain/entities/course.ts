export class Course {
  id?: number;
  title: string;
  imageUrl?: string;
  thumbnailUrl?: string;

  constructor(props: {
    id?: number;
    title: string;
    imageUrl?: string;
    thumbnailUrl?: string;
  }) {
    this.id = props.id;
    this.title = props.title;
    this.imageUrl = props.imageUrl;
    this.thumbnailUrl = props.thumbnailUrl;
  }
}
