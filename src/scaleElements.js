var scaleElements = function (config) {
    var containerElement = document.getElementById(config.id);
    var initialise = function () {
        if (containerElement) {
            var originalWidth = containerElement.offsetWidth;
            setCSSvars('originalWidth', originalWidth);
            setCSSvars('ratio', 'calc(var(--containerWidth) / var(--originalWidth))');
        }
    };
    var setContainer = function () {
        var dynamicContainerWidth = 0;
        var dynamicContainerHeight = 0;
        var dynamicContainerRatio = 0;
        dynamicContainerWidth = window.innerWidth;
        if (containerElement) {
            // width
            dynamicContainerRatio = dynamicContainerWidth / containerElement.offsetWidth;
            containerElement.style.width = dynamicContainerWidth + 'px';
            setCSSvars('containerWidth', dynamicContainerWidth);
            // height
            dynamicContainerHeight = containerElement.offsetHeight * dynamicContainerRatio;
            containerElement.style.height = dynamicContainerHeight + 'px';
            // other
            containerElement.style.position = 'absolute';
        }
    };
    var setCSSvars = function (name, value) {
        document.documentElement.style.setProperty("--".concat(name), value);
    };
    // run on initial page load
    window.onload = function () {
        if (document.readyState == 'complete') {
            initialise();
            setContainer();
        }
    };
    // run on each window resize
    window.onresize = function () {
        setContainer();
    };
};
