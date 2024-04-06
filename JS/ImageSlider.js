let onSlide = false;

window.addEventListener('load', () => {
    autoSlide();
    const dots = document.querySelectorAll('.carousel_dot');
    for (let i = 0; i < dots.length; i++) {
        dots[i].addEventListener('click', () => slide(i))
    }
})

function autoSlide() {
    setInterval(() => {
       slide(getItemActiveIndex() + 1);
    }, 4000);
 }

 function slide(toIndex) {
   if (onSlide) {
       return;
   }
   onSlide = true;

   const itemsArray = Array.from(document.querySelectorAll(".carousel_item"));
   const itemActive = document.querySelector(".carousel_item__active");
   const itemActiveIndex = itemsArray.indexOf(itemActive);
   
   let newItemActive = null;

   if (toIndex >= itemsArray.length) {
       toIndex = 0;
   } else if (toIndex < 0) {
       toIndex = itemsArray.length - 1;
   }

   newItemActive = itemsArray[toIndex];

   // Determine slide direction
   const slideDirection = toIndex > itemActiveIndex ? "next" : "prev";

   // Add appropriate position class for new active item
   newItemActive.classList.add(`carousel_item__pos_${slideDirection}`);

   // Trigger reflow before adding next/prev classes to enable transition
   void newItemActive.offsetWidth; // This line forces a reflow

   // Add next/prev classes to start the transition
   newItemActive.classList.add(`carousel_item__${slideDirection}`);
   itemActive.classList.add(`carousel_item__${slideDirection}`);

   // Listen for transition end on the new active item
   newItemActive.addEventListener("transitionend", () => {
       // Remove all transition-related classes
       newItemActive.classList.remove(`carousel_item__pos_${slideDirection}`, `carousel_item__${slideDirection}`);
       itemActive.classList.remove(`carousel_item__${slideDirection}`);

       // Set new active item and reset onSlide flag
       itemActive.classList.remove("carousel_item__active");
       newItemActive.classList.add("carousel_item__active");
       onSlide = false;
   }, { once: true });

   // Update slide indicators
   slideIndicator(toIndex);
}


 function getItemActiveIndex() {
    const itemsArray = Array.from(document.querySelectorAll(".carousel_item"));
    const itemActive = document.querySelector(".carousel_item__active");
    const itemActiveIndex = itemsArray.indexOf(itemActive);
    return itemActiveIndex;
 }
 
 function slideIndicator(toIndex) {
    const dots = document.querySelectorAll(".carousel_dot");
    const dotActive = document.querySelector(".carousel_dot__active");
    const newDotActive = dots[toIndex];
 
    dotActive.classList.remove("carousel_dot__active");
    newDotActive.classList.add("carousel_dot__active");
 }