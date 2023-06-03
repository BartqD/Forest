const footerYear = document.querySelector('.footer__year')
const navMobile = document.querySelector('.nav-mobile')
const navBtn = document.querySelector('.nav-btn')
const navLinks = document.querySelectorAll('.nav__link')


function scrollSpy() {
    const sections = document.querySelectorAll('section[id]');

    sections.forEach(section => {
        const sectionTop = section.offsetTop -100 ;
        const sectionHeight = section.offsetHeight;
        const sectionId = section.getAttribute('id');
        const navLink = document.querySelector(`.nav__link[href="#${sectionId}"]`);

        if (window.pageYOffset >= sectionTop && window.pageYOffset < sectionTop + sectionHeight) {
            navLinks.forEach(link => link.classList.remove('active'));
            navLink.classList.add('active');
        } else {
            navLink.classList.remove('active');
        }
    });
}


const handleNav = () => {
	navBtn.classList.toggle('is-active')
	navMobile.classList.toggle('nav-mobile--active')
	navLinks.forEach(item => {
		item.addEventListener('click', () => {
			navMobile.classList.remove('nav-mobile--active')
			navBtn.classList.remove('is-active')
		})
	})

}

const handleCurrentYear = () => {
	const year = new Date().getFullYear()
	footerYear.innerText = year
}
handleCurrentYear()

navBtn.addEventListener('click', handleNav)
window.addEventListener('scroll', scrollSpy);

