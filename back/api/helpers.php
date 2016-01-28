<?php

function getSql($custom, $params = []){
	$outputSql = '';
	switch ($custom) {
		// http://lab.dev/back/api/api.php/custom_current_spends
		case 'current_spends':
			$outputSql = "select sum(amount) as current_spends from datalines WHERE type_line = 'debit'  AND MONTH(NOW()) = MONTH(NOW()) AND YEAR(NOW()) = YEAR(NOW());";
			break;

		case 'currents_totals':
			$outputSql = "select SUM(amount) as totals from datalines WHERE  MONTH(NOW()) = MONTH(NOW()) AND YEAR(NOW()) = YEAR(NOW()) GROUP BY type_line;";
			break;

		case 'get_all':
			$outputSql = "select * from `". $params['table'] ."` WHERE MONTH(date_created) = MONTH(NOW()) AND YEAR(date_created) = YEAR(NOW());";
			break;
			
		default:
			$outputSql = "select * from `". $custom ."`";
			break;
	}
	
	return $outputSql;
}