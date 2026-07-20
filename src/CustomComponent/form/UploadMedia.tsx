import { Image, Video } from "lucide-react";
import "./styles.css";
import { useState, useRef, DragEvent, ChangeEvent } from "react";

type Props = {
    isVideo? : boolean;
    value?: string;
    onChange?: (value: string) => void;
    onUpload?: (file: File) => void;
}

export const UploadMedia = ({ isVideo = false, value, onChange, onUpload }: Props) => {
    const [fileName, setFileName] = useState<string | null>(null);
    const [dragging, setDragging] = useState(false);
    const inputRef = useRef<HTMLInputElement>(null);

    const handleFile = (file: File | null) => {
        if (!file) return;
        setFileName(file.name);
        onUpload?.(file);

        // Convert file to a string URL so it can be saved in your Zustand store
        const reader = new FileReader();
        reader.onload = () => {
            if (typeof reader.result === "string") {
                onChange?.(reader.result); // This updates your Zustand store!
            }
        };
        reader.readAsDataURL(file);
    };

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
 
    const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
        handleFile(e.target.files?.[0] ?? null);
    };
 
    return (
        <label className={`upload-container ${dragging ? "upload-dragging" : ""} ${fileName || value ? "upload-success" : ""}`}
         htmlFor={isVideo ? "video-input" : "media-input"}
         onDragOver={onDragOver}
         onDragLeave={onDragLeave}
         onDrop={onDrop}
         >
            {/* FIXED: Removed double icon nesting block */}
            <div className="icon" style={{ color: "palevioletred", display: "flex", justifyContent: "center" }}>
                {value && !isVideo ? (
                    <img src={value} alt="Preview" style={{ width: "40px", height: "40px", objectFit: "cover", borderRadius: "4px" }} />
                ) : (
                    isVideo ? <Video /> : <Image />
                )}
            </div>

            <div className="text-area text-center">
                <p style={{ margin: 0, padding : 0, fontSize: "14px", fontWeight: 500 }}>
                    {isVideo ? "Tutorial Video" : "Cover Image"}
                </p>

                {fileName || value ? (
                    <span style={{ fontSize: "12px", color: "gray" }}>
                        Upload Successful! <br/>{fileName || "File loaded"}
                    </span> 
                ) : (
                    <span style={{ fontSize: "12px", color: "gray" }}>
                        {isVideo ? "Upload a video tutorial for your pattern" : "Upload a cover image for your pattern"}
                    </span>
                )}
            </div>
            
            <input 
                ref={inputRef} 
                type="file" 
                accept={isVideo ? "video/*" : "image/*"} 
                style={{ display: "none" }} 
                id={isVideo ? "video-input" : "media-input"} 
                onChange={onChangeHandler} 
            />
        </label>
    );
};  