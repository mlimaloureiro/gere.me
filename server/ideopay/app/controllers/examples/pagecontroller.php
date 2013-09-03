<?php

class PageController extends BaseController {


	public function getIndex()
	{
		return Response::json(['error' => false , "message" => "hello"]);
	}

	public function postProfile()
	{
		return Response::json(['error' => false , "message" => "Post Profile"]);
	}

	public function putProfile()
	{
		return Response::json(['error' => false , "message" => "Put Profile"]);
	}


}