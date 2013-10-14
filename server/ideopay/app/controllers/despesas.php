<?php

class despesas extends \BaseController {

	/**
	 * Display a listing of the resource.
	 *
	 * @return Response
	 */


	/* utilizamos o Model receita porque receitas e despesas estão na mesma tabela
		diferenciados com uma flag
	*/ 

	public function index()
	{
		if(is_numeric(Input::get('y')) && is_numeric(Input::get('m'))) {
			$lower = Input::get('y') . '-' . Input::get('m') . '-01';
			$upper = Input::get('y') . '-' . Input::get('m') . '-31';

			$receitas = ReceitaOuDespesa::where('data_limite', '<=', $upper)->where('data_limite', '>=', $lower)->where('tipo','=',0)->orderBy('data_limite')->get();
			return Response::json($receitas->toArray());
		} else {
			$lower = date('Y') . '-' . date('m') . '-01';
			$upper = date('Y') . '-' . date('m') . '-31';

			$receitas = ReceitaOuDespesa::where('data_limite', '<=', $upper)->where('data_limite', '>=', $lower)->where('tipo','=',0)->orderBy('data_limite')->get();
			return Response::json($receitas->toArray());
		}
	}

	/**
	 * Show the form for creating a new resource.
	 *
	 * @return Response
	 */
	public function create()
	{
		//
	}

	/**
	 * Store a newly created resource in storage.
	 *
	 * @return Response
	 */
	public function store()
	{

		$currDate = date('Y-m-d');

		$despesa = new ReceitaOuDespesa();
		$despesa->user_id = 1;
		$despesa->servico_id = Input::get('servico_id');	
		$despesa->cliente_id = 4; // ideograma client id
		$despesa->titulo = Input::get('titulo');
		$despesa->valor = Input::get('valor');
		$despesa->descricao = '';
		$despesa->tipo = 0;
		$despesa->pago = Input::get('pago');
		$despesa->data_limite = date('Y-m-d',strtotime(Input::get('data_limite')));
		
		$despesa->save();
	
		return Response::json(['error' => false , 'message' => 'Receita criada.', 'model' => $despesa->toArray()] , 201 );
	}

	/**
	 * Display the specified resource.
	 *
	 * @param  int  $id
	 * @return Response
	 */
	public function show($id)
	{
		$d = ReceitaOuDespesa::find($id);
		return Response::json($d->toArray());
	}

	/**
	 * Show the form for editing the specified resource.
	 *
	 * @param  int  $id
	 * @return Response
	 */
	public function edit($id)
	{
		//
	}

	/**
	 * Update the specified resource in storage.
	 *
	 * @param  int  $id
	 * @return Response
	 */
	public function update($id)
	{
		$despesa = ReceitaOuDespesa::find($id);
		$despesa->pago = Input::get('pago');
		$despesa->data_pago = Input::get('data_pago');
		$despesa->save();
	}

	/**
	 * Remove the specified resource from storage.
	 *
	 * @param  int  $id
	 * @return Response
	 */
	public function destroy($id)
	{
		$despesa = ReceitaOuDespesa::find($id);
		$despesa->delete();
	}

}