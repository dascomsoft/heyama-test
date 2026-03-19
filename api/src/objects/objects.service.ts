// src/objects/objects.service.ts
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { ObjectItem } from './schemas/object.schema';
import { CreateObjectDto } from './dto/create-object.dto';

@Injectable()
export class ObjectsService {
  constructor(
    @InjectModel(ObjectItem.name) private objectModel: Model<ObjectItem>,
  ) {}

  async create(createObjectDto: CreateObjectDto, imageUrl?: string) {
    console.log('🔵 Service create - imageUrl reçue:', imageUrl);
    
    try {
      const newObject = new this.objectModel({
        title: createObjectDto.title,
        description: createObjectDto.description,
        imageUrl: imageUrl || '',
      });
      
      const saved = await newObject.save();
      console.log('🟢 Objet sauvegardé avec imageUrl:', saved.imageUrl);
      return saved;
    } catch (error) {
      console.error('🔴 Erreur création service:', error);
      throw new Error(`Erreur création: ${error.message}`);
    }
  }

  async findAll() {
    try {
      return await this.objectModel.find().sort({ createdAt: -1 }).exec();
    } catch (error) {
      console.error('🔴 Erreur findAll:', error);
      throw new Error(`Erreur récupération: ${error.message}`);
    }
  }

  async findOne(id: string) {
    try {
      if (!id.match(/^[0-9a-fA-F]{24}$/)) {
        return null;
      }
      return await this.objectModel.findById(id).exec();
    } catch (error) {
      console.error('🔴 Erreur findOne:', error);
      return null;
    }
  }

  async remove(id: string) {
    try {
      if (!id.match(/^[0-9a-fA-F]{24}$/)) {
        return null;
      }
      return await this.objectModel.findByIdAndDelete(id).exec();
    } catch (error) {
      console.error('🔴 Erreur remove:', error);
      return null;
    }
  }
}