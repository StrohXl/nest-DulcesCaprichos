import { IsNotEmpty, IsEmail } from 'class-validator';
export class Email {
  @IsNotEmpty()
  @IsEmail()
  email: string;
}
