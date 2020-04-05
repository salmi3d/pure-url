const Link = require('../models/Link')
const shortid = require('shortid')

module.exports = class LinkController {

  static async generate(req, res) {
    try {
      const { from } = req.body
      const code = shortid.generate()
      const exists = await Link.findOne({ from })

      if (exists) {
        return res.json({ link: exists })
      }

      const to = `${req.protocol}://${req.get('host')}/t/${code}`
      const link = new Link({
        code,
        to,
        from,
        owner: req.user.userId
      })

      await link.save()

      res.status(201).json({ link })
    } catch (e) {
      console.error(`api, ${e}`)
      res.status(500).json({ error: e })
    }
  }

  static async getLinks(req, res, next) {
    try {
      const links = await Link.find({ owner: req.user.userId })
      res.json(links)
    } catch (e) {
      console.error(`api, ${e}`)
      res.status(500).json({ error: e })
    }
  }

  static async getLinkById(req, res, next) {
    try {
      const link = await Link.findById(req.params.id)
      res.json(link)
    } catch (e) {
      console.error(`api, ${e}`)
      res.status(500).json({ error: e })
    }
  }

}
