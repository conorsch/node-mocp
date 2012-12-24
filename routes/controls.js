
/*
 * GET home page.
 */

exports.display = function(req, res){
  res.render('controls', { title: 'mibp' });
};
