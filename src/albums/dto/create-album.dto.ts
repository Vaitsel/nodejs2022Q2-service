import { IsNotEmpty, IsNumber, IsString } from 'class-validator';
export class CreateAlbumDto {
  @IsNotEmpty()
  @IsString()
  name: string;

  @IsNotEmpty()
  @IsNumber()
  year: number;

  @IsNotEmpty()
  @IsString()
  artistId: string | null;
}
