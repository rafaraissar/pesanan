"use client";

import { useState } from "react";

export default function UploadPage() {
    const [file, setFile] = useState(null);
    const [preview, setPreview] = useState("");
    const [uploadedUrl, setUploadedUrl] = useState("");

    const handleFileChange = (e) => {
        const selectedFile = e.target.files[0];
        setFile(selectedFile);
        setPreview(URL.createObjectURL(selectedFile));
    };

    const handleUpload = async () => {
        if (!file) return alert("Pilih file dulu!");

        const formData = new FormData();
        formData.append("file", file);

        const res = await fetch("/api/upload", {
            method: "POST",
            body: formData,
        });

        const data = await res.json();
        if (res.ok) setUploadedUrl(data.url);
    };

    return (
        <div>
            <h1>Upload Gambar</h1>
            <input type="file" onChange={handleFileChange} />
            {preview && <img src={preview} alt="Preview" width={200} />}
            <button onClick={handleUpload}>Upload</button>
            {uploadedUrl && (
                <div>
                    <p>Gambar berhasil diupload:</p>
                    <img src={uploadedUrl} alt="Uploaded" width={200} />
                    <p>URL: <a href={uploadedUrl} target="_blank">{uploadedUrl}</a></p>
                </div>
            )}
        </div>
    );
}
