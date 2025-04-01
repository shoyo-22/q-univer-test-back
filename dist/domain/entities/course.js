"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Course = void 0;
class Course {
    constructor(props) {
        this.id = props.id;
        this.title = props.title;
        this.imageUrl = props.imageUrl;
        this.thumbnailUrl = props.thumbnailUrl;
    }
}
exports.Course = Course;
