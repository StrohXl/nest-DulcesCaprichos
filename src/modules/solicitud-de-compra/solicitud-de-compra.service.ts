import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreateSolicitudDeCompraDto } from './dto/create-solicitud-de-compra.dto';
import { UpdateSolicitudDeCompraDto } from './dto/update-solicitud-de-compra.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { SolicitudDeCompra } from './entities/solicitud-de-compra.entity';
import { Repository } from 'typeorm';
import { SolicitudService } from '../solicitud/solicitud.service';
import { UserService } from '../user/user.service';
import { CreateSolicitudDto } from '../solicitud/dto/create-solicitud.dto';
import { User } from '../user/entities/user.entity';

@Injectable()
export class SolicitudDeCompraService {
  constructor(
    @InjectRepository(SolicitudDeCompra)
    private sdcRepo: Repository<SolicitudDeCompra>,
    @InjectRepository(User)
    private userRepo: Repository<User>,
    private userService: UserService,
    private solicitudService: SolicitudService,
  ) {}

  async create(createSolicitudDeCompraDto: CreateSolicitudDeCompraDto) {
    //Id del usuario
    const idUser = createSolicitudDeCompraDto.user;
    //Id de las solicitudes
    const idSolicitudes = createSolicitudDeCompraDto.solicitudes;

    //Obtener usuario
    const user = await this.userService.findOne(idUser);

    //Crear solicitudes arraiz de los ids enviados
    const solicitudes = await this.createSolicitudes(idSolicitudes);

    //Atravez de las solicitudes calculamos el monto total de cada solicitud sumandola
    let price = 0;
    solicitudes.forEach((i) => {
      price += i.price;
    });

    // Verificar si el Usuario Posee suficiente dinero para hacer la compra
    if (user.money < price) {
      // Si el usuario posee un monto menor al costo total de la solicitud no podra realizar la compra
      throw new BadRequestException(
        `No posees suficiente dinero para realizar esta compra, Posees un total de ${user.money} y la solicitud de compra posee un precio total de ${price}`,
      );
    } else {
      // Al poseer el saldo adecuado se le descontara al usuario el monto total de la solicitud a su cuenta
      user.money = user.money - price;
      this.userRepo.save(user);
    }

    // Creacion de la solicitud
    const newSolicitudDeCompra = this.sdcRepo.create({
      user,
      solicitud: solicitudes,
      price,
    });
    // Guardar solicitud
    return this.sdcRepo.save(newSolicitudDeCompra);
  }

  async createSolicitudes(solicitudes: CreateSolicitudDto[]) {
    const promises = await solicitudes.map(async (i, index) => {
      return await this.solicitudService.create(i);
    });
    return await Promise.all(promises);
  }

  findAll() {
    return this.sdcRepo.find();
  }

  async findOne(id: number) {
    const solicitudDeCompra = await this.sdcRepo.findOne({ where: { id } });
    if (!solicitudDeCompra) {
      throw new NotFoundException(`Solicitud de Compra #${id}, not found`);
    }
    return solicitudDeCompra;
  }

  update(id: number, updateSolicitudDeCompraDto: UpdateSolicitudDeCompraDto) {
    return `This action updates a #${id} solicitudDeCompra`;
  }

  async remove(id: number) {
    const solicitudDeCompra = await this.findOne(id);
    const user = solicitudDeCompra.user;
    user.money += solicitudDeCompra.price;
    this.userRepo.save(user);
    this.sdcRepo.delete(id);
    return `Removes a #${id} solicitudDeCompra`;
  }
}
