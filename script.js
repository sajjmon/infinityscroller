const imageContainer = document.getElementById('image-container');
const loader = document.getElementById('loader');
let ready = false;
let imagesLoaded = 0;
let totalImages = 0;
let photosArray = [];
let isInitialLoad = true


//Unsplash API
let initialCount = 5;
const apiKey = 'srSQnCwLw8EkTym58_TD5C6jwoA3mbKiN68x99naIpM';
const apiUrl = `https://api.unsplash.com/photos/random/?client_id=${apiKey}&count=${initialCount}`;


function updateAPIURLWithNewCount(picCount) {
    apiUrl = `https://api.unsplash.com/photos/random?client_id=${apiKey}&count=${picCount}`;
}
// checking if all images where loaded
function imageLoaded() {
    imagesLoaded++;

    if (imagesLoaded === totalImages) {
        ready = true;
        loader.hidden = true;

    }
}

// Helper function to set Attributes on DOM Elements
function setAttributes(element, attributes) {
    for (const key in attributes) {
        element.setAttribute(key, attributes[key]);
    }
}


//create elements for links and photos
function displayPhotos() {
    imagesLoaded = 0;
    totalImages = photosArray.length;

    photosArray.forEach((photo) => {
        // create <a> to link to unsplash
        const item = document.createElement('a');
        setAttributes(item, {
            href: photo.links.html,
            target: '_blank',
        });
        // create <img> for photo
        const img = document.createElement('img');
        setAttributes(img, {
            src: photo.urls.regular,
            alt: photo.alt_description,
            title: photo.alt_description,

        });

        //event listener, check when each is finished loading
        img.addEventListener('load', imageLoaded);
        // put <img> inside <a>
        item.appendChild(img);
        imageContainer.appendChild(item);

    });
}


// Get photos from Unsplash API
async function getPhotos()  {
    try {
        const response = await fetch(apiUrl);
        photosArray = await response.json();
        displayPhotos();
        if (isInitialLoad) {
            updateAPIURLWithNewCount(30)
            isInitialLoad = false
        }
    } catch (error) {

    }
}

// check to se if scrolling near bottom of page
window.addEventListener('scroll', () => {
    if (window.innerHeight + window.scrollY >= document.body.offsetHeight - 1000 && ready) {
        ready = false;
        getPhotos();

    }



});

// on load
getPhotos();