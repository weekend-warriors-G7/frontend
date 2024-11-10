class Product {
    constructor(id, image, name, price, description, size, clothingType, material, colour) {
        this._id = id;
        this._image = image;
        this._name = name;
        this._price = price;
        this._description = description;
        this._size = size;
        this._clothingType = clothingType;
        this._material = material;
        this._colour = colour;
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

    get size() {
        return this._size;
    }

    get clothingType() {
        return this._clothingType;
    }

    get material() {
        return this._material;
    }

    get colour() {
        return this._colour;
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

    set size(value) {
        this._size = value;
    }
    
    set clothingType(value) {
        this._clothingType  = value;
    }

    set material(value) {
        this._material = value;
    }

    set colour(value) {
        this._colour = value;
    }
    
    // Method to display product details
    displayProduct() {
        console.log(`ID: ${this._id}`);
        console.log("Image:", this._image);
        console.log(`Name: ${this._name}`);
        console.log(`Price: $${this._price}`);
        console.log(`Description: ${this._description}`);
        console.log(`Size: ${this._size}`);
        console.log(`Clothing Type: ${this._clothingType}`);
        console.log(`Material: ${this._material}`);
        console.log(`Colour: ${this._colour}`);
    }
}

export default Product;
