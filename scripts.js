class Product{

    constructor(title, imageUrl, price, description){
        this.title=title;
        this.imageUrl=imageUrl;
        this.price=price;
        this.description=description;
    }
}

class ShoppingCart{
    items=[];

    set cartItems(value){
        this.items=value;
        this.totalOutput.innerHTML=`<h2>Total: \$${this.totalAmount.toFixed(2)}</h2>`;
    }

    get totalAmount(){
        const sum=this.items.reduce((prevValue, curItem)=> prevValue+curItem.price,0);
        return sum;
    }

    addProduct(product){
        const updatedItems=[...this.items];
        updatedItems.push(product);
        this.cartItems=updatedItems;
    }

    render(){
        const cartEl=document.createElement('section');
        cartEl.innerHTML=`
        <h2>Total: \$${0}</h2>
        <button>OrderNow!</button>
        `
    cartEl.className='cart';
    this.totalOutput=cartEl.querySelector('h2');
    return cartEl;
    }
}

class ProductItem{
    constructor(product){
        this.product=product;
    }

    cartButton(){
       App.addProductToCart(this.product);
    }

    render(){
        const prodEl = document.createElement('li');
            prodEl.className='product-item';
            prodEl.innerHTML=`
                <div class="all-content">
                    <img src="${this.product.imageUrl}" alt="${this.product.title}">
                    <div class="product-item__content">
                        <h2>${this.product.title}</h2>
                        <p>${this.product.description}</p>
                        <h3>\$${this.product.price}</h3>
                        <button>Add to Cart</button>
                    </div>
                </div>
            `;
        const addCartButton=prodEl.querySelector('button');
        addCartButton.addEventListener('click',this.cartButton.bind(this));
        return prodEl;
    }
}

class ProductList{
    products=[
        new  Product(
            'Bring Me Back','https://images-na.ssl-images-amazon.com/images/S/compressed.photo.goodreads.com/books/1508949859i/36448554.jpg',13.33,'By B.A. Paris'
        ),
        new  Product(
            'A Good Girl\'s Guide To Murder','https://m.media-amazon.com/images/I/81peFVCNGzL._AC_UF1000,1000_QL80_.jpg',13.33,'By Holly Jackson'
        ),
        new  Product(
            'The Inheritance Games','https://images-na.ssl-images-amazon.com/images/S/compressed.photo.goodreads.com/books/1587396413i/52439531.jpg',13.33,'By Jennifer Lynn Barnes'
        ),
        new  Product(
            'Six Of Crows','https://images-na.ssl-images-amazon.com/images/S/compressed.photo.goodreads.com/books/1651710803i/23437156.jpg',13.33,'By Leigh Bardugo'
        )
    ];

    constructor(){};

    render(){
        const prodList= document.createElement('ul');
        prodList.className='product-list';
        for (const prod of this.products){
            const productItem=new ProductItem(prod);
            const prodEl=productItem.render();
            prodList.append(prodEl);
        }
        return prodList;
    }
};

class AccessCart{
    render(){
        const renderHook=document.getElementById('app');
        this.cart= new ShoppingCart();
        const cartEl=this.cart.render();
        const productList=new ProductList();
        const prodListEl=productList.render();
 
        renderHook.append(cartEl);
        renderHook.append(prodListEl);
    }
}


class App{
    static cart;

    static init(){
        const shop=new AccessCart();
        shop.render();
        this.cart= shop.cart;
    }

    static addProductToCart(product){
        this.cart.addProduct(product);
    }
}

App.init();