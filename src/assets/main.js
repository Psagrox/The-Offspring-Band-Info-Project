const contentVideos = null || document.getElementById("content_videos");
const contentAlbums = null || document.getElementById("content_albums");


const urlYoutube = 'https://youtube-v31.p.rapidapi.com/search?channelId=UCP3EX5VKeaG4Oa2qTKPuEFA&part=snippet%2Cid&order=date&maxResults=8';
const urlSpotify = 'https://spotify23.p.rapidapi.com/artist_albums/?id=5LfGQac0EIXyAN8aUwmNAQ';

const optionsYoutube = {
	method: 'GET',
	headers: {
		'X-RapidAPI-Key': '9dbcc0870amsh393bb195ebc30b3p1e6dfajsncf1f1953e403',
		'X-RapidAPI-Host': 'youtube-v31.p.rapidapi.com'
	}
};

const optionsSpotify = {
	method: 'GET',
	headers: {
		'X-RapidAPI-Key': '9dbcc0870amsh393bb195ebc30b3p1e6dfajsncf1f1953e403',
		'X-RapidAPI-Host': 'spotify23.p.rapidapi.com'
	}
};


async function fetchData(urlAPI, options){
    const response = await fetch(urlAPI, options);
	const data = await response.json();
    return data;
}

async function getVideos() {
    try {
        const videos = await fetchData(urlYoutube, optionsYoutube);
        let view = `${videos.items
            .map(
            (video) => `
            <div class="group relative mb-6">
                <div
                    class="w-full bg-gray-200 aspect-w-1 aspect-h-1 rounded-md overflow-hidden group-hover:opacity-75 lg:aspect-none">
                    <img src="${video.snippet.thumbnails.high.url || 'placeholder.jpg'}" alt="${video.snippet.description}" class="w-full  h-auto">
                </div>
            <div class="mt-4 flex justify-between">
                <a href="https://youtube.com/watch?v=${video.id.videoId}" target="_blank">
                    <h3 class="text-sm text-gray-700">
                        <span aria-hidden="true" class="absolute inset-0"></span>
                        ${video.snippet.title}
                    </h3>
                </a>
            </div>
        </div>`,
            )
        .slice(0, 9)
        .join("")}`;
        contentVideos.innerHTML = view;
    }
    catch (error) {
        console.log(error);
}
}

async function getAlbums() {
    try {
    const albums = await fetchData(urlSpotify, optionsSpotify);
    let view = `${albums.data.artist.discography.albums.items
        .map(
        (album) => `
        <div class="bg-gray-300 rounded-lg p-4">
        <a href="${album.releases.items[0].sharingInfo.shareUrl}" target="_blank">
            <img class="w-full mb-4 rounded-lg" src="${album.releases.items[0].coverArt.sources[0].url}"
                alt="Portada ${album.releases.items[0].name}">
            <div class="text-center">
                <h3 class="text-2xl font-bold text-gray-800 mb-2">${album.releases.items[0].name}</h3>
                <p class="text-base font-medium">
                    Año: ${album.releases.items[0].date.year} <br>
                    Canciones: ${album.releases.items[0].tracks.totalCount}
                </p>
            </div>
        </a>
        </div>
        `,
        )
        .slice(0)
        .join("")}`;
    contentAlbums.innerHTML = view;
    } catch (error) {
    console.log(error);
    }
}


( async() => {
    getVideos();
    getAlbums();
}) ();
