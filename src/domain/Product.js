import ProductTag from './ProductTag.js';

class Product {
    constructor(thumbnail, image, name, price, description, tags = []) {
        this._thumbnail = thumbnail;
        this._image = image;
        this._name = name;
        this._price = price;
        this._description = description;
        this._tags = tags;
    }

    // Getters
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

    get tags() {
        return this._tags;
    }

    // Setters
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

    set tags(value) {
        if (Array.isArray(value) && value.every(tag => tag instanceof ProductTag)) {
            this._tags = value;
        } else {
            console.error("Tags should be an array of Tag instances");
        }
    }

    // Method to add a tag to the product
    addTag(tag) {
        if (tag instanceof ProductTag) {
            this._tags.push(tag);
        } else {
            console.error("Invalid tag: Must be an instance of Tag class");
        }
    }

    // Method to remove a tag from the product
    removeTag(index) {
        if (index >= 0 && index < this._tags.length) {
            this._tags.splice(index, 1);
        } else {
            console.error("Invalid index: Unable to remove tag");
        }
    }

    // Method to display product details
    displayProduct() {
        console.log(`Name: ${this._name}`);
        console.log(`Price: $${this._price}`);
        console.log(`Description: ${this._description}`);
        console.log(`Thumbnail: ${this._thumbnail}`);
        console.log("Image:", this._image);
        console.log("Tags:", this._tags);
    }
}

export default Product;
