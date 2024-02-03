API_KEY="AIzaSyBqEL3dL2nstFjPKh-jI7uwdOjCxkoszKo"
BASE_URL="https://www.googleapis.com/youtube/v3"

const btn = document.getElementById('button');

btn.addEventListener('click',()=>{
    const searchValue= document.getElementById('search').value;
    getVideo(searchValue);
    
});



function dispVideos(videos)
{

    const videoDiv = document.getElementById('video-section');
    videoDiv.innerHTML="";
    videos.map((video,i)=>{
        videoDiv.innerHTML+=`
      <div class="video_disp">

       <a class='anc' href="watch.html?videoId=${video.id.videoId}" >
     <img src=" ${video.snippet.thumbnails.medium.url} " width:"20px"/>
  
       <div class='divide'>
       
      <div class='video-title'>
      ${video.snippet.title}
      </div>
      <div class="channel-name">
      ${video.snippet.channelTitle}
      
    
      </div>
       <div>
      </a>
      
      </div> `
        
    })
}


getVideo('krsna - nocap')

 async function getVideo(searchKey)
{ 
    const response = await fetch(`${BASE_URL}/search?key=${API_KEY}&q=${searchKey}&type=video&maxResults=20&part=snippet`)
    const data = await response.json();
        console.log(data.items);
        dispVideos(data.items)
    }






// //////////////////////////////////////////////////////////////////////

