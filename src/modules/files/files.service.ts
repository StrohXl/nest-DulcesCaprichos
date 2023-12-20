import { Injectable } from '@nestjs/common';
import firebaseConfig from '../../firebase.config.json';
import { Multer } from 'multer';
import * as admin from 'firebase-admin';

@Injectable()
export class FilesService {
  async uploadImage(file: Multer.File) {
    const serviceAccount = firebaseConfig as admin.ServiceAccount;
    const admi = admin.initializeApp({
      credential: admin.credential.cert(serviceAccount),
    });
    const bucket = admi.storage().bucket('nestxmdev.appspot.com');
    const timestamp = Date.now();
    const fileName = `images/image${timestamp}`;
    const fileUpload = bucket.file(fileName);
    await fileUpload.save(file.buffer, {
      metadata: {
        contentType: file.mimetype,
      },
    });

    const [url] = await fileUpload.getSignedUrl({
      version: 'v2',
      action: 'read',
      expires: Date.now() + 1000 * 5000 * 5000,
    });

    return url;
  }

  findAll() {
    return `This action returns all files`;
  }

  findOne(id: number) {
    return `This action returns a #${id} file`;
  }

  async update(image: Multer.File, imageUrl: string) {
    await this.remove(imageUrl);
    return await this.uploadImage(image);
  }

  async remove(imageUrl: string) {
    const serviceAccount = firebaseConfig as admin.ServiceAccount;
    const admi = admin.initializeApp({
      credential: admin.credential.cert(serviceAccount),
    });
    const bucket = admi.storage().bucket('nestxmdev.appspot.com');
    const fileName = imageUrl.split('/').pop().split('?')[0];
    const file = bucket.file('images/' + fileName);
    return await file.delete();
  }
}
