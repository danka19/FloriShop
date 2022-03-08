// let main = () => {
//
// 	const
// 		prevImg = function(e){
// 			let active = document.querySelector('.active');
// 			active.classList.remove('active');
//
// 			if(active.previousElementSibling == null){
// 				active.parentElement.lastElementChild.classList.add('active');
// 			}else{
// 				active.previousElementSibling.classList.add('active');
// 			}
// 		},
//
// 		nextImg = function(e){
// 			let active = document.querySelector('.active');
// 			active.classList.remove('active');
//
// 			if(active.nextElementSibling == null){
// 				active.parentElement.firstElementChild.classList.add('active');
// 			}else{
// 				active.nextElementSibling.classList.add('active');
// 			}
// 		},
//
// 		clickKey = function(e){
// 			if(e.which == 39) nextImg()
// 			else if(e.which == 37) prevImg()
// 		};
//
// 	let
// 		prev = document.querySelector('#prev'),
// 		next = document.querySelector('#next');
//
// 	prev.addEventListener('click', prevImg, false);
// 	next.addEventListener('click', nextImg, false);
// 	addEventListener('keydown', clickKey);
// }
//
// window.addEventListener('load', main, false);
var slides = document.querySelectorAll('#slides .slide');
var currentSlide = 0;
var slideInterval = setInterval(nextSlide,2000);

function nextSlide() {
 slides[currentSlide].className = 'slide';
 currentSlide = (currentSlide+1)%slides.length;
 slides[currentSlide].className = 'slide showing';
}