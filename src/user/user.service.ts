import { HttpException, Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { Repository } from 'typeorm';

@Injectable()
export class UserService {
  constructor(@InjectRepository(User) private readonly userRepository:Repository<User>){}
  async create(createUserDto: CreateUserDto) {
    const {firstName, lastName, email} = createUserDto
    const findMail= await this.userRepository.findOne({where:{email:email}})
    if(findMail){
      throw new HttpException('sorry email already exist', 404)
    }
    const create = await this.userRepository.create({firstName,lastName,email})
    return this.userRepository.save(create);
  }

  async findAll() {
    const find = await this.userRepository.find()
    return find;
  }

  async findOne(id: number) {
    const findOne = await this.userRepository.findOne({where:{id:id}});
    return findOne;
  }

  async update(id: number, updateUserDto: UpdateUserDto) {
    const update = await this.findOne(id);
    return this.userRepository.save({...update, ...updateUserDto});
  }

  async remove(id: number) {
    const deleteUser = await this.findOne(id);
    return this.userRepository.remove(deleteUser);
  }

  async findEmail(email:string){
    const findMail = await this.userRepository.findOneBy({email})
  }
}
