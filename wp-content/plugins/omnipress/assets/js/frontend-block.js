let deviceType = 'Desktop';

( function ( ) {
    window.addEventListener( 'load', function () {
        this.window.addEventListener( 'resize', function () {
            if ( this.window.matchMedia( '(max-width: 768px)' ).matches ) {
                deviceType = 'Mobile';
            } else if ( this.window.matchMedia( '(max-width: 1024px)' ).matches ) {
                deviceType = 'Tablet';
            } else {
                deviceType = 'Desktop';
            }
        } );

        // Light box js
        const elements = document.querySelectorAll( '.op--has-lightbox' );

        if ( elements.length !== 0 && GLightbox ) {
            let opLightbox;

            elements.forEach( ( element ) => {
                opLightbox = GLightbox( {
                    elements: [element],
                } );

                element.addEventListener( 'click', ( e ) => {
                    e.stopPropagation();
                    e.preventDefault();
                    opLightbox.open();
                } );
            } );
        }
    } );
}() );
