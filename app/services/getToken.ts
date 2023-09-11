require('dotenv').config({ path: __dirname + '/../../.env' })

export async function getToken(): Promise<string | undefined> {
    try {
        const clientID = process.env.CLIENTID;
        const clientSecret = process.env.CLIENTSECRET;

        if (!clientID || !clientSecret) {
            throw new Error("CLIENTID or CLIENTSECRET not found in environment variables.");
        }

        const response = await fetch("https://accounts.spotify.com/api/token", {
            body: `grant_type=client_credentials&client_id=${clientID}&client_secret=${clientSecret}`,
            headers: {
                "Content-Type": "application/x-www-form-urlencoded"
            },
            method: "POST"
        })
        const data = await response.json();
        return data.access_token
    } catch (error) {
        console.error(error);
    }
    
}