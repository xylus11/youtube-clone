API_KEY="AIzaSyC7NYT5KwJ6jIiYF4lx3xPN6CcNPHd_bWA"
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
  
       
    
    
      <div class='video-title'>
      ${video.snippet.title}
      </div>
      <div class="channel-name">
      ${video.snippet.channelTitle}
      
    
     
      </div>
      <div>
      </a>
      
      </div> `;

    loadChannelInfo(video.snippet.channelId);
        
    })
}


getVideo('1000rr')

 async function getVideo(searchKey)
{ 
    const response = await fetch(`${BASE_URL}/search?key=${API_KEY}&q=${searchKey}&type=video&maxResults=20&part=snippet`)
    const data = await response.json();
        console.log(data.items);
      
        
        dispVideos(data.items);
        if (data.items.length > 0) {
            const channelId = data.items[0].snippet.channelId;
            loadChannelInfo(channelId);
        }
    }


    async function loadChannelInfo(channelId) {
        try {
            const response = await fetch(`${BASE_URL}/channels?key=${API_KEY}&part=snippet&id=${channelId}`);
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            const data = await response.json();
            if (data.items) {
                displayChannelPic(data.items[0]);
               
            }
        } catch (error) {
            console.error('Error fetching channel info: ', error);
        }
    }

    function displayChannelPic(channelData) {
        const channelInfoSection = document.getElementById('divide');
        channelInfoSection.innerHTML = `
         
             <img src="${channelData.snippet.thumbnails.default.url}" alt="${channelData.snippet.title}">


          
        `;
        
    }


// //////////////////////////////////////////////////////////////////////

