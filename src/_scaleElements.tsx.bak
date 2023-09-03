interface Config {
  id: string
  gutter: number
  elements: {
    all: string[]
    text: string[]
    images: string[]
  }
}

const scaleElements = (config: Config) => {
  let dynamicContainerWidth: number = 0
  let dynamicContainerHeight: number = 0
  let dynamicContainerRatio: number = 0
  const containerElement = document.getElementById(config.id)

  // set container
  const setContainerProps = () => {
    dynamicContainerWidth = window.innerWidth - config.gutter * 2
    if (containerElement) {
      // width
      dynamicContainerRatio = dynamicContainerWidth / containerElement.offsetWidth
      containerElement.style.width = dynamicContainerWidth + 'px'
      // height
      dynamicContainerHeight = containerElement.offsetHeight * dynamicContainerRatio
      containerElement.style.height = dynamicContainerHeight + 'px'
      // other
      containerElement.style.position = 'absolute'
      containerElement.style.marginLeft = config.gutter + 'px'
    }
  }

  // check for selector type
  const separateSelectors = () => {

    // non-text elements
    const nonTextElementsArray = config.elements.all
    nonTextElementsArray.forEach((element) => {
      if (element.startsWith('#')) { // selector is an ID
        const htmlElement = document.getElementById(element.replace('#', ''))
        if (htmlElement) {
          applyNonTextElementStyling(htmlElement as HTMLElement)
        }
      }
      if (element.startsWith('.')) { // selector is a class
        const htmlElements = document.querySelectorAll(element)
        htmlElements.forEach((htmlElement) => {
          applyNonTextElementStyling(htmlElement as HTMLElement)
        })
      }
    })

    // text elements
    const textElementsArray = config.elements.text
    textElementsArray.forEach((element) => {
      if (element.startsWith('#')) { // selector is an ID
        const htmlElement = document.getElementById(element.replace('#', ''))
        if (htmlElement) {
          applyTextStyling(htmlElement as HTMLElement)
        }
      }
      if (element.startsWith('.')) { // selector is a class
        const htmlElements = document.querySelectorAll(element)
        htmlElements.forEach((htmlElement) => {
          applyTextStyling(htmlElement as HTMLElement)
        })
      }
    })

    // image elements
    const imageElementsArray = config.elements.images
    imageElementsArray.forEach((element) => {
      if (element.startsWith('#')) { // selector is an ID
        const htmlElement = document.getElementById(element.replace('#', ''))
        if (htmlElement) {
          applyImageStyling(htmlElement as HTMLElement)
        }
      }
      if (element.startsWith('.')) { // selector is a class
        const htmlElements = document.querySelectorAll(element)
        htmlElements.forEach((htmlElement) => {
          applyImageStyling(htmlElement as HTMLElement)
        })
      }
    })
  }

  // apply styling to non-text elements
  const applyNonTextElementStyling = (element: HTMLElement) => {
    element.style.width = dynamicContainerRatio * element.offsetWidth + 'px'
    element.style.height = dynamicContainerRatio * element.offsetHeight + 'px'
    // position
    element.style.position = 'absolute'
    element.style.top = dynamicContainerRatio * element.offsetTop + 'px'
    element.style.left = dynamicContainerRatio * element.offsetLeft + 'px'
    // margins
    element.style.marginLeft =
      dynamicContainerRatio *
      parseFloat(window.getComputedStyle(element).marginLeft.replace('px', '')) +
      'px'
    element.style.marginRight =
      dynamicContainerRatio *
      parseFloat(window.getComputedStyle(element).marginRight.replace('px', '')) +
      'px'
    element.style.marginTop =
      dynamicContainerRatio *
      parseFloat(window.getComputedStyle(element).marginTop.replace('px', '')) +
      'px'
    element.style.marginBottom =
      dynamicContainerRatio *
      parseFloat(window.getComputedStyle(element).marginBottom.replace('px', '')) +
      'px'
    // padding
    element.style.paddingLeft =
      dynamicContainerRatio *
      parseFloat(window.getComputedStyle(element).paddingLeft.replace('px', '')) +
      'px'
    element.style.paddingRight =
      dynamicContainerRatio *
      parseFloat(window.getComputedStyle(element).paddingRight.replace('px', '')) +
      'px'
    element.style.paddingTop =
      dynamicContainerRatio *
      parseFloat(window.getComputedStyle(element).paddingTop.replace('px', '')) +
      'px'
    element.style.paddingBottom =
      dynamicContainerRatio *
      parseFloat(window.getComputedStyle(element).paddingBottom.replace('px', '')) +
      'px'
  }

  // apply styling to text elements
  const applyTextStyling = (element: HTMLElement) => {
    if (element && dynamicContainerRatio) {
      // position
      element.style.position = 'absolute'
      // font size
      const fontSize = parseFloat(window.getComputedStyle(element).fontSize.replace('px', ''))
      element.style.fontSize = dynamicContainerRatio * fontSize + 'px'
      // line height
      const lineHeight = parseFloat(window.getComputedStyle(element).lineHeight.replace('px', ''))
      element.style.lineHeight = dynamicContainerRatio * lineHeight + 'px'
    }
  }

  // apply styling to image elements
  const applyImageStyling = (element: HTMLElement) => {
    if (element && dynamicContainerRatio) {
      // position
      element.style.position = 'absolute'
      element.style.backgroundSize = 'cover'
      element.style.backgroundRepeat = 'no-repeat'
      element.style.backgroundPosition = 'center center'
    }
  }

  // run on initial page load
  window.onload = function() {
    console.log('onload')
    setContainerProps()
    separateSelectors()
  }

  // run on each window resize
  window.onresize = function() {
    console.log('onresize')
    setContainerProps()
    separateSelectors()
  }
}
