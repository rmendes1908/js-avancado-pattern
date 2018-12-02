export const fetchHandle = res => 
    res.ok ? res.json() : Promise.reject(res.statusText);