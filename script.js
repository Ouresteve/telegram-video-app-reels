let userInteracted = false;
const app = document.getElementById('app');
const pages ={
    home: createHomePage,
    search: createSearchPage,
    upload: createUploadPage,
    profile: createProfilePage
};
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


showPage("home");
function showPage(pageName) {
    
    clearApp();
    if(pages[pageName]) {
        
        const pageContent = pages[pageName]();
        app.appendChild(pageContent);
        if (pageName === 'home') {
            document.querySelectorAll('.video-player').forEach(video => {
                observer.observe(video);
            });
        }
    }
}

function clearApp(){
    app.innerHTML= " ";
}
const tg = window.Telegram.WebApp;
window.addEventListener('click',() => {
    userInteracted=true;
});
function createHomePage() {
    const homeDiv= document.createElement('div');
    homeDiv.classList.add('home');
    const videos =[
         {
              username: '@steve',
              caption:'check out this cool clip',
              color:'black',
              videoUrl: 'webapp/videos/now.mp4'
         },
        {
             username: '@maiko',
             caption:'Another awesome moment',
             color:'#e67e22',
             videoUrl: 'webapp/videos/after.mp4'
        },
        {
            username: '@cryptoKing',
            caption:'Ton tipping is live',
            color:'#9b59b6',
             videoUrl: 'webapp/videos/where.mp4'

        },
        {
            username: '@quantumtradercfd',
            caption:'Tip me to get more videos like this',
            color:'#9b59b6',
            videoUrl: 'webapp/videos/then.mp4'
        },
        {
            username: '@barryrwa',
            caption:'This is how  you learn python',
            color:'#9b59b8',
            videoUrl: 'webapp/videos/when.mp4',

        }
    ];


    
        

    
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
        actionsDiv.innerHTML = `<button class="like-video" onclick="likeVideo(${index})"><i class="fas fa-heart"></i></button><button onclick="tipCreator('${video.username}')"><i class="fas fa-coins"></i></button><button onclick="shareVideo('${video.caption}','${video.username}')"><i class="fas fa-share"></i></button><button onclick="toggleComments(${index})"><i class="fas fa-comment"></i></button>`;

        const commentDiv = document.createElement('div');
        commentDiv.classList.add('comment-section');
        commentDiv.style.display = 'none';
        commentDiv.innerHTML =` <div class="comments" id="comments-${index}"></div> <input type="text" placeholder="Add a comment". . . " onkeydown="submitComment(event, ${index} )"> `;
        document.querySelectorAll('.video-player').forEach(video => {
            observer.observe(video);
        });
       
        const bottomDiv = document.createElement('div');
        bottomDiv.classList.add('bottom-bar');
        bottomDiv.innerHTML= `<button><i class="fas fa-home"></i></button><button onclick="showPage('search')"><i class="fas fa-search"></i></button><button onclick="showPage('upload')"><i class="fas fa-upload"></i></button><button onclick="showPage('profile')"><i class="fas fa-user"></i></button>`;
        videoDiv.appendChild(bottomDiv);
        videoDiv.appendChild(commentDiv);
        videoDiv.appendChild(videoEl);
        videoDiv.appendChild(infoDiv);
        videoDiv.appendChild(actionsDiv);


        homeDiv.appendChild(videoDiv);
    });

    
    return homeDiv;
}

function createSearchPage(){

}
function createUploadPage() {
    const uploadDiv = document.createElement('div');
    uploadDiv.classList.add('upload-page');

    const title = document.createElement('h2');
    title.textContent = "Upload a video";

    const fileInput = document.createElement('input');
    fileInput.classList.add('input');
    fileInput.type='file';
    fileInput.accept = 'video/*';

    const captionInput = document.createElement('input');
    captionInput.classList.add('input');
    captionInput.type = 'text';
    captionInput.placeholder = "Add a captiton . . . ";

    const preview = document.createElement('video');
    preview.controls = true;
    preview.style.display = 'none';
    preview.style.maxWidth = '100%';

    fileInput.addEventListener('change', () => {
        const file= fileInput.files[0];
        if (file){
            const url = URL.createObjectURL(file);
            preview.src= url;
            preview.style.display = 'block';
        }
    });


    const actionsDiv = document.createElement('div');
    actionsDiv.classList.add('video-actions');
    actionsDiv.innerHTML = `<button onclick=upload_action()><i class="fas fa-upload"></i></button><button><i class="fas fa-bolt"></i></button>`;

    const bottomDiv = document.createElement('div');
    bottomDiv.classList.add('bottom-bar');
    bottomDiv.innerHTML= `<button onclick= showPage('home')><i class="fas fa-home"></i></button><button onclick="showPage('search')"><i class="fas fa-search"></i></button><button onclick="showPage('upload')"><i class="fas fa-upload"></i></button><button onclick="showPage('profile')"><i class="fas fa-user"></i></button>`;
    
    
    
    
    
    uploadDiv.appendChild(bottomDiv);
    uploadDiv.appendChild(actionsDiv);
    uploadDiv.appendChild(title);
    uploadDiv.appendChild(fileInput);
    uploadDiv.appendChild(captionInput);
    uploadDiv.appendChild(preview);
    
    //app.appendChild(uploadDiv);

    return uploadDiv;
}



function createProfilePage() {
    const profileDiv = document.createElement('div');
    profileDiv.classList.add('profile-page');

    const profilePic = document.createElement('img');
    profilePic.src = 'videos/profile.jpg';
    profilePic.alt = 'Profile Picture';
    profilePic.classList.add('profile-pic');

    const username = document.createElement ('h3');
    username.textcontent = '@Steve Oure';

    const statsRow = document.createElement('div');
    statsRow.classList.add('stats-row');

    const followersBtn = document.createElement('button');
    
    followersBtn.textContent = '0 followers';

    const likesBtn = document.createElement('button');
    likesBtn.textContent = '0 likes';

    const walletBtn= document.createElement('button');
    walletBtn.textContent = ' Wallet';

    statsRow.appendChild(followersBtn);
    statsRow.appendChild(likesBtn);
    statsRow.appendChild(walletBtn);

    const bottomDiv = document.createElement('div');
    bottomDiv.classList.add('bottom-bar');
    bottomDiv.innerHTML= `<button onclick= showPage('home')><i class="fas fa-home"></i></button><button onclick="showPage('search')"><i class="fas fa-search"></i></button><button onclick="showPage('upload')"><i class="fas fa-upload"></i></button><button onclick="showPage('profile')"><i class="fas fa-user"></i></button>`;
   

    const videoGrid = document.createElement('div');
    videoGrid.classList.add('video-grid');
    
    const thumb = document.createElement('video');
    thumb.src= 'videos/after.mp4';
    thumb.controls = false;
    thumb.muted = true;
    thumb.classList.add('video-thumb');

    thumb.onclick =()=> {
        alert('open video viewer');
    };
    videoGrid.appendChild(thumb);
    profileDiv.appendChild(bottomDiv);
    profileDiv.appendChild(profilePic);
    profileDiv.appendChild(username);
    profileDiv.appendChild(statsRow);
    profileDiv.appendChild(videoGrid);
    
    return profileDiv;

}

document.querySelectorAll('.video-player').forEach(video => {
    observer.observe(video);
});

function likeVideo(index) {
    const videoDiv = document.querySelectorAll('.video')[index];
    const likeButton = videoDiv.querySelector('.like-video');
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
    
function upload_action() {
    alert("Video Uploaded successfully");
}
