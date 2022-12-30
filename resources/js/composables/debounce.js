const debounce = (fn, wait = 1000) => {
    let timer = null;
    return function(...args) {
        clearTimeout(timer);
        const next = () => fn.apply(this, args);
        timer = setTimeout(next, wait);
    }
}

export default debounce;