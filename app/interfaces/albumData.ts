export interface AlbumData {
    name: string,
    artist: string,
    ref: string,
    image: string,
    tracks: Track[],
    totalTracks: number,
    releaseDate: string,
    uri: string,
}

export interface Track {
    name: string,
    duration_ms: number,
}