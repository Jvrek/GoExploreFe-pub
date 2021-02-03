import { Role } from '../roles/roles.enum';

export class User {
  private username: string;
  private id: number;
  private accessToken: string;
  private email: string;
  private roles: Role[];

  constructor(username: string, id: number, token: string, email: string) {
    this.username = username;
    this.id = id;
    this.accessToken = token;
    this.email = email;
  }

  getUsername(): string {
    return this.username;
  }

  setUsername(value: string) {
    this.username = value;
  }
  getEmail(): string {
    return this.email;
  }

  setEmail(value: string) {
    this.email = value;
  }
  getId(): number {
    return this.id;
  }

  setId(value: number) {
    this.id = value;
  }

  getToken(): string {
    return this.accessToken;
  }

  setToken(value: string) {
    this.accessToken = value;
  }

  getRoles(): Role[] {
    return this.roles;
  }

  setRoles(value: Role[]) {
    this.roles = value;
  }

  addRole(value: Role) {
    this.roles.push(value);
  }
}
