import React, { useState, useRef } from 'react';

function ColorPicker() {
    const [color, setColor] = useState('#FFFFFF');
    const canvasRef = useRef(null);
    const imageRef = useRef(null);

    const handleImageChange = (e) => {
        const file = e.target.files[0];
        const reader = new FileReader();
        reader.onload = (event) => {
            const img = new Image();
            img.onload = () => {
                const canvas = canvasRef.current;
                canvas.width = img.width;
                canvas.height = img.height;
                const ctx = canvas.getContext('2d');
                ctx.drawImage(img, 0, 0, img.width, img.height);
            };
            img.src = event.target.result;
            imageRef.current = img;
        };
        reader.readAsDataURL(file);
    };

    const pickColor = (e) => {
        const canvas = canvasRef.current;
        const ctx = canvas.getContext('2d');
        const rect = canvas.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        const { data } = ctx.getImageData(x, y, 1, 1);
        const rgba = `rgba(${data[0]}, ${data[1]}, ${data[2]}, ${data[3] / 255})`;
        setColor(rgba);
    };

    return (
        <div>
            <input type="file" onChange={handleImageChange} accept="image/*" />
            <canvas ref={canvasRef} onClick={pickColor} style={{ cursor: 'crosshair' }} />
            <div style={{ marginTop: '10px', fontSize: '16px' }}>Selected Color: <span style={{ fontWeight: 'bold', color }}>{color}</span></div>
        </div>
    );
}

export default ColorPicker;
