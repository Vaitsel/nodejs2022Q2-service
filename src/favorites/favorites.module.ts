import { Module, forwardRef } from '@nestjs/common';
import { FavoritesController } from './favorites.controller';
import { FavoritesService } from './favorites.service';
import { TracksModule } from 'src/tracks/tracks.module';
import { AlbumsModule } from 'src/albums/albums.module';
import { ArtistsModule } from 'src/artists/artists.module';
@Module({
  providers: [FavoritesService],
  controllers: [FavoritesController],
  imports: [
    forwardRef(() => TracksModule),
    forwardRef(() => AlbumsModule),
    forwardRef(() => ArtistsModule),
  ],
  exports: [FavoritesService],
})
export class FavoritesModule {}
