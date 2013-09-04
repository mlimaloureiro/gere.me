<?php

class receitas extends \BaseController {

	/**
	 * Display a listing of the resource.
	 *
	 * @return Response
	 */
	public function index()
	{
		$receitas = Receita::all();

		foreach($receitas as $r) {
			$r->cliente;
			$r->servico;
		}

		return Response::json($receitas->toArray());
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
		/*
		$prestacoes = Request::get('prestacoes');
		$automatico = Request::get('automatico');
		$prontoPagamento = Request::get('pronto_pagamento');

		$receita = new Receita();
		$receita->user_id = 1;
		$receita->servico_id = Request::get('servico_id');	
		$receita->cliente_id = Request::get('cliente_id');
		$receita->titulo = Request::get('titulo');
		$receita->valor = Request::get('valor');
		
		if($automatico == 1) {
			$receita->pago = 1;
		} else {
			$receita->pago = 0;
		}

		$receita->data_limite = date('Y-m-d');
		$receita->save();
		*/

		return Response::json(['error' => false , 'message' => 'Receita criada.'] , 201 );
	}

	/**
	 * Display the specified resource.
	 *
	 * @param  int  $id
	 * @return Response
	 */
	public function show($id)
	{
		$r = Receita::find($id);
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