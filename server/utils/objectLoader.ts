import {
  DeleteObjectCommand,
  GetObjectCommand,
  PutObjectCommand,
  S3,
  ObjectCannedACL,
} from "@aws-sdk/client-s3";
import { Upload } from "@aws-sdk/lib-storage";
import { UploadFile } from "./customServerTypes";
import { ReadStream } from "fs";

const createS3Client = () => {
  const s3 = new S3({
    endpoint: process.env.ORIGIN_ENDPOINT || "",
    forcePathStyle: false,
    region: "us-east-1",
    credentials: {
      accessKeyId: process.env.BUCKET_KEY || "",
      secretAccessKey: process.env.BUCKET_SECRET || "",
    },
  });

  return s3;
};

export const uploadObject = async (
  stream: ReadStream,
  filename: string,
  mimetype: string,
  encoding: string,
  username: string
) => {
  const s3Client = createS3Client();

  try {
    const bucketParams = {
      ACL: "public-read" as ObjectCannedACL,
      Bucket: "chumbucket",
      Key: `artist_portfolio/${username}/${filename}`,
      Body: stream,
      ContentType: mimetype,
      // Metadata: {
      //   "x-amz-meta-my-key": "your-value",
      // },
    };

    const parallelUpload = new Upload({
      client: s3Client,
      params: bucketParams,
      // optional
      tags: [],
      queueSize: 4,
      partSize: 1024 * 1024 * 5,
      leavePartsOnError: false,
    });

    await parallelUpload.done();
    return true;
  } catch (err) {
    console.log("Error", err);
  }
};

export const deleteObject = async (fileName: string) => {
  const s3Client = createS3Client();

  const bucketParams = {
    Bucket: "chumbucket",
    Key: `artist_portfolio/${fileName}`,
  };
  try {
    const data = await s3Client.send(new DeleteObjectCommand(bucketParams));
    console.log(
      "Successfully deleted object: " +
        bucketParams.Bucket +
        "/" +
        bucketParams.Key
    );
    return data;
  } catch (err) {
    console.log("Error", err);
  }
};

// Downloading isn't necessary but just in case
export const downloadObject = async (fileName: string) => {
  const s3Client = createS3Client();

  const bucketParams = {
    Bucket: "chumbucket",
    Key: `artist_portfolio/${fileName}`,
  };
  try {
    const response = await s3Client.send(new GetObjectCommand(bucketParams));
    const imageFile = response.Body;
    console.log("Success");
    return imageFile;
  } catch (err) {
    console.log(err);
  }
};
