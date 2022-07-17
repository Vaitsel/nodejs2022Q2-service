import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  ParseUUIDPipe,
  Post,
  Put,
} from '@nestjs/common';
import { FavoritesService } from './favorites.service';
import { IAlbum } from 'src/albums/interfaces/album.interface';
import { IArtist } from 'src/artists/interfaces/artist.interface';
import { ITrack } from 'src/tracks/interfaces/track.interface';
import { TracksService } from 'src/tracks/tracks.service';
import { AlbumsService } from 'src/albums/albums.service';
import { ArtistsService } from 'src/artists/artists.service';

@Controller('favs')
export class FavoritesController {

  constructor(
    private readonly favoritesService: FavoritesService,
    private readonly trackService: TracksService,
    private readonly albumsService: AlbumsService,
    private readonly artistsService: ArtistsService,
  ) {}

  @Get()
  getAll(): Promise<{
    artists: IArtist[];
    albums: IAlbum[];
    tracks: ITrack[];
  }> {
    return this.favoritesService.getAll();
  }

  @Post('track/:id')
  async addTrack(@Param('id', new ParseUUIDPipe()) id: string): Promise<ITrack> {
    const track = await this.trackService.selectTrack(id);
    return await this.favoritesService.createTrack(track);
  }

  @Delete('track/:id')
  @HttpCode(HttpStatus.NO_CONTENT)
  async removeTrack(@Param('id', new ParseUUIDPipe()) id: string): Promise<void> {
    const track = await this.trackService.selectTrack(id);
    await this.favoritesService.removeTrack(id, track);
  }

  @Post('album/:id')
  async addAlbum(@Param('id', new ParseUUIDPipe()) id: string): Promise<IAlbum> {
    const album = await this.albumsService.selectAlbum(id);
    return await this.favoritesService.createAlbum(album);
  }

  @Delete('album/:id')
  @HttpCode(HttpStatus.NO_CONTENT)
  async removeAlbum(@Param('id', new ParseUUIDPipe()) id: string): Promise<void> {
    const album = await this.albumsService.selectAlbum(id);
    await this.favoritesService.removeAlbum(id, album);
  }

  @Post('artist/:id')
  async addArtist(@Param('id', new ParseUUIDPipe()) id: string): Promise<IArtist> {
    const artist = await this.artistsService.selectArtist(id);
    return await this.favoritesService.createArtist(artist);
  }

  @Delete('artist/:id')
  @HttpCode(HttpStatus.NO_CONTENT)
  async removeArtist(@Param('id', new ParseUUIDPipe()) id: string): Promise<void> {
    const artist = await this.artistsService.selectArtist(id);
    await this.favoritesService.removeArtist(id, artist);
  }


}
