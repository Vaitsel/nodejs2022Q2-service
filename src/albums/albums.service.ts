import {
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { v4 as uuidv4 } from 'uuid';
import { CreateAlbumDto } from './dto/create-album.dto';
import { UpdateAlbumDto } from './dto/update-album.dto';
import { IAlbum } from './interfaces/album.interface';

@Injectable()
export class AlbumsService {
  private albums: IAlbum[] = [];

  async getAll(): Promise<IAlbum[]> {
    return this.albums;
  }

  async getById(id: string): Promise<IAlbum> {
    const album = this.albums.find((album) => id === album.id);
    if (album) return album;
    throw new NotFoundException('Album not found.');
  }

  async create(albumDto: CreateAlbumDto): Promise<IAlbum> {
    const Album = {
      id: uuidv4(),
      ...albumDto,
    };
    this.albums.push(Album);
    return Album;
  }

  async update(id: string, albumDto: UpdateAlbumDto): Promise<IAlbum> {
    const album = this.albums.find((album) => id === album.id);
    if (album) {
      let updAlbum: IAlbum | null = null;
      this.albums = this.albums.map((album) =>
        album.id === id
          ? (updAlbum = {
              ...album,
              ...albumDto,
            })
          : album,
      );
      return updAlbum;
    }
    throw new NotFoundException();
  }

  async remove(id: string): Promise<void> {
    const album = this.albums.find((album) => id === album.id);
    if (album) {
      this.albums = this.albums.filter((album) => album.id !== id);
      return;
    }
    throw new NotFoundException();
  }
}
