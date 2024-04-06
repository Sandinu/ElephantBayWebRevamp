window.addEventListener('scroll', scrollReveal);

function scrollReveal() {
    let reveals = document.querySelectorAll(".reveal");

    for (let i = 0; i < reveals.length; i++) {
        let windowH = window.innerHeight;
        let revealH = reveals[i].getBoundingClientRect().top;
        let revealpoint = 150;
    
        if (revealH < windowH - revealpoint) {
            reveals[i].classList.add("appear");
        }else{
            reveals[i].classList.remove("appear");
        }
    }
};