// src/objects/objects.controller.ts
import { 
  Controller, Get, Post, Body, Param, Delete,
  HttpException, HttpStatus 
} from '@nestjs/common';
import { ObjectsService } from './objects.service';
import { CreateObjectDto } from './dto/create-object.dto';

@Controller('objects')
export class ObjectsController {
  constructor(private readonly objectsService: ObjectsService) {}

  @Post()
  async create(@Body() createObjectDto: CreateObjectDto) {
    console.log('🟡 Données reçues du frontend:', createObjectDto);
    
    try {
      // Récupère l'imageUrl du body
      const imageUrl = createObjectDto.imageUrl || '';
      console.log('🟡 ImageUrl à sauvegarder:', imageUrl);
      
      const newObject = await this.objectsService.create(
        {
          title: createObjectDto.title,
          description: createObjectDto.description,
        }, 
        imageUrl
      );
      
      return {
        success: true,
        data: newObject
      };
    } catch (error) {
      console.error('🔴 Erreur création:', error);
      throw new HttpException(
        'Erreur lors de la création',
        HttpStatus.INTERNAL_SERVER_ERROR
      );
    }
  }

  @Get()
  async findAll() {
    try {
      const objects = await this.objectsService.findAll();
      return {
        success: true,
        data: objects
      };
    } catch (error) {
      throw new HttpException(
        'Erreur lors de la récupération',
        HttpStatus.INTERNAL_SERVER_ERROR
      );
    }
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    if (!id || id === 'undefined' || id === 'null') {
      throw new HttpException('ID invalide', HttpStatus.BAD_REQUEST);
    }

    const object = await this.objectsService.findOne(id);
    
    if (!object) {
      throw new HttpException('Objet non trouvé', HttpStatus.NOT_FOUND);
    }
    
    return {
      success: true,
      data: object
    };
  }

  @Delete(':id')
  async remove(@Param('id') id: string) {
    if (!id || id === 'undefined' || id === 'null') {
      throw new HttpException('ID invalide', HttpStatus.BAD_REQUEST);
    }

    const result = await this.objectsService.remove(id);
    
    if (!result) {
      throw new HttpException('Objet non trouvé', HttpStatus.NOT_FOUND);
    }
    
    return {
      success: true,
      message: 'Objet supprimé avec succès'
    };
  }
}