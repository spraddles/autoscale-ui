const scaleElements = (config) => {
  const containerElement = document.getElementById(config.id)

  const initialise = () => {
    if (containerElement) {
      const originalWidth = containerElement.offsetWidth
      setCSSvars('originalWidth', originalWidth)
      setCSSvars('ratio', `calc(var(--containerWidth) / var(--originalWidth))`)
      setCSSvars('fontSizeFactor', '2') // set number OR remove this rule & add 'font-size' to allPropsArray in CSS parsing
    }
  }

  const setContainer = () => {
    let dynamicContainerWidth = 0
    let dynamicContainerHeight = 0
    let dynamicContainerRatio = 0

    dynamicContainerWidth = window.innerWidth
    if (containerElement) {
      // width
      dynamicContainerRatio = dynamicContainerWidth / containerElement.offsetWidth
      containerElement.style.width = dynamicContainerWidth + 'px'
      setCSSvars('containerWidth', dynamicContainerWidth)
      // height
      dynamicContainerHeight = containerElement.offsetHeight * dynamicContainerRatio
      containerElement.style.height = dynamicContainerHeight + 'px'
      // other
      containerElement.style.position = 'absolute'
    }
  }

  const setCSSvars = (name, value) => {
    document.documentElement.style.setProperty(`--${name}`, value)
  }

  // run on initial page load
  window.onload = function () {
    if (document.readyState == 'complete') {
      initialise()
      setContainer()
    }
  }

  // run on each window resize
  window.onresize = function () {
    setContainer()
  }
}
