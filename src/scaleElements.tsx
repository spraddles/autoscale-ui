interface Config {
  id: string
  gutter: number
  elements: {
    all: string[]
    text: string[]
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
      containerElement.style.position = 'relative'
      containerElement.style.marginLeft = config.gutter + 'px'
    }
  }

  // check for selector type
  const separateSelectors = () => {
    // all elements
    const allElementsArray = config.elements.all
    allElementsArray.forEach((element) => {
      // selector is an ID
      if (element.startsWith('#')) {
        const htmlElement = document.getElementById(element.replace('#', ''))
        if (htmlElement) {
          applyAllStyling(htmlElement as HTMLElement)
        }
      }
      // selector is a class
      if (element.startsWith('.')) {
        const htmlElements = document.querySelectorAll('.toggle')
        htmlElements.forEach((htmlElement) => {
          applyAllStyling(htmlElement as HTMLElement)
        })
      }
    })

    // text elements only
    const textElementsArray = config.elements.text
    textElementsArray.forEach((element) => {
      // selector is an ID
      if (element.startsWith('#')) {
        const htmlElement = document.getElementById(element.replace('#', ''))
        if (htmlElement) {
          applyTextStyling(htmlElement)
        }
      }
      // selector is a class
      if (element.startsWith('.')) {
        const htmlElements = document.querySelectorAll('.toggle')
        htmlElements.forEach((htmlElement) => {
          applyTextStyling(htmlElement as HTMLElement)
        })
      }
    })
  }

  // apply styling to all elements
  const applyAllStyling = (element: HTMLElement) => {
    element.style.width = dynamicContainerRatio * element.offsetWidth + 'px'
    element.style.height = dynamicContainerRatio * element.offsetHeight + 'px'
    // position
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

  // apply styling to text elements only
  const applyTextStyling = (element: HTMLElement) => {
    if (element && dynamicContainerRatio) {
      // font size
      const fontSize = parseFloat(window.getComputedStyle(element).fontSize.replace('px', ''))
      element.style.fontSize = dynamicContainerRatio * fontSize + 'px'
    }
  }

  // run on intial page load
  if (document.readyState === 'complete') {
    setContainerProps()
    separateSelectors()
  }

  // run on each window resize
  window.addEventListener('resize', () => {
    setContainerProps()
    separateSelectors()
  })
}
