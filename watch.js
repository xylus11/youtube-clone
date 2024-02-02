const search = window.location.search;
const params = new URLSearchParams(search);
const videoId = params.get('videoId');
const container = document.getElementById('video-container');


    container.innerHTML=`
    <iframe width="928" height="522" src="https://www.youtube.com/embed/${videoId}"  frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowfullscreen></iframe>`

