<?php
function getImages($dir) {
	$d = opendir($dir);
	$files = [];
	if($d) {
		while(false !== ($file = readdir($d))) {
			if($file != '.' && $file != '..') {
				$file_parts = explode(".",$file);
				$ext = strtolower(array_pop($file_parts));
				$allowed_types = ["jpg", "png", "gif"];
				if(in_array($ext,$allowed_types)) {
					$files[] = $file;
				}
			}
		}
		closedir($d);
	}
	return $files;
}

$images = getImages(realpath(__DIR__.'/../bgrds/'));
?>
<!DOCTYPE html>
<html lang="en">
<head>
	<meta charset="UTF-8">
	<title>Test</title>
	<script src="https://code.jquery.com/jquery-3.2.1.slim.min.js"></script>
	<link href="https://fonts.googleapis.com/css?family=Roboto+Slab" rel="stylesheet">
	<link rel="stylesheet" type="text/css" href="/css/style.css">
	<link rel="stylesheet" type="text/css" href="/css/owl.carousel.css">
	<script>
		window.__backgrounds = JSON.parse('<?= json_encode($images) ?>');
	</script>
</head>
<body>
<div id="app"></div>
<script src="/js/dist/app.min.js" type="text/javascript"></script>
<div style="display: none;">
	<img src="/bgrds/bg1.jpg" alt="">
	<img src="/bgrds/bg2.jpg" alt="">
	<img src="/bgrds/bg3.jpg" alt="">
	<img src="/bgrds/bg4.jpg" alt="">
</div>
</body>
</html>