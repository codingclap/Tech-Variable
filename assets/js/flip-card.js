function flip(card) {
    if (card.dataset.isFlipped == "true" || card.dataset.isFlipped == "") {
        card.dataset.isFlipped = false;
    } else {
        card.dataset.isFlipped = true;
    }
}

const cards = document.querySelectorAll('.card--inner');

for (let card of cards) {
    card.addEventListener('click', function() {
        flip(card);
    });
}