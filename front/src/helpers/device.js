const isMobileDevice = () => {
    if (
        /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)
        || window.matchMedia("only screen and (max-width: 480px)").matches
    ) {
        console.log("mobile")
        return true
    } else {
        console.log("desktop")
        return false
    }
}

export default isMobileDevice
