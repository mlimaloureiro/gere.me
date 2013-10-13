<?php

class ReceitaOuDespesa extends Eloquent {
	protected $guarded = array();
	protected $table = 'receitas';
	public static $rules = array();
	public $timestamps = false;

	public function servico() {
		return $this->belongsTo('Servico','servico_id');
	}

	public function cliente() {
		return $this->belongsTo('Cliente','cliente_id');
	}

}
