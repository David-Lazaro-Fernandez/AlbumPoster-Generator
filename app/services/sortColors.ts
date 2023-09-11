function hexToRgb(hex:string) {
    let bigint = parseInt(hex.substring(1), 16);
    let r = (bigint >> 16) & 255;
    let g = (bigint >> 8) & 255;
    let b = bigint & 255;

    return [r, g, b];
}

function calculateLuminosity(rgb:number[]) {
    const [r, g, b] = rgb;
    return 0.299 * r + 0.587 * g + 0.114 * b;
}

export function sortHexColors(colors:string[] | undefined) {
    if (!colors) return 'no colors'

    return colors.sort((a, b) => {
        const luminosityA = calculateLuminosity(hexToRgb(a));
        const luminosityB = calculateLuminosity(hexToRgb(b));
        return luminosityA - luminosityB;
    });
}
