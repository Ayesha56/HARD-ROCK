const SearchSong = async() => {
    const songName = document.getElementById('InputValue').value;
    const url = `https://api.lyrics.ovh/suggest/${songName}`;
    try {
        const res = await fetch(url);
        const data = await res.json();
        DisplaySong(data.data);
    } catch (error) {
        displayError('Sorry  fail to load song ,please try again letter!!!!');
    }


}
const DisplaySong = songs => {
        const songDivList = document.getElementById('songContainer');
        songDivList.innerHTML = " "; //for empty
        songs.forEach(songnames => {
            const songDiv = document.createElement('div');

            songDiv.innerHTML = `
        <div class="single-result row align-items-center my-3 p-3">
        <div class="col-md-9">
            <h3 class="lyrics-name">${songnames.title}</h3>
            <p class="author lead">Album by <span>${songnames.artist.name}</span></p>
            <audio controls>
                <source src="${songnames.preview}" type="audio/ogg">
            </audio>
        </div>
        <div class="col-md-3 text-md-right text-center">
            <button onclick ="getLyrics('${songnames.artist.name}','${songnames.title}')" class="btn btn-success">Get Lyrics</button>
        </div>`
            songDivList.appendChild(songDiv);
        });
    }
    //fetch
const getLyrics = (artist, title) => {
        const url = `https://api.lyrics.ovh/v1/${artist}/${title}`;
        fetch(url)
            .then(res => res.json())
            .then(data => DisplayLyrics(data.lyrics))
            .catch(error => displayError('please try again latter'))

    }
    // const getLyrics = async(artist, title) => {
    //         const url = `https://api.lyrics.ovh/v1/${artist}/${title}`
    //         const res = await fetch(url);
    //         const data = await res.json();
    //         DisplayLyrics(data.lyrics);

//     }

const DisplayLyrics = Lyrics => {
    const songLyricsDiv = document.getElementById('songlyric');
    songLyricsDiv.innerText = Lyrics;
}
const displayError = errorLyrics => {
    const displayErr = document.getElementById('errorMessage');
    displayErr.innerText = errorLyrics;

}