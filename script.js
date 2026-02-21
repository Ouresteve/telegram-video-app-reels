
let userInteracted = false;
window.addEventListener('click',() => {
    userInteracted=true;
});
//app is fetched
const app = document.getElementById('app');
if ( !window.Telegram) {
    app.innerHtml= `<h2> Open this app in telegram @tip_reelsbot for the best experience`;
}
const user=Telegram.WebApp.initDataUnsafe.user;

const pages ={
    home: createHomePage,
    search: createSearchPage,
    upload: createUploadPage,
    profile: createProfilePage,
    notify: directPage
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


showPage("profile");
//show a page using this function

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
//clear app itself
function clearApp(){
    app.innerHTML= " ";
}
const tg = window.Telegram.WebApp;

//home page 
function createHomePage() {
    const homeDiv= document.createElement('div');
    homeDiv.id="seces"
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
             caption:'Some things they solid they are built to last , some things  they fall apart they break like glass, sometimes its scary what they call love and how first what is  can turn to what was ,waking up this morning , and im drank agaain ... without you here,',
             color:'black',
             videoUrl: 'webapp/videos/after.mp4'
        },
        {
            username: '@cryptoKing',
            caption:'Ton tipping is live',
            color:'black',
             videoUrl: 'videos/where.mp4'

        },
        {
            username: '@quantumtradercfd',
            caption:'Tip me to get more videos like this',
            color:'black',
            videoUrl: 'webapp/videos/then.mp4'
        },
        {
            username: '@barryrwa',
            caption:'This is how  you learn python',
            color:'black',
            videoUrl: 'webapp/videos/when.mp4',

        }
    ];


    
        

    
     videos.forEach((video, index) => {
        
        const videoDiv = document.createElement('div');
        videoDiv.classList.add('video');
        videoDiv.id="sec";
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

        videoEl.addEventListener('dblclick', () => {
            //videoEl.requestFullscreen();
            likeVideo(index);
        });
        const actionsDiv = document.createElement('div');
        actionsDiv.classList.add('video-actions');
        actionsDiv.innerHTML = `<button class="like-video" onclick="likeVideo(${index})"><i class="fas fa-heart"></i></button><button onclick="tipCreator('${video.username}')"><i class="fas fa-coins"></i></button><button onclick="shareVideo('${video.caption}','${video.username}')"><i class="fas fa-share"></i></button><button onclick="toggleComments(${index})"><i class="fas fa-comment"></i></button>`;

        //commentDiv.style.display = 'none';
    //commentDiv.innerHTML =` <div class="comments" id="comments-${index}"></div> <input type="text" placeholder="Add a comment". . . " onkeydown="submitComment(event, ${index} )"> `;
        document.querySelectorAll('.video-player').forEach(video => {
            observer.observe(video);
            
        });
       
        const bottomDiv = document.createElement('div');
        bottomDiv.classList.add('bottom-bar');
        bottomDiv.innerHTML= `<button style="background-color: red"><i class="fas fa-home"></i></button><button onclick="showPage('search')"><i class="fas fa-search"></i></button><button onclick="showPage('upload')"><i class="fas fa-upload"></i></button><button onclick="showPage('profile')"><i class="fas fa-user"></i></button>`;
        
        
        videoDiv.appendChild(bottomDiv);
       // videoDiv.appendChild(commentDiv);
        videoDiv.appendChild(videoEl);
        videoDiv.appendChild(infoDiv);
        videoDiv.appendChild(actionsDiv);

        
        homeDiv.appendChild(videoDiv);
    });

    
    return homeDiv;
}

//search page
function createSearchPage(){
    const srchP = document.createElement('div');
    srchP.classList.add('search-page');
    const bottomDiv = document.createElement('div');
    bottomDiv.classList.add('bottom-bar');
    bottomDiv.innerHTML= `<button  button onclick= showPage('home') ><i class="fas fa-home"></i></button><button onclick="showPage('search')" style="background-color: red"><i class="fas fa-search"></i></button><button onclick="showPage('upload')"><i class="fas fa-upload"></i></button><button onclick="showPage('profile')"><i class="fas fa-user"></i></button>`;
    srchP.appendChild(bottomDiv);
    return srchP;

}
//upload page
function createUploadPage() {
    /*
    const uploadDiv = document.createElement('div');
    uploadDiv.classList.add('upload-page');

    const title = document.createElement('h2');
    title.textContent = "Upload your Content";
    title.style.textAlign='center';

    const form = document.createElement('form');
    form.id = 'uploadForm';
    form.style.display='flex';
    form.style.flexDirection='column';
    form.style.alignItems='center';
    form.style.gap='15px';
    form.style.margin='20px';

    const fileLabel= document.createElement('label');
    fileLabel.textContent= "Select video from your device";
    fileLabel.style.fontWeight='bold';      

    const fileInput = document.createElement('input');
    fileInput.classList.add('input');
    fileInput.type = 'file';
    fileInput.accept = 'video/*';
    fileInput.name = 'video';
    fileInput.required=true;

    

    const captionInput = document.createElement('input');
    captionInput.style.zIndex='10';
    captionInput.type = 'text';
    captionInput.name = 'caption';
    captionInput.placeholder = "Add a caption...";
    captionInput.style.left='50%';
    captionInput.rows=3;
   // captionInput.style.transform='translateX(-50%)';
    captionInput.style.top = '10px';
    captionInput.style.positon= 'absolute';
    captionInput.style.padding = '5px 10px';
    captionInput.style.border= 'none';
    captionInput.style.borderRadius= '20px';
    captionInput.style.fontSize='14px';
    captionInput.style.outline='none';

    const previewWrapper = document.createElement('div');
    previewWrapper.style.positon= 'relative';
    previewWrapper.style.width= '100%';
    previewWrapper.style.maxwidth = '600px';
    previewWrapper.style,marginTop='20px';
    previewWrapper.style.display = 'inline-block';


    const preview = document.createElement('video');
    preview.controls = true;
    preview.style.display = 'none';
    preview.style.borderRadius='20px';
    preview.style.maxWidth = '100%';

    previewWrapper.appendChild(captionInput);
    
    fileInput.addEventListener('change', () => {
        const file = fileInput.files[0];
        
        if (file) {
            
            const url = URL.createObjectURL(file);
            preview.src = url;
            preview.style.objectFit= 'contain';
           // preview.style.left='0';
           // preview.style.right= '0';
            preview.style.height= '100vh';
            preview.style.width = '100vw';
            preview.style.position = 'relative';
            preview.style.display = 'block';
            
           
        }
         
    });
    
    const uploadButton = document.createElement('button');
    uploadButton.type = 'submit';
    uploadButton.innerHTML = `<i class="fas fa-upload"></i> Upload`;

    const actionsDiv = document.createElement('div');
    actionsDiv.classList.add('video-actions');
    actionsDiv.appendChild(uploadButton);
    
    
    previewWrapper.appendChild(preview);
    form.appendChild(fileInput);
    
    
    form.appendChild(previewWrapper);
    
    
    //form.appendChild(captionInput);
    
    form.appendChild(actionsDiv);

    form.addEventListener('submit', async (e) => {
        e.preventDefault();
        const formData = new FormData(form);
        showPage('upload');
        const res = await fetch('http://localhost:3000/upload', {
            method: 'POST',
            body: formData
            
        });
        

        const data = await res.json();
        console.log('Video is accessible at:', data.video_url);
        alert('Video uploaded successfully!');
         
    });

    const bottomDiv = document.createElement('div');
    bottomDiv.classList.add('bottom-bar');
    bottomDiv.innerHTML = `
        <button onclick="showPage('home')"><i class="fas fa-home"></i></button>
        <button onclick="showPage('search')"><i class="fas fa-search"></i></button>
        <button style="background-color: red" onclick="showPage('upload')"><i class="fas fa-upload"></i></button>
        <button onclick="showPage('profile')"><i class="fas fa-user"></i></button>`;

    uploadDiv.appendChild(title);
    uploadDiv.appendChild(form);
    uploadDiv.appendChild(bottomDiv);

    return uploadDiv;*/
    window.open('https://t.me/tip_reels_bot', '_blank');
    showPage("profile");

    
}

function directPage() {
     const dDiv = document.createElement('div');
     dDiv.innerHtml=`<h2>Kindly Open this application in telegram! @tip_reels_bot</h2>`;
    return dDiv;
}
  //Create the profile page
function createProfilePage() {
    const profileDiv = document.createElement('div');
    profileDiv.classList.add('profile-page');

    const profilePic = document.createElement('img');
    profilePic.src = user.photo_url;
    profilePic.alt = 'Profile Picture';
    profilePic.classList.add('profile-pic');

    const username = document.createElement ('h3');
    username.textContent = user.first_name  ? `${user.first_name} ${user.last_name || ''}` : 'Anonymous User';

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
    bottomDiv.innerHTML= `<button onclick= showPage('home')><i class="fas fa-home"></i></button><button onclick="showPage('search')"><i class="fas fa-search"></i></button><button onclick="showPage('upload')"><i class="fas fa-upload"></i></button><button style="background-color: red" onclick="showPage('profile')"><i class="fas fa-user"></i></button>`;
   

    const videoGrid = document.createElement('div');
    videoGrid.classList.add('video-grid');
    
    const thumb = document.createElement('video');
    thumb.src= 'videos/after.mp4';
    thumb.controls = false;
    thumb.muted = false;
    thumb.classList.add('video-thumb');

    thumb.onclick =()=> {

        thumb.mute = false;
        thumb.play();
        
    };
    videoGrid.appendChild(thumb);
    profileDiv.appendChild(bottomDiv);
    profileDiv.appendChild(profilePic);
    profileDiv.appendChild(username);
    profileDiv.appendChild(statsRow);
    profileDiv.appendChild(videoGrid);
    
    return profileDiv;

}
//like
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
//tip
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
//share
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
//comments
function toggleComments(index) {
    console.log("toggle comments called with index:",index);
    const cm = document.getElementById('seces');
    const commentD = document.createElement('div');
    commentD.id="secs";
    
    commentD.classList.add('comment-section');
        

    
    cm.appendChild(commentD);
    const commentDiv = document.createElement('div');
    commentDiv.className = 'comment-panel';
    
    commentDiv.innerHTML = `<div class="comment-header">
                                <span>Comments</span>
                                <button id="close-comments">&times;</button>
                            </div>
                            <div class="comment-list" id= "comment-list-${index}">
                                <!--Comments will be appended here-->
                            </div>
                            <div class="comment-input-area">
                                <input type="text" placeholder="Add a comment. . . " id="comment-input-${index}"/>
                                <button id="send-comment-${index}">Send</button>
                            </div>`;
    

    commentDiv.querySelector('#close-comments').onclick = () => {
            commentD.remove();
            commentDiv.remove();
    };
    const input=commentDiv.querySelector(`#comment-input-${index}`);

    const commentList = commentDiv.querySelector(`#comment-list-${index}`);
    let lastScrollTop = 0;
    //commentList.addEventListener('', () =>{
   //     
  //  });
    console.log("commentList:",commentDiv.innerHTML);
    commentDiv.querySelector(`#send-comment-${index}`).onclick =() => {
        
        const text = input.value.trim();
        console.log("text: ", text);
        if( text){
            
            const comment=document.createElement('div');
            comment.className='comment';
            comment.textContent= text;

            commentList.appendChild(comment);
            input.value='';
           // commentD.style.height="100%";
        }else {
            console.warn("one of the elements is empty");
        }
    };
    commentD.appendChild(commentDiv);
    
    return commentDiv;
                                

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
    
