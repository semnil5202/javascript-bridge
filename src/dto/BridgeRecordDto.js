class BridegeRecordDto {
  #records;

  constructor(records) {
    this.#records = records;
  }

  getRecords() {
    return this.#records;
  }
}

module.exports = BridegeRecordDto;
