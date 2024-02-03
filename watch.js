API_KEY="AIzaSyCUalwOh0nudmojQ_k7MhXQWGNPtqIwHmo"
BASE_URL="https://www.googleapis.com/youtube/v3"


const search = window.location.search;
const params = new URLSearchParams(search);
const videoId = params.get('videoId');
const container = document.getElementById('video-container');
const title = document.getElementById('title');
const desc = document.getElementById('desc');


    container.innerHTML=`
    <iframe id='frame' width="920" height="480" src="https://www.youtube.com/embed/${videoId}" 
     frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope;
      picture-in-picture; web-share" allowfullscreen></iframe>
      `
    function videoTitle(titleName,description)
    {
          title.innerHTML=`<h3>${titleName}</h3>`
          desc.innerHTML=`<p>${description}</p>`

    }
   



    const profile =document.getElementById('recom-watch');
    loadVideoDetails(videoId); 
  
    async function loadVideoDetails(videoId) {
        try {
            const response = await fetch(`${BASE_URL}/videos?key=${API_KEY}&part=snippet&id=${videoId}`);
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            const data = await response.json();
            console.log(data.items);
            if (data.items && data.items.length > 0) {
                const channelId = data.items[0].snippet.channelId;
                loadChannelInfo(channelId);
                load(channelId);
            }
        } catch (error) {
            console.error('Error fetching video details: ', error);
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
                displayChannelInfo(data.items[0]);
                loadRecommendedVideos(data.items[0].snippet.title);
            }
        } catch (error) {
            console.error('Error fetching channel info: ', error);
        }
    }
    


    async function load(channelId) {
        try {
            const response = await fetch(`${BASE_URL}/statistics?key=${API_KEY}&part=snippet&id=${channelId}`);
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            const data = await response.json();
            if (data.items) {
               display(data.items[0]);
            }
        } catch (error) {
            console.error('Error fetching channel info: ', error);
        }
    }  

    function display(items){
        console.log(items);
    }
    











    function displayChannelInfo(channelData) {
        const channelInfoSection = document.getElementById('channel-info');
        channelInfoSection.innerHTML = `
             <div>
            <img src="${channelData.snippet.thumbnails.default.url}" alt="${channelData.snippet.title}">
            <h3>${channelData.snippet.title}</h3>
            
           </div>
             <div id =btns>
           <div id="sub-btn">Subscribe
           </div>
           <div id='like-dislike-btn'>
           </div>
           </div>
        `;

        const btn = document.getElementById('like-dislike-btn');
        btn.innerHTML=`<div class="li-DI"><span class="material-symbols-outlined">
        thumb_up
        </span>
                        </div>
                        <div class="DI-li"><span class="material-symbols-outlined">
        thumb_down
        </span>
                        </div>
                        <div id='share'><img src='assets/Share.png'/>share
                        </div>
                        
                        <div id='download'><span class="material-symbols-outlined">
                        download_2
                        </span>Download
                                        </div>
                        
                        
                        `
        
    }


    // Make a request to the YouTube API to get video details
    fetch(`https://www.googleapis.com/youtube/v3/videos?id=${videoId}&key=${API_KEY}&part=snippet`)
        .then(response => response.json())
        .then(data => {
            const description=data.items[0].snippet.description;
            // Extract the video name from the API response
            const videoName = data.items[0].snippet.title;
            console.log('Video Name:', videoName);
             return videoTitle(videoName,description);
        })
        .catch(error => console.error('Error fetching video details:', error));

 
        async function loadComments(videoId) {
            try {
                const response = await fetch(`${BASE_URL}/commentThreads?key=${API_KEY}&videoId=${videoId}&maxResults=25&part=snippet`);
                if (!response.ok) {
                    throw new Error(`HTTP error! status: ${response.status}`);
                }
                const data = await response.json();
                console.log("comments", data)
                if (data.items) {
                    displayComments(data.items);
                    console.log(data.items)
                } else {
                    console.log("No comments available or data is undefined.");
                }
            } catch (error) {
                console.error('Error fetching comments: ', error);
            }
        }
        loadComments(videoId);
        function displayComments(comments) {
            const commentSection = document.getElementById('comments');
            commentSection.innerHTML = 'comments';
        
            comments.forEach(comment => {
                const commentText = comment.snippet.topLevelComment.snippet.textDisplay;
                const commentElement = document.createElement('p');
                commentElement.innerHTML = commentText;
                commentSection.appendChild(commentElement);
            });
        }
    
    async function loadRecommendedVideos(channelName) {
        try {
            const response = await fetch(`${BASE_URL}/search?key=${API_KEY}&maxResults=8&part=snippet&q=${channelName}`);
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            const data = await response.json();
            console.log("Recommended videos", data)
            if (data.items) {
                displayRecommendedVideos(data.items ,videoId);
            } else {
                console.log("No recommended videos available or data is undefined.");
            }
        } catch (error) {
            console.error('Error fetching recommended videos: ', error);
        }
    }
    
    function displayRecommendedVideos(videos,currvid ) {
        const recommendedSection = document.getElementById('recom-watch');
        recommendedSection.innerHTML = ` <div class="all"><span id="al">All</span>
        <span id="us">From User</span></div>`;
    
        videos.forEach(video => {
            const videoId = video.id.videoId;
            const title = video.snippet.title;
            const thumbnail = video.snippet.thumbnails.default.url;
            if (videoId !== currvid) {
            const videoCard = document.createElement('div');
            videoCard.setAttribute('id',"recom");
            videoCard.innerHTML = `
                <a href="watch.html?videoId=${videoId}">
                    <img src="${thumbnail}" alt="${title}">
                    <p>${title}</p>
                </a>
            `;
            recommendedSection.appendChild(videoCard);
            }
        });
    }
    

