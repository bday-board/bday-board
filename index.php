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
		$res = $db->exec("
			SELECT id, name, avatar, date(bdate/1000, 'unixepoch', 'localtime') as bdate
 			FROM users WHERE date(bdate/1000, 'unixepoch', 'localtime') = date('now')
		");
		var_dump($res);
	}
);

$f3->run();