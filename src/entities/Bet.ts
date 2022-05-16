import { v4 as uuidv4 } from 'uuid';

class Bet {
  id?: string;

  value: Number;

  createdAt?: Date;

  
  constructor(value: Number) {
    if(!this.id) {
      this.id = uuidv4();
      this.createdAt = new Date();
    }

    this.value = value;
  }
}

export { Bet };