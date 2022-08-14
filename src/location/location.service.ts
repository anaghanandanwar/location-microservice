import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateLocationInput } from './dto/create-location.input';
import { UpdateLocationInput } from './dto/update-location.input';
import { Location } from './entities/location.entity';

@Injectable()
export class LocationService {
  constructor(@InjectRepository(Location) private locationRepository:Repository<Location>){}

  create(createLocationInput: CreateLocationInput):Promise<Location> {
    let location = this.locationRepository.create(createLocationInput)
    return this.locationRepository.save(location);
  }

  async findAll(): Promise<Location[]> {
    return this.locationRepository.find();
  }

  async findOne(id: string): Promise<Location> {
    return await this.locationRepository.findOneById(id);
  }

  update(id: string, updateLocationInput: UpdateLocationInput) {
    let location: Location = this.locationRepository.create(updateLocationInput)
    location.id = id;
    return this.locationRepository.save(location)
  }

  remove(id: number) {
    return `This action removes a #${id} location`;
  }
}
