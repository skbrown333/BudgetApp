export default class BaseController {
    model: any;

    constructor(options) {
      if (!options || !options.model) throw new Error("Must Pass Options");
      this.model = options.model;
      this.create = this.create.bind(this);
    }
  
    async create(req, res, next) {
      let body = req.body;
      try {
        let model = await this.model.create(body);
        return res.status(200).json({ model: model });
      } catch (err) {
        throw err;
      }
    }
  }
  
  module.exports = BaseController;
  