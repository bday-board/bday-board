<?php
function saveFileTo($filepath, $content) {

	$path = pathinfo($filepath, PATHINFO_DIRNAME);

	if(!file_exists($path) || !is_dir($path)) {

		if(!mkdir($path, 0775, true)) {
			return false;
		}
	}

	if(!file_put_contents($filepath, $content)) {
		return false;
	}

	return $filepath;
}
function generateGuidV4() {
	if(function_exists('openssl_random_pseudo_bytes')) {
		$data = openssl_random_pseudo_bytes(16);
		$data[6] = chr(ord($data[6])&0x0f|0x40); // set version to 0100
		$data[8] = chr(ord($data[8])&0x3f|0x80); // set bits 6-7 to 10
		return vsprintf('%s%s-%s-%s-%s-%s%s%s', str_split(bin2hex($data), 4));
	}
	//Fallback to math functions if PHP has no OpenSSL ext
	return sprintf(
		'%04x%04x-%04x-%04x-%04x-%04x%04x%04x',
		// 32 bits for "time_low"
		mt_rand(0, 0xffff),
		mt_rand(0, 0xffff),
		// 16 bits for "time_mid"
		mt_rand(0, 0xffff),
		// 16 bits for "time_hi_and_version",
		// four most significant bits holds version number 4
		mt_rand(0, 0x0fff)|0x4000,
		// 16 bits, 8 bits for "clk_seq_hi_res",
		// 8 bits for "clk_seq_low",
		// two most significant bits holds zero and one for variant DCE1.1
		mt_rand(0, 0x3fff)|0x8000,
		// 48 bits for "node"
		mt_rand(0, 0xffff),
		mt_rand(0, 0xffff),
		mt_rand(0, 0xffff)
	);
}

$f3 = require('lib/base.php');
$f3->set('UI', __DIR__.'/');
$db = new DB\SQL('sqlite:db.sqlite');

$f3->route('GET /',
	function() use ($images) {
		echo View::instance()->render('views/index.php');
	}
);

$f3->route('GET /add',
	function() {
		echo View::instance()->render('views/add.html');
	}
);

$f3->route('POST /addUser',
	function($f3) use ($db) {
		/** @var Base $f3 */
		$params = $f3->get('POST');
		$files = $f3->get('FILES');

		$filename = null;
		if(!empty($files['avatar'])) {
			$filename = '/avatars/'.generateGuidV4().'_'.$files['avatar']['name'];
			$content = file_get_contents($files['avatar']['tmp_name']);
			if($content === false) {
				$f3->error(500);
			}
			$avatarUrl = saveFileTo(realpath(__DIR__).$filename, $content);
			if($avatarUrl === false) {
				$f3->error(500);
			}
		}
		$name = filter_input(INPUT_POST, 'name', FILTER_SANITIZE_STRING);
		$bdate = DateTime::createFromFormat('d.m.Y', $params['bdate']);
		if($bdate === false) {
			$f3->error(500);
		}

		$res = $db->exec("INSERT INTO users(name, bdate, avatar) VALUES (?, ?, ?);", [$name, $bdate->format('Y-m-d'), $filename]);

		if($res) {
			echo 1;
		}
		else echo 0;
	}
);

$f3->route('GET /list',
	function() {
		echo View::instance()->render('views/list.html');
	}
);

$f3->route('POST /deleteUser',
	function($f3) use ($db) {
		/** @var Base $f3 */
		$params = $f3->get('POST');

		$id = intval($params['id']);

		$res = $db->exec("SELECT avatar FROM users WHERE id = ?", [$id]);
		if(!empty($res) && !empty($res[0]['avatar'])) {
			$path = realpath('.'.$res[0]['avatar']);
			if(file_exists($path)) {
				$result = unlink($path);
				if($result === false) {
					echo 0;
					return;
				}
			}
		}

		$res = $db->exec("DELETE FROM users WHERE id = ?", [$id]);

		if($res) echo 1;
		else echo 0;
	}
);

$f3->route('GET /getUsers',
	function() use ($db) {
		$res = $db->exec("
			SELECT id, name, avatar, bdate
 			FROM users WHERE strftime('%d.%m', bdate) = strftime('%d.%m', date('now'))
 				OR strftime('%d.%m', bdate) = strftime('%d.%m', date('now', '+3 days'))
 				OR strftime('%d.%m', bdate) = strftime('%d.%m', date('now', '+2 days'))
 				OR strftime('%d.%m', bdate) = strftime('%d.%m', date('now', '+1 days'))
 				OR strftime('%d.%m', bdate) = strftime('%d.%m', date('now', '-1 days'))
 				OR strftime('%d.%m', bdate) = strftime('%d.%m', date('now', '-2 days'))
 				OR strftime('%d.%m', bdate) = strftime('%d.%m', date('now', '-3 days'))
 			ORDER BY bdate
		");

		header('Content-Type: application/json');
		echo json_encode($res);
	}
);

$f3->route('GET /listUsers',
	function() use ($db) {
		$res = $db->exec("SELECT id, name, avatar, bdate FROM users");
		header('Content-Type: application/json');
		echo json_encode($res);
	}
);

$f3->run();