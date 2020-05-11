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
            {prop_id:1, tenants:["ten1", "ten2"], name: "הבית ברמת גן", address: "תלפיות 18, רמת גן",img_url:'https://properit.s3.amazonaws.com/house1.jpg'},
            {prop_id:2, tenants:["ten1", "ten2", "ten2"], name: "תל אביב צפון", address: "אחד העם 19, תל אביב",img_url:'https://properit.s3.amazonaws.com/house2.jpg'},
            {prop_id:3, tenants:["ten1", "ten2","ten1", "ten2"], name: "תל אביב מרכזי", address: "רוטשילד 68, תל אביב",img_url:'https://properit.s3.amazonaws.com/house3.jpg'},
            {prop_id:4, tenants:["ten1"], name: "Second Prop", address: "Address 2"},
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
const fetchDocuments = async (userId) => {
    return  new Promise(resolve => {
        setTimeout(() => resolve([
            {doc_id:1, digital_signatures:[{status:"signed", user:1},{status:"pending", user:2}], name: "חוזה שכירות", doc_location:'https://properit.s3.amazonaws.com/lease.pdf'},
            {doc_id:2, digital_signatures:[{status:"signed", user:1},{status:"pending", user:2}], name: "חוזה שכירות", doc_location:'https://properit.s3.amazonaws.com/lease.pdf'},
        ]), TIMEOUT)
    })
};
export {fetchImages,fetchProperties, fetchDocuments}