const track = document.querySelector('.carousel__track')
const slides = Array.from(track.children)
const nextButton = document.querySelector('.carousel__button--right')
const prevButton = document.querySelector('.carousel__button--left')
const dotsNav = document.querySelector('.carousel__nav')
const dots = Array.from(dotsNav.children)


const paragraphs = document.querySelector('.carousel__description-container')
const arrayParagraphs = Array.from(paragraphs.children)

const slideSize = slides[0].getBoundingClientRect()
const slideWidth = slideSize.width

const setSlidePosition = (slide, index) => {
    slide.style.left = slideWidth * index + "px"
}

slides.forEach(setSlidePosition)

const moveToSlide = (track, currentSlide, targetSlide) => {
    currentSlide.querySelector('img').style = "display: none; transition: slide 2s ease-in-out;"
    currentSlide.classList.remove('current-slide')
    targetSlide.classList.add('current-slide')
    targetSlide.querySelector('img').style = "display: block; transition: slide 2s ease-in-out;"
}

const updateDots = (currentDot, targetDot) => {
    currentDot.classList.remove('current-slide')
    targetDot.classList.add('current-slide')
}
const updateParagraphs = (currentParagraph, targetParagraph) => {
    currentParagraph.classList.remove('current-slide')
    targetParagraph.classList.add('current-slide')
}

const hideShowArrows = (slides, prevButton, nextButton, targetIndex) => {
    if(targetIndex === 0){
        prevButton.classList.add('is-hidden')
        nextButton.classList.remove('is-hidden')
    }else if(targetIndex === slides.length - 1){
        prevButton.classList.remove('is-hidden')
        nextButton.classList.add('is-hidden')
    }else{
        prevButton.classList.remove('is-hidden')
        nextButton.classList.remove('is-hidden')
    }
}

prevButton.addEventListener('click', e => {
    const currentSlide = track.querySelector('.current-slide')
    const prevSlide = currentSlide.previousElementSibling
    const currentDot = dotsNav.querySelector('.current-slide')
    const prevDot = currentDot.previousElementSibling
    const currentParagraph = paragraphs.querySelector('.current-slide')
    const prevParagraph = currentParagraph.previousElementSibling
    const prevIndex = slides.findIndex(slide => slide === prevSlide)

    moveToSlide(track, currentSlide, prevSlide)
    updateDots(currentDot, prevDot)
    updateParagraphs(currentParagraph, prevParagraph)
    hideShowArrows(slides, prevButton, nextButton, prevIndex)
})


nextButton.addEventListener('click', e => {
    const currentSlide = track.querySelector('.current-slide')
    const nextSlide = currentSlide.nextElementSibling
    const currentDot = dotsNav.querySelector('.current-slide')
    const nextDot = currentDot.nextElementSibling
    const currentParagraph = paragraphs.querySelector('.current-slide')
    const nextParagraph = currentParagraph.nextElementSibling
    const nextIndex = slides.findIndex(slide => slide === nextSlide)
    

    moveToSlide(track, currentSlide, nextSlide)
    updateDots(currentDot, nextDot)
    updateParagraphs(currentParagraph, nextParagraph)
    hideShowArrows(slides, prevButton, nextButton, nextIndex)
})

dotsNav.addEventListener('click', e => {
    const targetDot = e.target.closest('button')
    if(!targetDot) return

    const currentSlide = track.querySelector('.current-slide')
    const currentDot = dotsNav.querySelector('.current-slide')
    const targetIndex = dots.findIndex(dot => dot === targetDot)
    const targetSlide = slides[targetIndex]
    const currentParagraph = paragraphs.querySelector('.current-slide')
    const targetParagraph = arrayParagraphs[targetIndex]


    moveToSlide(track, currentSlide, targetSlide)
    updateDots(currentDot, targetDot)
    updateParagraphs(currentParagraph, targetParagraph)
    hideShowArrows(slides, prevButton, nextButton, targetIndex)
})