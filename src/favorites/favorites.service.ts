import {
  Injectable,
  NotFoundException,
  UnprocessableEntityException
} from '@nestjs/common';
import { v4 as uuidv4 } from 'uuid';
import { IAlbum } from 'src/albums/interfaces/album.interface';
import { IArtist } from 'src/artists/interfaces/artist.interface';
import { ITrack } from 'src/tracks/interfaces/track.interface';
import { TracksService } from 'src/tracks/tracks.service';

@Injectable()
export class FavoritesService {
  private tracks: ITrack[] = [];
  private albums: IAlbum[] = [];
  private artists: IArtist[] = [];

  async getAll() {
    return {
      artists: this.artists,
      tracks: this.tracks,
      albums: this.albums,
    };
  }

  async createTrack(track: ITrack): Promise<ITrack> {
    if (!track) throw new UnprocessableEntityException();
    this.tracks.push(track);
    return track;
  }

  async removeTrack(id: string, track: ITrack): Promise<void> {
    const ind = this.tracks.findIndex((track) => track.id === id);
    if (ind < 0 || !track) throw new NotFoundException();
    this.tracks.splice(ind, 1);
  }

  async createAlbum(album: IAlbum): Promise<IAlbum> {
    if (!album) throw new UnprocessableEntityException();
    this.albums.push(album);
    return album;
  }

  async removeAlbum(id: string, album: IAlbum): Promise<void> {
    const ind = this.albums.findIndex((album) => album.id === id);
    if (ind < 0 || !album) throw new NotFoundException();
    this.albums.splice(ind, 1);
  }

  async createArtist(artist: IArtist): Promise<IArtist> {
    if (!artist) throw new UnprocessableEntityException();
    this.artists.push(artist);
    return artist;
  }

  async removeArtist(id: string, artist: IArtist): Promise<void> {
    const ind = this.artists.findIndex((artist) => artist.id === id);
    if (ind < 0 || !artist) throw new NotFoundException();
    this.artists.splice(ind, 1);
  }
}
