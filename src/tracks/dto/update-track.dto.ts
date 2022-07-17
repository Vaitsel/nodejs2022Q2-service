import { IsNotEmpty, IsNumber, IsString, ValidateIf } from 'class-validator';

export class UpdateTrackDto {
  @IsNotEmpty()
  @IsString()
  name: string;

  @IsNotEmpty()
  @IsString()
  artistId: string | null;
  
  @IsNotEmpty()
  @IsString()
  albumId: string | null;

  @IsNumber()
  duration: number;
}
