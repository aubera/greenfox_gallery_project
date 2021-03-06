//jshint esversion: 6

const pictures = [
  {title: 'Stone fern', src: 'assets/PA112754_1.jpg', description: 'CaptionBot: I think it\'s a close up of a green plant.'},
  {title: 'High castle', src: 'assets/PA112556_1.jpg', description: 'CaptionBot: I think it\'s a castle on top of a grass covered field.'},
  {title: 'Before sunrise', src: 'assets/PA122941_1.jpg', description: 'CaptionBot: I think it\'s a view of a large mountain in the background.'},
  {title: '50 shades of grey', src: 'assets/PA112770_1.jpg', description: 'CaptionBot: I think it\'s a view of a mountain.'},
  {title: 'Over the trees', src: 'assets/PA112787_1.jpg', description: 'CaptionBot: I think it\'s a group of people in a forest.'},
  {title: 'Look there', src: 'assets/PA112824_1.jpg', description: 'CaptionBot: "I think it\'s a man standing in front of a mountain."'},
  {title: 'Sunrise', src: 'assets/PA122918_1.jpg', description: 'CaptionBot: I think it\'s a large body of water with a mountain in the background.'},
  {title: 'Water fall', src: 'assets/PA112411_1.jpg', description: 'CaptionBot: I think it\'s a large waterfall over a body of water.'},
];

const body = document.getElementsByTagName('body')[0];
const mainImage = document.querySelector('.image');
const mainImageTitle = document.getElementsByTagName('h3')[0];
const mainImageDescription = document.getElementsByTagName('p')[0];
const thumbnails = document.querySelector('.thumbnails');
var rightButton = document.querySelector('.right');
var leftButton = document.querySelector('.left');
var actualImage = 0;
var xDown = null;
var yDown = null;

initPage(actualImage);

body.addEventListener("keydown", function(event){
  event.keyCode === 37 ? prevImage() : event.keyCode === 39 ? nextImage() : '';
});

leftButton.onclick = function() {
  prevImage();
};

rightButton.onclick = function() {
  nextImage();
};

document.addEventListener('touchstart', handleTouchStart, false);
document.addEventListener('touchmove', handleTouchMove, false);

function setMainImage(index) {
  mainImage.setAttribute('style', 'background-image: url(' + pictures[index].src + ')');
  mainImageTitle.innerHTML = pictures[index].title;
  mainImageDescription.innerHTML = pictures[index].description;
  for (let i = 0; i < document.getElementsByTagName('img').length; i++){
    document.getElementsByTagName('img')[i].classList.remove('selected');
  }
  document.getElementsByTagName('img')[index].classList.add('selected');
  actualImage = index;
}

function createThumbnails(index){
  var element = document.createElement('div');
  element.classList.add('element');
  element.onclick = ()=>{setMainImage(index);};
  var img = document.createElement('img');
  img.classList.add('thumb');
  img.setAttribute('src', pictures[index].src);
  var overlay = document.createElement('div');
  overlay.classList.add('overlay');
  var text = document.createElement('div');
  text.innerHTML = pictures[index].title;
  text.classList.add('text');
  overlay.appendChild(text);
  element.appendChild(img);
  element.appendChild(overlay);
  thumbnails.appendChild(element);
}

function initPage(index) {
  for (let i = 0; i < pictures.length; i++) {
    createThumbnails(i);
  }
  setMainImage(index);
}

function nextImage(){
  actualImage < pictures.length - 1 ? setMainImage(actualImage + 1) : setMainImage(0);
}

function prevImage(){
  actualImage > 0 ? setMainImage(actualImage - 1) : setMainImage(pictures.length - 1);
}

function getTouches(evt) {
  return evt.touches || // browser API
    evt.originalEvent.touches; // jQuery
}

function handleTouchStart(evt) {
  const firstTouch = getTouches(evt)[0];
  xDown = firstTouch.clientX;
  yDown = firstTouch.clientY;
}

function handleTouchMove(evt) {
  if (!xDown || !yDown) {
    return;
  }
  var xUp = evt.touches[0].clientX;
  var yUp = evt.touches[0].clientY;
  var xDiff = xDown - xUp;
  var yDiff = yDown - yUp;
  if (Math.abs(xDiff) > Math.abs(yDiff)) {
    if (xDiff > 0) {
      nextImage();
    } else {
      prevImage();
    }
  }
  xDown = null;
  yDown = null;
}
