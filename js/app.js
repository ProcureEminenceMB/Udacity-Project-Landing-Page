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
 * Define Global Variables
 * 
*/


/**
 * End Global Variables
 * Start Helper Functions
 * 
*/



/**
 * End Helper Functions
 * Begin Main Functions
 * 
*/

// Build navigation based on page content.
function buildNav(){

    let navHTML = '';
    let navContainer = document.querySelector( '#navbar__list' ); // Get a reference to the nav container element.

    const sections = document.querySelectorAll( 'section' ); // Store a non-live NodeList containing all section elements.

    // Scan through all sections and create links for the nav.
    for( const section of sections ){

        let sectionTitle = section.getAttribute( 'data-nav' );
        navHTML += `<li class="menu__link">${sectionTitle}</li>`;

    }

    navContainer.innerHTML = navHTML; // Insert the new links into the nav element.

}


// Add class 'activeSection' to section when near top of viewport.
function setActiveSection(){

}


// Scroll to anchor ID using scrollTO event.
function scrollToSection(){

}


/**
 * End Main Functions
 * Begin Events
 * 
*/

document.addEventListener('DOMContentLoaded', function (){
    
    buildNav();

    setActiveSection();

    scrollToSection();

    // apply the following event handlers
        // Scroll to section on link click

        // Set sections as active
});