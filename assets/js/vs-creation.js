const slideData = [
    {
        stackRank: 1,
        icon: './images/icons/javascript.png',
        name: 'JavaScript 1',
        title: 'JavaScript is a programming language that allows you to create dynamic webpages.',
        content: 'Lorem ipsum dolor sit amet consectetur, adipisicing elit. Earum dolorum illum quos, laudantium deleniti iste fugit reprehenderit velit magni explicabo. Vero magni iusto dignissimos! Cupiditate necessitatibus magni ut placeat consectetur.'
    },
    {
        stackRank: 2,
        icon: './images/icons/javascript.png',
        name: 'JavaScript 2',
        title: 'JavaScript is a programming language that allows you to create dynamic webpages.',
        content: 'Lorem ipsum dolor sit amet consectetur, adipisicing elit. Earum dolorum illum quos, laudantium deleniti iste fugit reprehenderit velit magni explicabo. Vero magni iusto dignissimos! Cupiditate necessitatibus magni ut placeat consectetur.'
    },
    {
        stackRank: 3,
        icon: './images/icons/javascript.png',
        name: 'JavaScript 3',
        title: 'JavaScript is a programming language that allows you to create dynamic webpages.',
        content: 'Lorem ipsum dolor sit amet consectetur, adipisicing elit. Earum dolorum illum quos, laudantium deleniti iste fugit reprehenderit velit magni explicabo. Vero magni iusto dignissimos! Cupiditate necessitatibus magni ut placeat consectetur.'
    },
    {
        stackRank: 4,
        icon: './images/icons/javascript.png',
        name: 'JavaScript 4',
        title: 'JavaScript is a programming language that allows you to create dynamic webpages.',
        content: 'Lorem ipsum dolor sit amet consectetur, adipisicing elit. Earum dolorum illum quos, laudantium deleniti iste fugit reprehenderit velit magni explicabo. Vero magni iusto dignissimos! Cupiditate necessitatibus magni ut placeat consectetur.'
    },
    {
        stackRank: 5,
        icon: './images/icons/javascript.png',
        name: 'JavaScript 5',
        title: 'JavaScript is a programming language that allows you to create dynamic webpages.',
        content: 'Lorem ipsum dolor sit amet consectetur, adipisicing elit. Earum dolorum illum quos, laudantium deleniti iste fugit reprehenderit velit magni explicabo. Vero magni iusto dignissimos! Cupiditate necessitatibus magni ut placeat consectetur.'
    }

]

function createSlide(slideDetails, addDummy=false) {
    const slide = document.createElement('div');
    slide.classList.add('slide');
    const rank = parseInt(slideDetails.stackRank);
    slide.dataset.stackRank = rank;

    if (addDummy) {
        slide.dataset.dummy = 'true';
    }

    const slideIcon = document.createElement('img');
    slideIcon.classList.add('slide-icon');
    slideIcon.src = slideDetails.icon;
    slideIcon.alt = 'icon';
    slide.appendChild(slideIcon);

    const slideName = document.createElement('h2');
    slideName.classList.add('slide-Name');
    slideName.innerText = slideDetails.name;
    slide.appendChild(slideName);

    const slideTitle = document.createElement('p');
    slideTitle.classList.add('slide-title');
    slideTitle.innerText = slideDetails.title;
    slide.appendChild(slideTitle);

    const slideContent = document.createElement('p');
    slideContent.classList.add('slide-content');
    slideContent.innerHTML = slideDetails.content;
    slide.appendChild(slideContent);

    return slide;
}

function addSlides(slidesContainer, slidesData, addOneDummy=false) {
    slidesContainer.innerHTML = '';
    for (data of slidesData) {
        const slide = createSlide(data);
        slidesContainer.appendChild(slide);
    }

    if (addOneDummy) {
        const dummySlide = createSlide(slidesData[0], true);
        slidesContainer.appendChild(dummySlide);
    }

    return true
}

const slidesContainer = document.querySelector('.slider-container');

addSlides(slidesContainer, slideData);


// create paginations

function createPagination(paginationSvgClass, howMany) {
    const svg = document.createElementNS('http://www.w3.org/2000/svg', 'svg');

    const circleRadius = 10;

    svg.setAttribute('viewBox', `0 0 ${howMany * 3 * circleRadius} ${circleRadius * 3}`);

    for (let i = 0; i < howMany; i++) {
        const circle = document.createElementNS('http://www.w3.org/2000/svg', 'circle');
        circle.setAttribute('cx', `${circleRadius * 1.5 * (2 * i + 1)}`);
        circle.setAttribute('cy', `${circleRadius * 1.5}`);
        circle.setAttribute('r', `${circleRadius}`);
        circle.setAttribute('class', 'pagination-circle');
        svg.appendChild(circle);
    }

    const paginationContainer = document.querySelector(paginationSvgClass);
    paginationContainer.innerHTML = '';
    paginationContainer.appendChild(svg);
}

function sleep(sec) {
    return new Promise(resolve => setTimeout(resolve, sec * 1000));
}
