const imageUpload = document.getElementById('imageUpload');
const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');

canvas.width = 900;
canvas.height = 900;

const frameImage = new Image();
frameImage.src = '/images/square.png'; 



frameImage.onload = function() {
    ctx.drawImage(frameImage, 0, 0, 900, 900); // Draw the frame with 900x900 dimensions
}

function drawCircularImage(img) {
    const size = Math.min(img.width, img.height);
    const xOffset = (img.width - size) / 2;
    const yOffset = (img.height - size) / 2;
    
    ctx.beginPath();
    ctx.arc(450, 450, 250, 0, Math.PI * 2, true);  // Adjust the radius to 250
    ctx.closePath();
    ctx.clip();

    ctx.drawImage(img, xOffset, yOffset, size, size, 200, 200, 500, 500); // Adjust to draw the image as 500x500
}

imageUpload.addEventListener('change', function() {
    const reader = new FileReader();
    reader.onload = function(event) {
        const img = new Image();
        img.onload = function() {
            ctx.clearRect(0, 0, canvas.width, canvas.height);  // Clear the canvas
            ctx.drawImage(frameImage, 0, 0, 900, 900);        // Redraw the frame
            drawCircularImage(img);                            // Crop and draw the user's image in circular form
        }
        img.src = event.target.result;
    }
    reader.readAsDataURL(imageUpload.files[0]);
});

document.getElementById('downloadBtn').addEventListener('click', function() {
    const link = document.createElement('a');
    link.download = 'framed_image.png';
    link.href = canvas.toDataURL();
    link.click();
});
