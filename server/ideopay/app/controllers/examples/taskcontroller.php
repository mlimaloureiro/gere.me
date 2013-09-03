<?php

class TaskController extends BaseController {

	public function __construct() 
	{
		// Podemos utilizar filtros dentro dos controllers
		$this->beforeFilter('apiauth');
	}

	/**
	 * Display a listing of the resource.
	 *
	 * @return Response
	 */
	public function index()
	{
		$tasks = Auth::user()->getTasks;
		return Response::json(['error' => false , 'tasks' => $tasks->toArray()] , 201 );
	}

	/**
	 * Show the form for creating a new resource.
	 *
	 * @return Response
	 */
	public function create()
	{
		
	}

	/**
	 * Store a newly created resource in storage.
	 *
	 * @return Response
	 */
	public function store()
	{
		$Task = new Task();
		$Task->user_id = Auth::user()->id;	
		$Task->project_id = Request::get('project_id');
		$Task->category_id = Request::get('category_id');
		$Task->parent_id = Request::get('parent_id');
		$Task->title = Request::get('title');
		$Task->description = Request::get('description');
		$Task->end_at = new DateTime;


		$Task->save();
		try {
			User::find(Request::get('user_id'))->getTasks()->save($Task);
			Project::find(Request::get('project_id'))->getTasks()->save($Task);
		} catch (exception $e) {
			return Response::json(['error' => true , 'message' => 'Couldnt create task'] , 201 );
		}
		

		return Response::json(['error' => false , 'message' => 'Task Created'] , 201 );
	}

	/**
	 * Display the specified resource.
	 *
	 * @return Response
	 */
	public function show($id)
	{

		/*$task =	DB::select("SELECT tasks.* FROM tasks,userstasks WHERE tasks.id = userstasks.task_id 
							AND tasks.id = $id AND userstasks.user_id = ".Auth::user()->id."");

		return Response::json(['error' => false , 'task' => $task],200);*/
		
		try {
			$task = Auth::user()->getTasks()->where('id','=',$id);
		} catch (exception $e) {
			return Response::json(['error' => true , 'message' => 'Task not found'] , 201 );
		}

		return Response::json(['error' => false , 'urls' => $task->toArray()],200);
	}

	/**
	 * Show the form for editing the specified resource.
	 *
	 * @return Response
	 */
	public function edit($id)
	{
		//
	}

	/**
	 * Update the specified resource in storage.
	 *
	 * @return Response
	 */
	public function update($id)
	{
		//
	}

	/**
	 * Remove the specified resource from storage.
	 *
	 * @return Response
	 */
	public function destroy($id)
	{
		//
	}

}
