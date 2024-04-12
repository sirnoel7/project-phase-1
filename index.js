document.addEventListener('DOMContentLoaded', function () {
    // These select elements from the DOM
    const homeSection = document.getElementsByClassName('content');
    const galleryLink = document.querySelector('.navbar ul li:nth-child(1) a');
    const aboutLink = document.querySelector('.navbar ul li:nth-child(2) a');
    const contactLink = document.querySelector('.navbar ul li:nth-child(3) a');
    const artworkGallery = document.getElementById('artworkGallery');
    const searchInput = document.getElementById('searchInput');

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
        // this clears the content of the artworkGallery element
        artworkGallery.innerHTML = '';
    
        // this iterate overs each artwork in the artworks array
        artworks.forEach(function(artwork) {
            //this  creates a new div element for each artwork
            const div = document.createElement('div');
            
            //this adds the 'artwork' class to the div element
            div.classList.add('artwork');
            
            // this creates an img element for the artwork
            const img = document.createElement('img');
            
            //this adds the 'art' class to the img element
            img.classList.add('art');
            
            //this sets the src attribute of the img element to the artwork's image URL
            img.src = artwork.image;
            
            //this sets the alt attribute of the img element to the artwork's title
            img.alt = artwork.title;
            
            //this creates a h3 element for the artwork's title
            const h3 = document.createElement('h3');
            
            //this sets the text content of the h3 element to the artwork's title
            h3.textContent = artwork.title;
            
            //this creates a p(paragraph) element for the artist information
            const artistParagraph = document.createElement('p');
            
            // this sets the text content of the artist paragraph to include the artist's name
            artistParagraph.textContent = 'By ' + artwork.artist;
            
            //this creates a p(paragraph) element for the artwork's description
            const descriptionParagraph = document.createElement('p');
            
            //this sets the text content of the description paragraph to the artwork's description
            descriptionParagraph.textContent = artwork.description;
            
            //this code appends the img, h3, artistParagraph, and descriptionParagraph elements to the div element
            div.appendChild(img);
            div.appendChild(h3);
            div.appendChild(artistParagraph);
            div.appendChild(descriptionParagraph);
            
            //this appends(basically adds it to the end of) the div element to the artworkGallery element
            artworkGallery.appendChild(div);
        });
    }
});