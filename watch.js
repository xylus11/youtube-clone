const search = window.location.search;
const params = new URLSearchParams(search);
const videoId = params.get('videoId');
const container = document.getElementById('video-container');


    container.innerHTML=`
    <iframe id='frame' width="920" height="460" src="https://www.youtube.com/embed/${videoId}"  frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowfullscreen></iframe>`

const profile =document.getElementById('recom-watch');
profile.innerHTML=`<p>








fsd
fs
df

fs
f

f
sd
fd
fd
d
f
df
adadaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa
</p>`