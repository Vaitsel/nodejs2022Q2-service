import {
  forwardRef,
  Inject,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { AlbumsService } from 'src/albums/albums.service';
import { TracksService } from 'src/tracks/tracks.service';
import { v4 as uuidv4 } from 'uuid';
import { CreateArtistDto } from './dto/create-artist.dto';
import { UpdateArtistDto } from './dto/update-artist.dto';
import { IArtist } from './interfaces/artist.interface';

@Injectable()
export class ArtistsService {
  constructor(
    @Inject(forwardRef(() => AlbumsService))
    private readonly albumsService: AlbumsService,

    @Inject(forwardRef(() => TracksService))
    private readonly tracksService: TracksService,
  ) {}

  private artists: IArtist[] = [];

  async getAll(): Promise<IArtist[]> {
    return this.artists;
  }

  async getById(id: string): Promise<IArtist> {
    const artist = this.artists.find((artist) => id === artist.id);
    if (artist) return artist;
    throw new NotFoundException('Artist not found.');
  }

  async create(artistDto: CreateArtistDto): Promise<IArtist> {
    const Artist = {
      id: uuidv4(),
      ...artistDto,
    };
    this.artists.push(Artist);
    return Artist;
  }

  async update(id: string, artistDto: UpdateArtistDto): Promise<IArtist> {
    const artist = this.artists.find((artist) => id === artist.id);
    if (artist) {
      let updArtist: IArtist | null = null;
      this.artists = this.artists.map((artist) =>
        artist.id === id
          ? (updArtist = {
              ...artist,
              ...artistDto,
            })
          : artist,
      );
      return updArtist;
    }
    throw new NotFoundException('Artist not found.');
  }

  async remove(id: string): Promise<void> {
    const artist = this.artists.find((artist) => id === artist.id);
    if (artist) {
      await this.albumsService.findRemoveArtists(id);
      await this.tracksService.findRemoveArtists(id);
      this.artists = this.artists.filter((artist) => artist.id !== id);
      return;
    }
    throw new NotFoundException('Artist not found.');
  }

  async selectArtist(id: string): Promise<IArtist> {
    return this.artists.find((artist) => id === artist.id);
  }
}
