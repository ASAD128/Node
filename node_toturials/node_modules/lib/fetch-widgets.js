var fetchJSON = require('./fetch-json');

function fetchWidgets (type, callback) {
	var query = [
		{select: [
			'tc_widget_settings.id',
			'node.nid',
			'node.title',
			'tc_widget_settings.hash',
			'tc_widget_settings.show_more'
		]},
		{from: ['tc_widget_settings']},
		{leftJoin: ['node',
			'node.nid',
			'tc_widget_settings.nid']},
		{leftJoin:['field_data_field_bp_partner',
			'field_data_field_bp_partner.entity_id',
			'node.nid']},
		{leftJoin:['field_data_field_b2b_subscription_plan',
			'field_data_field_b2b_subscription_plan.entity_id',
			'field_bp_partner_target_id']},
		{where:[
			'field_b2b_subscription_plan_tid','not in',[0,22]
		]},
		{andWhere:[
			'tc_widget_settings.type', type
		]}
	];
	
	return fetchJSON('http://localhost:56565/db', {
		method: 'post',
		encoding: 'utf8',
		data: JSON.stringify(query),
		headers: {
			'Content-type': 'application/json; charset=utf-8'
		}
	}, callback);
	
}

module.exports = fetchWidgets;
