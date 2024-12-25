function changeImage() {
    var image1 = document.getElementById('image1');
    var image2 = document.getElementById('image2');
    if (image1.style.display === 'none') {
        image1.style.display = 'block';
        image2.style.display = 'none';
    } else {
        image1.style.display = 'none';
        image2.style.display = 'block';
    }
}