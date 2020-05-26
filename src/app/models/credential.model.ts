export class Credential {

  static readonly credentials = [
    new Credential('bob', 'dylan'),
    new Credential('kate', 'moss'),
  ];

  constructor(public username: string, public password: string) {}
}
