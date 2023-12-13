import { useCallback, Dispatch, SetStateAction } from "react";
import { useDropzone } from "react-dropzone";
import { UPLOAD_FILES } from "../../utils/mutations";
import { useMutation } from "@apollo/client";

interface DragnProp {
  isDisplayWindow: Dispatch<SetStateAction<boolean>>;
}

const DragnDrop = ({ isDisplayWindow }: DragnProp) => {
  const [upload] = useMutation(UPLOAD_FILES);

  const onDrop = useCallback(async (acceptedFiles: File[]) => {
    for (const file of acceptedFiles) {
      try {
        const response = await upload({ variables: { file: file } });
        console.log(response);
        isDisplayWindow(false);
      } catch (err) {
        console.error(`Error during file upload for ${file.name}:`, err);
      }
    }
  }, []);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      "image/*": [".jpg", ".png"],
    },
    maxFiles: 300,
  });

  return (
    <div className="flex flex-grow w-full rounded-2xl font-medium text-pdark bg-slate-50">
      <div
        {...getRootProps()}
        className="flex justify-center items-center w-full"
      >
        <input {...getInputProps()} />
        <div className="pointer-events-none">
          {isDragActive ? (
            <p>Drop the files here ...</p>
          ) : (
            <p className="">
              Drag 'n' drop files here, or click to select files
            </p>
          )}
        </div>
      </div>
    </div>
  );
};

export default DragnDrop;
