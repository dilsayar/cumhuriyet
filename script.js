const imageUpload = document.getElementById('imageUpload');
const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');

canvas.width = 900;
canvas.height = 900;

const frameImage = new Image();


const frameDropdown = document.getElementById('frame-dropdown');

function drawFrame() {
    ctx.drawImage(frameImage, 0, 0, 900, 900);
}

frameImage.onload = function() {
    drawFrame(); // Draw the frame once it's loaded
}
frameImage.src = '/images/t4.png';


frameDropdown.addEventListener('change', function() {
    const selectedTheme = frameDropdown.value;
    frameImage.src = `/images/${selectedTheme}.png`;

    frameImage.onload = function() {
        ctx.clearRect(0, 0, canvas.width, canvas.height); // Clear the canvas
        
        if (imageUpload.files[0]) {
            const reader = new FileReader();
            reader.onload = function(event) {
                const userImg = new Image();
                userImg.src = event.target.result;
                userImg.onload = function() {
                    drawUserImage(userImg);
                }
            }
            reader.readAsDataURL(imageUpload.files[0]);
        } else {
            drawFrame(); // Draw only the frame if no user image is uploaded
        }
    }
});

function drawCircularImage(img) {
    ctx.save();  // Save the current canvas state

    const size = Math.min(img.width, img.height);
    const xOffset = (img.width - size) / 2;
    const yOffset = (img.height - size) / 2;
    
    ctx.beginPath();
    ctx.arc(450, 450, 250, 0, Math.PI * 2, true);  
    ctx.closePath();
    ctx.clip();

    ctx.drawImage(img, xOffset, yOffset, size, size, 200, 200, 500, 500);

    ctx.restore();  // Restore the canvas state to what it was before clipping
}

imageUpload.addEventListener('change', function() {
    if (imageUpload.files[0]) {
        const reader = new FileReader();
        reader.onload = function(event) {
            const img = new Image();
            img.src = event.target.result;
            img.onload = function() {
                drawUserImage(img);
            }
        }
        reader.readAsDataURL(imageUpload.files[0]);
    }
});

function drawUserImage(img) {
    drawFrame();  // Draw the frame first
    drawCircularImage(img); // Then draw the user's image
}

document.getElementById('downloadBtn').addEventListener('click', function() {
    const link = document.createElement('a');
    link.download = 'turkiye_cumhuriyeti.png';
    link.href = canvas.toDataURL();
    link.click();
});
