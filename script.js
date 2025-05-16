const container = document.querySelector(".container");
const bgButton = document.querySelector(".bg-button");
const bgOption = document.querySelector(".bg-option");
const elements = document.querySelectorAll(".elem");
const bgColors = document.querySelectorAll(".box");
const selectWidget = document.querySelector(".selectWidget")
const closeWidget = document.querySelector('.close-widget')
const widget = document.querySelector('.widgets')
const widgetsOption = document.querySelectorAll('.control')
const icon = document.querySelector('.control')
const sideWidget = document.querySelector('.side-widget')
const sideElement = document.querySelectorAll('.side')
const widgetsOptions = document.querySelectorAll('.widgetOption')
const quotes = document.querySelector('#quotes')

bgButton.addEventListener("click", () => {
    bgOption.classList.toggle("hidden");
    event.stopPropagation();
});


document.body.addEventListener("click", (event) => {
    if (!bgOption.classList.contains("hidden") && !bgOption.contains(event.target) && event.target !== bgButton) {
        bgOption.classList.add("hidden");
    }
});

elements.forEach((element) => {
    element.addEventListener("click", () => {
        const videoSrc = element.getAttribute("video-src");
        if (videoSrc) {
            playVideo(videoSrc);
        }
    });
});

bgColors.forEach((element) => {
    element.addEventListener("click", () => {
        const color = element.getAttribute("color");
        removeExistingVideo();
        document.body.style.backgroundColor = color;
    });
});

function playVideo(videoSrc) {
    // removeExistingVideo();
    // removeExistingBg();
    const videoContainer = document.createElement("div");
    videoContainer.id = "videoContainer";
    videoContainer.style.cssText = `
        width: 100vw;
        height: 100vh;
        position: fixed;
        top: 0;
        left: 0;
        z-index: -1;
    `;

    const video = document.createElement("video");
    video.id = "videoPlayer";
    video.src = videoSrc;
    video.autoplay = true;
    video.loop = true;
    video.muted = true;
    video.style.cssText = `
        width: 100%;
        height: 100%;
        object-fit: cover;
    `;

    videoContainer.appendChild(video);
    document.body.appendChild(videoContainer);
}

function removeExistingVideo() {
    const existingVideo = document.getElementById("videoContainer");
    if (existingVideo) {
        existingVideo.remove();
    }
}


selectWidget.addEventListener('click', () => {
    widget.classList.toggle('hidden')
})

widgetsOption.forEach((element, index) => {
    element.addEventListener("click", ()=> {
        const position = index
        const truee = element.classList.toggle("bg-widget")
        if(truee){
            addicon(position, element)
        }else{
            removeicon(position, element)
        }
    })
    
})

closeWidget.addEventListener("click", () => {
    widget.classList.toggle("hidden");
});

function addicon(position, element) {
    const div = document.createElement('div')
    div.classList.add('side')
    const icons = element.querySelector('i')
    const clone = icons.cloneNode(true)
    div.appendChild(clone)
    sideWidget.appendChild(div)
    div.id = `index${position}`
    console.log(sideWidget)
    
    const widgetName = element.querySelector('p').innerText.toLowerCase().replace(/\s+/g, '-')
    div.classList.add(`${widgetName}`)
    addWidgetFunctionality(div, widgetName);

}

function removeicon(position, element) {
    console.log(position)
    const removeDiv = document.getElementById(`index${position}`);
    removeDiv.remove();           
}

function addWidgetFunctionality(element, widgetName) {
    element.addEventListener('click', () => {
        switch(widgetName) {
            case 'quotes':
                showQuoteContainer();
                break;
            case 'spotify':
                showSpotifyContainer();
                break;
            case 'chill-music':
                console.log('Music widget clicked');
                break;
            case 'task-tracker':
                console.log('Task tracker clicked');
                break;
            case 'promodoro-timer':
                console.log('Pomodoro timer clicked');
                break;
            case 'theme':
                console.log('Theme clicked');
                break;
            case 'sticky-notes':
                console.log('Sticky notes clicked');
                break;
            case 'reset':
                console.log('Reset clicked');
                break;
            case 'full-screen':
                console.log('Full screen clicked');
                break;
            case 'twitch':
                console.log('Twitch clicked');
                break;
            case 'youtube':
                console.log('Youtube clicked');
                break;
            case 'kanban-board':
                console.log('Kanban board clicked');
                break;
            default:
                console.log(`${widgetName} clicked`);
        }
    });
}

function showQuoteContainer() {
    const container = document.createElement('div');
    container.className = "w-[400px] bg-slate-800 transparent absolute flex justify-center items-center text-white flex-col rounded-md pt-8 pb-8 cursor-move";
    container.style.right = '200px'; 
    container.style.bottom = '0';  
    container.style.zIndex = '10';
    container.innerHTML = `
        <p>
            <p class='para text-center pr-8 pl-8 pt-4 text-xl'>"It is better to light a single candle than to curse the darkness."</p>
            <br>
            <p class="author text-end text-lg">Eleanor Roosevelt</p>
            <i class="load ri-loop-right-fill absolute bottom-2 right-4 cursor-pointer"></i>
            <i class="close ri-close-fill absolute top-2 right-4 text-xl text-red-700 cursor-pointer"></i>
        </p>
    `;

    document.body.appendChild(container);

    const load = container.querySelector('.load');
    const close = container.querySelector('.close');
    const para = container.querySelector('.para');
    const author = container.querySelector('.author');

    load.addEventListener('click', () => {
        fetch('https://dummyjson.com/quotes/random')
            .then((res) => res.json())
            .then((quote) => {
                para.innerText = `"${quote.quote}"`;
                author.innerText = `— ${quote.author}`;
            })
            .catch((error) => console.error("Error fetching quote:", error));
    });

    close.addEventListener('click', () => {
        container.remove();
    });

    draggable(container)
}


function draggable(element) {
    let offsetX, offsetY;

    const move = (e) => {
        element.style.left = `${e.clientX - offsetX}px`;
        element.style.top = `${e.clientY - offsetY}px`;
        element.style.right = ''; 
        element.style.bottom = ''; 
    };

    element.addEventListener("mousedown", (e) => {
        if (!e.target.closest(".topContainer")) return;
        element.style.position = "absolute";
        element.style.width = `${element.offsetWidth}px`;
        offsetX = e.clientX - element.offsetLeft;
        offsetY = e.clientY - element.offsetTop;
        document.addEventListener("mousemove", move);
    });

    document.addEventListener("mouseup", () => {
        document.removeEventListener("mousemove", move);
    });
}

// function draggable(element) {
//     let offsetX, offsetY, isDragging = false;

//     const move = (e) => {
//         if (!isDragging) return;
//         element.style.left = `${e.clientX - offsetX}px`;
//         element.style.top = `${e.clientY - offsetY}px`;
//     };

//     element.addEventListener("mousedown", (e) => {
//         isDragging = true;
//         element.style.position = "absolute"; // Fix: Relative hata diya
//         element.style.cursor = "grabbing";
//         offsetX = e.clientX - element.getBoundingClientRect().left;
//         offsetY = e.clientY - element.getBoundingClientRect().top;
//         document.addEventListener("mousemove", move);
//     });

//     document.addEventListener("mouseup", () => {
//         isDragging = false;
//         element.style.cursor = "grab";
//         document.removeEventListener("mousemove", move);
//     });
// }

const spotifyContainer = document.querySelector('.spotifyContainer')
draggable(spotifyContainer)

function showSpotifyContainer(){
    spotifyContainer.classList.toggle('hidden')
}

const closeSpotify = document.querySelector('.closeSpotify')
closeSpotify.addEventListener('click', () => {
    spotifyContainer.classList.toggle('hidden')
})

let pauseCircle = document.querySelector('.pauseCircle');
    let playCircle = document.querySelector('.playCircle');
    const audio = document.getElementById('audio');
    const seekBar = document.getElementById('seekBar');
    const startingTime = document.querySelector('.starting');
    const totalTime = document.querySelector('.total');
    const miniForward = document.querySelector('.miniForward');
    const miniBackward = document.querySelector('.miniBackward');

    function togglePlayPause() {
        if (audio.paused) {
            audio.play().then(() => updatePlayState(true));
        } else {
            audio.pause();
            updatePlayState(false);
        }
    }
    
    function updatePlayState(isPlaying) {
        if (isPlaying) {
            playCircle.classList.add('hidden');
            pauseCircle.classList.remove('hidden');
        } else {
            playCircle.classList.remove('hidden');
            pauseCircle.classList.add('hidden');
        }
    }
    

    audio.addEventListener('loadedmetadata', () => {
        seekBar.max = audio.duration;
        totalTime.textContent = formatTime(audio.duration);
    });

    audio.addEventListener('timeupdate', () => {
        seekBar.value = audio.currentTime;
        startingTime.textContent = formatTime(audio.currentTime);
    });

    seekBar.addEventListener('input', () => {
        audio.currentTime = seekBar.value;
    });

    miniBackward.addEventListener('click', () => {
        audio.currentTime = Math.max(0, audio.currentTime - 5);
    });

    miniForward.addEventListener('click', () => {
        audio.currentTime = Math.min(audio.duration, audio.currentTime + 5);
    });

    function formatTime(time) {
        let minutes = Math.floor(time / 60);
        let seconds = Math.floor(time % 60);
        return `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
    }

const songContainer = document.querySelector('.songContainer')

draggable(songContainer)

const songs = [
    {
        id: '1',
        songName: "GooseBump",
        singerName: "IIT Delhi",
        poster: "/images/coder.jpg",
        song: "/audio/IIT Delhi Endowment Fund Song.mp3"
    },
    {
        id: '2',
        songName: "Tajdar-e-Haram",
        singerName: "Atif Aslam",
        poster: "/images/images (2).jpg",
        song: "/audio/Coke Studio Season 8 Tajdar-e-Haram Atif Aslam (1).mp3"
    },
    {
        id: '3',
        songName: "Kun Faya Kun",
        singerName: "A.R. Rahman",
        poster: "/images/images (1).jpg",
        song: "/audio/Kun Faya Kun Full Video Song Rockstar  Ranbir Kapoor  A.R. Rahman, Javed Ali, Mohit Chauhan.mp3"
    },
    {
        id: '4',
        songName: "Matkar Maya",
        singerName: "Sachin-Jigar",
        poster: "/images/images (3).jpg",
        song: "/audio/Matkar Maya Ko Ahankar (Audio) By Neeraj Arya's Kabir Cafe From Album Panchrang.mp3"
    },
    {
        id: "5",
        songName: "Mera Safar",
        singerName: "Iqlipse Nova",
        poster: "/images/images (4).jpg",
        song: "/audio/Mera Safar  @Iqlipse Nova   Trending Song 2022.mp3"
    },
    {
        id: "6",
        songName: "Sahiba",
        singerName: "Jasleen Royal",
        poster: "/images/images (5).jpg",
        song: "/audio/Sahiba (Music Video) Jasleen Royal Vijay Deverakonda Radhika Madan Stebin PriyaAditya Sudhanshu.mp3"
    },
    {
        id: "7",
        songName: "Tenu Sang Rakhna",
        singerName: "Arijit Singh",
        poster: "/images/images (6).jpg",
        song: "/audio/Tenu Sang Rakhna - Full Song Audio _ Jigra _ Alia Bhatt _ Vedang Raina _ Arijit Singh,Achint,Anumita [nzelzk2sVH8].mp3"
    },
    {
        id: "8",
        songName: "Tum Se",
        singerName: "Aish Uljha",
        poster: "/images/images (7).jpg",
        song: "/audio/Tum Se - Teri Baaton Mein Aisa Uljha Jiya 320 Kbps.mp3"
    },
    {
        id: "9",
        songName: "Tumhare He Rahenge",
        singerName: "Varun",
        poster: "/images/images (8).jpg",
        song: "/audio/Tumhare Hi Rahenge Hum -Audio_Stree2_Shraddha Kapoor_Rajkummar Rao_Sachin-Jigar_Varun_Shilpa_Amitabh [VjynoL4zEVw].mp3"
    },
    {
        id: "10",
        songName: "Hua Shanknaad",
        singerName: "Neil",
        poster: "/images/images (9).jpg",
        song: "/audio/Lyrical_ Hua Shankhnaad (Dussehra Title Track)   Neil Nitin Mukesh, Tina Desai  Kailash Kher.mp3"
    },
    {
        id: "11",
        songName: "Besabriyaan",
        singerName: "Armaan Malik",
        poster: "/images/img (10).jpg",
        song: "/audio/BESABRIYAAN Full Video Song  M. S. DHONI - THE UNTOLD STORY  Sushant Singh Rajput.mp3"
    },
];

songs.forEach((elements) => {
    const div = document.createElement('div')
    div.className = "w-[100%] h-[20%] pt-4 grid grid-cols-[20%_50%_30%] items-center "
    div.innerHTML = `
        <div class="text-end pr-6"><p class="font-medium text-gray-500">${elements.id}</p></div>
            <div class="text-start">
                <p class="font-sans text-lg font-semibold text-white">${elements.songName}</p>
                <p class="text-sm font-medium tracking-tight text-gray-500">${elements.singerName}</p>
            </div>
        <div>
            <p class="font-medium text-gray-500">02:48</p>
        </div>
    `
    songContainer.append(div)

    div.addEventListener(('click'), () => {
        playMusic(elements)
    })

})

const topContainer = document.querySelector('.topContainer')
const musicName = document.querySelector('.musicName')
const singerName = document.querySelector('.singerName')
const image = document.querySelector('.image')

function playMusic(elements) {
    image.src = elements.poster
    musicName.innerText = elements.songName;
    singerName.innerText = elements.singerName;
    audio.src = elements.song;
    audio.play().then(() => updatePlayState(true));
}