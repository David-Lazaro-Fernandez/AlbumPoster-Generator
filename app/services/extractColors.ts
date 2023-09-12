export function getBottomCenterPixelColor(imgSrc:string ): Promise<number[]> {

    console.log(imgSrc)
    return new Promise((resolve, reject) => {
        const imageElem = new window.Image()
        imageElem.src = imgSrc;
        imageElem.crossOrigin = "Anonymous";

        imageElem.onload = () => {
            const canvas = document.createElement('canvas');
            const ctx = canvas.getContext('2d');

            canvas.width = imageElem.width;
            canvas.height = imageElem.height;
            
            ctx.drawImage(imageElem, 0, 0, imageElem.width, imageElem.height);

            const x = Math.floor(imageElem.width / 2);
            const y = imageElem.height - 1;
            const pixel = ctx.getImageData(x, y, 1, 1).data;
            const rgba = [pixel[0], pixel[1], pixel[2], pixel[3] / 255]

            resolve(rgba);
        };

        imageElem.onerror = () => {
            reject(new Error('Failed to load the image.'));
        };
    });
}