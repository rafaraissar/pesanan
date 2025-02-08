"use client";

import { useEffect, useState } from "react";

export default function GalleryPage() {
    const [images, setImages] = useState([]);

    useEffect(() => {
        async function fetchImages() {
            try {
                const res = await fetch("/api/images");
                const data = await res.json();
                setImages(data);
            } catch (error) {
                console.error("Error fetching images:", error);
            }
        }
        fetchImages();
    }, []);

    return (
        <div>
            <h1>Gallery</h1>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: "10px" }}>
                {images.map((img) => (
                    <img key={img.public_id} src={img.secure_url} alt="Uploaded" width={200} />
                ))}
            </div>
        </div>
    );
}
