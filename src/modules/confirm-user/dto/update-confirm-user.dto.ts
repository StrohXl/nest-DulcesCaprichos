import { PartialType } from '@nestjs/mapped-types';
import { CreateConfirmUserDto } from './create-confirm-user.dto';

export class UpdateConfirmUserDto extends PartialType(CreateConfirmUserDto) {}
