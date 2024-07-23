import {Controller, Get, Param, Post, Res, UploadedFile, UseInterceptors} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { extname } from 'path';
import {Response} from "express";

@Controller('upload')
export class UploadController {
    @Post()
    @UseInterceptors(FileInterceptor('image', {
        storage: diskStorage({
            destination: './uploads',
            filename: (req, file, callback) => {
                const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e9);
                const ext = extname(file.originalname);
                const filename = `${file.fieldname}-${uniqueSuffix}${ext}`;
                callback(null, filename);
            },
        }),
    }))
    uploadFile(@UploadedFile() file){
        return {
            url: `http://192.168.107.141:3000/api/${file.path}`
        }
    }

    @Get(':path')
    async getImage(
        @Param('path') path,
        @Res() res: Response
    ){
        res.sendFile(path, {root: 'uploads'});
    }
}
