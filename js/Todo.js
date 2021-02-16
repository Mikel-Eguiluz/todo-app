export default class Todo {
  constructor({ title, description, completed = false, id, place }) {
    this.title = title;
    this.description = description ? description : "No description";
    this.completed = completed;
    this.id = id;
    if (place) {
      this.place = {};
      this.place.id = place.id;
      this.place.name = place.name;
    }
  }
}
