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
    <div className="flex flex-grow justify-center items-center p-12 rounded-2xl font-medium text-center text-pdark bg-plight z-10">
      <div {...getRootProps()}>
        <input {...getInputProps()} />
        {isDragActive ? (
          <p>Drop the files here ...</p>
        ) : (
          <p>Drag 'n' drop files here, or click to select files</p>
        )}
      </div>
    </div>
  );
};

export default DragnDrop;
