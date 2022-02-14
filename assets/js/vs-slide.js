function moveToTop(slideClass) {
    const slides = document.getElementsByClassName(slideClass);

    for (let slide of slides) {
        slide.style.top = 0;
    }
}

async function arrangeSlides(slidesContainerClass, slideClass, minMargin=10) {
    /*
        This function spread the deck of slide on to the board
    */
    const slidesContainer = document.querySelector(slidesContainerClass);
    const slides = document.querySelectorAll(slideClass);

    const slideCount = slides.length;

    const slideContainerHeight = slidesContainer.offsetHeight;
    
    const slideHeight = slides[0].offsetHeight;
    
    const height = slideContainerHeight - slideHeight;
    
    const increment = height / (slides.length - 1) > minMargin ? height / (slides.length - 1) : minMargin;

    const decrement = 0.07; // change this value to adjust the scale of the slides
    
    let initialPos = 0;
    let initialScale = 1;
    let prevPos = 0;
    for (let i=1, len=slides.length; i<len+1; i++) {
        const slide = slidesContainer.querySelector(`[data-stack-rank="${i}"]`);

        let addedHeight = ((1-initialScale)/2)*slide.offsetHeight;
        slide.style.top = `${initialPos + addedHeight}px`;
        slide.style.zIndex = slideCount - parseInt(slide.dataset.stackRank);
        slide.style.transform = `scale(${initialScale})`;
        initialScale -= decrement;
        
        prevPos = initialPos;
        initialPos += increment;

        if (initialPos >= height) {
            initialPos = prevPos;
        }
    }
}

function showNslides(n, slidesContainerClass, slideClass, minMargin) {
    /*
        This function shows the first n slides of the deck
    */
    const slidesContainer = document.querySelector(slidesContainerClass);
    const slides = document.querySelectorAll(slideClass);
    const slideHeight = slides[0].offsetHeight;
    slidesContainer.style.height = `${slideHeight+ minMargin*n}px`;

    arrangeSlides(slidesContainerClass, slideClass, minMargin);
}

function slideContainerResizeObserver(slidesContainerClass, slideClass, numSlide2Show, minMargin) {
    /*
        This function observes the resize of the slides container and adjusts the slides accordingly
    */
    const slidesContainerObserver = new ResizeObserver(entries => {
        console.log('resize');
        for (entry of entries) {
            if (entry.contentRect.height > 0) {
                showNslides(numSlide2Show, slidesContainerClass, slideClass, minMargin);
            }
        }
    });

    const slidesContainer = document.querySelector(slidesContainerClass);
    slidesContainerObserver.observe(slidesContainer);
}

moveToTop('slide');
slideContainerResizeObserver('.slider-container', '.slide', 3, 15);


function changeOrderMoveDown(slideClass) {
    const slides = document.querySelectorAll(slideClass);

    for (let slide of slides) {
        const rank = parseInt(slide.dataset.stackRank);

        if (rank == 1) {
            slide.dataset.stackRank = slides.length;
            slide.dataset.position = 'last';
        } else {
            slide.dataset.stackRank = rank - 1;
            slide.dataset.position = 'anywhere';
        }
    }
}

async function nextSlide() {
    changeOrderMoveDown('.slide');
    await sleep(0.3);
    arrangeSlides('.slider-container', '.slide', 15);
}

function changeOrderMoveUp(slideClass) {
    const slides = document.querySelectorAll(slideClass);

    for (let slide of slides) {
        const rank = parseInt(slide.dataset.stackRank);

        if (rank == slides.length) {
            slide.dataset.stackRank = 1;
            slide.dataset.position = 'first';
        } else {
            slide.dataset.stackRank = rank + 1;
            slide.dataset.position = 'anywhere';
        }
    }
}

async function prevSlide() {
    changeOrderMoveUp('.slide');
    await sleep(0.3);
    arrangeSlides('.slider-container', '.slide', 15);
}

