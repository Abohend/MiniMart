// load the navbar
fetch("./components/header.html")
.then(response => response.text())
.then(data => {
    document.getElementById('header').innerHTML = data;

    // toggle navbar
    const navToggle = document.querySelector('.nav-toggle');
    navToggle.addEventListener('click', () => {
        const navLinks = document.querySelector('.nav-links');
        navLinks.classList.toggle('nav-links-visible');
    });
});

// load the footer
fetch("./components/footer.html")
.then(response => response.text())
.then(data => {
    document.getElementById('footer').innerHTML = data;
})



