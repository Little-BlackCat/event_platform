import { Dispatch, SetStateAction, useCallback } from "react"
/**
 * - Dispatch: เป็นฟังก์ชันที่ใช้ในการส่งอัปเดต state ใน React หรือฟรีเมย์เวิร์กของ JavaScript.
 * - SetStateAction<File[]>: เป็นประเภทของ action ที่สามารถให้เป็นค่าได้ทั้งแบบฟังก์ชัน (กับ prevState) หรือค่า (ที่ไม่ได้มีอันดับที่มีประเภทของไฟล์) เพื่อให้ React หรือ state manager ทำการอัปเดต state.
 */

type FileUploaderProps = {
  imageUrl: string
  onFieldChange: (url: string) => void
  setFiles: Dispatch<SetStateAction<File[]>> // ตัวแปร setFiles เป็นฟังก์ชันที่ใช้ในการอัปเดต state ของไฟล์ (File[]) และระบุประเภทของ action ที่สามารถให้ในการอัปเดต state ได้.
}

// Note: `useUploadThing` is IMPORTED FROM YOUR CODEBASE using the `generateReactHelpers` function
import { useDropzone } from "@uploadthing/react/hooks";
import { generateClientDropzoneAccept } from "uploadthing/client";
import { convertFileToUrl } from "@/lib/utils"
import { Button } from "../ui/button"
 
export default function FileUploader({ imageUrl, onFieldChange, setFiles }: FileUploaderProps) {
  const onDrop = useCallback((acceptedFiles: File[]) => {
    setFiles(acceptedFiles);
    onFieldChange(convertFileToUrl(acceptedFiles[0]))
  }, []);
 
  const { getRootProps, getInputProps } = useDropzone({
    onDrop,
    accept: 'image/*' ? generateClientDropzoneAccept(['image/*']) : undefined,
  });
 
  return (
    <div 
      {...getRootProps()}
      className="flex-center bg-dark-3 flex h-72 cursor-pointer flex-col overflow-hidden rounded-xl bg-grey-50"
    >
      <input {...getInputProps()} className="cursor-pointer" />
      {imageUrl ? (
        <div className="flex h-full w-full flex-1 justify-center ">
          <img
            src={imageUrl}
            alt="image"
            width={250}
            height={250}
            className="w-full object-cover object-center"
          />
        </div>
      ) : (
        <div className="flex-center flex-col py-5 text-grey-500">
          <img src="/assets/icons/upload.svg" width={77} height={77} alt="file upload" />
          <h3 className="my-2">Drag photo here</h3>
          <p className="p-medium-12 mb-4">SVG, PNG, JPG</p>
          <Button type="button" className="rounded-full">
            Select from computer
          </Button>
        </div>
      )}
    </div>
  );
}
