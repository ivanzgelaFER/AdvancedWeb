const numberOfImages = 60;
const container = document.getElementById('imageContainer');

for (let i = 0; i < numberOfImages; i++) {
    const imgNum = i + 1;
    const imgSample = document.createElement('div');
    imgSample.classList.add('img-samples');
    const imgElement = document.createElement('img');
    imgElement.src = `imgs/${imgNum}.jpg`;
    imgElement.alt = 'img';
    imgSample.appendChild(imgElement);
    container.appendChild(imgSample);
}