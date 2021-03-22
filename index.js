const selectedItems = [];
const productItems = [
    {
        name: 'Product 1',
        price: 100000,
        image: './images/product-1.png',
        type: 'woman',
        description: 'This is a description of product 1'
    },
    {
        name: 'Product 2',
        price: 200000,
        image: './images/product-2.png',
        type: 'woman',
        description: 'This is a description of product 2'
    },
    {
        name: 'Product 3',
        price: 300000,
        image: './images/product-3.png',
        type: 'woman',
        description: 'This is a description of product 3'
    },
    {
        name: 'Product 4',
        price: 100000,
        image: './images/product-4.png',
        type: 'men',
        description: 'This is a description of product 4'
    },
    {
        name: 'Product 5',
        price: 200000,
        image: './images/product-5.png',
        type: 'men',
        description: 'This is a description of product 5'
    },
    {
        name: 'Product 6',
        price: 300000,
        image: './images/product-6.png',
        type: 'men',
        description: 'This is a description of product 6'
    }
]

function createProduct(ProductList){
    const productItemElem = document.createElement("div");
    productItemElem.classList.add("product-item");

    // Image Product
    const productImageElem = document.createElement("img");
    productImageElem.setAttribute("src", ProductList.image);
    productItemElem.appendChild(productImageElem);

    // Name product
    const productNameElem = document.createElement("h5");
    productNameElem.classList.add("name-product");
    productNameElem.innerHTML = ProductList.name;
    productItemElem.appendChild(productNameElem);

    // Description product
    const productdescriptionElem = document.createElement("p");
    productdescriptionElem.classList.add("content-product");
    productdescriptionElem.innerHTML = ProductList.description;
    productItemElem.appendChild(productdescriptionElem);

    // Price product
    const productPriceElem = document.createElement("small");
    productPriceElem.classList.add("price-product");
    productPriceElem.innerHTML = `<strong>${ProductList.price}</strong> VND`;
    productItemElem.appendChild(productPriceElem);

    // Button product
    const productButtonElem = document.createElement("button");
    productButtonElem.classList.add("button-product");
    productButtonElem.addEventListener("click", () => badgeIncreasement(ProductList))
    productButtonElem.innerHTML = "ADD TO CART";
    productItemElem.appendChild(productButtonElem);

    return productItemElem;
}

function womanProduct(productList){
    const womanCol = document.getElementById("Woman-product");
    while (womanCol.hasChildNodes()) {
        womanCol.removeChild(womanCol.firstChild);
    }
    const womanProductList = productList.filter(x=>x.type === 'woman');
    womanProductList.forEach(element => {
        const colElem = document.createElement("div");
        colElem.classList.add('col-4');
        womanCol.appendChild(colElem)
        colElem.appendChild(createProduct(element));
    });
}

function manProduct(productList){
    const manCol = document.getElementById("Man-product");
    while (manCol.hasChildNodes()) {
        manCol.removeChild(manCol.firstChild);
    }
    const manProductList = productList.filter(x=>x.type === 'men');
    manProductList.forEach(element => {
        const col = document.createElement("div");
        col.classList.add('col-4');
        manCol.appendChild(col)
        col.appendChild(createProduct(element));
    });
}

// Create filter min/max value
// function filterProduct(productList){
//     const filterButtonElem = document.getElementById("filter-button");
//     filterButtonElem.addEventListener("click", (e) => {
//         e.preventDefault();

//         const minVal = document.getElementById("min-price-id").value;
//         const maxVal = document.getElementById("max-price-id").value;
//         const filterList = productList.filter(product =>product.price >= minVal && product.price <= maxVal)
//         if (minVal === '' && maxVal === ''){
//             manProduct(productList)
//             womanProduct(productList)
//         }
//         // Re-generate the product items
//         manProduct(filterList)
//         womanProduct(filterList)
//     })
// }

const filterButtonElem = document.getElementById("filter-button");
filterButtonElem.addEventListener('click', (e) => {
    e.preventDefault();

    const minVal = document.getElementById("min-price-id").value;
    const maxVal = document.getElementById("max-price-id").value;
    const filterList = productItems.filter(product =>{
        if(minVal === '' && maxVal === '')
            return product;
        else if(maxVal && product.price <= maxVal || minVal && product.price >= minVal)
            return product;
    })
    console.log(filterList)
    // Re-generate the product items
    manProduct(filterList)
    womanProduct(filterList)
})

// Create cart button increasement
function badgeIncreasement(productList){
    selectedItems.push(productList)
    const increaseVal = document.getElementsByClassName("badge")[0];
    increaseVal.innerHTML = selectedItems.length;
    localStorage.setItem("Selected product", selectedItems); // Save item in local storage
}

womanProduct(productItems);
manProduct(productItems);

