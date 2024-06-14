// Function to create a thumbnail with overlay icons
function createThumbnail(src, alt, galleryPageUrl, hasMultipleImages, hasVideo, hasYouTube) {
    const thumbnailLink = document.createElement("a");
    thumbnailLink.href = galleryPageUrl;

    const thumbnailDiv = document.createElement("div");
    thumbnailDiv.classList.add("thumbnail");

    const thumbnailImg = document.createElement("img");
    thumbnailImg.src = src;
    thumbnailImg.alt = alt;

    const thumbnailTitle = document.createElement("div");
    thumbnailTitle.classList.add("thumbnail-title");
    thumbnailTitle.innerText = alt;

    let iconIndex = 0;

    if (hasMultipleImages) {
        const multipleImagesIcon = document.createElement("i");
        multipleImagesIcon.className = "fa-solid fa-layer-group overlay-icon";
        multipleImagesIcon.style.left = `${10 + iconIndex * 30}px`;
        thumbnailDiv.appendChild(multipleImagesIcon);
        iconIndex++;
    }

    if (hasVideo) {
        const videoIcon = document.createElement("i");
        videoIcon.className = "fa-solid fa-video overlay-icon";
        videoIcon.style.left = `${10 + iconIndex * 30}px`;
        thumbnailDiv.appendChild(videoIcon);
        iconIndex++;
    }

    if (hasYouTube) {
        const youtubeIcon = document.createElement("i");
        youtubeIcon.className = "fa-brands fa-youtube overlay-icon";
        youtubeIcon.style.left = `${10 + iconIndex * 30}px`;
        thumbnailDiv.appendChild(youtubeIcon);
    }

    thumbnailDiv.appendChild(thumbnailImg);
    thumbnailDiv.appendChild(thumbnailTitle);
    thumbnailLink.appendChild(thumbnailDiv);

    return thumbnailLink;
}

// Get the thumbnail container element
const thumbnailContainer = document.getElementById("thumbnail-container");

// Function to fetch and parse the description.txt file
function fetchProjectData(projectName) {
    const descriptionPath = `../Projects/${projectName}/description.txt`;
    const mediaPath = `../Projects/${projectName}/media.txt`;

    return Promise.all([
        fetch(descriptionPath).then(response => response.text()),
        fetch(mediaPath).then(response => response.text())
    ])
    .then(([descriptionText, mediaText]) => {
        const [title, description, tags, thumbnailUrl, htmlFileName] = descriptionText.split('---').map(line => line.trim());
        const galleryPageUrl = descriptionPath.replace('description.txt', htmlFileName);

        const mediaLines = mediaText.split('\n').map(line => line.trim()).filter(line => line && !line.startsWith('#'));
        const hasMultipleImages = mediaLines.filter(line => line.match(/\.(jpeg|jpg|gif|png)$/)).length > 1;
        const hasVideo = mediaLines.some(line => line.match(/\.(mp4)$/));
        const hasYouTube = mediaLines.some(line => line.includes('youtube.com'));

        return { src: thumbnailUrl, alt: title, galleryPageUrl, hasMultipleImages, hasVideo, hasYouTube };
    })
    .catch(error => console.error('Error loading project data:', error));
}

// Function to fetch the projects.txt file
function fetchProjects() {
    return fetch('../Config/projects.txt')
        .then(response => response.text())
        .then(text => text.split('\n').map(line => line.trim()).filter(line => line))
        .catch(error => console.error('Error loading projects:', error));
}

// Fetch projects and create thumbnails
fetchProjects().then(projects => {
    projects.forEach(projectName => {
        fetchProjectData(projectName).then(artwork => {
            const thumbnail = createThumbnail(artwork.src, artwork.alt, artwork.galleryPageUrl, artwork.hasMultipleImages, artwork.hasVideo, artwork.hasYouTube);
            thumbnailContainer.appendChild(thumbnail);
        });
    });
});
