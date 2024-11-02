class ProductTag {
    constructor(size, clothingType, material, colour) {
        this._size = size;
        this._clothingType = clothingType;
        this._material = material;
        this._colour = colour;
    }

    // Getters
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
    set size(value) {
        this._size = value;
    }

    set clothingType(value) {
        this._clothingType = value;
    }

    set material(value) {
        this._material = value;
    }

    set colour(value) {
        this._colour = value;
    }
}

export default ProductTag;
