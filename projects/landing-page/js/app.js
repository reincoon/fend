/**
 * 
 * Manipulating the DOM exercise.
 * Exercise programmatically builds navigation,
 * scrolls to anchors from navigation,
 * and highlights section in viewport upon scrolling.
 * 
 * Dependencies: None
 * 
 * JS Version: ES2015/ES6
 * 
 * JS Standard: ESlint
 * 
*/

/**
 * Comments should be present at the beginning of each procedure and class.
 * Great to have comments before crucial code sections within the procedure.
*/

/**
 * Define Global Variables
 * 
*/
const sections = [...document.querySelectorAll('section')];
const navList = document.querySelector('#navbar__list');
/**
 * End Global Variables
 * Start Helper Functions
 * 
*/
function isInViewport(item, offset = 300) {
    const rectangle = item.getBoundingClientRect();
    const windowHeight = window.innerHeight || document.documentElement.clientHeight;
    return (
        rectangle.left >= 0 &&
        rectangle.top >= -offset &&
        rectangle.right <= (window.innerWidth || document.documentElement.clientWidth) &&
        rectangle.bottom <= (windowHeight + offset)
    );
}


/**
 * End Helper Functions
 * Begin Main Functions
 * 
*/

// build the nav
function buildNavMenu() {
    const fragment = document.createDocumentFragment();

    sections.forEach(section => {
        const listItem = document.createElement('li');
        const anchor = document.createElement('a');
    
        anchor.classList.add('menu__link');

        anchor.href = `#${section.id}`;
        anchor.textContent = section.getAttribute('data-nav');
    
        listItem.appendChild(anchor);
        fragment.appendChild(listItem);
    });
  
    navList.appendChild(fragment);
}

// Add class 'active' to section when near top of viewport
function activeSection() {
    sections.forEach(section => {
        const sectionItem = document.querySelector(`#${section.id}`);
        const navItem = document.querySelector(`[href="#${section.id}"]`);
    
        if (isInViewport(sectionItem)) {
            // Set sections as active
            sectionItem.classList.add('your-active-class');
            navItem.classList.add('active');
        } else {
            sectionItem.classList.remove('your-active-class');
            navItem.classList.remove('active');
        }
    });
}

// Scroll to anchor ID using scrollTO event
navList.addEventListener('click', event => {
    event.preventDefault();
    
    if (event.target.tagName === 'A') {
        const sectionId = event.target.getAttribute('href').slice(1);
        const section = document.querySelector(`#${sectionId}`);
        section.scrollIntoView({ behavior: 'smooth' });
        const navItem = document.querySelector(`[href="#${sectionId}"]`);
        navItem.classList.add('active');
        
    }
});

/**
 * End Main Functions
 * Begin Events
 * 
*/

// Build menu 
buildNavMenu();
// Scroll to section on link click
document.addEventListener('scroll', activeSection);




