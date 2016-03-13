interface Contact {
  id: string;
  firstName: string;
  lastName: string;
  picture: {url: string};
  phoneNumber: string;
  email: string;
  address: string;
}

export default Contact;