const footerYear = document.querySelector('.footer__year')
const navMobile = document.querySelector('.nav-mobile')
const navBtn = document.querySelector('.nav-btn')
const navLinks = document.querySelectorAll('.nav__link')
const username = document.querySelector('#name')
const email = document.querySelector('#email')
const message = document.querySelector('#message')
const sendBtn = document.querySelector('.contact__box-right-btn')
const closeBtn = document.querySelector('.contact__popup-close')
const popup = document.querySelector('.contact__popup')
const inputs = [username, email, message]

function scrollSpy() {
	const sections = document.querySelectorAll('section')
	sections.forEach(section => {
		const sectionTop = section.offsetTop - 100
		const sectionHeight = section.offsetHeight
		const sectionId = section.getAttribute('id')
		const navLink = document.querySelector(`.nav__link[href="#${sectionId}"]`)
		if (window.pageYOffset >= sectionTop && window.pageYOffset < sectionTop + sectionHeight) {
			navLinks.forEach(link => link.classList.remove('active'))
			navLink.classList.add('active')
		} else {
			navLink.classList.remove('active')
		}
	})
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

const showError = (input, msg) => {
	const formBox = input.parentElement
	const errorMsg = formBox.querySelector('.error-text')

	formBox.classList.add('error')
	errorMsg.textContent = msg
}

const clearError = input => {
	const formBox = input.parentElement
	formBox.classList.remove('error')
}

const checkForm = input => {
	input.forEach(el => {
		if (el.value === '') {
			showError(el, el.nextElementSibling.textContent)
		} else {
			clearError(el)
		}
	})
}

const checkEmail = email => {
	const re =
		/^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,3}))$/
	if (re.test(email.value)) {
		clearError(email)
	} else {
		showError(email, 'E-mail jest niepoprawny')
	}
}

const checkErrors = () => {
	const allInputs = document.querySelectorAll('.contact__box-right-input-box')
	let errorCount = 0
	allInputs.forEach(el => {
		if (el.classList.contains('error')) {
			errorCount++
		}
	})

	if (errorCount === 0) {
		popup.classList.add('show-popup')
	}
}

const closePopup = () => {
	popup.classList.remove('show-popup')
	clearForm(inputs)
}

const clearForm = input => {
	input.forEach(input => {
		input.value = ''
	})
}

if (sendBtn) {
	sendBtn.addEventListener('click', e => {
		e.preventDefault()
		checkForm(inputs)
		checkEmail(email)
		checkErrors()
	})
}
const handleCurrentYear = () => {
	const year = new Date().getFullYear()
	footerYear.innerText = year
}
handleCurrentYear()

navBtn.addEventListener('click', handleNav)
window.addEventListener('scroll', scrollSpy)
if (closeBtn) {
	closeBtn.addEventListener('click', closePopup)
}
