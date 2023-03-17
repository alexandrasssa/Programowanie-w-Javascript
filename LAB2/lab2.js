const images = [
	{
		number: 1,
		src: "./image1.jpg",
	},
	{
		number: 2,
		src: "./image2.jpg",
	},
	{
		number: 3,
		src: "./image3.webp",
	},
]

const prev = document.querySelector(".prev")
const next = document.querySelector(".next")
let selected = 0
const imagesLength = images.length - 1

const updateBackgroundImage = index => {
	const sliderImg = document.querySelector(".slider img")
	sliderImg.src = images[index].src
}

const changeBackgroundImage = buttonType => {
	if (buttonType === "next") {
		selected = selected + 1
		if (selected > imagesLength) {
			selected = 0
			updateBackgroundImage(0)
		} else {
			updateBackgroundImage(selected)
		}
	}

	if (buttonType === "prev") {
		selected = selected - 1
		if (selected < 0) {
			selected = imagesLength
			updateBackgroundImage(imagesLength)
		} else {
			updateBackgroundImage(selected)
		}
	}
}

prev.addEventListener("click", () => changeBackgroundImage("prev"))
next.addEventListener("click", () => changeBackgroundImage("next"))

const numberedButtons = document.querySelectorAll(".menu_button")

const changeImgByIndex = event => {
	const index = event.target.getAttribute("imageIndex") * 1
	updateBackgroundImage(index - 1)
}

numberedButtons.forEach(button => {
	button.addEventListener("click", changeImgByIndex)
})

updateBackgroundImage(selected)

const startAutomaticSlide = () => {
	setInterval(() => {
		changeBackgroundImage("next")
	}, 5000)
}

startAutomaticSlide()
