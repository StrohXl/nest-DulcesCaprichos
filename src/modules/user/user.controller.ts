import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Query,
  UseGuards,
  UseInterceptors,
  UploadedFile,
} from '@nestjs/common';
import { UserService } from './user.service';
import { UpdateUserDto } from './dto/update-user.dto';
import { AuthGuard } from '../auth/guards/jwt.guard';
import { Email } from './dto/email-user.dto';
import { FileInterceptor } from '@nestjs/platform-express';
import { uploadImageDto } from '../ingredients/dto/create-ingredient.dto';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get()
  findAll(@Query() query: any) {
    return this.userService.findAll(query);
  }

  @Get('/email')
  findEmail() {
    return this.userService.findEmail();
  }

  @Get('/email/:email')
  findEmailOne(@Param('email') email: Email) {
    return this.userService.findEmailOne(email.email, 'find');
  }

  @UseGuards(AuthGuard)
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.userService.findOne(+id);
  }

  @UseGuards(AuthGuard)
  @Patch(':id')
  @UseInterceptors(FileInterceptor('image'))
  update(
    @Param('id') id: string,
    @Body() updateUserDto: UpdateUserDto,
    @UploadedFile() image: uploadImageDto,
  ) {
    return this.userService.update(+id, updateUserDto, image);
  }

  @UseGuards(AuthGuard)
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.userService.remove(+id);
  }

  // Ingredients

  @UseGuards(AuthGuard)
  @Get('/:id/ingredients')
  findIngredientsUser(@Param('id') id: number) {
    return this.userService.findIngredientsUser(id);
  }

  // Solicitudes de compra
  @UseGuards(AuthGuard)
  @Get('/:id/solicitud-de-compra')
  findSolicitudesDeCompraUser(@Param('id') id: number) {
    return this.userService.findSolicitudesUser(id);
  }
}
