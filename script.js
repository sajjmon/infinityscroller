const imageContainer = document.getElementById('image-container');
const loader = document.getElementById('loader');

let photosArray = [];




//Unsplash API
const count = 10;
const apiKey = 'srSQnCwLw8EkTym58_TD5C6jwoA3mbKiN68x99naIpM';
const apiUrl = `https://api.unsplash.com/photos/random/?client_id=${apiKey}&count=${count}`;

// Helper function to set Attributes on DOM Elements
function setAttributes(element, attributes) {
    for (const key in attributes) {
        element.setAttribute(key, attributes[key]);
    }
}


//create elements for links and photos
function displayPhotos() {
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


    } catch (error) {

    }
}

// check to se if scrolling near bottom of page
window.addEventListener('scroll', () => {
    if (window.innerHeight + window.scrollY >= document.body.offsetHeight - 1000) {
        console.log('load more');
    }



});

// on load
getPhotos();