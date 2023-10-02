import { DeleteObjectCommand, GetObjectCommand, PutObjectCommand, S3 } from "@aws-sdk/client-s3";
import { Buffer } from "buffer";

const s3Client = new S3({
  endpoint: process.env.REACT_APP_ORIGIN_ENDPOINT,
  forcePathStyle: false,
  region: "us-east-1",
  credentials: {
    accessKeyId: process.env.REACT_APP_BUCKET_KEY || "",
    secretAccessKey: process.env.REACT_APP_BUCKET_SECRET || "", // THIS DOES NOT STAY HERE!!! USE ENV
  },
});

// binary type def for imageFile
type ImageFile = Buffer;

export const uploadObject = async (imageFile: ImageFile, fileName:string) => {
  console.log(imageFile, fileName )
  const params = {
    Bucket: "chumbucket",
    Key: `artist_portfolio/${fileName}`,
    Body: imageFile,
    ACL: "public-read",
    Metadata: {
      "x-amz-meta-my-key": "your-value",
    },
  };

  try {
    const data = await s3Client.send(new PutObjectCommand(params));
    console.log(
      "Successfully uploaded object: " + params.Bucket + "/" + params.Key
    );
    return data;
  } catch (err) {
    console.log("Error", err);
  }
};

export const deleteObject = async (fileName: string) => {
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