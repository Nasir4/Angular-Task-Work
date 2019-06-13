export class Todo {
  id: number;
  title: string;
  date?: any;
  complete = false;

  constructor(value: Object = {}) {
    Object.assign(this, value);
  }

  //   constructor(id, title, date, complete) {
  //       this.id = id;
  //       this.title = title;
  //       this.date = date;
  //       this.complete = complete;
  //   }
}
