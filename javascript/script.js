document.getElementById("spiner").style.display="none";
const loadCategories = async()=>{
    const response = await fetch("https://openapi.programming-hero.com/api/phero-tube/categories");
    const data = await response.json();
    displayCategories(data.categories);
    
}

const displayCategories=(categories)=>{

    const buttonContainer =document.getElementById("button-container");

    // console.log(categories);
    categories.forEach((item)=>{
        // console.log(item);
        const creatDiv= document.createElement("div");
        creatDiv.innerHTML=`
            <button onclick="loadCategory('${item.category_id}')" class="btn text-lg mt-3 hover:bg-red-600 hover:text-white">${item.category}</button>

        `
        buttonContainer.appendChild(creatDiv);
    })
    
}

const loadCategory=async(id)=>{
    show("spiner");
    const response = await fetch(`https://openapi.programming-hero.com/api/phero-tube/category/${id}`);
    const data = await response.json();
    if(data.category){
      displayVideos(data.category);
      makeHide("spiner");
    }
}
// {
//       "category_id": "1001",
//       "video_id": "aaaa",
//       "thumbnail": "https://i.ibb.co/L1b6xSq/shape.jpg",
//       "title": "Shape of You",
//       "authors": [
//         {
//           "profile_picture": "https://i.ibb.co/D9wWRM6/olivia.jpg",
//           "profile_name": "Olivia Mitchell",
//           "verified": ""
//         }
//       ],
//       "others": {
//         "views": "100K",
//         "posted_date": "16278"
//       },
//       "description": "Dive into the rhythm of 'Shape of You,' a captivating track that blends pop sensibilities with vibrant beats. Created by Olivia Mitchell, this song has already gained 100K views since its release. With its infectious melody and heartfelt lyrics, 'Shape of You' is perfect for fans looking for an uplifting musical experience. Let the music take over as Olivia's vocal prowess and unique style create a memorable listening journey."
//     }
const loadVideos = async(text='')=>{
     show("spiner")
    const response = await fetch(`https://openapi.programming-hero.com/api/phero-tube/videos?title=${text}`);
    const data = await response.json();
    if(data.videos){
         displayVideos(data.videos);
         makeHide("spiner");
    }
}
const displayVideos =(videos)=>{
    const videoContainer=document.getElementById("video-container");
    videoContainer.innerHTML = '';
    if(videos.length === 0){
          videoContainer.innerHTML=`
        <div class="col-span-full text-center my-20 flex justify-center items-center flex-col space-y-3">
            <img src="./images/Icon.png" alt="">
            <p class="text-xl md:text-2xl lg:text-4xl font-bold">Oops!! Sorry, There is no <br> content here</p>
        </div>
          
          `
        return;
    }
    // console.log(videos);
   
    videos.forEach((video)=>{
        const createDiv = document.createElement("div");
        createDiv.innerHTML=`
           <div class="card bg-base-100  shadow-lg">
  <figure>
    <img
      src="${video.thumbnail}"
      class="w-160 h-60 rounded-xl"
      alt="video" />
  </figure>
  <div class="flex gap-3 py-5">
    <div class="p-3">
       <img class="w-12 h-12 rounded-full border-2 border-red-500" src="${video.authors[0].profile_picture}" />
    </div>
    <div> 
      <h3 class="text-xl font-semibold">${video.title}</h3>
      <div class="flex gap-2">
      <p class="text-lg">${video.authors[0].profile_name}</p>
       <span>${video.authors[0].verified===true ? '<img class="w-6 mr-20 items-center" src="https://img.icons8.com/?size=100&id=QMxOVe0B9VzG&format=png&color=000000"/>' : ''
}</span>
      </div>
      <p>${video.others.views}</p>
    </div>
  </div>
  <div class="text-center pb-3">
   <button onclick="loadVideoDetails('${video.video_id}')" class="btn btn-wide hover:bg-red-600 hover:text-white">Details</button>
  </div>
</div>
        `
        videoContainer.appendChild(createDiv);
    })
    
}

const loadVideoDetails =async(videoId)=>{
    // console.log(videoId);
    
    const response = await fetch(`https://openapi.programming-hero.com/api/phero-tube/video/${videoId}`);
    const data = await response.json();
    // console.log(data.video);
    
    displayVideoDetails(data.video);
    
}
const displayVideoDetails =(video)=>{
    //  console.log(video);
    document.getElementById("video_details").showModal();
     
     const videoDetails = document.getElementById("video-content");
     
     videoDetails.innerHTML=`
        <img class="rounded-lg w-140" src="${video.thumbnail}" alt="">
        <p class="py-4">${video.title}</p>
        <p class="py-4">${video.description.slice(0,200)}</p>
        <div class="flex justify-between items-center">
            <p>Views:${video.others.views}</p>
            <p>Posted Date:${video.others.posted_date}</p>
        </div>
        

     `
     
}
document.getElementById("search-input").addEventListener("keydown",(e)=>{
 const title = e.target.value;
 loadVideos(title);

})
const makeHide=(id)=>{
    document.getElementById(id).style.display="none";
}
const show=(id)=>{
    document.getElementById(id).style.display="block";
}

loadCategories();