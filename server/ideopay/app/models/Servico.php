<?php

class Servico extends Eloquent {
	protected $guarded = array();
	protected $table = 'servicos';
	public static $rules = array();
	public $timestamps = false;

	public function receitas() {
		return $this->hasMany('Receita','servico_id');
	}

	public function despesas() {
		return $this->hasMany('Despesa','servico_id');
	}
}
