interface Entry {
  title: string;
}

interface PhoneEntry extends Entry {
  number: number;
}

interface EmailEntry extends Entry {
  email: string;
}

interface AddressEntry extends Entry {
  street1?: string;
  street2?: string;
  city?: string;
  state?: string;
  country?: string;
}

interface URLEntry extends Entry {
  url: string;
}

interface Contact {
  id: string;
  firstName: string;
  lastName?: string;
  nickName?: string;
  title?: string;
  companyName?: string;
  pictures?: Array<{url: string}>;
  phoneNumbers?: Array<PhoneEntry>;
  emails?: Array<EmailEntry>;
  addresses?: Array<AddressEntry>;
  urls?: Array<URLEntry>;
}

export default Contact;