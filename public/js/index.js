// base container dimensions
const baseContainer = {
    id: 'container',
    width: 1804,
    height: 1000,
    ratio: 0.83
}
var dynamicContainerWidth = null
var dynamicContainerHeight = null
var dynamicContainerRatio = null

// set container
const setContainerDimensions = () => {
    const screenWidth = window.innerWidth
    const screenHeight = window.innerHeight
    const containerElement = document.getElementById(baseContainer.id)
    dynamicContainerWidth = screenWidth
    dynamicContainerHeight = screenHeight
    dynamicContainerRatio = (dynamicContainerWidth / baseContainer.width)
    containerElement.style.width = dynamicContainerWidth + 'px'
    containerElement.style.height = dynamicContainerHeight + 'px'
}

// resize other elements respectively
const resizeElements = () => {
    const allElementsArray = [
        'box-1',
        'box-2',
        'box-3',
        'cta-link',
        'letters',
        'title',
        'description',
        'cta-text',
        'cta-link-text'
    ]
    const textElementsArray = [
        'letters',
        'title',
        'description',
        'cta-text',
        'cta-link-text'
    ]
    // all elements need 'width, height, top, left' values
    allElementsArray.forEach((element, index) => {
        const theElement = document.getElementById(element)
        theElement.style.width = dynamicContainerRatio * theElement.offsetWidth + 'px'
        theElement.style.height = dynamicContainerRatio * theElement.offsetHeight + 'px'
        theElement.style.top = dynamicContainerRatio * theElement.offsetTop + 'px'
        theElement.style.left = dynamicContainerRatio * theElement.offsetLeft + 'px'
    })
    // text elements need 'font size' changes
    textElementsArray.forEach((element, index) => {
        const someElement = document.getElementById(element)
        const fontSizeRaw = window.getComputedStyle(someElement).fontSize
        const fontSize = fontSizeRaw.replace('px','')
        someElement.style.fontSize = dynamicContainerRatio * fontSize + 'px'
    })
}

setContainerDimensions()
resizeElements()

/* this is recursively breaking the sizing (for some reason):
window.addEventListener('resize', setContainerDimensions)
window.addEventListener('resize', resizeElements) */