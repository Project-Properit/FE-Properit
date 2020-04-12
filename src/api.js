const TIMEOUT=1000;
const fetchImages = () => {
    return new Promise(resolve => {
        setTimeout(() => resolve([
            {name: "First Image", number: 5},
            {name: "Second Image", number: 6},
        ]), TIMEOUT)
    })
    // const response = await fetch("URL");
    // const data = await response.json();
    // if (response.status >= 400) {
    //     throw new Error(data.errors);
    // }
    // return data;
};
export {fetchImages,}