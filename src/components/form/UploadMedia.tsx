import { Image, Video } from "lucide-react";
import "./styles.css";
import { useState, useRef, DragEvent, ChangeEvent } from "react";

type Props = {
    isVideo? : boolean;
    onUpload?: (file: File) => void;
}

export const UploadMedia = ({isVideo = false, onUpload}: Props) => {

    const [fileName, setFileName] = useState<string | null>(null);
    const [dragging, setDragging] = useState(false);

    const inputRef = useRef<HTMLInputElement>(null);

    const handleFile = (file: File | null) => {
        if(!file) return;
        setFileName(file.name);
        onUpload?.(file);
    }
  const onDragOver = (e: DragEvent<HTMLLabelElement>) => {
        e.preventDefault();
        setDragging(true);
    };

    const onDragLeave = (e: DragEvent<HTMLLabelElement>) => {
        e.preventDefault();
        setDragging(false);
    };
 
    const onDrop = (e: DragEvent<HTMLLabelElement>) => {
        e.preventDefault();
        setDragging(false);
        handleFile(e.dataTransfer.files[0] ?? null);
    };
 
    const onChange = (e: ChangeEvent<HTMLInputElement>) => {
        handleFile(e.target.files?.[0] ?? null);
    };
 

    return (
        <label className={`upload-container ${dragging ? "upload-dragging" : ""} ${fileName ? "upload-success" : ""}`}
         htmlFor={isVideo ? "video-input" : "media-input"}
         onDragOver={onDragOver}
         onDragLeave={onDragLeave}
         onDrop={onDrop}
         >
            <div className="icon" style={{ color: "palevioletred" }}>
                {isVideo ? <Video /> : <Image />}
            </div>
            <div className="text-area">
                <p style={{ margin: 0, padding : 0, fontSize: "14px", fontWeight: 500 }}>
                    {isVideo ? "Tutorial Video" : "Cover Image"}
                </p>

                {fileName ? (
                <span style={{ fontSize: "12px", color: "gray" }}>Upload Successful! <br/>{fileName}</span> 
                 ) : (
                <span style={{ fontSize: "12px", color: "gray" }}>
                    {isVideo ? "Upload a video tutorial for your pattern" : "Upload a cover image for your pattern"}
                </span>) }

            </div>
            <input ref={inputRef} type="file" accept={isVideo ? "video/*" : "image/*"} style={{ display: "none" }} id={isVideo ? "video-input" : "media-input"} onChange={onChange} />

        </label>
    )
}