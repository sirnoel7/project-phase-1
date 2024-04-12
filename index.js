document.addEventListener('DOMContentLoaded', function () {
    // These select elements from the DOM
    const homeSection = document.getElementsByClassName('content');
    const galleryLink = document.querySelector('.navbar ul li:nth-child(1) a');
    const aboutLink = document.querySelector('.navbar ul li:nth-child(2) a');
    const contactLink = document.querySelector('.navbar ul li:nth-child(3) a');
    const artworkGallery = document.getElementById('artworkGallery');
    const searchInput = document.getElementById('searchInput');

    // these are event listeners for the navigation links on the side bar
    galleryLink.addEventListener('click', e => {
        e.preventDefault();
    //this prevents the default function from occurring which is to redirect to a separate html file known as homepage.
     displayHomePage();
   // this calls for the displayhomepage function to be done
    });

    aboutLink.addEventListener('click', e => {
        e.preventDefault();
        // this is for the about page
    });

    contactLink.addEventListener('click', e => {
        e.preventDefault();
        // this is for the contact page
    });

    // this array stores fetched artworks
    let artworksData = [];

    // this function fetches artworks from JSON file
    fetchArtworks();

    // this code is what enables the artworks to be fetched from the JSON file
    function fetchArtworks() {
        fetch('artworks.json')
            .then(response => response.json())
            .then(data => {
                artworksData = data;
                displayHomePage(); // this causes the homepage to be shown initially
                // this event listener is for the search input field
                searchInput.addEventListener('input', handleSearch);
            })
            .catch(error => console.error('Error fetching artworks:', error));
    }

    // this function causes the home pageto be automatically displayed
    function displayHomePage() {
        const artwork1Element = document.querySelector('.artwork1');
// this makes the coding easier as any change made to the html file is automatically carried over to the js fucntion 
        if (artwork1Element) {
            artworkGallery.innerHTML = artwork1Element.innerHTML;
        }
    }
    

    // this function handles search input
    function handleSearch() {
        const searchTerm = searchInput.value.trim().toLowerCase();
//this enables the searches to wrok regardless of casing(upper or lower)
        if (searchTerm) {
            displayArtworks(artworksData.filter(artwork =>
                artwork.title.toLowerCase().includes(searchTerm) ||
                artwork.artist.toLowerCase().includes(searchTerm)
            ));
        } else {
            displayHomePage();
        }
    }

    // this function shows artworks based on search
    function displayArtworks(artworks) {
        artworkGallery.innerHTML = '';
        artworks.forEach(artwork => {
            const div = document.createElement('div');
            div.classList.add('artwork');
            
            const img = document.createElement('img');
            img.classList.add('art');
            img.src = artwork.image;
            img.alt = artwork.title;
            
            const h3 = document.createElement('h3');
            h3.textContent = artwork.title;
            
            const artistParagraph = document.createElement('p');
            artistParagraph.textContent = `By ${artwork.artist}`;
            
            const descriptionParagraph = document.createElement('p');
            descriptionParagraph.textContent = artwork.description;
            
            div.appendChild(img);
            div.appendChild(h3);
            div.appendChild(artistParagraph);
            div.appendChild(descriptionParagraph);
            
            artworkGallery.appendChild(div);
        });
    }
    
});
