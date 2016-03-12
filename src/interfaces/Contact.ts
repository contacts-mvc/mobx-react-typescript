interface Contact {
  id: string;
  firstName: string;
  lastName?: string;

  picture?: {url: string};
  phoneNumber?: string;
  email?: string;
  addresse?: string;
}

export default Contact;