import { useCallback } from "react";
import { useDropzone } from "react-dropzone";
import { UPLOAD_FILES } from "../../utils/mutations";
import { useMutation } from "@apollo/client";

const DragnDrop = () => {
  const [upload] = useMutation(UPLOAD_FILES);

  const onDrop = useCallback(async (acceptedFiles: File[]) => {
    // console.log(acceptedFiles);
    try {
      const response = await upload({ variables: { files: acceptedFiles } });
      // console.log(response);
    } catch (err) {
      console.log(err);
    }
  }, []);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      "image/*": [".jpeg", ".png"],
    },
    maxFiles: 300,
  });

  return (
    <div className="flex flex-grow w-full rounded-2xl font-medium text-pdark bg-plight">
      <div {...getRootProps()} className="flex justify-center items-center w-full">
        <input {...getInputProps()} />
          {isDragActive ? (
            <p>Drop the files here ...</p>
          ) : (
            <p className="">Drag 'n' drop files here, or click to select files</p>
          )}
      </div>
    </div>
  );
};

export default DragnDrop;
