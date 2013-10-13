<?php

class Servico extends Eloquent {
	protected $guarded = array();
	protected $table = 'servicos';
	public static $rules = array();
	public $timestamps = false;

	public function receitasOuDespesa() {
		return $this->hasMany('ReceitaOuDespesa','servico_id');
	}

}
