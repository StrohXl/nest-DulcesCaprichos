import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { ConfirmUserService } from './confirm-user.service';
import { CreateConfirmUserDto } from './dto/create-confirm-user.dto';
import { ConfirmEmail } from './dto/send-email-user.dto';

@Controller('confirm-user')
export class ConfirmUserController {
  constructor(private readonly confirmUserService: ConfirmUserService) {}

  @Post('/send-email')
  create(@Body() body: ConfirmEmail) {
    return this.confirmUserService.create(body);
  }

  @Post()
  confirmEmail(@Body() body: CreateConfirmUserDto) {
    return this.confirmUserService.confirmToken(body);
  }

  @Get()
  findAll() {
    return this.confirmUserService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.confirmUserService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string) {
    return this.confirmUserService.update(+id);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.confirmUserService.remove(+id);
  }
}
