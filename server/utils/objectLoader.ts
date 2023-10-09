import {
  DeleteObjectCommand,
  GetObjectCommand,
  PutObjectCommand,
  S3,
} from "@aws-sdk/client-s3";
import { Upload } from "@aws-sdk/lib-storage";
import { Buffer } from "buffer";
import fs from "fs";
import { Readable } from "stream";
import { Stream } from "stream";

const createS3Client = () => {
  const s3 = new S3({
    endpoint:
      process.env.ORIGIN_ENDPOINT || "",
    forcePathStyle: false,
    region: "us-east-1",
    credentials: {
      accessKeyId: process.env.BUCKET_KEY || "",
      secretAccessKey: process.env.BUCKET_SECRET || "",
    },
  });

  return s3;
};

export const uploadObject = async (objs: any) => {
  const s3Client = createS3Client();
  const resolvedObjects = await Promise.all(objs);

  const promises = resolvedObjects.map(async (obj) => {
    try {
      console.log(obj);
      const { createReadStream, filename, mimetype } = obj;
      const stream = createReadStream();

      const params = {
        Bucket: "chumbucket",
        Key: `artist_portfolio/${filename}`,
        Body: stream,
        ContentType: mimetype,
        ACL: "public-read",
        Metadata: {
          "x-amz-meta-my-key": "your-value",
        },
      };

      const parallelUpload = new Upload({
        client: s3Client,
        params: params,
        tags: [],
        queueSize: 4,
        partSize: 1024 * 1024 * 5,
        leavePartsOnError: false,
      });

      parallelUpload.on("httpUploadProgress", (progress) => {
        console.log("progress: ", progress);
      });

      const data = await parallelUpload.done();

      return true;
    } catch (err) {
      console.log("Error", err);
    }
  });
};

export const deleteObject = async (fileName: string) => {
  const s3Client = createS3Client();

  const params = {
    Bucket: "chumbucket",
    Key: `artist_portfolio/${fileName}`,
  };
  try {
    const data = await s3Client.send(new DeleteObjectCommand(params));
    console.log(
      "Successfully deleted object: " + params.Bucket + "/" + params.Key
    );
    return data;
  } catch (err) {
    console.log("Error", err);
  }
};

// Downloading isn't necessary but just in case
export const downloadObject = async (fileName: string) => {
  const s3Client = createS3Client();

  const params = {
    Bucket: "chumbucket",
    Key: `artist_portfolio/${fileName}`,
  };
  try {
    const response = await s3Client.send(new GetObjectCommand(params));
    const imageFile = response.Body;
    console.log("Success");
    return imageFile;
  } catch (err) {
    console.log(err);
  }
};
