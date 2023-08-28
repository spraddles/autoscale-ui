function scaleElements(config) {

    let dynamicContainerWidth = 0
    let dynamicContainerHeight = 0
    let dynamicContainerRatio = 0

    const containerElement = document.getElementById(config.id)

    const setContainerProps = () => {
        dynamicContainerWidth = window.innerWidth - config.gutter * 2
        if (containerElement) {
            dynamicContainerRatio = dynamicContainerWidth / containerElement.offsetWidth
            containerElement.style.width = dynamicContainerWidth + 'px'
            dynamicContainerHeight = containerElement.offsetHeight * dynamicContainerRatio
            containerElement.style.height = dynamicContainerHeight + 'px'
            containerElement.style.position = 'relative'
            containerElement.style.marginLeft = config.gutter + 'px'
        }
    }

    const separateSelectors = () => {
        const allElementsArray = config.elements.all
        allElementsArray.forEach((element) => {
            // id's
            if (element.startsWith('#')) {
                const htmlElement = document.getElementById(element.replace('#', ''))
                if (htmlElement) {
                    applyAllStyling(htmlElement)
                }
            }
            // classes
            if (element.startsWith('.')) {
                const htmlElements = document.querySelectorAll(element)
                htmlElements.forEach((htmlElement) => {
                    applyAllStyling(htmlElement)
                })
            }
        })

        const textElementsArray = config.elements.text
        textElementsArray.forEach((element) => {
            if (element.startsWith('#')) {
                const htmlElement = document.getElementById(element.replace('#', ''))
                if (htmlElement) {
                    applyTextStyling(htmlElement)
                }
            }
            if (element.startsWith('.')) {
                const htmlElements = document.querySelectorAll(element)
                htmlElements.forEach((htmlElement) => {
                    applyTextStyling(htmlElement)
                })
            }
        })
    }

    const applyAllStyling = (element) => {
        element.style.width = dynamicContainerRatio * element.offsetWidth + 'px'
        element.style.height = dynamicContainerRatio * element.offsetHeight + 'px'
        element.style.top = dynamicContainerRatio * element.offsetTop + 'px'
        element.style.left = dynamicContainerRatio * element.offsetLeft + 'px'
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

    const applyTextStyling = (element) => {
        if (element && dynamicContainerRatio) {
            const fontSize = parseFloat(window.getComputedStyle(element).fontSize.replace('px', ''))
            element.style.fontSize = dynamicContainerRatio * fontSize + 'px'
        }
    }

    window.addEventListener('load', () => {
        console.log('load')
        setContainerProps()
        separateSelectors()
    })

    window.addEventListener('resize', () => {
        console.log('resize')
        setContainerProps()
        separateSelectors()
    })
}