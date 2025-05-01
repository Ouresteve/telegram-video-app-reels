let userInteracted = false;
const tg = window.Telegram.WebApp;
window.addEventListener('click',() => {
    userInteracted=true;
});
const videos =[
    {
        username: '@steve',
        caption:'check out this cool clip',
        color:'black',
        videoUrl: 'videos/now.mp4'
    },
    {
        username: '@maiko',
        caption:'Another awesome moment',
        color:'#e67e22',
        videoUrl: 'videos/after.mp4'
    },
    {
        username: '@cryptoKing',
        caption:'Ton tipping is live',
        color:'#9b59b6',
        videoUrl: 'videos/where.mp4'

    },
    {
        username: '@quantumtradercfd',
        caption:'Tip me to get more videos like this',
        color:'#9b59b6',
        videoUrl: 'videos/then.mp4'
    },
    {
        username: '@barryrwa',
        caption:'This is how  you learn python',
        color:'#9b59b8',
        videoUrl: 'videos/when.mp4',

    }
];

const app = document.getElementById('app');


videos.forEach((video, index) => {
    

    const videoDiv = document.createElement('div');
    videoDiv.classList.add('video');
    videoDiv.style.backgroundColor = video.color;
    
    

    const infoDiv= document.createElement('div');
    infoDiv.classList.add('video-info');
    infoDiv.innerHTML= `<h4>${video.username}</h4> <p>${video.caption}</p>`;

    const videoEl = document.createElement('video');
    videoEl.src = video.videoUrl;
    videoEl.controls = true;
    videoEl.autoplay= false;
    videoEl.loop = true;
    videoEl.muted = false;
    videoEl.classList.add('video-player');


    const actionsDiv = document.createElement('div');
    actionsDiv.classList.add('video-actions');
    actionsDiv.innerHTML = `<button onclick="tipCreator('${video.username}')">💲</button><button onclick="shareVideo('${video.caption}','${video.username}')">📤</button><button onclick="toggleComments(${index})">🧾</button>`;

    const commentDiv = document.createElement('div');
    commentDiv.classList.add('comment-section');
    commentDiv.style.display = 'none';
    commentDiv.innerHTML =` <div class="comments" id="comments-${index}"></div> <input type="text" placeholder="Add a comment". . . " onkeydown="submitComment(event, ${index} )"> `;
    videoDiv.appendChild(commentDiv);
    videoDiv.appendChild(videoEl);
    videoDiv.appendChild(infoDiv);
    videoDiv.appendChild(actionsDiv);


    app.appendChild(videoDiv);
});
// show telegram button when a video is in view
function onVideoInView(videoIndex) {
    Telegram.WebApp.MainButton.setText("❤ Like This Video").show().onClick(() => handleLike(videoIndex));
}

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        const video =entry.target;
        if (entry.isIntersecting && userInteracted){
            video.currentTime=0;
            video.play();
        }else{
            video.pause();
       }
    });
},{
    threshold: 0.75
});

document.querySelectorAll('.video-player').forEach(video => {
    observer.observe(video);
});

function likeVideo(index) {
    const videoDiv = document.querySelectorAll('.video')[index];
    const likeButton = videoDiv.querySelector('.like-button');
    const liked = likeButton.getAttribute('data-liked') === 'true';
    if(liked){
        likeButton.style.color='white';
        likeButton.setAttribute('data-liked','false');

    }else{
        likeButton.style.color='red';
        likeButton.setAttribute('data-liked','true')
    }
        
}
function tipCreator(username) {
    if(window.Telegram && window.Telegram.webApp){
        
        tg.ready();
         tg.showPopup ({
            title: `Tip ${username}`,
            message: `Do you want to tip ${username}?`,
            buttons:[
                {id:'yes', type: 'default', text: 'Yes '},
                {id:'cancel', type: 'destructive', text:'Cancel'}
            ]
         }, (buttonId) => {
             if(buttonId === 'yes'){
                tg.showAlert(`Tipped ${username}`)
         }
    
        });
    }else {
        alert("This feature only works in Telegram");

    }
}
function shareVideo(caption,username){
    if(navigator.share) {
        navigator.share({
            title: 'Check this out!',
            text:`${caption}- by ${username}`,
            url:window.location.href
        })
        .then(() =>console.log('shared successfully!'))
        .catch((error) =>console.error('Error sharing:',error));
    }else{
        alert('Sharing not supported on this browser');
    }
 
}
function toggleComments(index) {
    const videoDivs = document.querySelectorAll('.video');
    const commentSection = videoDivs[index].querySelector('.comment-section');
    
    document.querySelectorAll('.comment-section').forEach((section, i) => {
        if(i !== index) section.style.display ='none';
    
    document.addEventListener('click', function (event ){
        if (!commentSection.contains(event.target) && event.target.tagName !== 'BUTTON'){
           section.style.display = 'none' ;
        }
    }); 

});
    
    commentSection.style.display = commentSection.style.display === 'none' ? 'block' : 'none';
    
}

function submitComment (event, index) {
    if (event.key === 'Enter') {
        const input = event.target;
        const text = input.value.trim();
        if (text ==='')  return;

        const videoDivs = document.querySelectorAll( '.video');
        const commentsDiv = videoDivs[index].querySelector('.comments');

        const comment = document.createElement('p');
        comment.textContent = text;
        commentsDiv.appendChild(comment);
        input.value = ''
        }
    }
