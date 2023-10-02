import {
  DeleteObjectCommand,
  GetObjectCommand,
  PutObjectCommand,
  S3,
} from "@aws-sdk/client-s3";
import { Buffer } from "buffer";

const s3Client = new S3({
  endpoint: "https://nyc3.digitaloceanspaces.com",
  forcePathStyle: false,
  region: "us-east-1",
  credentials: {
    accessKeyId: "DO003J77NP2J6V9TFM2H",
    secretAccessKey: "IP/VZfidNhscpJJ7i8HozvxhfsyIJ5h5gn+7xbTit38", // THIS DOES NOT STAY HERE!!! USE ENV
  },
});

export const uploadObject = async (imageFiles: File[]) => {
  try {
    const uploadPromises = imageFiles.map(async (file) => {
      const params = {
        Bucket: "chumbucket",
        Key: `artist_portfolio/tempuser/${file.name}`,
        Body: file,
        ACL: "public-read",
        Metadata: {
          "x-amz-meta-my-key": "your-value",
        },
      };

      const response = await s3Client.send(new PutObjectCommand(params));
      console.log(response);
    });

    await Promise.all(uploadPromises);
    console.log("bulk upload complete");
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

// Downloading isn't necessary - this is just in case
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
