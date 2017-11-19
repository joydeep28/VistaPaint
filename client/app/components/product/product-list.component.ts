import { Component, OnInit} from '@angular/core';
import { Router } from "@angular/router";
import { ProductService } from './product.service';
import { ErrorService } from '../../errors/error.service';
import {Product} from './product.model';
import { ProductFilter } from './product.filter';
/**
 * @component
 * @description
 * this is to show product list  for different type of products in product detail screen
 */
@Component({
    selector: 'product-list-component',
    templateUrl: './product-list.component.html'

})
export class ProductListComponent implements OnInit {

    /**
     * Constructor for ProductListComponent class
     * @param router
     * @param _productService
     * @param errorService
     */
    constructor(private router: Router,private _productService: ProductService, private errorService: ErrorService){
    }

    /**
     * @type {string}
     */
    searchString: string = '';

    /**
     *
     * @type {string}
     */
    currentProductType: string;

    /**
     *
     * @type {string}
     */
    currentCategory: string;

    /**
     *
     * @type {string}
     */
    totalItems: number = 0;

    /**
     *
     * @type {Product[]}
     */
    fruits: Product[];

    /**
     *
     * @type {Product[]}
     */
    vegetables: Product[];

    /**
     *
     * @type {Product[]}
     */
    grocery: Product[];

    /**
     * @override OnInit
     */
    ngOnInit(){
        this.getProduct();
    }

    /**
     * @description get product and set types of products
     */
    getProduct() {
        this._productService.getProduct().subscribe(
                //TODO handle response and error here
                data => {
                    this.setProducts(data);
                }, error =>{
                    this.logError(error);
                }
        )
        this.totalItems = this._productService.getTotalBasketQuantity();
    }

    /**
     * @description set  products type
     * @param res
     */
    setProducts =  function(res){
        this.fruits = res.fruits;
        this.vegetables = res.vegetables;
        this.grocery = res.grocery;
    }

    /**
     * @description handle error
     * @param error
     */
    logError = function(error) {
        this.errorService.handleError(error);
    }

    /**
     * @returns {Product[]|any}
     */
    getCurrentProductType =  function (): Product{
        this.currentProductType = this._productService.getCurrentProductType();
        this.currentCategory = this.currentProductType.substring(0,1).toUpperCase() + this.currentProductType.substring(1) + " ";
        //TODO return category type object
        //return this.currentCategory; //TEMP-R
        //this._productService.products[this.currentProductType] =  [{"id":"1","img_url":"images/apple.jpg","name":"Apple","description":"Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s","price":110}];
        return this._productService.products[this.currentProductType];
    }

    /**
     * @description route to basket screen
     */
    onBasketClicked = function(){
        //TODO handle basket click
        this.router.navigate(['/', 'basket']);
    }

    /**
     * @description add product to basket
     * @param product
     */
    onAddToBasket = function(product: Product){
        //TODO  add product to basket
        this._productService.addProductToBasket(product);
        this.totalItems = this._productService.getTotalBasketQuantity();
    }

}