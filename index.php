<?php
$f3 = require('lib/base.php');
$f3->set('UI', __DIR__.'/');
$db = new DB\SQL('sqlite:db.sqlite');

$f3->route('GET /',
	function() {
		echo View::instance()->render('views/index.html');
	}
);

$f3->route('GET /getUsers',
	function() use ($db) {
	var_dump(date('Y-m-d'));
		$res = $db->exec("SELECT * FROM users WHERE bdate = date('now')");
		var_dump($res);
	}
);

$f3->run();