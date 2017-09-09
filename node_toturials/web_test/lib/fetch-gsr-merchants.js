var fetchJSON = require('./fetch-json');

// SELECT
//   node.nid, 
//   node.language, 
//   node.title, 
//   field_data_field_bp_url.field_bp_url_url as `url`,
//   COUNT(`comment`.cid) as reviews
// FROM node
//   LEFT JOIN field_data_field_bp_url as bp_url ON bp_url.entity_id = node.nid
//   INNER JOIN `comment` ON `comment`.nid = node.nid
//   JOIN field_data_field_bp_partner as partner ON partner.entity_id = node.nid
//   JOIN user ON partner.field_bp_partner_target_id = user.uid
//   JOIN field_data_field_b2b_subscription_plan as plan ON plan.entity_id = user.uid
// WHERE node.status > 0
//   AND `comment`.status > 0
//   AND `comment`.pid = 0
//   AND plan.field_b2b_subscription_plan_tid > 0
//   AND plan.field_b2b_subscription_plan_tid != 22
// GROUP BY node.nid

function fetchMerchants (callback) {
	var query = [
		{select: [
			'node.nid as nid',
			'node.language as country',
			'node.title as company',
			'field_data_field_bp_url.field_bp_url_url as url'
		]},
		{count: ['comment.cid as reviews']},
		{from: ['node']},
		{leftJoin: ['field_data_field_bp_url',
			'node.nid',
			'field_data_field_bp_url.entity_id']},
		{innerJoin: ['comment',
			'comment.nid',
			'node.nid'
		]},
		{join:['field_data_field_bp_partner',
			'field_data_field_bp_partner.entity_id',
			'node.nid'
		]},
		{join:['user',
			'field_data_field_bp_partner.field_bp_partner_target_id',
			'user.uid'
		]},
		{join:['field_data_field_b2b_subscription_plan as plan',
			'plan.entity_id',
			'user.uid'
		]},
		{where:    ['node.status',    '>', 0]},
		{andWhere: ['comment.status', '>', 0]},
		{andWhere: ['comment.pid',         0]},
		{andWhere: ['plan.field_b2b_subscription_plan_tid', '>',   0]},
		{andWhere: ['plan.field_b2b_subscription_plan_tid', '!=', 22]},
		{groupBy:  [
			'node.nid'
		]}
	];
	
	return fetchJSON('http://localhost:56565/db', {
		method: 'post',
		encoding: 'utf8',
		data: JSON.stringify(query),
		headers: {
			'Content-type': 'application/json; charset=utf-8'
		}
	}, function (result) {
		callback.bind(this)(result.map(function(x){
			x.url=x.url.replace('http://','');
			return x;
		}));
	});
	
}

module.exports = fetchMerchants;
