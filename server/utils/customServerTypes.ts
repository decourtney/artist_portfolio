import { ReadStream } from "fs";

export interface UploadFile {
  fieldName: string;
  filename: string;
  mimetype: string;
  encoding: string;
  createReadStream: () => ReadStream;
}
