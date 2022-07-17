import { IsNotEmpty, IsNumber, IsString, ValidateIf, IsUUID } from 'class-validator';

export class UpdateTrackDto {
  @IsNotEmpty()
  @IsString()
  name: string;

  @ValidateIf((object, value) => value !== null)
  @IsUUID('4')
  @IsNotEmpty()
  @IsString()
  artistId: string | null;
  
  @ValidateIf((object, value) => value !== null)
  @IsUUID('4')
  @IsNotEmpty()
  @IsString()
  albumId: string | null;

  @IsNumber()
  duration: number;
}
