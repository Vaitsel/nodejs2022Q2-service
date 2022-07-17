import { Module, forwardRef } from '@nestjs/common';
import { ArtistsController } from './artists.controller';
import { ArtistsService } from './artists.service';
import { AlbumsModule } from './../albums/albums.module';
import { TracksModule } from 'src/tracks/tracks.module';
@Module({
  providers: [ArtistsService],
  controllers: [ArtistsController],
  imports: [
    forwardRef(() => AlbumsModule),
    forwardRef(() => TracksModule),
  ],
  exports: [ArtistsService],
})
export class ArtistsModule {}
