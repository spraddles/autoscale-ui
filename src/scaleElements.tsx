interface Config {
  id: string
}

const scaleElements = (config: Config) => {

  const containerElement = document.getElementById(config.id)

  const initialise = () => {
    if(containerElement) {
      const originalWidth = containerElement.offsetWidth
      setCSSvars('originalWidth', originalWidth)
      setCSSvars('ratio', 'calc(var(--containerWidth) / var(--originalWidth))')
    }
  }

  const setContainer = () => {

    let dynamicContainerWidth: number = 0
    let dynamicContainerHeight: number = 0
    let dynamicContainerRatio: number = 0

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

  const setCSSvars = (name: string, value: any) => {
    document.documentElement.style.setProperty(`--${name}`, value)
  }

  // run on initial page load
  window.onload = function() {
    if(document.readyState == 'complete') {
      initialise()
    }
  }

  // run on each window resize
  window.onresize = function() {
    setContainer()
  }
}
