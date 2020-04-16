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
const fetchProperties = async (userId) => {
     return  new Promise(resolve => {
        setTimeout(() => resolve([
            {prop_id:1, tenants:["ten1", "ten2"], name: "First Prop", address: "Address 1"},
            {prop_id:2, tenants:["ten1", "ten2"], name: "Second Prop", address: "Address 2"},
            {prop_id:3, tenants:["ten1", "ten2"], name: "Second Prop", address: "Address 2"},
            {prop_id:4, tenants:["ten1", "ten2"], name: "Second Prop", address: "Address 2"},
        ]), TIMEOUT)
    })
    // throw new Error("dsdsdsds");
    // const response = await fetch("http://fdfdsfdsfdsfdsfd");
    // const data = await response.json();
    // if (response.status >= 400) {
    //     throw new Error(data.errors);
    // }
    // return data;
};
export {fetchImages,fetchProperties}