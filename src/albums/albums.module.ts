import { Module,forwardRef } from '@nestjs/common';
import { AlbumsController } from './albums.controller';
import { AlbumsService } from './albums.service';
import { TracksModule } from 'src/tracks/tracks.module';
@Module({
  providers: [AlbumsService],
  controllers: [AlbumsController],
  imports: [
    forwardRef(() => TracksModule),
  ],
  exports: [AlbumsService],
})
export class AlbumsModule {}
