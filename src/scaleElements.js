var scaleElements = function (config) {
    var dynamicContainerWidth = 0;
    var dynamicContainerHeight = 0;
    var dynamicContainerRatio = 0;
    var containerElement = document.getElementById(config.id);
    // set container
    var setContainerProps = function () {
        dynamicContainerWidth = window.innerWidth - config.gutter * 2;
        if (containerElement) {
            // width
            dynamicContainerRatio = dynamicContainerWidth / containerElement.offsetWidth;
            containerElement.style.width = dynamicContainerWidth + 'px';
            // height
            dynamicContainerHeight = containerElement.offsetHeight * dynamicContainerRatio;
            containerElement.style.height = dynamicContainerHeight + 'px';
            // other
            containerElement.style.position = 'relative';
            containerElement.style.marginLeft = config.gutter + 'px';
        }
    };
    // check for selector type
    var separateSelectors = function () {
        // all elements
        var allElementsArray = config.elements.all;
        allElementsArray.forEach(function (element) {
            // selector is an ID
            if (element.startsWith('#')) {
                var htmlElement = document.getElementById(element.replace('#', ''));
                if (htmlElement) {
                    applyAllStyling(htmlElement);
                }
            }
            // selector is a class
            if (element.startsWith('.')) {
                var htmlElements = document.querySelectorAll('.toggle');
                htmlElements.forEach(function (htmlElement) {
                    applyAllStyling(htmlElement);
                });
            }
        });
        // text elements only
        var textElementsArray = config.elements.text;
        textElementsArray.forEach(function (element) {
            // selector is an ID
            if (element.startsWith('#')) {
                var htmlElement = document.getElementById(element.replace('#', ''));
                if (htmlElement) {
                    applyTextStyling(htmlElement);
                }
            }
            // selector is a class
            if (element.startsWith('.')) {
                var htmlElements = document.querySelectorAll('.toggle');
                htmlElements.forEach(function (htmlElement) {
                    applyTextStyling(htmlElement);
                });
            }
        });
    };
    // apply styling to all elements
    var applyAllStyling = function (element) {
        element.style.width = dynamicContainerRatio * element.offsetWidth + 'px';
        element.style.height = dynamicContainerRatio * element.offsetHeight + 'px';
        // position
        element.style.top = dynamicContainerRatio * element.offsetTop + 'px';
        element.style.left = dynamicContainerRatio * element.offsetLeft + 'px';
        // margins
        element.style.marginLeft =
            dynamicContainerRatio *
                parseFloat(window.getComputedStyle(element).marginLeft.replace('px', '')) +
                'px';
        element.style.marginRight =
            dynamicContainerRatio *
                parseFloat(window.getComputedStyle(element).marginRight.replace('px', '')) +
                'px';
        element.style.marginTop =
            dynamicContainerRatio *
                parseFloat(window.getComputedStyle(element).marginTop.replace('px', '')) +
                'px';
        element.style.marginBottom =
            dynamicContainerRatio *
                parseFloat(window.getComputedStyle(element).marginBottom.replace('px', '')) +
                'px';
        // padding
        element.style.paddingLeft =
            dynamicContainerRatio *
                parseFloat(window.getComputedStyle(element).paddingLeft.replace('px', '')) +
                'px';
        element.style.paddingRight =
            dynamicContainerRatio *
                parseFloat(window.getComputedStyle(element).paddingRight.replace('px', '')) +
                'px';
        element.style.paddingTop =
            dynamicContainerRatio *
                parseFloat(window.getComputedStyle(element).paddingTop.replace('px', '')) +
                'px';
        element.style.paddingBottom =
            dynamicContainerRatio *
                parseFloat(window.getComputedStyle(element).paddingBottom.replace('px', '')) +
                'px';
    };
    // apply styling to text elements only
    var applyTextStyling = function (element) {
        if (element && dynamicContainerRatio) {
            // font size
            var fontSize = parseFloat(window.getComputedStyle(element).fontSize.replace('px', ''));
            element.style.fontSize = dynamicContainerRatio * fontSize + 'px';
        }
    };
    // run on intial page load
    if (document.readyState === 'complete') {
        setContainerProps();
        separateSelectors();
    }
    // run on each window resize
    window.addEventListener('resize', function () {
        setContainerProps();
        separateSelectors();
    });
};
