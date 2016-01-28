<?php
/***
* https://www.leaseweb.com/labs/2015/10/creating-a-simple-rest-api-in-php/
*/
include_once('helpers.php');
  
function dump_pre($data, $die = false){
echo '<pre>';
var_dump($data);
echo '</pre>';
  if($die){
    die('en debug');  
  }

} 

// connect to the mysql database
$link = mysqli_connect('localhost', 'root', 'esteban', 'spenders');
mysqli_set_charset($link,'utf8');
 
// get the HTTP method, path and body of the request
$method = $_SERVER['REQUEST_METHOD'];
$dataRequest = (file_get_contents('php://input')) ? file_get_contents('php://input') : '{}';

$request = explode('/', trim($_SERVER['PATH_INFO'],'/'));
$input = json_decode($dataRequest,true);


// dump_pre($input);
// die();  
// retrieve the table and key from the path
$table = preg_replace('/[^a-z0-9_]+/i','',array_shift($request));

$key = array_shift($request)+0;

// escape the columns and values from the input object
$columns = preg_replace('/[^a-z0-9_]+/i','',array_keys($input));

$values = array_map(function ($value) use ($link) {
  if ($value===null) return null;
  return mysqli_real_escape_string($link,(string)$value);
},array_values($input));
 
// build the SET part of the SQL command
$set = '';
for ($i=0;$i<count($columns);$i++) {
  $set.=($i>0?',':'').'`'.$columns[$i].'`=';
  $set.=($values[$i]===null?'NULL':'"'.$values[$i].'"');
}
 
// create SQL based on HTTP method
switch ($method) {
  case 'GET':
  if(strpos($table, "custom_") === 0){
    $custom = str_replace("custom_", "", $table);
    $sql = getSql($custom);
  } else {
    if($key){
      $sql = "select * from `$table` WHERE "."id=".$key; 
    }else{
      $sql =  getSql('get_all',array('table'=>$table));
      // $sql = "select * from `$table` WHERE MONTH(date_created) = MONTH(NOW()) AND YEAR(date_created) = YEAR(NOW());"; 
    }
  }
    //$sql = "select * from `$table`".($key?" WHERE id=$key":''); break;
    // echo $sql;
    break; 
  case 'PUT':
    $sql = "update `$table` set $set where id=$key"; break;
  case 'POST':
    $sql = "insert into `$table` set $set"; break;
  case 'DELETE':
    $sql = "delete FROM `$table` where id=$key"; break;
}
 
// excecute SQL statement
$result = mysqli_query($link,$sql);
 
// die if SQL statement failed
if (!$result) {
  http_response_code(404);
  die(mysqli_error($link));
}
 
// print results, insert id or affected row count
if ($method == 'GET') {

  if (!$key) echo '[';
  for ($i=0;$i<mysqli_num_rows($result);$i++) {
    echo ($i>0?',':'').json_encode(mysqli_fetch_object($result));
  }
  if (!$key) echo ']';

  /**
  * @TODO penser à gerer le cas de pas de resultats
  */  
  // if(mysqli_num_rows($result) === 0){
  //   echo '[]';
  // }

} elseif ($method == 'POST') {
  echo mysqli_insert_id($link);
} else {
  echo mysqli_affected_rows($link);
}
 
// close mysql connection
mysqli_close($link);