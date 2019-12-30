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

const menuLinkClass = 'menu__link';
const activeLinkClass = 'menu__link__active';
const activeSectionClass = 'activeSection';

let windowHeight = window.innerHeight;


/**
 * End Global Variables
 * Start Helper Functions
 * 
*/


// Store current window height
function updateWindowHeight() {

    windowHeight = window.innerHeight;

}

// Scroll to top
function scrollToTop() {

    window.scrollTo( 0, 0 );

}


/**
 * End Helper Functions
 * Begin Main Functions
 * 
*/

// Build navigation based on page content.
function buildNav() {

    let navHTML = '';
    let navContainer = document.querySelector( '#navbar__list' ); // Get a reference to the nav container element.
    const sections = document.querySelectorAll( 'section' ); // Store a non-live NodeList containing all section elements.

    // Scan through all sections and create links for the nav.
    for( const section of sections ) {

        let sectionTitle = section.getAttribute( 'data-nav' );
        navHTML += `<li class="menu__link" data-nav="${sectionTitle}">${sectionTitle}</li>`;

    }

    navContainer.innerHTML = navHTML; // Insert the new links into the nav element.

}


// Highlight the relevant link when a section is in view.
function setActiveLink( activeSectionName ) {

    // Remove previous active link class.
    if( document.querySelector( `.${activeLinkClass}` ) ){

        document.querySelector( `.${activeLinkClass}` ).setAttribute( 'class', menuLinkClass );

    }

    // Apply active link class to the proper link.
    document.querySelector( `li[data-nav="${activeSectionName}"]` ).setAttribute( 'class', menuLinkClass + ' ' + activeLinkClass );

}


// Add 'activeSection' class to section when near top of viewport.
function setActiveSection() {

    const sections = document.querySelectorAll( 'section' );
    const headerHeight = document.querySelector( 'header' ).offsetHeight;
    const bottomMinPos = ( ( windowHeight - headerHeight ) * 0.5 ) + headerHeight; // 50% of the browser window height, minus the header height.
    
    // Loop through each section element and determine if any meet the active criteria.
    for( const section of sections ) {

        const position = section.getBoundingClientRect();
        
        if( position.top < windowHeight && position.bottom > bottomMinPos ) {
            
            // Only apply the active class if it isn't detected on the current element.
            if( section.getAttribute( 'class' ) != activeSectionClass ) {

                // Remove activeSection class from previous active element.
                if( document.querySelector( `.${activeSectionClass}` ) ) {

                    document.querySelector( `.${activeSectionClass}` ).removeAttribute( 'class' );

                }

                // Apply activeSection class to the currently visible section.
                section.setAttribute( 'class', activeSectionClass );

                // Apply active style to matching link.
                setActiveLink( section.getAttribute( 'data-nav' ) );

            }

            break;

        }

    }

}


// Scroll to anchor ID using scrollTO event.
function scrollToSection( event ) {

    // Scroll to section if event is detected, otherwise scroll to top.
    if( event ) {

        const headerHeight = document.querySelector( 'header' ).offsetHeight;
        const sectionElement = document.querySelector( `section[data-nav="${event.target.innerText}"]` );
        const elementTop = sectionElement.offsetTop;

        window.scrollTo( 0, elementTop - headerHeight );

    }else{

        scrollToTop();

    }

}


// Show/Hide scroll to top button based on scroll position.
function updateScrollButtonDisplay() {

    if( window.scrollY > windowHeight ) {

        document.querySelector( '#scrollToTopButton' ).style.display = "block";

    }else{

        document.querySelector( '#scrollToTopButton' ).style.display = "none";

    }

}

/**
 * End Main Functions
 * Begin Events
 * 
*/

document.addEventListener( 'DOMContentLoaded', function () {

    buildNav();
    setActiveSection();
    scrollToSection();

    // Apply event handlers
    document.querySelector( '#navbar__list' ).addEventListener( 'click', scrollToSection ); // Apply click event handler to nav ul.
    document.querySelector( '#scrollToTopButton' ).addEventListener( 'click', scrollToTop ); // Apply click event handler to the scroll button.
    document.addEventListener( 'scroll', () => {
        setActiveSection();
        updateScrollButtonDisplay();
        }); // Apply active sections and scroll button event handler.
    window.addEventListener( 'resize', updateWindowHeight ); // Apply resize event handler to the main window object.

} );