import { Module } from '@nestjs/common';
import { UtilService } from './util.service';
import { UtilController } from './util.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Util } from './entities/util.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Util])],
  controllers: [UtilController],
  providers: [UtilService],
  exports: [UtilService],
})
export class UtilModule {}
