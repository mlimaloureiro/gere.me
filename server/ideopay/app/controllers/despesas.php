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
		$despesas = ReceitaOuDespesa::where('data_limite', '!=', '')->where('tipo','=',0)->orderBy('data_limite')->get();
		return Response::json($despesas->toArray());
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
		
		$prestacoes = Input::get('prestacoes');
		$automatico = Input::get('automatico');
		$prontoPagamento = Input::get('pronto_pagamento');
		$currDate = date('Y-m-d');

		$despesa = new ReceitaOuDespesa();
		$despesa->user_id = 1;
		$despesa->servico_id = Input::get('servico_id');	
		$despesa->cliente_id = 4; // ideograma client id
		$despesa->titulo = Input::get('titulo');
		$despesa->valor = Input::get('valor');
		$despesa->descricao = '';
		$despesa->tipo = 0;



		if($prestacoes == 1) {

			$mes = Input::get('mes');

			$despesa->data_limite = date('Y-m-d',strtotime('+'. $mes . ' month'));
		} else {
			$despesa->data_limite = date('Y-m-d',strtotime(Input::get('data_limite')));
		}

		if($automatico == 1) {
			$despesa->pago = 1;
			$despesa->data_pago = $despesa->data_limite;
		} else {
			$despesa->pago = 0;
		}
		
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
		//
	}

	/**
	 * Remove the specified resource from storage.
	 *
	 * @param  int  $id
	 * @return Response
	 */
	public function destroy($id)
	{
		//
	}

}