<?php

header('Content-Type: application/json');
define('FILE_IMAGE', 1);
define('FILE_VIDEO', 2);

/* Get categories and drop dir listings */
$categories = scandir('Categories');
$categories = array_splice($categories, 2);

/* Category was not set */
if(!isset($_GET['category'])) {
	$data = array();

	foreach ($categories as $category) {
		array_push($data, array(
			'title' => $category,
			'image' =>getRandomImage($category)
		));
	}

	echo json_encode(array(
		'categories' => $data
	));
} 

/* List images of selected cateogry */
else {
	$currentCategory = $_GET['category'];

	/* Make requested exists in the categories */
	if(in_array($currentCategory, $categories)) {
		$images = getImagesFromDir('Categories/'.$currentCategory);
		echo json_encode(array(
			'data' => $images
		));
	} else {
		echo json_encode(array(
			'error' => 'No category found'
		));
	}
}

function getRandomImage($category) {
	$images = getImagesFromDir('Categories/'.$category);

	do {
		$random = rand(0, count($images) - 1);
		$images = $images[$random];
	} while($images['type'] != 'image');

	return $images['path'];
}

/* Strips out everything not an image or video from scandir */
function getImagesFromDir($path) {
	$dataImages = array();

	$images = scandir($path);
	foreach ($images as $image) {
		$imagePath = $path.'/'.$image;
		$type = getFileType($imagePath);

		if($type != 0) {
			array_push($dataImages, array(
				'path' => '/include/'.$imagePath,
				'type' => fileTypeToString($type)
			));
		}
	}

	return $dataImages;
}

/* Returns string for json use */
function fileTypeToString($type) {
	switch ($type) {
		case FILE_IMAGE:
			return 'image';

		case FILE_VIDEO:
			return 'video';
		
		default:
			return 0;
	}
}

/* Returns defined integer for php use */
function getFileType($file) {
	$mime = mime_content_type($file);

	if(strstr($mime, 'video/')) {
		return FILE_VIDEO;
	} else if(strstr($mime, 'image/')) {
		return FILE_IMAGE;
	}

	return false;
}