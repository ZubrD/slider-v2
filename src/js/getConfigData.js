
export function getConfigData(elem) {
    const config = elem.parentNode.parentNode.querySelector("[data-type='config']");
    const ranger = elem.parentNode.parentNode.querySelector("[data-type='ranger']");
    const interval = ranger.querySelector("[data-type='interval']")
    const buttonFirst = ranger.querySelector("[data-type='btn-first']")
    const buttonSecond = ranger.querySelector("[data-type='btn-second']")
    console.log('Interval', interval.style.marginLeft)
    const forState = {
        intervalStyleWidth: interval.style.width,
    }
    
}