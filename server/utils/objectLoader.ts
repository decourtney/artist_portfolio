import { DeleteObjectCommand, GetObjectCommand, PutObjectCommand, S3 } from "@aws-sdk/client-s3";
import { Buffer } from "buffer";

const s3Client = new S3({
  endpoint: "https://nyc3.digitaloceanspaces.com",
  forcePathStyle: false,
  region: "us-east-1",
  credentials: {
    accessKeyId: "DO0024Z6NH4J2FZLABF3",
    secretAccessKey: "BKOAbQuNWTGc+km1gWcRGoBX9eYL94WTym9fgU0O93s", // THIS DOES NOT STAY HERE!!! USE ENV
  },
});

// binary type def for imageFile
type ImageFile = Buffer;

export const uploadImage = async (imageFile: ImageFile, fileName:string) => {
  const params = {
    Bucket: "chum.bucket", 
    Key: `artist_portfolio/${fileName}`, 
    Body: imageFile, 
    ACL: "private", 
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

export const downloadImage = async (fileName: string) => {
  const params = {
    Bucket: "chum.bucket",
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

export const deleteImage = async (fileName: string) => {
  const params = {
    Bucket: "chum.bucket",
    Key: `artist_portfolio/${fileName}`,
  };

  try {
    const data = await s3Client.send(new DeleteObjectCommand(params));
    console.log(
      "Successfully deleted image: " + params.Bucket + "/" + params.Key
    );
    return data;
  } catch (err) {
    console.log("Error", err);
  }
};
