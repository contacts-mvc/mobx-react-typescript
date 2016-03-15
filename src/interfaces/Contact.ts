interface Contact {
  id: string;
  firstName: string;
  lastName: string;
  picture: {url: string};
  phoneNumber: string;
  email: string;
  address: string;
}

export class ContactClass implements Contact {
  public id: string;

  constructor(
    public firstName: string = '',
    public lastName: string = '',
    public picture: {url: string} = {url: ''},
    public phoneNumber: string = '',
    public email: string = '',
    public address: string = '') {
      this.id = Math.random().toString(36).substring(2);
    }
}

export default Contact;