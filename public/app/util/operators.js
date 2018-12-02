export const partialize = (fn, ...args) => fn.bind(null, ...args); 

export const compose = (...fns) => data => fns.reduceRight((dataParam, fn) => fn(dataParam), data);

export const pipe = (...fns) => data => fns.reduce((dataParam, fn) => fn(dataParam), data);

export const takeUntil = (times, fn) => () => times-- > 0 && fn();

export const debounceTimer = (milli, fn) => {
    let timer = 0;
    return () => {
        clearTimeout(timer);
        timer = setTimeout(fn, milli);
    }
}
