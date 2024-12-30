function changeImage() {
    const image1 = document.getElementById('image1');
    const image2 = document.getElementById('image2');
    if (image1.style.display === 'none') {
        image1.style.display = 'block';
        image2.style.display = 'none';
    } else {
        image1.style.display = 'none';
        image2.style.display = 'block';
    }
}

document.getElementById('nav-toggle').addEventListener('click', function() {
    const menu = document.getElementById('nav-menu');
    if (menu.style.display === 'block') {
        menu.style.display = 'none';
    } else {
        menu.style.display = 'block';
    }
});

function toggleCard() {
    const content = document.querySelector('.card-content');
    if (content.style.display === 'block') {
        content.style.display = 'none';
    } else {
        content.style.display = 'block';
    }
}
