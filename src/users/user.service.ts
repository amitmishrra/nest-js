import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { RabbitMQService } from '../rabbitmq/rabbitmq.service';
import { User } from './user.schema';

@Injectable()
export class UserService {
  constructor(
    @InjectModel('User') private readonly userModel: Model<User>,
    private readonly rabbitMQService: RabbitMQService,
  ) {}

  async findAll(): Promise<User[]> {
    try {
      return await this.userModel.find().exec();
    } catch (error) {
      throw new Error(`Error while fetching users: ${error.message}`);
    }
  }

  async findOne(id: string): Promise<User> {
    try {
      const user = await this.userModel.findById(id).exec();
      if (!user) {
        throw new NotFoundException('User not found');
      }
      return user;
    } catch (error) {
      throw new Error(`Error while fetching user: ${error.message}`);
    }
  }

  async update(id: string, updateUserDto: any): Promise<User> {
    try {
      const updatedUser = await this.userModel
        .findByIdAndUpdate(id, updateUserDto, { new: true })
        .exec();
      if (!updatedUser) {
        throw new NotFoundException('User not found');
      }
      return updatedUser;
    } catch (error) {
      throw new Error(`Error while updating user: ${error.message}`);
    }
  }

  async remove(id: string): Promise<User> {
    try {
      const deletedUser = await this.userModel.findByIdAndDelete(id).exec();
      if (!deletedUser) {
        throw new NotFoundException('User not found');
      }
      return deletedUser;
    } catch (error) {
      throw new Error(`Error while deleting user: ${error.message}`);
    }
  }

  async create(createUserDto: any): Promise<User> {
    try {
      const createdUser = new this.userModel(createUserDto);
      const savedUser = await createdUser.save();
      await this.rabbitMQService.sendMessage('user_created', JSON.stringify(savedUser));
      return savedUser;
    } catch (error) {
      throw new Error(`Error while creating user: ${error.message}`);
    }
  }
}
