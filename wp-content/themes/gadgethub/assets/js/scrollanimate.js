
// select all animated class
const animateClass = Array.from(document.querySelectorAll('.op-animated'));

// create intersection funtion
const handleIntersection = (entries, observer) => {
    entries.forEach((entry) => {
        if (entry.isIntersecting) {
            const animationClass = entry.target.classList
                .toString()
                .split(" ")
                .filter((className) => className.startsWith("animate__"))
                .map((animation) => animation.replace("animate__", ""));
            entry.target.classList.add(...animationClass);
            observer.unobserve(entry.target);
        }
    });
};

// extract intersection function
if (animateClass.length > 0) {
    const observer = new IntersectionObserver(handleIntersection);

    animateClass.forEach((element) => observer.observe(element));
}