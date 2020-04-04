const Link = require('../models/Link')

module.exports = class RedirectController {

  static async runRedirect(req, res) {
    try {
      const link = await Link.findOne({ code: req.params.code })

      if (!link) {
        return req.status(404).json('Link not found')
      }

      link.clicks++
      await link.save()
      res.redirect(link.from)
    } catch (e) {
      console.error(`api, ${e}`)
      res.status(500).json({ error: e })
    }
  }

}
