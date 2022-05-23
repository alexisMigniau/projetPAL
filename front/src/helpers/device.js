const isMobileDevice = () => {
    if (
        /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)
        || window.matchMedia("only screen and (max-width: 480px)").matches
    ) {
        return true
    } else {
        return false
    }
}

export default isMobileDevice
