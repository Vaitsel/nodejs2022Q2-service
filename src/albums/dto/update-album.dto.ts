import { IsNotEmpty, IsNumber, IsString, ValidateIf, IsUUID } from 'class-validator';
export class UpdateAlbumDto {
  @IsNotEmpty()
  @IsString()
  name: string;

  @IsNotEmpty()
  @IsNumber()
  year: number;

  @ValidateIf((object, value) => value !== null)
  @IsUUID('4')
  @IsNotEmpty()
  @IsString()
  artistId: string | null;
}
