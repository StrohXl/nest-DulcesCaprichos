import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateSolicitudDto } from './dto/create-solicitud.dto';
import { UpdateSolicitudDto } from './dto/update-solicitud.dto';
import { IngredientsService } from '../ingredients/ingredients.service';
import { InjectRepository } from '@nestjs/typeorm';
import { Solicitud } from './entities/solicitud.entity';
import { In, Repository } from 'typeorm';

@Injectable()
export class SolicitudService {
  constructor(
    private ingredientService: IngredientsService,
    @InjectRepository(Solicitud) private solicitudRepo: Repository<Solicitud>,
  ) {}

  async create(createSolicitudDto: CreateSolicitudDto) {
    const { idIngredient, quantity } = createSolicitudDto;
    const ingredient = await this.ingredientService.findOne(idIngredient);
    const newSolicitud = this.solicitudRepo.create({
      quantity,
      idIngredient: ingredient,
    });
    newSolicitud.price = quantity * ingredient.price;
    return this.solicitudRepo.save(newSolicitud);
  }

  findAll() {
    return this.solicitudRepo.find({ relations: { idIngredient: true } });
  }

  async findOne(id: number) {
    const solicitud = await this.solicitudRepo.findOne({
      where: { id },
      relations: { idIngredient: true },
    });
    if (!solicitud) {
      throw new NotFoundException(`Solicitud #${id} not found`);
    }
    return solicitud;
  }

  async findBy(id: number[]) {
    const solicitud = await this.solicitudRepo.findBy({ id: In(id) });
    if (solicitud.length == 0) {
      throw new NotFoundException(`Solicitud #${id} not found`);
    }
    return solicitud;
  }

  async update(id: number, updateSolicitudDto: UpdateSolicitudDto) {
    const { idIngredient, quantity } = updateSolicitudDto;
    const solicitud = await this.findOne(id);
    if (idIngredient) {
      const ingredient = await this.ingredientService.findOne(idIngredient);
      solicitud.idIngredient = ingredient;
    }
    if (quantity) {
      solicitud.quantity = quantity;
    }
    solicitud.price = solicitud.quantity * solicitud.idIngredient.price;
    return this.solicitudRepo.save(solicitud);
  }

  async remove(id: number) {
    await this.findOne(id);
    this.solicitudRepo.delete(id);
    return `Remove a #${id} solicitud`;
  }
}
