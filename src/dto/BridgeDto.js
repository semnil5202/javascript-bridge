class BridegeDto {
  #position;

  constructor(position) {
    this.#position = position;
  }

  getPosition() {
    return this.#position;
  }
}

module.exports = BridegeDto;
