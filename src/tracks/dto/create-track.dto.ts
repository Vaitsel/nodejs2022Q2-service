import { IsNotEmpty, IsNumber, IsString, IsUUID ,ValidateIf  } from 'class-validator';

export class CreateTrackDto {
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

  @IsNotEmpty()
  @IsNumber()
  duration: number;
}
