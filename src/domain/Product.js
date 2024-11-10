import ProductTag from './ProductTag.js';

class Product {
    constructor(id, thumbnail, image, name, price, description) {
        this._id = id;
        this._thumbnail = thumbnail;
        this._image = image;
        this._name = name;
        this._price = price;
        this._description = description;
    }

    // Getters
    get id() {
        return this._id;
    }


    get thumbnail() {
        return this._thumbnail;
    }

    get image() {
        return this._image;
    }

    get name() {
        return this._name;
    }

    get price() {
        return this._price;
    }

    get description() {
        return this._description;
    }

    // Setters
    set id(value) {
        this._id = value;
    }

    set thumbnail(value) {
        this._thumbnail = value;
    }

    set image(value) {
        this._image = value;
    }

    set name(value) {
        this._name = value;
    }

    set price(value) {
        this._price = value;
    }

    set description(value) {
        this._description = value;
    }

    // Method to display product details
    displayProduct() {
        console.log(`Name: ${this._name}`);
        console.log(`Price: $${this._price}`);
        console.log(`Description: ${this._description}`);
        console.log(`Thumbnail: ${this._thumbnail}`);
        console.log("Image:", this._image);
    }
}

export default Product;
