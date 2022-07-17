import {
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { v4 as uuidv4 } from 'uuid';
import { CreateTrackDto } from './dto/create-track.dto';
import { UpdateTrackDto } from './dto/update-track.dto';
import { ITrack } from './interfaces/track.interface'

@Injectable()
export class TracksService {
  private tracks: ITrack[] = [];

  async getAll(): Promise<ITrack[]> {
    return this.tracks;
  }

  async getById(id: string): Promise<ITrack> {
    const track = this.tracks.find((track) => id === track.id);
    if (track) return track;
    throw new NotFoundException('Tracks not found.');
  }

  async create(trackDto: CreateTrackDto): Promise<ITrack> {
    const Track = {
      id: uuidv4(),
      ...trackDto,
    };
    this.tracks.push(Track);
    return Track;
  }

  async update(id: string, trackDto: UpdateTrackDto): Promise<ITrack> {
    const track = this.tracks.find((album) => id === track.id);
    if (track) {
      let updTrack: ITrack | null = null;
      this.tracks = this.tracks.map((track) =>
        track.id === id
          ? (updTrack = {
              ...track,
              ...trackDto,
            })
          : track,
      );
      return updTrack;
    }
    throw new NotFoundException();
  }

  async remove(id: string): Promise<void> {
    const track = this.tracks.find((track) => id === track.id);
    if (track) {
      this.tracks = this.tracks.filter((track) => track.id !== id);
      return;
    }
    throw new NotFoundException();
  }
}
