import { Http, Response, Headers } from "@angular/http";
import { Injectable, EventEmitter } from "@angular/core";
import 'rxjs/Rx';
import { Observable } from "rxjs";
import {Product}  from './product.model';

/**
 * @ProductService
 * @description
 * this service to handle product
 */

@Injectable()
export class ProductService {

    /**
     * @type {string}
     */
    private productsUrl: string = 'data/products.json';

    /**
     * @type {Product[]}
     */
    public products:Product[];

    /**
     * @type {Product[]}
     */
    myBasket: Product[] = [];

    /**
     * @type {string}
     */
    _currntProductType: string = 'fruits';

    /**
     * Constructor for ProductService class
     * @param http
     */
    constructor(private http: Http) {
    }

    /**
     * @param type
     */
    setCurrentProductType(type: string ) {
        this._currntProductType = type;
    }

    /**
     * @returns {string}
     */
    getCurrentProductType(): string {
        return this._currntProductType;
    }

    /**
     * @returns {Product[]}
     */
    public getMyBasket(): Product[]{
        return this.myBasket;
    }


    /**
     * @description add product to basket and update basket details
     * @param product
     */
    addProductToBasket(product: Product){
        //TODO add product to basket and update its details
        this.myBasket.push(product);
        product.basketCount = 0 + 1;
        this.setTotalProductBasketPrice(product);
        /*var count: number = 0;
        if (this.myBasket.length > 0) {
            for (count = 0; count < this.myBasket.length; count++) {
                if (this.myBasket[count].name == product.name) {
                    this.myBasket[count].basketCount = this.myBasket[count].basketCount +1;
                    this.myBasket[count].basketPrice = this.myBasket[count].basketPrice + product.price;
                    return;
                }else{
                  this.myBasket.push(product);
                  return;  
                }  
            }   
        }else{
            this.myBasket.push(product);
            return;
        }*/
    }

    /**
     *
     * @returns {number} tCount
     */
    getTotalBasketQuantity(): number {
        //TODO return total basket quantity
        //return 0; // TEMP-R
        return this.myBasket.length;
    }

    /**
     * @description reset basket details
     */
    resetBasket() {
        //TODO rest basket here
        this.myBasket = [];
        this.products = [];
    }

    /**
     * @param product
     */
    setTotalProductBasketPrice(product: Product) {
        product.basketPrice = product.basketCount * product.price;
    }

    /**
     * @returns {number}
     */
    getTotalPrice(): number {
        //TODO return total price 
        return 0 // TEMP-R
    }

    /**
     * @returns {Observable<Product[]>}
     */
    getProduct(): Observable <Product[]>{
        //TODO get products from productUrl
        // TEMP-R
        return this.http.get(this.productsUrl).map((res) => this.extractProduct(res));
    }

    /**
     * @param res
     * @returns {Product[]}
     */
    private extractProduct(res: Response): Product[] {
        let body = res.json();
        this.products = body.products || { };
        return this.products;
    }

    /**
     * 
     * console.log("Prd type:", this._currntProductType);@param error
     * @returns {ErrorObservable}
     */
    private handleError (error: any): Observable<any> {
        //TODO handle and show error
        //TEMP-R
        let errMsg = (error.message) ? error.message :
            error.status ? `${error.status} - ${error.statusText}` : 'Server error';
        return Observable.throw(errMsg);
        //TEMP-R - End
    }
}