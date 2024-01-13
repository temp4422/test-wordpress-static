/**
 * Theme Skin Js
 */

(function () {


    // Bottom To Top Scroll.
    function gadgethub_to_top_scroll() {

        const toTopBtn = document.querySelector(".op-scroll-to-top");
        let scrollPos = document.documentElement.scrollTop;
        const progressColor = "var(--wp--preset--color--primary)";

        let scrollHeight = document.documentElement.scrollHeight;
        let clientHeight = document.documentElement.clientHeight;

        let scrollCalc = scrollHeight - clientHeight;

        let scrollValue = Math.round((scrollPos * 100) / scrollCalc);

        if (scrollPos > 300) {
            toTopBtn.classList.add("show-to-top-btn");
        } else {
            toTopBtn.classList.remove("show-to-top-btn");
        }

        toTopBtn.addEventListener("click", () => {
            document.documentElement.scrollTop = 0;
        });

        toTopBtn.style.background = `conic-gradient(${progressColor} ${scrollValue}%, transparent ${scrollValue}%)`;


    }

    window.addEventListener('scroll', function () {
        gadgethub_to_top_scroll()
    });


})();