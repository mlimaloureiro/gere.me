<?php

class receitas extends \BaseController {

	/**
	 * Display a listing of the resource.
	 *
	 * @return Response
	 */
	public function index()
	{

		if(is_numeric(Input::get('y')) && is_numeric(Input::get('m'))) {
			$lower = Input::get('y') . '-' . Input::get('m') . '-01';
			$upper = Input::get('y') . '-' . Input::get('m') . '-31';

			$receitas = ReceitaOuDespesa::where('data_limite', '<=', $upper)->where('data_limite', '>=', $lower)->where('tipo','=',1)->orderBy('data_limite')->get();
			return Response::json($receitas->toArray());
		} else {
			$lower = date('Y') . '-' . date('m') . '-01';
			$upper = date('Y') . '-' . date('m') . '-31';

			$receitas = ReceitaOuDespesa::where('data_limite', '<=', $upper)->where('data_limite', '>=', $lower)->where('tipo','=',1)->orderBy('data_limite')->get();
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
		
		$prestacoes = Input::get('prestacoes');
		$automatico = Input::get('automatico');
		$prontoPagamento = Input::get('pronto_pagamento');
		$currDate = date('Y-m-d');

		$receita = new ReceitaOuDespesa();
		$receita->user_id = 1;
		$receita->servico_id = Input::get('servico_id');	
		$receita->cliente_id = Input::get('cliente_id');
		$receita->titulo = Input::get('titulo');
		$receita->valor = Input::get('valor');
		$receita->descricao = '';
		$receita->tipo = 1;



		if($prestacoes == 1) {

			$mes = Input::get('mes');

			$receita->data_limite = date('Y-m-d',strtotime('+'. $mes . ' month'));
		} else {
			$receita->data_limite = date('Y-m-d',strtotime(Input::get('data_limite')));
		}

		if($automatico == 1) {
			$receita->pago = 1;
			$receita->data_pago = $receita->data_limite;
		} else {
			$receita->pago = 0;
		}
		
		$receita->save();
	
		return Response::json(['error' => false , 'message' => 'Receita criada.', 'model' => $receita->toArray()] , 201 );
	}

	/**
	 * Display the specified resource.
	 *
	 * @param  int  $id
	 * @return Response
	 */
	public function show($id)
	{
		$r = ReceitaOuDespesa::find($id);
		return Response::json($r->toArray());
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
		$receita = ReceitaOuDespesa::find($id);
		$receita->pago = Input::get('pago');
		$receita->data_pago = Input::get('data_pago');
		$receita->save();
	}

	/**
	 * Remove the specified resource from storage.
	 *
	 * @param  int  $id
	 * @return Response
	 */
	public function destroy($id)
	{
		$receita = ReceitaOuDespesa::find($id);
		$receita->delete();
	}

}