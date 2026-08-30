import { ParseFilePipeBuilder, HttpStatus } from '@nestjs/common';

export const createImageValidation = ({ required = true }: { required?: boolean }) =>
  new ParseFilePipeBuilder()
    .addFileTypeValidator({
      fileType: /(jpeg|png|webp|gif)/,
    })
    .addMaxSizeValidator({
      maxSize: 5 * 1024 * 1024,
    })
    .build({
      errorHttpStatusCode: HttpStatus.UNPROCESSABLE_ENTITY,
      fileIsRequired: required,
    });
